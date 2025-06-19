import { Stack } from 'expo-router';
import React from 'react';
import { StatusBar } from 'react-native';

export default function AccountLayout() {
  return (
    <>
      {/* Status bar configuration for account screens */}
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
        translucent={false}
      />
      
      <Stack
        screenOptions={{
          headerShown: true, // Show headers for account navigation
          gestureEnabled: true, // Allow swipe back gestures
          animation: 'slide_from_right', // Smooth transitions
          contentStyle: { 
            backgroundColor: '#F8F9FA' // Light gray background for account pages
          },
          // Header styling for account section
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerShadowVisible: true,
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: '600',
            color: '#222222',
          },
          headerTintColor: '#EDAE49', // Golden back button
          headerBackTitle: '', // Clean back navigation          headerTitleAlign: 'center', // Center all titles
        }}
      >
        {/* Account Settings */}
        <Stack.Screen
          name="settings/index"
          options={{
            title: 'Account Settings',
            // Custom header styling for main settings
            headerStyle: {
              backgroundColor: '#EDAE49',
            },
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: '600',
              color: '#FFFFFF',
            },
            headerTintColor: '#FFFFFF',
          }}
        />
        
        {/* Support & Help Center */}
        <Stack.Screen
          name="support/index"
          options={{
            title: 'Support & Help',
            // Support-themed header
            headerStyle: {
              backgroundColor: '#4CAF50',
            },
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: '600',
              color: '#FFFFFF',
            },
            headerTintColor: '#FFFFFF',
          }}
        />
      </Stack>
    </>
  );
}