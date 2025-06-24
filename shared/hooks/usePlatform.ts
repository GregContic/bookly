import { Dimensions, Platform } from 'react-native';

/**
 * Platform detection utilities
 */
export const isWeb = Platform.OS === 'web';
export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const isNative = Platform.OS !== 'web';

/**
 * Cross-platform styling utilities
 */
export function createPlatformStyles<T>(styles: {
  web?: T;
  ios?: T;
  android?: T;
  native?: T;
  default: T;
}): T {
  return Platform.select({
    web: styles.web || styles.default,
    ios: styles.ios || styles.native || styles.default,
    android: styles.android || styles.native || styles.default,
    default: styles.default,
  }) as T;
}

/**
 * Responsive design utilities
 */
export function useResponsiveDimensions() {
  const { width, height } = Dimensions.get('window');
  
  return {
    width,
    height,
    scale: width / 375, // Base scale for iPhone X
    isTablet: width >= 768,
    isDesktop: width >= 1024,
    isMobile: width < 768,
  };
}

/**
 * Cross-platform navigation helpers
 */
export function formatRouteForPlatform(route: string, params?: Record<string, any>): string {
  if (isWeb && params) {
    const searchParams = new URLSearchParams(params);
    return `${route}?${searchParams.toString()}`;
  }
  return route;
}

/**
 * Asset path helpers for cross-platform images
 */
export function getAssetPath(path: string): any {
  if (isWeb) {
    // For Next.js, return the public path
    return path.replace('require(', '').replace(')', '').replace(/['"]/g, '');
  } else {
    // For React Native, return the require statement
    return path;
  }
}
