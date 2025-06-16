import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { InfoCardProps } from '../../lib/interfaces';

export const InfoCard: React.FC<InfoCardProps> = ({ title, description, onPress, imageSource }) => (
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
  infoCardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
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
});
