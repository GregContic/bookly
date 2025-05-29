import { Feather, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import BottomNavBar from './components/BottomNavBar';
import { useAuth } from './context/AuthContext';

interface TileProps {
  label: string;
  onPress: () => void;
  iconName?: string;
  imageSource?: any;
}

interface InfoCardProps {
  title: string;
  description: string;
  onPress: () => void;
}

export default function HomePage() {
  const router = useRouter();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <LinearGradient
        colors={['#F8F5F0', '#EDAE49']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.gradientBackground}
      >
        <View style={styles.topCard}>
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {/* Header */}
            <LinearGradient
  colors={['#FFF7E0', '#F8F5F0']}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
  style={styles.headerGradient}
>
  <View style={styles.headerContent}>
    <View>
      <Text style={styles.welcomeText}>Welcome, User!</Text>
      <Text style={styles.subHeaderText}>What service are you looking for today?</Text>
    </View>
    <View style={styles.headerButtons}>
      <TouchableOpacity onPress={() => router.push('/HomePage')} style={styles.headerButton}>
        <MaterialIcons name="notifications-none" size={24} color="#EDAE49" />
      </TouchableOpacity>
    </View>
  </View>
</LinearGradient>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Search.."
                placeholderTextColor="#888"
              />
              <Feather name="search" size={20} color="#888" style={{ position: 'absolute', right: 15 }} />
            </View>

            {/* Business Categories */}
            <Text style={styles.sectionTitle}>Business Categories</Text>
            <View style={styles.tilesContainer}>
              <Tile label="Health & Wellness" imageSource={require('../assets/images/placeholder_lotus.png')} onPress={() => router.push('/ServicesPage')} />
              <Tile label="Beauty & Personal Care" imageSource={require('../assets/images/placeholder_scissors.png')} onPress={() => router.push('/ServicesPage')} />
              <Tile label="Automotive Services" imageSource={require('../assets/images/placeholder_hammer.png')} onPress={() => router.push('/ServicesPage')} />
              <Tile label="Tech & IT Services" imageSource={require('../assets/images/placeholder_monitor.png')} onPress={() => router.push('/ServicesPage')} />
              <Tile label="Fitness & Sports" imageSource={require('../assets/images/placeholder_muscle.png')} onPress={() => router.push('/ServicesPage')} />
              <Tile label="Home Services" imageSource={require('../assets/images/placeholder_house.png')} onPress={() => router.push('/ServicesPage')} />
            </View>

            {/* For You */}
            <Text style={styles.sectionTitle}>For you</Text>
            <View style={styles.cardList}>
              <InfoCard
                title="Pulse Fitness Center"
                description="⭐⭐⭐⭐⭐ 2.1km | Modern fitness center with certified trainers and group classes."
                onPress={() => router.push('/ServicesPage')} />
              <InfoCard
                title="The Glow Haven Spa"
                description="⭐⭐⭐⭐ 1.2km | Luxurious spa offering massages, facials and relaxation."
                onPress={() => router.push('/ServicesPage')} />
            </View>
          </ScrollView>
        </View>
        {/* Bottom Navigation Bar */}
        <BottomNavBar activePage='HomePage' />
      </LinearGradient>
    </SafeAreaView>
  );
}

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

const InfoCard: React.FC<InfoCardProps> = ({ title, description, onPress }) => (
  <TouchableOpacity style={styles.infoCard} onPress={onPress}>
    <View style={styles.cardImage}>
      <MaterialIcons name="image" size={40} color="#aaa" />
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
  safeArea: {
    flex: 1,
  },
  gradientBackground: {
    flex: 1,
  },
  topCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: 'hidden',
    marginTop: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 10,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 120,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },
  subHeaderText: {
    fontSize: 14,
    color: '#888',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
    marginBottom: 18,
    paddingHorizontal: 10,
    height: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#222',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#222',
    marginTop: 10,
  },
  tilesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
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
    width: 40,
    height: 40,
    marginBottom: 8,
  },
  tileText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#222',
    textAlign: 'center',
  },
  cardList: {
    marginTop: 5,
  },
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
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    marginLeft: 15,
  },
  headerGradient: {
    borderRadius: 20,
    marginBottom: 20,
    padding: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
