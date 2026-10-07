import getEnvVars from '../_config/environment';

export interface BookingReservationRequest {
  businessId: string;
  serviceId: string;
  serviceName: string;
  resourceIds: string[];
  startsAt: string;
  durationMinutes: number;
}

export interface BookingReservationResponse {
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

export class BookingApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly code: string,
  ) {
    super(message);
    this.name = 'BookingApiError';
  }
}

export async function reserveBooking(
  reservation: BookingReservationRequest,
  idempotencyKey: string,
): Promise<BookingReservationResponse> {
  const { apiUrl } = getEnvVars();
  const response = await fetch(`${apiUrl}/bookings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Idempotency-Key': idempotencyKey,
    },
    body: JSON.stringify(reservation),
  });

  let result: unknown;
  try {
    result = await response.json();
  } catch {
    throw new Error(`Booking API returned an invalid response (${response.status}).`);
  }

  if (!response.ok) {
    const error = result as { error?: unknown; code?: unknown };
    throw new BookingApiError(
      typeof error.error === 'string' ? error.error : 'Booking could not be completed.',
      response.status,
      typeof error.code === 'string' ? error.code : 'reservation_failed',
    );
  }

  if (!result || typeof result !== 'object' || !('bookingId' in result)) {
    throw new Error('Booking API response did not include a booking ID.');
  }

  return result as BookingReservationResponse;
}
