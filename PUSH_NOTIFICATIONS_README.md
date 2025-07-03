# BooklyPH Push Notifications Setup

This guide will help you set up push notifications for the BooklyPH application.

## 📋 Prerequisites

- Node.js and npm installed
- Physical device for testing push notifications (simulator/emulator for local notifications only)
- Expo CLI installed globally

## 🚀 Setup Instructions

### 1. Install Dependencies

The required packages are already installed:
- `expo-notifications`
- `expo-device`
- `expo-constants`

### 2. Configure app.json

The app.json has been updated with notification configuration:

```json
{
  "expo": {
    "plugins": [
      [
        "expo-notifications",
        {
          "icon": "./assets/images/icon.png",
          "color": "#ffffff",
          "defaultChannel": "default",
          "sounds": []
        }
      ]
    ],
    "android": {
      "permissions": [
        "VIBRATE",
        "RECEIVE_BOOT_COMPLETED",
        "WAKE_LOCK"
      ]
    }
  }
}
```

### 3. EAS Project Setup (for Push Notifications)

To use push notifications, you need to set up EAS (Expo Application Services):

1. Install EAS CLI:
   ```bash
   npm install -g @expo/eas-cli
   ```

2. Login to Expo:
   ```bash
   eas login
   ```

3. Configure EAS:
   ```bash
   eas build:configure
   ```

4. Add your project ID to app.json:
   ```json
   {
     "expo": {
       "extra": {
         "eas": {
           "projectId": "your-project-id-here"
         }
       }
     }
   }
   ```

### 4. Push Notification Server Setup

1. Navigate to the push-server directory:
   ```bash
   cd push-server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

The server will run on `http://localhost:3000`

### 5. Testing Notifications

#### Local Notifications (Works on Simulator/Emulator)
1. Open the app
2. Navigate to Account → Notification Demo
3. Test various notification types

#### Push Notifications (Requires Physical Device)
1. Run the app on a physical device
2. Make sure the push server is running
3. The app will automatically register the device token
4. Use the notification demo to test push notifications

## 📱 Available Notification Types

### 1. Booking Notifications
- **Booking Confirmation**: Sent when a booking is created
- **Booking Reminder**: Scheduled 24 hours before appointment
- **Booking Cancellation**: Sent when booking is cancelled

### 2. Promotional Notifications
- **Special Offers**: Marketing promotions and discounts
- **New Services**: Notifications about new services available
- **Seasonal Promotions**: Holiday and seasonal offers

### 3. System Notifications
- **Service Updates**: Changes to existing services
- **App Updates**: New features and improvements
- **System Maintenance**: Important system messages

## 🔧 Usage in Code

### Using the Notification Context

```typescript
import { useNotificationContext } from '../context/NotificationContext';

function MyComponent() {
  const {
    sendLocalNotification,
    sendBookingConfirmation,
    scheduleBookingReminder,
    sendPromoNotification
  } = useNotificationContext();

  const handleBookingConfirmed = async () => {
    await sendBookingConfirmation('Spa Session', '2025-07-04 at 2:00 PM', 'booking-123');
  };

  const handlePromoAvailable = async () => {
    await sendPromoNotification('50% Off!', 'Limited time offer on all services');
  };
}
```

### Using the Notification Service Directly

```typescript
import NotificationService from '../_services/notificationService';

// Send immediate notification
await NotificationService.sendLocalNotification({
  title: 'Hello!',
  body: 'This is a test notification',
  data: { customData: 'value' }
});

// Schedule notification
await NotificationService.scheduleLocalNotification({
  title: 'Reminder',
  body: 'Don\'t forget your appointment!',
  trigger: { seconds: 60 }, // 1 minute from now
  data: { type: 'reminder' }
});
```

## 🔔 Notification Channels (Android)

The app creates the following notification channels:

1. **Default**: General notifications
2. **Booking**: Booking-related notifications (high priority)
3. **Promo**: Promotional notifications (default priority)

## 📊 Notification Analytics

Monitor notification performance through:

1. **Console Logs**: Check app logs for notification events
2. **Server Logs**: Monitor push server for delivery status
3. **Device Settings**: Check notification permissions and settings

## 🛠️ Troubleshooting

### Common Issues:

1. **Notifications not appearing**:
   - Check device notification permissions
   - Ensure app is not in battery optimization mode
   - Verify notification channels are enabled

2. **Push notifications not working**:
   - Ensure using physical device (not simulator)
   - Check if push server is running
   - Verify EAS project ID is configured

3. **Scheduled notifications not firing**:
   - Check device's Do Not Disturb settings
   - Verify notification permissions
   - Ensure app has background refresh enabled

### Debug Steps:

1. Check notification permissions:
   ```typescript
   const { status } = await Notifications.getPermissionsAsync();
   console.log('Notification permission status:', status);
   ```

2. Verify push token:
   ```typescript
   const token = await Notifications.getExpoPushTokenAsync();
   console.log('Push token:', token);
   ```

3. Check scheduled notifications:
   ```typescript
   const scheduled = await Notifications.getAllScheduledNotificationsAsync();
   console.log('Scheduled notifications:', scheduled);
   ```

## 📋 Testing Checklist

- [ ] Local notifications work on simulator/emulator
- [ ] Push notifications work on physical device
- [ ] Booking notifications are sent when bookings are created
- [ ] Scheduled reminders work correctly
- [ ] Promotional notifications are delivered
- [ ] Notification actions work properly
- [ ] Settings page allows toggling notification types
- [ ] Push server receives and processes requests

## 🔒 Security Notes

1. **Push Tokens**: Store securely and don't expose in client-side code
2. **Server Authentication**: Implement proper authentication for push server
3. **Data Validation**: Validate all notification data before sending
4. **Rate Limiting**: Implement rate limiting to prevent spam

## 📚 Additional Resources

- [Expo Notifications Documentation](https://docs.expo.dev/versions/latest/sdk/notifications/)
- [Expo Push Notifications Guide](https://docs.expo.dev/push-notifications/overview/)
- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)

## 🤝 Support

For issues or questions about push notifications:
1. Check the troubleshooting section above
2. Review Expo documentation
3. Check console logs for error messages
4. Test on different devices and OS versions
