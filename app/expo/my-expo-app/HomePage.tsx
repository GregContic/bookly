import { Redirect } from 'expo-router';
import React from 'react';

export default function HomePage() {
  return <Redirect href="/(drawer)/(tabs)/home" />;
}
