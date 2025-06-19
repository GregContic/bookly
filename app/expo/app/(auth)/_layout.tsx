import { Stack } from 'expo-router';
import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function AuthLayout() {
  return (
    <SafeAreaProvider>
      {/* Status bar configuration for auth screens */}
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        backgroundColor="#EDAE49"
        translucent={false}
      />
      
      <Stack
        screenOptions={{
          headerShown: false, // Hide headers for clean auth UI
          gestureEnabled: true, // Allow swipe gestures
          animation: 'slide_from_right', // Smooth transitions
          contentStyle: { 
            backgroundColor: '#EDAE49' // Match auth background color
          },
          // Optimize for keyboard handling
          keyboardHandlingEnabled: true,
        }}
      >
        {/* Login Screen */}
        <Stack.Screen
          name="login/index"
          options={{
            title: 'Login',
            gestureDirection: 'horizontal',
            // Specific animation for login
            animationDuration: 300,
          }}
        />
        
        {/* Registration Screen */}
        <Stack.Screen
          name="register/index"
          options={{
            title: 'Register',
            gestureDirection: 'horizontal',
            // Specific animation for registration
            animationDuration: 300,
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}