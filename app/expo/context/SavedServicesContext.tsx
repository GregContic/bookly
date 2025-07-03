// ==========================================
// SAVED SERVICES CONTEXT
// ==========================================
// Global state management for saved/bookmarked services
// Allows adding, removing, and checking saved status across the app

import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useState } from 'react';

// ==========================================
// TYPES & INTERFACES
// ==========================================

export interface SavedService {
  id: string;
  name: string;
  image: any; // React Native image source
  rating: number;
  address: string;
  schedule: string;
  price: string;
  category: string;
}

interface SavedServicesContextType {
  savedServices: SavedService[];
  isSaved: (serviceId: string) => boolean;
  addService: (service: SavedService) => void;
  removeService: (serviceId: string) => void;
  getSavedServicesByCategory: () => { [category: string]: SavedService[] };
}

// ==========================================
// CONTEXT CREATION
// ==========================================

const SavedServicesContext = createContext<SavedServicesContextType | undefined>(undefined);

// ==========================================
// STORAGE KEYS
// ==========================================

const STORAGE_KEY = '@bookly_saved_services';

// ==========================================
// PROVIDER COMPONENT
// ==========================================

export const SavedServicesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [savedServices, setSavedServices] = useState<SavedService[]>([]);

  // ==========================================
  // STORAGE FUNCTIONS
  // ==========================================

  const loadSavedServices = async () => {
    try {
      const saved = await AsyncStorage.getItem(STORAGE_KEY);
      if (saved) {
        setSavedServices(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading saved services:', error);
    }
  };

  const saveToAsyncStorage = async (services: SavedService[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(services));
    } catch (error) {
      console.error('Error saving services:', error);
    }
  };

  // ==========================================
  // CONTEXT FUNCTIONS
  // ==========================================

  const isSaved = (serviceId: string): boolean => {
    return savedServices.some(service => service.id === serviceId);
  };

  const addService = (service: SavedService) => {
    if (!isSaved(service.id)) {
      const newSavedServices = [...savedServices, service];
      setSavedServices(newSavedServices);
      saveToAsyncStorage(newSavedServices);
      console.log('✅ Service saved:', service.name);
    }
  };

  const removeService = (serviceId: string) => {
    const newSavedServices = savedServices.filter(service => service.id !== serviceId);
    setSavedServices(newSavedServices);
    saveToAsyncStorage(newSavedServices);
    console.log('❌ Service removed from saved');
  };

  const getSavedServicesByCategory = () => {
    const grouped: { [category: string]: SavedService[] } = {};
    
    savedServices.forEach(service => {
      if (!grouped[service.category]) {
        grouped[service.category] = [];
      }
      grouped[service.category].push(service);
    });
    
    return grouped;
  };

  // Load saved services on mount
  React.useEffect(() => {
    loadSavedServices();
  }, []);

  const value: SavedServicesContextType = {
    savedServices,
    isSaved,
    addService,
    removeService,
    getSavedServicesByCategory,
  };

  return (
    <SavedServicesContext.Provider value={value}>
      {children}
    </SavedServicesContext.Provider>
  );
};

// ==========================================
// CUSTOM HOOK
// ==========================================

export const useSavedServices = (): SavedServicesContextType => {
  const context = useContext(SavedServicesContext);
  if (!context) {
    throw new Error('useSavedServices must be used within a SavedServicesProvider');
  }
  return context;
};
