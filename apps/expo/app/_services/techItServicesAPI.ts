import { BookingSlot, Service, ServiceCategory } from '../_types/interfaces';

/**
 * Tech & IT Services Data
 * Simulates database records with realistic data
 */
const techItServicesData: Service[] = [
  {
    id: 'tech_001',
    name: 'ByteFix Computer Services',
    category: 'tech-it-services' as ServiceCategory,
    subcategory: 'computer-repair',
    image: require('../../assets/images/bytfix.png'),
    rating: 4.8,
    reviewCount: 189,
    description: 'Professional computer repair and maintenance services including hardware repairs, software troubleshooting, virus removal, and system optimization.',
    shortDescription: 'Computer Repair, Software Support, Virus Removal',
    location: 'Session Road, Baguio City',
    address: '123 Session Road, Baguio City, Benguet',
    phone: '+63 917 123 4567',
    email: 'support@bytefix.com',
    website: 'https://bytefix-services.com',
    schedule: {
      monday: { open: '09:00', close: '18:00', isOpen: true },
      tuesday: { open: '09:00', close: '18:00', isOpen: true },
      wednesday: { open: '09:00', close: '18:00', isOpen: true },
      thursday: { open: '09:00', close: '18:00', isOpen: true },
      friday: { open: '09:00', close: '18:00', isOpen: true },
      saturday: { open: '09:00', close: '17:00', isOpen: true },
      sunday: { open: '10:00', close: '15:00', isOpen: false },
    },
    priceRange: { min: 500, max: 8000, currency: 'PHP' },
    services: [
      { name: 'Computer Diagnostics', price: 500, duration: 60 },
      { name: 'Hardware Repair', price: 2000, duration: 180 },
      { name: 'Software Installation', price: 800, duration: 90 },
      { name: 'Data Recovery', price: 3500, duration: 240 },
    ],
    amenities: ['WiFi', 'Air Conditioning', 'Parking', 'Card Payment', 'Warranty', 'Data Backup'],
    isPromo: true,
    promoText: 'Free diagnostics with repair service',
    isFeatured: true,
    isVerified: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-06-18'),
  },
  {
    id: 'tech_002',
    name: 'PC Masters Hub',
    category: 'tech-it-services' as ServiceCategory,
    subcategory: 'pc-building',
    image: require('../../assets/images/pcmaster.png'),
    rating: 4.9,
    reviewCount: 145,
    description: 'Custom PC building, gaming computer assembly, hardware upgrades, and performance optimization. Expert technicians and quality components.',
    shortDescription: 'PC Building, Gaming Computers, Hardware Upgrades',
    location: 'Magsaysay Avenue, Baguio City',
    address: '456 Magsaysay Avenue, Baguio City, Benguet',
    phone: '+63 917 234 5678',
    email: 'build@pcmasters.com',
    website: 'https://pcmasters-hub.com',
    schedule: {
      monday: { open: '10:00', close: '19:00', isOpen: true },
      tuesday: { open: '10:00', close: '19:00', isOpen: true },
      wednesday: { open: '10:00', close: '19:00', isOpen: true },
      thursday: { open: '10:00', close: '19:00', isOpen: true },
      friday: { open: '10:00', close: '19:00', isOpen: true },
      saturday: { open: '10:00', close: '19:00', isOpen: true },
      sunday: { open: '11:00', close: '17:00', isOpen: true },
    },
    priceRange: { min: 1000, max: 150000, currency: 'PHP' },
    services: [
      { name: 'Custom PC Build', price: 5000, duration: 360 },
      { name: 'Gaming PC Assembly', price: 8000, duration: 480 },
      { name: 'Hardware Upgrade', price: 2000, duration: 120 },
      { name: 'Performance Optimization', price: 1500, duration: 90 },
    ],
    amenities: ['WiFi', 'Air Conditioning', 'Parking', 'Card Payment', 'Gaming Area', 'Component Testing'],
    isPromo: false,
    isFeatured: true,
    isVerified: true,
    createdAt: new Date('2024-02-08'),
    updatedAt: new Date('2024-06-15'),
  },
  {
    id: 'tech_003',
    name: 'SmartFix Mobile Repair',
    category: 'tech-it-services' as ServiceCategory,
    subcategory: 'mobile-repair',
    image: require('../../assets/images/smartfix-1.png'),
    rating: 4.7,
    reviewCount: 267,
    description: 'Professional mobile phone and tablet repair services including screen replacement, battery replacement, water damage repair, and software issues.',
    shortDescription: 'Phone Repair, Screen Replacement, Battery Service',
    location: 'Upper Session Road, Baguio City',
    address: '789 Upper Session Road, Baguio City, Benguet',
    phone: '+63 917 345 6789',
    email: 'repair@smartfix.com',
    website: 'https://smartfix-mobile.com',
    schedule: {
      monday: { open: '09:00', close: '20:00', isOpen: true },
      tuesday: { open: '09:00', close: '20:00', isOpen: true },
      wednesday: { open: '09:00', close: '20:00', isOpen: true },
      thursday: { open: '09:00', close: '20:00', isOpen: true },
      friday: { open: '09:00', close: '20:00', isOpen: true },
      saturday: { open: '09:00', close: '20:00', isOpen: true },
      sunday: { open: '10:00', close: '18:00', isOpen: true },
    },
    priceRange: { min: 300, max: 5000, currency: 'PHP' },
    services: [
      { name: 'Screen Replacement', price: 2500, duration: 60 },
      { name: 'Battery Replacement', price: 1200, duration: 30 },
      { name: 'Water Damage Repair', price: 3000, duration: 120 },
      { name: 'Software Fix', price: 800, duration: 45 },
    ],
    amenities: ['WiFi', 'Air Conditioning', 'Express Service', 'Card Payment', 'Warranty', 'Quality Parts'],
    isPromo: true,
    promoText: '20% off screen protector with screen replacement',
    isFeatured: true,
    isVerified: true,
    createdAt: new Date('2024-03-12'),
    updatedAt: new Date('2024-06-12'),
  },
  {
    id: 'tech_004',
    name: 'Turbo Hub Computing',
    category: 'tech-it-services' as ServiceCategory,
    subcategory: 'it-consulting',
    image: require('../../assets/images/turbo-hub.png'),
    rating: 4.6,
    reviewCount: 78,
    description: 'IT consulting and support services for businesses and individuals. Network setup, cybersecurity, cloud solutions, and technical support.',
    shortDescription: 'IT Consulting, Network Setup, Cybersecurity, Cloud Solutions',
    location: 'Burnham Park Area, Baguio City',
    address: '321 Burnham Park Area, Baguio City, Benguet',
    phone: '+63 917 456 7890',
    email: 'consult@turbohub.com',
    website: 'https://turbo-hub.com',
    schedule: {
      monday: { open: '08:00', close: '17:00', isOpen: false },
      tuesday: { open: '08:00', close: '17:00', isOpen: true },
      wednesday: { open: '08:00', close: '17:00', isOpen: true },
      thursday: { open: '08:00', close: '17:00', isOpen: true },
      friday: { open: '08:00', close: '17:00', isOpen: true },
      saturday: { open: '08:00', close: '17:00', isOpen: true },
      sunday: { open: '10:00', close: '16:00', isOpen: true },
    },
    priceRange: { min: 1500, max: 25000, currency: 'PHP' },
    services: [
      { name: 'IT Consultation', price: 2000, duration: 120 },
      { name: 'Network Setup', price: 5000, duration: 240 },
      { name: 'Security Assessment', price: 3500, duration: 180 },
      { name: 'Cloud Migration', price: 15000, duration: 480 },
    ],
    amenities: ['WiFi', 'Air Conditioning', 'Parking', 'Card Payment', 'Remote Support', 'Business Hours'],
    isPromo: false,
    isFeatured: false,
    isVerified: true,
    createdAt: new Date('2024-01-30'),
    updatedAt: new Date('2024-06-10'),
  },
  {
    id: 'tech_005',
    name: 'SoftHardware Solutions',
    category: 'tech-it-services' as ServiceCategory,
    subcategory: 'software-development',
    image: require('../../assets/images/softhardlol.png'),
    rating: 4.5,
    reviewCount: 92,
    description: 'Custom software development, web applications, mobile apps, and database solutions. Professional development team with modern technologies.',
    shortDescription: 'Software Development, Web Apps, Mobile Apps, Database',
    location: 'Camp 7, Baguio City',
    address: '654 Camp 7, Baguio City, Benguet',
    phone: '+63 917 567 8901',
    email: 'dev@softhardware.com',
    website: 'https://softhardware-solutions.com',
    schedule: {
      monday: { open: '09:00', close: '18:00', isOpen: true },
      tuesday: { open: '09:00', close: '18:00', isOpen: true },
      wednesday: { open: '09:00', close: '18:00', isOpen: true },
      thursday: { open: '09:00', close: '18:00', isOpen: true },
      friday: { open: '09:00', close: '18:00', isOpen: true },
      saturday: { open: '10:00', close: '15:00', isOpen: true },
      sunday: { open: '10:00', close: '15:00', isOpen: false },
    },
    priceRange: { min: 5000, max: 100000, currency: 'PHP' },
    services: [
      { name: 'Web Development', price: 15000, duration: 720 },
      { name: 'Mobile App Development', price: 25000, duration: 1440 },
      { name: 'Database Design', price: 8000, duration: 360 },
      { name: 'Software Consultation', price: 2500, duration: 120 },
    ],
    amenities: ['WiFi', 'Air Conditioning', 'Parking', 'Card Payment', 'Project Management', 'Agile Development'],
    isPromo: true,
    promoText: 'Free consultation for new projects',
    isFeatured: false,
    isVerified: true,
    createdAt: new Date('2024-02-25'),
    updatedAt: new Date('2024-06-16'),
  },
];

/**
 * Tech & IT Services API Class
 * Simulates API calls with realistic delays
 */
export class TechItServicesAPI {
  /**
   * Simulate network delay
   */
  private static delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Get all tech & IT services
   */
  static async getAllServices(): Promise<Service[]> {
    await this.delay(800);
    return [...techItServicesData];
  }

  /**
   * Get featured services only
   */
  static async getFeaturedServices(): Promise<Service[]> {
    await this.delay(600);
    return techItServicesData.filter(service => service.isFeatured);
  }

  /**
   * Get services with promotional offers
   */
  static async getPromoServices(): Promise<Service[]> {
    await this.delay(500);
    return techItServicesData.filter(service => service.isPromo);
  }

  /**
   * Search services by name or description
   */
  static async searchServices(query: string): Promise<Service[]> {
    await this.delay(400);
    
    if (!query.trim()) {
      return [...techItServicesData];
    }

    const searchTerm = query.toLowerCase();
    return techItServicesData.filter(service => 
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
    return techItServicesData.find(service => service.id === id) || null;
  }

  /**
   * Get services by subcategory
   */
  static async getServicesBySubcategory(subcategory: string): Promise<Service[]> {
    await this.delay(400);
    return techItServicesData.filter(service => service.subcategory === subcategory);
  }

  /**
   * Get available booking slots for a service
   */
  static async getAvailableSlots(serviceId: string, date: Date): Promise<BookingSlot[]> {
    await this.delay(600);
    
    const service = techItServicesData.find(s => s.id === serviceId);
    if (!service) {
      throw new Error('Service not found');
    }

    // Generate realistic available slots for tech services
    const slots: BookingSlot[] = [];
    const dayOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][date.getDay()];
    const schedule = service.schedule[dayOfWeek as keyof typeof service.schedule];

    if (schedule.isOpen) {
      const startHour = parseInt(schedule.open.split(':')[0]);
      const endHour = parseInt(schedule.close.split(':')[0]);
      
      // Generate hourly slots for tech services
      for (let hour = startHour; hour < endHour; hour++) {
        if (Math.random() > 0.25) { // 75% chance slot is available
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
    
    const totalServices = techItServicesData.length;
    const averageRating = techItServicesData.reduce((sum, service) => sum + service.rating, 0) / totalServices;
    const totalReviews = techItServicesData.reduce((sum, service) => sum + service.reviewCount, 0);
    const featuredCount = techItServicesData.filter(s => s.isFeatured).length;
    const promoCount = techItServicesData.filter(s => s.isPromo).length;

    return {
      totalServices,
      averageRating: Math.round(averageRating * 10) / 10,
      totalReviews,
      featuredCount,
      promoCount,
    };
  }
}

export default TechItServicesAPI;
