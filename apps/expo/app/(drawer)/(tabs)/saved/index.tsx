import { FontAwesome, Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, Image, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { useSavedServices } from '../../../../context/SavedServicesContext';

export default function SavedTab() {
  const { width, height } = useWindowDimensions();
  const [orientation, setOrientation] = useState('PORTRAIT');
  
  // Get saved services from context
  const { getSavedServicesByCategory, removeService } = useSavedServices();
  const savedServicesByCategory = getSavedServicesByCategory();
  
  // Convert to the same format as the original placeholder data
  const savedItems = Object.entries(savedServicesByCategory).map(([category, services]) => ({
    id: category,
    category,
    items: services
  }));

  // Animation values
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(30)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.95)).current;

  // Dynamic scaling calculations
  const scale = width / 375;
  const dynamicFontSize = (size: number) => Math.round(size * scale);
  const dynamicSpacing = (size: number) => Math.round(size * scale);

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

  const renderSavedItem = (item: any, index: number) => (
    <Animated.View 
      key={item.id} 
      style={[
        styles.serviceCard,
        {
          opacity: fadeAnim,
          transform: [
            { scale: scaleAnim },
            { 
              translateY: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 30 + (index * 10)]
              })
            }
          ]
        }
      ]}
    >
      <Image source={item.image} style={styles.serviceImage} resizeMode="cover" />
      <View style={styles.serviceInfo}>
        <View style={styles.serviceHeader}>
          <Text style={[styles.serviceName, { fontSize: dynamicFontSize(16) }]}>{item.name}</Text>
          <TouchableOpacity style={styles.saveButton} onPress={() => removeService(item.id)}>
            <Ionicons name="heart" size={20} color="#FF4B4B" />
          </TouchableOpacity>
        </View>
        <View style={styles.ratingRow}>
          <FontAwesome name="star" size={14} color="#EDAE49" />
          <Text style={[styles.rating, { fontSize: dynamicFontSize(12) }]}>{item.rating}</Text>
        </View>
        <Text style={[styles.address, { fontSize: dynamicFontSize(12) }]}>📍 {item.address}</Text>
        <Text style={[styles.schedule, { fontSize: dynamicFontSize(11) }]}>📅 {item.schedule}</Text>
        <Text style={[styles.price, { fontSize: dynamicFontSize(14) }]}>{item.price}</Text>
        <TouchableOpacity style={styles.bookButton}>
          <Text style={[styles.bookButtonText, { fontSize: dynamicFontSize(12) }]}>Book Now</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View 
        style={[
          styles.headerRow,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <Text style={[styles.headerTitle, { fontSize: dynamicFontSize(20) }]}>Saved</Text>
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
          placeholder="Search saved services..." 
          placeholderTextColor="#888" 
        />
        <FontAwesome name="search" size={18} color="#888" style={styles.searchIcon} />
      </Animated.View>

      <ScrollView 
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: height * 0.15 }
        ]} 
        showsVerticalScrollIndicator={false}
      >
        {savedItems.length === 0 ? (
          <Animated.View 
            style={[
              styles.emptyContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <Ionicons name="bookmark-outline" size={60} color="#B0B0B0" />
            <Text style={[styles.emptyTitle, { fontSize: dynamicFontSize(18) }]}>No Saved Services</Text>
            <Text style={[styles.emptySubtitle, { fontSize: dynamicFontSize(14) }]}>
              Start exploring services and save your favorites here
            </Text>
          </Animated.View>
        ) : (
          savedItems.map((category, categoryIndex) => (
            <View key={category.id}>
              <Animated.Text 
                style={[
                  styles.categoryTitle,
                  {
                    fontSize: dynamicFontSize(16),
                    opacity: fadeAnim,
                    transform: [{ translateY: slideAnim }]
                  }
                ]}
              >
                {category.category}
              </Animated.Text>
              {category.items.map((item, itemIndex) => 
                renderSavedItem(item, categoryIndex * 10 + itemIndex)
              )}
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F5F0',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: '5%',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: '5%',
    paddingTop: Platform.OS === 'ios' ? '15%' : '18%',
    paddingBottom: '2%',
    backgroundColor: 'transparent',
  },
  headerTitle: {
    fontSize: Platform.OS === 'ios' ? 20 : 22,
    fontWeight: 'bold',
    color: '#222',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
    marginHorizontal: '5%',
    marginBottom: '4%',
    paddingHorizontal: '3%',
    height: Platform.OS === 'ios' ? 40 : 45,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#222',
  },
  searchIcon: {
    position: 'absolute',
    right: 15,
    top: 12,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginTop: '4%',
    marginBottom: '3%',
  },
  serviceCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: '4%',
    padding: '4%',
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  serviceImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: '4%',
  },
  serviceInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    flex: 1,
    marginRight: 8,
  },
  saveButton: {
    padding: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  rating: {
    fontSize: 12,
    color: '#EDAE49',
    marginLeft: 4,
    fontWeight: '600',
  },
  address: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  schedule: {
    fontSize: 11,
    color: '#666',
    marginBottom: 6,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 8,
  },
  bookButton: {
    backgroundColor: '#EDAE49',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
  bookButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '20%',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: '10%',
  },
});
