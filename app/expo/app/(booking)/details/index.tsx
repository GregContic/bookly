import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
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
import { Service, ServiceItem } from '../../_types/interfaces';

// Import all service APIs
import AutomotiveServicesAPI from '../../_services/automotiveServicesAPI';
import BeautyPersonalCareAPI from '../../_services/beautyPersonalCareAPI';
import FitnessSportsAPI from '../../_services/fitnessSportsAPI';
import HealthWellnessAPI from '../../_services/healthWellnessAPI';
import HomeServicesAPI from '../../_services/homeServicesAPI';
import TechItServicesAPI from '../../_services/techItServicesAPI';

/**
 * ===========================================
 * UTILITY FUNCTIONS
 * ===========================================
 */
const getServiceAPI = (serviceId: string) => {
  if (serviceId.startsWith('auto_')) return AutomotiveServicesAPI;
  if (serviceId.startsWith('bpc_')) return BeautyPersonalCareAPI;
  if (serviceId.startsWith('fs_')) return FitnessSportsAPI;
  if (serviceId.startsWith('hw_')) return HealthWellnessAPI;
  if (serviceId.startsWith('hs_')) return HomeServicesAPI;
  if (serviceId.startsWith('ts_')) return TechItServicesAPI;
  
  // Default fallback
  return HealthWellnessAPI;
};

const defaultTrainers = [
  {
    id: '1',
    name: 'Professional Staff',
    image: require('../../../assets/images/placeholder_muscle.png'), // Placeholder
  },
  {
    id: '2', 
    name: 'Expert Technician',
    image: require('../../../assets/images/placeholder_muscle.png'), // Placeholder
  },
  {
    id: '3',
    name: 'Specialist',
    image: require('../../../assets/images/placeholder_muscle.png'), // Placeholder
  },
  {
    id: '4',
    name: 'Senior Professional',
    image: require('../../../assets/images/placeholder_muscle.png'), // Placeholder
  }
];

/**
 * ===========================================
 * BOOKING DETAILS PAGE COMPONENT
 * ===========================================
 */
export default function BookingDetailsPage() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { width, height } = useWindowDimensions();
  const [orientation, setOrientation] = useState('PORTRAIT');
  
  // State for dynamic data
  const [selectedBusiness, setSelectedBusiness] = useState<Service | null>(null);
  const [availableServices, setAvailableServices] = useState<ServiceItem[]>([]);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [selectedTrainer, setSelectedTrainer] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
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
  const subtotal = selectedService?.price || 0;
  const bookingFee = 100.00;
  const totalAmount = subtotal + bookingFee;
  // Load service data
  useEffect(() => {
    const loadServiceData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const serviceId = params.serviceId as string;
        const serviceData = params.serviceData as string;
        
        if (!serviceId) {
          throw new Error('Service ID not provided');
        }
        
        // Try to use passed data first, then fetch from API if needed
        if (serviceData) {
          try {
            const parsedData = JSON.parse(serviceData);
            setSelectedBusiness(parsedData);
            setAvailableServices(parsedData.services || []);
            setSelectedService(parsedData.services?.[0] || null);
            
            // Set default trainer if none selected
            if (!selectedTrainer) {
              setSelectedTrainer(defaultTrainers[0]);
            }
            
            setIsLoading(false);
            return;
          } catch (parseError) {
            console.warn('Failed to parse service data, fetching from API:', parseError);
          }
        }
        
        // Fallback to API fetch
        const api = getServiceAPI(serviceId);
        const service = await api.getServiceById(serviceId);
        
        if (!service) {
          throw new Error('Service not found');
        }
        
        setSelectedBusiness(service);
        setAvailableServices(service.services);
        setSelectedService(service.services[0] || null);
        
        // Set default trainer if none selected
        if (!selectedTrainer) {
          setSelectedTrainer(defaultTrainers[0]);
        }
        
      } catch (err) {
        console.error('Error loading service data:', err);
        setError(err instanceof Error ? err.message : 'Failed to load service data');
      } finally {
        setIsLoading(false);
      }
    };

    loadServiceData();
  }, [params.serviceId, params.serviceData]);
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
  };  const handleNext = () => {
    // Navigate to date/time selection page with booking data
    const bookingData = {
      business: selectedBusiness,
      service: selectedService,
      trainer: selectedTrainer,
      pricing: {
        subtotal: subtotal,
        bookingFee: bookingFee,
        totalAmount: totalAmount
      }
    };
    
    router.push({
      pathname: '/(booking)/datetime',
      params: {
        bookingData: JSON.stringify(bookingData)
      }
    });
  };
  const handleSelectTrainer = (trainer: any) => {
    setSelectedTrainer(trainer);
  };

  // Show loading state
  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={[styles.loadingContainer, { height: height - 100 }]}>
          <ActivityIndicator size="large" color="#EDAE49" />
          <Text style={styles.loadingText}>Loading service details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Show error state
  if (error || !selectedBusiness) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={[styles.errorContainer, { height: height - 100 }]}>
          <Text style={styles.errorText}>{error || 'Service not found'}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={() => router.back()}>
            <Text style={styles.retryText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>      {/* Header */}
      <Animated.View 
        style={[
          styles.headerContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Ionicons name="chevron-back" size={dynamicFontSize(24)} color="#333" />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={[styles.headerTitle, { fontSize: dynamicFontSize(18) }]}>Booking Details</Text>
            <Text style={[styles.headerSubtitle, { fontSize: dynamicFontSize(13) }]}>Next: Select Date & Time</Text>
          </View>
          <View style={styles.headerRight} />
        </View>

        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressCircle}>
            <Text style={[styles.progressNumber, { fontSize: dynamicFontSize(16) }]}>1</Text>
          </View>
          <Text style={[styles.progressLabel, { fontSize: dynamicFontSize(12) }]}>of 4</Text>
        </View>
      </Animated.View><ScrollView 
        contentContainerStyle={[
          styles.scrollContent,
          { 
            paddingBottom: height * 0.2,
            paddingHorizontal: width * 0.05 // 5% of screen width
          }
        ]} 
        showsVerticalScrollIndicator={false}
      >        {/* Selected Business */}
        <Animated.View 
          style={[
            styles.sectionContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <Text style={[styles.sectionTitle, { fontSize: dynamicFontSize(16) }]}>Selected Business:</Text>
          <View style={[styles.businessCard, { 
            borderRadius: dynamicRadius(12), 
            padding: dynamicSpacing(15) 
          }]}>
            <Image source={selectedBusiness.image} style={[styles.businessImage, { 
              width: dynamicSpacing(50), 
              height: dynamicSpacing(50), 
              borderRadius: dynamicRadius(25),
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
        </Animated.View>        {/* Select Service */}
        <Animated.View 
          style={[
            styles.sectionContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >          <Text style={[styles.sectionTitle, { fontSize: dynamicFontSize(16) }]}>Select Service:</Text>
          {availableServices.map((service, index) => (
            <TouchableOpacity
              key={`service_${index}`}
              style={[
                styles.serviceCard,
                selectedService?.name === service.name && styles.serviceCardSelected,
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
                <Text style={[styles.serviceDuration, { fontSize: dynamicFontSize(12) }]}>Duration: {service.duration} min</Text>
              </View>
              <Text style={[styles.servicePrice, { fontSize: dynamicFontSize(16) }]}>₱{service.price.toFixed(2)}</Text>
            </TouchableOpacity>
          ))}        </Animated.View>

        {/* Select Professional */}
        <Animated.View 
          style={[
            styles.sectionContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <Text style={[styles.sectionTitle, { fontSize: dynamicFontSize(16) }]}>Select Professional:</Text>
          <View style={styles.trainersGrid}>
            {defaultTrainers.map((trainer) => {
              return (
                <TouchableOpacity
                  key={trainer.id}
                  style={[
                    styles.trainerCard,
                    selectedTrainer?.id === trainer.id && styles.trainerCardSelected,
                    { 
                      borderRadius: dynamicRadius(12), 
                      padding: dynamicSpacing(10),
                      marginBottom: dynamicSpacing(15),
                      marginRight: dynamicSpacing(10)
                    }
                  ]}
                  onPress={() => handleSelectTrainer(trainer)}
                >
                  <Image source={trainer.image} style={[styles.trainerImage, { 
                    width: dynamicSpacing(50), 
                    height: dynamicSpacing(50), 
                    borderRadius: dynamicSpacing(25),
                    marginBottom: dynamicSpacing(8)
                  }]} />
                  <Text style={[styles.trainerName, { fontSize: dynamicFontSize(12) }]}>{trainer.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </Animated.View>        {/* Pricing Summary */}
        <Animated.View 
          style={[
            styles.pricingContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
              borderRadius: dynamicRadius(12),
              padding: dynamicSpacing(20),
              marginBottom: dynamicSpacing(20)
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
      </ScrollView>      {/* Bottom Buttons */}
      <Animated.View 
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
  },  headerContainer: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    paddingBottom: '4%',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    paddingTop: Platform.OS === 'ios' ? '5%' : '8%',
    paddingBottom: '3%',
  },
  backButton: {
    padding: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 20,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontWeight: 'bold',
    color: '#000',
  },
  headerSubtitle: {
    color: '#000',
    marginTop: 2,
  },  headerRight: {
    width: 40,
  },
  progressContainer: {
    alignItems: 'center',
    paddingHorizontal: '5%',
    paddingBottom: '2%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  progressCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  progressNumber: {
    color: '#fff',
    fontWeight: 'bold',
  },
  progressLabel: {
    color: '#666',
    fontWeight: '500',
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
  },  sectionContainer: {
    marginBottom: '6%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: '4%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '4%',
  },
  businessCard: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignItems: 'center',
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
  },  serviceCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  serviceCardSelected: {
    borderColor: '#EDAE49',
    backgroundColor: '#FFF8E7',
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
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
  },
  addAnotherText: {
    color: '#EDAE49',
    fontWeight: '500',
  },  trainersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  trainerCard: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'transparent',
    width: 80,
  },
  trainerCardSelected: {
    borderColor: '#EDAE49',
    backgroundColor: '#FFF8E7',
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
  },  bottomContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontWeight: 'bold',
    color: '#666',
  },  nextButton: {
    flex: 1,
    backgroundColor: '#EDAE49',
    alignItems: 'center',
  },  nextButtonText: {
    fontWeight: 'bold',
    color: '#fff',
  },
  // Loading and error states
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F5F0',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F5F0',
    padding: 32,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#EDAE49',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
