import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';

interface User {
  email: string;
  username: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signUp: (email: string, username: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in on app start
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      setIsLoading(true);
      const userJson = await AsyncStorage.getItem('user');
      if (userJson) {
        setUser(JSON.parse(userJson));
      }
    } catch (error) {
      console.error('Error loading user:', error);
      Alert.alert('Error', 'Failed to load user data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, username: string, password: string) => {
    try {
      setIsLoading(true);
      console.log('Starting signup process...');
      
      // Check if user already exists
      const existingUser = await AsyncStorage.getItem(`user_${email}`);
      if (existingUser) {
        console.log('User already exists:', email);
        throw new Error('User already exists');
      }

      console.log('Creating new user...');
      const newUser = { email, username };
      
      // Store user data
      await Promise.all([
        AsyncStorage.setItem('user', JSON.stringify(newUser)),
        AsyncStorage.setItem(`user_${email}`, JSON.stringify(newUser)),
        AsyncStorage.setItem(`password_${email}`, password)
      ]);
      
      console.log('User data stored successfully');
      setUser(newUser);
      
      console.log('Redirecting to HomePage...');
      router.replace('/HomePage');
    } catch (error) {
      console.error('Error in signUp:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      console.log('Starting signin process...');
      
      const [storedPassword, userJson] = await Promise.all([
        AsyncStorage.getItem(`password_${email}`),
        AsyncStorage.getItem(`user_${email}`)
      ]);
      
      if (!userJson || !storedPassword) {
        console.log('User not found:', email);
        throw new Error('User not found');
      }

      if (storedPassword === password) {
        console.log('Password verified, logging in...');
        const userData = JSON.parse(userJson);
        await AsyncStorage.setItem('user', userJson);
        setUser(userData);
        router.replace('/HomePage');
      } else {
        console.log('Invalid password for user:', email);
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Error in signIn:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to sign in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      console.log('Signing out...');
      await AsyncStorage.removeItem('user');
      setUser(null);
      router.replace('/LogInPage');
    } catch (error) {
      console.error('Error in signOut:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 