import React, { useEffect, useRef } from 'react';
import { Animated, ViewStyle } from 'react-native';

interface FloatingAnimationProps {
  children: React.ReactNode;
  style?: ViewStyle;
  animationType?: 'float' | 'floatReverse' | 'floatSlow' | 'floatTilt';
  intensity?: number;
  duration?: number;
  delay?: number;
}

export function FloatingAnimation({
  children,
  style,
  animationType = 'float',
  intensity = 10,
  duration = 3000,
  delay = 0,
}: FloatingAnimationProps) {
  const translateYAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      const createAnimation = () => {
        let translateYValues: number[];
        let rotateValues: string[];
        let animationDuration = duration;

        switch (animationType) {
          case 'floatReverse':
            translateYValues = [-intensity / 2, intensity / 2];
            rotateValues = ['1deg', '-1deg'];
            animationDuration = duration * 1.3;
            break;
          case 'floatSlow':
            translateYValues = [0, -intensity * 1.5];
            rotateValues = ['2deg', '-2deg'];
            animationDuration = duration * 1.7;
            break;
          case 'floatTilt':
            translateYValues = [-intensity * 0.3, intensity * 0.7];
            rotateValues = ['-3deg', '3deg'];
            animationDuration = duration * 1.2;
            break;
          default: // float
            translateYValues = [0, -intensity];
            rotateValues = ['-2deg', '2deg'];
            break;
        }

        return Animated.loop(
          Animated.sequence([
            Animated.parallel([
              Animated.timing(translateYAnim, {
                toValue: translateYValues[1],
                duration: animationDuration / 2,
                useNativeDriver: true,
              }),
              Animated.timing(rotateAnim, {
                toValue: 1,
                duration: animationDuration / 2,
                useNativeDriver: true,
              }),
            ]),
            Animated.parallel([
              Animated.timing(translateYAnim, {
                toValue: translateYValues[0],
                duration: animationDuration / 2,
                useNativeDriver: true,
              }),
              Animated.timing(rotateAnim, {
                toValue: 0,
                duration: animationDuration / 2,
                useNativeDriver: true,
              }),
            ]),
          ])
        );
      };

      createAnimation().start();
    }, delay);

    return () => clearTimeout(timer);
  }, [translateYAnim, rotateAnim, animationType, intensity, duration, delay]);

  const getRotation = () => {
    switch (animationType) {
      case 'floatReverse':
        return rotateAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ['1deg', '-1deg'],
        });
      case 'floatSlow':
        return rotateAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ['2deg', '-2deg'],
        });
      case 'floatTilt':
        return rotateAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ['-3deg', '3deg'],
        });
      default:
        return rotateAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ['-2deg', '2deg'],
        });
    }
  };

  return (
    <Animated.View
      style={[
        style,
        {
          transform: [
            { translateY: translateYAnim },
            { rotate: getRotation() },
          ],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}
