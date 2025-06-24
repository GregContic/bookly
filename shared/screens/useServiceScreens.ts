import React from 'react';
import { ROUTES, useCrossPlatformNavigation } from '../navigation/useNavigation';
import { Service } from '../types';

/**
 * Shared business logic for Health & Wellness screen
 * Platform-specific UI components will consume this logic
 */
export function useHealthWellnessScreen() {
  const navigation = useCrossPlatformNavigation();
  const [services, setServices] = React.useState<Service[]>([]);
  const [featuredServices, setFeaturedServices] = React.useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = React.useState<Service[]>([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSearching, setIsSearching] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Shared business logic
  const handleServicePress = React.useCallback((service: Service) => {
    navigation.push({
      pathname: ROUTES.BOOKING_DETAILS,
      params: { 
        serviceId: service.id, 
        serviceName: service.name,
        serviceData: JSON.stringify({
          id: service.id,
          name: service.name,
          image: service.image,
          rating: service.rating,
          reviewCount: service.reviewCount,
          services: service.services,
          category: service.category
        })
      }
    });
  }, [navigation]);

  const handleSearch = React.useCallback(async (query: string) => {
    if (!query.trim()) {
      setFilteredServices(services);
      return;
    }

    try {
      setIsSearching(true);
      // Import platform-specific API
      const HealthWellnessAPI = await import('../../app/expo/app/_services/healthWellnessAPI');
      const searchResults = await HealthWellnessAPI.default.searchServices(query);
      setFilteredServices(searchResults);
    } catch (err) {
      console.error('Search error:', err);
      setFilteredServices([]);
    } finally {
      setIsSearching(false);
    }
  }, [services]);

  const loadData = React.useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Import platform-specific API
      const HealthWellnessAPI = await import('../../app/expo/app/_services/healthWellnessAPI');
      
      const [allServices, featured] = await Promise.all([
        HealthWellnessAPI.default.getAllServices(),
        HealthWellnessAPI.default.getFeaturedServices()
      ]);
      
      setServices(allServices);
      setFeaturedServices(featured);
      setFilteredServices(allServices);
      
    } catch (err) {
      console.error('Error loading data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load services');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleBack = React.useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.back();
    } else {
      navigation.replace(ROUTES.HOME);
    }
  }, [navigation]);

  // Initialize data on mount
  React.useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    // State
    services,
    featuredServices,
    filteredServices,
    searchQuery,
    isLoading,
    isSearching,
    error,
    
    // Actions
    setSearchQuery,
    handleServicePress,
    handleSearch,
    handleBack,
    loadData,
  };
}

/**
 * Shared business logic for other service screens
 * Can be extended for different service categories
 */
export function useServiceScreen(serviceType: string) {
  // Similar pattern for other service screens
  const navigation = useCrossPlatformNavigation();
  
  // Return screen-specific logic
  return {
    navigation,
    serviceType,
    // Add more shared logic as needed
  };
}
