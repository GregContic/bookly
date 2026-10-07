import { NextResponse } from 'next/server';
import {
  createReservation,
  ReservationError,
  type ReservationRequest,
} from '../../../lib/booking-reservations';
import { getBookingPool } from '../../../lib/booking-db';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Request body must be valid JSON.', code: 'invalid_json' },
      { status: 400 },
    );
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return NextResponse.json(
      { error: 'Request body must be a JSON object.', code: 'invalid_request' },
      { status: 400 },
    );
  }

  try {
    const reservation = await createReservation(
      getBookingPool(),
      body as ReservationRequest,
      request.headers.get('Idempotency-Key') ?? '',
    );
    return NextResponse.json(reservation, { status: reservation.replayed ? 200 : 201 });
  } catch (error) {
    if (error instanceof ReservationError) {
      return NextResponse.json(
        { error: error.message, code: error.code },
        { status: error.status },
      );
    }

    console.error('Booking reservation failed:', error);
    return NextResponse.json(
      { error: 'Booking could not be completed. Please try again.', code: 'reservation_failed' },
      { status: 503 },
    );
  }
}
