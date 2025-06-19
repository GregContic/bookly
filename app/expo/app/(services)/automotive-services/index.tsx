import { FontAwesome, Ionicons } from '@expo/vector-icons';
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
  TextInput,
  TouchableOpacity,
  View, useWindowDimensions
} from 'react-native';

/**
 * ===========================================
 * AUTOMOTIVE SERVICES DUMMY DATA
 * ===========================================
 */
const automotiveServices = [
  {
    id: '1',
    name: 'AutoCare Pro Service Center',
    image: require('../../../assets/images/autocare.png'),
    rating: 4.8,
    desc: 'Complete Auto Maintenance, Oil Change, Brake Service',
    location: 'Marcos Highway, Baguio City',
    schedule: 'Monday - Saturday\n8:00 AM - 6:00 PM',
    price: '₱500 - ₱15,000',
    isPromo: true,
  },
  {
    id: '2',
    name: 'SpeedMaster Auto Repair',
    image: require('../../../assets/images/speedmaster.png'),
    rating: 4.9,
    desc: 'Engine Repair, Transmission, AC Service',
    location: 'Abanao Street, Baguio City',
    schedule: 'Monday - Saturday\n7:00 AM - 7:00 PM',
    price: '₱800 - ₱25,000',
    isPromo: false,
  },
  {
    id: '3',
    name: 'PowerPro Auto Services',
    image: require('../../../assets/images/powerpro.png'),
    rating: 4.7,
    desc: 'Tire Services, Wheel Alignment, Battery Replacement',
    location: 'Session Road, Baguio City',
    schedule: 'Monday - Sunday\n8:00 AM - 8:00 PM',
    price: '₱300 - ₱12,000',
    isPromo: false,
  },
  {
    id: '4',
    name: 'Elite Auto Detailing',
    image: require('../../../assets/images/autocare.png'),
    rating: 4.6,
    desc: 'Car Wash, Detailing, Paint Protection',
    location: 'Magsaysay Ave, Baguio City',
    schedule: 'Monday - Sunday\n7:00 AM - 7:00 PM',
    price: '₱200 - ₱8,000',
    isPromo: true,
  },
  {
    id: '5',
    name: 'Reliable Automotive Solutions',
    image: require('../../../assets/images/speedmaster.png'),
    rating: 4.8,
    desc: 'Diagnostic Services, Electrical Repair, Performance Tuning',
    location: 'Upper Session Road, Baguio City',
    schedule: 'Monday - Saturday\n8:00 AM - 6:00 PM',
    price: '₱600 - ₱20,000',
    isPromo: false,
  },
  {
    id: '6',
    name: 'QuickFix Auto Center',
    image: require('../../../assets/images/powerpro.png'),
    rating: 4.5,
    desc: 'Quick Repairs, Emergency Service, Towing',
    location: 'Burnham Park Area, Baguio City',
    schedule: 'Monday - Sunday\n24/7 Emergency Service',
    price: '₱400 - ₱18,000',
    isPromo: true,
  },
];

const featuredAutomotiveServices = [
  {
    id: '1',
    name: 'AutoCare Pro',
    image: require('../../../assets/images/autocare.png'),
    rating: 4.8,
    desc: 'Complete Auto Solutions',
    price: '₱500 - ₱15,000',
  },
  {
    id: '2',
    name: 'SpeedMaster',
    image: require('../../../assets/images/speedmaster.png'),
    rating: 4.9,
    desc: 'Expert Auto Repair',
    price: '₱800 - ₱25,000',
  },
];

/**
 * ===========================================
 * AUTOMOTIVE SERVICES PAGE COMPONENT
 * ===========================================
 */
export default function AutomotiveServicesPage() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  
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
      Animated.timing(featuredSlideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleBack = () => {
    router.back();
  };

  const handleServicePress = (service: any) => {
    // Navigate to service details or booking page
    router.push('/BookAppointmentPage');
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
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Automotive Services</Text>
        <View style={styles.headerSpacer} />
      </Animated.View>

      {/* Search Bar */}
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
          placeholder="Search..." 
          placeholderTextColor="#999" 
        />
        <FontAwesome 
          name="search" 
          size={16} 
          color="#999" 
        />
      </Animated.View>

      <ScrollView 
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: height * 0.15 }
        ]} 
        showsVerticalScrollIndicator={false}
      >
        {/* Featured Automotive Services */}
        <Animated.Text 
          style={[
            styles.sectionTitle,
            {
              opacity: fadeAnim,
              transform: [{ translateY: featuredSlideAnim }]
            }
          ]}
        >
          Featured Services
        </Animated.Text>

        <Animated.View
          style={[
            {
              opacity: fadeAnim,
              transform: [{ translateY: featuredSlideAnim }]
            }
          ]}
        >
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            style={styles.featuredScroll}
          >
            {featuredAutomotiveServices.map((service, index) => (
              <Animated.View 
                key={service.id} 
                style={[
                  styles.featuredCard,
                  {
                    width: cardWidth,
                    transform: [{ scale: scaleAnim }]
                  }
                ]}
              >
                <TouchableOpacity onPress={() => handleServicePress(service)}>
                  <Image source={service.image} style={[styles.featuredImage, { height: imageHeight }]} resizeMode="cover" />
                  <View style={[styles.featuredCardContent, { padding: dynamicSpacing(15) }]}>
                    <Text style={[styles.featuredCardTitle, { fontSize: dynamicFontSize(18) }]}>{service.name}</Text>
                    <View style={[styles.ratingRow, { marginVertical: dynamicSpacing(8) }]}>
                      <FontAwesome name="star" size={dynamicFontSize(14)} color="#FF6B35" />
                      <Text style={[styles.rating, { fontSize: dynamicFontSize(14), marginLeft: dynamicSpacing(5) }]}>{service.rating}</Text>
                    </View>
                    <Text style={[styles.featuredCardDesc, { fontSize: dynamicFontSize(14), marginBottom: dynamicSpacing(10) }]}>{service.desc}</Text>
                    <Text style={[styles.featuredCardPrice, { fontSize: dynamicFontSize(16) }]}>{service.price}</Text>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </ScrollView>
        </Animated.View>

        {/* All Automotive Services */}
        <Animated.Text 
          style={[
            styles.sectionTitle,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          All Automotive Services
        </Animated.Text>

        <Animated.View
          style={[
            styles.servicesGrid,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
              paddingHorizontal: horizontalPadding
            }
          ]}
        >
          {automotiveServices.map((service, index) => (
            <Animated.View 
              key={service.id} 
              style={[
                styles.serviceCard,
                {
                  width: (width - (horizontalPadding * 2) - dynamicSpacing(10)) / 2,
                  marginBottom: dynamicSpacing(15),
                  marginRight: index % 2 === 0 ? dynamicSpacing(10) : 0,
                  transform: [{ scale: scaleAnim }]
                }
              ]}
            >
              <TouchableOpacity onPress={() => handleServicePress(service)}>
                {service.isPromo && (
                  <View style={[styles.promoTag, { 
                    top: dynamicSpacing(10), 
                    right: dynamicSpacing(10),
                    paddingHorizontal: dynamicSpacing(8),
                    paddingVertical: dynamicSpacing(4)
                  }]}>
                    <Text style={[styles.promoText, { fontSize: dynamicFontSize(10) }]}>PROMO</Text>
                  </View>
                )}
                <Image source={service.image} style={[styles.serviceImage, { height: width * 0.25 }]} resizeMode="cover" />
                <View style={[styles.serviceCardContent, { padding: dynamicSpacing(12) }]}>
                  <Text style={[styles.serviceTitle, { fontSize: dynamicFontSize(14) }]} numberOfLines={1}>{service.name}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: dynamicSpacing(4) }}>
                    <FontAwesome name="star" size={dynamicFontSize(12)} color="#FF6B35" />
                    <Text style={[styles.serviceRating, { fontSize: dynamicFontSize(12), marginLeft: dynamicSpacing(4) }]}>{service.rating}</Text>
                  </View>
                  <Text style={[styles.serviceDesc, { fontSize: dynamicFontSize(11) }]} numberOfLines={2}>{service.desc}</Text>
                  <Text style={[styles.serviceLocation, { fontSize: dynamicFontSize(10), marginTop: dynamicSpacing(4) }]} numberOfLines={1}>
                    📍 {service.location}
                  </Text>
                  <Text style={[styles.serviceSchedule, { fontSize: dynamicFontSize(10), marginTop: dynamicSpacing(2) }]} numberOfLines={2}>
                    🕒 {service.schedule}
                  </Text>
                  <Text style={[styles.servicePrice, { fontSize: dynamicFontSize(12), marginTop: dynamicSpacing(8) }]}>{service.price}</Text>
                </View>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </Animated.View>
      </ScrollView>    </SafeAreaView>
  );
}

/**
 * ===========================================
 * AUTOMOTIVE SERVICES PAGE STYLES
 * ===========================================
 */
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F5F0',
    paddingTop: Platform.OS === 'ios' ? 0 : 20,
    paddingBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  scrollContent: {
    flexGrow: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    paddingTop: Platform.OS === 'ios' ? '12%' : '8%',
    paddingBottom: '3%',
    backgroundColor: '#F8F5F0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    flex: 1,
  },
  headerSpacer: {
    width: 40,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginHorizontal: '5%',
    marginBottom: '4%',
    paddingHorizontal: 15,
    height: 44,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 0,
  },
  sectionTitle: {
    fontSize: Platform.OS === 'ios' ? 16 : 18,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginTop: '4%',
    marginBottom: '2%',
    marginLeft: '5%',
  },
  featuredScroll: {
    paddingLeft: '5%',
    marginBottom: 10,
  },
  featuredCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginRight: 15,
    marginBottom: 10,
    width: 200,
    height: 280,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featuredImage: {
    width: '100%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  featuredCardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  featuredCardTitle: {
    fontWeight: 'bold',
    color: '#333',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontWeight: 'bold',
    color: '#333',
  },
  featuredCardDesc: {
    color: '#666',
    lineHeight: 20,
  },
  featuredCardPrice: {
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  promoTag: {
    position: 'absolute',
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    zIndex: 1,
  },
  promoText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  serviceImage: {
    width: '100%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  serviceCardContent: {
    flex: 1,
  },
  serviceTitle: {
    fontWeight: 'bold',
    color: '#333',
  },
  serviceRating: {
    fontWeight: 'bold',
    color: '#333',
  },
  serviceDesc: {
    color: '#666',
    lineHeight: 16,
  },
  serviceLocation: {
    color: '#888',
  },
  serviceSchedule: {
    color: '#888',
    lineHeight: 14,
  },
  servicePrice: {
    fontWeight: 'bold',
    color: '#FF6B35',
  },
});
