import { FontAwesome } from '@expo/vector-icons';
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
 * HEALTH & WELLNESS DUMMY DATA
 * ===========================================
 */
const healthWellnessServices = [  {
    id: '1',
    name: 'Prime Care Medical Clinic',
    image: require('../../../assets/images/prime-care.png'),
    rating: 4.9,
    desc: 'General Medicine, Laboratory, X-Ray',
    location: 'Session Road, Baguio City',
    schedule: 'Monday - Saturday\n8:00 AM - 5:00 PM',
    price: '₱500 - ₱2,000',
    isPromo: false,
  },
  {
    id: '2',
    name: 'Urban Smiles Dental',
    image: require('../../../assets/images/urban_smiles.png'),
    rating: 4.8,
    desc: 'Dental Care, Orthodontics, Cleaning',
    location: 'Magsaysay Ave, Baguio City',
    schedule: 'Monday - Friday\n9:00 AM - 6:00 PM',
    price: '₱800 - ₱3,500',
    isPromo: true,
  },
  {
    id: '3',
    name: 'Serene Scape Wellness',
    image: require('../../../assets/images/serenescape.png'),
    rating: 4.7,
    desc: 'Therapy, Counseling, Mental Health',
    location: 'Upper Session Road, Baguio City',
    schedule: 'Monday - Sunday\n10:00 AM - 8:00 PM',
    price: '₱1,200 - ₱4,000',
    isPromo: false,
  },
  {
    id: '4',
    name: 'Bright Eye Clinic',
    image: require('../../../assets/images/eye-clinic.png'),
    rating: 4.6,
    desc: 'Eye Checkup, Glasses, Contact Lenses',
    location: 'Governor Pack Road, Baguio City',
    schedule: 'Tuesday - Saturday\n8:30 AM - 5:30 PM',
    price: '₱600 - ₱2,500',
    isPromo: false,
  },
  {
    id: '5',
    name: 'Zen Yoga Studio',
    image: require('../../../assets/images/zenyoga.png'),
    rating: 4.8,
    desc: 'Yoga, Meditation, Wellness Classes',
    location: 'Camp 7, Baguio City',
    schedule: 'Monday - Sunday\n6:00 AM - 9:00 PM',
    price: '₱300 - ₱1,500',
    isPromo: true,
  },
  {
    id: '6',
    name: 'The Spa Wellness Center',
    image: require('../../../assets/images/spa-wellness.png'),
    rating: 4.9,
    desc: 'Massage, Spa Treatments, Relaxation',
    location: 'Burnham Park Area, Baguio City',
    schedule: 'Monday - Sunday\n9:00 AM - 10:00 PM',
    price: '₱800 - ₱3,500',
    isPromo: false,
  },
];

const featuredHealthServices = [
  {
    id: '1',
    name: 'Prime Care Medical',
    image: require('../../../assets/images/prime-care.png'),
    rating: 4.9,
    desc: 'Complete Medical Services',
    price: '₱500 - ₱2,000/consultation',
    isPromo: false,
  },
  {
    id: '2',
    name: 'The Spa Wellness',
    image: require('../../../assets/images/spa-wellness.png'),
    rating: 4.8,
    desc: 'Relaxation & Therapy',
    price: '₱800 - ₱3,500/session',
    isPromo: true,
  },
];

/**
 * ===========================================
 * HEALTH & WELLNESS PAGE COMPONENT
 * ===========================================
 */
export default function HealthWellnessPage() {
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
  };  return (    <SafeAreaView style={styles.safeArea}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
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
      </View>

      <ScrollView 
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: height * 0.15 }
        ]} 
        showsVerticalScrollIndicator={false}
      >
        {/* Featured Health Services */}
        <Animated.Text 
          style={[
            styles.sectionTitle,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          Featured Health Services
        </Animated.Text>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={[styles.featuredScroll, { paddingLeft: horizontalPadding }]}
        >
          {featuredHealthServices.map((item, index) => (
            <Animated.View 
              key={item.id} 
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
              <Image 
                source={item.image} 
                style={styles.featuredImage} 
                resizeMode="cover" 
              />
              <View style={styles.featuredInfo}>
                <Text style={styles.featuredName}>{item.name}</Text>
                <View style={styles.featuredRow}>
                  <FontAwesome name="star" size={12} color="#4CAF50" />
                  <Text style={styles.featuredRating}>{item.rating}</Text>
                </View>
                <Text style={styles.featuredLocation}>📍 Baguio City</Text>
                <Text style={styles.featuredSchedule}>📅 Monday - Sunday</Text>
                <Text style={styles.featuredTime}>🕐 9:00 AM - 6:00 PM</Text>
                <Text style={styles.featuredPrice}>💰 {item.price}</Text>
                <TouchableOpacity 
                  style={styles.bookNowBtn}
                  onPress={() => handleServicePress(item)}
                >
                  <Text style={styles.bookNowText}>Book Now</Text>
                </TouchableOpacity>
                {item.isPromo && (
                  <View style={styles.promoTag}>
                    <Text style={styles.promoText}>PROMO</Text>
                  </View>
                )}
              </View>
            </Animated.View>
          ))}
        </ScrollView>

        {/* All Health Services */}        <Animated.Text 
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

        {healthWellnessServices.map((item, index) => (
          <Animated.View 
            key={item.id} 
            style={[
              styles.serviceRow,
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
            <Image source={item.image} style={styles.serviceImage} resizeMode="cover" />
            <View style={styles.serviceInfo}>
              <Text style={styles.serviceName}>{item.name}</Text>
              <View style={styles.serviceRatingRow}>
                <FontAwesome name="star" size={13} color="#4CAF50" />
                <Text style={styles.serviceRating}>{item.rating}</Text>
                {item.isPromo && (
                  <View style={styles.promoTagSmall}>
                    <Text style={styles.promoTextSmall}>PROMO</Text>
                  </View>
                )}
              </View>
              <Text style={styles.serviceDesc}>{item.desc}</Text>
              <Text style={styles.serviceLocation}>📍 {item.location}</Text>
              <Text style={styles.serviceSchedule}>{item.schedule}</Text>
            </View>
            <View style={styles.serviceRight}>
              <Text style={styles.servicePrice}>{item.price}</Text>
              <TouchableOpacity 
                style={styles.bookNowBtnSmall}
                onPress={() => handleServicePress(item)}
              >
                <Text style={styles.bookNowTextSmall}>Book Now</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        ))}      </ScrollView>
    </SafeAreaView>
  );
}

/**
 * ===========================================
 * HEALTH & WELLNESS PAGE STYLES
 * ===========================================
 */
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F5F0',
    paddingTop: Platform.OS === 'ios' ? 0 : 20, // Adjust for iOS notch
    paddingBottom: Platform.OS === 'ios' ? 20 : 0, // Adjust for Android navigation bar 
  },
  scrollContent: {
    flexGrow: 1,
  },  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    paddingTop: Platform.OS === 'ios' ? '12%' : '15%',
    paddingBottom: '3%',
    backgroundColor: '#FFF8E7',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backButton: {
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: Platform.OS === 'ios' ? 18 : 20,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    flex: 1,
  },
  headerSpacer: {
    width: 40, // Same width as back button to center the title
  },  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    marginHorizontal: '5%',
    marginTop: '5%',
    marginBottom: '4%',
    paddingHorizontal: '4%',
    height: Platform.OS === 'ios' ? 45 : 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 0, // Remove default padding
  },
  sectionTitle: {
    fontSize: Platform.OS === 'ios' ? 16 : 18,
    fontWeight: 'bold',
    color: '#4CAF50',
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
    overflow: 'hidden',
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#E8F5E8',
  },
  featuredImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  featuredInfo: {
    padding: 10,
    flex: 1,
    justifyContent: 'space-between',
  },
  featuredName: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 3,
    textAlign: 'center',
  },
  featuredRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 3,
  },
  featuredRating: {
    fontSize: 12,
    color: '#4CAF50',
    marginLeft: 3,
    fontWeight: '600',
  },
  featuredLocation: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
    marginBottom: 2,
    lineHeight: 14,
  },
  featuredSchedule: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
    marginBottom: 2,
  },
  featuredTime: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
    marginBottom: 3,
  },
  featuredPrice: {
    fontSize: 11,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    marginBottom: 8,
  },
  bookNowBtn: {
    backgroundColor: '#4CAF50',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: 'center',
    minWidth: 80,
  },
  bookNowText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 11,
    textAlign: 'center',
  },
  promoTag: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FF4B4B',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  promoText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: 'bold',
  },
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: '5%',
    marginBottom: '3%',
    padding: '3%',
    minHeight: Platform.OS === 'ios' ? 100 : 110,
    borderWidth: 1,
    borderColor: '#E8F5E8',
  },
  serviceImage: {
    width: '20%',
    aspectRatio: 1,
    borderRadius: 10,
    marginRight: '3%',
  },
  serviceInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  serviceName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
  },
  serviceRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  serviceRating: {
    fontSize: 12,
    color: '#4CAF50',
    marginLeft: 3,
    fontWeight: '600',
  },
  promoTagSmall: {
    marginLeft: 8,
    backgroundColor: '#FF4B4B',
    borderRadius: 3,
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  promoTextSmall: {
    color: '#fff',
    fontSize: 8,
    fontWeight: 'bold',
  },
  serviceDesc: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },
  serviceLocation: {
    fontSize: 11,
    color: '#666',
    marginBottom: 2,
  },
  serviceSchedule: {
    fontSize: 11,
    color: '#888',
    marginBottom: 2,
  },
  serviceRight: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 64,
  },
  servicePrice: {
    fontSize: 13,
    color: '#222',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  bookNowBtnSmall: {
    backgroundColor: '#4CAF50',
    borderRadius: 6,
    paddingVertical: '1%',
    paddingHorizontal: '3%',
    minWidth: '25%',
    alignItems: 'center',
  },
  bookNowTextSmall: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: Platform.OS === 'ios' ? 12 : 13,
  },
});
