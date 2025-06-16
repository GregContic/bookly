// Format rating to display with correct decimal places
export const formatRating = (rating: number): string => {
  return rating.toFixed(1);
};

// Format number of reviews to k format if > 1000
export const formatReviewCount = (count: number): string => {
  return count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count.toString();
};

// Validation utilities
export const validators = {
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },
  
  isValidPhoneNumber: (phone: string): boolean => {
    const phoneRegex = /^\+?[1-9]\d{9,14}$/;
    return phoneRegex.test(phone);
  }
};

// Error handling
export const handleError = (error: any): string => {
  if (typeof error === 'string') return error;
  if (error.message) return error.message;
  return 'An unexpected error occurred';
};
