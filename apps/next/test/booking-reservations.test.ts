import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { after, before, beforeEach, test } from 'node:test';
import { Pool, Client } from 'pg';
import { createReservation, ReservationError, type ReservationRequest } from '../lib/booking-reservations';

const databaseUrl = process.env.BOOKING_TEST_DATABASE_URL;
if (!databaseUrl) {
  throw new Error('BOOKING_TEST_DATABASE_URL must point to a disposable PostgreSQL database.');
}

const schemaName = `bookly_test_${randomUUID().replaceAll('-', '')}`;
const admin = new Client({ connectionString: databaseUrl });
const pool = new Pool({
  connectionString: databaseUrl,
  max: 8,
  options: `-c search_path=${schemaName},public`,
});
const migrationPath = fileURLToPath(new URL('../db/migrations/001_atomic_bookings.sql', import.meta.url));

before(async () => {
  await admin.connect();
  await admin.query(`CREATE SCHEMA ${schemaName}`);
  const migration = await readFile(migrationPath, 'utf8');
  await pool.query(migration);
});

beforeEach(async () => {
  await pool.query('TRUNCATE booking_resources, bookings');
});

after(async () => {
  await pool.end();
  await admin.query(`DROP SCHEMA IF EXISTS ${schemaName} CASCADE`);
  await admin.end();
});

function request(
  resourceIds: string[] = ['1'],
  startsAt = new Date(Date.now() + 86_400_000).toISOString(),
): ReservationRequest {
  return {
    businessId: 'hw_001',
    serviceId: 'hw_001',
    serviceName: 'Demo appointment',
    resourceIds,
    startsAt,
    durationMinutes: 60,
  };
}

test('creates a valid booking and all of its resource assignments', async () => {
  const result = await createReservation(pool, request(), randomUUID());
  assert.equal(result.status, 'confirmed');
  assert.deepEqual(result.resourceIds, ['1']);
  assert.equal(result.replayed, false);

  const count = await pool.query('SELECT count(*)::int AS count FROM bookings');
  assert.equal(count.rows[0].count, 1);
});

test('rejects a second booking that overlaps the same resource', async () => {
  const startsAt = new Date(Date.now() + 2 * 86_400_000).toISOString();
  await createReservation(pool, request(['1'], startsAt), randomUUID());

  await assert.rejects(
    createReservation(pool, request(['1'], startsAt), randomUUID()),
    (error: unknown) => error instanceof ReservationError && error.code === 'slot_unavailable',
  );
});

test('rejects overlapping intervals even when their start times differ', async () => {
  const startsAt = new Date(Date.now() + 2 * 86_400_000).toISOString();
  await createReservation(pool, request(['1'], startsAt), randomUUID());

  await assert.rejects(
    createReservation(
      pool,
      request(['1'], new Date(Date.parse(startsAt) + 30 * 60_000).toISOString()),
      randomUUID(),
    ),
    (error: unknown) => error instanceof ReservationError && error.code === 'slot_unavailable',
  );
});

test('concurrent requests for the same resource and interval produce exactly one reservation', async () => {
  const startsAt = new Date(Date.now() + 3 * 86_400_000).toISOString();
  const attempts = await Promise.allSettled([
    createReservation(pool, request(['1'], startsAt), randomUUID()),
    createReservation(pool, request(['1'], startsAt), randomUUID()),
  ]);

  assert.equal(attempts.filter((attempt) => attempt.status === 'fulfilled').length, 1);
  const rejected = attempts.find((attempt) => attempt.status === 'rejected');
  assert.ok(rejected && rejected.status === 'rejected');
  assert.ok(rejected.reason instanceof ReservationError);
  assert.equal(rejected.reason.code, 'slot_unavailable');

  const bookings = await pool.query('SELECT count(*)::int AS count FROM bookings');
  const assignments = await pool.query('SELECT count(*)::int AS count FROM booking_resources');
  assert.equal(bookings.rows[0].count, 1);
  assert.equal(assignments.rows[0].count, 1);
});

test('replays the same idempotency key without creating a duplicate booking', async () => {
  const key = randomUUID();
  const payload = request();
  const [first, retry] = await Promise.all([
    createReservation(pool, payload, key),
    createReservation(pool, payload, key),
  ]);

  assert.equal(retry.bookingId, first.bookingId);
  assert.notEqual(retry.replayed, first.replayed);
  const count = await pool.query('SELECT count(*)::int AS count FROM bookings');
  assert.equal(count.rows[0].count, 1);
});

test('allows different resources to book the same interval', async () => {
  const startsAt = new Date(Date.now() + 4 * 86_400_000).toISOString();
  const first = await createReservation(pool, request(['1'], startsAt), randomUUID());
  const second = await createReservation(pool, request(['2'], startsAt), randomUUID());

  assert.notEqual(first.bookingId, second.bookingId);
  const count = await pool.query('SELECT count(*)::int AS count FROM bookings');
  assert.equal(count.rows[0].count, 2);
});

test('rolls back every assignment if any required resource is unavailable', async () => {
  const startsAt = new Date(Date.now() + 5 * 86_400_000).toISOString();
  await createReservation(pool, request(['1'], startsAt), randomUUID());

  await assert.rejects(
    createReservation(pool, request(['1', '2'], startsAt), randomUUID()),
    (error: unknown) => error instanceof ReservationError && error.code === 'slot_unavailable',
  );

  const bookings = await pool.query('SELECT count(*)::int AS count FROM bookings');
  const assignments = await pool.query('SELECT count(*)::int AS count FROM booking_resources');
  assert.equal(bookings.rows[0].count, 1);
  assert.equal(assignments.rows[0].count, 1);
});
