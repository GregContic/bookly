import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';
import { useAuth } from '../../context/AuthContext';

const STORAGE_KEY = 'userProfileData';
const COVER_PHOTO_KEY = 'userCoverPhoto';

export default function Profile() {
  const { signOut } = useAuth();
  const router = useRouter();
  const [profileImage, setProfileImage] = useState('https://randomuser.me/api/portraits/men/1.jpg');
  const [coverPhoto, setCoverPhoto] = useState<string | null>(null);
  const [fullName, setFullName] = useState('User Test');
  const [username, setUsername] = useState('User');
  const [email, setEmail] = useState('name@test.com');
  const { width, height } = useWindowDimensions();
  const [orientation, setOrientation] = useState('PORTRAIT');

  // Dynamic scaling calculations
  const scale = width / 375; // Using 375 as base width (iPhone standard)
  const dynamicFontSize = (size: number) => Math.round(size * scale);
  const dynamicSpacing = (size: number) => Math.round(size * scale);

  const loadProfileData = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        setProfileImage(parsed.profileImage || 'https://randomuser.me/api/portraits/men/1.jpg');
        setFullName(parsed.fullName || 'User Test');
        setUsername(parsed.username || 'User');
        setEmail(parsed.email || 'name@test.com');
      }
    } catch (e) {
      // fallback to defaults
    }
  };

  const loadCoverPhoto = async () => {
    try {
      const uri = await AsyncStorage.getItem(COVER_PHOTO_KEY);
      if (uri) setCoverPhoto(uri);
      else setCoverPhoto(null);
    } catch (e) {
      setCoverPhoto(null);
    }
  };

  useEffect(() => {
    loadProfileData();
    loadCoverPhoto();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadProfileData();
      loadCoverPhoto();
    }, [])
  );

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setOrientation(window.width < window.height ? 'PORTRAIT' : 'LANDSCAPE');
    });

    return () => subscription?.remove();
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
          await AsyncStorage.setItem(COVER_PHOTO_KEY, result.assets[0].uri);
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
    router.back();
  };

  return (
    <SafeAreaView style={[styles.safeArea, { marginTop: dynamicSpacing(45) }]}>
      <View style={[styles.coverPhotoSection, { height: width * 0.45 }]}>
        <TouchableOpacity 
          onPress={handleBack} 
          style={[styles.backButton, { 
            left: dynamicSpacing(16), 
            top: dynamicSpacing(16),
            padding: 10,
            zIndex: 2
          }]}
        >
          <Ionicons name="arrow-back" size={dynamicFontSize(24)} color="#222" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.coverPhotoTouchable} onPress={() => pickImage('cover')}>
          {coverPhoto ? (
            <Image 
              source={{ uri: coverPhoto }} 
              style={[styles.coverPhoto, { 
                width: width,
                height: width * 0.45 
              }]} 
            />
          ) : (
            <View style={styles.coverPhotoPrompt}>
              <Ionicons 
                name="camera-outline" 
                size={dynamicFontSize(22)} 
                color="#aaa" 
                style={{ marginBottom: dynamicSpacing(2) }} 
              />
              <Text style={[styles.coverPhotoText, { fontSize: dynamicFontSize(13) }]}>
                Add Your Cover Photo
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      <View style={[styles.profileRow, { marginTop: dynamicSpacing(-40) }]}>
        <Image
          source={{ uri: profileImage }}
          style={[styles.profileImage, { 
            width: width * 0.28, 
            height: width * 0.28, 
            borderRadius: (width * 0.28) / 2,
            borderWidth: dynamicSpacing(3)
          }]}
        />
        <View style={[styles.profileInfo, { marginLeft: dynamicSpacing(16) }]}>
          <Text style={[styles.profileName, { fontSize: dynamicFontSize(18) }]}>
            {fullName}
          </Text>
          <Text style={[styles.profileEmail, { 
            fontSize: dynamicFontSize(13),
            marginBottom: dynamicSpacing(10)
          }]}>
            {email}
          </Text>
        </View>
      </View>
      <View style={[styles.buttonList, { marginTop: dynamicSpacing(10) }]}>
        {[
          { icon: 'person-outline', text: 'Account Setting', onPress: () => router.push('/AccountSettingPage') },
          { icon: 'history', text: 'Appointment History', onPress: () => router.push('/AppointmentHistory') },
          { icon: 'help-outline', text: 'Support & Help Center', onPress: () => router.push('/SupportHelpCenter') },
          { icon: 'logout', text: 'Log Out', onPress: handleLogout }
        ].map((button, index) => (
          <TouchableOpacity 
            key={index}
            style={[styles.profileButton, { 
              paddingVertical: dynamicSpacing(14),
              paddingHorizontal: dynamicSpacing(18),
              marginBottom: dynamicSpacing(16),
              borderRadius: dynamicSpacing(18)
            }]}
            onPress={button.onPress}
          >
            <MaterialIcons 
              name={button.icon} 
              size={dynamicFontSize(24)} 
              color="#EDAE49" 
              style={[styles.buttonIcon, { marginRight: dynamicSpacing(14) }]} 
            />
            <Text style={[styles.buttonText, { fontSize: dynamicFontSize(15) }]}>
              {button.text}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  coverPhotoSection: {
    backgroundColor: '#E5E5E5',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    position: 'relative',
    marginTop: '5%',
  },
  coverPhoto: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  coverPhotoPrompt: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backButton: {
    position: 'absolute',
    zIndex: 1,
    backgroundColor: 'transparent',
  },
  coverPhotoText: {
    color: '#888',
    marginTop: '8%',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginLeft: '6%',
  },
  profileImage: {
    backgroundColor: '#eee',
    borderColor: '#fff',
  },
  profileInfo: {
    justifyContent: 'center',
  },
  profileName: {
    fontWeight: 'bold',
    color: '#222',
  },
  profileEmail: {
    color: '#888',
  },
  buttonList: {
    paddingHorizontal: '5%',
  },
  profileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1.2,
    borderColor: '#EDAE49',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonIcon: {
    marginRight: '4%',
  },
  buttonText: {
    color: '#222',
    fontWeight: '500',
  },
  coverPhotoTouchable: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
}); 