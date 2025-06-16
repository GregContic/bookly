import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import BottomNavBar from '../../components/BottomNavBar';

// Animation Components
import { BlurFade, BoxReveal, FloatingAnimation, SparklesText } from '../../components/animations';

const featuredServices = [
  {
    id: '1',
    name: 'Glow Haven Aesthetics',
    image: require('../../../assets/images/glow-haven.png'),
    rating: 4.8,
    desc: 'Facials, Skin Rejuvenation, Beauty Care',
    price: '₱800 - ₱2,500',
    isPromo: false,
  },
  {
    id: '2',
    name: 'Apex Performance Gym',
    image: require('../../../assets/images/apex-gym.png'),
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
    image: require('../../../assets/images/handypro-1.png'),
    rating: 4.8,
    desc: 'La Trinidad, Benguet',
    schedule: 'Monday - Sunday\n8:00 AM - 6:00 PM',
    price: '₱1,300 - ₱8,000',
  },
  {
    id: '2',
    name: 'SmartFix IT Solutions',
    image: require('../../../assets/images/smartfix-1.png'),
    rating: 4.6,
    desc: '24 Lopez Jaena St., Baguio City',
    schedule: 'Monday - Saturday\n9:00 AM - 5:00 PM',
    price: '₱800 - ₱1,000',
  },
  {
    id: '3',
    name: 'Turbo Care Auto Hub',
    image: require('../../../assets/images/turbo-hub.png'),
    rating: 4.7,
    desc: 'Naguilian Rd., Baguio City',
    schedule: 'Monday - Saturday\n8:00 AM - 5:00 PM',
    price: '₱1,500 - ₱7,000',
  },
  {
      id: '4',
      name: 'Peak Performance',
      image: require('../../../assets/images/peak-performance.png'),
      rating: 4.7,
      desc: 'La Trinidad, Baguio City',
      schedule: 'Monday - Sunday\n9:00 AM - 8:00 PM',
      price: '₱1,200 - ₱4,500',
    },
    {
      id: '5',
      name: 'Harmony',
      image: require('../../../assets/images/harmony.png'),
      rating: 4.85,
      desc: 'Upper Gen.Luna Rd., Baguio City',
      schedule: 'Monday - Sunday\n9:00 AM - 8:00 PM',
      price: '₱1,200 - ₱4,500',
    },
];

export default function ServicesPage() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  
  // Dynamic scaling calculations
  const scale = width / 375;
  const dynamicFontSize = (size: number) => Math.round(size * scale);
  const dynamicSpacing = (size: number) => Math.round(size * scale);
  
  // Calculate dynamic sizes
  const cardWidth = width * 0.75;
  const imageHeight = width * 0.3;
  const horizontalPadding = width * 0.05;

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>      <BlurFade delay={250} style={styles.headerRow}>
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="chevron-back" size={24} color="#B0B0B0" />
        </TouchableOpacity>
        <SparklesText style={styles.headerTitle}>Services</SparklesText>
        <View style={{ width: 24 }} />
      </BlurFade>      <BlurFade delay={500} style={styles.searchContainer}>
        <BoxReveal delay={100}>
          <TextInput style={styles.searchInput} placeholder="Search.." placeholderTextColor="#888" />
          <FontAwesome name="search" size={18} color="#888" style={{ position: 'absolute', right: 15, top: 12 }} />
        </BoxReveal>
      </BlurFade>

      <ScrollView 
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: height * 0.15 }
        ]} 
        showsVerticalScrollIndicator={false}
      >        <BlurFade delay={750}>
          <Text style={styles.sectionTitle}>Featured Services</Text>
        </BlurFade>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={[styles.featuredScroll, { paddingLeft: horizontalPadding }]}
        >
          {featuredServices.map((item, index) => (            <BlurFade key={item.id} delay={1000 + (index * 200)} direction="right">
              <FloatingAnimation animationType={index % 2 === 0 ? 'float' : 'floatReverse'} delay={200}>
                <BoxReveal delay={100}>
                  <View style={[styles.featuredCard, { width: cardWidth }]}>
                    <Image 
                      source={item.image} 
                      style={[styles.featuredImage, { height: imageHeight }]} 
                      resizeMode="cover" 
                    />
                    <View style={styles.featuredInfo}>
                      <Text style={styles.featuredName}>{item.name}</Text>
                      <View style={styles.featuredRow}>
                        <FontAwesome name="star" size={14} color="#EDAE49" />
                        <Text style={styles.featuredRating}>{item.rating}</Text>
                      </View>
                      <Text style={styles.featuredDesc}>{item.desc}</Text>
                      <Text style={styles.featuredPrice}>{item.price}</Text>
                      <TouchableOpacity style={styles.bookNowBtn}>
                        <Text style={styles.bookNowText}>Book Now</Text>
                      </TouchableOpacity>
                      {item.isPromo && (
                        <View style={styles.promoTag}>
                          <Text style={styles.promoText}>PROMO</Text>
                        </View>
                      )}
                    </View>
                  </View>
                </BoxReveal>
              </FloatingAnimation>
            </BlurFade>
          ))}
        </ScrollView>        <BlurFade delay={1400}>
          <Text style={styles.sectionTitle}>All Services</Text>
        </BlurFade>        {allServices.map((item, index) => (
          <BlurFade key={item.id} delay={1600 + (index * 150)} direction="up">
            <FloatingAnimation animationType={index % 3 === 0 ? 'float' : index % 3 === 1 ? 'floatReverse' : 'floatSlow'} delay={300}>
              <BoxReveal delay={100}>
                <View style={styles.serviceRow}>
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
                    <TouchableOpacity style={styles.bookNowBtnSmall}>
                      <Text style={styles.bookNowTextSmall}>Book Now</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </BoxReveal>
            </FloatingAnimation>
          </BlurFade>
        ))}
      </ScrollView>
      <BottomNavBar activePage='ServicesPage' />
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
    marginBottom: '2%',
    paddingHorizontal: '3%',
    height: Platform.OS === 'ios' ? 40 : 45,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#222',
  },
  sectionTitle: {
    fontSize: Platform.OS === 'ios' ? 16 : 18,
    fontWeight: 'bold',
    color: '#222',
    marginTop: '4%',
    marginBottom: '2%',
    marginLeft: '5%',
  },
  featuredScroll: {
    paddingLeft: '5%',
    marginBottom: 10,
  },  featuredCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginRight: 15,
    marginBottom: 10,
    width: 280, // Fixed width for consistency
    height: 180, // Fixed height for the card
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
    flexDirection: 'row', // Change to row layout
  },
  featuredImage: {
    width: '40%', // Take up 40% of card width
    height: '100%',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  featuredInfo: {
    padding: 12,
    flex: 1,
    justifyContent: 'space-between',
  },
  featuredName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222',
    marginBottom: 4,
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
  },  featuredDesc: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  featuredPrice: {
    fontSize: 13,
    fontWeight: '500',
    color: '#222',
    marginBottom: 8,
  },
  bookNowBtn: {
    backgroundColor: '#EDAE49',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
  },
  bookNowText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 12,
  },
  promoTag: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FF4B4B',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
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
    marginHorizontal: '5%',
    marginBottom: '3%',
    padding: '3%',
    minHeight: Platform.OS === 'ios' ? 80 : 90,
  },
  serviceImage: {
    width: '20%',
    aspectRatio: 1,
    borderRadius: 10,
    marginRight: '3%',
  },
  serviceInfo: {
    flex: 1,
    justifyContent: 'space-between',
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
    paddingVertical: '1%',
    paddingHorizontal: '3%',
    minWidth: '25%',
    alignItems: 'center',
  },
  bookNowTextSmall: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: Platform.OS === 'ios' ? 12 : 13,
  },
}); 
