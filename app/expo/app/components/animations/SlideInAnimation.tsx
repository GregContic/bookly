import React, { useEffect, useRef } from 'react';
import { Animated, ViewStyle } from 'react-native';

interface SlideInAnimationProps {
  children: React.ReactNode;
  style?: ViewStyle;
  direction?: 'left' | 'right' | 'up' | 'down';
  distance?: number;
  duration?: number;
  delay?: number;
}

export function SlideInAnimation({
  children,
  style,
  direction = 'up',
  distance = 100,
  duration = 600,
  delay = 0,
}: SlideInAnimationProps) {
  const slideAnim = useRef(new Animated.Value(
    direction === 'left' || direction === 'right' ? 
      (direction === 'right' ? distance : -distance) : 
      (direction === 'down' ? distance : -distance)
  )).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration,
          useNativeDriver: true,
        }),
      ]).start();
    }, delay);

    return () => clearTimeout(timer);
  }, [slideAnim, fadeAnim, duration, delay]);

  const getTransform = () => {
    if (direction === 'left' || direction === 'right') {
      return [{ translateX: slideAnim }];
    }
    return [{ translateY: slideAnim }];
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
