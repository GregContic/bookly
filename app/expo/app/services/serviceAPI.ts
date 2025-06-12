import getEnvVars from '../config/environment';
import { APIResponse, BookingData, ReviewData, ServiceCategory, ServiceData, UserData } from '../types/interfaces';
import { handleError } from '../utils/helpers';

const { apiUrl } = getEnvVars();

const TIMEOUT_MS = 5000; // 5 second timeout
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000; // 1 second between retries

class ServiceAPI {
  private baseUrl: string = apiUrl;
  private authToken?: string;

  setAuthToken(token: string) {
    this.authToken = token;
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.authToken) {
      headers['Authorization'] = `Bearer ${this.authToken}`;
    }

    return headers;
  }

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
      const fetchOptions = {
        ...options,
        headers: {
          ...this.getHeaders(),
          ...options?.headers,
        },
      };
      return await this.retryFetch<T>(endpoint, fetchOptions);
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

  // Service Methods
  async getMostBookedServices(): Promise<APIResponse<ServiceData[]>> {
    return this.fetchApi<APIResponse<ServiceData[]>>('/services/most-booked');
  }

  async getServicesByCategory(category: ServiceCategory): Promise<APIResponse<ServiceData[]>> {
    return this.fetchApi<APIResponse<ServiceData[]>>(`/services/category/${encodeURIComponent(category)}`);
  }

  async searchServices(query: string): Promise<APIResponse<ServiceData[]>> {
    return this.fetchApi<APIResponse<ServiceData[]>>(`/services/search?q=${encodeURIComponent(query)}`);
  }

  async getServiceDetails(id: number): Promise<APIResponse<ServiceData>> {
    return this.fetchApi<APIResponse<ServiceData>>(`/services/${id}`);
  }

  // Booking Methods
  async createBooking(bookingData: Omit<BookingData, 'id' | 'status' | 'createdAt' | 'updatedAt'>): Promise<APIResponse<BookingData>> {
    return this.fetchApi<APIResponse<BookingData>>('/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    });
  }

  async getBookingsByUser(userId: number): Promise<APIResponse<BookingData[]>> {
    return this.fetchApi<APIResponse<BookingData[]>>(`/bookings/user/${userId}`);
  }

  async updateBookingStatus(bookingId: number, status: string): Promise<APIResponse<BookingData>> {
    return this.fetchApi<APIResponse<BookingData>>(`/bookings/${bookingId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  async cancelBooking(bookingId: number): Promise<APIResponse<BookingData>> {
    return this.fetchApi<APIResponse<BookingData>>(`/bookings/${bookingId}/cancel`, {
      method: 'POST',
    });
  }

  // Review Methods
  async createReview(reviewData: Omit<ReviewData, 'id' | 'createdAt'>): Promise<APIResponse<ReviewData>> {
    return this.fetchApi<APIResponse<ReviewData>>('/reviews', {
      method: 'POST',
      body: JSON.stringify(reviewData),
    });
  }

  async getServiceReviews(serviceId: number): Promise<APIResponse<ReviewData[]>> {
    return this.fetchApi<APIResponse<ReviewData[]>>(`/reviews/service/${serviceId}`);
  }

  async getUserReviews(userId: number): Promise<APIResponse<ReviewData[]>> {
    return this.fetchApi<APIResponse<ReviewData[]>>(`/reviews/user/${userId}`);
  }

  // User Methods
  async getUserProfile(userId: number): Promise<APIResponse<UserData>> {
    return this.fetchApi<APIResponse<UserData>>(`/users/${userId}`);
  }

  async updateUserProfile(userId: number, userData: Partial<UserData>): Promise<APIResponse<UserData>> {
    return this.fetchApi<APIResponse<UserData>>(`/users/${userId}`, {
      method: 'PATCH',
      body: JSON.stringify(userData),
    });
  }

  async updateUserPreferences(userId: number, preferences: UserData['preferences']): Promise<APIResponse<UserData>> {
    return this.fetchApi<APIResponse<UserData>>(`/users/${userId}/preferences`, {
      method: 'PATCH',
      body: JSON.stringify(preferences),
    });
  }

  // Mock data for development
  private getMockData<T>(endpoint: string): T {
    if (endpoint.includes('/services/most-booked')) {
      return {
        success: true,
        data: [
          {
            id: 1,
            name: 'The Spa Wellness',
            image: require('../../assets/images/spa-wellness.png'),
            rating: 4.95,
            reviews: 1238,
            description: 'A sanctuary of relaxation offering rejuvenating massages and treatments.',
            price: 89.99,
            category: 'Health & Wellness',
            duration: 60,
            available: true,
            location: {
              address: '123 Wellness Street',
              city: 'Metro Manila',
              coordinates: {
                latitude: 14.5995,
                longitude: 120.9842,
              },
            },
          },
          // Add more mock services as needed
        ],
      } as unknown as T;
    }
    throw new Error('No mock data available for this endpoint');
  }
}

export const serviceAPI = new ServiceAPI();
