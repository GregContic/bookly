import { FontAwesome, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import BottomNavBar from './components/BottomNavBar';

// Placeholder data for service categories - replace with actual data structure as needed
const serviceCategories = [
  {
    id: '1',
    title: 'Health & Wellness',
    items: [
      { id: '1-1', name: 'PrimeCare Medical Clinic', image: require('../assets/images/Logo-3.png') },
      { id: '1-2', name: 'SmileBright Dental', image: require('../assets/images/Logo-3.png') },
      { id: '1-3', name: 'Evercare Family Medical Clinic', image: require('../assets/images/Logo-3.png') },
    ],
  },
  {
    id: '2',
    title: 'Beauty & Personal Care',
    items: [
      { id: '2-1', name: 'Serene Escape Spa', image: require('../assets/images/Logo-3.png') },
      { id: '2-2', name: 'David\'s Salon', image: require('../assets/images/Logo-3.png') },
      { id: '2-3', name: 'Ink Haven Tattoo & Piercing Studio', image: require('../assets/images/Logo-3.png') },
    ],
  },
  {
    id: '3',
    title: 'Automotive Services',
    items: [
      { id: '3-1', name: 'Baguio AutoCare Center', image: require('../assets/images/Logo-3.png') },
      { id: '3-2', name: 'SpeedMaster Auto Repair', image: require('../assets/images/Logo-3.png') },
      { id: '3-3', name: 'Titan Auto Care Center', image: require('../assets/images/Logo-3.png') },
    ],
  },
    {
    id: '4',
    title: 'Fitness & Sports',
    items: [
      { id: '4-1', name: 'Placeholder Service 1', image: require('../assets/images/Logo-3.png') },
      { id: '4-2', name: 'Placeholder Service 2', image: require('../assets/images/Logo-3.png') },
      { id: '4-3', name: 'Placeholder Service 3', image: require('../assets/images/Logo-3.png') },
    ],
  },
];

export default function BookAppointmentPage() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerRow}>
        <Ionicons name="chevron-back" size={24} color="#B0B0B0" />
        <Text style={styles.headerTitle}>Book an Appointment</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} placeholder="What service are you looking for?" placeholderTextColor="#888" />
        <FontAwesome name="search" size={18} color="#888" style={{ position: 'absolute', right: 15, top: 12 }} />
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        {serviceCategories.map((category) => (
          <View key={category.id}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{category.title}</Text>
              <TouchableOpacity><Text style={styles.viewAllText}>View All</Text></TouchableOpacity>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
              {category.items.map((item) => (
                <View key={item.id} style={styles.serviceCard}>
                  <Image source={item.image} style={styles.serviceImage} resizeMode="cover" />
                  <Text style={styles.serviceName}>{item.name}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        ))}
      </ScrollView>
      {/* Bottom Navigation Bar */}
      <BottomNavBar activePage='BookAppointmentPage' /> {/* Use the new component */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F5F0',
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
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#222',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 18,
    marginBottom: 10,
    marginHorizontal: 18,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },
  viewAllText: {
    fontSize: 14,
    color: '#EDAE49',
  },
  categoryScroll: {
    paddingLeft: 18,
    marginBottom: 10,
  },
  serviceCard: {
    width: 100, // Adjusted width
    backgroundColor: '#fff',
    borderRadius: 12, // Adjusted border radius
    marginRight: 12, // Adjusted margin
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
    overflow: 'hidden',
    alignItems: 'center', // Center items
    paddingBottom: 8, // Add padding bottom
  },
  serviceImage: {
    width: '100%',
    height: 80, // Adjusted height
    borderTopLeftRadius: 12, // Match card radius
    borderTopRightRadius: 12, // Match card radius
    marginBottom: 8, // Add margin below image
  },
  serviceName: {
    fontSize: 12, // Adjusted font size
    fontWeight: '500', // Adjusted font weight
    color: '#222',
    textAlign: 'center', // Center text
    paddingHorizontal: 4, // Add horizontal padding
  },
}); 