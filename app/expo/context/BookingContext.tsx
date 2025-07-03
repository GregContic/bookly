import { createContext, ReactNode, useContext, useState } from 'react';
import { useNotificationContext } from '../app/context/NotificationContext';

/**
 * ===========================================
 * BOOKING INTERFACE DEFINITIONS
 * ===========================================
 */
export interface BookingData {
  id: string;
  bookingId: string;
  serviceName: string;
  serviceType: string;
  businessName: string;
  trainerName?: string;
  date: string;
  time: string;
  duration: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
  price: string;
  totalAmount: number;
  createdAt: string;
}

export interface BookingContextType {
  bookings: BookingData[];
  addBooking: (booking: Omit<BookingData, 'id' | 'createdAt'>) => Promise<void>;
  updateBookingStatus: (bookingId: string, status: BookingData['status']) => void;
  getBookingById: (bookingId: string) => BookingData | undefined;
  clearBookings: () => void;
}

/**
 * ===========================================
 * BOOKING CONTEXT
 * ===========================================
 */
const BookingContext = createContext<BookingContextType | undefined>(undefined);

/**
 * ===========================================
 * BOOKING PROVIDER COMPONENT
 * ===========================================
 */
export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<BookingData[]>([]);
  const notifications = useNotificationContext();

  const addBooking = async (booking: Omit<BookingData, 'id' | 'createdAt'>) => {
    const newBooking: BookingData = {
      ...booking,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setBookings(prev => [newBooking, ...prev]);
    
    // Send booking confirmation notification if notifications are initialized
    if (notifications?.isInitialized) {
      try {
        await notifications.handleBookingCreated({
          id: newBooking.bookingId,
          serviceName: newBooking.serviceName,
          date: `${newBooking.date} at ${newBooking.time}`,
        });
      } catch (error) {
        console.error('Failed to send booking notification:', error);
      }
    }
  };

  const updateBookingStatus = (bookingId: string, status: BookingData['status']) => {
    setBookings(prev =>
      prev.map(booking =>
        booking.bookingId === bookingId
          ? { ...booking, status }
          : booking
      )
    );
  };

  const getBookingById = (bookingId: string) => {
    return bookings.find(booking => booking.bookingId === bookingId);
  };

  const clearBookings = () => {
    setBookings([]);
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        addBooking,
        updateBookingStatus,
        getBookingById,
        clearBookings,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
}

/**
 * ===========================================
 * BOOKING HOOK
 * ===========================================
 */
export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}

/**
 * ===========================================
 * UTILITY FUNCTIONS
 * ===========================================
 */
export function generateBookingId(): string {
  const prefix = 'BPH';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${random}${timestamp}`;
}

export function formatBookingDate(date: string): string {
  const bookingDate = new Date(date);
  return bookingDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export function formatBookingTime(time: string): string {
  return time;
}
