import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { TileProps } from '../_types/interfaces';

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

export { Tile };
export default Tile;

const styles = StyleSheet.create({
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
});
