import React, { useEffect, useRef } from 'react';
import { Animated, ViewStyle } from 'react-native';

interface BlurFadeProps {
  children: React.ReactNode;
  style?: ViewStyle;
  duration?: number;
  delay?: number;
  offset?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export function BlurFade({
  children,
  style,
  duration = 400,
  delay = 0,
  offset = 6,
  direction = 'down',
}: BlurFadeProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateAnim = useRef(new Animated.Value(
    direction === 'left' || direction === 'right' ? 
      (direction === 'right' ? -offset : offset) : 
      (direction === 'down' ? -offset : offset)
  )).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(translateAnim, {
          toValue: 0,
          duration,
          useNativeDriver: true,
        }),
      ]).start();
    }, delay);

    return () => clearTimeout(timer);
  }, [fadeAnim, translateAnim, duration, delay]);

  const getTransform = () => {
    if (direction === 'left' || direction === 'right') {
      return [{ translateX: translateAnim }];
    }
    return [{ translateY: translateAnim }];
  };

  return (
    <Animated.View
      style={[
        style,
        {
          opacity: fadeAnim,
          transform: getTransform(),
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}
