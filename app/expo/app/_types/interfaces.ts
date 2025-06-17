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
}

// Service category types
export type ServiceCategory = 
  | 'Health & Wellness'
  | 'Beauty & Personal Care'  | 'Automotive Services'
  | 'Tech & IT Services'
  | 'Fitness & Sports'
  | 'Home Services';

const interfaces = {
  TileProps: {} as TileProps,
  InfoCardProps: {} as InfoCardProps,
  ServiceData: {} as ServiceData,
  ServiceCategory: '' as ServiceCategory
};

export default interfaces;
