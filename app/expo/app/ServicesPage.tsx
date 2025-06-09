import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Animated, Image, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import BottomNavBar from './components/BottomNavBar';

const featuredServices = [
  {
    id: '1',
    name: 'Glow Haven Aesthetics',
    image: require('../assets/images/glow-haven.png'),
    rating: 4.8,
    desc: 'Facials, Skin Rejuvenation, Beauty Care',
    price: '₱800 - ₱2,500',
    isPromo: false,
  },
  {
    id: '2',
    name: 'Apex Performance Gym',
    image: require('../assets/images/apex-gym.png'),
    rating: 4.9,
    desc: 'Strength, Cardio, Group Classes',
    price: '₱900 - ₱1,500',
    isPromo: true,
  },
];

const allServices = [
  {
    id: '1',
    name: 'HandyPro Home Repairs',
    image: require('../assets/images/handypro-1.png'),
    rating: 4.8,
    desc: 'La Trinidad, Benguet',
    schedule: 'Monday - Sunday\n8:00 AM - 6:00 PM',
    price: '₱1,300 - ₱8,000',
  },
  {
    id: '2',
    name: 'SmartFix IT Solutions',
    image: require('../assets/images/smartfix-1.png'),
    rating: 4.6,
    desc: '24 Lopez Jaena St., Baguio City',
    schedule: 'Monday - Saturday\n9:00 AM - 5:00 PM',
    price: '₱800 - ₱1,000',
  },
  {
    id: '3',
    name: 'Turbo Care Auto Hub',
    image: require('../assets/images/turbo-hub.png'),
    rating: 4.7,
    desc: 'Naguilian Rd., Baguio City',
    schedule: 'Monday - Saturday\n8:00 AM - 5:00 PM',
    price: '₱1,500 - ₱7,000',
  },
  {
      id: '4',
      name: 'Peak Performance',
      image: require('../assets/images/peak-performance.png'),
      rating: 4.7,
      desc: 'La Trinidad, Baguio City',
      schedule: 'Monday - Sunday\n9:00 AM - 8:00 PM',
      price: '₱1,200 - ₱4,500',
    },
    {
      id: '5',
      name: 'Harmony',
      image: require('../assets/images/harmony.png'),
      rating: 4.85,
      desc: 'Upper Gen.Luna Rd., Baguio City',
      schedule: 'Monday - Sunday\n9:00 AM - 8:00 PM',
      price: '₱1,200 - ₱4,500',
    },
];

export default function ServicesPage() {
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

  return (
    <SafeAreaView style={styles.safeArea}>
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
        <TextInput style={styles.searchInput} placeholder="Search.." placeholderTextColor="#888" />
        <FontAwesome name="search" size={18} color="#888" style={{ position: 'absolute', right: 15, top: 12 }} />
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
        </Animated.Text>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={[styles.featuredScroll, { paddingLeft: horizontalPadding }]}
        >
          {featuredServices.map((item, index) => (
            <Animated.View 
              key={item.id} 
              style={[
                styles.featuredCard,
                { 
                  width: cardWidth,
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
                style={[styles.featuredImage, { height: imageHeight }]} 
                resizeMode="cover" 
              />
              <View style={styles.featuredInfo}>
                <Text style={styles.featuredName}>{item.name}</Text>
                <View style={styles.featuredRow}>
                  <FontAwesome name="star" size={14} color="#EDAE49" />
                  <Text style={styles.featuredRating}>{item.rating}</Text>
                </View>
                <Text style={styles.featuredDesc}>{item.desc}</Text>
                <Text style={styles.featuredPrice}>{item.price}</Text>
                <TouchableOpacity style={styles.bookNowBtn}>
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

        {allServices.map((item, index) => (
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
              </View>
              <Text style={styles.serviceDesc}>{item.desc}</Text>
              <Text style={styles.serviceSchedule}>{item.schedule}</Text>
            </View>
            <View style={styles.serviceRight}>
              <Text style={styles.servicePrice}>{item.price}</Text>
              <TouchableOpacity style={styles.bookNowBtnSmall}>
                <Text style={styles.bookNowTextSmall}>Book Now</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        ))}
      </ScrollView>
      <BottomNavBar activePage='ServicesPage' />
    </SafeAreaView>
  );
}

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
    paddingTop: Platform.OS === 'ios' ? '15%' : '18%',
    paddingBottom: '2%',
    backgroundColor: 'transparent',
  },
  headerTitle: {
    fontSize: Platform.OS === 'ios' ? 20 : 22,
    fontWeight: 'bold',
    color: '#222',
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
    marginBottom: 10,
  },
  featuredCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginRight: '4%',
    marginBottom: '2%',
    width: '70%', // This will be overridden by the dynamic cardWidth
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
    overflow: 'hidden',
  },
  featuredImage: {
    width: '100%',
    aspectRatio: 16/9, // Use aspect ratio instead of fixed height
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  featuredInfo: {
    padding: '4%',
  },
  featuredName: {
    fontSize: Platform.OS === 'ios' ? 15 : 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: '2%',
  },
  featuredRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  featuredRating: {
    fontSize: 13,
    color: '#EDAE49',
    marginLeft: 3,
  },
  featuredDesc: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },
  featuredPrice: {
    fontSize: 13,
    color: '#222',
    marginBottom: 6,
  },
  bookNowBtn: {
    backgroundColor: '#EDAE49',
    borderRadius: 6,
    paddingVertical: '2%',
    paddingHorizontal: '5%',
    alignSelf: 'flex-end',
    marginTop: '2%',
  },
  bookNowText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: Platform.OS === 'ios' ? 13 : 14,
  },
  promoTag: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#ED2B2A',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  promoText: {
    color: '#fff',
    fontSize: 10,
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
    minHeight: Platform.OS === 'ios' ? 80 : 90,
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
  },
  serviceDesc: {
    fontSize: 12,
    color: '#888',
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
    height: 54,
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
