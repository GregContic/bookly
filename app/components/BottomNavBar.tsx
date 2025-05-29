import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface BottomNavBarProps {
  activePage: 'HomePage' | 'ServicesPage' | 'Profile' | 'BookAppointmentPage' | 'SavedPage';
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ activePage }) => {
  const router = useRouter();

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity style={styles.navItem} onPress={() => router.push('/HomePage')}>
        <Ionicons name="home-outline" size={24} color={activePage === 'HomePage' ? '#EDAE49' : '#B0B0B0'} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => router.push('/ServicesPage')}>
        <Ionicons name="apps-outline" size={24} color={activePage === 'ServicesPage' ? '#EDAE49' : '#B0B0B0'} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.centerNavButton} onPress={() => router.push('/BookAppointmentPage')}>
        <Ionicons name="calendar-outline" size={28} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => router.push('/SavedPage')}>
        <Ionicons name="bookmark-outline" size={24} color={activePage === 'SavedPage' ? '#EDAE49' : '#B0B0B0'} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => router.push('/Profile')}>
        <Ionicons name="person-outline" size={24} color={activePage === 'Profile' ? '#EDAE49' : '#B0B0B0'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around', // Use space-around for even distribution
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 10, // Adjust horizontal padding
    paddingVertical: 5, // Adjust vertical padding
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 45, // Elevated from the bottom
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    height: 60, // Set a fixed height for the nav bar
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 15, // Adjust padding top for alignment with elevated center button
    paddingBottom: 5, // Add padding bottom
  },
  centerNavButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#EDAE49',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -30, // Adjust negative margin top for elevation effect
    shadowColor: '#EDAE49',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
    borderWidth: 4,
    borderColor: '#fff',
  },
});

export default BottomNavBar; 