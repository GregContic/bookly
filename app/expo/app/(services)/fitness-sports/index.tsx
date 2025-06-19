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
 * FITNESS & SPORTS DUMMY DATA
 * ===========================================
 */
const fitnessAndSportsServices = [
  {
    id: '1',
    name: 'Shape Up Gym',
    image: require('../../../assets/images/shapeup_gym.png'),
    rating: 4.8,
    desc: 'Personal Training, Group Classes, Cardio',
    location: 'Session Road, Baguio City',
    schedule: 'Monday - Sunday\n5:00 AM - 11:00 PM',
    price: '₱200 - ₱5,000',
    isPromo: true,
  },
  {
    id: '2',
    name: 'Peak Performance Training',
    image: require('../../../assets/images/peak-performance.png'),
    rating: 4.9,
    desc: 'Sports Training, Athletic Performance, Coaching',
    location: 'Magsaysay Ave, Baguio City',
    schedule: 'Monday - Saturday\n6:00 AM - 10:00 PM',
    price: '₱500 - ₱8,000',
    isPromo: false,
  },
  {
    id: '3',
    name: 'Harmony Wellness Studio',
    image: require('../../../assets/images/harmony.png'),
    rating: 4.7,
    desc: 'Yoga, Pilates, Meditation Classes',
    location: 'Upper Session Road, Baguio City',
    schedule: 'Monday - Sunday\n7:00 AM - 8:00 PM',
    price: '₱300 - ₱2,500',
    isPromo: false,
  },
  {
    id: '4',
    name: 'Pulse Fitness Center',
    image: require('../../../assets/images/pulse.png'),
    rating: 4.6,
    desc: 'Modern Equipment, Group Fitness, CrossFit',
    location: 'Governor Pack Road, Baguio City',
    schedule: 'Monday - Sunday\n24/7 Access',
    price: '₱150 - ₱4,000',
    isPromo: true,
  },
  {
    id: '5',
    name: 'Elevate Sports Complex',
    image: require('../../../assets/images/elevate.png'),
    rating: 4.8,
    desc: 'Basketball, Volleyball, Badminton Courts',
    location: 'Camp 7, Baguio City',
    schedule: 'Monday - Sunday\n6:00 AM - 10:00 PM',
    price: '₱100 - ₱3,000',
    isPromo: false,
  },
  {
    id: '6',
    name: 'Apex Sports Academy',
    image: require('../../../assets/images/apex-gym.png'),
    rating: 4.9,
    desc: 'Youth Sports Training, Coaching Programs',
    location: 'Burnham Park Area, Baguio City',
    schedule: 'Monday - Friday\n3:00 PM - 8:00 PM',
    price: '₱800 - ₱6,000',
    isPromo: true,
  },
];

const featuredFitnessServices = [
  {
    id: '1',
    name: 'Shape Up',
    image: require('../../../assets/images/shapeup_gym.png'),
    rating: 4.8,
    desc: 'Complete Fitness Solution',
    price: '₱200 - ₱5,000/month',
    isPromo: true,
  },
  {
    id: '2',
    name: 'Elevate',
    image: require('../../../assets/images/elevate.png'),
    rating: 4.8,
    desc: 'Sports Complex & Training',
    price: '₱100 - ₱3,000/session',
    isPromo: false,
  },
];

/**
 * ===========================================
 * FITNESS & SPORTS PAGE COMPONENT
 * ===========================================
 */
export default function FitnessAndSportsPage() {
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
    // Navigate to Shape Up Gym page if it's the Shape Up service
    if (service.name === 'Shape Up Gym' || service.name === 'Shape Up') {
      router.push('/ShapeUpGymPage');
    } else {
      // Navigate to service details or booking page for other services
      router.push('/BookAppointmentPage');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>      {/* Header */}
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
        <Text style={styles.headerTitle}>Fitness & Sports</Text>
        <View style={styles.headerPlaceholder} />
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
          placeholderTextColor="#888" 
        />
        <FontAwesome 
          name="search" 
          size={18} 
          color="#888" 
          style={{ position: 'absolute', right: 15, top: 12 }} 
        />
      </Animated.View>

      <ScrollView 
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: height * 0.15 }
        ]} 
        showsVerticalScrollIndicator={false}
      >
        {/* Featured Services */}
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
        </Animated.Text>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={[styles.featuredScroll, { paddingLeft: horizontalPadding }]}
        >
          {featuredFitnessServices.map((item, index) => (
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
                  <FontAwesome name="star" size={12} color="#EDAE49" />
                  <Text style={styles.featuredRating}>{item.rating}</Text>
                </View>
                <Text style={styles.featuredLocation}>📍 Baguio City</Text>
                <Text style={styles.featuredSchedule}>📅 Monday - Sunday</Text>
                <Text style={styles.featuredTime}>🕐 6:00 AM - 10:00 PM</Text>
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

        {/* All Services */}
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

        {fitnessAndSportsServices.map((item, index) => (
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
                <FontAwesome name="star" size={13} color="#EDAE49" />
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
        ))}
      </ScrollView>
      </SafeAreaView>
  );
}

/**
 * ===========================================
 * FITNESS & SPORTS PAGE STYLES
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
  headerPlaceholder: {
    width: 40,
    height: 40,
  },  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    marginHorizontal: '5%',
    marginTop: '2%',
    marginBottom: '4%',
    paddingHorizontal: '4%',
    height: Platform.OS === 'ios' ? 45 : 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#222',
  },
  sectionTitle: {
    fontSize: Platform.OS === 'ios' ? 16 : 18,
    fontWeight: 'bold',
    color: '#EDAE49',
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
    borderColor: '#F0F0F0',
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
    color: '#EDAE49',
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
    backgroundColor: '#EDAE49',
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
    borderColor: '#F0F0F0',
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
    color: '#EDAE49',
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
    backgroundColor: '#EDAE49',
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
