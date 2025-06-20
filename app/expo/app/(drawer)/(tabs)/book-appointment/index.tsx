import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, Image, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from 'react-native';

// Service categories data with navigation routes
const serviceCategories = [
  {
    id: '1',
    title: 'Health & Wellness',
    route: '/(services)/health-wellness',
    items: [
      { id: '1-1', name: 'PrimeCare Medical Clinic', image: require('../../../../assets/images/prime-care.png') },
      { id: '1-2', name: 'SmileBright Dental', image: require('../../../../assets/images/smile-bright.png') },
      { id: '1-3', name: 'Evercare Family Medical Clinic', image: require('../../../../assets/images/evergate.png') },
      { id: '1-4', name: 'Dr. Teeth Dental Care', image: require('../../../../assets/images/dr-teeth.png') },
    ],
  },
  {
    id: '2',
    title: 'Beauty & Personal Care',
    route: '/(services)/beauty-personal-care',
    items: [
      { id: '2-1', name: 'Serene Escape Spa', image: require('../../../../assets/images/serenescape.png') },
      { id: '2-2', name: 'David\'s Salon', image: require('../../../../assets/images/davidsalon.png') },
      { id: '2-3', name: 'Ink Haven Tattoo Studio', image: require('../../../../assets/images/ink-haven.png') },
      { id: '2-4', name: 'Glow Haven Aesthetics', image: require('../../../../assets/images/glow-haven.png') },
    ],
  },
  {
    id: '3',
    title: 'Automotive Services',
    route: '/(services)/automotive-services',
    items: [
      { id: '3-1', name: 'Baguio AutoCare Center', image: require('../../../../assets/images/autocare.png') },
      { id: '3-2', name: 'SpeedMaster Auto Repair', image: require('../../../../assets/images/speedmaster.png') },
      { id: '3-3', name: 'Titan Auto Care Center', image: require('../../../../assets/images/titanauto.png') },
    ],
  },
  {
    id: '4',
    title: 'Fitness & Sports',
    route: '/(services)/fitness-sports',
    items: [
      { id: '4-1', name: 'Zen Yoga Studio', image: require('../../../../assets/images/zenyoga.png') },
      { id: '4-2', name: 'Elevate Dance Academy', image: require('../../../../assets/images/elevate.png') },
      { id: '4-3', name: 'Altitude Gym', image: require('../../../../assets/images/altitude.png') },
    ],
  },
  {
    id: '5',
    title: 'Home Services',
    route: '/(services)/home-services',
    items: [
      { id: '5-1', name: 'Fresh Nest Cleaning', image: require('../../../../assets/images/freshnest.png') },
      { id: '5-2', name: 'SwiftFix Plumbing Services', image: require('../../../../assets/images/swiftfix.png') },
      { id: '5-3', name: 'Power Pro Repair', image: require('../../../../assets/images/powerpro.png') },
    ],
  },
  {
    id: '6',
    title: 'Tech & IT Services',
    route: '/(services)/tech-it-services',
    items: [
      { id: '6-1', name: 'Byte Fix', image: require('../../../../assets/images/bytfix.png') },
      { id: '6-2', name: 'PC Masters Hub', image: require('../../../../assets/images/pcmaster.png') },
      { id: '6-3', name: 'Mobile Tech Repair Center', image: require('../../../../assets/images/softhardlol.png') },
    ],
  },
];

export default function BookAppointmentTab() {
  const { width, height } = useWindowDimensions();
  const [orientation, setOrientation] = useState('PORTRAIT');
  const router = useRouter();

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
  }, []);  const handleServicePress = (categoryRoute: string) => {
    router.push(categoryRoute as any);
  };

  const renderServiceItem = (item: any, index: number, categoryRoute: string) => (
    <TouchableOpacity 
      key={item.id} 
      style={[
        styles.serviceCard,
        { 
          width: cardWidth,
          height: imageHeight + dynamicSpacing(50),
        }
      ]}
      onPress={() => handleServicePress(categoryRoute)}
    >
      <Animated.View
        style={[
          styles.serviceCardContent,
          {
            opacity: fadeAnim,
            transform: [
              { scale: scaleAnim },
              { 
                translateY: slideAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 20 + (index * 5)]
                })
              }
            ]
          }
        ]}
      >
        <Image 
          source={item.image} 
          style={[
            styles.serviceImage,
            { 
              width: cardWidth * 0.9,
              height: imageHeight,
            }
          ]} 
          resizeMode="cover" 
        />
        <Text 
          style={[
            styles.serviceName,
            { fontSize: dynamicFontSize(11) }
          ]} 
          numberOfLines={2}
        >
          {item.name}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
  const renderCategory = (category: any, categoryIndex: number) => (
    <View key={category.id} style={styles.categoryContainer}>
      <TouchableOpacity onPress={() => handleServicePress(category.route)}>
        <Animated.Text 
          style={[
            styles.categoryTitle,
            {
              fontSize: dynamicFontSize(16),
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          {category.title}
        </Animated.Text>
      </TouchableOpacity>
      <View style={styles.servicesGrid}>
        {category.items.map((item: any, itemIndex: number) => 
          renderServiceItem(item, categoryIndex * 10 + itemIndex, category.route)
        )}
      </View>
    </View>
  );

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
        <Text style={[styles.headerTitle, { fontSize: dynamicFontSize(20) }]}>Book Appointment</Text>
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
          placeholder="Search services..." 
          placeholderTextColor="#888" 
        />
        <FontAwesome name="search" size={18} color="#888" style={styles.searchIcon} />
      </Animated.View>

      <ScrollView 
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: height * 0.15 }
        ]} 
        showsVerticalScrollIndicator={false}
      >
        {serviceCategories.map((category, index) => renderCategory(category, index))}
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
    paddingHorizontal: '5%',
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
    marginBottom: '4%',
    paddingHorizontal: '3%',
    height: Platform.OS === 'ios' ? 40 : 45,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#222',
  },
  searchIcon: {
    position: 'absolute',
    right: 15,
    top: 12,
  },
  categoryContainer: {
    marginBottom: '6%',
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: '3%',
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  serviceCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: '4%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceCardContent: {
    padding: '3%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  serviceImage: {
    borderRadius: 8,
    marginBottom: 8,
  },
  serviceName: {
    fontSize: 11,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    lineHeight: 14,
  },
});
