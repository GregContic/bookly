import React, { useEffect, useRef } from 'react';
import { Animated, TextStyle } from 'react-native';

interface SparklesTextProps {
  children: React.ReactNode;
  style?: TextStyle;
  duration?: number;
  delay?: number;
}

export function SparklesText({
  children,
  style,
  duration = 1000,
  delay = 0,
}: SparklesTextProps) {
  const sparkleAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(sparkleAnim, {
            toValue: 1,
            duration: duration / 2,
            useNativeDriver: false,
          }),
          Animated.timing(sparkleAnim, {
            toValue: 0,
            duration: duration / 2,
            useNativeDriver: false,
          }),
        ])
      ).start();

      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: duration,
            useNativeDriver: false,
          }),
          Animated.timing(glowAnim, {
            toValue: 0,
            duration: duration,
            useNativeDriver: false,
          }),
        ])
      ).start();
    }, delay);

    return () => clearTimeout(timer);
  }, [sparkleAnim, glowAnim, duration, delay]);

  const animatedBackgroundColor = sparkleAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['transparent', 'rgba(255, 215, 0, 0.1)'],
  });

  const animatedTextShadow = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0px 0px 0px rgba(255, 215, 0, 0)', '0px 0px 10px rgba(255, 215, 0, 0.5)'],
  });

  return (
    <Animated.View
      style={{
        backgroundColor: animatedBackgroundColor,
        borderRadius: 8,
        padding: 4,
      }}
    >
      <Animated.Text
        style={[
          style,
          {
            textShadowColor: 'rgba(255, 215, 0, 0.5)',
            textShadowOffset: { width: 0, height: 0 },
            textShadowRadius: glowAnim,
          },
        ]}
      >
        {children}
      </Animated.Text>
    </Animated.View>
  );
}
