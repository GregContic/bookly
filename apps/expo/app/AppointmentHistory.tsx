import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { useBooking } from '../context/BookingContext';

export default function AppointmentHistory() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const [orientation, setOrientation] = useState('PORTRAIT');
  const { bookings } = useBooking();

  // Animation values
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(30)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.95)).current;

  // Dynamic scaling calculations
  const scale = width / 375;
  const dynamicFontSize = (size: number) => Math.round(size * scale);
  const dynamicSpacing = (size: number) => Math.round(size * scale);

  useEffect(() => {
    // Handle orientation changes
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setOrientation(window.width < window.height ? 'PORTRAIT' : 'LANDSCAPE');
    });

    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    return () => subscription?.remove();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['rgba(255, 192, 203, 0.08)', 'rgba(255, 182, 193, 0.04)', 'rgba(255, 192, 203, 0.02)']}
        style={styles.pinkCircle}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0, 0.5, 1]}
      />
      <LinearGradient
        colors={['rgba(255, 192, 203, 0.08)', 'rgba(255, 182, 193, 0.04)', 'rgba(255, 192, 203, 0.02)']}
        style={styles.pinkCircleRight}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0, 0.5, 1]}
      />
      <LinearGradient
        colors={['rgba(255, 192, 203, 0.08)', 'rgba(255, 182, 193, 0.04)', 'rgba(255, 192, 203, 0.02)']}
        style={styles.orangeCircleBottom}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0, 0.5, 1]}
      />
      <LinearGradient
        colors={['rgba(255, 192, 203, 0.08)', 'rgba(255, 182, 193, 0.04)', 'rgba(255, 192, 203, 0.02)']}
        style={styles.pinkCircleBottomRight}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0, 0.5, 1]}
      />
      <Animated.View 
        style={[
          styles.headerRow,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={dynamicFontSize(24)} color="#B0B0B0" />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { fontSize: dynamicFontSize(20) }]}>Appointment History</Text>
        <View style={{ width: dynamicSpacing(24) }} />
      </Animated.View>      <ScrollView 
        contentContainerStyle={{ paddingBottom: height * 0.15 }}
        showsVerticalScrollIndicator={false}
      >
        {bookings.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="calendar-outline" size={60} color="#ccc" />
            <Text style={styles.emptyTitle}>No Appointments Yet</Text>
            <Text style={styles.emptySubtitle}>
              Your booked appointments will appear here
            </Text>
          </View>
        ) : (
          bookings.map((appointment, index) => (
            <Animated.View
              key={appointment.id}
              style={[
                styles.appointmentCard,
                {
                  opacity: fadeAnim,
                  transform: [
                    { scale: scaleAnim },
                    {
                      translateY: slideAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 30 + (index * 10)]
                      })
                    }
                  ]
                }
              ]}
            >
              <View style={styles.appointmentHeader}>
                <Text style={[styles.serviceName, { fontSize: dynamicFontSize(16) }]}>{appointment.serviceName}</Text>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: appointment.status === 'Completed' ? '#4CAF50' : '#FF9800' }
                ]}>
                  <Text style={[styles.statusText, { fontSize: dynamicFontSize(12) }]}>{appointment.status}</Text>
                </View>
              </View>
              
              <Text style={[styles.serviceType, { fontSize: dynamicFontSize(14) }]}>{appointment.serviceType}</Text>
              
              <View style={styles.appointmentDetails}>
                <View style={styles.detailRow}>
                  <Ionicons name="calendar-outline" size={dynamicFontSize(16)} color="#666" />
                  <Text style={[styles.detailText, { fontSize: dynamicFontSize(14) }]}>{appointment.date}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="time-outline" size={dynamicFontSize(16)} color="#666" />
                  <Text style={[styles.detailText, { fontSize: dynamicFontSize(14) }]}>{appointment.time}</Text>
                </View>
                <View style={styles.detailRow}>
                  <Ionicons name="cash-outline" size={dynamicFontSize(16)} color="#666" />
                  <Text style={[styles.detailText, { fontSize: dynamicFontSize(14) }]}>{appointment.price}</Text>
                </View>
                {appointment.trainerName && (
                  <View style={styles.detailRow}>
                    <Ionicons name="person-outline" size={dynamicFontSize(16)} color="#666" />
                    <Text style={[styles.detailText, { fontSize: dynamicFontSize(14) }]}>{appointment.trainerName}</Text>
                  </View>
                )}
              </View>

              <TouchableOpacity 
                style={[
                  styles.viewDetailsButton,
                  { opacity: appointment.status === 'Completed' ? 0.7 : 1 }
                ]}
              >
                <Text style={[styles.viewDetailsText, { fontSize: dynamicFontSize(14) }]}>
                  {appointment.status === 'Completed' ? 'View Details' : 'Manage Appointment'}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F5F0',
  },
  pinkCircle: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 150,
    top: -10,
    left: -100,
    opacity: 0.3,
    zIndex: 0,
  },
  pinkCircleRight: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 150,
    top: 50,
    right: -100,
    opacity: 0.3,
    zIndex: 0,
  },
  orangeCircleBottom: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    bottom: '10%',
    left: -80,
    opacity: 0.3,
    zIndex: 0,
  },
  pinkCircleBottomRight: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    bottom: '25%',
    right: -70,
    opacity: 0.3,
    zIndex: 0,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    paddingTop: Platform.OS === 'ios' ? '15%' : '18%',
    paddingBottom: '2%',
    backgroundColor: 'transparent',
  },
  headerTitle: {
    fontWeight: 'bold',
    color: '#000',
  },
  appointmentCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 16,
    marginHorizontal: '5%',
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceName: {
    fontWeight: 'bold',
    color: '#222',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontWeight: '600',
  },
  serviceType: {
    color: '#666',
    marginBottom: 12,
  },
  appointmentDetails: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 12,
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    color: '#666',
    marginLeft: 8,
  },
  viewDetailsButton: {
    backgroundColor: '#EDAE49',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },  viewDetailsText: {
    color: '#fff',
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
}); 