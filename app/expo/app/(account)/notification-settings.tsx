import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useNotificationContext } from '../context/NotificationContext';

interface NotificationSettings {
  bookingConfirmations: boolean;
  bookingReminders: boolean;
  promotionalOffers: boolean;
  serviceUpdates: boolean;
  newServices: boolean;
  systemNotifications: boolean;
}

export default function NotificationSettingsPage() {
  const router = useRouter();
  const { isInitialized, pushToken, initializeNotifications } = useNotificationContext();
  
  const [settings, setSettings] = useState<NotificationSettings>({
    bookingConfirmations: true,
    bookingReminders: true,
    promotionalOffers: true,
    serviceUpdates: true,
    newServices: false,
    systemNotifications: true,
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load saved settings from AsyncStorage or API
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      // TODO: Load settings from AsyncStorage or API
      console.log('Loading notification settings...');
    } catch (error) {
      console.error('Failed to load notification settings:', error);
    }
  };

  const saveSettings = async (newSettings: NotificationSettings) => {
    try {
      setIsLoading(true);
      // TODO: Save settings to AsyncStorage or API
      console.log('Saving notification settings:', newSettings);
      setSettings(newSettings);
    } catch (error) {
      console.error('Failed to save notification settings:', error);
      Alert.alert('Error', 'Failed to save notification settings');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSetting = (key: keyof NotificationSettings) => {
    const newSettings = { ...settings, [key]: !settings[key] };
    saveSettings(newSettings);
  };

  const testNotifications = async () => {
    if (!isInitialized) {
      Alert.alert('Error', 'Notifications not initialized');
      return;
    }

    try {
      // Send test notification
      await fetch('http://localhost:3000/send-test-notification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: pushToken,
          title: 'Test Notification 🧪',
          body: 'This is a test notification from BooklyPH!',
        }),
      });
      
      Alert.alert('Success', 'Test notification sent!');
    } catch (error) {
      console.error('Failed to send test notification:', error);
      Alert.alert('Error', 'Failed to send test notification');
    }
  };

  const reinitializeNotifications = async () => {
    try {
      setIsLoading(true);
      await initializeNotifications();
      Alert.alert('Success', 'Notifications reinitialized successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to reinitialize notifications');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Notification Settings</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content}>
        {/* Status Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Status</Text>
          <View style={styles.statusCard}>
            <View style={styles.statusItem}>
              <Ionicons 
                name={isInitialized ? "checkmark-circle" : "alert-circle"} 
                size={20} 
                color={isInitialized ? "#4CAF50" : "#FF6B35"} 
              />
              <Text style={styles.statusText}>
                {isInitialized ? 'Notifications Enabled' : 'Notifications Disabled'}
              </Text>
            </View>
            {pushToken && (
              <Text style={styles.tokenText}>
                Push Token: {pushToken.substring(0, 20)}...
              </Text>
            )}
          </View>
        </View>

        {/* Booking Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Booking Notifications</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Booking Confirmations</Text>
              <Text style={styles.settingDescription}>
                Get notified when your booking is confirmed
              </Text>
            </View>
            <Switch
              value={settings.bookingConfirmations}
              onValueChange={() => toggleSetting('bookingConfirmations')}
              trackColor={{ false: '#767577', true: '#EDAE49' }}
              thumbColor={settings.bookingConfirmations ? '#fff' : '#f4f3f4'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Booking Reminders</Text>
              <Text style={styles.settingDescription}>
                Get reminded about upcoming appointments
              </Text>
            </View>
            <Switch
              value={settings.bookingReminders}
              onValueChange={() => toggleSetting('bookingReminders')}
              trackColor={{ false: '#767577', true: '#EDAE49' }}
              thumbColor={settings.bookingReminders ? '#fff' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Marketing Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Marketing</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Promotional Offers</Text>
              <Text style={styles.settingDescription}>
                Receive notifications about special offers and discounts
              </Text>
            </View>
            <Switch
              value={settings.promotionalOffers}
              onValueChange={() => toggleSetting('promotionalOffers')}
              trackColor={{ false: '#767577', true: '#EDAE49' }}
              thumbColor={settings.promotionalOffers ? '#fff' : '#f4f3f4'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>New Services</Text>
              <Text style={styles.settingDescription}>
                Get notified when new services are available
              </Text>
            </View>
            <Switch
              value={settings.newServices}
              onValueChange={() => toggleSetting('newServices')}
              trackColor={{ false: '#767577', true: '#EDAE49' }}
              thumbColor={settings.newServices ? '#fff' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* System Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>System</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Service Updates</Text>
              <Text style={styles.settingDescription}>
                Get notified about service changes and updates
              </Text>
            </View>
            <Switch
              value={settings.serviceUpdates}
              onValueChange={() => toggleSetting('serviceUpdates')}
              trackColor={{ false: '#767577', true: '#EDAE49' }}
              thumbColor={settings.serviceUpdates ? '#fff' : '#f4f3f4'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>System Notifications</Text>
              <Text style={styles.settingDescription}>
                Important system messages and updates
              </Text>
            </View>
            <Switch
              value={settings.systemNotifications}
              onValueChange={() => toggleSetting('systemNotifications')}
              trackColor={{ false: '#767577', true: '#EDAE49' }}
              thumbColor={settings.systemNotifications ? '#fff' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actions</Text>
          
          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={testNotifications}
            disabled={!isInitialized}
          >
            <Ionicons name="notifications" size={20} color="#EDAE49" />
            <Text style={styles.actionButtonText}>Send Test Notification</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton} 
            onPress={reinitializeNotifications}
            disabled={isLoading}
          >
            <Ionicons name="refresh" size={20} color="#EDAE49" />
            <Text style={styles.actionButtonText}>Reinitialize Notifications</Text>
          </TouchableOpacity>
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
  section: {
    marginTop: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 16,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  statusCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 16,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusText: {
    fontSize: 14,
    color: '#000',
    marginLeft: 8,
    fontWeight: '600',
  },
  tokenText: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'monospace',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  actionButtonText: {
    fontSize: 14,
    color: '#000',
    marginLeft: 12,
    fontWeight: '600',
  },
  bottomPadding: {
    height: 32,
  },
});
