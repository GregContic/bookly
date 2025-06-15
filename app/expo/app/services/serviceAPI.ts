import getEnvVars from '../config/environment';
import { ServiceData } from '../types/interfaces';
import { handleError } from '../utils/helpers';

const { apiUrl } = getEnvVars();

const TIMEOUT_MS = 5000; // 5 second timeout
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000; // 1 second between retries

class ServiceAPI {
  private baseUrl: string = apiUrl;

  private async fetchWithTimeout(input: RequestInfo, options: RequestInit = {}): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

    try {
      const response = await fetch(input, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  private async retryFetch<T>(
    endpoint: string,
    options?: RequestInit,
    retries = MAX_RETRIES
  ): Promise<T> {
    try {
      const response = await this.fetchWithTimeout(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `API Error: ${response.status} - ${errorText || response.statusText}`
        );
      }

      return await response.json();
    } catch (error: unknown) {
      if (retries > 0) {
        if (error instanceof TypeError || 
            (error instanceof Error && error.name === 'AbortError')) {
          // Only retry on network errors or timeouts
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS));
          return this.retryFetch(endpoint, options, retries - 1);
        }
      }
      throw error;
    }
  }

  // Generic fetch method with error handling
  private async fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
    try {
      return await this.retryFetch<T>(endpoint, options);
    } catch (error: unknown) {
      // Use mock data if we're in development and the server is unreachable
      if (process.env.NODE_ENV === 'development' && 
          (error instanceof TypeError || 
           (error instanceof Error && error.name === 'AbortError'))) {
        return this.getMockData<T>(endpoint);
      }
      throw new Error(handleError(error));
    }
  }

  // Mock data for development
  private getMockData<T>(endpoint: string): T {
    // Return mock data based on the endpoint
    if (endpoint.includes('/services/most-booked')) {
      return [
        {
          id: 1,
          name: 'The Spa Wellness',
          image: require('../../assets/images/spa-wellness.png'),
          rating: 4.95,
          reviews: 1238,
          description: 'A sanctuary of relaxation offering rejuvenating massages...',
        },
        // Add more mock services as needed
      ] as unknown as T;
    }
    throw new Error('No mock data available for this endpoint');
  }

  // Service methods
  async getMostBookedServices(): Promise<ServiceData[]> {
    return this.fetchApi<ServiceData[]>('/services/most-booked');
  }

  async getServicesByCategory(category: string): Promise<ServiceData[]> {
    return this.fetchApi<ServiceData[]>(`/services/category/${encodeURIComponent(category)}`);
  }

  async searchServices(query: string): Promise<ServiceData[]> {
    return this.fetchApi<ServiceData[]>(`/services/search?q=${encodeURIComponent(query)}`);
  }

  async getServiceDetails(id: number): Promise<ServiceData> {
    return this.fetchApi<ServiceData>(`/services/${id}`);
  }
}

export const serviceAPI = new ServiceAPI();
