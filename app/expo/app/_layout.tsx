import { Stack, useRouter, useSegments } from "expo-router";
import React, { useEffect } from 'react';
import { disableRouteDebugOverlay } from './config/routerConfig';
import { AuthProvider, useAuth } from './context/AuthContext';

// Disable route debug overlay
disableRouteDebugOverlay();

function RootLayoutNav() {
  const { user, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === 'sign in' || segments[0] === 'sign up';

    if (!user && !inAuthGroup) {      // Redirect to the login page if not logged in
      router.replace('/sign in/LogInPage');
    } else if (user && inAuthGroup) {      // Redirect to the home page if logged in
      router.replace('/(tabs)/home');
    }
  }, [user, segments, isLoading]);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="HomePage" />
      <Stack.Screen name="ServicesPage" />
      <Stack.Screen name="LogInPage" />
      <Stack.Screen name="RegistrationPage" />
      <Stack.Screen name="Profile" />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}