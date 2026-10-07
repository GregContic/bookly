// ==========================================
// SERVICE DETAILS PAGE - MAIN IMPORTS
// ==========================================
// This page displays comprehensive information about a specific service
// including images, descriptions, pricing, gallery, and customer reviews

import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

// Types - Service interface defining the structure of service data
import { Service } from '../_types/interfaces';

// Services - API service for fetching service data
import { serviceAPI } from '../_services/serviceAPI';

// Context - Saved services context for bookmark functionality
import { useSavedServices } from '../../context/SavedServicesContext';

// ==========================================
// MOCK SERVICE DATA - COMPREHENSIVE SERVICE CATALOG
// ==========================================
// This mock data represents the complete service catalog with detailed information
// In a production app, this would come from a backend API/database
// Each service includes: basic info, pricing, scheduling, amenities, gallery, and reviews

const mockServiceData: { [key: string]: Service } = {
  // ==========================================
  // FITNESS & SPORTS SERVICES
  // ==========================================
  
  // Shape Up Gym - Premium fitness center with modern equipment
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
    gallery: [
      {
        id: 'g1',
        url: require('../../assets/images/shapeup_gym.png'),
        caption: 'Main workout area',
        type: 'image' as const
      },
      {
        id: 'g2', 
        url: require('../../assets/images/apex-gym.png'),
        caption: 'Cardio section',
        type: 'image' as const
      },
      {
        id: 'g3',
        url: require('../../assets/images/peak-performance.png'),
        caption: 'Weight training area',
        type: 'image' as const
      }
    ],
    reviews: [
      {
        id: 'r1',
        userId: 'u1',
        userName: 'Jacob Jones',
        userAvatar: require('../../assets/images/placeholder_muscle.png'),
        rating: 5,
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        date: new Date('2024-02-15')
      },
      {
        id: 'r2',
        userId: 'u2', 
        userName: 'Kathryn Murphy',
        userAvatar: require('../../assets/images/placeholder_lotus.png'),
        rating: 5,
        comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        date: new Date('2024-02-10')
      }
    ],
    isPromo: false,
    isFeatured: true,
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // ==========================================
  // HEALTH & WELLNESS SERVICES
  // ==========================================
  
  // The Spa Wellness Center - Premium spa and wellness treatments
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
    gallery: [
      {
        id: 'g1',
        url: require('../../assets/images/spa-wellness.png'),
        caption: 'Relaxation room',
        type: 'image' as const
      },
      {
        id: 'g2',
        url: require('../../assets/images/glow-haven.png'),
        caption: 'Treatment room',
        type: 'image' as const
      },
      {
        id: 'g3',
        url: require('../../assets/images/serenescape.png'),
        caption: 'Massage area',
        type: 'image' as const
      }
    ],
    reviews: [
      {
        id: 'r1',
        userId: 'u3',
        userName: 'Sarah Johnson',
        userAvatar: require('../../assets/images/placeholder_lotus.png'),
        rating: 5,
        comment: 'Amazing spa experience! The hot stone therapy was incredibly relaxing and the staff was very professional.',
        date: new Date('2024-02-20')
      },
      {
        id: 'r2',
        userId: 'u4',
        userName: 'Michael Chen',
        userAvatar: require('../../assets/images/placeholder_muscle.png'),
        rating: 4,
        comment: 'Great aromatherapy session. The ambiance is perfect for relaxation. Will definitely come back!',
        date: new Date('2024-02-18')
      }
    ],
    isPromo: false,
    isFeatured: true,
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // Urban Smiles Dental - Professional dental care and orthodontics
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
    gallery: [
      {
        id: 'g1',
        url: require('../../assets/images/urban_smiles.png'),
        caption: 'Modern dental clinic',
        type: 'image' as const
      },
      {
        id: 'g2',
        url: require('../../assets/images/dr-teeth.png'),
        caption: 'Treatment room',
        type: 'image' as const
      },
      {
        id: 'g3',
        url: require('../../assets/images/smile-bright.png'),
        caption: 'Reception area',
        type: 'image' as const
      }
    ],
    reviews: [
      {
        id: 'r1',
        userId: 'u5',
        userName: 'Emily Rodriguez',
        userAvatar: require('../../assets/images/placeholder_scissors.png'),
        rating: 5,
        comment: 'Excellent dental care! The dentist was very gentle and explained everything clearly. Highly recommend!',
        date: new Date('2024-02-22')
      },
      {
        id: 'r2',
        userId: 'u6',
        userName: 'David Park',
        userAvatar: require('../../assets/images/placeholder_house.png'),
        rating: 4,
        comment: 'Professional service and modern equipment. The dental cleaning was thorough and comfortable.',
        date: new Date('2024-02-19')
      }
    ],
    isPromo: true,
    promoText: '15% off on first visit',
    isFeatured: true,
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // Pulse Fitness Center - Modern fitness center with certified trainers
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
    gallery: [
      {
        id: 'g1',
        url: require('../../assets/images/pulse.png'),
        caption: 'Main gym floor',
        type: 'image' as const
      },
      {
        id: 'g2',
        url: require('../../assets/images/shapeup_gym.png'),
        caption: 'Cardio equipment area',
        type: 'image' as const
      },
      {
        id: 'g3',
        url: require('../../assets/images/apex-gym.png'),
        caption: 'Weight training section',
        type: 'image' as const
      }
    ],
    reviews: [
      {
        id: 'r1',
        userId: 'u7',
        userName: 'Alex Rivera',
        userAvatar: require('../../assets/images/placeholder_muscle.png'),
        rating: 5,
        comment: 'Great gym with modern equipment and knowledgeable trainers. The group classes are fantastic!',
        date: new Date('2024-02-25')
      },
      {
        id: 'r2',
        userId: 'u8',
        userName: 'Maria Santos',
        userAvatar: require('../../assets/images/placeholder_lotus.png'),
        rating: 4,
        comment: 'Clean facilities and good hours. The personal training sessions really helped me reach my goals.',
        date: new Date('2024-02-23')
      }
    ],
    isPromo: false,
    isFeatured: true,
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // ==========================================
  // BEAUTY & PERSONAL CARE SERVICES
  // ==========================================
  
  // The Glow Haven Spa - Luxurious spa with premium treatments
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
    gallery: [
      {
        id: 'g1',
        url: require('../../assets/images/glow-haven-2.png'),
        caption: 'Luxurious spa interior',
        type: 'image' as const
      },
      {
        id: 'g2',
        url: require('../../assets/images/glow-haven.png'),
        caption: 'Treatment room',
        type: 'image' as const
      },
      {
        id: 'g3',
        url: require('../../assets/images/spa-wellness.png'),
        caption: 'Relaxation area',
        type: 'image' as const
      }
    ],
    reviews: [
      {
        id: 'r1',
        userId: 'u9',
        userName: 'Jessica Wong',
        userAvatar: require('../../assets/images/placeholder_lotus.png'),
        rating: 5,
        comment: 'The most relaxing spa experience I\'ve ever had! The signature facial left my skin glowing.',
        date: new Date('2024-02-26')
      },
      {
        id: 'r2',
        userId: 'u10',
        userName: 'Andrew Kim',
        userAvatar: require('../../assets/images/placeholder_muscle.png'),
        rating: 4,
        comment: 'Great Swedish massage and excellent service. The ambiance is perfect for relaxation.',
        date: new Date('2024-02-24')
      }
    ],
    isPromo: true,
    promoText: '15% off spa packages',
    isFeatured: true,
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // Prime Care Medical Clinic - Comprehensive medical services
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
    gallery: [
      {
        id: 'g1',
        url: require('../../assets/images/prime-care.png'),
        caption: 'Modern medical facility',
        type: 'image' as const
      },
      {
        id: 'g2',
        url: require('../../assets/images/eye-clinic.png'),
        caption: 'Consultation room',
        type: 'image' as const
      },
      {
        id: 'g3',
        url: require('../../assets/images/urban_smiles.png'),
        caption: 'Waiting area',
        type: 'image' as const
      }
    ],
    reviews: [
      {
        id: 'r1',
        userId: 'u11',
        userName: 'Carlos Mendoza',
        userAvatar: require('../../assets/images/placeholder_house.png'),
        rating: 5,
        comment: 'Excellent medical care and professional staff. The doctor was very thorough and knowledgeable.',
        date: new Date('2024-02-27')
      },
      {
        id: 'r2',
        userId: 'u12',
        userName: 'Lisa Chen',
        userAvatar: require('../../assets/images/placeholder_scissors.png'),
        rating: 5,
        comment: 'Quick and efficient service. Lab results were ready fast and the staff was very accommodating.',
        date: new Date('2024-02-25')
      }
    ],
    isPromo: false,
    isFeatured: true,
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // Serene Scape Wellness - Mental health and wellness services
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
    gallery: [
      {
        id: 'g1',
        url: require('../../assets/images/serenescape.png'),
        caption: 'Peaceful therapy room',
        type: 'image' as const
      },
      {
        id: 'g2',
        url: require('../../assets/images/zenyoga.png'),
        caption: 'Meditation space',
        type: 'image' as const
      },
      {
        id: 'g3',
        url: require('../../assets/images/spa-wellness.png'),
        caption: 'Comfortable consultation area',
        type: 'image' as const
      }
    ],
    reviews: [
      {
        id: 'r1',
        userId: 'u13',
        userName: 'Rachel Thompson',
        userAvatar: require('../../assets/images/placeholder_lotus.png'),
        rating: 5,
        comment: 'The therapy sessions have been life-changing. The therapist is compassionate and skilled.',
        date: new Date('2024-02-28')
      },
      {
        id: 'r2',
        userId: 'u14',
        userName: 'Mark Johnson',
        userAvatar: require('../../assets/images/placeholder_muscle.png'),
        rating: 4,
        comment: 'Great environment for healing. The stress management program really helped me cope better.',
        date: new Date('2024-02-26')
      }
    ],
    isPromo: false,
    isFeatured: false,
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // Bright Eye Clinic - Complete eye care and vision services
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
    gallery: [
      {
        id: 'g1',
        url: require('../../assets/images/eye-clinic.png'),
        caption: 'Modern eye examination room',
        type: 'image' as const
      },
      {
        id: 'g2',
        url: require('../../assets/images/prime-care.png'),
        caption: 'Waiting area',
        type: 'image' as const
      },
      {
        id: 'g3',
        url: require('../../assets/images/urban_smiles.png'),
        caption: 'Consultation room',
        type: 'image' as const
      }
    ],
    reviews: [
      {
        id: 'r1',
        userId: 'u15',
        userName: 'Anna Martinez',
        userAvatar: require('../../assets/images/placeholder_scissors.png'),
        rating: 5,
        comment: 'Very professional eye examination. The doctor explained everything clearly and helped me find the perfect glasses.',
        date: new Date('2024-02-29')
      },
      {
        id: 'r2',
        userId: 'u16',
        userName: 'James Wilson',
        userAvatar: require('../../assets/images/placeholder_house.png'),
        rating: 4,
        comment: 'Good service and quality eyewear. The contact lens fitting was thorough and comfortable.',
        date: new Date('2024-02-27')
      }
    ],
    isPromo: false,
    isFeatured: false,
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // Zen Yoga Studio - Yoga, meditation, and wellness classes
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
    gallery: [
      {
        id: 'g1',
        url: require('../../assets/images/zenyoga.png'),
        caption: 'Peaceful yoga studio',
        type: 'image' as const
      },
      {
        id: 'g2',
        url: require('../../assets/images/serenescape.png'),
        caption: 'Meditation space',
        type: 'image' as const
      },
      {
        id: 'g3',
        url: require('../../assets/images/spa-wellness.png'),
        caption: 'Relaxation area',
        type: 'image' as const
      }
    ],
    reviews: [
      {
        id: 'r1',
        userId: 'u17',
        userName: 'Sophie Lee',
        userAvatar: require('../../assets/images/placeholder_lotus.png'),
        rating: 5,
        comment: 'Amazing yoga classes with skilled instructors. The peaceful environment helps me relax and focus.',
        date: new Date('2024-03-01')
      },
      {
        id: 'r2',
        userId: 'u18',
        userName: 'Tom Rodriguez',
        userAvatar: require('../../assets/images/placeholder_muscle.png'),
        rating: 4,
        comment: 'Great wellness workshops and meditation sessions. The private yoga lessons are excellent.',
        date: new Date('2024-02-28')
      }
    ],
    isPromo: true,
    promoText: 'First class free for new members',
    isFeatured: true,
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // Ink Haven Tattoo Studio - Professional tattoo and piercing services
  'bpc_003': {
    id: 'bpc_003',
    name: 'Ink Haven Tattoo Studio',
    category: 'beauty-personal-care',
    subcategory: 'Body Art',
    image: require('../../assets/images/ink-haven.png'),
    rating: 4.7,
    reviewCount: 654,
    description: 'Professional tattoo and piercing studio specializing in custom tattoos, body art, and piercing services. Our experienced artists create unique designs tailored to your vision.',
    shortDescription: 'Custom Tattoos, Piercing, Body Art',
    location: 'Upper Session Road, Baguio City',
    address: 'Upper Session Road, Baguio City, Benguet, Philippines',
    phone: '+63 917 789 0123',
    email: 'info@inkhaven.com',
    website: 'www.inkhaven-tattoo.com',
    schedule: {
      monday: { open: '12:00 PM', close: '9:00 PM', isOpen: false },
      tuesday: { open: '12:00 PM', close: '9:00 PM', isOpen: false },
      wednesday: { open: '12:00 PM', close: '9:00 PM', isOpen: true },
      thursday: { open: '12:00 PM', close: '9:00 PM', isOpen: true },
      friday: { open: '12:00 PM', close: '9:00 PM', isOpen: true },
      saturday: { open: '12:00 PM', close: '9:00 PM', isOpen: true },
      sunday: { open: '12:00 PM', close: '9:00 PM', isOpen: true }
    },
    priceRange: { min: 1500, max: 8000, currency: '₱' },
    services: [
      { name: 'Small Tattoo', price: 2500, duration: 120 },
      { name: 'Medium Tattoo', price: 4500, duration: 180 },
      { name: 'Large Tattoo', price: 8000, duration: 300 },
      { name: 'Piercing', price: 1500, duration: 30 }
    ],
    amenities: [
      'Sterile Equipment',
      'Custom Designs',
      'Aftercare Products',
      'Consultation',
      'Portfolio Viewing',
      'Air Conditioning'
    ],
    gallery: [
      {
        id: 'g1',
        url: require('../../assets/images/ink-haven.png'),
        caption: 'Professional tattoo studio',
        type: 'image' as const
      },
      {
        id: 'g2',
        url: require('../../assets/images/harmony.png'),
        caption: 'Clean workspace',
        type: 'image' as const
      },
      {
        id: 'g3',
        url: require('../../assets/images/davidsalon.png'),
        caption: 'Consultation area',
        type: 'image' as const
      }
    ],
    reviews: [
      {
        id: 'r1',
        userId: 'u19',
        userName: 'Marcus Thompson',
        userAvatar: require('../../assets/images/placeholder_house.png'),
        rating: 5,
        comment: 'Amazing tattoo work! The artist was very professional and the studio is clean and well-maintained.',
        date: new Date('2024-03-02')
      },
      {
        id: 'r2',
        userId: 'u20',
        userName: 'Nina Garcia',
        userAvatar: require('../../assets/images/placeholder_scissors.png'),
        rating: 4,
        comment: 'Great custom design and excellent aftercare advice. The piercing service was quick and painless.',
        date: new Date('2024-03-01')
      }
    ],
    isPromo: false,
    isFeatured: true,
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  // David Salon & Spa - Professional hair and spa services
  'bpc_001': {
    id: 'bpc_001',
    name: 'David Salon & Spa',
    category: 'beauty-personal-care',
    subcategory: 'Hair & Spa',
    image: require('../../assets/images/davidsalon.png'),
    rating: 4.9,
    reviewCount: 1238,
    description: 'Professional salon and spa services including hair styling, coloring, and relaxing spa treatments. Our experienced stylists and therapists provide quality beauty services.',
    shortDescription: 'Hair Styling, Coloring, Spa Treatments',
    location: 'Session Road, Baguio City',
    address: 'Session Road, Baguio City, Benguet, Philippines',
    phone: '+63 917 890 1234',
    email: 'info@davidsalon.com',
    website: 'www.davidsalon.com',
    schedule: {
      monday: { open: '9:00 AM', close: '8:00 PM', isOpen: true },
      tuesday: { open: '9:00 AM', close: '8:00 PM', isOpen: true },
      wednesday: { open: '9:00 AM', close: '8:00 PM', isOpen: true },
      thursday: { open: '9:00 AM', close: '8:00 PM', isOpen: true },
      friday: { open: '9:00 AM', close: '8:00 PM', isOpen: true },
      saturday: { open: '9:00 AM', close: '8:00 PM', isOpen: true },
      sunday: { open: '9:00 AM', close: '8:00 PM', isOpen: true }
    },
    priceRange: { min: 300, max: 2500, currency: '₱' },
    services: [
      { name: 'Hair Cut & Style', price: 500, duration: 60 },
      { name: 'Hair Coloring', price: 1500, duration: 120 },
      { name: 'Hair Treatment', price: 800, duration: 90 },
      { name: 'Spa Package', price: 2500, duration: 150 }
    ],
    amenities: [
      'Professional Stylists',
      'Quality Products',
      'Relaxing Environment',
      'Hair Treatments',
      'Spa Services',
      'Air Conditioning'
    ],
    gallery: [
      {
        id: 'g1',
        url: require('../../assets/images/davidsalon.png'),
        caption: 'Modern salon interior',
        type: 'image' as const
      },
      {
        id: 'g2',
        url: require('../../assets/images/glow-haven.png'),
        caption: 'Hair styling station',
        type: 'image' as const
      },
      {
        id: 'g3',
        url: require('../../assets/images/spa-wellness.png'),
        caption: 'Spa treatment area',
        type: 'image' as const
      }
    ],
    reviews: [
      {
        id: 'r1',
        userId: 'u21',
        userName: 'Isabella Cruz',
        userAvatar: require('../../assets/images/placeholder_scissors.png'),
        rating: 5,
        comment: 'Amazing hair transformation! The stylist was very skilled and the spa services were so relaxing.',
        date: new Date('2024-03-03')
      },
      {
        id: 'r2',
        userId: 'u22',
        userName: 'Gabriel Santos',
        userAvatar: require('../../assets/images/placeholder_house.png'),
        rating: 4,
        comment: 'Great service and professional staff. The hair treatment really improved the quality of my hair.',
        date: new Date('2024-03-02')
      }
    ],
    isPromo: true,
    promoText: '20% off first visit',
    isFeatured: true,
    isVerified: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
};

// ==========================================
// DEVICE DIMENSIONS & MAIN COMPONENT
// ==========================================

const { width } = Dimensions.get('window');

// ==========================================
// SERVICE DETAIL PAGE COMPONENT
// ==========================================
// Main component that handles the service details display
// Features: image gallery, service info, booking, reviews, etc.

export default function ServiceDetailPage() {
  // ==========================================
  // COMPONENT STATE & HOOKS
  // ==========================================
  
  const { serviceId } = useLocalSearchParams<{ serviceId: string }>();
  const router = useRouter();
  const [service, setService] = useState<Service | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Saved services context for bookmark functionality
  const { isSaved, addService, removeService } = useSavedServices();

  // Debug logging for service ID and available services
  console.log('🔍 ServiceDetailPage loaded with serviceId:', serviceId);
  console.log('🔍 Type of serviceId:', typeof serviceId);
  console.log('🔍 Available services:', Object.keys(mockServiceData));

  // ==========================================
  // COMPONENT LIFECYCLE
  // ==========================================
  
  useEffect(() => {
    loadServiceData();
  }, [serviceId]);

  // ==========================================
  // DATA LOADING FUNCTION
  // ==========================================
  // Handles loading service data from API or mock data
  // Includes error handling and loading states
  
  const loadServiceData = async () => {
    try {
      setIsLoading(true);
      console.log('🔄 Loading service data for serviceId:', serviceId);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // First try to get from serviceAPI (which uses searchData)
      try {
        const allServices = await serviceAPI.getAllServices();
        const serviceData = allServices.find(s => s.id === serviceId);
        
        if (serviceData) {
          // Convert ServiceData to Service format for compatibility
          const convertedService: Service = {
            id: serviceData.id.toString(),
            name: serviceData.name,
            category: serviceData.category as any,
            subcategory: serviceData.subcategory || '',
            image: serviceData.image,
            rating: serviceData.rating,
            reviewCount: serviceData.reviews || 0,
            description: serviceData.description,
            shortDescription: serviceData.description.substring(0, 100),
            location: serviceData.location || 'Location not specified',
            address: serviceData.location || 'Address not specified',
            phone: '+63 917 123 4567',
            email: 'info@service.com',
            website: 'www.service.com',
            schedule: {
              monday: { open: '09:00 AM', close: '06:00 PM', isOpen: true },
              tuesday: { open: '09:00 AM', close: '06:00 PM', isOpen: true },
              wednesday: { open: '09:00 AM', close: '06:00 PM', isOpen: true },
              thursday: { open: '09:00 AM', close: '06:00 PM', isOpen: true },
              friday: { open: '09:00 AM', close: '06:00 PM', isOpen: true },
              saturday: { open: '09:00 AM', close: '06:00 PM', isOpen: true },
              sunday: { open: '09:00 AM', close: '06:00 PM', isOpen: true }
            },
            priceRange: { min: 500, max: 2000, currency: '₱' },
            services: [
              { name: 'Standard Service', price: 500, duration: 60 },
              { name: 'Premium Service', price: 1000, duration: 90 }
            ],
            amenities: ['WiFi', 'Air Conditioning', 'Parking'],
            gallery: [
              {
                id: 'g1',
                url: serviceData.image,
                caption: 'Service image',
                type: 'image' as const
              }
            ],
            reviews: [
              {
                id: 'r1',
                userId: 'u1',
                userName: 'John Doe',
                userAvatar: require('../../assets/images/placeholder_house.png'),
                rating: 5,
                comment: 'Great service! Highly recommended.',
                date: new Date('2024-03-01')
              }
            ],
            isPromo: serviceData.isPromo || false,
            promoText: serviceData.isPromo ? 'Special offer available' : undefined,
            isFeatured: false,
            isVerified: true,
            createdAt: new Date(),
            updatedAt: new Date()
          };
          
          setService(convertedService);
          console.log('✅ Service loaded from API:', convertedService.name);
          return;
        }
      } catch (apiError) {
        console.log('⚠️ API failed, falling back to mockServiceData:', apiError);
      }
      
      // Fallback to mockServiceData
      const serviceData = mockServiceData[serviceId as string];
      console.log('📊 Service data found:', serviceData ? serviceData.name : 'None');
      console.log('📊 ServiceData object:', serviceData);
      
      if (serviceData) {
        setService(serviceData);
        console.log('✅ Service set successfully from mockData:', serviceData.name);
      } else {
        console.log('❌ Service not found in any data source');
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

  // ==========================================
  // BOOKING HANDLER
  // ==========================================
  // Navigates to booking page with service data
  
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

  // ==========================================
  // BOOKMARK HANDLER
  // ==========================================
  // Toggles bookmark/saved status for the service using context
  
  const handleBookmarkToggle = () => {
    if (service) {
      const serviceIsSaved = isSaved(service.id);
      if (serviceIsSaved) {
        removeService(service.id);
        console.log('📌 Service removed from saved:', service.name);
      } else {
        // Convert Service to SavedService format
        const savedService = {
          id: service.id,
          name: service.name,
          image: service.image,
          rating: service.rating,
          address: service.address,
          schedule: `${service.schedule.monday.open} - ${service.schedule.monday.close}`,
          price: `₱${service.priceRange.min} - ₱${service.priceRange.max}`,
          category: service.category
        };
        addService(savedService);
        console.log('📌 Service added to saved:', service.name);
      }
    }
  };

  // ==========================================
  // SCHEDULE HELPER
  // ==========================================
  // Gets the current day's schedule for the service
  
  const getCurrentDaySchedule = () => {
    if (!service) return null;
    
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const today = days[new Date().getDay()];
    return service.schedule[today as keyof typeof service.schedule];
  };

  // ==========================================
  // LOADING STATE COMPONENT
  // ==========================================
  // Displays loading spinner while service data is being fetched
  
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

  // ==========================================
  // ERROR STATE COMPONENT
  // ==========================================
  // Displays error message when service is not found
  
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

  // ==========================================
  // MAIN SERVICE DETAILS UI
  // ==========================================
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* ==========================================
            HEADER IMAGE SECTION
            ==========================================
            - Full-width service image
            - Back button overlay */}
        
        <View style={styles.imageContainer}>
          <Image source={service.image} style={styles.headerImage} resizeMode="cover" />
          
          {/* Navigation Back Button */}
          <TouchableOpacity style={styles.backIconButton} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* ==========================================
            SERVICE INFORMATION SECTION
            ==========================================
            - Service name and rating
            - Location and schedule info
            - Description and amenities
            - Services and pricing */}
        
        <View style={styles.contentContainer}>
          
          {/* Service Name and Rating Display */}
          <View style={styles.headerInfo}>
            <View style={styles.serviceInfoRow}>
              <View style={styles.serviceNameContainer}>
                <Text style={styles.serviceName}>{service.name}</Text>
                <View style={styles.ratingContainer}>
                  <MaterialIcons name="star" size={16} color="#EDAE49" />
                  <Text style={styles.ratingText}>{service.rating}</Text>
                  <Text style={styles.reviewText}>({service.reviewCount} Reviews)</Text>
                </View>
              </View>
              
              {/* Bookmark Button - Upper Right */}
              <TouchableOpacity style={styles.bookmarkButton} onPress={handleBookmarkToggle}>
                <Ionicons 
                  name={service && isSaved(service.id) ? "bookmark" : "bookmark-outline"} 
                  size={24} 
                  color={service && isSaved(service.id) ? "#EDAE49" : "#666"} 
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Location Information */}
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={16} color="#666" />
            <Text style={styles.infoText}>{service.location}</Text>
          </View>

          {/* Operating Hours for Today */}
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

          {/* About Us Section - Service Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About Us</Text>
            <Text style={styles.description}>{service.description}</Text>
          </View>

          {/* We Offer Section - Available Amenities */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>We Offer:</Text>
            {service.amenities.map((amenity, index) => (
              <View key={index} style={styles.amenityItem}>
                <Text style={styles.amenityBullet}>•</Text>
                <Text style={styles.amenityText}>{amenity}</Text>
              </View>
            ))}
          </View>

          {/* Divider Line */}
          <View style={styles.dividerLine} />

          {/* Services Section - Available Services and Pricing */}
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

          {/* ==========================================
              GALLERY SECTION
              ==========================================
              - Horizontal scrollable image gallery
              - Shows multiple service images */}
          
          {service.gallery && service.gallery.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Gallery</Text>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                style={styles.galleryScrollView}
              >
                {service.gallery.map((image, index) => (
                  <TouchableOpacity key={image.id} style={styles.galleryImageContainer}>
                    <Image source={image.url} style={styles.galleryImage} resizeMode="cover" />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {/* ==========================================
              CUSTOMER REVIEWS SECTION
              ==========================================
              - Customer review cards
              - User avatars, names, ratings
              - Review comments and dates */}
          
          {service.reviews && service.reviews.length > 0 && (
            <View style={styles.section}>
              <View style={styles.reviewsHeader}>
                <Text style={styles.sectionTitle}>Customer Reviews</Text>
                <TouchableOpacity>
                  <Text style={styles.viewMoreText}>View More</Text>
                </TouchableOpacity>
              </View>
              
              {/* Individual Review Cards */}
              {service.reviews.slice(0, 2).map((review, index) => (
                <View key={review.id} style={styles.reviewItem}>
                  <View style={styles.reviewHeader}>
                    <View style={styles.reviewUserInfo}>
                      {review.userAvatar && (
                        <Image source={review.userAvatar} style={styles.userAvatar} />
                      )}
                      <View style={styles.userDetails}>
                        <Text style={styles.userName}>{review.userName}</Text>
                        <View style={styles.ratingStars}>
                          {[...Array(5)].map((_, starIndex) => (
                            <MaterialIcons
                              key={starIndex}
                              name="star"
                              size={12}
                              color={starIndex < review.rating ? "#EDAE49" : "#E0E0E0"}
                            />
                          ))}
                        </View>
                      </View>
                    </View>
                    <Text style={styles.reviewDate}>
                      {review.date.toLocaleDateString('en-US', { 
                        month: '2-digit', 
                        day: '2-digit', 
                        year: '2-digit' 
                      })}
                    </Text>
                  </View>
                  <Text style={styles.reviewComment}>{review.comment}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* ==========================================
          BOOKING BUTTON SECTION
          ==========================================
          - Fixed bottom booking button
          - Navigates to booking flow */}
      
      <View style={styles.bookingContainer}>
        <TouchableOpacity style={styles.bookButton} onPress={handleBookAppointment}>
          <Text style={styles.bookButtonText}>Book an Appointment</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// ==========================================
// STYLESHEET DEFINITIONS
// ==========================================
// Comprehensive styles for all UI components in the service details page
// Organized by section: layout, components, states, and interactive elements

const styles = StyleSheet.create({
  
  // ==========================================
  // MAIN LAYOUT STYLES
  // ==========================================
  
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  
  // ==========================================
  // LOADING & ERROR STATES
  // ==========================================
  
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
  
  // ==========================================
  // HEADER IMAGE SECTION STYLES
  // ==========================================
  
  imageContainer: {
    position: 'relative',
    height: 250,
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
  
  // ==========================================
  // FLOATING ACTION BUTTONS
  // ==========================================
  
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
  
  // ==========================================
  // CONTENT CONTAINER & SECTIONS
  // ==========================================
  
  contentContainer: {
    padding: 20,
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
  
  // ==========================================
  // SERVICE HEADER INFO STYLES
  // ==========================================
  
  headerInfo: {
    marginBottom: 15,
  },
  serviceInfoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  serviceNameContainer: {
    flex: 1,
    paddingRight: 10,
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
  bookmarkButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
    marginLeft: 10,
    marginTop: 5,
  },
  
  // ==========================================
  // INFORMATION ROW STYLES
  // ==========================================
  
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
  
  // ==========================================
  // DESCRIPTION & AMENITIES STYLES
  // ==========================================
  
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
  
  // ==========================================
  // DIVIDER LINE STYLES
  // ==========================================
  
  dividerLine: {
    height: 1,
    backgroundColor: '#EDAE49',
    marginVertical: 20,
    width: '100%',
  },
  
  // ==========================================
  // SERVICES & PRICING STYLES
  // ==========================================
  
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
  
  // ==========================================
  // BOOKING BUTTON STYLES
  // ==========================================
  
  bookingContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  bookButton: {
    backgroundColor: '#EDAE49',
    paddingVertical: 15,
    borderRadius: 9,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginBottom: '10%',
  },
  bookButtonText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  
  // ==========================================
  // GALLERY SECTION STYLES
  // ==========================================
  
  galleryScrollView: {
    marginTop: 10,
  },
  galleryImageContainer: {
    marginRight: 10,
    borderRadius: 8,
    overflow: 'hidden',
  },
  galleryImage: {
    width: 120,
    height: 90,
    borderRadius: 8,
  },
  
  // ==========================================
  // CUSTOMER REVIEWS SECTION STYLES
  // ==========================================
  
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  viewMoreText: {
    color: '#EDAE49',
    fontSize: 14,
    fontWeight: '600',
  },
  reviewItem: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  reviewUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  ratingStars: {
    flexDirection: 'row',
  },
  reviewDate: {
    fontSize: 12,
    color: '#888',
  },
  reviewComment: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});
