import { Feather, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Animated,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

// Components
import BottomNavBar from './components/BottomNavBar';
import { InfoCard } from './components/InfoCard';
import { Tile } from './components/Tile';

// Constants & Styles
import { homeStyles } from './styles/homeStyles';

// Services & Utils
import { serviceAPI } from './services/serviceAPI';

// Types
import { ServiceData } from './types/interfaces';

// Context
import { useAuth } from './context/AuthContext';

// Mock data (replace with API calls)
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
  // Hooks
  const router = useRouter();
  const { signOut } = useAuth();
  const [services, setServices] = useState<ServiceData[]>(mostBookedServices);

  // Animation values
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(50)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.9)).current;

  // Effects
  useEffect(() => {
    // Load data
    loadMostBookedServices();

    // Start animations
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

  // Data fetching
  const loadMostBookedServices = async () => {
    const data = await serviceAPI.getMostBookedServices();
    setServices(data);
  };

  // Event handlers
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleSearch = async (query: string) => {
    if (query.trim()) {
      const results = await serviceAPI.searchServices(query);
      setServices(results);
    }
  };

  return (
    <SafeAreaView style={homeStyles.safeArea}>
      <LinearGradient
        colors={['rgba(255, 192, 203, 0.6)', 'rgba(255, 182, 193, 0.2)', 'rgba(255, 192, 203, 0.1)']}
        style={homeStyles.pinkCircle}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0, 0.5, 1]}
      />
      <LinearGradient
        colors={['rgba(255, 192, 203, 0.6)', 'rgba(255, 182, 193, 0.2)', 'rgba(255, 192, 203, 0.1)']}
        style={homeStyles.pinkCircleRight}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0, 0.5, 1]}
      />
      <Animated.View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={homeStyles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Header */}
          
            <Animated.View 
              style={[
                homeStyles.headerContent,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }]
                }
              ]}
            >
              <View>
                <Text style={homeStyles.welcomeText}>Welcome, User!</Text>
                <Text style={homeStyles.subHeaderText}>What service are you looking for today?</Text>
              </View>
              <View style={homeStyles.headerButtons}>
                <TouchableOpacity onPress={() => router.push('../HomePage')} style={homeStyles.headerButton}>
                  <MaterialIcons name="notifications-none" size={24} color="#EDAE49" />
                </TouchableOpacity>
              </View>
            </Animated.View>

          {/* Search Bar */}
          <Animated.View 
            style={[
              homeStyles.searchContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <TextInput
              style={homeStyles.searchInput}
              placeholder="Search.."
              placeholderTextColor="#888"
              onSubmitEditing={(e) => handleSearch(e.nativeEvent.text)}
            />
            <Feather name="search" size={20} color="#888" style={{ position: 'absolute', right: 15 }} />
          </Animated.View>

          {/* Business Categories */}
          <Animated.Text 
            style={[
              homeStyles.sectionTitle,
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
              homeStyles.tilesContainer,
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
              homeStyles.sectionTitle,
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
              homeStyles.cardList,
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
              homeStyles.sectionTitle,
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
              homeStyles.mostBookedList,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            {mostBookedServices.map(service => (
              <View key={service.id} style={homeStyles.mostBookedCard}>
                <Image source={service.image} style={homeStyles.mostBookedImage} resizeMode="contain" />
                <View style={homeStyles.mostBookedContent}>
                  <Text style={homeStyles.mostBookedTitle}>{service.name}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
                    <MaterialIcons name="star" size={16} color="#EDAE49" />
                    <Text style={{ fontWeight: 'bold', marginLeft: 2 }}>{service.rating}</Text>
                    <Text style={{ color: '#888', marginLeft: 4 }}>({service.reviews} Reviews)</Text>
                  </View>
                  <Text style={homeStyles.mostBookedDescription} numberOfLines={3}>{service.description}</Text>
                  <TouchableOpacity style={homeStyles.viewButton} onPress={() => router.push('../ServicesPage')}>
                    <Text style={homeStyles.viewButtonText}>View</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </Animated.View>
        </ScrollView>
      </Animated.View>
      <BottomNavBar activePage='HomePage' />
    </SafeAreaView>
  );
}
