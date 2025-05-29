import { FontAwesome, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import BottomNavBar from './components/BottomNavBar';

const featuredServices = [
  {
    id: '1',
    name: 'Glow Haven Aesthetics',
    image: require('../assets/images/glow-haven.png'),
    rating: 4.8,
    desc: 'Facials, Skin Rejuvenation, Beauty Care',
    price: '₱800 - ₱2,500',
    isPromo: false,
  },
  {
    id: '2',
    name: 'Apex Performance Gym',
    image: require('../assets/images/apex-gym.png'),
    rating: 4.9,
    desc: 'Strength, Cardio, Group Classes',
    price: '₱900 - ₱1,500',
    isPromo: true,
  },
];

const allServices = [
  {
    id: '1',
    name: 'HandyPro Home Repairs',
    image: require('../assets/images/Logo-3.png'),
    rating: 4.8,
    desc: 'La Trinidad, Benguet',
    schedule: 'Monday - Sunday\n8:00 AM - 6:00 PM',
    price: '₱1,300 - ₱8,000',
  },
  {
    id: '2',
    name: 'SmartFix IT Solutions',
    image: require('../assets/images/Logo-3.png'),
    rating: 4.6,
    desc: '24 Lopez Jaena St., Baguio City',
    schedule: 'Monday - Saturday\n9:00 AM - 5:00 PM',
    price: '₱800 - ₱1,000',
  },
  {
    id: '3',
    name: 'Turbo Care Auto Hub',
    image: require('../assets/images/Logo-3.png'),
    rating: 4.7,
    desc: 'Naguilian Rd., Baguio City',
    schedule: 'Monday - Saturday\n8:00 AM - 5:00 PM',
    price: '₱1,500 - ₱7,000',
  },
];

export default function ServicesPage() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerRow}>
        <Ionicons name="chevron-back" size={24} color="#B0B0B0" />
        <Text style={styles.headerTitle}>Services</Text>
        <View style={{ width: 24 }} />
      </View>
      <View style={styles.searchContainer}>
        <TextInput style={styles.searchInput} placeholder="Search.." placeholderTextColor="#888" />
        <FontAwesome name="search" size={18} color="#888" style={{ position: 'absolute', right: 15, top: 12 }} />
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Featured Services</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.featuredScroll}>
          {featuredServices.map((item) => (
            <View key={item.id} style={styles.featuredCard}>
              <Image source={item.image} style={styles.featuredImage} resizeMode="cover" />
              <View style={styles.featuredInfo}>
                <Text style={styles.featuredName}>{item.name}</Text>
                <View style={styles.featuredRow}>
                  <FontAwesome name="star" size={14} color="#EDAE49" />
                  <Text style={styles.featuredRating}>{item.rating}</Text>
                </View>
                <Text style={styles.featuredDesc}>{item.desc}</Text>
                <Text style={styles.featuredPrice}>{item.price}</Text>
                <TouchableOpacity style={styles.bookNowBtn}><Text style={styles.bookNowText}>Book Now</Text></TouchableOpacity>
                {item.isPromo && <View style={styles.promoTag}><Text style={styles.promoText}>PROMO</Text></View>}
              </View>
            </View>
          ))}
        </ScrollView>
        <Text style={styles.sectionTitle}>All Services</Text>
        {allServices.map((item) => (
          <View key={item.id} style={styles.serviceRow}>
            <Image source={item.image} style={styles.serviceImage} resizeMode="cover" />
            <View style={styles.serviceInfo}>
              <Text style={styles.serviceName}>{item.name}</Text>
              <View style={styles.serviceRatingRow}>
                <FontAwesome name="star" size={13} color="#EDAE49" />
                <Text style={styles.serviceRating}>{item.rating}</Text>
              </View>
              <Text style={styles.serviceDesc}>{item.desc}</Text>
              <Text style={styles.serviceSchedule}>{item.schedule}</Text>
            </View>
            <View style={styles.serviceRight}>
              <Text style={styles.servicePrice}>{item.price}</Text>
              <TouchableOpacity style={styles.bookNowBtnSmall}><Text style={styles.bookNowTextSmall}>Book Now</Text></TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      {/* Bottom Navigation Bar */}
      <BottomNavBar activePage='ServicesPage' />
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 18,
    marginBottom: 10,
    marginLeft: 18,
  },
  featuredScroll: {
    paddingLeft: 18,
    marginBottom: 10,
  },
  featuredCard: {
    width: 220,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
    overflow: 'hidden',
  },
  featuredImage: {
    width: '100%',
    height: 90,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  featuredInfo: {
    padding: 12,
  },
  featuredName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
  },
  featuredRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  featuredRating: {
    fontSize: 13,
    color: '#EDAE49',
    marginLeft: 3,
  },
  featuredDesc: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },
  featuredPrice: {
    fontSize: 13,
    color: '#222',
    marginBottom: 6,
  },
  bookNowBtn: {
    backgroundColor: '#EDAE49',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 18,
    alignSelf: 'flex-end',
    marginTop: 2,
  },
  bookNowText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  promoTag: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#ED2B2A',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  promoText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  serviceRow: {
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
  serviceImage: {
    width: 54,
    height: 54,
    borderRadius: 10,
    marginRight: 10,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
  },
  serviceRatingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  serviceRating: {
    fontSize: 12,
    color: '#EDAE49',
    marginLeft: 3,
  },
  serviceDesc: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },
  serviceSchedule: {
    fontSize: 11,
    color: '#888',
    marginBottom: 2,
  },
  serviceRight: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 54,
  },
  servicePrice: {
    fontSize: 13,
    color: '#222',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  bookNowBtnSmall: {
    backgroundColor: '#EDAE49',
    borderRadius: 6,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  bookNowTextSmall: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
}); 