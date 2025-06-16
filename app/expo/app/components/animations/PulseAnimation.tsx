import React, { useEffect, useRef } from 'react';
import { Animated, ViewStyle } from 'react-native';

interface PulseAnimationProps {
  children: React.ReactNode;
  style?: ViewStyle;
  intensity?: number;
  duration?: number;
  delay?: number;
}

export function PulseAnimation({
  children,
  style,
  intensity = 0.1,
  duration = 2000,
  delay = 0,
}: PulseAnimationProps) {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1 + intensity,
            duration: duration / 2,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: duration / 2,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, delay);

    return () => clearTimeout(timer);
  }, [pulseAnim, intensity, duration, delay]);

  return (
    <Animated.View
      style={[
        style,
        {
          transform: [{ scale: pulseAnim }],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}
