import { Service } from '../_types/interfaces';
import { AutomotiveServicesAPI } from './automotiveServicesAPI';
import { BeautyPersonalCareAPI } from './beautyPersonalCareAPI';
import { FitnessSportsAPI } from './fitnessSportsAPI';
import { HealthWellnessAPI } from './healthWellnessAPI';
import { HomeServicesAPI } from './homeServicesAPI';
import { TechItServicesAPI } from './techItServicesAPI';

/**
 * Services Aggregator API
 * Combines all service categories into a unified API
 * Provides methods to fetch services from all categories or specific ones
 */
export class ServicesAggregatorAPI {
  
  /**
   * Simulate network delay
   */
  private static delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Get all services from all categories
   */
  static async getAllServices(): Promise<Service[]> {
    await this.delay(1000);
    
    try {
      const [
        beautyServices,
        fitnessServices,
        healthServices,
        homeServices,
        techServices,
        autoServices
      ] = await Promise.all([
        BeautyPersonalCareAPI.getAllServices(),
        FitnessSportsAPI.getAllServices(),
        HealthWellnessAPI.getAllServices(),
        HomeServicesAPI.getAllServices(),
        TechItServicesAPI.getAllServices(),
        AutomotiveServicesAPI.getAllServices()
      ]);

      // Combine all services and sort by rating (highest first)
      const allServices = [
        ...beautyServices,
        ...fitnessServices,
        ...healthServices,
        ...homeServices,
        ...techServices,
        ...autoServices
      ].sort((a, b) => b.rating - a.rating);

      return allServices;
    } catch (error) {
      console.error('Error fetching all services:', error);
      throw new Error('Failed to fetch services');
    }
  }

  /**
   * Get all featured services from all categories
   */
  static async getAllFeaturedServices(): Promise<Service[]> {
    await this.delay(800);
    
    try {
      const [
        beautyFeatured,
        fitnessFeatured,
        healthFeatured,
        homeFeatured,
        techFeatured,
        autoFeatured
      ] = await Promise.all([
        BeautyPersonalCareAPI.getFeaturedServices(),
        FitnessSportsAPI.getFeaturedServices(),
        HealthWellnessAPI.getFeaturedServices(),
        HomeServicesAPI.getFeaturedServices(),
        TechItServicesAPI.getFeaturedServices(),
        AutomotiveServicesAPI.getFeaturedServices()
      ]);

      // Combine all featured services and sort by rating
      const allFeaturedServices = [
        ...beautyFeatured,
        ...fitnessFeatured,
        ...healthFeatured,
        ...homeFeatured,
        ...techFeatured,
        ...autoFeatured
      ].sort((a, b) => b.rating - a.rating);

      return allFeaturedServices;
    } catch (error) {
      console.error('Error fetching featured services:', error);
      throw new Error('Failed to fetch featured services');
    }
  }

  /**
   * Get all services with promotional offers from all categories
   */
  static async getAllPromoServices(): Promise<Service[]> {
    await this.delay(600);
    
    try {
      const [
        beautyPromos,
        fitnessPromos,
        healthPromos,
        homePromos,
        techPromos,
        autoPromos
      ] = await Promise.all([
        BeautyPersonalCareAPI.getPromotionalServices(),
        FitnessSportsAPI.getPromoServices(),
        HealthWellnessAPI.getPromoServices(),
        HomeServicesAPI.getPromoServices(),
        TechItServicesAPI.getPromoServices(),
        AutomotiveServicesAPI.getPromoServices()
      ]);

      // Combine all promo services and sort by rating
      const allPromoServices = [
        ...beautyPromos,
        ...fitnessPromos,
        ...healthPromos,
        ...homePromos,
        ...techPromos,
        ...autoPromos
      ].sort((a, b) => b.rating - a.rating);

      return allPromoServices;
    } catch (error) {
      console.error('Error fetching promo services:', error);
      throw new Error('Failed to fetch promotional services');
    }
  }

  /**
   * Search services across all categories
   */
  static async searchAllServices(query: string): Promise<Service[]> {
    await this.delay(500);
    
    if (!query.trim()) {
      return this.getAllServices();
    }

    try {
      const [
        beautyResults,
        fitnessResults,
        healthResults,
        homeResults,
        techResults,
        autoResults
      ] = await Promise.all([
        BeautyPersonalCareAPI.searchServices(query),
        FitnessSportsAPI.searchServices(query),
        HealthWellnessAPI.searchServices(query),
        HomeServicesAPI.searchServices(query),
        TechItServicesAPI.searchServices(query),
        AutomotiveServicesAPI.searchServices(query)
      ]);

      // Combine all search results and sort by relevance (rating)
      const allSearchResults = [
        ...beautyResults,
        ...fitnessResults,
        ...healthResults,
        ...homeResults,
        ...techResults,
        ...autoResults
      ].sort((a, b) => b.rating - a.rating);

      return allSearchResults;
    } catch (error) {
      console.error('Error searching services:', error);
      throw new Error('Failed to search services');
    }
  }

  /**
   * Get services by category
   */
  static async getServicesByCategory(category: string): Promise<Service[]> {
    await this.delay(400);
    
    try {
      switch (category.toLowerCase()) {
        case 'beauty-personal-care':
        case 'beauty':
          return await BeautyPersonalCareAPI.getAllServices();
        case 'fitness-sports':
        case 'fitness':
          return await FitnessSportsAPI.getAllServices();
        case 'health-wellness':
        case 'health':
          return await HealthWellnessAPI.getAllServices();
        case 'home-services':
        case 'home':
          return await HomeServicesAPI.getAllServices();
        case 'tech-it-services':
        case 'tech':
          return await TechItServicesAPI.getAllServices();
        case 'automotive-services':
        case 'automotive':
          return await AutomotiveServicesAPI.getAllServices();
        default:
          return await this.getAllServices();
      }
    } catch (error) {
      console.error(`Error fetching services for category ${category}:`, error);
      throw new Error(`Failed to fetch services for category ${category}`);
    }
  }

  /**
   * Get service by ID from any category
   */
  static async getServiceById(id: string): Promise<Service | null> {
    await this.delay(300);
    
    try {
      // Determine which API to use based on ID prefix
      if (id.startsWith('bpc_')) {
        return await BeautyPersonalCareAPI.getServiceById(id);
      } else if (id.startsWith('fs_')) {
        return await FitnessSportsAPI.getServiceById(id);
      } else if (id.startsWith('hw_')) {
        return await HealthWellnessAPI.getServiceById(id);
      } else if (id.startsWith('hs_')) {
        return await HomeServicesAPI.getServiceById(id);
      } else if (id.startsWith('tech_')) {
        return await TechItServicesAPI.getServiceById(id);
      } else if (id.startsWith('auto_')) {
        return await AutomotiveServicesAPI.getServiceById(id);
      } else {
        // If no prefix match, search all APIs
        const allAPIs = [
          BeautyPersonalCareAPI,
          FitnessSportsAPI,
          HealthWellnessAPI,
          HomeServicesAPI,
          TechItServicesAPI,
          AutomotiveServicesAPI
        ];
        
        for (const api of allAPIs) {
          const service = await api.getServiceById(id);
          if (service) return service;
        }
        
        return null;
      }
    } catch (error) {
      console.error(`Error fetching service ${id}:`, error);
      return null;
    }
  }

  /**
   * Get combined service statistics from all categories
   */
  static async getAllServiceStats(): Promise<{
    totalServices: number;
    averageRating: number;
    totalReviews: number;
    featuredCount: number;
    promoCount: number;
    categoriesCount: number;
  }> {
    await this.delay(400);
    
    try {
      const [
        beautyStats,
        fitnessStats,
        healthStats,
        homeStats,
        techStats,
        autoStats
      ] = await Promise.all([
        BeautyPersonalCareAPI.getServiceStats(),
        FitnessSportsAPI.getServiceStats(),
        HealthWellnessAPI.getServiceStats(),
        HomeServicesAPI.getServiceStats(),
        TechItServicesAPI.getServiceStats(),
        AutomotiveServicesAPI.getServiceStats()
      ]);

      const totalServices = beautyStats.totalServices + fitnessStats.totalServices + 
                           healthStats.totalServices + homeStats.totalServices + 
                           techStats.totalServices + autoStats.totalServices;

      const totalReviews = beautyStats.totalReviews + fitnessStats.totalReviews + 
                          healthStats.totalReviews + homeStats.totalReviews + 
                          techStats.totalReviews + autoStats.totalReviews;

      const featuredCount = beautyStats.featuredCount + fitnessStats.featuredCount + 
                           healthStats.featuredCount + homeStats.featuredCount + 
                           techStats.featuredCount + autoStats.featuredCount;

      const promoCount = beautyStats.promoCount + fitnessStats.promoCount + 
                        healthStats.promoCount + homeStats.promoCount + 
                        techStats.promoCount + autoStats.promoCount;

      // Calculate weighted average rating
      const weightedRatingSum = (beautyStats.averageRating * beautyStats.totalServices) +
                               (fitnessStats.averageRating * fitnessStats.totalServices) +
                               (healthStats.averageRating * healthStats.totalServices) +
                               (homeStats.averageRating * homeStats.totalServices) +
                               (techStats.averageRating * techStats.totalServices) +
                               (autoStats.averageRating * autoStats.totalServices);

      const averageRating = Math.round((weightedRatingSum / totalServices) * 10) / 10;

      return {
        totalServices,
        averageRating,
        totalReviews,
        featuredCount,
        promoCount,
        categoriesCount: 6
      };
    } catch (error) {
      console.error('Error fetching service statistics:', error);
      throw new Error('Failed to fetch service statistics');
    }
  }
}

export default ServicesAggregatorAPI;
