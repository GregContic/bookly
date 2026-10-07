import 'react-native-gesture-handler';
import React from 'react';
import { registerRootComponent } from 'expo';
import { Slot } from 'expo-router';

export default function App() {
  return <Slot />;
}

registerRootComponent(App);
