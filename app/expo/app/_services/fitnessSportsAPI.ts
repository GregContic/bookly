import { BookingSlot, Service, ServiceCategory } from '../_types/interfaces';

/**
 * Fitness & Sports Service Data
 * Simulates database records with realistic data
 */
const fitnessSportsData: Service[] = [
  {
    id: 'fs_001',
    name: 'Apex Performance Gym',
    category: 'fitness-sports' as ServiceCategory,
    subcategory: 'gym-fitness',
    image: require('../../assets/images/apex-gym.png'),
    rating: 4.9,
    reviewCount: 267,
    description: 'State-of-the-art fitness facility with modern equipment, personal training, and group fitness classes. Professional trainers and comprehensive workout programs.',
    shortDescription: 'Strength, Cardio, Group Classes',
    location: 'Session Road, Baguio City',
    address: '123 Session Road, Baguio City, Benguet',
    phone: '+63 917 123 4567',
    email: 'info@apexgym.com',
    website: 'https://apexperformance.com',
    schedule: {
      monday: { open: '05:00', close: '23:00', isOpen: true },
      tuesday: { open: '05:00', close: '23:00', isOpen: true },
      wednesday: { open: '05:00', close: '23:00', isOpen: true },
      thursday: { open: '05:00', close: '23:00', isOpen: true },
      friday: { open: '05:00', close: '23:00', isOpen: true },
      saturday: { open: '06:00', close: '22:00', isOpen: true },
      sunday: { open: '06:00', close: '22:00', isOpen: true },
    },
    priceRange: { min: 900, max: 3500, currency: 'PHP' },
    services: [
      { name: 'Day Pass', price: 150, duration: 480 },
      { name: 'Monthly Membership', price: 1500, duration: 43200 },
      { name: 'Personal Training Session', price: 800, duration: 60 },
      { name: 'Group Fitness Class', price: 200, duration: 45 },
    ],
    amenities: ['WiFi', 'Air Conditioning', 'Parking', 'Card Payment', 'Showers', 'Lockers', 'Towel Service'],
    isPromo: true,
    promoText: 'First month 50% off',
    isFeatured: true,
    isVerified: true,
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-06-18'),
  },
  {
    id: 'fs_002',
    name: 'Altitude Gym',
    category: 'fitness-sports' as ServiceCategory,
    subcategory: 'gym-fitness',
    image: require('../../assets/images/altitude.png'),
    rating: 4.7,
    reviewCount: 189,
    description: 'High-altitude training facility specializing in strength training and conditioning. Expert coaching and personalized fitness programs.',
    shortDescription: 'Strength Training, Conditioning, Personal Coaching',
    location: 'Upper Session Road, Baguio City',
    address: '456 Upper Session Road, Baguio City, Benguet',
    phone: '+63 917 234 5678',
    email: 'train@altitudegym.com',
    website: 'https://altitude-gym.com',
    schedule: {
      monday: { open: '06:00', close: '22:00', isOpen: true },
      tuesday: { open: '06:00', close: '22:00', isOpen: true },
      wednesday: { open: '06:00', close: '22:00', isOpen: true },
      thursday: { open: '06:00', close: '22:00', isOpen: true },
      friday: { open: '06:00', close: '22:00', isOpen: true },
      saturday: { open: '07:00', close: '21:00', isOpen: true },
      sunday: { open: '07:00', close: '21:00', isOpen: true },
    },
    priceRange: { min: 1200, max: 4000, currency: 'PHP' },
    services: [
      { name: 'Monthly Membership', price: 1800, duration: 43200 },
      { name: 'Personal Training', price: 1000, duration: 60 },
      { name: 'Group Training', price: 400, duration: 60 },
      { name: 'Nutrition Consultation', price: 800, duration: 45 },
    ],
    amenities: ['WiFi', 'Air Conditioning', 'Parking', 'Card Payment', 'Professional Equipment'],
    isPromo: false,
    isFeatured: true,
    isVerified: true,
    createdAt: new Date('2024-02-12'),
    updatedAt: new Date('2024-06-15'),
  },
  {
    id: 'fs_003',
    name: 'Peak Performance Gym',
    category: 'fitness-sports' as ServiceCategory,
    subcategory: 'gym-fitness',
    image: require('../../assets/images/peak-performance.png'),
    rating: 4.8,
    reviewCount: 145,
    description: 'Complete fitness center with cardio equipment, weight training, and specialized sports programs. Professional athletes training facility.',
    shortDescription: 'Cardio, Weight Training, Sports Programs',
    location: 'Magsaysay Avenue, Baguio City',
    address: '789 Magsaysay Avenue, Baguio City, Benguet',
    phone: '+63 917 345 6789',
    email: 'peak@performance.com',
    website: 'https://peakperformance.com',
    schedule: {
      monday: { open: '05:30', close: '22:30', isOpen: true },
      tuesday: { open: '05:30', close: '22:30', isOpen: true },
      wednesday: { open: '05:30', close: '22:30', isOpen: true },
      thursday: { open: '05:30', close: '22:30', isOpen: true },
      friday: { open: '05:30', close: '22:30', isOpen: true },
      saturday: { open: '06:00', close: '21:00', isOpen: true },
      sunday: { open: '06:00', close: '21:00', isOpen: true },
    },
    priceRange: { min: 1000, max: 3200, currency: 'PHP' },
    services: [
      { name: 'Gym Membership', price: 1200, duration: 43200 },
      { name: 'Sports Training', price: 1500, duration: 90 },
      { name: 'Fitness Assessment', price: 500, duration: 60 },
      { name: 'Recovery Session', price: 800, duration: 45 },
    ],
    amenities: ['WiFi', 'Air Conditioning', 'Parking', 'Card Payment', 'Sports Equipment', 'Recovery Room'],
    isPromo: true,
    promoText: 'Free fitness assessment with membership',
    isFeatured: false,
    isVerified: true,
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-06-10'),
  },
  {
    id: 'fs_004',
    name: 'Pulse Fitness Studio',
    category: 'fitness-sports' as ServiceCategory,
    subcategory: 'gym-fitness',
    image: require('../../assets/images/pulse.png'),
    rating: 4.6,
    reviewCount: 156,
    description: 'Modern boutique fitness studio offering high-intensity interval training, functional fitness, and personal coaching in a motivating environment.',
    shortDescription: 'HIIT, Functional Training, Personal Coaching',
    location: 'Gibraltar Road, Baguio City',
    address: '987 Gibraltar Road, Baguio City, Benguet',
    phone: '+63 917 456 7890',
    email: 'pulse@fitness.com',
    website: 'https://pulsefitness.com',
    schedule: {
      monday: { open: '06:00', close: '21:00', isOpen: true },
      tuesday: { open: '06:00', close: '21:00', isOpen: true },
      wednesday: { open: '06:00', close: '21:00', isOpen: true },
      thursday: { open: '06:00', close: '21:00', isOpen: true },
      friday: { open: '06:00', close: '21:00', isOpen: true },
      saturday: { open: '07:00', close: '20:00', isOpen: true },
      sunday: { open: '08:00', close: '19:00', isOpen: true },
    },
    priceRange: { min: 800, max: 2800, currency: 'PHP' },
    services: [
      { name: 'Monthly Unlimited', price: 2200, duration: 43200 },
      { name: 'Drop-in Class', price: 250, duration: 45 },
      { name: 'Personal Training', price: 1200, duration: 60 },
      { name: '10-Class Package', price: 2000, duration: 0 },
    ],
    amenities: ['WiFi', 'Air Conditioning', 'Parking', 'Card Payment', 'Specialized Equipment', 'Changing Rooms'],
    isPromo: true,
    promoText: 'First week free trial',
    isFeatured: false,
    isVerified: true,
    createdAt: new Date('2024-03-15'),
    updatedAt: new Date('2024-06-14'),
  },
  {
    id: 'fs_005',
    name: 'Zen Yoga Studio',
    category: 'fitness-sports' as ServiceCategory,
    subcategory: 'yoga-pilates',
    image: require('../../assets/images/zenyoga.png'),
    rating: 4.9,
    reviewCount: 198,
    description: 'Peaceful yoga and pilates studio offering various styles of yoga, meditation, and mindfulness programs. Experienced certified instructors.',
    shortDescription: 'Yoga, Pilates, Meditation, Mindfulness',
    location: 'Burnham Park Area, Baguio City',
    address: '321 Burnham Park Area, Baguio City, Benguet',
    phone: '+63 917 567 8901',
    email: 'flow@zenflow.com',
    website: 'https://zenflow-studio.com',
    schedule: {
      monday: { open: '06:00', close: '21:00', isOpen: true },
      tuesday: { open: '06:00', close: '21:00', isOpen: true },
      wednesday: { open: '06:00', close: '21:00', isOpen: true },
      thursday: { open: '06:00', close: '21:00', isOpen: true },
      friday: { open: '06:00', close: '21:00', isOpen: true },
      saturday: { open: '07:00', close: '20:00', isOpen: true },
      sunday: { open: '07:00', close: '20:00', isOpen: true },
    },
    priceRange: { min: 250, max: 2500, currency: 'PHP' },
    services: [
      { name: 'Drop-in Yoga Class', price: 350, duration: 75 },
      { name: 'Private Yoga Session', price: 2000, duration: 60 },
      { name: 'Pilates Class', price: 400, duration: 60 },
      { name: 'Meditation Workshop', price: 800, duration: 120 },
    ],
    amenities: ['WiFi', 'Air Conditioning', 'Yoga Props', 'Changing Rooms', 'Card Payment', 'Meditation Space'],
    isPromo: true,
    promoText: 'Unlimited classes for ₱2,500/month',
    isFeatured: true,
    isVerified: true,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-06-16'),
  },
  {
    id: 'fs_006',
    name: 'Serene Scape Wellness',
    category: 'fitness-sports' as ServiceCategory,
    subcategory: 'yoga-pilates',
    image: require('../../assets/images/serenescape.png'),
    rating: 4.7,
    reviewCount: 132,
    description: 'Holistic wellness center combining yoga, pilates, and therapeutic movement practices. Focus on mind-body connection and stress relief.',
    shortDescription: 'Holistic Yoga, Therapeutic Movement, Wellness',
    location: 'Teacher\'s Camp, Baguio City',
    address: '555 Teacher\'s Camp, Baguio City, Benguet',
    phone: '+63 917 678 9012',
    email: 'wellness@serenescape.com',
    website: 'https://serenescape.com',
    schedule: {
      monday: { open: '07:00', close: '20:00', isOpen: true },
      tuesday: { open: '07:00', close: '20:00', isOpen: true },
      wednesday: { open: '07:00', close: '20:00', isOpen: true },
      thursday: { open: '07:00', close: '20:00', isOpen: true },
      friday: { open: '07:00', close: '20:00', isOpen: true },
      saturday: { open: '08:00', close: '19:00', isOpen: true },
      sunday: { open: '08:00', close: '19:00', isOpen: true },
    },
    priceRange: { min: 300, max: 2200, currency: 'PHP' },
    services: [
      { name: 'Hatha Yoga', price: 300, duration: 60 },
      { name: 'Pilates Mat Class', price: 350, duration: 55 },
      { name: 'Restorative Yoga', price: 400, duration: 75 },
      { name: 'Private Wellness Session', price: 1800, duration: 90 },
    ],
    amenities: ['WiFi', 'Natural Lighting', 'Yoga Props', 'Herbal Tea', 'Card Payment', 'Quiet Space'],
    isPromo: false,
    isFeatured: true,
    isVerified: true,
    createdAt: new Date('2024-02-05'),
    updatedAt: new Date('2024-06-11'),
  },
  {
    id: 'fs_007',
    name: 'Elevate Dance Academy',
    category: 'fitness-sports' as ServiceCategory,
    subcategory: 'dance-fitness',
    image: require('../../assets/images/elevate.png'),
    rating: 4.6,
    reviewCount: 87,
    description: 'Professional dance academy offering various dance styles and fitness dance classes. Experienced instructors and performance opportunities.',
    shortDescription: 'Dance Classes, Fitness Dance, Performance Training',
    location: 'Camp 7, Baguio City',
    address: '654 Camp 7, Baguio City, Benguet',
    phone: '+63 917 789 0123',
    email: 'dance@elevate.com',
    website: 'https://elevate-dance.com',
    schedule: {
      monday: { open: '15:00', close: '21:00', isOpen: true },
      tuesday: { open: '15:00', close: '21:00', isOpen: true },
      wednesday: { open: '15:00', close: '21:00', isOpen: true },
      thursday: { open: '15:00', close: '21:00', isOpen: true },
      friday: { open: '15:00', close: '21:00', isOpen: true },
      saturday: { open: '09:00', close: '18:00', isOpen: true },
      sunday: { open: '09:00', close: '18:00', isOpen: true },
    },
    priceRange: { min: 300, max: 1800, currency: 'PHP' },
    services: [
      { name: 'Group Dance Class', price: 400, duration: 60 },
      { name: 'Private Dance Lesson', price: 1500, duration: 60 },
      { name: 'Fitness Dance Class', price: 300, duration: 45 },
      { name: 'Choreography Session', price: 1800, duration: 90 },
    ],
    amenities: ['WiFi', 'Air Conditioning', 'Mirror Studios', 'Sound System', 'Card Payment', 'Changing Rooms'],
    isPromo: false,
    isFeatured: false,
    isVerified: true,
    createdAt: new Date('2024-02-28'),
    updatedAt: new Date('2024-06-12'),
  },
  {
    id: 'fs_008',
    name: 'Harmony Dance Studio',
    category: 'fitness-sports' as ServiceCategory,
    subcategory: 'dance-fitness',
    image: require('../../assets/images/harmony.png'),
    rating: 4.5,
    reviewCount: 94,
    description: 'Contemporary dance studio specializing in modern dance, jazz, and dance fitness programs. Creative movement and artistic expression.',
    shortDescription: 'Modern Dance, Jazz, Creative Movement',
    location: 'La Trinidad, Benguet',
    address: '777 La Trinidad, Benguet',
    phone: '+63 917 890 1234',
    email: 'info@harmonydance.com',
    website: 'https://harmony-dance.com',
    schedule: {
      monday: { open: '16:00', close: '21:00', isOpen: true },
      tuesday: { open: '16:00', close: '21:00', isOpen: true },
      wednesday: { open: '16:00', close: '21:00', isOpen: true },
      thursday: { open: '16:00', close: '21:00', isOpen: true },
      friday: { open: '16:00', close: '21:00', isOpen: true },
      saturday: { open: '10:00', close: '17:00', isOpen: true },
      sunday: { open: '10:00', close: '17:00', isOpen: true },
    },
    priceRange: { min: 350, max: 2000, currency: 'PHP' },
    services: [
      { name: 'Contemporary Dance', price: 450, duration: 75 },
      { name: 'Jazz Dance Class', price: 400, duration: 60 },
      { name: 'Dance Cardio', price: 350, duration: 45 },
      { name: 'Private Coaching', price: 1600, duration: 60 },
    ],
    amenities: ['WiFi', 'Air Conditioning', 'Professional Mirrors', 'Sound Equipment', 'Card Payment'],
    isPromo: true,
    promoText: 'First class free for new students',
    isFeatured: false,
    isVerified: true,
    createdAt: new Date('2024-03-20'),
    updatedAt: new Date('2024-06-08'),
  },
  {
    id: 'fs_009',
    name: 'Baguio Martial Arts Academy',
    category: 'fitness-sports' as ServiceCategory,
    subcategory: 'martial-arts',
    image: require('../../assets/images/placeholder_muscle.png'),
    rating: 4.8,
    reviewCount: 167,
    description: 'Traditional martial arts academy offering karate, taekwondo, and mixed martial arts training. Experienced black belt instructors and competition preparation.',
    shortDescription: 'Karate, Taekwondo, MMA, Self-Defense',
    location: 'Military Cut-off, Baguio City',
    address: '888 Military Cut-off, Baguio City, Benguet',
    phone: '+63 917 901 2345',
    email: 'train@baguiomartialarts.com',
    website: 'https://baguio-martialarts.com',
    schedule: {
      monday: { open: '17:00', close: '21:00', isOpen: true },
      tuesday: { open: '17:00', close: '21:00', isOpen: true },
      wednesday: { open: '17:00', close: '21:00', isOpen: true },
      thursday: { open: '17:00', close: '21:00', isOpen: true },
      friday: { open: '17:00', close: '21:00', isOpen: true },
      saturday: { open: '09:00', close: '12:00', isOpen: true },
      sunday: { open: '09:00', close: '12:00', isOpen: true },
    },
    priceRange: { min: 800, max: 3000, currency: 'PHP' },
    services: [
      { name: 'Monthly Training', price: 2000, duration: 43200 },
      { name: 'Private Lessons', price: 1500, duration: 60 },
      { name: 'Self-Defense Class', price: 800, duration: 90 },
      { name: 'Competition Prep', price: 2500, duration: 120 },
    ],
    amenities: ['WiFi', 'Training Mats', 'Equipment', 'Changing Rooms', 'Card Payment', 'Safety Gear'],
    isPromo: true,
    promoText: 'First month 30% off for beginners',
    isFeatured: true,
    isVerified: true,
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-06-17'),
  },
  {
    id: 'fs_010',
    name: 'Dragon Fist Martial Arts',
    category: 'fitness-sports' as ServiceCategory,
    subcategory: 'martial-arts',
    image: require('../../assets/images/placeholder_muscle.png'),
    rating: 4.7,
    reviewCount: 123,
    description: 'Traditional kung fu and modern martial arts training center. Ancient techniques combined with modern fitness approaches.',
    shortDescription: 'Kung Fu, Wing Chun, Traditional Forms',
    location: 'Bakakeng, Baguio City',
    address: '999 Bakakeng, Baguio City, Benguet',
    phone: '+63 918 012 3456',
    email: 'master@dragonfist.com',
    website: 'https://dragonfist-ma.com',
    schedule: {
      monday: { open: '18:00', close: '21:00', isOpen: true },
      tuesday: { open: '18:00', close: '21:00', isOpen: true },
      wednesday: { open: '18:00', close: '21:00', isOpen: true },
      thursday: { open: '18:00', close: '21:00', isOpen: true },
      friday: { open: '18:00', close: '21:00', isOpen: true },
      saturday: { open: '08:00', close: '11:00', isOpen: true },
      sunday: { open: '08:00', close: '11:00', isOpen: true },
    },
    priceRange: { min: 1200, max: 2800, currency: 'PHP' },
    services: [
      { name: 'Kung Fu Classes', price: 1800, duration: 43200 },
      { name: 'Wing Chun Training', price: 2000, duration: 43200 },
      { name: 'Forms Practice', price: 300, duration: 90 },
      { name: 'Sparring Session', price: 500, duration: 60 },
    ],
    amenities: ['Traditional Equipment', 'Training Weapons', 'Meditation Space', 'Card Payment'],
    isPromo: false,
    isFeatured: false,
    isVerified: true,
    createdAt: new Date('2024-02-18'),
    updatedAt: new Date('2024-06-13'),
  },
  {
    id: 'fs_011',
    name: 'Baguio Swimming Academy',
    category: 'fitness-sports' as ServiceCategory,
    subcategory: 'swimming',
    image: require('../../assets/images/placeholder_house.png'),
    rating: 4.6,
    reviewCount: 89,
    description: 'Professional swimming lessons and aquatic fitness programs. Certified instructors for all ages and skill levels from beginners to competitive swimmers.',
    shortDescription: 'Swimming Lessons, Aqua Fitness, Competitive Training',
    location: 'Country Club Village, Baguio City',
    address: '123 Country Club Village, Baguio City, Benguet',
    phone: '+63 918 123 4567',
    email: 'swim@baguioacademy.com',
    website: 'https://baguio-swimming.com',
    schedule: {
      monday: { open: '06:00', close: '20:00', isOpen: true },
      tuesday: { open: '06:00', close: '20:00', isOpen: true },
      wednesday: { open: '06:00', close: '20:00', isOpen: true },
      thursday: { open: '06:00', close: '20:00', isOpen: true },
      friday: { open: '06:00', close: '20:00', isOpen: true },
      saturday: { open: '07:00', close: '19:00', isOpen: true },
      sunday: { open: '07:00', close: '19:00', isOpen: true },
    },
    priceRange: { min: 500, max: 3500, currency: 'PHP' },
    services: [
      { name: 'Adult Swimming Lessons', price: 1200, duration: 60 },
      { name: 'Kids Swimming Class', price: 900, duration: 45 },
      { name: 'Aqua Fitness', price: 350, duration: 45 },
      { name: 'Competitive Training', price: 2500, duration: 90 },
    ],
    amenities: ['Pool', 'Changing Rooms', 'Showers', 'Lockers', 'Swimming Equipment', 'Card Payment'],
    isPromo: true,
    promoText: '10% off first month of lessons',
    isFeatured: true,
    isVerified: true,
    createdAt: new Date('2024-03-05'),
    updatedAt: new Date('2024-06-15'),
  },
  {
    id: 'fs_012',
    name: 'Mountain View Tennis Club',
    category: 'fitness-sports' as ServiceCategory,
    subcategory: 'racket-sports',
    image: require('../../assets/images/placeholder_house.png'),
    rating: 4.5,
    reviewCount: 76,
    description: 'Premier tennis facility with professional courts and experienced coaches. Tennis lessons, court rentals, and tournament preparation.',
    shortDescription: 'Tennis Lessons, Court Rental, Tournaments',
    location: 'Scout Barrio, Baguio City',
    address: '456 Scout Barrio, Baguio City, Benguet',
    phone: '+63 918 234 5678',
    email: 'play@mountainviewtennis.com',
    website: 'https://mvtennis.com',
    schedule: {
      monday: { open: '06:00', close: '19:00', isOpen: true },
      tuesday: { open: '06:00', close: '19:00', isOpen: true },
      wednesday: { open: '06:00', close: '19:00', isOpen: true },
      thursday: { open: '06:00', close: '19:00', isOpen: true },
      friday: { open: '06:00', close: '19:00', isOpen: true },
      saturday: { open: '07:00', close: '18:00', isOpen: true },
      sunday: { open: '07:00', close: '18:00', isOpen: true },
    },
    priceRange: { min: 400, max: 2500, currency: 'PHP' },
    services: [
      { name: 'Court Rental (1 hour)', price: 600, duration: 60 },
      { name: 'Private Tennis Lesson', price: 1500, duration: 60 },
      { name: 'Group Tennis Class', price: 800, duration: 90 },
      { name: 'Tournament Coaching', price: 2000, duration: 120 },
    ],
    amenities: ['Professional Courts', 'Equipment Rental', 'Parking', 'Clubhouse', 'Card Payment', 'Pro Shop'],
    isPromo: false,
    isFeatured: false,
    isVerified: true,
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-06-09'),
  },
  {
    id: 'fs_013',
    name: 'Badminton Central',
    category: 'fitness-sports' as ServiceCategory,
    subcategory: 'racket-sports',
    image: require('../../assets/images/placeholder_house.png'),
    rating: 4.4,
    reviewCount: 112,
    description: 'Modern badminton facility with multiple courts and professional coaching. Court rentals, lessons, and league play available.',
    shortDescription: 'Badminton Courts, Lessons, League Play',
    location: 'Abanao Street, Baguio City',
    address: '789 Abanao Street, Baguio City, Benguet',
    phone: '+63 918 345 6789',
    email: 'court@badmintoncentral.com',
    website: 'https://badminton-central.com',
    schedule: {
      monday: { open: '07:00', close: '22:00', isOpen: true },
      tuesday: { open: '07:00', close: '22:00', isOpen: true },
      wednesday: { open: '07:00', close: '22:00', isOpen: true },
      thursday: { open: '07:00', close: '22:00', isOpen: true },
      friday: { open: '07:00', close: '22:00', isOpen: true },
      saturday: { open: '08:00', close: '21:00', isOpen: true },
      sunday: { open: '08:00', close: '21:00', isOpen: true },
    },
    priceRange: { min: 200, max: 1800, currency: 'PHP' },
    services: [
      { name: 'Court Rental (1 hour)', price: 300, duration: 60 },
      { name: 'Beginner Lessons', price: 800, duration: 60 },
      { name: 'Advanced Coaching', price: 1200, duration: 60 },
      { name: 'Equipment Rental', price: 100, duration: 60 },
    ],
    amenities: ['Multiple Courts', 'Equipment Rental', 'Air Conditioning', 'Parking', 'Card Payment', 'Snack Bar'],
    isPromo: true,
    promoText: 'Student discount 20% off court rental',
    isFeatured: false,
    isVerified: true,
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-06-12'),
  },
  {
    id: 'fs_014',
    name: 'Mountain Hiking Adventures',
    category: 'fitness-sports' as ServiceCategory,
    subcategory: 'outdoor-sports',
    image: require('../../assets/images/placeholder_house.png'),
    rating: 4.9,
    reviewCount: 145,
    description: 'Guided hiking and trekking adventures in the beautiful mountains of Benguet. Professional guides and outdoor fitness programs.',
    shortDescription: 'Guided Hikes, Trekking, Mountain Adventures',
    location: 'Camp John Hay, Baguio City',
    address: '321 Camp John Hay, Baguio City, Benguet',
    phone: '+63 918 456 7890',
    email: 'adventure@mountainhiking.com',
    website: 'https://mountain-adventures.com',
    schedule: {
      monday: { open: '05:00', close: '18:00', isOpen: true },
      tuesday: { open: '05:00', close: '18:00', isOpen: true },
      wednesday: { open: '05:00', close: '18:00', isOpen: true },
      thursday: { open: '05:00', close: '18:00', isOpen: true },
      friday: { open: '05:00', close: '18:00', isOpen: true },
      saturday: { open: '04:00', close: '19:00', isOpen: true },
      sunday: { open: '04:00', close: '19:00', isOpen: true },
    },
    priceRange: { min: 800, max: 4500, currency: 'PHP' },
    services: [
      { name: 'Day Hike Tour', price: 1500, duration: 480 },
      { name: 'Sunrise Hike', price: 1200, duration: 300 },
      { name: 'Multi-day Trek', price: 4000, duration: 1440 },
      { name: 'Fitness Hiking', price: 800, duration: 180 },
    ],
    amenities: ['Professional Guides', 'Safety Equipment', 'Transportation', 'Refreshments', 'Insurance Coverage'],
    isPromo: true,
    promoText: 'Group of 4+ gets 15% discount',
    isFeatured: true,
    isVerified: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-06-18'),
  },
  {
    id: 'fs_015',
    name: 'Cycling Baguio',
    category: 'fitness-sports' as ServiceCategory,
    subcategory: 'outdoor-sports',
    image: require('../../assets/images/placeholder_house.png'),
    rating: 4.6,
    reviewCount: 98,
    description: 'Cycling tours and bike rentals exploring the scenic routes of Baguio. Mountain biking, road cycling, and fitness cycling programs.',
    shortDescription: 'Bike Tours, Rentals, Mountain Biking',
    location: 'Burnham Park, Baguio City',
    address: '654 Burnham Park, Baguio City, Benguet',
    phone: '+63 918 567 8901',
    email: 'ride@cyclingbaguio.com',
    website: 'https://cycling-baguio.com',
    schedule: {
      monday: { open: '06:00', close: '18:00', isOpen: true },
      tuesday: { open: '06:00', close: '18:00', isOpen: true },
      wednesday: { open: '06:00', close: '18:00', isOpen: true },
      thursday: { open: '06:00', close: '18:00', isOpen: true },
      friday: { open: '06:00', close: '18:00', isOpen: true },
      saturday: { open: '05:00', close: '19:00', isOpen: true },
      sunday: { open: '05:00', close: '19:00', isOpen: true },
    },
    priceRange: { min: 300, max: 2500, currency: 'PHP' },
    services: [
      { name: 'Bike Rental (Day)', price: 500, duration: 480 },
      { name: 'Guided City Tour', price: 1200, duration: 180 },
      { name: 'Mountain Bike Tour', price: 1800, duration: 300 },
      { name: 'Bike Maintenance', price: 300, duration: 60 },
    ],
    amenities: ['Quality Bikes', 'Safety Gear', 'Repair Service', 'Route Maps', 'Card Payment', 'Storage'],
    isPromo: false,
    isFeatured: false,
    isVerified: true,
    createdAt: new Date('2024-03-08'),
    updatedAt: new Date('2024-06-14'),
  },
  {
    id: 'fs_016',
    name: 'Shape Up Fitness Center',
    category: 'fitness-sports' as ServiceCategory,
    subcategory: 'gym-fitness',
    image: require('../../assets/images/shapeup_gym.png'),
    rating: 4.3,
    reviewCount: 134,
    description: 'Affordable community fitness center with basic equipment and group classes. Friendly environment for all fitness levels.',
    shortDescription: 'Community Gym, Group Classes, Affordable',
    location: 'Pacdal, Baguio City',
    address: '987 Pacdal, Baguio City, Benguet',
    phone: '+63 918 678 9012',
    email: 'fitness@shapeup.com',
    website: 'https://shapeup-gym.com',
    schedule: {
      monday: { open: '05:00', close: '22:00', isOpen: true },
      tuesday: { open: '05:00', close: '22:00', isOpen: true },
      wednesday: { open: '05:00', close: '22:00', isOpen: true },
      thursday: { open: '05:00', close: '22:00', isOpen: true },
      friday: { open: '05:00', close: '22:00', isOpen: true },
      saturday: { open: '06:00', close: '21:00', isOpen: true },
      sunday: { open: '06:00', close: '21:00', isOpen: true },
    },
    priceRange: { min: 500, max: 2000, currency: 'PHP' },
    services: [
      { name: 'Monthly Membership', price: 800, duration: 43200 },
      { name: 'Day Pass', price: 80, duration: 480 },
      { name: 'Zumba Class', price: 100, duration: 45 },
      { name: 'Basic Personal Training', price: 500, duration: 60 },
    ],
    amenities: ['Basic Equipment', 'Group Exercise Room', 'Parking', 'Showers', 'Lockers', 'Cash/Card Payment'],
    isPromo: true,
    promoText: 'Student rate ₱600/month',
    isFeatured: false,
    isVerified: true,
    createdAt: new Date('2024-04-01'),
    updatedAt: new Date('2024-06-16'),
  },
  {
    id: 'fs_017',
    name: 'CrossFit Cordillera',
    category: 'fitness-sports' as ServiceCategory,
    subcategory: 'specialty-fitness',
    image: require('../../assets/images/placeholder_muscle.png'),
    rating: 4.8,
    reviewCount: 156,
    description: 'High-intensity CrossFit training with certified coaches. Functional fitness, Olympic lifting, and metabolic conditioning.',
    shortDescription: 'CrossFit, Olympic Lifting, Functional Fitness',
    location: 'Legarda Road, Baguio City',
    address: '111 Legarda Road, Baguio City, Benguet',
    phone: '+63 918 789 0123',
    email: 'wod@crossfitcordillera.com',
    website: 'https://crossfit-cordillera.com',
    schedule: {
      monday: { open: '05:30', close: '21:00', isOpen: true },
      tuesday: { open: '05:30', close: '21:00', isOpen: true },
      wednesday: { open: '05:30', close: '21:00', isOpen: true },
      thursday: { open: '05:30', close: '21:00', isOpen: true },
      friday: { open: '05:30', close: '21:00', isOpen: true },
      saturday: { open: '07:00', close: '19:00', isOpen: true },
      sunday: { open: '08:00', close: '18:00', isOpen: true },
    },
    priceRange: { min: 1500, max: 4000, currency: 'PHP' },
    services: [
      { name: 'Unlimited Monthly', price: 3500, duration: 43200 },
      { name: 'Drop-in Class', price: 400, duration: 60 },
      { name: 'Personal Training', price: 1800, duration: 60 },
      { name: 'Foundations Course', price: 2500, duration: 0 },
    ],
    amenities: ['CrossFit Equipment', 'Olympic Bars', 'Specialized Flooring', 'Changing Rooms', 'Card Payment'],
    isPromo: false,
    isFeatured: true,
    isVerified: true,
    createdAt: new Date('2024-01-30'),
    updatedAt: new Date('2024-06-17'),
  },
  {
    id: 'fs_018',
    name: 'Barre Studio Baguio',
    category: 'fitness-sports' as ServiceCategory,
    subcategory: 'specialty-fitness',
    image: require('../../assets/images/placeholder_lotus.png'),
    rating: 4.7,
    reviewCount: 89,
    description: 'Ballet-inspired fitness classes combining barre work, pilates, and yoga. Low-impact, high-intensity workouts for strength and flexibility.',
    shortDescription: 'Barre Classes, Ballet Fitness, Flexibility',
    location: 'Aurora Hill, Baguio City',
    address: '222 Aurora Hill, Baguio City, Benguet',
    phone: '+63 918 890 1234',
    email: 'class@barrestudio.com',
    website: 'https://barre-baguio.com',
    schedule: {
      monday: { open: '06:00', close: '20:00', isOpen: true },
      tuesday: { open: '06:00', close: '20:00', isOpen: true },
      wednesday: { open: '06:00', close: '20:00', isOpen: true },
      thursday: { open: '06:00', close: '20:00', isOpen: true },
      friday: { open: '06:00', close: '20:00', isOpen: true },
      saturday: { open: '08:00', close: '18:00', isOpen: true },
      sunday: { open: '08:00', close: '18:00', isOpen: true },
    },
    priceRange: { min: 350, max: 2800, currency: 'PHP' },
    services: [
      { name: 'Barre Class', price: 450, duration: 55 },
      { name: 'Barre Sculpt', price: 500, duration: 60 },
      { name: 'Beginner Barre', price: 350, duration: 45 },
      { name: 'Private Session', price: 2200, duration: 60 },
    ],
    amenities: ['Ballet Barres', 'Mirrors', 'Props', 'Air Conditioning', 'Changing Room', 'Card Payment'],
    isPromo: true,
    promoText: 'New student package: 3 classes for ₱1,000',
    isFeatured: false,
    isVerified: true,
    createdAt: new Date('2024-03-12'),
    updatedAt: new Date('2024-06-10'),
  },
  {
    id: 'fs_019',
    name: 'Boxing Gym Baguio',
    category: 'fitness-sports' as ServiceCategory,
    subcategory: 'martial-arts',
    image: require('../../assets/images/placeholder_muscle.png'),
    rating: 4.6,
    reviewCount: 134,
    description: 'Traditional boxing gym with professional training equipment and experienced coaches. Boxing fitness, competitive training, and self-defense.',
    shortDescription: 'Boxing Training, Fitness Boxing, Competition Prep',
    location: 'Quirino Highway, Baguio City',
    address: '333 Quirino Highway, Baguio City, Benguet',
    phone: '+63 918 901 2345',
    email: 'fight@boxinggym.com',
    website: 'https://boxing-baguio.com',
    schedule: {
      monday: { open: '06:00', close: '21:00', isOpen: true },
      tuesday: { open: '06:00', close: '21:00', isOpen: true },
      wednesday: { open: '06:00', close: '21:00', isOpen: true },
      thursday: { open: '06:00', close: '21:00', isOpen: true },
      friday: { open: '06:00', close: '21:00', isOpen: true },
      saturday: { open: '08:00', close: '19:00', isOpen: true },
      sunday: { open: '08:00', close: '19:00', isOpen: true },
    },
    priceRange: { min: 800, max: 3500, currency: 'PHP' },
    services: [
      { name: 'Monthly Training', price: 2000, duration: 43200 },
      { name: 'Boxing Fitness Class', price: 300, duration: 60 },
      { name: 'Private Coaching', price: 1500, duration: 60 },
      { name: 'Sparring Session', price: 500, duration: 60 },
    ],
    amenities: ['Boxing Ring', 'Heavy Bags', 'Speed Bags', 'Gloves Available', 'Changing Rooms', 'Card Payment'],
    isPromo: true,
    promoText: 'First week training free',
    isFeatured: false,
    isVerified: true,
    createdAt: new Date('2024-02-22'),
    updatedAt: new Date('2024-06-13'),
  },
  {
    id: 'fs_020',
    name: 'Aqua Fitness Center',
    category: 'fitness-sports' as ServiceCategory,
    subcategory: 'swimming',
    image: require('../../assets/images/placeholder_house.png'),
    rating: 4.4,
    reviewCount: 67,
    description: 'Indoor aquatic center offering water aerobics, swim therapy, and recreational swimming. Heated pool and therapeutic programs.',
    shortDescription: 'Water Aerobics, Swim Therapy, Heated Pool',
    location: 'Dominican Hill, Baguio City',
    address: '444 Dominican Hill, Baguio City, Benguet',
    phone: '+63 919 012 3456',
    email: 'splash@aquafitness.com',
    website: 'https://aqua-fitness.com',
    schedule: {
      monday: { open: '06:00', close: '21:00', isOpen: true },
      tuesday: { open: '06:00', close: '21:00', isOpen: true },
      wednesday: { open: '06:00', close: '21:00', isOpen: true },
      thursday: { open: '06:00', close: '21:00', isOpen: true },
      friday: { open: '06:00', close: '21:00', isOpen: true },
      saturday: { open: '07:00', close: '20:00', isOpen: true },
      sunday: { open: '07:00', close: '20:00', isOpen: true },
    },
    priceRange: { min: 200, max: 2000, currency: 'PHP' },
    services: [
      { name: 'Pool Access', price: 200, duration: 120 },
      { name: 'Water Aerobics', price: 300, duration: 45 },
      { name: 'Swim Therapy', price: 800, duration: 60 },
      { name: 'Aqua Zumba', price: 250, duration: 45 },
    ],
    amenities: ['Heated Pool', 'Changing Rooms', 'Lockers', 'Pool Equipment', 'Therapy Area', 'Card Payment'],
    isPromo: false,
    isFeatured: false,
    isVerified: true,
    createdAt: new Date('2024-04-05'),
    updatedAt: new Date('2024-06-11'),
  },
];

/**
 * Fitness & Sports API Class
 * Simulates API calls with realistic delays
 */
export class FitnessSportsAPI {
  /**
   * Simulate network delay
   */
  private static delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Get all fitness & sports services
   */
  static async getAllServices(): Promise<Service[]> {
    await this.delay(800);
    return [...fitnessSportsData];
  }

  /**
   * Get featured services only
   */
  static async getFeaturedServices(): Promise<Service[]> {
    await this.delay(600);
    return fitnessSportsData.filter(service => service.isFeatured);
  }

  /**
   * Get services with promotional offers
   */
  static async getPromoServices(): Promise<Service[]> {
    await this.delay(500);
    return fitnessSportsData.filter(service => service.isPromo);
  }

  /**
   * Search services by name or description
   */
  static async searchServices(query: string): Promise<Service[]> {
    await this.delay(400);
    
    if (!query.trim()) {
      return [...fitnessSportsData];
    }

    const searchTerm = query.toLowerCase();
    return fitnessSportsData.filter(service => 
      service.name.toLowerCase().includes(searchTerm) ||
      service.description.toLowerCase().includes(searchTerm) ||
      service.shortDescription.toLowerCase().includes(searchTerm) ||
      service.location.toLowerCase().includes(searchTerm) ||
      service.subcategory.toLowerCase().includes(searchTerm)
    );
  }

  /**
   * Get service by ID
   */
  static async getServiceById(id: string): Promise<Service | null> {
    await this.delay(300);
    return fitnessSportsData.find(service => service.id === id) || null;
  }

  /**
   * Get services by subcategory
   */
  static async getServicesBySubcategory(subcategory: string): Promise<Service[]> {
    await this.delay(400);
    return fitnessSportsData.filter(service => service.subcategory === subcategory);
  }

  /**
   * Get available booking slots for a service
   */
  static async getAvailableSlots(serviceId: string, date: Date): Promise<BookingSlot[]> {
    await this.delay(600);
    
    const service = fitnessSportsData.find(s => s.id === serviceId);
    if (!service) {
      throw new Error('Service not found');
    }

    // Generate realistic available slots
    const slots: BookingSlot[] = [];
    const dayOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][date.getDay()];
    const schedule = service.schedule[dayOfWeek as keyof typeof service.schedule];

    if (schedule.isOpen) {
      const startHour = parseInt(schedule.open.split(':')[0]);
      const endHour = parseInt(schedule.close.split(':')[0]);
      
      // Generate hourly slots for fitness services
      for (let hour = startHour; hour < endHour; hour++) {
        if (Math.random() > 0.2) { // 80% chance slot is available
          slots.push({
            id: `${serviceId}_${hour}_00`,
            time: `${hour.toString().padStart(2, '0')}:00`,
            isAvailable: true,
            date: date,
          });
        }
      }
    }

    return slots;
  }

  /**
   * Get service statistics
   */
  static async getServiceStats(): Promise<{
    totalServices: number;
    averageRating: number;
    totalReviews: number;
    featuredCount: number;
    promoCount: number;
  }> {
    await this.delay(300);
    
    const totalServices = fitnessSportsData.length;
    const averageRating = fitnessSportsData.reduce((sum, service) => sum + service.rating, 0) / totalServices;
    const totalReviews = fitnessSportsData.reduce((sum, service) => sum + service.reviewCount, 0);
    const featuredCount = fitnessSportsData.filter(s => s.isFeatured).length;
    const promoCount = fitnessSportsData.filter(s => s.isPromo).length;

    return {
      totalServices,
      averageRating: Math.round(averageRating * 10) / 10,
      totalReviews,
      featuredCount,
      promoCount,
    };
  }
}

export default FitnessSportsAPI;
