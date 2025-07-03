import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useNotificationContext } from '../context/NotificationContext';

export default function NotificationDemoPage() {
  const router = useRouter();
  const {
    isInitialized,
    pushToken,
    sendLocalNotification,
    scheduleNotification,
    sendBookingConfirmation,
    scheduleBookingReminder,
    sendPromoNotification,
    cancelAllNotifications,
  } = useNotificationContext();

  const sendTestNotification = async () => {
    if (!isInitialized) {
      Alert.alert('Error', 'Notifications not initialized');
      return;
    }

    try {
      await sendLocalNotification(
        'Test Notification 🧪',
        'This is a test notification from BooklyPH!',
        { type: 'test' }
      );
      Alert.alert('Success', 'Test notification sent!');
    } catch (error) {
      Alert.alert('Error', 'Failed to send test notification');
    }
  };

  const scheduleTestNotification = async () => {
    if (!isInitialized) {
      Alert.alert('Error', 'Notifications not initialized');
      return;
    }

    try {
      await scheduleNotification(
        'Scheduled Test 📅',
        'This notification was scheduled for 10 seconds from now!',
        { seconds: 10 },
        { type: 'scheduled_test' }
      );
      Alert.alert('Success', 'Notification scheduled for 10 seconds from now!');
    } catch (error) {
      Alert.alert('Error', 'Failed to schedule notification');
    }
  };

  const sendBookingNotification = async () => {
    if (!isInitialized) {
      Alert.alert('Error', 'Notifications not initialized');
      return;
    }

    try {
      await sendBookingConfirmation(
        'Spa Wellness Session',
        'Tomorrow at 2:00 PM',
        'booking-123'
      );
      Alert.alert('Success', 'Booking confirmation sent!');
    } catch (error) {
      Alert.alert('Error', 'Failed to send booking confirmation');
    }
  };

  const scheduleReminderNotification = async () => {
    if (!isInitialized) {
      Alert.alert('Error', 'Notifications not initialized');
      return;
    }

    try {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(14, 0, 0, 0); // 2:00 PM tomorrow
      
      await scheduleBookingReminder(
        'Spa Wellness Session',
        tomorrow,
        'booking-123'
      );
      Alert.alert('Success', 'Booking reminder scheduled!');
    } catch (error) {
      Alert.alert('Error', 'Failed to schedule booking reminder');
    }
  };

  const sendPromoNotificationDemo = async () => {
    if (!isInitialized) {
      Alert.alert('Error', 'Notifications not initialized');
      return;
    }

    try {
      await sendPromoNotification(
        'Special Offer! 🎉',
        'Get 50% off on all spa services this weekend only!',
        { promoCode: 'WEEKEND50', validUntil: '2025-07-06' }
      );
      Alert.alert('Success', 'Promo notification sent!');
    } catch (error) {
      Alert.alert('Error', 'Failed to send promo notification');
    }
  };

  const clearAllNotifications = async () => {
    try {
      await cancelAllNotifications();
      Alert.alert('Success', 'All scheduled notifications cleared!');
    } catch (error) {
      Alert.alert('Error', 'Failed to clear notifications');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Notification Demo</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content}>
        {/* Status */}
        <View style={styles.statusCard}>
          <View style={styles.statusItem}>
            <Ionicons 
              name={isInitialized ? "checkmark-circle" : "alert-circle"} 
              size={24} 
              color={isInitialized ? "#4CAF50" : "#FF6B35"} 
            />
            <Text style={styles.statusText}>
              {isInitialized ? 'Notifications Ready' : 'Notifications Not Ready'}
            </Text>
          </View>
          {pushToken && (
            <Text style={styles.tokenText}>
              Push Token Available: {pushToken.substring(0, 30)}...
            </Text>
          )}
        </View>

        {/* Demo Buttons */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Local Notifications</Text>
          
          <TouchableOpacity 
            style={styles.demoButton} 
            onPress={sendTestNotification}
            disabled={!isInitialized}
          >
            <Ionicons name="notifications" size={20} color="#EDAE49" />
            <Text style={styles.buttonText}>Send Test Notification</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.demoButton} 
            onPress={scheduleTestNotification}
            disabled={!isInitialized}
          >
            <Ionicons name="time" size={20} color="#EDAE49" />
            <Text style={styles.buttonText}>Schedule Test (10 seconds)</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Booking Notifications</Text>
          
          <TouchableOpacity 
            style={styles.demoButton} 
            onPress={sendBookingNotification}
            disabled={!isInitialized}
          >
            <Ionicons name="calendar" size={20} color="#4CAF50" />
            <Text style={styles.buttonText}>Send Booking Confirmation</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.demoButton} 
            onPress={scheduleReminderNotification}
            disabled={!isInitialized}
          >
            <Ionicons name="alarm" size={20} color="#4CAF50" />
            <Text style={styles.buttonText}>Schedule Booking Reminder</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Marketing Notifications</Text>
          
          <TouchableOpacity 
            style={styles.demoButton} 
            onPress={sendPromoNotificationDemo}
            disabled={!isInitialized}
          >
            <Ionicons name="gift" size={20} color="#FF6B35" />
            <Text style={styles.buttonText}>Send Promo Notification</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Management</Text>
          
          <TouchableOpacity 
            style={[styles.demoButton, styles.clearButton]} 
            onPress={clearAllNotifications}
          >
            <Ionicons name="trash" size={20} color="#FF4444" />
            <Text style={[styles.buttonText, styles.clearButtonText]}>
              Clear All Scheduled Notifications
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.instructions}>
          <Text style={styles.instructionsTitle}>Instructions:</Text>
          <Text style={styles.instructionsText}>
            • Make sure notifications are enabled in your device settings
          </Text>
          <Text style={styles.instructionsText}>
            • Local notifications work on simulator/emulator
          </Text>
          <Text style={styles.instructionsText}>
            • Push notifications require a physical device
          </Text>
          <Text style={styles.instructionsText}>
            • Check the console for notification logs
          </Text>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  headerRight: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  statusCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusText: {
    fontSize: 16,
    color: '#000',
    marginLeft: 12,
    fontWeight: '600',
  },
  tokenText: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'monospace',
    marginTop: 4,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  demoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  buttonText: {
    fontSize: 14,
    color: '#000',
    marginLeft: 12,
    fontWeight: '600',
  },
  clearButton: {
    backgroundColor: '#ffebee',
  },
  clearButtonText: {
    color: '#FF4444',
  },
  instructions: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 12,
  },
  instructionsText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 4,
  },
  bottomPadding: {
    height: 32,
  },
});
