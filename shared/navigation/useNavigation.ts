import { useRouter as useSolitoRouter } from 'solito/router';

/**
 * Cross-platform navigation interface
 * Provides unified navigation methods for both Expo Router and Next.js via Solito
 */
export interface NavigationParams {
  pathname: string;
  params?: Record<string, any>;
}

export interface CrossPlatformNavigation {
  push: (route: string | NavigationParams) => void;
  replace: (route: string | NavigationParams) => void;
  back: () => void;
  canGoBack: () => boolean;
}

/**
 * Custom hook for cross-platform navigation using Solito
 * Works seamlessly across Expo and Next.js
 */
export function useCrossPlatformNavigation(): CrossPlatformNavigation {
  const router = useSolitoRouter();
  
  return {
    push: (route) => {
      if (typeof route === 'string') {
        router.push(route);
      } else {
        const queryString = route.params 
          ? '?' + new URLSearchParams(route.params).toString()
          : '';
        router.push(route.pathname + queryString);
      }
    },
    replace: (route) => {
      if (typeof route === 'string') {
        router.replace(route);
      } else {
        const queryString = route.params 
          ? '?' + new URLSearchParams(route.params).toString()
          : '';
        router.replace(route.pathname + queryString);
      }
    },
    back: () => router.back(),
    canGoBack: () => {
      // Fallback for platforms that don't support canGoBack
      try {
        return typeof window !== 'undefined' ? window.history.length > 1 : false;
      } catch {
        return false;
      }
    },
  };
}

// Route mapping between platforms
export const ROUTES = {
  HOME: '/',
  SERVICES: '/services',
  HEALTH_WELLNESS: '/(services)/health-wellness',
  BEAUTY_CARE: '/(services)/beauty-personal-care',
  FITNESS_SPORTS: '/(services)/fitness-sports',
  AUTOMOTIVE: '/(services)/automotive-services',
  HOME_SERVICES: '/(services)/home-services',
  TECH_IT: '/(services)/tech-it-services',
  BOOKING_DETAILS: '/(booking)/details',
  BOOKING_SUMMARY: '/(booking)/summary',
  BOOKING_CONFIRMATION: '/(booking)/confirmation',
  APPOINTMENT_HISTORY: '/AppointmentHistory',
  PROFILE: '/profile',
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RouteValue = typeof ROUTES[RouteKey];

/**
 * Helper function to navigate to a specific route
 */
export function navigateToRoute(navigation: CrossPlatformNavigation, route: RouteKey) {
  navigation.push(ROUTES[route]);
}

/**
 * Helper function to navigate to business booking with parameters
 */
export function navigateToBusinessBooking(navigation: CrossPlatformNavigation, businessId: string) {
  navigation.push({
    pathname: '/(booking)/details',
    params: { businessId }
  });
}
