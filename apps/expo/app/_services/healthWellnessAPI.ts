import { BookingSlot, Service, ServiceCategory } from '../_types/interfaces';

/**
 * Health & Wellness Service Data
 * Simulates database records with realistic data
 */
const healthWellnessData: Service[] = [
  {
    id: 'hw_001',
    name: 'Prime Care Medical Clinic',
    category: 'health-wellness' as ServiceCategory,
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
      monday: { open: '08:00', close: '17:00', isOpen: true },
      tuesday: { open: '08:00', close: '17:00', isOpen: true },
      wednesday: { open: '08:00', close: '17:00', isOpen: true },
      thursday: { open: '08:00', close: '17:00', isOpen: true },
      friday: { open: '08:00', close: '17:00', isOpen: true },
      saturday: { open: '08:00', close: '17:00', isOpen: true },
      sunday: { open: '09:00', close: '15:00', isOpen: true },
    },
    priceRange: { min: 500, max: 2000, currency: 'PHP' },
    services: [
      { name: 'General Consultation', price: 500, duration: 30 },
      { name: 'Laboratory Tests', price: 800, duration: 60 },
      { name: 'X-Ray', price: 1200, duration: 30 },
      { name: 'Health Certificate', price: 300, duration: 15 },
    ],
    amenities: ['WiFi', 'Air Conditioning', 'Parking', 'Card Payment', 'Insurance Accepted'],
    isPromo: false,
    isFeatured: true,
    isVerified: true,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-06-18'),
  },
  {
    id: 'hw_002',
    name: 'Urban Smiles Dental',
    category: 'health-wellness' as ServiceCategory,
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
      monday: { open: '09:00', close: '18:00', isOpen: true },
      tuesday: { open: '09:00', close: '18:00', isOpen: true },
      wednesday: { open: '09:00', close: '18:00', isOpen: true },
      thursday: { open: '09:00', close: '18:00', isOpen: true },
      friday: { open: '09:00', close: '18:00', isOpen: true },
      saturday: { open: '09:00', close: '15:00', isOpen: true },
      sunday: { open: '10:00', close: '14:00', isOpen: false },
    },
    priceRange: { min: 800, max: 3500, currency: 'PHP' },
    services: [
      { name: 'Dental Cleaning', price: 800, duration: 45 },
      { name: 'Tooth Extraction', price: 1500, duration: 30 },
      { name: 'Dental Filling', price: 1200, duration: 45 },
      { name: 'Orthodontic Consultation', price: 2000, duration: 60 },
    ],
    amenities: ['WiFi', 'Air Conditioning', 'Parking', 'Card Payment'],
    isPromo: true,
    promoText: '15% off on first visit',
    isFeatured: true,
    isVerified: true,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-06-15'),
  },
  {
    id: 'hw_003',
    name: 'Serene Scape Wellness',
    category: 'health-wellness' as ServiceCategory,
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
      monday: { open: '10:00', close: '20:00', isOpen: true },
      tuesday: { open: '10:00', close: '20:00', isOpen: true },
      wednesday: { open: '10:00', close: '20:00', isOpen: true },
      thursday: { open: '10:00', close: '20:00', isOpen: true },
      friday: { open: '10:00', close: '20:00', isOpen: true },
      saturday: { open: '10:00', close: '20:00', isOpen: true },
      sunday: { open: '10:00', close: '20:00', isOpen: true },
    },
    priceRange: { min: 1200, max: 4000, currency: 'PHP' },
    services: [
      { name: 'Individual Therapy', price: 2500, duration: 60 },
      { name: 'Group Therapy', price: 1200, duration: 90 },
      { name: 'Stress Management', price: 1800, duration: 45 },
      { name: 'Mental Health Assessment', price: 3000, duration: 90 },
    ],
    amenities: ['WiFi', 'Air Conditioning', 'Private Rooms', 'Card Payment'],
    isPromo: false,
    isFeatured: false,
    isVerified: true,
    createdAt: new Date('2024-03-15'),
    updatedAt: new Date('2024-06-10'),
  },
  {
    id: 'hw_004',
    name: 'Bright Eye Clinic',
    category: 'health-wellness' as ServiceCategory,
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
      monday: { open: '08:30', close: '17:30', isOpen: false },
      tuesday: { open: '08:30', close: '17:30', isOpen: true },
      wednesday: { open: '08:30', close: '17:30', isOpen: true },
      thursday: { open: '08:30', close: '17:30', isOpen: true },
      friday: { open: '08:30', close: '17:30', isOpen: true },
      saturday: { open: '08:30', close: '17:30', isOpen: true },
      sunday: { open: '09:00', close: '15:00', isOpen: false },
    },
    priceRange: { min: 600, max: 2500, currency: 'PHP' },
    services: [
      { name: 'Eye Examination', price: 800, duration: 45 },
      { name: 'Prescription Glasses', price: 2500, duration: 30 },
      { name: 'Contact Lens Fitting', price: 1500, duration: 30 },
      { name: 'Eye Surgery Consultation', price: 2000, duration: 60 },
    ],
    amenities: ['WiFi', 'Air Conditioning', 'Parking', 'Card Payment', 'Insurance Accepted'],
    isPromo: false,
    isFeatured: false,
    isVerified: true,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-06-12'),
  },
  {
    id: 'hw_005',
    name: 'Zen Yoga Studio',
    category: 'health-wellness' as ServiceCategory,
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
      monday: { open: '06:00', close: '21:00', isOpen: true },
      tuesday: { open: '06:00', close: '21:00', isOpen: true },
      wednesday: { open: '06:00', close: '21:00', isOpen: true },
      thursday: { open: '06:00', close: '21:00', isOpen: true },
      friday: { open: '06:00', close: '21:00', isOpen: true },
      saturday: { open: '06:00', close: '21:00', isOpen: true },
      sunday: { open: '06:00', close: '21:00', isOpen: true },
    },
    priceRange: { min: 300, max: 1500, currency: 'PHP' },
    services: [
      { name: 'Drop-in Yoga Class', price: 300, duration: 60 },
      { name: 'Private Yoga Session', price: 1500, duration: 60 },
      { name: 'Meditation Class', price: 250, duration: 45 },
      { name: 'Wellness Workshop', price: 800, duration: 120 },
    ],
    amenities: ['WiFi', 'Air Conditioning', 'Yoga Mats', 'Changing Rooms', 'Card Payment'],
    isPromo: true,
    promoText: 'First class free for new members',
    isFeatured: true,
    isVerified: true,
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-06-18'),
  },
  {
    id: 'hw_006',
    name: 'The Spa Wellness Center',
    category: 'health-wellness' as ServiceCategory,
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
      monday: { open: '09:00', close: '22:00', isOpen: true },
      tuesday: { open: '09:00', close: '22:00', isOpen: true },
      wednesday: { open: '09:00', close: '22:00', isOpen: true },
      thursday: { open: '09:00', close: '22:00', isOpen: true },
      friday: { open: '09:00', close: '22:00', isOpen: true },
      saturday: { open: '09:00', close: '22:00', isOpen: true },
      sunday: { open: '09:00', close: '22:00', isOpen: true },
    },
    priceRange: { min: 800, max: 3500, currency: 'PHP' },
    services: [
      { name: 'Swedish Massage', price: 1200, duration: 60 },
      { name: 'Hot Stone Therapy', price: 2000, duration: 90 },
      { name: 'Aromatherapy', price: 1500, duration: 75 },
      { name: 'Full Body Treatment', price: 3500, duration: 120 },
    ],
    amenities: ['WiFi', 'Air Conditioning', 'Parking', 'Card Payment', 'Spa Facilities', 'Relaxation Areas'],
    isPromo: false,
    isFeatured: true,
    isVerified: true,
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-06-16'),
  },
];

/**
 * Health & Wellness API Class
 * Simulates API calls with realistic delays
 */
export class HealthWellnessAPI {
  /**
   * Simulate network delay
   */
  private static delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Get all health & wellness services
   */
  static async getAllServices(): Promise<Service[]> {
    await this.delay(800);
    return [...healthWellnessData];
  }

  /**
   * Get featured services only
   */
  static async getFeaturedServices(): Promise<Service[]> {
    await this.delay(600);
    return healthWellnessData.filter(service => service.isFeatured);
  }

  /**
   * Get services with promotional offers
   */
  static async getPromoServices(): Promise<Service[]> {
    await this.delay(500);
    return healthWellnessData.filter(service => service.isPromo);
  }

  /**
   * Search services by name or description
   */
  static async searchServices(query: string): Promise<Service[]> {
    await this.delay(400);
    
    if (!query.trim()) {
      return [...healthWellnessData];
    }

    const searchTerm = query.toLowerCase();
    return healthWellnessData.filter(service => 
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
    return healthWellnessData.find(service => service.id === id) || null;
  }

  /**
   * Get services by subcategory
   */
  static async getServicesBySubcategory(subcategory: string): Promise<Service[]> {
    await this.delay(400);
    return healthWellnessData.filter(service => service.subcategory === subcategory);
  }

  /**
   * Get available booking slots for a service
   */
  static async getAvailableSlots(serviceId: string, date: Date): Promise<BookingSlot[]> {
    await this.delay(600);
    
    const service = healthWellnessData.find(s => s.id === serviceId);
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
      
      for (let hour = startHour; hour < endHour; hour++) {
        for (let minutes of [0, 30]) {
          if (Math.random() > 0.3) { // 70% chance slot is available
            slots.push({
              id: `${serviceId}_${hour}_${minutes}`,
              time: `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`,
              isAvailable: true,
              date: date,
            });
          }
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
    
    const totalServices = healthWellnessData.length;
    const averageRating = healthWellnessData.reduce((sum, service) => sum + service.rating, 0) / totalServices;
    const totalReviews = healthWellnessData.reduce((sum, service) => sum + service.reviewCount, 0);
    const featuredCount = healthWellnessData.filter(s => s.isFeatured).length;
    const promoCount = healthWellnessData.filter(s => s.isPromo).length;

    return {
      totalServices,
      averageRating: Math.round(averageRating * 10) / 10,
      totalReviews,
      featuredCount,
      promoCount,
    };
  }
}

export default HealthWellnessAPI;
