import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from './context/AuthContext';

export default function Profile() {
  const { signOut } = useAuth();
  const router = useRouter();
  const [profileImage, setProfileImage] = useState('https://randomuser.me/api/portraits/men/1.jpg');
  const [coverPhoto, setCoverPhoto] = useState<string | null>(null);

  // Load saved images when component mounts
  useEffect(() => {
    loadSavedImages();
  }, []);

  const loadSavedImages = async () => {
    try {
      const savedProfileImage = await AsyncStorage.getItem('profileImage');
      const savedCoverPhoto = await AsyncStorage.getItem('coverPhoto');
      
      if (savedProfileImage) {
        setProfileImage(savedProfileImage);
      }
      if (savedCoverPhoto) {
        setCoverPhoto(savedCoverPhoto);
      }
    } catch (error) {
      console.error('Error loading saved images:', error);
    }
  };

  const pickImage = async (type: 'profile' | 'cover') => {
    // Request permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: type === 'profile' ? [1, 1] : [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      if (type === 'profile') {
        setProfileImage(result.assets[0].uri);
        // Save profile image
        try {
          await AsyncStorage.setItem('profileImage', result.assets[0].uri);
        } catch (error) {
          console.error('Error saving profile image:', error);
        }
      } else {
        setCoverPhoto(result.assets[0].uri);
        // Save cover photo
        try {
          await AsyncStorage.setItem('coverPhoto', result.assets[0].uri);
        } catch (error) {
          console.error('Error saving cover photo:', error);
        }
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      router.replace('/LogInPage');
    } catch (error) {
      Alert.alert('Error', 'Failed to log out. Please try again.');
    }
  };

  const handleBack = () => {
    router.push('/HomePage');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity 
        style={styles.coverPhotoSection} 
        onPress={() => pickImage('cover')}
      >
        {coverPhoto ? (
          <Image 
            source={{ uri: coverPhoto }} 
            style={styles.coverPhoto}
          />
        ) : (
          <Text style={styles.coverPhotoText}>Add Your Cover Photo</Text>
        )}
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#222" />
        </TouchableOpacity>
        <View style={styles.coverEditIconContainer}>
          <MaterialIcons name="edit" size={20} color="#fff" />
        </View>
      </TouchableOpacity>
      <View style={styles.profileSection}>
        <TouchableOpacity onPress={() => pickImage('profile')}>
          <Image
            source={{ uri: profileImage }}
            style={styles.profileImage}
          />
          <View style={styles.editIconContainer}>
            <MaterialIcons name="edit" size={20} color="#fff" />
          </View>
        </TouchableOpacity>
        <Text style={styles.profileName}>User</Text>
        <Text style={styles.profileEmail}>name@test.com</Text>
      </View>
      <View style={styles.buttonList}>
        <TouchableOpacity style={styles.profileButton}>
          <MaterialIcons name="person-outline" size={24} color="#EDAE49" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Account Setting</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileButton}>
          <MaterialIcons name="history" size={24} color="#EDAE49" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Appointment History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.profileButton}>
          <MaterialIcons name="help-outline" size={24} color="#EDAE49" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Support & Help Center</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.profileButton}
          onPress={handleLogout}
        >
          <MaterialIcons name="logout" size={24} color="#EDAE49" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 20,
  },
  coverPhotoSection: {
    backgroundColor: '#E5E5E5',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  coverPhoto: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  coverEditIconContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#EDAE49',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    zIndex: 1,
  },
  backButton: {
    position: 'absolute',
    left: 16,
    top: 28,
    zIndex: 1,
  },
  coverPhotoText: {
    color: '#888',
    fontSize: 13,
    marginTop: 30,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: -40,
    marginBottom: 10,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#fff',
    marginBottom: 6,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
  },
  profileEmail: {
    fontSize: 13,
    color: '#888',
    marginBottom: 10,
  },
  buttonList: {
    marginTop: 10,
    paddingHorizontal: 18,
  },
  profileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 18,
    borderWidth: 1.2,
    borderColor: '#EDAE49',
    paddingVertical: 14,
    paddingHorizontal: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonIcon: {
    marginRight: 14,
  },
  buttonText: {
    fontSize: 15,
    color: '#222',
    fontWeight: '500',
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#EDAE49',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
}); 