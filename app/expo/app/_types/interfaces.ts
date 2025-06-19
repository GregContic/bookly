// Interface for Props
export interface TileProps {
  label: string;
  onPress: () => void;
  iconName?: string;
  imageSource?: any;
}

export interface InfoCardProps {
  title: string;
  description: string;
  onPress: () => void;
  imageSource: any;
}

// Service category types
export type ServiceCategory = 
  | 'health-wellness'
  | 'beauty-personal-care'
  | 'automotive-services'
  | 'tech-it-services'
  | 'fitness-sports'
  | 'home-services';

// Schedule interface
export interface DaySchedule {
  open: string;
  close: string;
  isOpen: boolean;
}

export interface WeekSchedule {
  monday: DaySchedule;
  tuesday: DaySchedule;
  wednesday: DaySchedule;
  thursday: DaySchedule;
  friday: DaySchedule;
  saturday: DaySchedule;
  sunday: DaySchedule;
}

// Price range interface
export interface PriceRange {
  min: number;
  max: number;
  currency: string;
}

// Service item interface
export interface ServiceItem {
  name: string;
  price: number;
  duration: number; // in minutes
}

// Booking slot interface
export interface BookingSlot {
  id: string;
  time: string;
  isAvailable: boolean;
  date: Date;
}

// Review interface
export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: Date;
}

// Main Service interface
export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  subcategory: string;
  image: any;
  rating: number;
  reviewCount: number;
  description: string;
  shortDescription: string;
  location: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  schedule: WeekSchedule;
  priceRange: PriceRange;
  services: ServiceItem[];
  amenities: string[];
  isPromo: boolean;
  promoText?: string;
  isFeatured: boolean;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Legacy interface for backwards compatibility
export interface ServiceData {
  id: string | number;
  name: string;
  category?: string;
  subcategory?: string;
  image: any;
  rating: number;
  reviews: number;
  description: string;
  location?: string;
  schedule?: string;
  price?: string;
  tags?: string[];
  isPromo?: boolean;
}

// API Response types
export interface APIResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
  timestamp: Date;
}

export interface ServiceStats {
  totalServices: number;
  averageRating: number;
  totalReviews: number;
  featuredCount: number;
  promoCount: number;
}

const interfaces = {
  TileProps: {} as TileProps,
  InfoCardProps: {} as InfoCardProps,
  ServiceData: {} as ServiceData,
  Service: {} as Service,
  ServiceCategory: '' as ServiceCategory
};

export default interfaces;
