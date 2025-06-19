import { useBooking } from '../_context/BookingContext';

/**
 * Test utility to add sample bookings for development/testing
 * This should be removed in production
 */
export function addSampleBookings() {
  const { addBooking } = useBooking();

  const sampleBookings = [
    {
      bookingId: 'BPH-TEST001',
      serviceName: 'The Spa Wellness',
      serviceType: 'Swedish Massage',
      businessName: 'The Spa Wellness',
      trainerName: 'Maria',
      date: 'March 15, 2025',
      time: '2:30 PM',
      duration: '1 hour',
      status: 'Completed' as const,
      price: '₱1,200.00',
      totalAmount: 1200.00,
    },
    {
      bookingId: 'BPH-TEST002',
      serviceName: 'Pulse Fitness Center',
      serviceType: 'Personal Training',
      businessName: 'Pulse Fitness Center',
      trainerName: 'Carlos',
      date: 'March 20, 2025',
      time: '4:00 PM',
      duration: '1 hour',
      status: 'Upcoming' as const,
      price: '₱800.00',
      totalAmount: 800.00,
    },
  ];

  // Add sample bookings (only if no bookings exist)
  sampleBookings.forEach(booking => {
    addBooking(booking);
  });
}

export default addSampleBookings;
