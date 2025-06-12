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

// Interface for API responses
export interface ServiceData {
  id: number;
  name: string;
  image: any;
  rating: number;
  reviews: number;
  description: string;
  price: number;
  category: ServiceCategory;
  duration: number; // in minutes
  available: boolean;
  location?: {
    address: string;
    city: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    }
  };
}

export interface BookingData {
  id: number;
  serviceId: number;
  userId: number;
  date: string;
  time: string;
  status: BookingStatus;
  totalPrice: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewData {
  id: number;
  serviceId: number;
  userId: number;
  rating: number;
  comment: string;
  createdAt: string;
  images?: string[];
}

export interface UserData {
  id: number;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  preferences?: {
    notificationsEnabled: boolean;
    preferredCategories: ServiceCategory[];
  };
}

export enum BookingStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Service category types
export type ServiceCategory = 
  | 'Health & Wellness'
  | 'Beauty & Personal Care'
  | 'Automotive Services'
  | 'Tech & IT Services'
  | 'Fitness & Sports'
  | 'Home Services';
