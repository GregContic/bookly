import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Animated,
    FlatList,
    RefreshControl,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View, useWindowDimensions
} from 'react-native';
import ServiceCard from '../../_components/ServiceCard';
import TechItServicesAPI from '../../_services/techItServicesAPI';
import { Service } from '../../_types/interfaces';

/**
 * ===========================================
 * TECH & IT SERVICES PAGE COMPONENT
 * ===========================================
 */
export default function TechItServicesPage() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  
  // State management
  const [services, setServices] = useState<Service[]>([]);
  const [featuredServices, setFeaturedServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Animation values
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(30)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.95)).current;
  const featuredSlideAnim = React.useRef(new Animated.Value(50)).current;
  
  // Dynamic scaling calculations
  const scale = width / 375;
  const dynamicFontSize = (size: number) => Math.round(size * scale);
  const dynamicSpacing = (size: number) => Math.round(size * scale);
  
  // Calculate dynamic sizes
  const cardWidth = width * 0.75;
  const imageHeight = width * 0.3;
  const horizontalPadding = width * 0.05;

  // Load initial data
  const loadData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Load services and featured services in parallel
      const [allServices, featured] = await Promise.all([
        TechItServicesAPI.getAllServices(),
        TechItServicesAPI.getFeaturedServices()
      ]);
      
      setServices(allServices);
      setFeaturedServices(featured);
      setFilteredServices(allServices);
      
    } catch (err) {
      console.error('Error loading data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load services');
      Alert.alert(
        'Error',
        'Failed to load services. Please check your connection and try again.',
        [{ text: 'Retry', onPress: loadData }]
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Search functionality
  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setFilteredServices(services);
      return;
    }

    try {
      setIsSearching(true);
      const searchResults = await TechItServicesAPI.searchServices(query);
      setFilteredServices(searchResults);
    } catch (err) {
      console.error('Search error:', err);
      Alert.alert('Search Error', 'Failed to search services. Please try again.');
    } finally {
      setIsSearching(false);
    }
  }, [services]);

  // Pull to refresh
  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await loadData();
    setIsRefreshing(false);
  }, [loadData]);

  // Search input handler
  const handleSearchInputChange = (text: string) => {
    setSearchQuery(text);
    
    // Debounce search
    const timeoutId = setTimeout(() => {
      handleSearch(text);
    }, 300);
    
    return () => clearTimeout(timeoutId);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setFilteredServices(services);
  };

  useEffect(() => {
    loadData();
    
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
      Animated.timing(featuredSlideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleBack = () => {
    router.back();
  };

  const handleServicePress = (service: Service) => {
    // Navigate to service details or booking page
    // You can pass service data through route params
    router.push({
      pathname: '/(booking)/details',
      params: { serviceId: service.id, serviceName: service.name }
    });
  };

  // Render featured service item
  const renderFeaturedService = ({ item }: { item: Service }) => (
    <ServiceCard
      service={item}
      onPress={handleServicePress}
      style={{ width: cardWidth, marginHorizontal: 8 }}
    />
  );
  // Render main service item
  const renderService = ({ item }: { item: Service }) => (
    <ServiceCard
      service={item}
      onPress={handleServicePress}
      variant="compact"
    />
  );

  // Loading state
  if (isLoading && services.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#9C27B0" />
          <Text style={styles.loadingText}>Loading tech services...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <Animated.View 
        style={[
          styles.headerRow,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="chevron-back" size={24} color="#B0B0B0" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Tech & IT Services</Text>
        <TouchableOpacity>
          <Ionicons name="heart-outline" size={24} color="#B0B0B0" />
        </TouchableOpacity>
      </Animated.View>

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
          placeholder="Search tech services..."
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={handleSearchInputChange}
          onSubmitEditing={() => handleSearch(searchQuery)}
          returnKeyType="search"
        />
        {isSearching ? (
          <View style={styles.searchIndicator}>
            <ActivityIndicator size="small" color="#9C27B0" />
          </View>
        ) : searchQuery ? (
          <TouchableOpacity 
            onPress={handleClearSearch}
            style={styles.clearButton}
          >
            <Ionicons name="close-circle" size={20} color="#888" />
          </TouchableOpacity>
        ) : (
          <Ionicons name="search" size={20} color="#888" />
        )}
      </Animated.View>

      {/* Main Content */}
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={loadData}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filteredServices}
          renderItem={renderService}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={onRefresh}
              colors={['#9C27B0']}
              tintColor="#9C27B0"
            />
          }
          ListHeaderComponent={
            <>
              {/* Featured Services Section */}
              {featuredServices.length > 0 && (
                <>
                  <Animated.Text 
                    style={[
                      styles.sectionTitle,
                      {
                        opacity: fadeAnim,
                        transform: [{ translateY: slideAnim }]
                      }
                    ]}
                  >
                    Featured Services
                  </Animated.Text>
                  
                  <Animated.View
                    style={{
                      opacity: fadeAnim,
                      transform: [{ translateY: featuredSlideAnim }]
                    }}
                  >
                    <FlatList
                      data={featuredServices}
                      renderItem={renderFeaturedService}
                      keyExtractor={(item) => `featured_${item.id}`}
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={styles.featuredContainer}
                    />
                  </Animated.View>
                </>
              )}

              {/* All Services Header */}
              <Animated.Text 
                style={[
                  styles.sectionTitle,
                  {
                    opacity: fadeAnim,
                    transform: [{ translateY: slideAnim }]
                  }
                ]}
              >
                {searchQuery ? `Search Results (${filteredServices.length})` : 'All Services'}
              </Animated.Text>
            </>
          }
          ListEmptyComponent={
            !isLoading ? (
              <View style={styles.emptyContainer}>
                <Ionicons name="search-outline" size={48} color="#ccc" />
                <Text style={styles.emptyText}>
                  {searchQuery ? 'No services found' : 'No services available'}
                </Text>
                {searchQuery && (
                  <TouchableOpacity onPress={handleClearSearch}>
                    <Text style={styles.clearSearchText}>Clear search</Text>
                  </TouchableOpacity>
                )}
              </View>
            ) : null
          }
          contentContainerStyle={[
            styles.listContainer,
            { paddingBottom: height * 0.15 }
          ]}
        />
      )}      
    </SafeAreaView>
  );
}

/**
 * ===========================================
 * TECH & IT SERVICES PAGE STYLES
 * ===========================================
 */
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F5F0',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: 'transparent',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#9C27B0',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 16,
    marginBottom: 16,
    paddingHorizontal: 16,
    height: 48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  searchIndicator: {
    padding: 4,
  },
  clearButton: {
    padding: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 24,
    marginBottom: 16,
    marginHorizontal: 16,
  },
  featuredContainer: {
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  listContainer: {
    flexGrow: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#9C27B0',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 16,
  },
  clearSearchText: {
    fontSize: 16,
    color: '#9C27B0',
    marginTop: 16,
    textDecorationLine: 'underline',
  },
});
