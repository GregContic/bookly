import { NavigationContainer } from '@react-navigation/native';

interface SolitoAppProviderProps {
  children: React.ReactNode;
}

export function SolitoAppProvider({ children }: SolitoAppProviderProps) {
  return (
    <NavigationContainer>
      {children}
    </NavigationContainer>
  );
}
