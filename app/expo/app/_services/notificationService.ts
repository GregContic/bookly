import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// Configure how notifications are handled when received
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export interface NotificationData {
  title: string;
  body: string;
  data?: any;
  categoryId?: string;
  sound?: boolean;
  badge?: number;
  priority?: 'min' | 'low' | 'default' | 'high' | 'max';
  channelId?: string;
}

export interface ScheduledNotificationData extends NotificationData {
  trigger: {
    seconds?: number;
    date?: Date;
    repeats?: boolean;
    weekday?: number;
    hour?: number;
    minute?: number;
  };
}

class NotificationService {
  private expoPushToken: string | null = null;

  /**
   * Initialize notification service - call this on app startup
   */
  async initialize() {
    try {
      await this.requestPermissions();
      await this.registerForPushNotificationsAsync();
      await this.configurePushNotifications();
    } catch (error) {
      console.error('Failed to initialize notifications:', error);
    }
  }

  /**
   * Request notification permissions
   */
  async requestPermissions() {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });

      // Create booking notifications channel
      await Notifications.setNotificationChannelAsync('booking', {
        name: 'Booking Notifications',
        importance: Notifications.AndroidImportance.HIGH,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#EDAE49',
        sound: 'default',
      });

      // Create promo notifications channel
      await Notifications.setNotificationChannelAsync('promo', {
        name: 'Promotional Notifications',
        importance: Notifications.AndroidImportance.DEFAULT,
        vibrationPattern: [0, 250],
        lightColor: '#FF6B35',
        sound: 'default',
      });
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      throw new Error('Permission not granted to get push token for push notification!');
    }

    return finalStatus === 'granted';
  }

  /**
   * Register for push notifications and get Expo push token
   */
  async registerForPushNotificationsAsync() {
    if (!Device.isDevice) {
      console.warn('Must use physical device for Push Notifications');
      return null;
    }

    try {
      const projectId = Constants.expoConfig?.extra?.eas?.projectId || Constants.easConfig?.projectId;
      
      if (!projectId) {
        throw new Error('Project ID not found. Make sure to configure EAS in your app.json');
      }

      const token = await Notifications.getExpoPushTokenAsync({
        projectId,
      });

      this.expoPushToken = token.data;
      console.log('📱 Expo Push Token:', this.expoPushToken);
      
      // TODO: Send this token to your backend server
      await this.sendTokenToServer(this.expoPushToken);
      
      return this.expoPushToken;
    } catch (error) {
      console.error('Failed to get push token:', error);
      return null;
    }
  }

  /**
   * Configure push notification categories and actions
   */
  async configurePushNotifications() {
    // Define notification categories with actions
    await Notifications.setNotificationCategoryAsync('booking', [
      {
        identifier: 'VIEW_BOOKING',
        buttonTitle: 'View Booking',
        options: {
          opensAppToForeground: true,
        },
      },
      {
        identifier: 'CANCEL_BOOKING',
        buttonTitle: 'Cancel',
        options: {
          opensAppToForeground: false,
        },
      },
    ]);

    await Notifications.setNotificationCategoryAsync('promo', [
      {
        identifier: 'VIEW_PROMO',
        buttonTitle: 'View Offer',
        options: {
          opensAppToForeground: true,
        },
      },
      {
        identifier: 'DISMISS_PROMO',
        buttonTitle: 'Dismiss',
        options: {
          opensAppToForeground: false,
        },
      },
    ]);
  }

  /**
   * Send push token to your backend server
   */
  private async sendTokenToServer(token: string) {
    try {
      // Replace with your actual backend endpoint
      const response = await fetch('http://localhost:3000/push-tokens', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          platform: Platform.OS,
          deviceId: Device.deviceName,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send token to server');
      }

      console.log('✅ Push token sent to server successfully');
    } catch (error) {
      console.error('❌ Failed to send token to server:', error);
      // Continue without server registration - local notifications will still work
    }
  }

  /**
   * Schedule a local notification
   */
  async scheduleLocalNotification(data: ScheduledNotificationData) {
    try {
      let trigger: any = null;
      
      if (data.trigger.seconds) {
        trigger = { seconds: data.trigger.seconds };
      } else if (data.trigger.date) {
        trigger = { date: data.trigger.date };
      } else if (data.trigger.repeats) {
        trigger = { 
          repeats: data.trigger.repeats,
          weekday: data.trigger.weekday,
          hour: data.trigger.hour,
          minute: data.trigger.minute
        };
      }

      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: data.title,
          body: data.body,
          data: data.data || {},
          categoryIdentifier: data.categoryId,
          sound: data.sound !== false,
          badge: data.badge,
          priority: this.getPriorityLevel(data.priority),
        },
        trigger,
      });

      console.log('📅 Local notification scheduled:', notificationId);
      return notificationId;
    } catch (error) {
      console.error('Failed to schedule local notification:', error);
      throw error;
    }
  }

  /**
   * Send immediate local notification
   */
  async sendLocalNotification(data: NotificationData) {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: data.title,
          body: data.body,
          data: data.data || {},
          categoryIdentifier: data.categoryId,
          sound: data.sound !== false,
          badge: data.badge,
          priority: this.getPriorityLevel(data.priority),
        },
        trigger: null, // Send immediately
      });

      console.log('🔔 Local notification sent');
    } catch (error) {
      console.error('Failed to send local notification:', error);
      throw error;
    }
  }

  /**
   * Cancel a scheduled notification
   */
  async cancelNotification(notificationId: string) {
    try {
      await Notifications.cancelScheduledNotificationAsync(notificationId);
      console.log('🚫 Notification cancelled:', notificationId);
    } catch (error) {
      console.error('Failed to cancel notification:', error);
    }
  }

  /**
   * Cancel all scheduled notifications
   */
  async cancelAllNotifications() {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
      console.log('🚫 All notifications cancelled');
    } catch (error) {
      console.error('Failed to cancel all notifications:', error);
    }
  }

  /**
   * Get all scheduled notifications
   */
  async getScheduledNotifications() {
    try {
      const notifications = await Notifications.getAllScheduledNotificationsAsync();
      return notifications;
    } catch (error) {
      console.error('Failed to get scheduled notifications:', error);
      return [];
    }
  }

  /**
   * Get the current push token
   */
  getPushToken() {
    return this.expoPushToken;
  }

  /**
   * Convert priority string to Expo priority level
   */
  private getPriorityLevel(priority?: string): Notifications.AndroidNotificationPriority {
    switch (priority) {
      case 'min':
        return Notifications.AndroidNotificationPriority.MIN;
      case 'low':
        return Notifications.AndroidNotificationPriority.LOW;
      case 'high':
        return Notifications.AndroidNotificationPriority.HIGH;
      case 'max':
        return Notifications.AndroidNotificationPriority.MAX;
      default:
        return Notifications.AndroidNotificationPriority.DEFAULT;
    }
  }

  /**
   * Helper methods for common notification types
   */
  
  // Booking confirmation notification
  async sendBookingConfirmation(serviceName: string, date: string, bookingId: string) {
    await this.sendLocalNotification({
      title: 'Booking Confirmed! 🎉',
      body: `Your booking for ${serviceName} on ${date} has been confirmed.`,
      categoryId: 'booking',
      priority: 'high',
      data: {
        type: 'booking_confirmed',
        bookingId,
        serviceName,
        date,
      },
    });
  }

  // Booking reminder notification
  async scheduleBookingReminder(serviceName: string, date: Date, bookingId: string) {
    // Schedule reminder 24 hours before
    const reminderTime = new Date(date.getTime() - 24 * 60 * 60 * 1000);
    
    await this.scheduleLocalNotification({
      title: 'Booking Reminder 📅',
      body: `Don't forget your ${serviceName} appointment tomorrow!`,
      categoryId: 'booking',
      priority: 'high',
      data: {
        type: 'booking_reminder',
        bookingId,
        serviceName,
        date: date.toISOString(),
      },
      trigger: {
        date: reminderTime,
      },
    });
  }

  // Promotional notification
  async sendPromoNotification(title: string, message: string, promoData?: any) {
    await this.sendLocalNotification({
      title,
      body: message,
      categoryId: 'promo',
      priority: 'default',
      data: {
        type: 'promo',
        ...promoData,
      },
    });
  }

  // Service available notification
  async sendServiceAvailableNotification(serviceName: string, location: string) {
    await this.sendLocalNotification({
      title: 'Service Available! 🎯',
      body: `${serviceName} is now available in ${location}`,
      categoryId: 'promo',
      priority: 'default',
      data: {
        type: 'service_available',
        serviceName,
        location,
      },
    });
  }
}

export default new NotificationService();
