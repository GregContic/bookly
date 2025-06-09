import { FontAwesome, Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, Image, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import BottomNavBar from './components/BottomNavBar';

// Placeholder data for service categories - replace with actual data structure as needed
const serviceCategories = [
  {
    id: '1',
    title: 'Health & Wellness',
    items: [
      { id: '1-1', name: 'PrimeCare Medical Clinic', image: require('../assets/images/prime-care.png') },
      { id: '1-2', name: 'SmileBright Dental', image: require('../assets/images/smile-bright.png') },
      { id: '1-3', name: 'Evercare Family Medical Clinic', image: require('../assets/images/evergate.png') },
      { id: '1-4', name: 'Dr. Teeth Denatal Care', image: require('../assets/images/dr-teeth.png') },
      { id: '1-5', name: 'Evercare Family Medical Clinic', image: require('../assets/images/Logo-3.png') },
    ],
  },
  {
    id: '2',
    title: 'Beauty & Personal Care',
    items: [
      { id: '2-1', name: 'Serene Escape Spa', image: require('../assets/images/serenescape.png') },
      { id: '2-2', name: 'David\'s Salon', image: require('../assets/images/davidsalon.png') },
      { id: '2-3', name: 'Ink Haven Tattoo & Piercing Studio', image: require('../assets/images/ink-haven.png') },
      { id: '2-4', name: 'David\'s Salon', image: require('../assets/images/Logo-3.png') },
      { id: '2-5', name: 'Ink Haven Tattoo & Piercing Studio', image: require('../assets/images/Logo-3.png') },
    ],
  },
  {
    id: '3',
    title: 'Automotive Services',
    items: [
      { id: '3-1', name: 'Baguio AutoCare Center', image: require('../assets/images/autocare.png') },
      { id: '3-2', name: 'SpeedMaster Auto Repair', image: require('../assets/images/speedmaster.png') },
      { id: '3-3', name: 'Titan Auto Care Center', image: require('../assets/images/titanauto.png') },
    ],
  },
    {
    id: '4',
    title: 'Fitness & Sports',
    items: [
      { id: '4-1', name: 'Zen Yoga Studio', image: require('../assets/images/zenyoga.png') },
      { id: '4-2', name: 'Elevate Dance Academy', image: require('../assets/images/elevate.png') },
      { id: '4-3', name: 'Altitude Gym', image: require('../assets/images/altitude.png') },
    ],
  },
  {
    id: '5',
    title: 'Home Services',
    items: [
      { id: '5-1', name: 'Fresh Nest Cleaning', image: require('../assets/images/freshnest.png') },
      { id: '5-2', name: 'SwiftFix Plumbing Services', image: require('../assets/images/swiftfix.png') },
      { id: '5-3', name: 'Power Pro Repair', image: require('../assets/images/powerpro.png') },
    ],
  },
  {
    id: '6',
    title: 'Tech & IT Services',
    items: [
      { id: '6-1', name: 'Byte Fix', image: require('../assets/images/bytfix.png') },
      { id: '6-2', name: 'PC Masters Hub', image: require('../assets/images/pcmaster.png') },
      { id: '6-3', name: 'Mobile Tech Repair Center', image: require('../assets/images/softhardlol.png') },
    ],
  },
];

export default function BookAppointmentPage() {
  const { width, height } = useWindowDimensions();
  const [orientation, setOrientation] = useState('PORTRAIT');

  // Animation values
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(30)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.95)).current;

  // Dynamic scaling calculations
  const scale = width / 375;
  const dynamicFontSize = (size: number) => Math.round(size * scale);
  const dynamicSpacing = (size: number) => Math.round(size * scale);

  // Calculate dynamic sizes
  const cardWidth = width * 0.28;
  const imageHeight = cardWidth * 0.8;

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
        <Ionicons name="chevron-back" size={dynamicFontSize(24)} color="#B0B0B0" />
        <Text style={[styles.headerTitle, { fontSize: dynamicFontSize(20) }]}>Book an Appointment</Text>
        <View style={{ width: dynamicSpacing(24) }} />
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
          style={[styles.searchInput, { fontSize: dynamicFontSize(15) }]} 
          placeholder="What service are you looking for?" 
          placeholderTextColor="#888" 
        />
        <FontAwesome 
          name="search" 
          size={dynamicFontSize(18)} 
          color="#888" 
          style={{ position: 'absolute', right: dynamicSpacing(15), top: dynamicSpacing(12) }} 
        />
      </Animated.View>

      <ScrollView 
        contentContainerStyle={{ paddingBottom: height * 0.15 }} 
        showsVerticalScrollIndicator={false}
      >
        {serviceCategories.map((category, categoryIndex) => (
          <Animated.View 
            key={category.id}
            style={{
              opacity: fadeAnim,
              transform: [
                { 
                  translateY: slideAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 30 + (categoryIndex * 10)]
                  })
                }
              ]
            }}
          >
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { fontSize: dynamicFontSize(16) }]}>
                {category.title}
              </Text>
              <TouchableOpacity>
                <Text style={[styles.viewAllText, { fontSize: dynamicFontSize(14) }]}>
                  View All
                </Text>
              </TouchableOpacity>
            </View>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              style={styles.categoryScroll}
            >
              {category.items.map((item, index) => (
                <Animated.View 
                  key={item.id} 
                  style={[
                    styles.serviceCard,
                    { 
                      width: cardWidth,
                      opacity: fadeAnim,
                      transform: [
                        { scale: scaleAnim },
                        { 
                          translateX: slideAnim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 20 + (index * 10)]
                          })
                        }
                      ]
                    }
                  ]}
                >
                  <Image 
                    source={item.image} 
                    style={[styles.serviceImage, { height: imageHeight }]} 
                    resizeMode="cover" 
                  />
                  <Text style={[styles.serviceName, { fontSize: dynamicFontSize(12) }]}>
                    {item.name}
                  </Text>
                </Animated.View>
              ))}
            </ScrollView>
          </Animated.View>
        ))}
      </ScrollView>
      <BottomNavBar activePage='BookAppointmentPage' />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F5F0',
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
    color: '#222',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '4%',
    marginBottom: '2%',
    marginHorizontal: '5%',
  },
  sectionTitle: {
    fontWeight: 'bold',
    color: '#222',
  },
  viewAllText: {
    color: '#EDAE49',
  },
  categoryScroll: {
    paddingLeft: '5%',
    marginBottom: '2%',
  },
  serviceCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginRight: '3%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
    overflow: 'hidden',
    alignItems: 'center',
    paddingBottom: '2%',
  },
  serviceImage: {
    width: '100%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    marginBottom: '4%',
  },
  serviceName: {
    fontWeight: '500',
    color: '#222',
    textAlign: 'center',
    paddingHorizontal: '4%',
  },
}); 