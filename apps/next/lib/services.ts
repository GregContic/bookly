// Service data structure for the web application
export interface WebService {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  logo: string;
  rating: number;
  reviews: number;
  description: string;
  location: string;
  schedule?: string;
  price?: string;
  tags: string[];
  isPromo?: boolean;
}

// All services data for the web application
export const allWebServices: WebService[] = [
  // Health & Wellness Services
  {
    id: 'primecare-medical-clinic',
    name: 'PrimeCare Medical Clinic',
    category: 'Health & Wellness',
    subcategory: 'Medical Care',
    logo: '/assets/placeholder_lotus.png',
    rating: 4.8,
    reviews: 342,
    description: 'Comprehensive healthcare services with experienced doctors and modern facilities.',
    location: 'Session Road, Baguio City',
    schedule: 'Monday - Saturday\n8:00 AM - 6:00 PM',
    price: '₱500 - ₱2,000',
    tags: ['medical', 'healthcare', 'clinic', 'doctor', 'checkup'],
    isPromo: false,
  },
  {
    id: 'smilebright-dental',
    name: 'SmileBright Dental',
    category: 'Health & Wellness',
    subcategory: 'Dental Care',
    logo: '/assets/placeholder_lotus.png',
    rating: 4.9,
    reviews: 285,
    description: 'Complete dental care services including cleaning, whitening, and orthodontics.',
    location: 'Magsaysay Ave, Baguio City',
    schedule: 'Monday - Friday\n9:00 AM - 5:00 PM',
    price: '₱800 - ₱3,500',
    tags: ['dental', 'teeth', 'cleaning', 'whitening', 'orthodontics'],
    isPromo: true,
  },
  {
    id: 'evercare-family-medical-clinic',
    name: 'Evercare Family Medical Clinic',
    category: 'Health & Wellness',
    subcategory: 'Family Medicine',
    logo: '/assets/evercare.png',
    rating: 4.7,
    reviews: 198,
    description: 'Family-oriented medical care with pediatric and geriatric specializations.',
    location: 'Burnham Park Area, Baguio City',
    schedule: 'Monday - Sunday\n7:00 AM - 7:00 PM',
    price: '₱400 - ₱1,800',
    tags: ['family', 'pediatric', 'geriatric', 'medicine', 'healthcare'],
    isPromo: false,
  },
  {
    id: 'dr-teeth-dental-care',
    name: 'Dr.teeth Dental Care',
    category: 'Health & Wellness',
    subcategory: 'Dental Care',
    logo: '/assets/dr-teeth.png',
    rating: 4.6,
    reviews: 156,
    description: 'Advanced dental treatments with latest technology and pain-free procedures.',
    location: 'Upper Session Road, Baguio City',
    schedule: 'Tuesday - Saturday\n10:00 AM - 6:00 PM',
    price: '₱600 - ₱4,000',
    tags: ['dental', 'advanced', 'technology', 'painless', 'treatment'],
    isPromo: false,
  },
  {
    id: 'clear-vision-eye-clinic',
    name: 'Clear Vision Eye Clinic',
    category: 'Health & Wellness',
    subcategory: 'Eye Care',
    logo: '/assets/clearvision.png',
    rating: 4.8,
    reviews: 124,
    description: 'Comprehensive eye care, vision testing, and eyewear fitting services.',
    location: 'Governor Pack Road, Baguio City',
    schedule: 'Monday - Friday\n8:30 AM - 5:30 PM',
    price: '₱700 - ₱3,000',
    tags: ['eye', 'vision', 'eyewear', 'glasses', 'contacts'],
    isPromo: true,
  },

  // Beauty & Personal Care Services
  {
    id: 'serene-escape-spa',
    name: 'Serene Escape Spa',
    category: 'Beauty & Personal Care',
    subcategory: 'Spa & Wellness',
    logo: '/assets/spa-wellness.png',
    rating: 4.9,
    reviews: 412,
    description: 'Relaxing spa treatments including massages, facials, and body treatments.',
    location: 'Camp 7, Baguio City',
    schedule: 'Monday - Sunday\n10:00 AM - 9:00 PM',
    price: '₱1,200 - ₱4,500',
    tags: ['spa', 'massage', 'facial', 'relaxation', 'wellness'],
    isPromo: false,
  },
  {
    id: 'davids-salon',
    name: "David's Salon",
    category: 'Beauty & Personal Care',
    subcategory: 'Hair Salon',
    logo: '/assets/davidsalon.png',
    rating: 4.8,
    reviews: 523,
    description: 'Professional hair styling, coloring, and treatment services.',
    location: 'Session Road, Baguio City',
    schedule: 'Monday - Sunday\n9:00 AM - 8:00 PM',
    price: '₱300 - ₱2,500',
    tags: ['hair', 'salon', 'styling', 'coloring', 'treatment'],
    isPromo: true,
  },
  {
    id: 'ink-haven-tattoo-piercing-studio',
    name: 'Ink Haven Tattoo & Piercing Studio',
    category: 'Beauty & Personal Care',
    subcategory: 'Body Art',
    logo: '/assets/placeholder_scissors.png',
    rating: 4.7,
    reviews: 289,
    description: 'Custom tattoo designs and professional piercing services.',
    location: 'Upper Session Road, Baguio City',
    schedule: 'Wednesday - Sunday\n12:00 PM - 9:00 PM',
    price: '₱1,500 - ₱8,000',
    tags: ['tattoo', 'piercing', 'body art', 'custom', 'design'],
    isPromo: false,
  },
  {
    id: 'kwentong-barbero',
    name: 'Kwentong Barbero',
    category: 'Beauty & Personal Care',
    subcategory: 'Barbershop',
    logo: '/assets/placeholder_scissors.png',
    rating: 4.6,
    reviews: 178,
    description: 'Traditional and modern barbering services for men.',
    location: 'Magsaysay Ave, Baguio City',
    schedule: 'Monday - Saturday\n8:00 AM - 7:00 PM',
    price: '₱150 - ₱500',
    tags: ['barber', 'haircut', 'shave', 'men', 'grooming'],
    isPromo: false,
  },
  {
    id: 'tranquil-touch-spa',
    name: 'Tranquil Touch Spa',
    category: 'Beauty & Personal Care',
    subcategory: 'Spa & Wellness',
    logo: '/assets/tranquiltouch.png',
    rating: 4.8,
    reviews: 267,
    description: 'Holistic spa treatments focusing on relaxation and rejuvenation.',
    location: 'Burnham Park Area, Baguio City',
    schedule: 'Tuesday - Sunday\n10:00 AM - 8:00 PM',
    price: '₱1,000 - ₱3,500',
    tags: ['spa', 'holistic', 'relaxation', 'rejuvenation', 'wellness'],
    isPromo: true,
  },

  // Automotive Services
  {
    id: 'autocare',
    name: 'Autocare',
    category: 'Automotive Services',
    subcategory: 'Car Maintenance',
    logo: '/assets/autocare.png',
    rating: 4.5,
    reviews: 198,
    description: 'Complete automotive care including oil change, tire service, and repairs.',
    location: 'Marcos Highway, Baguio City',
    schedule: 'Monday - Saturday\n7:00 AM - 6:00 PM',
    price: '₱500 - ₱5,000',
    tags: ['automotive', 'car', 'maintenance', 'oil change', 'repair'],
    isPromo: false,
  },
  {
    id: 'speedmaster-dhods',
    name: 'Speedmaster Dhods',
    category: 'Automotive Services',
    subcategory: 'Auto Repair',
    logo: '/assets/placeholder_muscle.png',
    rating: 4.6,
    reviews: 145,
    description: 'Expert auto repair services with quick turnaround times.',
    location: 'La Trinidad, Benguet',
    schedule: 'Monday - Friday\n8:00 AM - 5:00 PM',
    price: '₱800 - ₱8,000',
    tags: ['auto repair', 'quick service', 'expert', 'maintenance'],
    isPromo: true,
  },
  {
    id: 'tt',
    name: 'TT',
    category: 'Automotive Services',
    subcategory: 'Auto Services',
    logo: '/assets/tt.png',
    rating: 4.4,
    reviews: 89,
    description: 'Reliable automotive services and parts replacement.',
    location: 'Session Road, Baguio City',
    schedule: 'Monday - Saturday\n8:00 AM - 6:00 PM',
    price: '₱400 - ₱3,000',
    tags: ['automotive', 'parts', 'replacement', 'reliable'],
    isPromo: false,
  },
  {
    id: 'proauto-detailing',
    name: 'ProAuto Detailing',
    category: 'Automotive Services',
    subcategory: 'Car Detailing',
    logo: '/assets/proauto.png',
    rating: 4.7,
    reviews: 167,
    description: 'Professional car detailing and cleaning services.',
    location: 'Camp 7, Baguio City',
    schedule: 'Monday - Sunday\n9:00 AM - 6:00 PM',
    price: '₱600 - ₱2,500',
    tags: ['car detailing', 'cleaning', 'professional', 'wash'],
    isPromo: false,
  },
  {
    id: 'shine-car',
    name: 'Shine Car',
    category: 'Automotive Services',
    subcategory: 'Car Wash',
    logo: '/assets/shinecar.png',
    rating: 4.3,
    reviews: 134,
    description: 'Quality car washing and basic maintenance services.',
    location: 'Magsaysay Ave, Baguio City',
    schedule: 'Monday - Sunday\n7:00 AM - 7:00 PM',
    price: '₱200 - ₱800',
    tags: ['car wash', 'maintenance', 'quality', 'affordable'],
    isPromo: true,
  },

  // Fitness & Sports Services
  {
    id: 'zen-yoga-studio',
    name: 'Zen Yoga Studio',
    category: 'Fitness & Sports',
    subcategory: 'Yoga',
    logo: '/assets/zenyoga.png',
    rating: 4.9,
    reviews: 234,
    description: 'Traditional and modern yoga classes for all skill levels.',
    location: 'Session Road, Baguio City',
    schedule: 'Monday - Sunday\n6:00 AM - 9:00 PM',
    price: '₱300 - ₱1,200',
    tags: ['yoga', 'meditation', 'fitness', 'wellness', 'classes'],
    isPromo: false,
  },
  {
    id: 'elevate-dance-academy',
    name: 'Elevate Dance Academy',
    category: 'Fitness & Sports',
    subcategory: 'Dance',
    logo: '/assets/placeholder_muscle.png',
    rating: 4.8,
    reviews: 189,
    description: 'Dance classes for all ages including ballet, hip-hop, and contemporary.',
    location: 'Upper Session Road, Baguio City',
    schedule: 'Monday - Saturday\n3:00 PM - 9:00 PM',
    price: '₱500 - ₱2,000',
    tags: ['dance', 'ballet', 'hip-hop', 'contemporary', 'classes'],
    isPromo: true,
  },
  {
    id: 'altitude-gym',
    name: 'Altitude Gym',
    category: 'Fitness & Sports',
    subcategory: 'Gym',
    logo: '/assets/placeholder_muscle.png',
    rating: 4.6,
    reviews: 312,
    description: 'Full-service gym with modern equipment and personal trainers.',
    location: 'Camp 7, Baguio City',
    schedule: 'Monday - Sunday\n5:00 AM - 11:00 PM',
    price: '₱100 - ₱1,500',
    tags: ['gym', 'fitness', 'weights', 'cardio', 'training'],
    isPromo: false,
  },
  {
    id: 'murphys-fitness-gym',
    name: "Murphy's Fitness Gym",
    category: 'Fitness & Sports',
    subcategory: 'Gym',
    logo: '/assets/murphys.png',
    rating: 4.5,
    reviews: 156,
    description: 'Community-focused gym with affordable membership rates.',
    location: 'Burnham Park Area, Baguio City',
    schedule: 'Monday - Sunday\n6:00 AM - 10:00 PM',
    price: '₱80 - ₱1,000',
    tags: ['gym', 'affordable', 'community', 'fitness', 'membership'],
    isPromo: true,
  },
  {
    id: 'zenflow-yoga',
    name: 'ZenFlow Yoga',
    category: 'Fitness & Sports',
    subcategory: 'Yoga',
    logo: '/assets/zenflow.png',
    rating: 4.7,
    reviews: 178,
    description: 'Flow-based yoga classes with mindfulness and meditation.',
    location: 'Governor Pack Road, Baguio City',
    schedule: 'Tuesday - Sunday\n7:00 AM - 8:00 PM',
    price: '₱400 - ₱1,500',
    tags: ['yoga', 'flow', 'mindfulness', 'meditation', 'wellness'],
    isPromo: false,
  },

  // Home Services
  {
    id: 'fresh-nest-cleaning',
    name: 'Fresh Nest Cleaning',
    category: 'Home Services',
    subcategory: 'Cleaning',
    logo: '/assets/freshnest.png',
    rating: 4.8,
    reviews: 267,
    description: 'Professional home and office cleaning services.',
    location: 'Session Road, Baguio City',
    schedule: 'Monday - Saturday\n8:00 AM - 6:00 PM',
    price: '₱500 - ₱3,000',
    tags: ['cleaning', 'home', 'office', 'professional', 'service'],
    isPromo: false,
  },
  {
    id: 'swiftfix-plumbing-services',
    name: 'SwiftFix Plumbing Services',
    category: 'Home Services',
    subcategory: 'Plumbing',
    logo: '/assets/placeholder_house.png',
    rating: 4.6,
    reviews: 198,
    description: 'Emergency and scheduled plumbing repair services.',
    location: 'La Trinidad, Benguet',
    schedule: 'Monday - Sunday\n24/7 Emergency',
    price: '₱300 - ₱2,500',
    tags: ['plumbing', 'emergency', 'repair', 'maintenance', 'swift'],
    isPromo: true,
  },
  {
    id: 'power-pro-repair',
    name: 'Power Pro Repair',
    category: 'Home Services',
    subcategory: 'Electrical',
    logo: '/assets/placeholder_house.png',
    rating: 4.7,
    reviews: 145,
    description: 'Electrical installation and repair services for homes and businesses.',
    location: 'Magsaysay Ave, Baguio City',
    schedule: 'Monday - Saturday\n7:00 AM - 7:00 PM',
    price: '₱400 - ₱3,500',
    tags: ['electrical', 'installation', 'repair', 'power', 'professional'],
    isPromo: false,
  },
  {
    id: 'baguio-home-cleaners',
    name: 'Baguio Home Cleaners',
    category: 'Home Services',
    subcategory: 'Cleaning',
    logo: '/assets/baguiocleaners.png',
    rating: 4.5,
    reviews: 123,
    description: 'Reliable home cleaning services with eco-friendly products.',
    location: 'Upper Session Road, Baguio City',
    schedule: 'Monday - Friday\n9:00 AM - 5:00 PM',
    price: '₱400 - ₱2,000',
    tags: ['cleaning', 'eco-friendly', 'reliable', 'home', 'service'],
    isPromo: false,
  },
  {
    id: 'quickfix-solutions',
    name: 'QuickFix Solutions',
    category: 'Home Services',
    subcategory: 'Handyman',
    logo: '/assets/quickfix.png',
    rating: 4.4,
    reviews: 167,
    description: 'General handyman services for home repairs and maintenance.',
    location: 'Camp 7, Baguio City',
    schedule: 'Monday - Saturday\n8:00 AM - 6:00 PM',
    price: '₱250 - ₱2,000',
    tags: ['handyman', 'repairs', 'maintenance', 'quick', 'solutions'],
    isPromo: true,
  },

  // Tech & IT Services
  {
    id: 'byte-fix',
    name: 'Byte Fix',
    category: 'Tech & IT Services',
    subcategory: 'Computer Repair',
    logo: '/assets/placeholder_monitor.png',
    rating: 4.7,
    reviews: 189,
    description: 'Computer and laptop repair services with data recovery.',
    location: 'Session Road, Baguio City',
    schedule: 'Monday - Saturday\n9:00 AM - 7:00 PM',
    price: '₱500 - ₱5,000',
    tags: ['computer', 'laptop', 'repair', 'data recovery', 'tech'],
    isPromo: false,
  },
  {
    id: 'pc-masters-hub',
    name: 'PC Masters Hub',
    category: 'Tech & IT Services',
    subcategory: 'Computer Services',
    logo: '/assets/pcmaster.png',
    rating: 4.8,
    reviews: 234,
    description: 'Complete PC services including building, repair, and upgrades.',
    location: 'Magsaysay Ave, Baguio City',
    schedule: 'Monday - Sunday\n10:00 AM - 8:00 PM',
    price: '₱800 - ₱8,000',
    tags: ['pc', 'building', 'repair', 'upgrades', 'masters'],
    isPromo: true,
  },
  {
    id: 'mobile-tech-repair-center',
    name: 'Mobile Tech Repair Center',
    category: 'Tech & IT Services',
    subcategory: 'Mobile Repair',
    logo: '/assets/mobiletech.png',
    rating: 4.6,
    reviews: 156,
    description: 'Smartphone and tablet repair services with warranty.',
    location: 'Upper Session Road, Baguio City',
    schedule: 'Monday - Saturday\n9:00 AM - 6:00 PM',
    price: '₱300 - ₱3,000',
    tags: ['mobile', 'smartphone', 'tablet', 'repair', 'warranty'],
    isPromo: false,
  },
  {
    id: 'cloudsync-it-consulting',
    name: 'CloudSync IT Consulting',
    category: 'Tech & IT Services',
    subcategory: 'IT Consulting',
    logo: '/assets/cloudsync.png',
    rating: 4.9,
    reviews: 98,
    description: 'Professional IT consulting and cloud solutions for businesses.',
    location: 'Burnham Park Area, Baguio City',
    schedule: 'Monday - Friday\n8:00 AM - 6:00 PM',
    price: '₱2,000 - ₱15,000',
    tags: ['it consulting', 'cloud', 'business', 'solutions', 'professional'],
    isPromo: false,
  },
  {
    id: 'tecnopro',
    name: 'TecnoPro',
    category: 'Tech & IT Services',
    subcategory: 'Tech Support',
    logo: '/assets/tecnopro.png',
    rating: 4.5,
    reviews: 134,
    description: 'Technical support and maintenance for all types of devices.',
    location: 'Governor Pack Road, Baguio City',
    schedule: 'Monday - Saturday\n8:00 AM - 7:00 PM',
    price: '₱400 - ₱2,500',
    tags: ['tech support', 'maintenance', 'devices', 'technical', 'pro'],
    isPromo: true,
  },
];

// Search function
export const searchWebServices = (query: string): WebService[] => {
  if (!query || query.trim() === '') {
    return allWebServices; // Return all services if no query
  }

  const searchTerm = query.toLowerCase().trim();
  
  return allWebServices.filter(service => {
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
export const getWebServicesByCategory = (category: string): WebService[] => {
  return allWebServices.filter(service => 
    service.category.toLowerCase() === category.toLowerCase()
  );
};

// Get featured/most booked services
export const getMostBookedWebServices = (): WebService[] => {
  return allWebServices
    .sort((a, b) => b.reviews - a.reviews) // Sort by review count
    .slice(0, 6); // Get top 6
};

// Get all categories
export const getAllCategories = (): string[] => {
  const categories = Array.from(new Set(allWebServices.map(service => service.category)));
  return categories.sort();
};
