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
    width: '49%',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 9,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.7,
    borderColor: 'rgb(0, 0, 0)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tileImage: {
    width: '25%',
    aspectRatio: 1,
    marginBottom: 6,
    resizeMode: 'contain',
  },
  tileText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#222',
    textAlign: 'center',
  },
});
