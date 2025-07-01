import { Feather, MaterialIcons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
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
import { InfoCard } from '../../../_components/InfoCard';
import { Tile } from '../../../_components/Tile';

// Constants & Styles
import { homeStyles } from '../../../_styles/homeStyles';

// Services & Utils
import { serviceAPI } from '../../../_services/serviceAPI';

// Types
import { ServiceData } from '../../../_types/interfaces';

// Context
import { useAuth } from '../../../../context/AuthContext';

// Mock data (replace with API calls)
const mostBookedServices = [
  {
    id: 'hw_006',
    name: 'The Spa Wellness',
    image: require('../../../../assets/images/spa-wellness.png'), // Replace with your actual image path
    rating: 4.95,
    reviews: 1238,
    description: 'A sanctuary of relaxation offering rejuvenating massages, facials, and holistic therapies to restore your mind and body. Step into a serene oasis where tranquility meets luxury, and let our expert therapists provide you with a truly rejuvenating experience.',
  },
  {
    id: 'fs_016',
    name: 'Shape Up Gym',
    image: require('../../../../assets/images/shapeup_gym.png'), // Replace with your actual image path
    rating: 4.85,
    reviews: 1012,
    description: 'Your go-to fitness destination, offering state-of-the-art equipment, expert trainers, and a motivating environment to help you achieve your health and wellness goals. Join us and take the next step in your fitness journey!',
  },
  {
    id: 'hw_002',
    name: 'Urban Smiles',
    image: require('../../../../assets/images/urban_smiles.png'), // Replace with your actual image path
    rating: 4.90,
    reviews: 980,
    description: 'Our experienced dentists offer a full range of services, from routine check-ups and teeth whitening to advanced holistic and cosmetic dental treatments. We help you achieve a healthy, vibrant smile. Book your appointment today and let your smile shine!',
  },
];

export default function HomePage() {
  // Hooks
  const router = useRouter();
  const navigation = useNavigation();
  const { signOut } = useAuth();
  const [services, setServices] = useState<ServiceData[]>(mostBookedServices);
  const [forYouServices, setForYouServices] = useState<ServiceData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<ServiceData[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  // Animation values
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(50)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.9)).current;
  const searchTimeout = React.useRef<number | null>(null);
  // Effects
  useEffect(() => {
    // Load data
    loadMostBookedServices();
    loadForYouServices();

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

    // Cleanup timeout on unmount
    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, []);

  // Data fetching
  const loadMostBookedServices = async () => {
    const data = await serviceAPI.getMostBookedServices();
    setServices(data);
  };

  const loadForYouServices = async () => {
    try {
      // Get all services from the API
      const allServices = await serviceAPI.getAllServices();
      
      // Shuffle and pick 3 random services
      const shuffled = [...allServices].sort(() => 0.5 - Math.random());
      const randomThree = shuffled.slice(0, 3);
      
      setForYouServices(randomThree);
    } catch (error) {
      console.error('Error loading For You services:', error);
      // Fallback to a subset of mostBookedServices if API fails
      const shuffled = [...mostBookedServices].sort(() => 0.5 - Math.random());
      setForYouServices(shuffled.slice(0, 3));
    }
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
    if (!query.trim()) {
      // Clear search results if query is empty
      setShowSearchResults(false);
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    try {
      const results = await serviceAPI.searchServices(query);
      setSearchResults(results);
      setShowSearchResults(true);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
      setShowSearchResults(true);
    } finally {
      setIsSearching(false);
    }
  };

  // Real-time search handler
  const handleSearchInputChange = (text: string) => {
    setSearchQuery(text);
    
    // Debounce the search to avoid too many API calls
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    
    if (text.trim()) {
      searchTimeout.current = setTimeout(() => {
        handleSearch(text);
      }, 300); // Wait 300ms after user stops typing
    } else {
      handleClearSearch();
    }
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowSearchResults(false);
  };

  const handleServicePress = (service: ServiceData) => {
    // Navigate to service detail page
    console.log('🚀 Navigating to service detail page:', service.id);
    console.log('🚀 Service object:', service);
    console.log('🚀 Using router.push with path:', `/(services)/${service.id}`);
    try {
      router.push(`/(services)/${service.id}`);
      console.log('✅ Navigation call completed');
    } catch (error) {
      console.error('💥 Navigation error:', error);
    }
  };

  return (    <SafeAreaView style={homeStyles.safeArea}>
      <LinearGradient
        colors={['rgba(255, 192, 203, 0.08)', 'rgba(255, 182, 193, 0.04)', 'rgba(255, 192, 203, 0.02)']}
        style={homeStyles.pinkCircle}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0, 0.5, 1]}
      />
      <LinearGradient
        colors={['rgba(255, 192, 203, 0.08)', 'rgba(255, 182, 193, 0.04)', 'rgba(255, 192, 203, 0.02)']}
        style={homeStyles.pinkCircleRight}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0, 0.5, 1]}
      />
      <LinearGradient
        colors={['rgba(255, 192, 203, 0.08)', 'rgba(255, 182, 193, 0.04)', 'rgba(255, 192, 203, 0.02)']}
        style={homeStyles.orangeCircleBottom}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0, 0.5, 1]}
      />
      <LinearGradient
        colors={['rgba(255, 192, 203, 0.08)', 'rgba(255, 182, 193, 0.04)', 'rgba(255, 192, 203, 0.02)']}
        style={homeStyles.pinkCircleBottomRight}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        locations={[0, 0.5, 1]}
      />
      <Animated.View style={{ flex: 1 }}>
        <ScrollView 
          contentContainerStyle={homeStyles.scrollContent} 
          showsVerticalScrollIndicator={false}
          bounces={true}
          scrollEventThrottle={16}
          keyboardShouldPersistTaps="handled"
          style={{ flex: 1 }}
        >
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
              </View>              <View style={homeStyles.headerButtons}>
                <TouchableOpacity onPress={() => router.push('/AppointmentHistory')} style={homeStyles.headerButton}>
                  <MaterialIcons name="notifications-none" size={24} color="#EDAE49" />
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => navigation.dispatch(DrawerActions.openDrawer())} 
                  style={homeStyles.headerButton}
                >
                  <MaterialIcons name="menu" size={24} color="#EDAE49" />
                </TouchableOpacity>
              </View>
            </Animated.View>
          
          {/* Search Bar */}
          <Animated.View 
            style={[
              homeStyles.searchContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]              }
            ]}
          >
            <TextInput
              style={homeStyles.searchInput}
              placeholder="Search..."
              placeholderTextColor="#888"
              value={searchQuery}
              onChangeText={handleSearchInputChange}
              onSubmitEditing={(e) => handleSearch(e.nativeEvent.text)}
              returnKeyType="search"
            />
            {isSearching ? (
              <View style={{ position: 'absolute', right: 15 }}>
                <Text style={{ color: '#888', fontSize: 12 }}>Searching...</Text>
              </View>
            ) : searchQuery ? (
              <TouchableOpacity 
                onPress={handleClearSearch}
                style={{ position: 'absolute', right: 15 }}
              >
                <Feather name="x" size={20} color="#888" />
              </TouchableOpacity>
            ) : (              <Feather name="search" size={20} color="#888" style={{ position: 'absolute', right: 15 }} />
            )}
          </Animated.View>

          {/* Quick Search Suggestions - Only show when not searching */}
          {!showSearchResults && !searchQuery && (
            <Animated.View 
              style={[
                homeStyles.quickSearchContainer,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }]
                }
              ]}
            >
              <Text style={homeStyles.quickSearchTitle}>Popular searches:</Text>
              <View style={homeStyles.quickSearchTags}>
                {['Gym', 'Spa', 'Salon', 'Dental', 'Massage', 'Fitness'].map((tag) => (                  <TouchableOpacity
                    key={tag}
                    style={homeStyles.quickSearchTag}
                    onPress={() => {
                      setSearchQuery(tag);
                      handleSearch(tag);
                    }}
                  >
                    <Text style={homeStyles.quickSearchTagText}>{tag}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Animated.View>
          )}

          {/* Search Results */}
          {showSearchResults && (
            <Animated.View 
              style={[
                homeStyles.searchResultsContainer,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }]
                }
              ]}
            >
              <View style={homeStyles.searchHeader}>
                <Text style={homeStyles.searchHeaderText}>
                  {searchResults.length > 0 
                    ? `Found ${searchResults.length} result${searchResults.length > 1 ? 's' : ''} for "${searchQuery}"`
                    : `No results found for "${searchQuery}"`
                  }
                </Text>
                <TouchableOpacity onPress={handleClearSearch}>
                  <Text style={homeStyles.clearSearchText}>Clear</Text>
                </TouchableOpacity>
              </View>
                {searchResults.length > 0 && (
                <View style={homeStyles.searchResultsList}>
                  {searchResults.map((service, index) => (
                    <TouchableOpacity
                      key={`${service.id}-${index}`}
                      style={homeStyles.searchResultItem}
                      onPress={() => handleServicePress(service)}
                    >
                      <Image source={service.image} style={homeStyles.searchResultImage} />
                      <View style={homeStyles.searchResultContent}>
                        <Text style={homeStyles.searchResultTitle}>{service.name}</Text>
                        <Text style={homeStyles.searchResultCategory}>{service.category}</Text>
                        <View style={homeStyles.searchResultRating}>
                          <MaterialIcons name="star" size={14} color="#EDAE49" />
                          <Text style={homeStyles.ratingText}>{service.rating}</Text>
                          <Text style={homeStyles.reviewText}>({service.reviews} reviews)</Text>
                        </View>
                        <Text style={homeStyles.searchResultDescription} numberOfLines={2}>
                          {service.description}
                        </Text>
                        {service.price && (
                          <Text style={homeStyles.searchResultPrice}>{service.price}</Text>
                        )}
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </Animated.View>          )}

          {/* Main Content - Hidden when showing search results */}
          {!showSearchResults && (
            <>
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
            ]}          >            <Tile label="Health & Wellness" imageSource={require('../../../../assets/images/placeholder_lotus.png')} onPress={() => router.push('/(services)/health-wellness')} />
            <Tile label="Beauty & Personal Care" imageSource={require('../../../../assets/images/placeholder_scissors.png')} onPress={() => router.push('/(services)/beauty-personal-care')} />
            <Tile label="Automotive Services" imageSource={require('../../../../assets/images/placeholder_hammer.png')} onPress={() => router.push('/(services)/automotive-services')} />
            <Tile label="Tech & IT Services" imageSource={require('../../../../assets/images/placeholder_monitor.png')} onPress={() => router.push('/(services)/tech-it-services')} />
            <Tile label="Fitness & Sports" imageSource={require('../../../../assets/images/placeholder_muscle.png')} onPress={() => router.push('/(services)/fitness-sports')} />
            <Tile label="Home Services" imageSource={require('../../../../assets/images/placeholder_house.png')} onPress={() => router.push('/(services)/home-services')} />
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
          </Animated.Text>          <Animated.View 
            style={[
              homeStyles.cardList,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            {forYouServices.map((service, index) => (
              <InfoCard
                key={`${service.id}-${index}`}
                title={service.name}
                description={`⭐ ${service.rating} | ${service.description.substring(0, 80)}...`}
                onPress={() => {
                  console.log('🚀 InfoCard clicked:', service.id);
                  router.push(`/(services)/${service.id}`);
                }}
                imageSource={service.image}
              />
            ))}
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
                  </View>                  <Text style={homeStyles.mostBookedDescription} numberOfLines={3}>{service.description}</Text>                  <TouchableOpacity 
                    style={homeStyles.viewButton} 
                    onPress={() => {
                      console.log('🚀 Most Booked Service clicked:', service.id);
                      router.push(`/(services)/${service.id}`);
                    }}
                  >
                    <Text style={homeStyles.viewButtonText}>View</Text>
                  </TouchableOpacity>
                </View>
              </View>            ))}          </Animated.View>
            </>
          )}
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
}
