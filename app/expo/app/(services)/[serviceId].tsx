import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions
} from 'react-native';

// Types
import { Service } from '../_types/interfaces';

// Mock service data - In a real app, this would come from an API
const mockServiceData: { [key: string]: Service } = {
  'fs_016': {
    id: 'fs_016',
    name: 'Shape Up',
    category: 'fitness-sports',
    subcategory: 'Gym',
    image: require('../../assets/images/shapeup_gym.png'),
    rating: 4.85,
    reviewCount: 1137,
    description: 'We are dedicated to helping you achieve your fitness goals with top-tier equipment, expert trainers, and a motivating environment. Whether you\'re into strength training, cardio, or group classes, our facility is designed to support all levels of fitness.',
    shortDescription: 'Premium fitness center with modern equipment and expert trainers',
    location: 'Session Road, Baguio City',
    address: 'Session Road, Baguio City, Benguet, Philippines',
    phone: '+63 917 123 4567',
    email: 'info@shapeupgym.com',
    website: 'www.shapeupgym.com',
    schedule: {
      monday: { open: '6:00 AM', close: '10:00 PM', isOpen: true },
      tuesday: { open: '6:00 AM', close: '10:00 PM', isOpen: true },
      wednesday: { open: '6:00 AM', close: '10:00 PM', isOpen: true },
      thursday: { open: '6:00 AM', close: '10:00 PM', isOpen: true },
      friday: { open: '6:00 AM', close: '10:00 PM', isOpen: true },
      saturday: { open: '6:00 AM', close: '10:00 PM', isOpen: true },
      sunday: { open: '6:00 AM', close: '10:00 PM', isOpen: true }
    },
    priceRange: { min: 250, max: 500, currency: '₱' },
    services: [
      { name: 'Walk-in Access', price: 250, duration: 120 },
      { name: 'Personal Training', price: 500, duration: 60 },
      { name: 'Group Classes', price: 300, duration: 45 }
    ],
    amenities: [
      'Modern Equipment',
      'Boxing Area',
      'Wide Locker Room',
      'Hot and Cold Shower Room',
      'Parking'
    ],
    isPromo: false,
    isFeatured: true,
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  'hw_006': {
    id: 'hw_006',
    name: 'The Spa Wellness Center',
    category: 'health-wellness',
    subcategory: 'spa-wellness',
    image: require('../../assets/images/spa-wellness.png'),
    rating: 4.9,
    reviewCount: 178,
    description: 'Premium spa and wellness center offering massage therapy, relaxation treatments, and holistic wellness programs.',
    shortDescription: 'Massage, Spa Treatments, Relaxation',
    location: 'Burnham Park Area, Baguio City',
    address: '987 Burnham Park Area, Baguio City, Benguet',
    phone: '+63 917 789 0123',
    email: 'relax@spawellness.com',
    website: 'https://spa-wellness-center.com',
    schedule: {
      monday: { open: '09:00 AM', close: '10:00 PM', isOpen: true },
      tuesday: { open: '09:00 AM', close: '10:00 PM', isOpen: true },
      wednesday: { open: '09:00 AM', close: '10:00 PM', isOpen: true },
      thursday: { open: '09:00 AM', close: '10:00 PM', isOpen: true },
      friday: { open: '09:00 AM', close: '10:00 PM', isOpen: true },
      saturday: { open: '09:00 AM', close: '10:00 PM', isOpen: true },
      sunday: { open: '09:00 AM', close: '10:00 PM', isOpen: true }
    },
    priceRange: { min: 800, max: 3500, currency: '₱' },
    services: [
      { name: 'Swedish Massage', price: 1200, duration: 60 },
      { name: 'Hot Stone Therapy', price: 2000, duration: 90 },
      { name: 'Aromatherapy', price: 1500, duration: 75 },
      { name: 'Full Body Treatment', price: 3500, duration: 120 }
    ],
    amenities: [
      'WiFi',
      'Air Conditioning',
      'Parking',
      'Card Payment',
      'Spa Facilities',
      'Relaxation Areas'
    ],
    isPromo: false,
    isFeatured: true,
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  'hw_002': {
    id: 'hw_002',
    name: 'Urban Smiles Dental',
    category: 'health-wellness',
    subcategory: 'dental-clinic',
    image: require('../../assets/images/urban_smiles.png'),
    rating: 4.8,
    reviewCount: 89,
    description: 'Professional dental care services including cleaning, orthodontics, and cosmetic dentistry. Modern equipment and experienced dentists.',
    shortDescription: 'Dental Care, Orthodontics, Cleaning',
    location: 'Magsaysay Ave, Baguio City',
    address: '456 Magsaysay Avenue, Baguio City, Benguet',
    phone: '+63 917 345 6789',
    email: 'contact@urbansmiles.com',
    website: 'https://urbansmiles.com',
    schedule: {
      monday: { open: '09:00 AM', close: '06:00 PM', isOpen: true },
      tuesday: { open: '09:00 AM', close: '06:00 PM', isOpen: true },
      wednesday: { open: '09:00 AM', close: '06:00 PM', isOpen: true },
      thursday: { open: '09:00 AM', close: '06:00 PM', isOpen: true },
      friday: { open: '09:00 AM', close: '06:00 PM', isOpen: true },
      saturday: { open: '09:00 AM', close: '03:00 PM', isOpen: true },
      sunday: { open: '10:00 AM', close: '02:00 PM', isOpen: false }
    },
    priceRange: { min: 800, max: 3500, currency: '₱' },
    services: [
      { name: 'Dental Cleaning', price: 800, duration: 45 },
      { name: 'Tooth Extraction', price: 1500, duration: 30 },
      { name: 'Dental Filling', price: 1200, duration: 45 },
      { name: 'Orthodontic Consultation', price: 2000, duration: 60 }
    ],
    amenities: [
      'WiFi',
      'Air Conditioning',
      'Parking',
      'Card Payment',
      'Modern Equipment'
    ],
    isPromo: true,
    promoText: '15% off on first visit',
    isFeatured: true,
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  'fs_004': {
    id: 'fs_004',
    name: 'Pulse Fitness Center',
    category: 'fitness-sports',
    subcategory: 'Gym',
    image: require('../../assets/images/pulse.png'),
    rating: 4.80,
    reviewCount: 892,
    description: 'Modern fitness center with certified trainers and group classes. We offer state-of-the-art equipment, personalized training programs, and a supportive community atmosphere to help you reach your fitness goals.',
    shortDescription: 'Modern fitness center with certified trainers and group classes',
    location: 'Quezon City, Metro Manila',
    address: 'Commonwealth Avenue, Quezon City, Metro Manila, Philippines',
    phone: '+63 917 456 7890',
    email: 'info@pulsefitness.com',
    website: 'www.pulsefitness.com',
    schedule: {
      monday: { open: '5:00 AM', close: '11:00 PM', isOpen: true },
      tuesday: { open: '5:00 AM', close: '11:00 PM', isOpen: true },
      wednesday: { open: '5:00 AM', close: '11:00 PM', isOpen: true },
      thursday: { open: '5:00 AM', close: '11:00 PM', isOpen: true },
      friday: { open: '5:00 AM', close: '11:00 PM', isOpen: true },
      saturday: { open: '6:00 AM', close: '10:00 PM', isOpen: true },
      sunday: { open: '6:00 AM', close: '10:00 PM', isOpen: true }
    },
    priceRange: { min: 300, max: 800, currency: '₱' },
    services: [
      { name: 'Day Pass', price: 300, duration: 240 },
      { name: 'Personal Training Session', price: 800, duration: 60 },
      { name: 'Group Class', price: 400, duration: 45 }
    ],
    amenities: [
      'Certified Trainers',
      'Group Classes',
      'Cardio Equipment',
      'Weight Training Area',
      'Locker Rooms',
      'Shower Facilities'
    ],
    isPromo: false,
    isFeatured: true,
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  'bpc_002': {
    id: 'bpc_002',
    name: 'The Glow Haven Spa',
    category: 'beauty-personal-care',
    subcategory: 'Spa',
    image: require('../../assets/images/glow-haven-2.png'),
    rating: 4.75,
    reviewCount: 654,
    description: 'Luxurious spa offering massages, facials and relaxation. Experience our premium treatments designed to rejuvenate your body and mind in a tranquil, luxurious environment.',
    shortDescription: 'Luxurious spa offering massages, facials and relaxation',
    location: 'BGC, Taguig City',
    address: 'Bonifacio Global City, Taguig City, Metro Manila, Philippines',
    phone: '+63 917 321 9876',
    email: 'info@glowhavenspa.com',
    website: 'www.glowhavenspa.com',
    schedule: {
      monday: { open: '10:00 AM', close: '8:00 PM', isOpen: true },
      tuesday: { open: '10:00 AM', close: '8:00 PM', isOpen: true },
      wednesday: { open: '10:00 AM', close: '8:00 PM', isOpen: true },
      thursday: { open: '10:00 AM', close: '8:00 PM', isOpen: true },
      friday: { open: '10:00 AM', close: '9:00 PM', isOpen: true },
      saturday: { open: '9:00 AM', close: '9:00 PM', isOpen: true },
      sunday: { open: '9:00 AM', close: '8:00 PM', isOpen: true }
    },
    priceRange: { min: 1200, max: 4500, currency: '₱' },
    services: [
      { name: 'Signature Facial', price: 1800, duration: 60 },
      { name: 'Swedish Massage', price: 2200, duration: 60 },
      { name: 'Premium Spa Package', price: 4000, duration: 120 }
    ],
    amenities: [
      'Private Treatment Rooms',
      'Relaxation Lounge',
      'Premium Products',
      'Expert Therapists',
      'Aromatherapy',
      'Calm Environment'
    ],
    isPromo: true,
    promoText: '15% off spa packages',
    isFeatured: true,
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  'hw_001': {
    id: 'hw_001',
    name: 'Prime Care Medical Clinic',
    category: 'health-wellness',
    subcategory: 'medical-clinic',
    image: require('../../assets/images/prime-care.png'),
    rating: 4.9,
    reviewCount: 156,
    description: 'Comprehensive medical services including general medicine, laboratory tests, and X-ray services. Our experienced doctors provide quality healthcare.',
    shortDescription: 'General Medicine, Laboratory, X-Ray',
    location: 'Session Road, Baguio City',
    address: '123 Session Road, Baguio City, Benguet',
    phone: '+63 917 234 5678',
    email: 'info@primecare.com',
    website: 'https://primecare.com',
    schedule: {
      monday: { open: '08:00 AM', close: '05:00 PM', isOpen: true },
      tuesday: { open: '08:00 AM', close: '05:00 PM', isOpen: true },
      wednesday: { open: '08:00 AM', close: '05:00 PM', isOpen: true },
      thursday: { open: '08:00 AM', close: '05:00 PM', isOpen: true },
      friday: { open: '08:00 AM', close: '05:00 PM', isOpen: true },
      saturday: { open: '08:00 AM', close: '05:00 PM', isOpen: true },
      sunday: { open: '09:00 AM', close: '03:00 PM', isOpen: true }
    },
    priceRange: { min: 500, max: 2000, currency: '₱' },
    services: [
      { name: 'General Consultation', price: 500, duration: 30 },
      { name: 'Laboratory Tests', price: 800, duration: 60 },
      { name: 'X-Ray', price: 1200, duration: 30 },
      { name: 'Health Certificate', price: 300, duration: 15 }
    ],
    amenities: [
      'WiFi',
      'Air Conditioning',
      'Parking',
      'Card Payment',
      'Insurance Accepted',
      'Modern Equipment'
    ],
    isPromo: false,
    isFeatured: true,
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  'hw_003': {
    id: 'hw_003',
    name: 'Serene Scape Wellness',
    category: 'health-wellness',
    subcategory: 'mental-health',
    image: require('../../assets/images/serenescape.png'),
    rating: 4.7,
    reviewCount: 67,
    description: 'Mental health and wellness services including therapy, counseling, and stress management programs.',
    shortDescription: 'Therapy, Counseling, Mental Health',
    location: 'Upper Session Road, Baguio City',
    address: '789 Upper Session Road, Baguio City, Benguet',
    phone: '+63 917 456 7890',
    email: 'wellness@serenescape.com',
    website: 'https://serenescape-wellness.com',
    schedule: {
      monday: { open: '10:00 AM', close: '08:00 PM', isOpen: true },
      tuesday: { open: '10:00 AM', close: '08:00 PM', isOpen: true },
      wednesday: { open: '10:00 AM', close: '08:00 PM', isOpen: true },
      thursday: { open: '10:00 AM', close: '08:00 PM', isOpen: true },
      friday: { open: '10:00 AM', close: '08:00 PM', isOpen: true },
      saturday: { open: '10:00 AM', close: '08:00 PM', isOpen: true },
      sunday: { open: '10:00 AM', close: '08:00 PM', isOpen: true }
    },
    priceRange: { min: 1200, max: 4000, currency: '₱' },
    services: [
      { name: 'Individual Therapy', price: 2500, duration: 60 },
      { name: 'Group Therapy', price: 1200, duration: 90 },
      { name: 'Stress Management', price: 1800, duration: 45 },
      { name: 'Mental Health Assessment', price: 3000, duration: 90 }
    ],
    amenities: [
      'WiFi',
      'Air Conditioning',
      'Private Rooms',
      'Card Payment',
      'Confidential Environment',
      'Comfortable Setting'
    ],
    isPromo: false,
    isFeatured: false,
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  'hw_004': {
    id: 'hw_004',
    name: 'Bright Eye Clinic',
    category: 'health-wellness',
    subcategory: 'eye-clinic',
    image: require('../../assets/images/eye-clinic.png'),
    rating: 4.6,
    reviewCount: 94,
    description: 'Complete eye care services including checkups, prescription glasses, contact lenses, and eye surgery consultations.',
    shortDescription: 'Eye Checkup, Glasses, Contact Lenses',
    location: 'Governor Pack Road, Baguio City',
    address: '321 Governor Pack Road, Baguio City, Benguet',
    phone: '+63 917 567 8901',
    email: 'care@brighteye.com',
    website: 'https://brighteye-clinic.com',
    schedule: {
      monday: { open: '08:30 AM', close: '05:30 PM', isOpen: false },
      tuesday: { open: '08:30 AM', close: '05:30 PM', isOpen: true },
      wednesday: { open: '08:30 AM', close: '05:30 PM', isOpen: true },
      thursday: { open: '08:30 AM', close: '05:30 PM', isOpen: true },
      friday: { open: '08:30 AM', close: '05:30 PM', isOpen: true },
      saturday: { open: '08:30 AM', close: '05:30 PM', isOpen: true },
      sunday: { open: '09:00 AM', close: '03:00 PM', isOpen: false }
    },
    priceRange: { min: 600, max: 2500, currency: '₱' },
    services: [
      { name: 'Eye Examination', price: 800, duration: 45 },
      { name: 'Prescription Glasses', price: 2500, duration: 30 },
      { name: 'Contact Lens Fitting', price: 1500, duration: 30 },
      { name: 'Eye Surgery Consultation', price: 2000, duration: 60 }
    ],
    amenities: [
      'WiFi',
      'Air Conditioning',
      'Parking',
      'Card Payment',
      'Insurance Accepted',
      'Modern Equipment'
    ],
    isPromo: false,
    isFeatured: false,
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  'hw_005': {
    id: 'hw_005',
    name: 'Zen Yoga Studio',
    category: 'health-wellness',
    subcategory: 'fitness-wellness',
    image: require('../../assets/images/zenyoga.png'),
    rating: 4.8,
    reviewCount: 123,
    description: 'Yoga, meditation, and wellness classes for all levels. Professional instructors and peaceful environment.',
    shortDescription: 'Yoga, Meditation, Wellness Classes',
    location: 'Camp 7, Baguio City',
    address: '654 Camp 7, Baguio City, Benguet',
    phone: '+63 917 678 9012',
    email: 'info@zenyoga.com',
    website: 'https://zenyoga-studio.com',
    schedule: {
      monday: { open: '06:00 AM', close: '09:00 PM', isOpen: true },
      tuesday: { open: '06:00 AM', close: '09:00 PM', isOpen: true },
      wednesday: { open: '06:00 AM', close: '09:00 PM', isOpen: true },
      thursday: { open: '06:00 AM', close: '09:00 PM', isOpen: true },
      friday: { open: '06:00 AM', close: '09:00 PM', isOpen: true },
      saturday: { open: '06:00 AM', close: '09:00 PM', isOpen: true },
      sunday: { open: '06:00 AM', close: '09:00 PM', isOpen: true }
    },
    priceRange: { min: 300, max: 1500, currency: '₱' },
    services: [
      { name: 'Drop-in Yoga Class', price: 300, duration: 60 },
      { name: 'Private Yoga Session', price: 1500, duration: 60 },
      { name: 'Meditation Class', price: 250, duration: 45 },
      { name: 'Wellness Workshop', price: 800, duration: 120 }
    ],
    amenities: [
      'WiFi',
      'Air Conditioning',
      'Yoga Mats',
      'Changing Rooms',
      'Card Payment',
      'Peaceful Environment'
    ],
    isPromo: true,
    promoText: 'First class free for new members',
    isFeatured: true,
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
};

const { width } = Dimensions.get('window');

export default function ServiceDetailPage() {
  const { serviceId } = useLocalSearchParams<{ serviceId: string }>();
  const router = useRouter();
  const [service, setService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  console.log('🔍 ServiceDetailPage loaded with serviceId:', serviceId);
  console.log('🔍 Type of serviceId:', typeof serviceId);
  console.log('🔍 Available services:', Object.keys(mockServiceData));

  useEffect(() => {
    loadServiceData();
  }, [serviceId]);

  const loadServiceData = async () => {
    try {
      setIsLoading(true);
      console.log('🔄 Loading service data for serviceId:', serviceId);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // In a real app, you would fetch from an API
      const serviceData = mockServiceData[serviceId as string];
      console.log('📊 Service data found:', serviceData ? serviceData.name : 'None');
      console.log('📊 ServiceData object:', serviceData);
      
      if (serviceData) {
        setService(serviceData);
        console.log('✅ Service set successfully:', serviceData.name);
      } else {
        console.log('❌ Service not found in mockServiceData');
        Alert.alert('Error', 'Service not found');
        router.back();
      }
    } catch (error) {
      console.error('💥 Error loading service:', error);
      Alert.alert('Error', 'Failed to load service details');
    } finally {
      setIsLoading(false);
      console.log('🏁 Loading completed');
    }
  };

  const handleBookAppointment = () => {
    if (service) {
      console.log('🎯 Navigating to booking with service:', service.id, service.name);
      console.log('🎯 Service data being passed:', service);
      router.push({
        pathname: '/(booking)/details',
        params: {
          serviceId: service.id,
          serviceData: JSON.stringify(service)
        }
      });
    } else {
      console.error('❌ No service data available for booking');
    }
  };

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    // Here you would typically save to favorites in your backend/storage
  };

  const getCurrentDaySchedule = () => {
    if (!service) return null;
    
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const today = days[new Date().getDay()];
    return service.schedule[today as keyof typeof service.schedule];
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#EDAE49" />
          <Text style={styles.loadingText}>Loading service details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!service) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Service not found</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const todaySchedule = getCurrentDaySchedule();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Image */}
        <View style={styles.imageContainer}>
          <Image source={service.image} style={styles.headerImage} resizeMode="cover" />
          
          {/* Back Button */}
          <TouchableOpacity style={styles.backIconButton} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="#333" />
          </TouchableOpacity>
          
          {/* Favorite Button */}
          <TouchableOpacity style={styles.favoriteButton} onPress={handleFavoriteToggle}>
            <Ionicons 
              name={isFavorite ? "bookmark" : "bookmark-outline"} 
              size={24} 
              color={isFavorite ? "#EDAE49" : "#333"} 
            />
          </TouchableOpacity>
        </View>

        {/* Service Info */}
        <View style={styles.contentContainer}>
          {/* Service Name and Rating */}
          <View style={styles.headerInfo}>
            <Text style={styles.serviceName}>{service.name}</Text>
            <View style={styles.ratingContainer}>
              <MaterialIcons name="star" size={16} color="#EDAE49" />
              <Text style={styles.ratingText}>{service.rating}</Text>
              <Text style={styles.reviewText}>({service.reviewCount} Reviews)</Text>
            </View>
          </View>

          {/* Location and Schedule */}
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={16} color="#666" />
            <Text style={styles.infoText}>{service.location}</Text>
          </View>

          {todaySchedule && (
            <View style={styles.infoRow}>
              <Ionicons name="time-outline" size={16} color="#666" />
              <Text style={styles.infoText}>
                {todaySchedule.isOpen 
                  ? `${todaySchedule.open} - ${todaySchedule.close}`
                  : 'Closed Today'
                }
              </Text>
            </View>
          )}

          {/* About Us Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About Us</Text>
            <Text style={styles.description}>{service.description}</Text>
          </View>

          {/* We Offer Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>We Offer:</Text>
            {service.amenities.map((amenity, index) => (
              <View key={index} style={styles.amenityItem}>
                <Text style={styles.amenityBullet}>•</Text>
                <Text style={styles.amenityText}>{amenity}</Text>
              </View>
            ))}
          </View>

          {/* Services Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Services</Text>
            {service.services.map((serviceItem, index) => (
              <View key={index} style={styles.serviceItem}>
                <View style={styles.serviceInfo}>
                  <Text style={styles.serviceName}>{serviceItem.name}</Text>
                  <Text style={styles.serviceDuration}>Duration: {serviceItem.duration} mins</Text>
                </View>
                <Text style={styles.servicePrice}>₱{serviceItem.price}/visit</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Book Appointment Button */}
      <View style={styles.bookingContainer}>
        <TouchableOpacity style={styles.bookButton} onPress={handleBookAppointment}>
          <Text style={styles.bookButtonText}>Book an Appointment</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#EDAE49',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  imageContainer: {
    position: 'relative',
    height: 250,
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  backIconButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 8,
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  favoriteButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 8,
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  contentContainer: {
    padding: 20,
  },
  headerInfo: {
    marginBottom: 15,
  },
  serviceName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 4,
    color: '#333',
  },
  reviewText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  section: {
    marginTop: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: '#666',
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 5,
  },
  amenityBullet: {
    fontSize: 16,
    color: '#EDAE49',
    marginRight: 8,
    fontWeight: 'bold',
  },
  amenityText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 8,
  },
  serviceInfo: {
    flex: 1,
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#EDAE49',
  },
  serviceDuration: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  bookingContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  bookButton: {
    backgroundColor: '#EDAE49',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  bookButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
