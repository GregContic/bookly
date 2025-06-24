import { Platform } from 'react-native';
import { Service } from '../types';

// Platform-specific imports
const NativeServiceCard = Platform.select({
  native: () => require('../../app/expo/app/_components/ServiceCard').default,
  default: () => null,
});

const WebServiceCard = Platform.select({
  web: () => require('../../app/next/components/ServiceCard').default,
  default: () => null,
});

export interface CrossPlatformServiceCardProps {
  service: Service;
  onPress: (service: Service) => void;
  variant?: 'default' | 'compact';
  style?: any;
  className?: string;
}

/**
 * Cross-platform ServiceCard component
 * Automatically renders the appropriate component based on platform
 */
export function ServiceCard(props: CrossPlatformServiceCardProps) {
  if (Platform.OS === 'web') {
    const WebComponent = WebServiceCard?.();
    return WebComponent ? <WebComponent {...props} /> : null;
  } else {
    const NativeComponent = NativeServiceCard?.();
    return NativeComponent ? <NativeComponent {...props} /> : null;
  }
}

export default ServiceCard;
