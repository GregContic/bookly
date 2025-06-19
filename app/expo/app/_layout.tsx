import { Stack, useRouter, useSegments } from "expo-router";
import React, { useEffect } from 'react';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { BookingProvider } from '../context/BookingContext';

function RootLayoutNav() {
  const { user, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!user && !inAuthGroup) {      // Redirect to the login page if not logged in
      router.replace('/(auth)/login');
    } else if (user && inAuthGroup) {
      // Redirect to the home page if logged in
      router.replace('/(drawer)/(tabs)/home');
    }
  }, [user, segments, isLoading]);  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}    >
      <Stack.Screen name="index" />
      <Stack.Screen name="(drawer)" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(services)" />
      <Stack.Screen name="(booking)" />
      <Stack.Screen name="(account)" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <BookingProvider>
        <RootLayoutNav />
      </BookingProvider>
    </AuthProvider>
  );
}