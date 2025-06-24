/**
 * Shared type definitions for cross-platform components
 */

// Re-export platform types for consistency
export * from '../../app/expo/app/_types/interfaces';

// Additional cross-platform specific types
export interface PlatformViewProps {
  children: React.ReactNode;
  style?: any;
  className?: string; // For web/Tailwind
}

export interface CrossPlatformButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  style?: any;
  className?: string;
}

export interface CrossPlatformTextProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption';
  color?: string;
  style?: any;
  className?: string;
  numberOfLines?: number;
}

// Platform detection utility types
export type Platform = 'web' | 'ios' | 'android' | 'native';

export interface PlatformConfig {
  web?: any;
  ios?: any;
  android?: any;
  native?: any;
  default?: any;
}
