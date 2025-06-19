import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';

export default function ServicesLayout() {
  return (
    <>
      {/* Status bar configuration for service screens */}
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#FFFFFF"
        translucent={false}
      />
      
      <Stack
        screenOptions={{
          headerShown: true, // Show headers for navigation context
          gestureEnabled: true, // Allow swipe back gestures
          animation: 'slide_from_right', // Smooth transitions
          contentStyle: { 
            backgroundColor: '#FFFFFF' // Clean white background
          },
          // Header styling
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerShadowVisible: true, // Show header shadow
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: '600',
            color: '#222222',
          },
          headerTintColor: '#EDAE49', // Back button color
          headerBackTitle: '', // Empty back title on iOS
        }}
      >
        {/* Health & Wellness Services */}
        <Stack.Screen
          name="health-wellness/index"
          options={{
            title: 'Health & Wellness',
            headerTitleAlign: 'center',
          }}
        />
        
        {/* Beauty & Personal Care Services */}
        <Stack.Screen
          name="beauty-personal-care/index"
          options={{
            title: 'Beauty & Personal Care',
            headerTitleAlign: 'center',
          }}
        />
        
        {/* Fitness & Sports Services */}
        <Stack.Screen
          name="fitness-sports/index"
          options={{
            title: 'Fitness & Sports',
            headerTitleAlign: 'center',
          }}
        />
        
        {/* Automotive Services */}
        <Stack.Screen
          name="automotive-services/index"
          options={{
            title: 'Automotive Services',
            headerTitleAlign: 'center',
          }}
        />
        
        {/* Tech & IT Services */}
        <Stack.Screen
          name="tech-it-services/index"
          options={{
            title: 'Tech & IT Services',
            headerTitleAlign: 'center',
          }}
        />
        
        {/* Home Services */}
        <Stack.Screen
          name="home-services/index"
          options={{
            title: 'Home Services',
            headerTitleAlign: 'center',
          }}
        />
        
        {/* Dynamic Business Detail Pages */}
        <Stack.Screen
          name="fitness-sports/[businessId]/index"
          options={({ route }) => ({
            title: 'Business Details',
            headerTitleAlign: 'center',
            // Custom header for business pages
            headerStyle: {
              backgroundColor: '#EDAE49',
            },
            headerShadowVisible: true,
            headerTitleStyle: {
              fontSize: 18,
              fontWeight: '600',
              color: '#FFFFFF',
            },
            headerTintColor: '#FFFFFF',
            headerBackTitle: '',
          })}
        />
      </Stack>
    </>
  );
}
