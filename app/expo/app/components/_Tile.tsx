import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { TileProps } from '../../lib/interfaces';

export const Tile: React.FC<TileProps> = ({ label, onPress, iconName, imageSource }) => (
  <TouchableOpacity style={styles.tile} onPress={onPress}>
    {imageSource ? (
      <Image source={imageSource} style={styles.tileImage} resizeMode="contain" />
    ) : (
      <MaterialIcons name={iconName as any} size={40} color="#EDAE49" style={{ marginBottom: 12 }} />
    )}
    <Text style={styles.tileText}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  tile: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    minHeight: 100,
  },
  tileImage: {
    width: 40,
    height: 40,
    marginBottom: 12,
    resizeMode: 'contain',
  },
  tileText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    lineHeight: 16,
  },
});
