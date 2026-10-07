import { Pool } from 'pg';

const globalForBookingDb = globalThis as typeof globalThis & {
  bookingPool?: Pool;
};

export function getBookingPool(): Pool {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL must be configured to accept bookings');
  }

  if (!globalForBookingDb.bookingPool) {
    globalForBookingDb.bookingPool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 10,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 5_000,
    });
  }

  return globalForBookingDb.bookingPool;
}
