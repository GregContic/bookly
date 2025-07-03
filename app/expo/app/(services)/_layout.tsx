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
      <Stack.Screen name="automotive-services/index" />
      <Stack.Screen name="beauty-personal-care/index" />
      <Stack.Screen name="fitness-sports/index" />
      <Stack.Screen name="health-wellness/index" />
      <Stack.Screen name="home-services/index" />
      <Stack.Screen name="tech-it-services/index" />
    </Stack>
  );
}
