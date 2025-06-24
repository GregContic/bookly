import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';

const Stack = createNativeStackNavigator();

export function SolitoNavigation({ children }: { children: React.ReactNode }) {
  const linking = {
    prefixes: [Linking.createURL('/')],
    config: {
      screens: {
        home: '/',
        services: '/services',
        'health-wellness': '/(services)/health-wellness',
        'beauty-personal-care': '/(services)/beauty-personal-care',
        'fitness-sports': '/(services)/fitness-sports',
        'automotive-services': '/(services)/automotive-services',
        'home-services': '/(services)/home-services',
        'tech-it-services': '/(services)/tech-it-services',
        'booking-details': '/(booking)/details',
        'booking-summary': '/(booking)/summary',
        'booking-confirmation': '/(booking)/confirmation',
        'appointment-history': '/AppointmentHistory',
        profile: '/profile',
      },
    },
  };

  return (
    <NavigationContainer linking={linking}>
      {children}
    </NavigationContainer>
  );
}
