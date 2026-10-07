import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { InfoCardProps } from '../_types/interfaces';

const InfoCard: React.FC<InfoCardProps> = ({ title, description, onPress, imageSource }) => (
  <TouchableOpacity style={styles.infoCard} onPress={onPress}>
    <View style={styles.cardImage}>
      <Image source={imageSource} style={styles.infoCardImage} resizeMode="cover" />
    </View>
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
      <TouchableOpacity style={styles.viewButton} onPress={onPress}>
        <Text style={styles.viewButtonText}>View</Text>
      </TouchableOpacity>
    </View>
  </TouchableOpacity>
);

export { InfoCard };

const styles = StyleSheet.create({
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#9e9999',
    overflow: 'hidden',
    minHeight: 130,
    padding: 8,
    width: '103%',
    alignSelf: 'center',
  },
  cardImage: {
    width: 80,
    height: 80,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderColor: '#9e9999',
    overflow: 'hidden',
    marginRight: 12,
  },
  infoCardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  cardContent: {
    flex: 1,
    justifyContent: 'space-between',
    minHeight: 110,
    position: 'relative',
    paddingVertical: 4,
    paddingRight: 0,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#222',
    lineHeight: 20,
  },
  cardDescription: {
    fontSize: 12,
    color: '#666',
    marginBottom: 12,
    lineHeight: 16,
    flex: 1,
    paddingRight: 0,
  },
  viewButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#EDAE49',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadowColor: '#EDAE49',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  viewButtonText: {
    color: '#000000',
    fontSize: 13,
    fontWeight: '600',
  },
});

export default InfoCard;
