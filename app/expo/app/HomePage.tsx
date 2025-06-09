import { Feather, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Animated, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import BottomNavBar from './components/BottomNavBar';
import { useAuth } from './context/AuthContext';

interface TileProps {
  label: string;
  onPress: () => void;
  iconName?: string;
  imageSource?: any;
}

interface InfoCardProps {
  title: string;
  description: string;
  onPress: () => void;
  imageSource: any;
}

const mostBookedServices = [
  {
    id: 1,
    name: 'The Spa Wellness',
    image: require('../assets/images/spa-wellness.png'), // Replace with your actual image path
    rating: 4.95,
    reviews: 1238,
    description: 'A sanctuary of relaxation offering rejuvenating massages, facials, and holistic therapies to restore your mind and body. Step into a serene oasis where tranquility meets luxury, and let our expert therapists provide you with a truly rejuvenating experience.',
  },
  {
    id: 2,
    name: 'Shape Up Gym',
    image: require('../assets/images/shapeup_gym.png'), // Replace with your actual image path
    rating: 4.85,
    reviews: 1012,
    description: 'Your go-to fitness destination, offering state-of-the-art equipment, expert trainers, and a motivating environment to help you achieve your health and wellness goals. Join us and take the next step in your fitness journey!',
  },
  {
    id: 3,
    name: 'Urban Smiles',
    image: require('../assets/images/urban_smiles.png'), // Replace with your actual image path
    rating: 4.90,
    reviews: 980,
    description: 'Our experienced dentists offer a full range of services, from routine check-ups and teeth whitening to advanced holistic and cosmetic dental treatments. We help you achieve a healthy, vibrant smile. Book your appointment today and let your smile shine!',
  },
];

export default function HomePage() {
  const router = useRouter();
  const { signOut } = useAuth();
  const { width } = useWindowDimensions();

  // Animation values
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(50)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    // Sequence of animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['#F8F5F0', '#EDAE49']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.gradientBackground}
      >
        <Animated.View 
          style={[
            styles.topCard,
            {
              opacity: fadeAnim,
              transform: [
                { translateY: slideAnim },
                { scale: scaleAnim }
              ]
            }
          ]}
        >
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {/* Header */}
            <LinearGradient
              colors={['#FFF7E0', '#F8F5F0']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.headerGradient}
            >
              <Animated.View 
                style={[
                  styles.headerContent,
                  {
                    opacity: fadeAnim,
                    transform: [{ translateY: slideAnim }]
                  }
                ]}
              >
                <View>
                  <Text style={styles.welcomeText}>Welcome, User!</Text>
                  <Text style={styles.subHeaderText}>What service are you looking for today?</Text>
                </View>
                <View style={styles.headerButtons}>
                  <TouchableOpacity onPress={() => router.push('../HomePage')} style={styles.headerButton}>
                    <MaterialIcons name="notifications-none" size={24} color="#EDAE49" />
                  </TouchableOpacity>
                </View>
              </Animated.View>
            </LinearGradient>

            {/* Search Bar */}
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
                style={styles.searchInput}
                placeholder="Search.."
                placeholderTextColor="#888"
              />
              <Feather name="search" size={20} color="#888" style={{ position: 'absolute', right: 15 }} />
            </Animated.View>

            {/* Business Categories */}
            <Animated.Text 
              style={[
                styles.sectionTitle,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }]
                }
              ]}
            >
              Business Categories
            </Animated.Text>

            <Animated.View 
              style={[
                styles.tilesContainer,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }]
                }
              ]}
            >
              <Tile label="Health & Wellness" imageSource={require('../assets/images/placeholder_lotus.png')} onPress={() => router.push('/ServicesPage')} />
              <Tile label="Beauty & Personal Care" imageSource={require('../assets/images/placeholder_scissors.png')} onPress={() => router.push('/ServicesPage')} />
              <Tile label="Automotive Services" imageSource={require('../assets/images/placeholder_hammer.png')} onPress={() => router.push('/ServicesPage')} />
              <Tile label="Tech & IT Services" imageSource={require('../assets/images/placeholder_monitor.png')} onPress={() => router.push('/ServicesPage')} />
              <Tile label="Fitness & Sports" imageSource={require('../assets/images/placeholder_muscle.png')} onPress={() => router.push('/ServicesPage')} />
              <Tile label="Home Services" imageSource={require('../assets/images/placeholder_house.png')} onPress={() => router.push('/ServicesPage')} />
            </Animated.View>

            {/* For You */}
            <Animated.Text 
              style={[
                styles.sectionTitle,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }]
                }
              ]}
            >
              For you
            </Animated.Text>

            <Animated.View 
              style={[
                styles.cardList,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }]
                }
              ]}
            >
              <InfoCard
                title="Pulse Fitness Center"
                description="⭐⭐⭐⭐⭐ 2.1km | Modern fitness center with certified trainers and group classes."
                onPress={() => router.push('../ServicesPage')}
                imageSource={require('../assets/images/pulse.png')} />
              <InfoCard
                title="The Glow Haven Spa"
                description="⭐⭐⭐⭐ 1.2km | Luxurious spa offering massages, facials and relaxation."
                onPress={() => router.push('../ServicesPage')}
                imageSource={require('../assets/images/glow-haven-2.png')} />
            </Animated.View>

            {/* Most Booked Services */}
            <Animated.Text 
              style={[
                styles.sectionTitle,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }]
                }
              ]}
            >
              Most Booked Services
            </Animated.Text>

            <Animated.View 
              style={[
                styles.mostBookedList,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }]
                }
              ]}
            >
              {mostBookedServices.map(service => (
                <View key={service.id} style={styles.mostBookedCard}>
                  <Image source={service.image} style={styles.mostBookedImage} resizeMode="contain" />
                  <View style={styles.mostBookedContent}>
                    <Text style={styles.mostBookedTitle}>{service.name}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
                      <MaterialIcons name="star" size={16} color="#EDAE49" />
                      <Text style={{ fontWeight: 'bold', marginLeft: 2 }}>{service.rating}</Text>
                      <Text style={{ color: '#888', marginLeft: 4 }}>({service.reviews} Reviews)</Text>
                    </View>
                    <Text style={styles.mostBookedDescription} numberOfLines={3}>{service.description}</Text>
                    <TouchableOpacity style={styles.viewButton} onPress={() => router.push('../ServicesPage')}>
                      <Text style={styles.viewButtonText}>View</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </Animated.View>
          </ScrollView>
        </Animated.View>
        <BottomNavBar activePage='HomePage' />
      </LinearGradient>
    </SafeAreaView>
  );
}

const Tile: React.FC<TileProps> = ({ label, onPress, iconName, imageSource }) => (
  <TouchableOpacity style={styles.tile} onPress={onPress}>
    {imageSource ? (
      <Image source={imageSource} style={styles.tileImage} resizeMode="contain" />
    ) : (
      <MaterialIcons name={iconName as any} size={28} color="#EDAE49" style={{ marginBottom: 8 }} />
    )}
    <Text style={styles.tileText}>{label}</Text>
  </TouchableOpacity>
);

const InfoCard: React.FC<InfoCardProps> = ({ title, description, onPress, imageSource }) => (
  <TouchableOpacity style={styles.infoCard} onPress={onPress}>
    <View style={styles.cardImage}>
      <Image source={imageSource} style={styles.infoCardImage} resizeMode="cover" />
    </View>
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
      <TouchableOpacity style={styles.viewButton}>
        <Text style={styles.viewButtonText}>View</Text>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
  },
  topCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: 'hidden',
    marginTop: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  scrollContent: {
    padding: '5%',
    paddingBottom: 120,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },
  subHeaderText: {
    fontSize: 14,
    color: '#888',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 18,
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#222',
    marginTop: 10,
  },
  tilesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  tile: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 18,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  tileImage: {
    width: '30%',
    aspectRatio: 1,
    marginBottom: 8,
    resizeMode: 'contain',
  },
  tileText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#222',
    textAlign: 'center',
  },
  cardList: {
    marginTop: 5,
  },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  cardImage: {
    width: 60,
    height: 60,
    backgroundColor: '#eee',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 3,
    color: '#222',
  },
  cardDescription: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },
  viewButton: {
    alignSelf: 'flex-end',
    backgroundColor: '#EDAE49',
    paddingVertical: 5,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  viewButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    marginLeft: 15,
  },
  headerGradient: {
    borderRadius: 20,
    marginBottom: 20,
    padding: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoCardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  mostBookedList: {
    marginTop: 5,
  },
  mostBookedCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginBottom: 14,
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#eee',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  mostBookedImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
    marginRight: 10,
  },
  mostBookedContent: {
    flex: 1,
  },
  mostBookedTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#222',
  },
  mostBookedDescription: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
  },
});
