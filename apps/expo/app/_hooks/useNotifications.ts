import * as Notifications from 'expo-notifications';
import { useEffect, useRef, useState } from 'react';
import { Alert } from 'react-native';
import NotificationService from '../_services/notificationService';

export interface NotificationState {
  isInitialized: boolean;
  pushToken: string | null;
  lastNotification: Notifications.Notification | null;
  isLoading: boolean;
  error: string | null;
}

export interface UseNotificationsReturn extends NotificationState {
  initializeNotifications: () => Promise<void>;
  sendLocalNotification: (title: string, body: string, data?: any) => Promise<void>;
  scheduleNotification: (title: string, body: string, trigger: any, data?: any) => Promise<string | null>;
  cancelNotification: (id: string) => Promise<void>;
  cancelAllNotifications: () => Promise<void>;
  sendBookingConfirmation: (serviceName: string, date: string, bookingId: string) => Promise<void>;
  scheduleBookingReminder: (serviceName: string, date: Date, bookingId: string) => Promise<void>;
  sendPromoNotification: (title: string, message: string, promoData?: any) => Promise<void>;
}

export const useNotifications = (): UseNotificationsReturn => {
  const [state, setState] = useState<NotificationState>({
    isInitialized: false,
    pushToken: null,
    lastNotification: null,
    isLoading: false,
    error: null,
  });

  const notificationListener = useRef<Notifications.Subscription | null>(null);
  const responseListener = useRef<Notifications.Subscription | null>(null);

  useEffect(() => {
    // Initialize notifications on mount
    initializeNotifications();

    // Listen for notifications received while app is running
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('🔔 Notification received:', notification);
      setState(prev => ({ ...prev, lastNotification: notification }));
    });

    // Listen for user interactions with notifications
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('👆 Notification response:', response);
      handleNotificationResponse(response);
    });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  const initializeNotifications = async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }));
      
      await NotificationService.initialize();
      const token = NotificationService.getPushToken();
      
      setState(prev => ({
        ...prev,
        isInitialized: true,
        pushToken: token,
        isLoading: false,
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to initialize notifications';
      setState(prev => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }));
      console.error('Failed to initialize notifications:', error);
    }
  };

  const handleBookingCancellation = async (bookingId: string) => {
    try {
      // TODO: Implement booking cancellation logic
      console.log('Cancelling booking:', bookingId);
      Alert.alert('Success', 'Booking cancelled successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to cancel booking');
    }
  };

  const handleDefaultNotificationTap = (data: any) => {
    // Handle default notification tap based on data type
    switch (data.type) {
      case 'booking_confirmed':
      case 'booking_reminder':
        console.log('Navigate to booking details:', data.bookingId);
        break;
      
      case 'promo':
        console.log('Navigate to promo:', data);
        break;
      
      case 'service_available':
        console.log('Navigate to service:', data.serviceName);
        break;
      
      default:
        console.log('Handle default notification tap:', data);
        break;
    }
  };

  const handleNotificationResponse = (response: Notifications.NotificationResponse) => {
    const { notification, actionIdentifier } = response;
    const data = notification.request.content.data;

    switch (actionIdentifier) {
      case 'VIEW_BOOKING':
        // Navigate to booking details
        console.log('Navigate to booking:', data.bookingId);
        break;
      
      case 'CANCEL_BOOKING':
        // Handle booking cancellation
        Alert.alert(
          'Cancel Booking',
          'Are you sure you want to cancel this booking?',
          [
            { text: 'No', style: 'cancel' },
            { text: 'Yes', onPress: () => handleBookingCancellation(data.bookingId as string) }
          ]
        );
        break;
      
      case 'VIEW_PROMO':
        // Navigate to promo details
        console.log('Navigate to promo:', data);
        break;
      
      case 'DISMISS_PROMO':
        // Handle promo dismissal
        console.log('Promo dismissed');
        break;
      
      default:
        // Handle default tap (no action button)
        handleDefaultNotificationTap(data);
        break;
    }
  };

  const sendLocalNotification = async (title: string, body: string, data?: any) => {
    try {
      await NotificationService.sendLocalNotification({
        title,
        body,
        data,
      });
    } catch (error) {
      console.error('Failed to send local notification:', error);
      throw error;
    }
  };

  const scheduleNotification = async (title: string, body: string, trigger: any, data?: any) => {
    try {
      const id = await NotificationService.scheduleLocalNotification({
        title,
        body,
        data,
        trigger,
      });
      return id;
    } catch (error) {
      console.error('Failed to schedule notification:', error);
      return null;
    }
  };

  const cancelNotification = async (id: string) => {
    try {
      await NotificationService.cancelNotification(id);
    } catch (error) {
      console.error('Failed to cancel notification:', error);
    }
  };

  const cancelAllNotifications = async () => {
    try {
      await NotificationService.cancelAllNotifications();
    } catch (error) {
      console.error('Failed to cancel all notifications:', error);
    }
  };

  const sendBookingConfirmation = async (serviceName: string, date: string, bookingId: string) => {
    try {
      await NotificationService.sendBookingConfirmation(serviceName, date, bookingId);
    } catch (error) {
      console.error('Failed to send booking confirmation:', error);
      throw error;
    }
  };

  const scheduleBookingReminder = async (serviceName: string, date: Date, bookingId: string) => {
    try {
      await NotificationService.scheduleBookingReminder(serviceName, date, bookingId);
    } catch (error) {
      console.error('Failed to schedule booking reminder:', error);
      throw error;
    }
  };

  const sendPromoNotification = async (title: string, message: string, promoData?: any) => {
    try {
      await NotificationService.sendPromoNotification(title, message, promoData);
    } catch (error) {
      console.error('Failed to send promo notification:', error);
      throw error;
    }
  };

  return {
    ...state,
    initializeNotifications,
    sendLocalNotification,
    scheduleNotification,
    cancelNotification,
    cancelAllNotifications,
    sendBookingConfirmation,
    scheduleBookingReminder,
    sendPromoNotification,
  };
};
