import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, Image, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from 'react-native';

// Placeholder data for saved items - replace with actual data structure as needed
const savedItems = [
  {
    id: '1',
    category: 'Beauty & Personal Care',
    items: [
      {
        id: '1-1',
        name: 'Ink Haven Tattoo Studio',
        image: require('../assets/images/ink-haven.png'), // Placeholder image
        rating: 4.8,
        address: '9 Lakandula Street, Baguio City',
        schedule: 'Monday - Sunday\n7:00 AM - 9:00 PM',
        price: '₱1,500 - ₱20,000/session',
      },
    ],
  },
];

export default function SavedPage() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const [orientation, setOrientation] = useState('PORTRAIT');

  // Animation values
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(30)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.95)).current;

  // Dynamic scaling calculations
  const scale = width / 375;
  const dynamicFontSize = (size: number) => Math.round(size * scale);
  const dynamicSpacing = (size: number) => Math.round(size * scale);

  // Dynamic styles
  const dynamicStyles = {
    scrollContent: {
      paddingBottom: height * 0.15,
    },
  };

  useEffect(() => {
    // Handle orientation changes
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setOrientation(window.width < window.height ? 'PORTRAIT' : 'LANDSCAPE');
    });

    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();

    return () => subscription?.remove();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['rgba(255, 192, 203, 0.08)', 'rgba(255, 182, 193, 0.04)', 'rgba(255, 192, 203, 0.02)']}
        style={styles.pinkCircle}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0, 0.5, 1]}
      />
      <LinearGradient
        colors={['rgba(255, 192, 203, 0.08)', 'rgba(255, 182, 193, 0.04)', 'rgba(255, 192, 203, 0.02)']}
        style={styles.pinkCircleRight}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0, 0.5, 1]}
      />
      <LinearGradient
        colors={['rgba(255, 192, 203, 0.08)', 'rgba(255, 182, 193, 0.04)', 'rgba(255, 192, 203, 0.02)']}
        style={styles.orangeCircleBottom}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0, 0.5, 1]}
      />
      <LinearGradient
        colors={['rgba(255, 192, 203, 0.08)', 'rgba(255, 182, 193, 0.04)', 'rgba(255, 192, 203, 0.02)']}
        style={styles.pinkCircleBottomRight}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0, 0.5, 1]}
      />
      <Animated.View 
        style={[
          styles.headerRow,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={dynamicFontSize(24)} color="#B0B0B0" />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { fontSize: dynamicFontSize(20) }]}>Saved</Text>
        <View style={{ width: dynamicSpacing(24) }} />
      </Animated.View>

      <Animated.View 
        style={[
          styles.searchContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <TextInput 
          style={[styles.searchInput, { fontSize: dynamicFontSize(15) }]} 
          placeholder="Search.." 
          placeholderTextColor="#888" 
        />
        <FontAwesome 
          name="search" 
          size={dynamicFontSize(18)} 
          color="#888" 
          style={{ position: 'absolute', right: dynamicSpacing(15), top: dynamicSpacing(12) }} 
        />
      </Animated.View>

      <ScrollView 
        contentContainerStyle={dynamicStyles.scrollContent} 
        showsVerticalScrollIndicator={false}
      >
        {savedItems.map((category) => (
          <View key={category.id}>
            <View style={styles.sectionHeader}>
              <Text style={[styles.sectionTitle, { fontSize: dynamicFontSize(16) }]}>
                {category.category}
              </Text>
              <Ionicons name="options-outline" size={dynamicFontSize(24)} color="#B0B0B0" />
            </View>
            {category.items.map((item) => (
              <View key={item.id} style={styles.savedItemCard}>
                <Image 
                  source={item.image} 
                  style={styles.savedItemImage} 
                  resizeMode="cover" 
                />
                <View style={styles.savedItemInfo}>
                  <Text style={[styles.savedItemName, { fontSize: dynamicFontSize(14) }]}>
                    {item.name}
                  </Text>
                  <View style={styles.savedItemRatingRow}>
                    <FontAwesome name="star" size={dynamicFontSize(13)} color="#EDAE49" />
                    <Text style={[styles.savedItemRating, { fontSize: dynamicFontSize(12) }]}>
                      {item.rating}
                    </Text>
                  </View>
                  <Text style={[styles.savedItemAddress, { fontSize: dynamicFontSize(12) }]}>
                    {item.address}
                  </Text>
                  <Text style={[styles.savedItemSchedule, { fontSize: dynamicFontSize(11) }]}>
                    {item.schedule}
                  </Text>
                </View>
                <View style={styles.savedItemRight}>
                  <Text style={[styles.savedItemPrice, { fontSize: dynamicFontSize(13) }]}>
                    {item.price}
                  </Text>
                  <TouchableOpacity style={styles.bookNowBtnSmall}>
                    <Text style={[styles.bookNowTextSmall, { fontSize: dynamicFontSize(12) }]}>
                      Book Now
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F5F0',
  },
  pinkCircle: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 150,
    top: -10,
    left: -100,
    opacity: 0.3,
    zIndex: 0,
  },
  pinkCircleRight: {
    position: 'absolute',
    width: 250,
    height: 250,
    borderRadius: 150,
    top: 50,
    right: -100,
    opacity: 0.3,
    zIndex: 0,
  },
  orangeCircleBottom: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    bottom: '10%',
    left: -80,
    opacity: 0.3,
    zIndex: 0,
  },
  pinkCircleBottomRight: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    bottom: '25%',
    right: -70,
    opacity: 0.3,
    zIndex: 0,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    paddingTop: Platform.OS === 'ios' ? '15%' : '18%',
    paddingBottom: '2%',
    backgroundColor: 'transparent',
  },
  headerTitle: {
    fontWeight: 'bold',
    color: '#000',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
    marginHorizontal: '5%',
    marginBottom: '2%',
    paddingHorizontal: '3%',
    height: Platform.OS === 'ios' ? 40 : 45,
  },
  searchInput: {
    flex: 1,
    color: '#222',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '4%',
    marginBottom: '2%',
    marginHorizontal: '5%',
  },
  sectionTitle: {
    fontWeight: 'bold',
    color: '#222',
  },
  savedItemCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: '5%',
    marginBottom: '3%',
    padding: '3%',
    minHeight: Platform.OS === 'ios' ? 80 : 90,
  },
  savedItemImage: {
    width: '20%',
    aspectRatio: 1,
    borderRadius: 10,
    marginRight: '3%',
  },
  savedItemInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  savedItemName: {
    fontWeight: 'bold',
    color: '#222',
  },
  savedItemRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  savedItemRating: {
    color: '#EDAE49',
    marginLeft: 3,
  },
  savedItemAddress: {
    color: '#888',
    marginBottom: 2,
  },
  savedItemSchedule: {
    color: '#888',
    marginBottom: 2,
  },
  savedItemRight: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: '100%',
    paddingVertical: '1%',
  },
  savedItemPrice: {
    fontWeight: 'bold',
    color: '#222',
  },
  bookNowBtnSmall: {
    backgroundColor: '#EDAE49',
    borderRadius: 6,
    paddingVertical: '2%',
    paddingHorizontal: '4%',
    minWidth: '25%',
    alignItems: 'center',
  },
  bookNowTextSmall: {
    color: '#fff',
    fontWeight: 'bold',
  },
}); 