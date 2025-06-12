import { Stack, useRouter, useSegments } from "expo-router";
import React, { useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';

function RootLayoutNav() {
  const { user, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === 'LogInPage' || segments[0] === 'RegistrationPage';

    if (!user && !inAuthGroup) {
      // Redirect to the login page if not logged in
      router.replace('/LogInPage');
    } else if (user && inAuthGroup) {
      // Redirect to the home page if logged in
      router.replace('/HomePage');
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