import { FontAwesome, Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions
} from 'react-native';
import { Service } from '../_types/interfaces';

interface ServiceCardProps {
  service: Service;
  onPress: (service: Service) => void;
  style?: any;
  variant?: 'default' | 'compact';
}

export default function ServiceCard({ service, onPress, style, variant = 'default' }: ServiceCardProps) {
  const { width } = useWindowDimensions();
  const scale = width / 375;
  const dynamicFontSize = (size: number) => Math.round(size * scale);
  const dynamicSpacing = (size: number) => Math.round(size * scale);

  // Animation state for promo tag
  const [isPromoExpanded, setIsPromoExpanded] = useState(false);
  const promoWidthAnim = useRef(new Animated.Value(60)).current; // Initial width for "PROMO" text
  const promoOpacityAnim = useRef(new Animated.Value(1)).current;

  const formatPriceRange = () => {
    return `₱${service.priceRange.min.toLocaleString()} - ₱${service.priceRange.max.toLocaleString()}`;
  };
  const formatSchedule = () => {
    const today = new Date().getDay();
    const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const todaySchedule = service.schedule[days[today] as keyof typeof service.schedule];
    
    if (todaySchedule.isOpen) {
      return `Open today: ${todaySchedule.open} - ${todaySchedule.close}`;
    } else {
      return 'Closed today';
    }
  };

  // Handle promo tag click animation
  const handlePromoClick = () => {
    if (!service.promoText) return;

    if (isPromoExpanded) {
      // Collapse animation
      Animated.parallel([
        Animated.timing(promoWidthAnim, {
          toValue: 60,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(promoOpacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start(() => {
        setIsPromoExpanded(false);
      });
    } else {
      // Expand animation
      setIsPromoExpanded(true);
      Animated.parallel([
        Animated.timing(promoWidthAnim, {
          toValue: Math.min(width * 0.7, 250), // Max width based on screen size
          duration: 400,
          useNativeDriver: false,
        }),
        Animated.timing(promoOpacityAnim, {
          toValue: 0.95,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    }
  };

  // Compact card layout for the image style
  if (variant === 'compact') {
    return (
      <TouchableOpacity
        style={[styles.compactCard, style]}
        onPress={() => onPress(service)}
        activeOpacity={0.8}
      >
        {/* Left: Business Logo */}
        <View style={styles.compactImageContainer}>
          <Image source={service.image} style={styles.compactLogo} />
        </View>

        {/* Right: Business Info and Button */}
        <View style={styles.compactRightSection}>
          {/* Business Info */}
          <View style={styles.compactContent}>
            <Text style={styles.compactBusinessName} numberOfLines={1}>
              {service.name}
            </Text>
            <Text style={styles.compactLocation} numberOfLines={1}>
              📍 {service.location}
            </Text>
            <Text style={styles.compactSchedule} numberOfLines={1}>
              🕒 {formatSchedule()}
            </Text>
            <Text style={styles.compactPrice}>
              {formatPriceRange()}/session
            </Text>
          </View>

          {/* Book Now Button - Below the text content */}
          <View style={styles.compactButtonContainer}>
            <TouchableOpacity style={styles.bookNowButton} onPress={() => onPress(service)}>
              <Text style={styles.bookNowText}>Book Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={[styles.serviceCard, { width: width * 0.9 }, style]}
      onPress={() => onPress(service)}
      activeOpacity={0.8}
    >
      {/* Service Image */}
      <View style={styles.imageContainer}>
        <Image source={service.image} style={styles.serviceImage} />
        {service.isPromo && (
          <Animated.View style={[
            styles.promoTag,
            {
              width: promoWidthAnim,
              opacity: promoOpacityAnim,
            }
          ]}>
            <TouchableOpacity 
              onPress={handlePromoClick}
              style={styles.promoTouchable}
              activeOpacity={0.8}
            >
              {isPromoExpanded && service.promoText ? (
                <Text style={styles.promoTextExpanded} numberOfLines={2}>
                  {service.promoText}
                </Text>
              ) : (
                <View style={styles.promoContent}>
                  <Text style={styles.promoText}>PROMO</Text>
                  {service.promoText && (
                    <Ionicons name="chevron-forward" size={12} color="#FFFFFF" style={styles.promoIcon} />
                  )}
                </View>
              )}
            </TouchableOpacity>
          </Animated.View>
        )}
        {service.isVerified && (
          <View style={styles.verifiedBadge}>
            <Ionicons name="checkmark-circle" size={16} color="#4CAF50" />
          </View>
        )}
      </View>

      {/* Service Details */}
      <View style={styles.serviceDetails}>
        <View style={styles.headerRow}>
          <Text style={[styles.serviceName, { fontSize: dynamicFontSize(16) }]} numberOfLines={1}>
            {service.name}
          </Text>
          <View style={styles.ratingContainer}>
            <FontAwesome name="star" size={12} color="#FFD700" />
            <Text style={styles.ratingText}>{service.rating}</Text>
            <Text style={styles.reviewCount}>({service.reviewCount})</Text>
          </View>
        </View>

        <Text style={[styles.serviceDescription, { fontSize: dynamicFontSize(12) }]} numberOfLines={2}>
          {service.shortDescription}
        </Text>

        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={14} color="#666" />
          <Text style={[styles.locationText, { fontSize: dynamicFontSize(11) }]} numberOfLines={1}>
            {service.location}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <View style={styles.priceContainer}>
            <Text style={[styles.priceText, { fontSize: dynamicFontSize(14) }]}>
              {formatPriceRange()}
            </Text>
          </View>
          <Text style={[styles.scheduleText, { fontSize: dynamicFontSize(10) }]}>
            {formatSchedule()}
          </Text>
        </View>

        {/* Amenities */}
        <View style={styles.amenitiesContainer}>
          {service.amenities.slice(0, 3).map((amenity, index) => (
            <View key={index} style={styles.amenityTag}>
              <Text style={[styles.amenityText, { fontSize: dynamicFontSize(9) }]}>
                {amenity}
              </Text>
            </View>
          ))}
          {service.amenities.length > 3 && (
            <Text style={[styles.moreAmenities, { fontSize: dynamicFontSize(9) }]}>
              +{service.amenities.length - 3} more
            </Text>
          )}
        </View>

        {/* Book Now Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.featuredBookNowButton} onPress={() => onPress(service)}>
            <Text style={styles.featuredBookNowText}>Book Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  serviceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 9,
    borderWidth: 0.8,
    borderColor: '#9e9999',
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    height: 150,
    padding: 10,
    marginBottom: 12,
  },
  serviceImage: {
    width: '100%',
    height: '115%',
    resizeMode: 'cover',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#9e9999',
  },
  promoTag: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FF6B35',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    minHeight: 28,
    justifyContent: 'center',
    alignItems: 'flex-start',
    shadowColor: '#FF6B35',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 10,
  },
  promoTouchable: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 4,
  },
  promoContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  promoText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  promoIcon: {
    marginLeft: 2,
  },
  promoTextExpanded: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: '600',
    textAlign: 'left',
    lineHeight: 12,
    flexWrap: 'wrap',
  },
  verifiedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 4,
  },
  serviceDetails: {
    padding: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 6,
  },
  serviceName: {
    flex: 1,
    fontWeight: 'bold',
    color: '#2C2C2C',
    marginRight: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2C2C2C',
    marginLeft: 2,
  },
  reviewCount: {
    fontSize: 10,
    color: '#666',
    marginLeft: 2,
  },
  serviceDescription: {
    color: '#666',
    marginBottom: 8,
    lineHeight: 16,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    flex: 1,
    color: '#666',
    marginLeft: 4,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  priceContainer: {
    flex: 1,
  },
  priceText: {
    fontWeight: 'bold',
    color: '#EDAE49',
  },
  scheduleText: {
    color: '#666',
    fontStyle: 'italic',
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  amenityTag: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 10,
    marginRight: 4,
    marginBottom: 2,
  },
  amenityText: {
    color: '#666',
  },  moreAmenities: {
    color: '#999',
    fontStyle: 'italic',
  },
  buttonContainer: {
    alignItems: 'flex-end',
    marginTop: 12,
  },
  featuredBookNowButton: {
    backgroundColor: '#EDAE49',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 5,
    shadowColor: '#EDAE49',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },
  featuredBookNowText: {
    color: '#000000',
    fontSize: 12,
    fontWeight: 'bold',
  },  // Compact card styles for horizontal layout
  compactCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 9,
    marginVertical: 6,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    minHeight: 110,
    borderColor: '#9e9999',
    borderWidth: 0.8,
    position: 'relative',
  },
  compactImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 12,
    overflow: 'hidden',
    marginRight: 16,
    backgroundColor: '#F5F5F5',
  },
  compactLogo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  compactContent: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 4,
  },
  compactRightSection: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: 80,
  },
  compactButtonContainer: {
    alignItems: 'flex-end',
    marginTop: 8,
    paddingTop: 4,
  },
  compactBusinessName: {
    fontSize: 14,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 6,
    lineHeight: 22,
  },
  compactLocation: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  compactSchedule: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  compactPrice: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#EDAE49',
  },
  bookNowButton: {
    backgroundColor: '#EDAE49',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    minWidth: 80,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#EDAE49',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 2,
  },
  bookNowText: {
    color: '#000000',
    fontSize: 12,
    fontWeight: 'bold',
  },
});
