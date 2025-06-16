import React, { ReactNode, useEffect, useRef } from 'react';
import { Animated, Dimensions, View, ViewStyle } from 'react-native';

interface BentoGridProps {
  children: ReactNode;
  style?: ViewStyle;
  numColumns?: number;
  animationDelay?: number;
}

export function BentoGrid({
  children,
  style,
  numColumns = 3,
  animationDelay = 100,
}: BentoGridProps) {
  const fadeAnims = useRef<Animated.Value[]>([]).current;
  const slideAnims = useRef<Animated.Value[]>([]).current;
  const scaleAnims = useRef<Animated.Value[]>([]).current;

  const childrenArray = React.Children.toArray(children);

  // Initialize animations for each child
  useEffect(() => {
    childrenArray.forEach((_, index) => {
      if (!fadeAnims[index]) {
        fadeAnims[index] = new Animated.Value(0);
        slideAnims[index] = new Animated.Value(30);
        scaleAnims[index] = new Animated.Value(0.8);
      }
    });
  }, [childrenArray.length]);

  useEffect(() => {
    // Stagger the animations
    childrenArray.forEach((_, index) => {
      const delay = index * animationDelay;
      
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(fadeAnims[index], {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(slideAnims[index], {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnims[index], {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ]).start();
      }, delay);
    });
  }, [childrenArray.length, animationDelay]);

  const screenWidth = Dimensions.get('window').width;
  const itemWidth = (screenWidth - 40 - (numColumns - 1) * 15) / numColumns; // 40 for padding, 15 for gaps

  return (
    <View 
      style={[
        {
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        },
        style
      ]}
    >
      {childrenArray.map((child, index) => (
        <Animated.View
          key={index}
          style={{
            width: itemWidth,
            marginBottom: 15,
            opacity: fadeAnims[index] || 0,
            transform: [
              { translateY: slideAnims[index] || 30 },
              { scale: scaleAnims[index] || 0.8 },
            ],
          }}
        >
          {child}
        </Animated.View>
      ))}
    </View>
  );
}
