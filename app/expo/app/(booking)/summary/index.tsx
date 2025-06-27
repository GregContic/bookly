import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
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

// Helper function to get service image by ID
const getServiceImage = (serviceId: string) => {
  const imageMap: { [key: string]: any } = {
    'hw_001': require('../../../assets/images/prime-care.png'),
    'hw_002': require('../../../assets/images/urban_smiles.png'),
    'hw_003': require('../../../assets/images/serenescape.png'),
    'hw_004': require('../../../assets/images/eye-clinic.png'),
    'hw_005': require('../../../assets/images/zenyoga.png'),
    'hw_006': require('../../../assets/images/spa-wellness.png'),
    'fs_016': require('../../../assets/images/shapeup_gym.png'),
    'fs_004': require('../../../assets/images/pulse.png'),
    'bpc_002': require('../../../assets/images/glow-haven-2.png'),
  };
  
  return imageMap[serviceId] || require('../../../assets/images/shapeup_gym.png');
};

/**
 * ===========================================
 * BOOKING SUMMARY DATA
 * ===========================================
 */
const bookingSummary = {
  service: {
    businessName: 'Shape Up',
    businessImage: require('../../../assets/images/shapeup_gym.png'),
    rating: 4.95,
    reviewCount: 1374,
    serviceName: 'Professional Training',
    duration: '1 hour',
    price: 800.00
  },
  dateTime: {
    date: 'March 24, 2025',
    time: '8:00 AM'
  },
  trainer: {
    name: 'Darrell',
    image: require('../../../assets/images/Logo-3.png'), // Using placeholder
    rating: 4.95
  },
  pricing: {
    subtotal: 800.00,
    bookingFee: 100.00,
    totalAmount: 900.00
  }
};

/**
 * ===========================================
 * BOOKING SUMMARY PAGE COMPONENT
 * ===========================================
 */
export default function BookingSummaryPage() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { width, height } = useWindowDimensions();
  
  // Parse booking data from params, fallback to hardcoded data if not available
  const bookingData = params.bookingData ? JSON.parse(params.bookingData as string) : null;
    // Use actual booking data or fallback to hardcoded data
  const bookingSummary = bookingData ? {
    service: {
      businessName: bookingData.business.name,
      businessImage: getServiceImage(bookingData.business.id || 'hw_006'),
      rating: bookingData.business.rating,
      reviewCount: bookingData.business.reviewCount,
      serviceName: bookingData.service.name,
      duration: `${bookingData.service.duration} mins`,
      price: bookingData.service.price
    },
    dateTime: {
      date: bookingData.dateTime.date,
      time: bookingData.dateTime.time
    },
    trainer: {
      name: bookingData.trainer?.name || 'Professional Staff',
      image: require('../../../assets/images/Logo-3.png'),
      rating: 4.95 // Default rating
    },
    pricing: {
      subtotal: bookingData.pricing.subtotal,
      bookingFee: bookingData.pricing.bookingFee,
      totalAmount: bookingData.pricing.totalAmount
    }
  } : {
    service: {
      businessName: 'Shape Up',
      businessImage: require('../../../assets/images/shapeup_gym.png'),
      rating: 4.95,
      reviewCount: 1374,
      serviceName: 'Professional Training',
      duration: '1 hour',
      price: 800.00
    },
    dateTime: {
      date: 'March 24, 2025',
      time: '8:00 AM'
    },
    trainer: {
      name: 'Darrell',
      image: require('../../../assets/images/Logo-3.png'),
      rating: 4.95
    },
    pricing: {
      subtotal: 800.00,
      bookingFee: 100.00,
      totalAmount: 900.00
    }
  };
  
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

  const handlePrevious = () => {
    router.back();
  };  const handleNext = () => {
    // Navigate to confirmation page with complete booking data
    const completeBookingData = bookingData || {
      business: {
        name: bookingSummary.service.businessName,
        image: bookingSummary.service.businessImage,
        rating: bookingSummary.service.rating,
        reviewCount: bookingSummary.service.reviewCount
      },
      service: {
        name: bookingSummary.service.serviceName,
        duration: bookingSummary.service.duration,
        price: bookingSummary.service.price
      },
      trainer: {
        name: bookingSummary.trainer.name,
        image: bookingSummary.trainer.image
      },
      dateTime: {
        date: bookingSummary.dateTime.date,
        time: bookingSummary.dateTime.time
      },
      pricing: {
        subtotal: bookingSummary.pricing.subtotal,
        bookingFee: bookingSummary.pricing.bookingFee,
        totalAmount: bookingSummary.pricing.totalAmount
      }
    };
    
    router.push({
      pathname: '/(booking)/confirmation',
      params: {
        bookingData: JSON.stringify(completeBookingData)
      }
    });
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
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Booking Summary</Text>
          <Text style={styles.headerSubtitle}>Step 3: Payment Method</Text>
        </View>
        <View style={styles.headerRight} />
      </Animated.View>

      {/* Progress Indicator */}
      <Animated.View 
        style={[
          styles.progressContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <View style={styles.progressBar}>
          <View style={[styles.progressStep, styles.progressCompleted]} />
          <View style={[styles.progressLine, styles.progressLineCompleted]} />
          <View style={[styles.progressStep, styles.progressCompleted]} />
          <View style={[styles.progressLine, styles.progressLineCompleted]} />
          <View style={[styles.progressStep, styles.progressActive]} />
          <View style={styles.progressLine} />
          <View style={styles.progressStep} />
        </View>
        <Text style={styles.progressText}>3 of 4</Text>
      </Animated.View>

      <ScrollView 
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: height * 0.2 }
        ]} 
        showsVerticalScrollIndicator={false}
      >
        {/* Selected Service */}
        <Animated.View 
          style={[
            styles.sectionContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <Text style={styles.sectionTitle}>Selected Service:</Text>
          <View style={styles.serviceCard}>
            <Image source={bookingSummary.service.businessImage} style={styles.businessImage} />
            <View style={styles.serviceInfo}>
              <Text style={styles.businessName}>{bookingSummary.service.businessName}</Text>
              <View style={styles.ratingRow}>
                <FontAwesome name="star" size={14} color="#EDAE49" />
                <Text style={styles.rating}>{bookingSummary.service.rating}</Text>
                <Text style={styles.reviewCount}>({bookingSummary.service.reviewCount} Reviews)</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.serviceDetailsCard}>
            <View style={styles.serviceDetails}>
              <Text style={styles.serviceName}>{bookingSummary.service.serviceName}</Text>
              <Text style={styles.serviceDuration}>Duration: {bookingSummary.service.duration}</Text>
            </View>
            <Text style={styles.servicePrice}>₱{bookingSummary.service.price.toFixed(2)}</Text>
          </View>
        </Animated.View>

        {/* Date & Time */}
        <Animated.View 
          style={[
            styles.sectionContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <Text style={styles.sectionTitle}>Date & Time:</Text>
          <View style={styles.dateTimeCard}>
            <View style={styles.dateTimeRow}>
              <MaterialIcons name="calendar-today" size={20} color="#666" />
              <Text style={styles.dateTimeText}>{bookingSummary.dateTime.date}</Text>
            </View>
            <View style={styles.dateTimeRow}>
              <MaterialIcons name="access-time" size={20} color="#666" />
              <Text style={styles.dateTimeText}>{bookingSummary.dateTime.time}</Text>
            </View>
          </View>
        </Animated.View>

        {/* Assigned Trainer */}
        <Animated.View 
          style={[
            styles.sectionContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <Text style={styles.sectionTitle}>Assigned Trainer</Text>
          <View style={styles.trainerCard}>
            <Image source={bookingSummary.trainer.image} style={styles.trainerImage} />
            <View style={styles.trainerInfo}>
              <Text style={styles.trainerName}>{bookingSummary.trainer.name}</Text>
              <View style={styles.trainerRatingRow}>
                <FontAwesome name="star" size={12} color="#EDAE49" />
                <Text style={styles.trainerRating}>{bookingSummary.trainer.rating} Rating</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Pricing Summary */}
        <Animated.View 
          style={[
            styles.pricingContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <View style={styles.pricingRow}>
            <Text style={styles.pricingLabel}>Subtotal:</Text>
            <Text style={styles.pricingValue}>₱{bookingSummary.pricing.subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.pricingRow}>
            <Text style={styles.pricingLabel}>Booking Fee:</Text>
            <Text style={styles.pricingValue}>₱{bookingSummary.pricing.bookingFee.toFixed(2)}</Text>
          </View>
          <View style={[styles.pricingRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total Amount:</Text>
            <Text style={styles.totalValue}>₱{bookingSummary.pricing.totalAmount.toFixed(2)}</Text>
          </View>
        </Animated.View>
      </ScrollView>

      {/* Bottom Buttons */}
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
          style={styles.previousButton}
          onPress={handlePrevious}
        >
          <Text style={styles.previousButtonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.nextButton}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

/**
 * ===========================================
 * BOOKING SUMMARY PAGE STYLES
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
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 20 : 30,
    paddingBottom: 20,
    backgroundColor: '#F8F5F0',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  headerRight: {
    width: 24,
  },
  progressContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  progressStep: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E0E0E0',
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  progressActive: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  progressCompleted: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  progressLine: {
    width: 40,
    height: 2,
    backgroundColor: '#E0E0E0',
  },
  progressLineCompleted: {
    backgroundColor: '#4CAF50',
  },
  progressText: {
    fontSize: 12,
    color: '#666',
  },
  sectionContainer: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  serviceCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 10,
  },
  businessImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 15,
  },
  serviceInfo: {
    flex: 1,
  },
  businessName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 5,
  },
  reviewCount: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
  },
  serviceDetailsCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  serviceDetails: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  serviceDuration: {
    fontSize: 12,
    color: '#666',
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  dateTimeCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  dateTimeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dateTimeText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 10,
    fontWeight: '500',
  },
  trainerCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  trainerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  trainerInfo: {
    flex: 1,
  },
  trainerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  trainerRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trainerRating: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
  },
  pricingContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  pricingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  pricingLabel: {
    fontSize: 14,
    color: '#666',
  },
  pricingValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    marginTop: 10,
    paddingTop: 15,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  bottomContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: Platform.OS === 'ios' ? 35 : 25,
    backgroundColor: '#F8F5F0',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  previousButton: {
    flex: 1,
    backgroundColor: '#E0E0E0',
    borderRadius: 12,
    paddingVertical: 15,
    marginRight: 10,
    alignItems: 'center',
  },
  previousButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },  nextButton: {
    flex: 1,
    backgroundColor: '#EDAE49',
    borderRadius: 12,
    paddingVertical: 15,
    marginLeft: 10,
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
