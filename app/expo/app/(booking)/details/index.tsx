import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Animated,
  Dimensions,
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

/**
 * ===========================================
 * BOOKING DETAILS DATA
 * ===========================================
 */
const selectedBusiness = {
  id: '1',
  name: 'Shape Up',
  image: require('../../../assets/images/shapeup_gym.png'),
  rating: 4.95,
  reviewCount: 1374,
};

const services = [
  {
    id: '1',
    name: 'Professional Training',
    duration: '1 hour',
    price: 800.00
  }
];

const trainers = [
  {
    id: '1',
    name: 'Devon',
    image: require('../../../assets/images/Logo-1.png'), // Using placeholder, replace with actual trainer images
  },
  {
    id: '2',
    name: 'Arlene',
    image: require('../../../assets/images/Logo-2.png'), // Using placeholder, replace with actual trainer images
  },
  {
    id: '3',
    name: 'Darrell',
    image: require('../../../assets/images/Logo-3.png'), // Using placeholder, replace with actual trainer images
  },
  {
    id: '4',
    name: 'Marvin',
    image: require('../../../assets/images/Logo-1.png'), // Using placeholder, replace with actual trainer images
  }
];

/**
 * ===========================================
 * BOOKING DETAILS PAGE COMPONENT
 * ===========================================
 */
export default function BookingDetailsPage() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const [orientation, setOrientation] = useState('PORTRAIT');
  
  const [selectedService, setSelectedService] = useState(services[0]);
  const [selectedTrainer, setSelectedTrainer] = useState<any>(null);
  const [showAddAnother, setShowAddAnother] = useState(false);
  
  // Dynamic scaling calculations
  const scale = width / 375; // Base scale for iPhone X (375px wide)
  const dynamicFontSize = (size: number) => Math.round(size * scale);
  const dynamicSpacing = (size: number) => Math.round(size * scale);
  const dynamicRadius = (size: number) => Math.round(size * scale);
  
  // Animation values
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(30)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.95)).current;

  // Calculate pricing
  const subtotal = selectedService.price;
  const bookingFee = 100.00;
  const totalAmount = subtotal + bookingFee;
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

  const handleBack = () => {
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };
  const handleNext = () => {
    // Navigate to date/time selection page
    router.push('/(booking)/datetime');
  };

  const handleSelectTrainer = (trainer: any) => {
    setSelectedTrainer(trainer);
  };

  const handleAddAnother = () => {
    setShowAddAnother(true);
    // Logic to add another service
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
      >        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="chevron-back" size={dynamicFontSize(24)} color="#333" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={[styles.headerTitle, { fontSize: dynamicFontSize(18) }]}>Booking Details</Text>
          <Text style={[styles.headerSubtitle, { fontSize: dynamicFontSize(12) }]}>Step 1: Select Date & Time</Text>
        </View>
        <View style={[styles.headerRight, { width: dynamicSpacing(24) }]} />
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
      >        <View style={styles.progressBar}>
          <View style={[styles.progressStep, styles.progressActive, { 
            width: dynamicSpacing(30), 
            height: dynamicSpacing(30), 
            borderRadius: dynamicSpacing(15) 
          }]} />
          <View style={[styles.progressLine, { width: dynamicSpacing(40) }]} />
          <View style={[styles.progressStep, { 
            width: dynamicSpacing(30), 
            height: dynamicSpacing(30), 
            borderRadius: dynamicSpacing(15) 
          }]} />
          <View style={[styles.progressLine, { width: dynamicSpacing(40) }]} />
          <View style={[styles.progressStep, { 
            width: dynamicSpacing(30), 
            height: dynamicSpacing(30), 
            borderRadius: dynamicSpacing(15) 
          }]} />
          <View style={[styles.progressLine, { width: dynamicSpacing(40) }]} />
          <View style={[styles.progressStep, { 
            width: dynamicSpacing(30), 
            height: dynamicSpacing(30), 
            borderRadius: dynamicSpacing(15) 
          }]} />
        </View>
        <Text style={[styles.progressText, { fontSize: dynamicFontSize(12) }]}>1 of 4</Text>
      </Animated.View>      <ScrollView 
        contentContainerStyle={[
          styles.scrollContent,
          { 
            paddingBottom: height * 0.2,
            paddingHorizontal: width * 0.05 // 5% of screen width
          }
        ]} 
        showsVerticalScrollIndicator={false}
      >
        {/* Selected Business */}
        <Animated.View 
          style={[
            styles.sectionContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >          <Text style={[styles.sectionTitle, { fontSize: dynamicFontSize(16) }]}>Selected Business:</Text>
          <View style={[styles.businessCard, { 
            borderRadius: dynamicRadius(12), 
            padding: dynamicSpacing(15) 
          }]}>
            <Image source={selectedBusiness.image} style={[styles.businessImage, { 
              width: dynamicSpacing(50), 
              height: dynamicSpacing(50), 
              borderRadius: dynamicRadius(8),
              marginRight: dynamicSpacing(15)
            }]} />
            <View style={styles.businessInfo}>
              <Text style={[styles.businessName, { fontSize: dynamicFontSize(16) }]}>{selectedBusiness.name}</Text>
              <View style={styles.ratingRow}>
                <FontAwesome name="star" size={dynamicFontSize(14)} color="#EDAE49" />
                <Text style={[styles.rating, { fontSize: dynamicFontSize(14), marginLeft: dynamicSpacing(5) }]}>{selectedBusiness.rating}</Text>
                <Text style={[styles.reviewCount, { fontSize: dynamicFontSize(12), marginLeft: dynamicSpacing(5) }]}>({selectedBusiness.reviewCount} Reviews)</Text>
              </View>
            </View>
          </View>
        </Animated.View>

        {/* Select Service */}
        <Animated.View 
          style={[
            styles.sectionContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >          <Text style={[styles.sectionTitle, { fontSize: dynamicFontSize(16) }]}>Select Service:</Text>
          {services.map((service) => (
            <TouchableOpacity
              key={service.id}
              style={[
                styles.serviceCard,
                selectedService.id === service.id && styles.serviceCardSelected,
                { 
                  borderRadius: dynamicRadius(12), 
                  padding: dynamicSpacing(15),
                  marginBottom: dynamicSpacing(10)
                }
              ]}
              onPress={() => setSelectedService(service)}
            >
              <View style={styles.serviceInfo}>
                <Text style={[styles.serviceName, { fontSize: dynamicFontSize(16) }]}>{service.name}</Text>
                <Text style={[styles.serviceDuration, { fontSize: dynamicFontSize(12) }]}>Duration: {service.duration}</Text>
              </View>
              <Text style={[styles.servicePrice, { fontSize: dynamicFontSize(16) }]}>₱{service.price.toFixed(2)}</Text>
            </TouchableOpacity>
          ))}
          
          <TouchableOpacity 
            style={[styles.addAnotherButton, { padding: dynamicSpacing(15) }]}
            onPress={handleAddAnother}
          >
            <Text style={[styles.addAnotherText, { fontSize: dynamicFontSize(14) }]}>+ Add Another</Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Select Trainer */}
        <Animated.View 
          style={[
            styles.sectionContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >          <Text style={[styles.sectionTitle, { fontSize: dynamicFontSize(16) }]}>Select Trainer:</Text>
          <View style={styles.trainersGrid}>
            {trainers.map((trainer) => {
              // Calculate dynamic trainer card width based on screen size
              const cardWidth = orientation === 'LANDSCAPE' 
                ? (width - dynamicSpacing(60)) / 6 // 6 cards per row in landscape
                : (width - dynamicSpacing(60)) / 4; // 4 cards per row in portrait
              
              return (
                <TouchableOpacity
                  key={trainer.id}
                  style={[
                    styles.trainerCard,
                    selectedTrainer?.id === trainer.id && styles.trainerCardSelected,
                    { 
                      width: cardWidth,
                      borderRadius: dynamicRadius(12), 
                      padding: dynamicSpacing(10),
                      marginBottom: dynamicSpacing(15)
                    }
                  ]}
                  onPress={() => handleSelectTrainer(trainer)}
                >
                  <Image source={trainer.image} style={[styles.trainerImage, { 
                    width: dynamicSpacing(40), 
                    height: dynamicSpacing(40), 
                    borderRadius: dynamicSpacing(20),
                    marginBottom: dynamicSpacing(8)
                  }]} />
                  <Text style={[styles.trainerName, { fontSize: dynamicFontSize(12) }]}>{trainer.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </Animated.View>

        {/* Pricing Summary */}        <Animated.View 
          style={[
            styles.pricingContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
              borderRadius: dynamicRadius(12),
              padding: dynamicSpacing(20)
            }
          ]}
        >
          <View style={[styles.pricingRow, { paddingVertical: dynamicSpacing(8) }]}>
            <Text style={[styles.pricingLabel, { fontSize: dynamicFontSize(14) }]}>Subtotal:</Text>
            <Text style={[styles.pricingValue, { fontSize: dynamicFontSize(14) }]}>₱{subtotal.toFixed(2)}</Text>
          </View>
          <View style={[styles.pricingRow, { paddingVertical: dynamicSpacing(8) }]}>
            <Text style={[styles.pricingLabel, { fontSize: dynamicFontSize(14) }]}>Booking Fee:</Text>
            <Text style={[styles.pricingValue, { fontSize: dynamicFontSize(14) }]}>₱{bookingFee.toFixed(2)}</Text>
          </View>
          <View style={[styles.pricingRow, styles.totalRow, { 
            marginTop: dynamicSpacing(10),
            paddingTop: dynamicSpacing(15),
            paddingVertical: dynamicSpacing(8)
          }]}>
            <Text style={[styles.totalLabel, { fontSize: dynamicFontSize(16) }]}>Total Amount:</Text>
            <Text style={[styles.totalValue, { fontSize: dynamicFontSize(16) }]}>₱{totalAmount.toFixed(2)}</Text>
          </View>
        </Animated.View>
      </ScrollView>

      {/* Bottom Buttons */}      <Animated.View 
        style={[
          styles.bottomContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
            paddingHorizontal: dynamicSpacing(20),
            paddingVertical: dynamicSpacing(20),
            paddingBottom: Platform.OS === 'ios' ? dynamicSpacing(35) : dynamicSpacing(25)
          }
        ]}
      >
        <TouchableOpacity 
          style={[styles.cancelButton, { 
            borderRadius: dynamicRadius(12),
            paddingVertical: dynamicSpacing(15),
            marginRight: dynamicSpacing(10)
          }]}
          onPress={handleCancel}
        >
          <Text style={[styles.cancelButtonText, { fontSize: dynamicFontSize(16) }]}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.nextButton, { 
            borderRadius: dynamicRadius(12),
            paddingVertical: dynamicSpacing(15),
            marginLeft: dynamicSpacing(10)
          }]}
          onPress={handleNext}
        >
          <Text style={[styles.nextButtonText, { fontSize: dynamicFontSize(16) }]}>Next</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

/**
 * ===========================================
 * BOOKING DETAILS PAGE STYLES
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    paddingTop: Platform.OS === 'ios' ? '5%' : '8%',
    paddingBottom: '5%',
    backgroundColor: '#F8F5F0',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    color: '#666',
    marginTop: 2,
  },
  headerRight: {
    // Dynamic width will be set inline
  },
  progressContainer: {
    alignItems: 'center',
    paddingHorizontal: '5%',
    paddingBottom: '5%',
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  progressStep: {
    backgroundColor: '#E0E0E0',
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  progressActive: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  progressLine: {
    height: 2,
    backgroundColor: '#E0E0E0',
  },
  progressText: {
    color: '#666',
  },
  sectionContainer: {
    marginBottom: '6%',
  },
  sectionTitle: {
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '4%',
  },  businessCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  businessImage: {
    // Dynamic dimensions will be set inline
  },
  businessInfo: {
    flex: 1,
  },
  businessName: {
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontWeight: 'bold',
    color: '#333',
  },
  reviewCount: {
    color: '#666',
  },
  serviceCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  serviceCardSelected: {
    borderColor: '#EDAE49',
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  serviceDuration: {
    color: '#666',
  },
  servicePrice: {
    fontWeight: 'bold',
    color: '#333',
  },
  addAnotherButton: {
    alignItems: 'center',
  },
  addAnotherText: {
    color: '#EDAE49',
    fontWeight: '500',
  },
  trainersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  trainerCard: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  trainerCardSelected: {
    borderColor: '#EDAE49',
  },
  trainerImage: {
    // Dynamic dimensions will be set inline
  },
  trainerName: {
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },  pricingContainer: {
    backgroundColor: '#fff',
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
  },
  pricingLabel: {
    color: '#666',
  },
  pricingValue: {
    color: '#333',
    fontWeight: '500',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  totalLabel: {
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontWeight: 'bold',
    color: '#333',
  },
  bottomContainer: {
    flexDirection: 'row',
    backgroundColor: '#F8F5F0',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#E0E0E0',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontWeight: 'bold',
    color: '#666',
  },
  nextButton: {
    flex: 1,
    backgroundColor: '#B0B0B0',
    alignItems: 'center',
  },
  nextButtonText: {
    fontWeight: 'bold',
    color: '#fff',
  },
});
