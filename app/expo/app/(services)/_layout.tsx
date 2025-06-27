import { Stack } from "expo-router";
import React from "react";

export default function ServicesLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="[serviceId]" />
      <Stack.Screen name="automotive-services" />
      <Stack.Screen name="beauty-personal-care" />
      <Stack.Screen name="fitness-sports" />
      <Stack.Screen name="health-wellness" />
      <Stack.Screen name="home-services" />
      <Stack.Screen name="tech-it-services" />
    </Stack>
  );
}
