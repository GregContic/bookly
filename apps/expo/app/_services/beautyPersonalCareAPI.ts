import { BookingSlot, Service, ServiceCategory } from '../_types/interfaces';

/**
 * Beauty & Personal Care Service Data
 * Simulates database records with realistic data
 */
const beautyPersonalCareData: Service[] = [
  {
    id: 'bpc_001',
    name: 'David Salon & Spa',
    category: 'beauty-personal-care' as ServiceCategory,
    subcategory: 'hair-salon',
    image: require('../../assets/images/davidsalon.png'),
    rating: 4.9,
    reviewCount: 248,
    description: 'Premium hair styling, coloring, and spa treatments. Expert stylists with international training.',
    shortDescription: 'Hair Styling, Coloring, Spa Treatments',
    location: 'Session Road, Baguio City',
    address: '123 Session Road, Baguio City, Benguet',
    phone: '+63 917 123 4567',
    email: 'info@davidsalon.com',
    website: 'https://davidsalon.com',
    schedule: {
      monday: { open: '09:00', close: '20:00', isOpen: true },
      tuesday: { open: '09:00', close: '20:00', isOpen: true },
      wednesday: { open: '09:00', close: '20:00', isOpen: true },
      thursday: { open: '09:00', close: '20:00', isOpen: true },
      friday: { open: '09:00', close: '20:00', isOpen: true },
      saturday: { open: '09:00', close: '20:00', isOpen: true },
      sunday: { open: '09:00', close: '20:00', isOpen: true },
    },
    priceRange: { min: 300, max: 2500, currency: 'PHP' },
    services: [
      { name: 'Haircut & Style', price: 350, duration: 60 },
      { name: 'Hair Coloring', price: 1200, duration: 120 },
      { name: 'Spa Treatment', price: 2000, duration: 90 },
      { name: 'Hair Treatment', price: 800, duration: 90 },
    ],
    amenities: ['WiFi', 'Air Conditioning', 'Parking', 'Card Payment'],
    isPromo: true,
    promoText: '20% off on weekdays',
    isFeatured: true,
    isVerified: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-06-18'),
  },
  {
    id: 'bpc_002',
    name: 'Glow Haven Aesthetics',
    category: 'beauty-personal-care' as ServiceCategory,
    subcategory: 'skincare-clinic',
    image: require('../../assets/images/glow-haven.png'),
    rating: 4.8,
    reviewCount: 192,
    description: 'Advanced facial treatments and aesthetic procedures using the latest technology.',
    shortDescription: 'Facial Treatments, Skin Care, Aesthetics',
    location: 'Magsaysay Ave, Baguio City',
    address: '456 Magsaysay Avenue, Baguio City, Benguet',
    phone: '+63 917 234 5678',
    email: 'contact@glowhaven.com',
    schedule: {
      monday: { open: '10:00', close: '19:00', isOpen: false },
      tuesday: { open: '10:00', close: '19:00', isOpen: true },
      wednesday: { open: '10:00', close: '19:00', isOpen: true },
      thursday: { open: '10:00', close: '19:00', isOpen: true },
      friday: { open: '10:00', close: '19:00', isOpen: true },
      saturday: { open: '10:00', close: '19:00', isOpen: true },
      sunday: { open: '10:00', close: '19:00', isOpen: false },
    },
    priceRange: { min: 800, max: 4000, currency: 'PHP' },
    services: [
      { name: 'Classic Facial', price: 800, duration: 60 },
      { name: 'Diamond Peel', price: 1500, duration: 90 },
      { name: 'Laser Treatment', price: 3000, duration: 45 },
      { name: 'Chemical Peel', price: 2500, duration: 60 },
    ],
    amenities: ['WiFi', 'Air Conditioning', 'Private Rooms', 'Card Payment'],
    isPromo: false,
    isFeatured: true,
    isVerified: true,
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-06-17'),
  },
  {
    id: 'bpc_003',
    name: 'Ink Haven Tattoo Studio',
    category: 'beauty-personal-care' as ServiceCategory,
    subcategory: 'tattoo-studio',
    image: require('../../assets/images/ink-haven.png'),
    rating: 4.7,
    reviewCount: 156,
    description: 'Professional tattoo artists specializing in custom designs and body art.',
    shortDescription: 'Custom Tattoos, Piercing, Body Art',
    location: 'Upper Session Road, Baguio City',
    address: '789 Upper Session Road, Baguio City, Benguet',
    phone: '+63 917 345 6789',
    email: 'artist@inkhaven.com',
    schedule: {
      monday: { open: '12:00', close: '21:00', isOpen: false },
      tuesday: { open: '12:00', close: '21:00', isOpen: false },
      wednesday: { open: '12:00', close: '21:00', isOpen: true },
      thursday: { open: '12:00', close: '21:00', isOpen: true },
      friday: { open: '12:00', close: '21:00', isOpen: true },
      saturday: { open: '12:00', close: '21:00', isOpen: true },
      sunday: { open: '12:00', close: '21:00', isOpen: true },
    },
    priceRange: { min: 1500, max: 8000, currency: 'PHP' },
    services: [
      { name: 'Small Tattoo', price: 1500, duration: 60 },
      { name: 'Medium Tattoo', price: 3500, duration: 180 },
      { name: 'Large Tattoo', price: 6000, duration: 300 },
      { name: 'Piercing', price: 500, duration: 30 },
    ],
    amenities: ['Sterilized Equipment', 'Private Booths', 'Consultation'],
    isPromo: false,
    isFeatured: false,
    isVerified: true,
    createdAt: new Date('2024-03-05'),
    updatedAt: new Date('2024-06-16'),
  },
  {
    id: 'bpc_004',
    name: 'Harmony Beauty Clinic',
    category: 'beauty-personal-care' as ServiceCategory,
    subcategory: 'dermatology-clinic',
    image: require('../../assets/images/harmony.png'),
    rating: 4.6,
    reviewCount: 134,
    description: 'Medical-grade dermatology treatments and cosmetic procedures by licensed professionals.',
    shortDescription: 'Dermatology, Laser Treatments, Botox',
    location: 'Governor Pack Road, Baguio City',
    address: '321 Governor Pack Road, Baguio City, Benguet',
    phone: '+63 917 456 7890',
    email: 'clinic@harmonybeauty.com',
    schedule: {
      monday: { open: '08:00', close: '18:00', isOpen: true },
      tuesday: { open: '08:00', close: '18:00', isOpen: true },
      wednesday: { open: '08:00', close: '18:00', isOpen: true },
      thursday: { open: '08:00', close: '18:00', isOpen: true },
      friday: { open: '08:00', close: '18:00', isOpen: true },
      saturday: { open: '08:00', close: '16:00', isOpen: true },
      sunday: { open: '08:00', close: '16:00', isOpen: false },
    },
    priceRange: { min: 2000, max: 10000, currency: 'PHP' },
    services: [
      { name: 'Dermatology Consultation', price: 2000, duration: 30 },
      { name: 'Botox Treatment', price: 8000, duration: 45 },
      { name: 'Laser Hair Removal', price: 3500, duration: 60 },
      { name: 'Acne Treatment', price: 2500, duration: 45 },
    ],
    amenities: ['Medical Grade Equipment', 'Licensed Dermatologists', 'Card Payment', 'Insurance Accepted'],
    isPromo: true,
    promoText: 'Free consultation this month',
    isFeatured: true,
    isVerified: true,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-06-15'),
  },
  {
    id: 'bpc_005',
    name: 'Fresh Nest Beauty Bar',
    category: 'beauty-personal-care' as ServiceCategory,
    subcategory: 'nail-salon',
    image: require('../../assets/images/freshnest.png'),
    rating: 4.8,
    reviewCount: 201,
    description: 'Complete nail care services including manicures, pedicures, and eyelash extensions.',
    shortDescription: 'Nail Care, Manicure, Pedicure, Lashes',
    location: 'Camp 7, Baguio City',
    address: '654 Camp 7, Baguio City, Benguet',
    phone: '+63 917 567 8901',
    email: 'info@freshnest.com',
    schedule: {
      monday: { open: '10:00', close: '21:00', isOpen: true },
      tuesday: { open: '10:00', close: '21:00', isOpen: true },
      wednesday: { open: '10:00', close: '21:00', isOpen: true },
      thursday: { open: '10:00', close: '21:00', isOpen: true },
      friday: { open: '10:00', close: '21:00', isOpen: true },
      saturday: { open: '10:00', close: '21:00', isOpen: true },
      sunday: { open: '10:00', close: '21:00', isOpen: true },
    },
    priceRange: { min: 200, max: 1200, currency: 'PHP' },
    services: [
      { name: 'Basic Manicure', price: 200, duration: 45 },
      { name: 'Gel Manicure', price: 450, duration: 60 },
      { name: 'Pedicure', price: 350, duration: 60 },
      { name: 'Eyelash Extensions', price: 1200, duration: 120 },
    ],
    amenities: ['WiFi', 'Air Conditioning', 'Comfortable Seating', 'Card Payment'],
    isPromo: false,
    isFeatured: false,
    isVerified: true,
    createdAt: new Date('2024-02-28'),
    updatedAt: new Date('2024-06-14'),
  },
  {
    id: 'bpc_006',
    name: 'Smile Bright Dental Cosmetics',
    category: 'beauty-personal-care' as ServiceCategory,
    subcategory: 'dental-cosmetics',
    image: require('../../assets/images/smile-bright.png'),
    rating: 4.9,
    reviewCount: 176,
    description: 'Cosmetic dentistry services including teeth whitening, veneers, and smile makeovers.',
    shortDescription: 'Teeth Whitening, Veneers, Cosmetic Dentistry',
    location: 'Burnham Park Area, Baguio City',
    address: '987 Burnham Park Road, Baguio City, Benguet',
    phone: '+63 917 678 9012',
    email: 'smile@smilebright.com',
    schedule: {
      monday: { open: '08:00', close: '18:00', isOpen: true },
      tuesday: { open: '08:00', close: '18:00', isOpen: true },
      wednesday: { open: '08:00', close: '18:00', isOpen: true },
      thursday: { open: '08:00', close: '18:00', isOpen: true },
      friday: { open: '08:00', close: '18:00', isOpen: true },
      saturday: { open: '08:00', close: '16:00', isOpen: true },
      sunday: { open: '08:00', close: '16:00', isOpen: false },
    },
    priceRange: { min: 1500, max: 15000, currency: 'PHP' },
    services: [
      { name: 'Teeth Whitening', price: 3500, duration: 90 },
      { name: 'Dental Veneers', price: 12000, duration: 120 },
      { name: 'Smile Makeover Consultation', price: 1500, duration: 60 },
      { name: 'Teeth Cleaning', price: 2000, duration: 45 },
    ],
    amenities: ['Modern Equipment', 'Licensed Dentists', 'Comfortable Chairs', 'Card Payment'],
    isPromo: true,
    promoText: '30% off teeth whitening',
    isFeatured: true,
    isVerified: true,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-06-13'),
  },
];

/**
 * Beauty & Personal Care API Service
 * Simulates backend API calls with realistic delays and error handling
 */
export class BeautyPersonalCareAPI {
  
  /**
   * Simulate network delay
   */
  private static async delay(ms: number = 800): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Simulate API error
   */
  private static simulateError(errorRate: number = 0.05): void {
    if (Math.random() < errorRate) {
      throw new Error('Network error: Unable to fetch data');
    }
  }

  /**
   * Get all beauty & personal care services
   */
  static async getAllServices(): Promise<Service[]> {
    await this.delay(600);
    this.simulateError(0.02);
    
    return beautyPersonalCareData.sort((a, b) => {
      // Sort by featured first, then by rating
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return b.rating - a.rating;
    });
  }

  /**
   * Get featured services only
   */
  static async getFeaturedServices(): Promise<Service[]> {
    await this.delay(400);
    this.simulateError(0.01);
    
    return beautyPersonalCareData
      .filter(service => service.isFeatured)
      .sort((a, b) => b.rating - a.rating);
  }

  /**
   * Get services with promotions
   */
  static async getPromotionalServices(): Promise<Service[]> {
    await this.delay(500);
    this.simulateError(0.01);
    
    return beautyPersonalCareData
      .filter(service => service.isPromo)
      .sort((a, b) => b.rating - a.rating);
  }

  /**
   * Search services by query
   */
  static async searchServices(query: string): Promise<Service[]> {
    await this.delay(300);
    this.simulateError(0.01);
    
    if (!query.trim()) {
      return this.getAllServices();
    }

    const searchTerm = query.toLowerCase();
    return beautyPersonalCareData.filter(service => 
      service.name.toLowerCase().includes(searchTerm) ||
      service.description.toLowerCase().includes(searchTerm) ||
      service.shortDescription.toLowerCase().includes(searchTerm) ||
      service.subcategory.toLowerCase().includes(searchTerm) ||
      service.services.some(s => s.name.toLowerCase().includes(searchTerm))
    );
  }

  /**
   * Get service by ID
   */
  static async getServiceById(id: string): Promise<Service | null> {
    await this.delay(200);
    this.simulateError(0.01);
    
    return beautyPersonalCareData.find(service => service.id === id) || null;
  }

  /**
   * Get services by subcategory
   */
  static async getServicesBySubcategory(subcategory: string): Promise<Service[]> {
    await this.delay(400);
    this.simulateError(0.01);
    
    return beautyPersonalCareData
      .filter(service => service.subcategory === subcategory)
      .sort((a, b) => b.rating - a.rating);
  }

  /**
   * Get available booking slots for a service
   */
  static async getAvailableSlots(serviceId: string, date: Date): Promise<BookingSlot[]> {
    await this.delay(600);
    this.simulateError(0.02);
    
    const service = beautyPersonalCareData.find(s => s.id === serviceId);
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
    
    const totalServices = beautyPersonalCareData.length;
    const averageRating = beautyPersonalCareData.reduce((sum, service) => sum + service.rating, 0) / totalServices;
    const totalReviews = beautyPersonalCareData.reduce((sum, service) => sum + service.reviewCount, 0);
    const featuredCount = beautyPersonalCareData.filter(s => s.isFeatured).length;
    const promoCount = beautyPersonalCareData.filter(s => s.isPromo).length;

    return {
      totalServices,
      averageRating: Math.round(averageRating * 10) / 10,
      totalReviews,
      featuredCount,
      promoCount,
    };
  }
}

export default BeautyPersonalCareAPI;
