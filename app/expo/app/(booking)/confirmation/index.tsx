import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import {
    Animated,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    useWindowDimensions
} from 'react-native';
import { generateBookingId, useBooking } from '../../../context/BookingContext';

/**
 * ===========================================
 * BOOKING CONFIRMATION PAGE COMPONENT
 * ===========================================
 */
export default function BookingConfirmationPage() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const { addBooking } = useBooking();
  
  // Generate dynamic booking data (this could come from route params in the future)
  const getCurrentDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + Math.floor(Math.random() * 30) + 1); // Random date 1-30 days from now
    return today.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getRandomTime = () => {
    const hours = [8, 9, 10, 11, 14, 15, 16, 17];
    const randomHour = hours[Math.floor(Math.random() * hours.length)];
    const minutes = ['00', '30'];
    const randomMinute = minutes[Math.floor(Math.random() * minutes.length)];
    const period = randomHour >= 12 ? 'PM' : 'AM';
    const displayHour = randomHour > 12 ? randomHour - 12 : randomHour;
    return `${displayHour}:${randomMinute} ${period}`;
  };

  // Generate booking data
  const bookingConfirmation = {
    bookingId: generateBookingId(),
    business: {
      name: 'Shape Up',
    },
    trainer: {
      name: 'Darrell',
    },
    service: {
      name: 'Professional Training',
      duration: '1 hour',
    },
    dateTime: {
      date: getCurrentDate(),
      time: getRandomTime()
    },
    totalAmount: 900.00
  };
  
  // Animation values
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(30)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.8)).current;
  const checkmarkAnim = React.useRef(new Animated.Value(0)).current;
  useEffect(() => {
    // Save the booking to the booking context
    addBooking({
      bookingId: bookingConfirmation.bookingId,
      serviceName: bookingConfirmation.business.name,
      serviceType: bookingConfirmation.service.name,
      businessName: bookingConfirmation.business.name,
      trainerName: bookingConfirmation.trainer.name,
      date: bookingConfirmation.dateTime.date,
      time: bookingConfirmation.dateTime.time,
      duration: bookingConfirmation.service.duration,
      status: 'Upcoming',
      price: `₱${bookingConfirmation.totalAmount.toFixed(2)}`,
      totalAmount: bookingConfirmation.totalAmount,
    });

    // Start animations with staggered timing
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
      Animated.spring(checkmarkAnim, {
        toValue: 1,
        tension: 100,
        friction: 6,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleBackToHome = () => {
    // Navigate back to home page
    router.push('/(drawer)/(tabs)/home');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        contentContainerStyle={[
          styles.scrollContent,
          { minHeight: height - 100 }
        ]} 
        showsVerticalScrollIndicator={false}
      >
        {/* Success Icon */}
        <Animated.View 
          style={[
            styles.successIconContainer,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { scale: checkmarkAnim }
              ]
            }
          ]}
        >
          <View style={styles.successIcon}>
            <Ionicons name="checkmark" size={32} color="#fff" />
          </View>
        </Animated.View>

        {/* Success Message */}
        <Animated.View 
          style={[
            styles.messageContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <Text style={styles.successTitle}>Booked Successfully!</Text>
          <Text style={styles.successSubtitle}>
            Your booking appointment schedule has been confirmed,{'\n'}please see details below:
          </Text>
        </Animated.View>

        {/* Booking Summary Card */}
        <Animated.View 
          style={[
            styles.summaryCard,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }]
            }
          ]}
        >
          {/* Card Header */}
          <View style={styles.cardHeader}>
            <Text style={styles.cardHeaderLeft}>Booking Summary</Text>
            <Text style={styles.cardHeaderRight}>To Pay</Text>
          </View>

          {/* Booking ID */}
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Booking ID:</Text>
            <Text style={styles.summaryValue}>{bookingConfirmation.bookingId}</Text>
          </View>

          {/* Selected Business */}
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Selected Business:</Text>
            <Text style={styles.summaryValue}>{bookingConfirmation.business.name}</Text>
          </View>

          {/* Assigned Trainer */}
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Assigned Trainer:</Text>
            <Text style={styles.summaryValue}>{bookingConfirmation.trainer.name}</Text>
          </View>

          {/* Selected Service */}
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Selected Service:</Text>
            <Text style={styles.summaryValue}>{bookingConfirmation.service.name}</Text>
          </View>

          {/* Duration */}
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Duration:</Text>
            <Text style={styles.summaryValue}>{bookingConfirmation.service.duration}</Text>
          </View>

          {/* Booking Date & Time */}
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Booking Date & Time:</Text>
            <View style={styles.dateTimeContainer}>
              <View style={styles.dateContainer}>
                <Ionicons name="calendar-outline" size={16} color="#666" />
                <Text style={styles.dateText}>{bookingConfirmation.dateTime.date}</Text>
              </View>
              <View style={styles.timeContainer}>
                <Ionicons name="time-outline" size={16} color="#666" />
                <Text style={styles.timeText}>{bookingConfirmation.dateTime.time}</Text>
              </View>
            </View>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Total Amount */}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Amount:</Text>
            <Text style={styles.totalAmount}>₱{bookingConfirmation.totalAmount.toFixed(2)}</Text>
          </View>
        </Animated.View>
      </ScrollView>

      {/* Back to Home Button */}
      <Animated.View 
        style={[
          styles.bottomContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <TouchableOpacity 
          style={styles.backToHomeButton}
          onPress={handleBackToHome}
        >
          <Text style={styles.backToHomeButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

/**
 * ===========================================
 * BOOKING CONFIRMATION PAGE STYLES
 * ===========================================
 */
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F5F0',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 80,
    paddingBottom: 120,
  },
  successIconContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  successIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#81C784',
  },
  messageContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  successSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  cardHeaderLeft: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  cardHeaderRight: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  summaryRow: {
    marginBottom: 15,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  summaryValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  dateTimeContainer: {
    marginTop: 5,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  dateText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    marginLeft: 8,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    marginLeft: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 15,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: Platform.OS === 'ios' ? 35 : 25,
    backgroundColor: '#F8F5F0',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  backToHomeButton: {
    backgroundColor: '#FF9800',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backToHomeButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
