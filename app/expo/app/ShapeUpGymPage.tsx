import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import {
    Animated,
    Image,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    useWindowDimensions
} from 'react-native';
import BottomNavBar from './_components/BottomNavBar';

/**
 * ===========================================
 * SHAPE UP GYM DATA
 * ===========================================
 */
const gymData = {
  id: '1',
  name: 'Shape Up',
  fullName: 'Shape Up Gym',
  image: require('../assets/images/shapeup_gym.png'),
  rating: 4.95,
  reviewCount: 1374,
  location: 'Session Road, Baguio City',
  schedule: 'Monday - Sunday',
  hours: '6:00 AM - 10:00 PM',
  description: 'We are dedicated to helping you achieve your fitness goals with top-tier equipment, expert trainers, and a motivating environment. Whether you\'re into strength training, cardio, or group classes, our facility is designed to support all levels of fitness.',
  facilities: [
    'Modern Equipment',
    'Boxing Area',
    'Wide Locker Room',
    'Hot and Cold Shower Room',
    'Parking'
  ],
  services: [
    {
      id: '1',
      name: 'Walk-in Access',
      description: 'Duration: Unlimited (Day Pass)',
      price: '₱250/visit'
    },
    {
      id: '2',
      name: 'Monthly Membership',
      description: 'Full gym access with trainer support',
      price: '₱2,500/month'
    },
    {
      id: '3',
      name: 'Personal Training',
      description: '1-on-1 sessions with certified trainers',
      price: '₱1,500/session'
    }
  ]
};

/**
 * ===========================================
 * SHAPE UP GYM PAGE COMPONENT
 * ===========================================
 */
export default function ShapeUpGymPage() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  
  // Animation values
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(30)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
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
  }, []);

  const handleBack = () => {
    router.back();
  };
  const handleBookAppointment = () => {
    router.push('/(booking)/details');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <Animated.View 
        style={[
          styles.headerRow,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="bookmark-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </Animated.View>

      <ScrollView 
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: height * 0.15 }
        ]} 
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Image */}
        <Animated.View 
          style={[
            styles.heroContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }]
            }
          ]}
        >
          <Image 
            source={gymData.image} 
            style={styles.heroImage} 
            resizeMode="cover" 
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>SHAPE-UP</Text>
            <Text style={styles.heroSubtitle}>GYM</Text>
          </View>
        </Animated.View>

        {/* Main Content */}
        <Animated.View 
          style={[
            styles.contentContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          {/* Basic Info */}
          <View style={styles.infoCard}>
            <Text style={styles.gymName}>{gymData.name}</Text>
            
            <View style={styles.ratingRow}>
              <FontAwesome name="star" size={16} color="#EDAE49" />
              <Text style={styles.rating}>{gymData.rating}</Text>
              <Text style={styles.reviewCount}>({gymData.reviewCount} Reviews)</Text>
            </View>

            <View style={styles.infoRow}>
              <MaterialIcons name="location-on" size={16} color="#666" />
              <Text style={styles.infoText}>{gymData.location}</Text>
            </View>

            <View style={styles.infoRow}>
              <MaterialIcons name="access-time" size={16} color="#666" />
              <Text style={styles.infoText}>{gymData.schedule}</Text>
            </View>

            <View style={styles.infoRow}>
              <MaterialIcons name="schedule" size={16} color="#666" />
              <Text style={styles.infoText}>{gymData.hours}</Text>
            </View>
          </View>

          {/* About Us Section */}
          <Animated.View 
            style={[
              styles.sectionContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <Text style={styles.sectionTitle}>About Us</Text>
            <Text style={styles.aboutText}>{gymData.description}</Text>
            
            <Text style={styles.subSectionTitle}>We Offer:</Text>
            {gymData.facilities.map((facility, index) => (
              <View key={index} style={styles.facilityRow}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.facilityText}>{facility}</Text>
              </View>
            ))}
          </Animated.View>

          {/* Services Section */}
          <Animated.View 
            style={[
              styles.sectionContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <Text style={styles.sectionTitle}>Services</Text>
            {gymData.services.map((service, index) => (
              <View key={service.id} style={styles.serviceCard}>
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <Text style={styles.serviceDescription}>{service.description}</Text>
                </View>
                <Text style={styles.servicePrice}>{service.price}</Text>
              </View>
            ))}
          </Animated.View>

          {/* Book Appointment Button */}
          <Animated.View 
            style={[
              styles.bookingContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <TouchableOpacity 
              style={styles.bookButton}
              onPress={handleBookAppointment}
            >
              <Text style={styles.bookButtonText}>Book an Appointment</Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </ScrollView>
      
      <BottomNavBar activePage='FitnessAndSportsPage' />
    </SafeAreaView>
  );
}

/**
 * ===========================================
 * SHAPE UP GYM PAGE STYLES
 * ===========================================
 */
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F5F0',
  },
  scrollContent: {
    flexGrow: 1,
  },
  headerRow: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  heroContainer: {
    position: 'relative',
    height: 250,
    marginBottom: -30,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#EDAE49',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 2,
  },
  heroSubtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#EDAE49',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 2,
  },
  contentContainer: {
    backgroundColor: '#F8F5F0',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  gymName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 10,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  rating: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginLeft: 5,
  },
  reviewCount: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  sectionContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 15,
  },
  aboutText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 15,
  },
  subSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 10,
  },
  facilityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  bullet: {
    fontSize: 16,
    color: '#EDAE49',
    marginRight: 10,
    fontWeight: 'bold',
  },
  facilityText: {
    fontSize: 14,
    color: '#666',
  },
  serviceCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8F5F0',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 12,
    color: '#666',
  },
  servicePrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#EDAE49',
  },
  bookingContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  bookButton: {
    backgroundColor: '#EDAE49',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  bookButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
