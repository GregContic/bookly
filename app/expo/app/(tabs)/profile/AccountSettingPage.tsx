import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Image, Alert, useWindowDimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'userProfileData';

export default function AccountSettingPage() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [profileImage, setProfileImage] = useState('https://randomuser.me/api/portraits/men/1.jpg');

  useEffect(() => {
    (async () => {
      try {
        const data = await AsyncStorage.getItem(STORAGE_KEY);
        if (data) {
          const parsed = JSON.parse(data);
          setFullName(parsed.fullName || '');
          setUsername(parsed.username || '');
          setEmail(parsed.email || '');
          setPhone(parsed.phone || '');
          setAddress(parsed.address || '');
          setProfileImage(parsed.profileImage || 'https://randomuser.me/api/portraits/men/1.jpg');
        } else {
          setFullName('User Test');
          setUsername('User');
          setEmail('name@test.com');
          setPhone('+639123456789');
          setAddress('1233 Main St., Baguio City, Philippines, 2600');
        }
      } catch (e) {
        // fallback to defaults
      }
    })();
  }, []);

  const handleSave = async () => {
    try {
      const data = { fullName, username, email, phone, address, profileImage };
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      Alert.alert('Success', 'Your changes have been saved!');
    } catch (e) {
      Alert.alert('Error', 'Failed to save changes.');
    }
  };

  const handleChangeProfilePicture = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Camera roll permissions are required to change your profile picture.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#222" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account Setting</Text>
        <View style={{ width: 28 }} />
      </View>
      <View style={styles.profileSection}>
        <View style={styles.profileRow}>
          <Image
            source={{ uri: profileImage }}
            style={[styles.profileImage, { width: width * 0.22, height: width * 0.22, borderRadius: (width * 0.22) / 2 }]}
          />
          <TouchableOpacity style={styles.changePicButton} onPress={handleChangeProfilePicture}>
            <Text style={styles.changePicText}>Change Profile Picture</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.formSection}>
        <TextInput
          style={styles.input}
          value={fullName}
          onChangeText={setFullName}
          placeholder="Full Name"
        />
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Username"
        />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={setPhone}
          placeholder="Phone"
          keyboardType="phone-pad"
        />
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
          placeholder="Address"
        />
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    paddingTop: 18,
    paddingBottom: 8,
    marginTop: 35,
    backgroundColor: 'transparent',
  },
  backButton: {
    padding: 2,
    marginRight: 0,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: '5%',
  },
  profileImage: {
    marginRight: 12,
    marginBottom: 0,
    backgroundColor: '#eee',
  },
  changePicButton: {
    backgroundColor: '#2176ae',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginBottom: 0,
  },
  changePicText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
  formSection: {
    paddingHorizontal: '5%',
    marginTop: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 18,
    paddingVertical: 10,
    fontSize: 15,
    marginBottom: 16,
    color: '#222',
    width: '100%',
  },
  saveButton: {
    backgroundColor: '#EDAE49',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    shadowColor: '#EDAE49',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 