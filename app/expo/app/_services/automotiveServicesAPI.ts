import { BookingSlot, Service, ServiceCategory } from '../_types/interfaces';

/**
 * Automotive Services Data
 * Simulates database records with realistic data
 */
const automotiveServicesData: Service[] = [
  {
    id: 'auto_001',
    name: 'AutoCare Pro Service Center',
    category: 'automotive-services' as ServiceCategory,
    subcategory: 'general-auto-service',
    image: require('../../assets/images/autocare.png'),
    rating: 4.8,
    reviewCount: 142,
    description: 'Complete automotive maintenance and repair services including oil changes, brake services, and general car maintenance. Professional mechanics with years of experience.',
    shortDescription: 'Complete Auto Maintenance, Oil Change, Brake Service',
    location: 'Marcos Highway, Baguio City',
    address: '123 Marcos Highway, Baguio City, Benguet',
    phone: '+63 917 345 6789',
    email: 'service@autocarepro.com',
    website: 'https://autocarepro.com',
    schedule: {
      monday: { open: '08:00', close: '18:00', isOpen: true },
      tuesday: { open: '08:00', close: '18:00', isOpen: true },
      wednesday: { open: '08:00', close: '18:00', isOpen: true },
      thursday: { open: '08:00', close: '18:00', isOpen: true },
      friday: { open: '08:00', close: '18:00', isOpen: true },
      saturday: { open: '08:00', close: '18:00', isOpen: true },
      sunday: { open: '09:00', close: '15:00', isOpen: false },
    },
    priceRange: { min: 500, max: 15000, currency: 'PHP' },
    services: [
      { name: 'Oil Change', price: 800, duration: 30 },
      { name: 'Brake Service', price: 2500, duration: 60 },
      { name: 'General Maintenance', price: 1500, duration: 90 },
      { name: 'Engine Diagnostics', price: 1200, duration: 45 },
    ],
    amenities: ['WiFi', 'Waiting Area', 'Parking', 'Card Payment', 'Warranty'],
    isPromo: true,
    promoText: '10% off on maintenance packages',
    isFeatured: true,
    isVerified: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-06-18'),
  },
  {
    id: 'auto_002',
    name: 'SpeedMaster Auto Repair',
    category: 'automotive-services' as ServiceCategory,
    subcategory: 'auto-repair',
    image: require('../../assets/images/speedmaster.png'),
    rating: 4.9,
    reviewCount: 198,
    description: 'Specialized automotive repair services including engine repair, transmission services, and AC repair. Expert technicians with advanced diagnostic tools.',
    shortDescription: 'Engine Repair, Transmission, AC Service',
    location: 'Abanao Street, Baguio City',
    address: '456 Abanao Street, Baguio City, Benguet',
    phone: '+63 917 456 7890',
    email: 'info@speedmaster.com',
    website: 'https://speedmaster-auto.com',
    schedule: {
      monday: { open: '07:00', close: '19:00', isOpen: true },
      tuesday: { open: '07:00', close: '19:00', isOpen: true },
      wednesday: { open: '07:00', close: '19:00', isOpen: true },
      thursday: { open: '07:00', close: '19:00', isOpen: true },
      friday: { open: '07:00', close: '19:00', isOpen: true },
      saturday: { open: '07:00', close: '19:00', isOpen: true },
      sunday: { open: '08:00', close: '17:00', isOpen: false },
    },
    priceRange: { min: 800, max: 25000, currency: 'PHP' },
    services: [
      { name: 'Engine Repair', price: 5000, duration: 180 },
      { name: 'Transmission Service', price: 8000, duration: 240 },
      { name: 'AC Repair', price: 3000, duration: 90 },
      { name: 'Electrical Diagnostics', price: 2000, duration: 60 },
    ],
    amenities: ['WiFi', 'Air Conditioning', 'Parking', 'Card Payment', 'Towing Service'],
    isPromo: false,
    isFeatured: true,
    isVerified: true,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-06-15'),
  },
  {
    id: 'auto_003',
    name: 'PowerPro Auto Services',
    category: 'automotive-services' as ServiceCategory,
    subcategory: 'tire-services',
    image: require('../../assets/images/powerpro.png'),
    rating: 4.7,
    reviewCount: 89,
    description: 'Comprehensive tire services, wheel alignment, and battery replacement. Quality parts and professional installation.',
    shortDescription: 'Tire Services, Wheel Alignment, Battery Replacement',
    location: 'Session Road, Baguio City',
    address: '789 Session Road, Baguio City, Benguet',
    phone: '+63 917 567 8901',
    email: 'service@powerpro.com',
    website: 'https://powerpro-auto.com',
    schedule: {
      monday: { open: '08:00', close: '17:00', isOpen: true },
      tuesday: { open: '08:00', close: '17:00', isOpen: true },
      wednesday: { open: '08:00', close: '17:00', isOpen: true },
      thursday: { open: '08:00', close: '17:00', isOpen: true },
      friday: { open: '08:00', close: '17:00', isOpen: true },
      saturday: { open: '08:00', close: '17:00', isOpen: true },
      sunday: { open: '09:00', close: '15:00', isOpen: false },
    },
    priceRange: { min: 600, max: 8000, currency: 'PHP' },
    services: [
      { name: 'Tire Installation', price: 1200, duration: 45 },
      { name: 'Wheel Alignment', price: 2000, duration: 60 },
      { name: 'Battery Replacement', price: 3500, duration: 30 },
      { name: 'Tire Balancing', price: 800, duration: 30 },
    ],
    amenities: ['WiFi', 'Waiting Area', 'Parking', 'Card Payment'],
    isPromo: true,
    promoText: 'Free tire rotation with purchase',
    isFeatured: false,
    isVerified: true,
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-06-12'),
  },
  {
    id: 'auto_004',
    name: 'Titan Auto Repair Hub',
    category: 'automotive-services' as ServiceCategory,
    subcategory: 'collision-repair',
    image: require('../../assets/images/titanauto.png'),
    rating: 4.6,
    reviewCount: 67,
    description: 'Collision repair and auto body services. Professional paint jobs and dent removal with insurance claim assistance.',
    shortDescription: 'Collision Repair, Auto Body, Paint Services',
    location: 'Magsaysay Avenue, Baguio City',
    address: '321 Magsaysay Avenue, Baguio City, Benguet',
    phone: '+63 917 678 9012',
    email: 'repairs@titanauto.com',
    website: 'https://titan-auto.com',
    schedule: {
      monday: { open: '08:00', close: '17:00', isOpen: true },
      tuesday: { open: '08:00', close: '17:00', isOpen: true },
      wednesday: { open: '08:00', close: '17:00', isOpen: true },
      thursday: { open: '08:00', close: '17:00', isOpen: true },
      friday: { open: '08:00', close: '17:00', isOpen: true },
      saturday: { open: '08:00', close: '15:00', isOpen: true },
      sunday: { open: '09:00', close: '12:00', isOpen: false },
    },
    priceRange: { min: 2000, max: 50000, currency: 'PHP' },
    services: [
      { name: 'Dent Removal', price: 3000, duration: 120 },
      { name: 'Paint Job', price: 15000, duration: 480 },
      { name: 'Collision Repair', price: 25000, duration: 720 },
      { name: 'Insurance Estimate', price: 500, duration: 30 },
    ],
    amenities: ['WiFi', 'Insurance Processing', 'Parking', 'Card Payment', 'Loaner Cars'],
    isPromo: false,
    isFeatured: false,
    isVerified: true,
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-06-10'),
  },
];

/**
 * Automotive Services API Class
 * Simulates API calls with realistic delays
 */
export class AutomotiveServicesAPI {
  /**
   * Simulate network delay
   */
  private static delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Get all automotive services
   */
  static async getAllServices(): Promise<Service[]> {
    await this.delay(800);
    return [...automotiveServicesData];
  }

  /**
   * Get featured services only
   */
  static async getFeaturedServices(): Promise<Service[]> {
    await this.delay(600);
    return automotiveServicesData.filter(service => service.isFeatured);
  }

  /**
   * Get services with promotional offers
   */
  static async getPromoServices(): Promise<Service[]> {
    await this.delay(500);
    return automotiveServicesData.filter(service => service.isPromo);
  }

  /**
   * Search services by name or description
   */
  static async searchServices(query: string): Promise<Service[]> {
    await this.delay(400);
    
    if (!query.trim()) {
      return [...automotiveServicesData];
    }

    const searchTerm = query.toLowerCase();
    return automotiveServicesData.filter(service => 
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
    return automotiveServicesData.find(service => service.id === id) || null;
  }

  /**
   * Get services by subcategory
   */
  static async getServicesBySubcategory(subcategory: string): Promise<Service[]> {
    await this.delay(400);
    return automotiveServicesData.filter(service => service.subcategory === subcategory);
  }

  /**
   * Get available booking slots for a service
   */
  static async getAvailableSlots(serviceId: string, date: Date): Promise<BookingSlot[]> {
    await this.delay(600);
    
    const service = automotiveServicesData.find(s => s.id === serviceId);
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
          if (Math.random() > 0.4) { // 60% chance slot is available
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
    
    const totalServices = automotiveServicesData.length;
    const averageRating = automotiveServicesData.reduce((sum, service) => sum + service.rating, 0) / totalServices;
    const totalReviews = automotiveServicesData.reduce((sum, service) => sum + service.reviewCount, 0);
    const featuredCount = automotiveServicesData.filter(s => s.isFeatured).length;
    const promoCount = automotiveServicesData.filter(s => s.isPromo).length;

    return {
      totalServices,
      averageRating: Math.round(averageRating * 10) / 10,
      totalReviews,
      featuredCount,
      promoCount,
    };
  }
}

export default AutomotiveServicesAPI;
