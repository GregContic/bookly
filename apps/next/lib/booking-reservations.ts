import { createHash, randomUUID } from 'node:crypto';
import type { Pool, PoolClient } from 'pg';

export interface ReservationRequest {
  businessId: string;
  serviceId: string;
  serviceName: string;
  resourceIds: string[];
  startsAt: string;
  durationMinutes: number;
}

export interface Reservation {
  bookingId: string;
  businessId: string;
  serviceId: string;
  serviceName: string;
  resourceIds: string[];
  startsAt: string;
  endsAt: string;
  status: 'confirmed';
  createdAt: string;
  replayed: boolean;
}

export class ReservationError extends Error {
  constructor(
    message: string,
    readonly status: 400 | 409 | 422,
    readonly code: string,
  ) {
    super(message);
    this.name = 'ReservationError';
  }
}

function normalizeRequest(request: ReservationRequest) {
  if (
    typeof request.businessId !== 'string' ||
    !request.businessId ||
    request.businessId.length > 120 ||
    typeof request.serviceId !== 'string' ||
    !request.serviceId ||
    request.serviceId.length > 120 ||
    typeof request.serviceName !== 'string' ||
    !request.serviceName ||
    request.serviceName.length > 160
  ) {
    throw new ReservationError('Business, service, and service name are required.', 400, 'invalid_request');
  }

  if (
    !Array.isArray(request.resourceIds) ||
    request.resourceIds.length < 1 ||
    request.resourceIds.length > 10 ||
    request.resourceIds.some((id) => typeof id !== 'string' || !id || id.length > 120) ||
    new Set(request.resourceIds).size !== request.resourceIds.length
  ) {
    throw new ReservationError('Provide between one and ten distinct resource IDs.', 400, 'invalid_resources');
  }

  if (
    !Number.isInteger(request.durationMinutes) ||
    request.durationMinutes < 5 ||
    request.durationMinutes > 480
  ) {
    throw new ReservationError('Duration must be between 5 and 480 whole minutes.', 400, 'invalid_duration');
  }

  if (
    typeof request.startsAt !== 'string' ||
    !/(?:Z|[+-]\d{2}:\d{2})$/i.test(request.startsAt) ||
    !Number.isFinite(Date.parse(request.startsAt))
  ) {
    throw new ReservationError('Start time must be a valid ISO timestamp with a timezone.', 400, 'invalid_start_time');
  }

  const startsAt = new Date(request.startsAt);
  if (startsAt.getTime() <= Date.now()) {
    throw new ReservationError('The appointment must start in the future.', 422, 'appointment_in_past');
  }

  const resourceIds = [...request.resourceIds].sort();
  const endsAt = new Date(startsAt.getTime() + request.durationMinutes * 60_000);
  const normalized = {
    businessId: request.businessId,
    serviceId: request.serviceId,
    serviceName: request.serviceName,
    resourceIds,
    startsAt: startsAt.toISOString(),
    endsAt: endsAt.toISOString(),
    durationMinutes: request.durationMinutes,
  };

  const requestHash = createHash('sha256').update(JSON.stringify(normalized)).digest('hex');
  return { ...normalized, requestHash };
}

function mapBooking(
  booking: {
    id: string;
    business_id: string;
    service_id: string;
    service_name: string;
    starts_at: Date | string;
    ends_at: Date | string;
    status: 'confirmed';
    created_at: Date | string;
  },
  resourceIds: string[],
  replayed: boolean,
): Reservation {
  return {
    bookingId: booking.id,
    businessId: booking.business_id,
    serviceId: booking.service_id,
    serviceName: booking.service_name,
    resourceIds,
    startsAt: new Date(booking.starts_at).toISOString(),
    endsAt: new Date(booking.ends_at).toISOString(),
    status: booking.status,
    createdAt: new Date(booking.created_at).toISOString(),
    replayed,
  };
}

async function readReservation(client: PoolClient, bookingId: string, replayed: boolean) {
  const result = await client.query(
    `SELECT b.id, b.business_id, b.service_id, b.service_name, b.starts_at, b.ends_at,
            b.status, b.created_at,
            COALESCE(array_agg(br.resource_id ORDER BY br.resource_id)
              FILTER (WHERE br.resource_id IS NOT NULL), '{}') AS resource_ids
       FROM bookings b
       LEFT JOIN booking_resources br ON br.booking_id = b.id
      WHERE b.id = $1
      GROUP BY b.id`,
    [bookingId],
  );
  const booking = result.rows[0];
  if (!booking) {
    throw new Error('Committed booking could not be read back.');
  }

  return mapBooking(booking, booking.resource_ids, replayed);
}

export async function createReservation(
  pool: Pool,
  request: ReservationRequest,
  idempotencyKey: string,
): Promise<Reservation> {
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(idempotencyKey)) {
    throw new ReservationError('A valid Idempotency-Key UUID is required.', 400, 'invalid_idempotency_key');
  }

  const booking = normalizeRequest(request);
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const inserted = await client.query(
      `INSERT INTO bookings
         (id, idempotency_key, request_hash, business_id, service_id, service_name,
          starts_at, ends_at, duration_minutes, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'confirmed')
       ON CONFLICT (idempotency_key) DO NOTHING
       RETURNING id`,
      [
        randomUUID(),
        idempotencyKey,
        booking.requestHash,
        booking.businessId,
        booking.serviceId,
        booking.serviceName,
        booking.startsAt,
        booking.endsAt,
        booking.durationMinutes,
      ],
    );

    if (inserted.rowCount === 0) {
      const existing = await client.query(
        'SELECT id, request_hash FROM bookings WHERE idempotency_key = $1',
        [idempotencyKey],
      );
      const existingBooking = existing.rows[0];
      if (!existingBooking) {
        throw new Error('Idempotency key conflict did not resolve to a booking.');
      }
      if (existingBooking.request_hash !== booking.requestHash) {
        throw new ReservationError(
          'This idempotency key was already used for a different booking request.',
          409,
          'idempotency_key_reused',
        );
      }

      const reservation = await readReservation(client, existingBooking.id, true);
      await client.query('COMMIT');
      return reservation;
    }

    const catalog = await client.query(
      `SELECT COUNT(DISTINCT sr.resource_id)::int AS matched_resources
         FROM services s
         LEFT JOIN service_resources sr
           ON sr.business_id = s.business_id AND sr.service_id = s.id
          AND sr.resource_id = ANY($3::text[])
        WHERE s.business_id = $1 AND s.id = $2 AND s.active`,
      [booking.businessId, booking.serviceId, booking.resourceIds],
    );
    if (catalog.rowCount === 0 || catalog.rows[0].matched_resources !== booking.resourceIds.length) {
      throw new ReservationError(
        'The selected service or one or more resources are not bookable for this business.',
        422,
        'invalid_catalog_selection',
      );
    }

    const bookingId = inserted.rows[0].id as string;
    await client.query(
      `INSERT INTO booking_resources
         (booking_id, business_id, service_id, resource_id, starts_at, ends_at, status)
       SELECT $1, $2, $3, resource_id, $4, $5, 'confirmed'
         FROM unnest($6::text[]) AS resource_id`,
      [
        bookingId,
        booking.businessId,
        booking.serviceId,
        booking.startsAt,
        booking.endsAt,
        booking.resourceIds,
      ],
    );

    const reservation = await readReservation(client, bookingId, false);
    await client.query('COMMIT');
    return reservation;
  } catch (error) {
    await client.query('ROLLBACK');

    if (error instanceof ReservationError) {
      throw error;
    }

    if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      error.code === '23P01'
    ) {
      throw new ReservationError(
        'The selected slot is no longer available for one or more resources.',
        409,
        'slot_unavailable',
      );
    }

    throw error;
  } finally {
    client.release();
  }
}
