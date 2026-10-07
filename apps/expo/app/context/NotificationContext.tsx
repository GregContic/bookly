import React, { createContext, useContext, useEffect } from 'react';
import { useNotifications, UseNotificationsReturn } from '../_hooks/useNotifications';

interface NotificationContextType extends UseNotificationsReturn {
  // Additional context-specific methods
  handleBookingCreated: (booking: any) => Promise<void>;
  handlePromoAvailable: (promo: any) => Promise<void>;
  handleServiceUpdate: (service: any) => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotificationContext must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: React.ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const notifications = useNotifications();
  
  useEffect(() => {
    // Initialize notifications when the provider mounts
    if (!notifications.isInitialized) {
      notifications.initializeNotifications();
    }
  }, []);

  // Handle booking created
  const handleBookingCreated = async (booking: any) => {
    try {
      await notifications.sendBookingConfirmation(
        booking.serviceName,
        booking.date,
        booking.id
      );
      
      // Schedule reminder 24 hours before
      const bookingDate = new Date(booking.date);
      await notifications.scheduleBookingReminder(
        booking.serviceName,
        bookingDate,
        booking.id
      );
    } catch (error) {
      console.error('Failed to send booking notifications:', error);
    }
  };

  // Handle promo available
  const handlePromoAvailable = async (promo: any) => {
    try {
      await notifications.sendPromoNotification(
        promo.title || 'New Promotion Available! 🎉',
        promo.message || 'Check out our latest offers',
        promo
      );
    } catch (error) {
      console.error('Failed to send promo notification:', error);
    }
  };

  // Handle service update
  const handleServiceUpdate = async (service: any) => {
    try {
      await notifications.sendLocalNotification(
        'Service Update 📢',
        `${service.name} has been updated. Check out the new features!`,
        {
          type: 'service_update',
          serviceId: service.id,
          serviceName: service.name,
        }
      );
    } catch (error) {
      console.error('Failed to send service update notification:', error);
    }
  };

  const contextValue: NotificationContextType = {
    ...notifications,
    handleBookingCreated,
    handlePromoAvailable,
    handleServiceUpdate,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};
