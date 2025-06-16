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
import BottomNavBar from '../../components/BottomNavBar';
import { InfoCard } from '../../components/_InfoCard';
import { Tile } from '../../components/_Tile';

// Animation Components
import { BentoGrid, BlurFade, BoxReveal, FloatingAnimation, SparklesText } from '../../components/animations';

// Constants & Styles
import { homeStyles } from '../../../lib/homeStyles';

// Services & Utils
import { serviceAPI } from '../../../lib/serviceAPI';

// Types
import { ServiceData } from '../../../lib/interfaces';

// Context
import { useAuth } from '../../context/AuthContext';

// Mock data (replace with API calls)
const mostBookedServices = [
  {
    id: 1,
    name: 'The Spa Wellness',
    image: require('../../../assets/images/spa-wellness.png'),
    rating: 4.95,
    reviews: 1238,
    description: 'A sanctuary of relaxation offering rejuvenating massages, facials, and holistic therapies to restore your mind and body. Step into a serene oasis where tranquility meets luxury, and let our expert therapists provide you with a truly rejuvenating experience.',
  },
  {
    id: 2,
    name: 'Shape Up Gym',
    image: require('../../../assets/images/shapeup_gym.png'),
    rating: 4.85,
    reviews: 1012,
    description: 'Your go-to fitness destination, offering state-of-the-art equipment, expert trainers, and a motivating environment to help you achieve your health and wellness goals. Join us and take the next step in your fitness journey!',
  },
  {
    id: 3,
    name: 'Urban Smiles',
    image: require('../../../assets/images/urban_smiles.png'),
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

  // Effects
  useEffect(() => {
    // Load data
    loadMostBookedServices();
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
      <Animated.View style={{ flex: 1 }}>        <ScrollView contentContainerStyle={homeStyles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <BlurFade delay={250} style={homeStyles.headerContent}>
            <BoxReveal>
              <SparklesText style={homeStyles.welcomeText}>
                Welcome, User!
              </SparklesText>
            </BoxReveal>
            <BlurFade delay={500} direction="up">
              <Text style={homeStyles.subHeaderText}>What service are you looking for today?</Text>
            </BlurFade>
            <View style={homeStyles.headerButtons}>
              <TouchableOpacity onPress={() => router.push('/(tabs)/home')} style={homeStyles.headerButton}>
                <MaterialIcons name="notifications-none" size={24} color="#EDAE49" />
              </TouchableOpacity>
            </View>
          </BlurFade>

          {/* Search Bar */}
          <BlurFade delay={750} style={homeStyles.searchContainer}>
            <BoxReveal delay={100}>
              <TextInput
                style={homeStyles.searchInput}
                placeholder="Search.."
                placeholderTextColor="#888"
                onSubmitEditing={(e) => handleSearch(e.nativeEvent.text)}
              />
              <Feather name="search" size={20} color="#888" style={{ position: 'absolute', right: 15 }} />
            </BoxReveal>
          </BlurFade>

          {/* Business Categories */}
          <BlurFade delay={1000}>
            <Text style={homeStyles.sectionTitle}>Business Categories</Text>
          </BlurFade>          <BentoGrid numColumns={3} animationDelay={150} style={{ marginVertical: 20 }}>
            <FloatingAnimation animationType="float" delay={200}>
              <Tile label="Health & Wellness" imageSource={require('../../../assets/images/placeholder_lotus.png')} onPress={() => router.push('../services')} />
            </FloatingAnimation>
            <FloatingAnimation animationType="floatReverse" delay={400}>
              <Tile label="Beauty & Personal Care" imageSource={require('../../../assets/images/placeholder_scissors.png')} onPress={() => router.push('../services')} />
            </FloatingAnimation>
            <FloatingAnimation animationType="floatSlow" delay={600}>
              <Tile label="Automotive Services" imageSource={require('../../../assets/images/placeholder_hammer.png')} onPress={() => router.push('../services')} />
            </FloatingAnimation>
            <FloatingAnimation animationType="floatTilt" delay={800}>
              <Tile label="Tech & IT Services" imageSource={require('../../../assets/images/placeholder_monitor.png')} onPress={() => router.push('../services')} />
            </FloatingAnimation>
            <FloatingAnimation animationType="float" delay={1000}>
              <Tile label="Fitness & Sports" imageSource={require('../../../assets/images/placeholder_muscle.png')} onPress={() => router.push('../services')} />
            </FloatingAnimation>
            <FloatingAnimation animationType="floatReverse" delay={1200}>
              <Tile label="Home Services" imageSource={require('../../../assets/images/placeholder_house.png')} onPress={() => router.push('../services')} />
            </FloatingAnimation>
          </BentoGrid>

          {/* For You */}
          <BlurFade delay={1400}>
            <Text style={homeStyles.sectionTitle}>For you</Text>
          </BlurFade>          <BlurFade delay={1600} style={homeStyles.cardList}>
            <BoxReveal delay={200}>
              <InfoCard                title="Pulse Fitness Center"
                description="⭐⭐⭐⭐⭐ 2.1km | Modern fitness center with certified trainers and group classes."
                onPress={() => router.push('../services')}
                imageSource={require('../../../assets/images/pulse.png')} />
            </BoxReveal>
            <BoxReveal delay={400}>
              <InfoCard
                title="The Glow Haven Spa"
                description="⭐⭐⭐⭐ 1.2km | Luxurious spa offering massages, facials and relaxation."
                onPress={() => router.push('../services')}
                imageSource={require('../../../assets/images/glow-haven-2.png')} />
            </BoxReveal>
          </BlurFade>

          {/* Most Booked Services */}
          <BlurFade delay={1800}>
            <Text style={homeStyles.sectionTitle}>Most Booked Services</Text>
          </BlurFade>

          <View style={homeStyles.mostBookedList}>
            {mostBookedServices.map((service, index) => (
              <BlurFade key={service.id} delay={2000 + (index * 200)} direction="up">
                <BoxReveal delay={100}>
                  <FloatingAnimation animationType={index % 2 === 0 ? 'float' : 'floatReverse'} delay={500}>
                    <View style={homeStyles.mostBookedCard}>
                      <Image source={service.image} style={homeStyles.mostBookedImage} resizeMode="contain" />
                      <View style={homeStyles.mostBookedContent}>
                        <Text style={homeStyles.mostBookedTitle}>{service.name}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
                          <MaterialIcons name="star" size={16} color="#EDAE49" />
                          <Text style={{ fontWeight: 'bold', marginLeft: 2 }}>{service.rating}</Text>
                          <Text style={{ color: '#888', marginLeft: 4 }}>({service.reviews} Reviews)</Text>
                        </View>
                        <Text style={homeStyles.mostBookedDescription} numberOfLines={3}>{service.description}</Text>                        <TouchableOpacity style={homeStyles.viewButton} onPress={() => router.push('../services')}>
                          <Text style={homeStyles.viewButtonText}>View</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </FloatingAnimation>
                </BoxReveal>
              </BlurFade>
            ))}
          </View>
        </ScrollView>
      </Animated.View>
      <BottomNavBar activePage='HomePage' />
    </SafeAreaView>
  );
}
