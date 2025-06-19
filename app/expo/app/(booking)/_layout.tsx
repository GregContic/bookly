import { Stack } from 'expo-router';
import React from 'react';
import { Platform, StatusBar, Text, View } from 'react-native';

// Progress indicator component for booking steps
const BookingProgress = ({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) => (
  <View style={{
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
  }}>
    <Text style={{
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: '500',
    }}>
      Step {currentStep} of {totalSteps}
    </Text>
    <View style={{
      flex: 1,
      height: 4,
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      borderRadius: 2,
      marginLeft: 12,
    }}>
      <View style={{
        width: `${(currentStep / totalSteps) * 100}%`,
        height: '100%',
        backgroundColor: '#FFFFFF',
        borderRadius: 2,
      }} />
    </View>
  </View>
);

export default function BookingLayout() {
  return (
    <>
      {/* Status bar configuration for booking screens */}
      <StatusBar
        barStyle="light-content" // Changed to light for golden headers
        backgroundColor="#EDAE49"
        translucent={false}
      />
      
      <Stack
        screenOptions={{
          headerShown: true, // Show headers for booking progress
          gestureEnabled: false, // Disable swipe back to prevent accidental exits
          animation: 'slide_from_right', // Smooth forward transitions
          contentStyle: { 
            backgroundColor: '#FFFFFF' // Clean white background
          },
          // Header styling for booking flow
          headerStyle: {
            backgroundColor: '#EDAE49', // Golden header for booking
          },
          headerShadowVisible: true,
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: '600',
            color: '#FFFFFF', // White text on golden background
          },
          headerTintColor: '#FFFFFF', // White back button
          headerBackTitle: '', // Clean back navigation
          headerTitleAlign: 'center', // Center all titles
        }}
      >        {/* Step 1: Booking Details */}
        <Stack.Screen
          name="details/index"
          options={{
            title: 'Select Service & Trainer',
            headerLeft: () => null, // Remove back button for first step
            gestureEnabled: true, // Allow back gesture for first step
            header: () => (
              <View style={{ backgroundColor: '#EDAE49', paddingTop: Platform.OS === 'ios' ? 44 : 0 }}>
                <BookingProgress currentStep={1} totalSteps={5} />
                <View style={{ paddingBottom: 12, alignItems: 'center' }}>
                  <Text style={{
                    color: '#FFFFFF',
                    fontSize: 18,
                    fontWeight: '600',
                  }}>
                    Select Service & Trainer
                  </Text>
                </View>
              </View>
            ),
          }}
        />
        
        {/* Step 2: Date & Time Selection */}
        <Stack.Screen
          name="datetime/index"
          options={{
            title: 'Select Date & Time',
            header: () => (
              <View style={{ backgroundColor: '#EDAE49', paddingTop: Platform.OS === 'ios' ? 44 : 0 }}>
                <BookingProgress currentStep={2} totalSteps={5} />
                <View style={{ paddingBottom: 12, alignItems: 'center' }}>
                  <Text style={{
                    color: '#FFFFFF',
                    fontSize: 18,
                    fontWeight: '600',
                  }}>
                    Select Date & Time
                  </Text>
                </View>
              </View>
            ),
          }}
        />
        
        {/* Step 3: Booking Summary */}
        <Stack.Screen
          name="summary/index"
          options={{
            title: 'Review Booking',
            gestureEnabled: true,
            header: () => (
              <View style={{ backgroundColor: '#EDAE49', paddingTop: Platform.OS === 'ios' ? 44 : 0 }}>
                <BookingProgress currentStep={3} totalSteps={5} />
                <View style={{ paddingBottom: 12, alignItems: 'center' }}>
                  <Text style={{
                    color: '#FFFFFF',
                    fontSize: 18,
                    fontWeight: '600',
                  }}>
                    Review Booking
                  </Text>
                </View>
              </View>
            ),
          }}
        />
        
        {/* Step 4: Payment Method */}
        <Stack.Screen
          name="payment/index"
          options={{
            title: 'Payment Method',
            header: () => (
              <View style={{ backgroundColor: '#2C5530', paddingTop: Platform.OS === 'ios' ? 44 : 0 }}>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 20,
                  paddingVertical: 8,
                }}>
                  <Text style={{
                    color: '#FFFFFF',
                    fontSize: 14,
                    fontWeight: '500',
                  }}>
                    Step 4 of 5
                  </Text>
                  <View style={{
                    flex: 1,
                    height: 4,
                    backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    borderRadius: 2,
                    marginLeft: 12,
                  }}>
                    <View style={{
                      width: '80%',
                      height: '100%',
                      backgroundColor: '#FFFFFF',
                      borderRadius: 2,
                    }} />
                  </View>
                </View>
                <View style={{ paddingBottom: 12, alignItems: 'center' }}>
                  <Text style={{
                    color: '#FFFFFF',
                    fontSize: 18,
                    fontWeight: '600',
                  }}>
                    🔒 Secure Payment
                  </Text>
                </View>
              </View>
            ),
          }}
        />
        
        {/* Step 5: Booking Confirmation */}
        <Stack.Screen
          name="confirmation/index"
          options={{
            title: 'Booking Confirmed',
            headerLeft: () => null, // No back button on success
            gestureEnabled: false, // Prevent going back from confirmation
            header: () => (
              <View style={{ backgroundColor: '#4CAF50', paddingTop: Platform.OS === 'ios' ? 44 : 0 }}>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 20,
                  paddingVertical: 8,
                }}>
                  <Text style={{
                    color: '#FFFFFF',
                    fontSize: 14,
                    fontWeight: '500',
                  }}>
                    Completed
                  </Text>
                  <View style={{
                    flex: 1,
                    height: 4,
                    backgroundColor: '#FFFFFF',
                    borderRadius: 2,
                    marginLeft: 12,
                  }} />
                </View>
                <View style={{ paddingBottom: 12, alignItems: 'center' }}>
                  <Text style={{
                    color: '#FFFFFF',
                    fontSize: 18,
                    fontWeight: '600',
                  }}>
                    ✅ Booking Confirmed!
                  </Text>
                </View>
              </View>
            ),
          }}
        />
      </Stack>
    </>
  );
}