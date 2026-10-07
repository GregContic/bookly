import { BookingSlot, Service, ServiceCategory } from '../_types/interfaces';

/**
 * Home Services Data
 * Simulates database records with realistic data
 */
const homeServicesData: Service[] = [
  {
    id: 'hs_001',
    name: 'HandyPro Home Repairs',
    category: 'home-services' as ServiceCategory,
    subcategory: 'general-repairs',
    image: require('../../assets/images/handypro.png'),
    rating: 4.8,
    reviewCount: 156,
    description: 'Professional home repair services including plumbing, electrical work, carpentry, and general maintenance. Licensed and insured technicians.',
    shortDescription: 'Plumbing, Electrical, Carpentry, General Repairs',
    location: 'La Trinidad, Benguet',
    address: '123 La Trinidad, Benguet',
    phone: '+63 917 123 4567',
    email: 'service@handypro.com',
    website: 'https://handypro-services.com',
    schedule: {
      monday: { open: '08:00', close: '18:00', isOpen: true },
      tuesday: { open: '08:00', close: '18:00', isOpen: true },
      wednesday: { open: '08:00', close: '18:00', isOpen: true },
      thursday: { open: '08:00', close: '18:00', isOpen: true },
      friday: { open: '08:00', close: '18:00', isOpen: true },
      saturday: { open: '08:00', close: '18:00', isOpen: true },
      sunday: { open: '09:00', close: '15:00', isOpen: false },
    },
    priceRange: { min: 500, max: 8000, currency: 'PHP' },
    services: [
      { name: 'Plumbing Repair', price: 800, duration: 120 },
      { name: 'Electrical Work', price: 1200, duration: 180 },
      { name: 'Carpentry Service', price: 1500, duration: 240 },
      { name: 'General Maintenance', price: 600, duration: 90 },
    ],
    amenities: ['Licensed Technicians', 'Insurance Coverage', 'Emergency Service', 'Card Payment', 'Warranty'],
    isPromo: true,
    promoText: '15% off first service call',
    isFeatured: true,
    isVerified: true,
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-06-18'),
  },
  {
    id: 'hs_002',
    name: 'Fresh Nest Cleaning Services',
    category: 'home-services' as ServiceCategory,
    subcategory: 'cleaning-services',
    image: require('../../assets/images/freshnest.png'),
    rating: 4.9,
    reviewCount: 234,
    description: 'Professional residential and commercial cleaning services. Deep cleaning, regular maintenance, and specialized cleaning solutions.',
    shortDescription: 'House Cleaning, Deep Cleaning, Commercial Cleaning',
    location: 'Baguio City',
    address: '456 Harrison Road, Baguio City, Benguet',
    phone: '+63 917 234 5678',
    email: 'clean@freshnest.com',
    website: 'https://fresh-nest.com',
    schedule: {
      monday: { open: '07:00', close: '19:00', isOpen: true },
      tuesday: { open: '07:00', close: '19:00', isOpen: true },
      wednesday: { open: '07:00', close: '19:00', isOpen: true },
      thursday: { open: '07:00', close: '19:00', isOpen: true },
      friday: { open: '07:00', close: '19:00', isOpen: true },
      saturday: { open: '08:00', close: '17:00', isOpen: true },
      sunday: { open: '09:00', close: '15:00', isOpen: true },
    },
    priceRange: { min: 800, max: 5000, currency: 'PHP' },
    services: [
      { name: 'Regular House Cleaning', price: 1200, duration: 180 },
      { name: 'Deep Cleaning Service', price: 2500, duration: 360 },
      { name: 'Commercial Cleaning', price: 3000, duration: 240 },
      { name: 'Post-Construction Cleanup', price: 4000, duration: 480 },
    ],
    amenities: ['Eco-friendly Products', 'Insured Staff', 'Flexible Scheduling', 'Card Payment', 'Satisfaction Guarantee'],
    isPromo: false,
    isFeatured: true,
    isVerified: true,
    createdAt: new Date('2024-02-05'),
    updatedAt: new Date('2024-06-15'),
  },
  {
    id: 'hs_003',
    name: 'SwiftFix Plumbing Services',
    category: 'home-services' as ServiceCategory,
    subcategory: 'plumbing-services',
    image: require('../../assets/images/swiftfix.png'),
    rating: 4.7,
    reviewCount: 98,
    description: 'Specialized plumbing services including pipe repairs, drain cleaning, water heater installation, and emergency plumbing solutions.',
    shortDescription: 'Pipe Repairs, Drain Cleaning, Water Heater Service',
    location: 'Session Road, Baguio City',
    address: '789 Session Road, Baguio City, Benguet',
    phone: '+63 917 345 6789',
    email: 'fix@swiftfix.com',
    website: 'https://swiftfix-plumbing.com',
    schedule: {
      monday: { open: '08:00', close: '20:00', isOpen: true },
      tuesday: { open: '08:00', close: '20:00', isOpen: true },
      wednesday: { open: '08:00', close: '20:00', isOpen: true },
      thursday: { open: '08:00', close: '20:00', isOpen: true },
      friday: { open: '08:00', close: '20:00', isOpen: true },
      saturday: { open: '08:00', close: '18:00', isOpen: true },
      sunday: { open: '09:00', close: '17:00', isOpen: true },
    },
    priceRange: { min: 600, max: 6000, currency: 'PHP' },
    services: [
      { name: 'Pipe Repair', price: 1000, duration: 120 },
      { name: 'Drain Cleaning', price: 800, duration: 90 },
      { name: 'Water Heater Installation', price: 3500, duration: 180 },
      { name: 'Emergency Plumbing', price: 1500, duration: 60 },
    ],
    amenities: ['24/7 Emergency Service', 'Licensed Plumbers', 'Quality Parts', 'Card Payment', 'Warranty'],
    isPromo: true,
    promoText: 'Free diagnostic with repair service',
    isFeatured: false,
    isVerified: true,
    createdAt: new Date('2024-03-08'),
    updatedAt: new Date('2024-06-12'),
  },
  {
    id: 'hs_004',
    name: 'PowerPro Electrical Services',
    category: 'home-services' as ServiceCategory,
    subcategory: 'electrical-services',
    image: require('../../assets/images/powerpro.png'),
    rating: 4.6,
    reviewCount: 87,
    description: 'Professional electrical services including wiring installation, electrical repairs, panel upgrades, and safety inspections.',
    shortDescription: 'Wiring, Electrical Repairs, Panel Upgrades, Inspections',
    location: 'Magsaysay Avenue, Baguio City',
    address: '321 Magsaysay Avenue, Baguio City, Benguet',
    phone: '+63 917 456 7890',
    email: 'power@powerpro.com',
    website: 'https://powerpro-electrical.com',
    schedule: {
      monday: { open: '08:00', close: '17:00', isOpen: true },
      tuesday: { open: '08:00', close: '17:00', isOpen: true },
      wednesday: { open: '08:00', close: '17:00', isOpen: true },
      thursday: { open: '08:00', close: '17:00', isOpen: true },
      friday: { open: '08:00', close: '17:00', isOpen: true },
      saturday: { open: '08:00', close: '15:00', isOpen: true },
      sunday: { open: '09:00', close: '12:00', isOpen: false },
    },
    priceRange: { min: 800, max: 15000, currency: 'PHP' },
    services: [
      { name: 'Electrical Repair', price: 1200, duration: 120 },
      { name: 'Outlet Installation', price: 500, duration: 45 },
      { name: 'Panel Upgrade', price: 8000, duration: 360 },
      { name: 'Safety Inspection', price: 800, duration: 60 },
    ],
    amenities: ['Licensed Electricians', 'Safety Certified', 'Emergency Service', 'Card Payment', 'Code Compliance'],
    isPromo: false,
    isFeatured: false,
    isVerified: true,
    createdAt: new Date('2024-01-28'),
    updatedAt: new Date('2024-06-10'),
  },
  {
    id: 'hs_005',
    name: 'Harmony Garden Services',
    category: 'home-services' as ServiceCategory,
    subcategory: 'landscaping-gardening',
    image: require('../../assets/images/harmony.png'),
    rating: 4.8,
    reviewCount: 112,
    description: 'Complete landscaping and gardening services including garden design, lawn maintenance, tree care, and outdoor beautification.',
    shortDescription: 'Landscaping, Garden Design, Lawn Care, Tree Service',
    location: 'Camp 7, Baguio City',
    address: '654 Camp 7, Baguio City, Benguet',
    phone: '+63 917 567 8901',
    email: 'garden@harmony.com',
    website: 'https://harmony-gardens.com',
    schedule: {
      monday: { open: '07:00', close: '17:00', isOpen: true },
      tuesday: { open: '07:00', close: '17:00', isOpen: true },
      wednesday: { open: '07:00', close: '17:00', isOpen: true },
      thursday: { open: '07:00', close: '17:00', isOpen: true },
      friday: { open: '07:00', close: '17:00', isOpen: true },
      saturday: { open: '07:00', close: '17:00', isOpen: true },
      sunday: { open: '08:00', close: '15:00', isOpen: false },
    },
    priceRange: { min: 1000, max: 12000, currency: 'PHP' },
    services: [
      { name: 'Garden Maintenance', price: 1500, duration: 240 },
      { name: 'Landscape Design', price: 5000, duration: 180 },
      { name: 'Tree Trimming', price: 2000, duration: 180 },
      { name: 'Lawn Installation', price: 8000, duration: 480 },
    ],
    amenities: ['Professional Equipment', 'Plant Guarantee', 'Design Consultation', 'Card Payment', 'Seasonal Service'],
    isPromo: true,
    promoText: 'Free consultation with landscaping project',
    isFeatured: true,
    isVerified: true,
    createdAt: new Date('2024-02-18'),
    updatedAt: new Date('2024-06-16'),
  },
];

/**
 * Home Services API Class
 * Simulates API calls with realistic delays
 */
export class HomeServicesAPI {
  /**
   * Simulate network delay
   */
  private static delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Get all home services
   */
  static async getAllServices(): Promise<Service[]> {
    await this.delay(800);
    return [...homeServicesData];
  }

  /**
   * Get featured services only
   */
  static async getFeaturedServices(): Promise<Service[]> {
    await this.delay(600);
    return homeServicesData.filter(service => service.isFeatured);
  }

  /**
   * Get services with promotional offers
   */
  static async getPromoServices(): Promise<Service[]> {
    await this.delay(500);
    return homeServicesData.filter(service => service.isPromo);
  }

  /**
   * Search services by name or description
   */
  static async searchServices(query: string): Promise<Service[]> {
    await this.delay(400);
    
    if (!query.trim()) {
      return [...homeServicesData];
    }

    const searchTerm = query.toLowerCase();
    return homeServicesData.filter(service => 
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
    return homeServicesData.find(service => service.id === id) || null;
  }

  /**
   * Get services by subcategory
   */
  static async getServicesBySubcategory(subcategory: string): Promise<Service[]> {
    await this.delay(400);
    return homeServicesData.filter(service => service.subcategory === subcategory);
  }

  /**
   * Get available booking slots for a service
   */
  static async getAvailableSlots(serviceId: string, date: Date): Promise<BookingSlot[]> {
    await this.delay(600);
    
    const service = homeServicesData.find(s => s.id === serviceId);
    if (!service) {
      throw new Error('Service not found');
    }

    // Generate realistic available slots for home services (usually longer appointments)
    const slots: BookingSlot[] = [];
    const dayOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][date.getDay()];
    const schedule = service.schedule[dayOfWeek as keyof typeof service.schedule];

    if (schedule.isOpen) {
      const startHour = parseInt(schedule.open.split(':')[0]);
      const endHour = parseInt(schedule.close.split(':')[0]);
      
      // Generate 2-hour time slots for home services
      for (let hour = startHour; hour < endHour - 1; hour += 2) {
        if (Math.random() > 0.3) { // 70% chance slot is available
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
    
    const totalServices = homeServicesData.length;
    const averageRating = homeServicesData.reduce((sum, service) => sum + service.rating, 0) / totalServices;
    const totalReviews = homeServicesData.reduce((sum, service) => sum + service.reviewCount, 0);
    const featuredCount = homeServicesData.filter(s => s.isFeatured).length;
    const promoCount = homeServicesData.filter(s => s.isPromo).length;

    return {
      totalServices,
      averageRating: Math.round(averageRating * 10) / 10,
      totalReviews,
      featuredCount,
      promoCount,
    };
  }
}

export default HomeServicesAPI;
