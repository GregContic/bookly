import { FontAwesome } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { Animated, Image, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from 'react-native';

const featuredServices = [
  {
    id: '1',
    name: 'Glow Haven Aesthetics',
    image: require('../../../../assets/images/glow-haven.png'),
    rating: 4.8,
    desc: 'Facials, Skin Rejuvenation, Beauty Care',
    price: '₱800 - ₱2,500',
    isPromo: false,
  },
  {
    id: '2',
    name: 'Apex Performance Gym',
    image: require('../../../../assets/images/apex-gym.png'),
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
    image: require('../../../../assets/images/handypro-1.png'),
    rating: 4.8,
    desc: 'La Trinidad, Benguet',
    schedule: 'Monday - Sunday\n8:00 AM - 6:00 PM',
    price: '₱1,300 - ₱8,000',
  },
  {
    id: '2',
    name: 'SmartFix IT Solutions',
    image: require('../../../../assets/images/smartfix-1.png'),
    rating: 4.6,
    desc: '24 Lopez Jaena St., Baguio City',
    schedule: 'Monday - Saturday\n9:00 AM - 5:00 PM',
    price: '₱800 - ₱1,000',
  },
  {
    id: '3',
    name: 'Turbo Care Auto Hub',
    image: require('../../../../assets/images/turbo-hub.png'),
    rating: 4.7,
    desc: 'Automotive Repair & Maintenance',
    schedule: 'Monday - Friday\n8:00 AM - 5:00 PM',
    price: '₱500 - ₱15,000',
  },
];

export default function ServicesTab() {
  const { width, height } = useWindowDimensions();

  // Animation values
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(30)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.95)).current;
  const featuredSlideAnim = React.useRef(new Animated.Value(1)).current;

  const horizontalPadding = width * 0.05;

  useEffect(() => {
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
        <Text style={styles.headerTitle}>Services</Text>
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
        <TextInput style={styles.searchInput} placeholder="Search services..." placeholderTextColor="#888" />
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
                <Text style={styles.featuredLocation}>📍 47 Upper Session Road, Baguio City</Text>
                <Text style={styles.featuredSchedule}>📅 Monday - Sunday</Text>
                <Text style={styles.featuredTime}>🕐 9:00 AM - 10:00 PM</Text>
                <Text style={styles.featuredPrice}>💰 {item.price}/session</Text>
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
    justifyContent: 'center',
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
    paddingHorizontal: 8,
    paddingVertical: 3,
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
  },
  servicePrice: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
  },
  bookNowBtnSmall: {
    backgroundColor: '#EDAE49',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  bookNowTextSmall: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 10,
  },
});
