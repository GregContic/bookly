import { FontAwesome, Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
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
}

export default function ServiceCard({ service, onPress, style }: ServiceCardProps) {
  const { width } = useWindowDimensions();
  const scale = width / 375;
  const dynamicFontSize = (size: number) => Math.round(size * scale);
  const dynamicSpacing = (size: number) => Math.round(size * scale);

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
          <View style={styles.promoTag}>
            <Text style={styles.promoText}>PROMO</Text>
          </View>
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

        {service.isPromo && service.promoText && (
          <View style={styles.promoContainer}>
            <Text style={[styles.promoDescription, { fontSize: dynamicFontSize(11) }]}>
              {service.promoText}
            </Text>
          </View>
        )}

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
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  serviceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
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
  },
  serviceImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  promoTag: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FF6B35',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  promoText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
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
  promoContainer: {
    backgroundColor: '#FFF3E0',
    padding: 6,
    borderRadius: 6,
    marginBottom: 8,
  },
  promoDescription: {
    color: '#FF8F00',
    fontWeight: '500',
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
  },
  moreAmenities: {
    color: '#999',
    fontStyle: 'italic',
  },
});
