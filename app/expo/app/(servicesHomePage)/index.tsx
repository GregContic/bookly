import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Animated, Image, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import ServicesAggregatorAPI from '../_services/servicesAggregatorAPI';
import { Service } from '../_types/interfaces';

export default function ServicesPage() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  
  // State for services data
  const [featuredServices, setFeaturedServices] = useState<Service[]>([]);
  const [allServices, setAllServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  // Animation values
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(30)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.95)).current;
  const featuredSlideAnim = React.useRef(new Animated.Value(50)).current;
  
  // Dynamic scaling calculations
  const scale = width / 375;
  const dynamicFontSize = (size: number) => Math.round(size * scale);
  const dynamicSpacing = (size: number) => Math.round(size * scale);
  
  // Calculate dynamic sizes
  const cardWidth = width * 0.75;
  const imageHeight = width * 0.3;
  const horizontalPadding = width * 0.05;

  // Load data on component mount
  useEffect(() => {
    loadServicesData();
  }, []);

  // Start animations after data loads
  useEffect(() => {
    if (!isLoading) {
      startAnimations();
    }
  }, [isLoading]);

  const loadServicesData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log('🔄 Loading services data...');
      
      // Fetch featured and all services in parallel
      const [featured, all] = await Promise.all([
        ServicesAggregatorAPI.getAllFeaturedServices(),
        ServicesAggregatorAPI.getAllServices()
      ]);
      
      console.log('✅ Featured services loaded:', featured.length);
      console.log('✅ All services loaded:', all.length);
      
      setFeaturedServices(featured.slice(0, 10)); // Limit featured to 10 for performance
      setAllServices(all);
      setFilteredServices(all);
      
    } catch (err) {
      console.error('❌ Error loading services:', err);
      setError(err instanceof Error ? err.message : 'Failed to load services');
      Alert.alert(
        'Error',
        'Failed to load services. Please check your connection and try again.',
        [
          { text: 'Retry', onPress: loadServicesData },
          { text: 'Cancel', style: 'cancel' }
        ]
      );
    } finally {
      setIsLoading(false);
    }
  };

  const startAnimations = () => {
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
      Animated.timing(featuredSlideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Search functionality
  const handleSearch = useCallback(async (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setFilteredServices(allServices);
      return;
    }

    try {
      setIsSearching(true);
      console.log('🔍 Searching for:', query);
      
      const searchResults = await ServicesAggregatorAPI.searchAllServices(query);
      console.log('✅ Search results:', searchResults.length);
      
      setFilteredServices(searchResults);
    } catch (err) {
      console.error('❌ Error searching services:', err);
      Alert.alert(
        'Search Error', 
        'Failed to search services. Please try again.',
        [{ text: 'OK' }]
      );
      // Keep the current filtered services on error
    } finally {
      setIsSearching(false);
    }
  }, [allServices]);

  const handleServicePress = (service: Service) => {
    // Navigate to service details
    try {
      if (!service?.id) {
        throw new Error('Service ID is missing');
      }
      
      console.log('🚀 Navigating to service:', service.id);
      router.push(`/(services)/${service.id}`);
    } catch (error) {
      console.error('❌ Navigation error:', error);
      Alert.alert(
        'Navigation Error',
        'Failed to open service details. Please try again.',
        [{ text: 'OK' }]
      );
    }
  };

  const handleBack = () => {
    try {
      if (router.canGoBack()) {
        router.back();
      } else {
        // Fallback to home if there's no history
        router.replace('/(drawer)/(tabs)/home');
      }
    } catch (error) {
      console.error('❌ Back navigation error:', error);
      // Ultimate fallback
      router.replace('/(drawer)/(tabs)/home');
    }
  };

  const formatPrice = (service: Service) => {
    const min = service.priceRange?.min || 0;
    const max = service.priceRange?.max || 0;
    const currency = service.priceRange?.currency || 'PHP';
    
    if (min && max) {
      return `₱${min.toLocaleString()} - ₱${max.toLocaleString()}`;
    }
    return '₱Price on request';
  };

  const formatSchedule = (service: Service) => {
    // Get today's schedule as an example
    const today = new Date().getDay();
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const todaySchedule = service.schedule?.[days[today] as keyof typeof service.schedule];
    
    if (todaySchedule?.isOpen) {
      return `Today: ${todaySchedule.open} - ${todaySchedule.close}`;
    }
    return 'Check schedule';
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading services...</Text>
        </View>
      </SafeAreaView>
    );
  }

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
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="chevron-back" size={24} color="#B0B0B0" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Services</Text>
        <View style={{ width: 24 }} />
      </Animated.View>

      <Animated.View 
        style={[
          styles.searchContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <TextInput 
          style={styles.searchInput} 
          placeholder="Search services..." 
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        {isSearching ? (
          <ActivityIndicator size="small" color="#007AFF" style={{ position: 'absolute', right: 15, top: 12 }} />
        ) : (
          <FontAwesome name="search" size={18} color="#888" style={{ position: 'absolute', right: 15, top: 12 }} />
        )}
      </Animated.View>

      <ScrollView 
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: height * 0.15 }
        ]} 
        showsVerticalScrollIndicator={false}
      >
        <Animated.Text 
          style={[
            styles.sectionTitle,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          Featured Services
        </Animated.Text>        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={[styles.featuredScroll, { paddingLeft: horizontalPadding }]}
        >
          {featuredServices.map((service, index) => (
            <Animated.View 
              key={service.id} 
              style={[
                styles.featuredCard,
                { 
                  opacity: fadeAnim,
                  transform: [
                    { scale: scaleAnim },
                    { 
                      translateX: featuredSlideAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 50 + (index * 20)]
                      })
                    }
                  ]
                }
              ]}
            >
              <TouchableOpacity onPress={() => handleServicePress(service)}>
                <View style={styles.featuredImageContainer}>
                  <Image 
                    source={service.image} 
                    style={styles.featuredImage} 
                    resizeMode="cover" 
                  />
                  {service.isPromo && (
                    <View style={styles.promoTag}>
                      <Text style={styles.promoText}>PROMO</Text>
                    </View>
                  )}
                </View>
                <View style={styles.featuredInfo}>
                  <Text style={styles.featuredName}>{service.name}</Text>
                  <View style={styles.featuredRow}>
                    <FontAwesome name="star" size={12} color="#EDAE49" />
                    <Text style={styles.featuredRating}>{service.rating}</Text>
                  </View>
                  <Text style={styles.featuredLocation}>📍 {service.location}</Text>
                  <Text style={styles.featuredSchedule}>🕐 {formatSchedule(service)}</Text>
                  <View style={styles.featuredDetailRow}>
                    <Ionicons name="card-outline" size={12} color="#6B7280" />
                    <Text style={styles.featuredPrice}>{formatPrice(service)}</Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.bookNowBtn}
                    onPress={() => handleServicePress(service)}
                  >
                    <Text style={styles.bookNowText}>Book Now</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </ScrollView>

        <Animated.Text 
          style={[
            styles.sectionTitle,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          All Services
        </Animated.Text>

        {filteredServices.map((service, index) => (
          <Animated.View 
            key={service.id} 
            style={[
              styles.serviceCard,
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
            <TouchableOpacity onPress={() => handleServicePress(service)}>
              {/* Header Image Area */}
              <View style={styles.serviceImageContainer}>
                <Image source={service.image} style={styles.serviceImage} resizeMode="cover" />
                {service.isPromo && (
                  <View style={styles.promoTag}>
                    <Text style={styles.promoText}>PROMO</Text>
                  </View>
                )}
              </View>
              
              {/* Content Area */}
              <View style={styles.serviceContent}>
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <View style={styles.serviceRatingRow}>
                    <FontAwesome name="star" size={13} color="#EDAE49" />
                    <Text style={styles.serviceRating}>{service.rating}</Text>
                  </View>
                  <View style={styles.serviceDetailRow}>
                    <Ionicons name="location-outline" size={14} color="#6B7280" />
                    <Text style={styles.serviceLocation}>{service.location}</Text>
                  </View>
                  <View style={styles.serviceDetailRow}>
                    <Ionicons name="time-outline" size={14} color="#6B7280" />
                    <Text style={styles.serviceSchedule}>{formatSchedule(service)}</Text>
                  </View>
                  <View style={styles.serviceDetailRow}>
                    <Ionicons name="card-outline" size={14} color="#6B7280" />
                    <Text style={styles.servicePriceText}>{formatPrice(service)}</Text>
                  </View>
                </View>
                
                {/* Book Now Button */}
                <TouchableOpacity 
                  style={styles.bookNowBtnService}
                  onPress={() => handleServicePress(service)}
                >
                  <Text style={styles.bookNowTextService}>Book Now</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F5F0',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F5F0',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
    fontFamily: 'Montserrat',
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
  scrollContent: {
    flexGrow: 1,
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
    fontSize: Platform.OS === 'ios' ? 20 : 22,
    fontWeight: 'bold',
    color: '#000',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
    marginHorizontal: '5%',
    marginBottom: '2%',
    paddingHorizontal: '3%',
    height: Platform.OS === 'ios' ? 40 : 45,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#222',
  },
  sectionTitle: {
    fontSize: Platform.OS === 'ios' ? 16 : 18,
    fontWeight: 'bold',
    color: '#222',
    marginTop: '4%',
    marginBottom: '2%',
    marginLeft: '5%',
  },
  featuredScroll: {
    paddingLeft: '5%',
    marginBottom: 15,
  },
  featuredCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginRight: 20,
    marginBottom: 15,
    width: 240,
    height: 320,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    overflow: 'hidden',
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  featuredImageContainer: {
    height: 140,
    backgroundColor: '#F8F9FA',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    position: 'relative',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  featuredInfo: {
    padding: 16,
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
  },
  featuredName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
    lineHeight: 20,
  },
  featuredRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featuredRating: {
    fontSize: 13,
    color: '#FF6B35',
    marginLeft: 4,
    fontWeight: '600',
  },
  featuredDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  featuredLocation: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 6,
    lineHeight: 16,
  },
  featuredSchedule: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 6,
    lineHeight: 16,
  },
  featuredPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginLeft: 6,
    marginBottom: 12,
  },
  bookNowBtn: {
    backgroundColor: '#FF6B35',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignSelf: 'flex-end',
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  bookNowText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
    textAlign: 'center',
  },
  promoTag: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#EF4444',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  promoText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  serviceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.05)',
    overflow: 'hidden',
  },
  serviceImageContainer: {
    height: 120,
    backgroundColor: '#F8F9FA',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
    position: 'relative',
  },
  serviceImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  serviceContent: {
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  serviceInfo: {
    flex: 1,
    paddingRight: 12,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 6,
    lineHeight: 20,
  },
  serviceRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceRating: {
    fontSize: 13,
    color: '#FF6B35',
    marginLeft: 4,
    fontWeight: '600',
  },
  serviceDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  serviceLocation: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 6,
    lineHeight: 16,
  },
  serviceSchedule: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 6,
    lineHeight: 16,
  },
  servicePriceText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 6,
    lineHeight: 16,
  },
  bookNowBtnService: {
    backgroundColor: '#FF6B35',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    alignSelf: 'flex-start',
  },
  bookNowTextService: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 13,
    textAlign: 'center',
  },

}); 
