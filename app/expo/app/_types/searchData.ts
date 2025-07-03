// Comprehensive search database containing all services from the app
export const allServices = [
  // Beauty & Personal Care Services
  {
    id: 'bpc_001',
    name: 'David Salon & Spa',
    category: 'Beauty & Personal Care',
    subcategory: 'Hair & Spa',
    image: require('../../assets/images/davidsalon.png'),
    rating: 4.9,
    reviews: 1238,
    description: 'Hair Styling, Coloring, Spa Treatments',
    location: 'Session Road, Baguio City',
    schedule: 'Monday - Sunday\n9:00 AM - 8:00 PM',
    price: '₱300 - ₱2,500',
    tags: ['hair', 'salon', 'spa', 'styling', 'coloring', 'david'],
    isPromo: true,
  },
  {
    id: 'bpc_002',
    name: 'Glow Haven Aesthetics',
    category: 'Beauty & Personal Care',
    subcategory: 'Skin Care',
    image: require('../../assets/images/glow-haven.png'),
    rating: 4.8,
    reviews: 987,
    description: 'Facial Treatments, Skin Care, Aesthetics',
    location: 'Magsaysay Ave, Baguio City',
    schedule: 'Tuesday - Saturday\n10:00 AM - 7:00 PM',
    price: '₱800 - ₱4,000',
    tags: ['facial', 'skincare', 'aesthetics', 'glow', 'beauty'],
    isPromo: false,
  },
  {
    id: 'bpc_003',
    name: 'Ink Haven Tattoo Studio',
    category: 'Beauty & Personal Care',
    subcategory: 'Body Art',
    image: require('../../assets/images/ink-haven.png'),
    rating: 4.7,
    reviews: 654,
    description: 'Custom Tattoos, Piercing, Body Art',
    location: 'Upper Session Road, Baguio City',
    schedule: 'Wednesday - Sunday\n12:00 PM - 9:00 PM',
    price: '₱1,500 - ₱8,000',
    tags: ['tattoo', 'piercing', 'ink', 'body art', 'custom'],
    isPromo: false,
  },
  {
    id: 'bpc_004',
    name: 'Harmony Beauty Clinic',
    category: 'Beauty & Personal Care',
    subcategory: 'Medical Aesthetics',
    image: require('../../assets/images/harmony.png'),
    rating: 4.6,
    reviews: 543,
    description: 'Dermatology, Laser Treatments, Botox',
    location: 'Governor Pack Road, Baguio City',
    schedule: 'Monday - Friday\n8:00 AM - 6:00 PM',
    price: '₱2,000 - ₱10,000',
    tags: ['dermatology', 'laser', 'botox', 'clinic', 'harmony'],
    isPromo: true,
  },
  {
    id: 'bpc_005',
    name: 'Fresh Nest Beauty Bar',
    category: 'Beauty & Personal Care',
    subcategory: 'Nail Care',
    image: require('../../assets/images/freshnest.png'),
    rating: 4.8,
    reviews: 876,
    description: 'Nail Care, Manicure, Pedicure, Lashes',
    location: 'Camp 7, Baguio City',
    schedule: 'Monday - Sunday\n10:00 AM - 9:00 PM',
    price: '₱200 - ₱1,200',
    tags: ['nails', 'manicure', 'pedicure', 'lashes', 'fresh'],
    isPromo: false,
  },
  {
    id: 'bpc_006',
    name: 'Smile Bright Dental Cosmetics',
    category: 'Beauty & Personal Care',
    subcategory: 'Dental Cosmetics',
    image: require('../../assets/images/smile-bright.png'),
    rating: 4.9,
    reviews: 1102,
    description: 'Teeth Whitening, Veneers, Cosmetic Dentistry',
    location: 'Burnham Park Area, Baguio City',
    schedule: 'Monday - Saturday\n8:00 AM - 6:00 PM',
    price: '₱1,500 - ₱15,000',
    tags: ['dental', 'teeth', 'whitening', 'veneers', 'smile'],
    isPromo: true,
  },

  // Health & Wellness Services
  {
    id: 'hw_001',
    name: 'Prime Care Medical Clinic',
    category: 'Health & Wellness',
    subcategory: 'Medical Care',
    image: require('../../assets/images/prime-care.png'),
    rating: 4.9,
    reviews: 1456,
    description: 'General Medicine, Laboratory, X-Ray',
    location: 'Session Road, Baguio City',
    schedule: 'Monday - Saturday\n8:00 AM - 5:00 PM',
    price: '₱500 - ₱2,000',
    tags: ['medical', 'clinic', 'laboratory', 'xray', 'prime'],
    isPromo: false,
  },
  {
    id: 'hw_002',
    name: 'Urban Smiles Dental',
    category: 'Health & Wellness',
    subcategory: 'Dental Care',
    image: require('../../assets/images/urban_smiles.png'),
    rating: 4.8,
    reviews: 980,
    description: 'Dental Care, Orthodontics, Cleaning',
    location: 'Magsaysay Ave, Baguio City',
    schedule: 'Monday - Friday\n9:00 AM - 6:00 PM',
    price: '₱800 - ₱3,500',
    tags: ['dental', 'orthodontics', 'cleaning', 'urban', 'smiles'],
    isPromo: true,
  },
  {
    id: 'hw_003',
    name: 'Serene Scape Wellness',
    category: 'Health & Wellness',
    subcategory: 'Mental Health',
    image: require('../../assets/images/serenescape.png'),
    rating: 4.7,
    reviews: 432,
    description: 'Therapy, Counseling, Mental Health',
    location: 'Upper Session Road, Baguio City',
    schedule: 'Monday - Sunday\n10:00 AM - 8:00 PM',
    price: '₱1,200 - ₱4,000',
    tags: ['therapy', 'counseling', 'mental health', 'serene', 'wellness'],
    isPromo: false,
  },
  {
    id: 'hw_004',
    name: 'Bright Eye Clinic',
    category: 'Health & Wellness',
    subcategory: 'Eye Care',
    image: require('../../assets/images/eye-clinic.png'),
    rating: 4.6,
    reviews: 765,
    description: 'Eye Checkup, Glasses, Contact Lenses',
    location: 'Governor Pack Road, Baguio City',
    schedule: 'Tuesday - Saturday\n8:30 AM - 5:30 PM',
    price: '₱600 - ₱2,500',
    tags: ['eye', 'glasses', 'contact lenses', 'checkup', 'vision'],
    isPromo: false,
  },
  {
    id: 'hw_006',
    name: 'The Spa Wellness Center',
    category: 'Health & Wellness',
    subcategory: 'Spa & Relaxation',
    image: require('../../assets/images/spa-wellness.png'),
    rating: 4.9,
    reviews: 1238,
    description: 'Massage, Spa Treatments, Relaxation',
    location: 'Burnham Park Area, Baguio City',
    schedule: 'Monday - Sunday\n9:00 AM - 10:00 PM',
    price: '₱800 - ₱3,500',
    tags: ['spa', 'massage', 'relaxation', 'wellness', 'treatments'],
    isPromo: false,
  },
  {
    id: 'hw_005',
    name: 'Zen Yoga Studio',
    category: 'Health & Wellness',
    subcategory: 'Fitness & Wellness',
    image: require('../../assets/images/zenyoga.png'),
    rating: 4.8,
    reviews: 123,
    description: 'Yoga, Meditation, Wellness Classes',
    location: 'Camp 7, Baguio City',
    schedule: 'Monday - Sunday\n6:00 AM - 9:00 PM',
    price: '₱300 - ₱1,500',
    tags: ['yoga', 'meditation', 'wellness', 'zen', 'classes'],
    isPromo: true,
  },

  // Fitness & Sports Services
  {
    id: 'fs_016',
    name: 'Shape Up Gym',
    category: 'Fitness & Sports',
    subcategory: 'Gym & Training',
    image: require('../../assets/images/shapeup_gym.png'),
    rating: 4.8,
    reviews: 1374,
    description: 'Personal Training, Group Classes, Cardio',
    location: 'Session Road, Baguio City',
    schedule: 'Monday - Sunday\n5:00 AM - 11:00 PM',
    price: '₱200 - ₱5,000',
    tags: ['gym', 'training', 'cardio', 'fitness', 'shape'],
    isPromo: true,
  },
  {
    id: 'fitness-2',
    name: 'Peak Performance Training',
    category: 'Fitness & Sports',
    subcategory: 'Sports Training',
    image: require('../../assets/images/peak-performance.png'),
    rating: 4.9,
    reviews: 892,
    description: 'Sports Training, Athletic Performance, Coaching',
    location: 'Magsaysay Ave, Baguio City',
    schedule: 'Monday - Saturday\n6:00 AM - 10:00 PM',
    price: '₱500 - ₱8,000',
    tags: ['sports', 'training', 'athletic', 'coaching', 'peak'],
    isPromo: false,
  },
  {
    id: 'fs_004',
    name: 'Pulse Fitness Center',
    category: 'Fitness & Sports',
    subcategory: 'Fitness Center',
    image: require('../../assets/images/pulse.png'),
    rating: 4.6,
    reviews: 1012,
    description: 'Modern Equipment, Group Fitness, CrossFit',
    location: 'Governor Pack Road, Baguio City',
    schedule: 'Monday - Sunday\n24/7 Access',
    price: '₱150 - ₱4,000',
    tags: ['fitness', 'crossfit', 'equipment', 'pulse', 'gym'],
    isPromo: true,
  },
  {
    id: 'fitness-4',
    name: 'Elevate Sports Complex',
    category: 'Fitness & Sports',
    subcategory: 'Sports Complex',
    image: require('../../assets/images/elevate.png'),
    rating: 4.8,
    reviews: 567,
    description: 'Basketball, Volleyball, Badminton Courts',
    location: 'Camp 7, Baguio City',
    schedule: 'Monday - Sunday\n6:00 AM - 10:00 PM',
    price: '₱100 - ₱3,000',
    tags: ['basketball', 'volleyball', 'badminton', 'courts', 'sports'],
    isPromo: false,
  },
  {
    id: 'fitness-5',
    name: 'Apex Sports Academy',
    category: 'Fitness & Sports',
    subcategory: 'Sports Academy',
    image: require('../../assets/images/apex-gym.png'),
    rating: 4.9,
    reviews: 723,
    description: 'Youth Sports Training, Coaching Programs',
    location: 'Burnham Park Area, Baguio City',
    schedule: 'Monday - Friday\n3:00 PM - 8:00 PM',
    price: '₱800 - ₱6,000',
    tags: ['youth', 'sports', 'academy', 'coaching', 'apex'],
    isPromo: true,
  },
];

// Search function
export const searchServices = (query: string) => {
  if (!query || query.trim() === '') {
    return allServices; // Return all services if no query
  }

  const searchTerm = query.toLowerCase().trim();
  
  return allServices.filter(service => {
    // Search in name
    if (service.name.toLowerCase().includes(searchTerm)) return true;
    
    // Search in category
    if (service.category.toLowerCase().includes(searchTerm)) return true;
    
    // Search in subcategory
    if (service.subcategory.toLowerCase().includes(searchTerm)) return true;
    
    // Search in description
    if (service.description.toLowerCase().includes(searchTerm)) return true;
    
    // Search in location
    if (service.location.toLowerCase().includes(searchTerm)) return true;
    
    // Search in tags
    if (service.tags.some(tag => tag.toLowerCase().includes(searchTerm))) return true;
    
    return false;
  });
};

// Get services by category
export const getServicesByCategory = (category: string) => {
  return allServices.filter(service => 
    service.category.toLowerCase() === category.toLowerCase()
  );
};

// Get featured/most booked services
export const getMostBookedServices = () => {
  return allServices
    .sort((a, b) => b.reviews - a.reviews) // Sort by review count
    .slice(0, 6); // Get top 6
};

// Default export for route compatibility
export default {
  allServices,
  searchServices,
  getServicesByCategory,
  getMostBookedServices
};
