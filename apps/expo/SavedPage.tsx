import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import BottomNavBar from './components/BottomNavBar';

// Placeholder data for saved items - replace with actual data structure as needed
const savedItems = [
  {
    id: '1',
    category: 'Beauty & Personal Care',
    items: [
      {
        id: '1-1',
        name: 'Ink Haven Tattoo Studio',
        image: require('../assets/images/Logo-3.png'), // Placeholder image
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()}> {/* Back button */}
          <Ionicons name="chevron-back" size={24} color="#B0B0B0" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Saved</Text>
        <View style={{ width: 24 }} /> {/* Placeholder to balance the header */}
      </View>
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} placeholder="Search.." placeholderTextColor="#888" />
        <FontAwesome name="search" size={18} color="#888" style={{ position: 'absolute', right: 15, top: 12 }} />
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}> {/* Added paddingBottom */}
        {savedItems.map((category) => (
          <View key={category.id}>
            <View style={styles.sectionHeader}> {/* Added section header for category */}
              <Text style={styles.sectionTitle}>{category.category}</Text>
              <Ionicons name="options-outline" size={24} color="#B0B0B0" /> {/* Filter icon */}
            </View>
            {category.items.map((item) => (
              <View key={item.id} style={styles.savedItemCard}> {/* Card style for saved item */}
                <Image source={item.image} style={styles.savedItemImage} resizeMode="cover" />
                <View style={styles.savedItemInfo}> {/* Info section */}
                  <Text style={styles.savedItemName}>{item.name}</Text>
                  <View style={styles.savedItemRatingRow}> {/* Rating row */}
                    <FontAwesome name="star" size={13} color="#EDAE49" />
                    <Text style={styles.savedItemRating}>{item.rating}</Text>
                  </View>
                  <Text style={styles.savedItemAddress}>{item.address}</Text> {/* Address */}
                  <Text style={styles.savedItemSchedule}>{item.schedule}</Text> {/* Schedule */}
                </View>
                <View style={styles.savedItemRight}> {/* Price and button */}
                  <Text style={styles.savedItemPrice}>{item.price}</Text>
                  <TouchableOpacity style={styles.bookNowBtnSmall}> {/* Book Now button */}
                    <Text style={styles.bookNowTextSmall}>Book Now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
      {/* Bottom Navigation Bar */}
      <BottomNavBar activePage='SavedPage' /> {/* Use the new component and set active page */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F5F0', // Light yellowish background
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 8,
    backgroundColor: 'transparent',
  },
  headerTitle: {
    fontSize: 20,
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
    marginHorizontal: 18,
    marginBottom: 10,
    paddingHorizontal: 10,
    height: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#222',
  },
  sectionHeader: { // Style for category headers
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 10,
    marginHorizontal: 18,
  },
  sectionTitle: { // Style for category titles
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  savedItemCard: { // Style for each saved item card
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 18,
    marginBottom: 12,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  savedItemImage: { // Style for saved item image
    width: 60, // Adjusted size
    height: 60, // Adjusted size
    borderRadius: 10, // Match card border radius
    marginRight: 10,
  },
  savedItemInfo: { // Style for saved item info section
    flex: 1,
  },
  savedItemName: { // Style for saved item name
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
  },
  savedItemRatingRow: { // Style for rating row
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  savedItemRating: { // Style for rating text
    fontSize: 12,
    color: '#EDAE49',
    marginLeft: 3,
  },
  savedItemAddress: { // Style for address text
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },
  savedItemSchedule: { // Style for schedule text
    fontSize: 11,
    color: '#888',
    marginBottom: 2,
  },
  savedItemRight: { // Style for price and button section
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 60, // Match image height
  },
  savedItemPrice: { // Style for price text
    fontSize: 13,
    color: '#222',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  bookNowBtnSmall: { // Style for book now button
    backgroundColor: '#EDAE49',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  bookNowTextSmall: { // Style for book now button text
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
}); 