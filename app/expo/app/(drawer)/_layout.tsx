import { Ionicons } from '@expo/vector-icons';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../_context/AuthContext';

function CustomDrawerContent(props: any) {
  const router = useRouter();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <DrawerContentScrollView {...props} style={styles.drawerContainer}>
      <View style={styles.drawerHeader}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person-circle" size={60} color="#EDAE49" />
          </View>
          <Text style={styles.userName}>Welcome, {user?.username || 'User'}!</Text>
          <Text style={styles.userEmail}>{user?.email || 'user@example.com'}</Text>
        </View>
      </View>

      <View style={styles.drawerItems}>
        <DrawerItem
          label="Home"
          onPress={() => router.push('/(drawer)/(tabs)/home')}
          icon={({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />}
          labelStyle={styles.drawerItemLabel}
          style={styles.drawerItem}
        />
        
        <DrawerItem
          label="Services"
          onPress={() => router.push('/ServicesPage')}
          icon={({ color, size }) => <Ionicons name="grid-outline" size={size} color={color} />}
          labelStyle={styles.drawerItemLabel}
          style={styles.drawerItem}
        />
        
        <DrawerItem
          label="Appointments"
          onPress={() => router.push('/AppointmentHistory')}
          icon={({ color, size }) => <Ionicons name="calendar-outline" size={size} color={color} />}
          labelStyle={styles.drawerItemLabel}
          style={styles.drawerItem}
        />
        
        <DrawerItem
          label="Saved"
          onPress={() => router.push('/SavedPage')}
          icon={({ color, size }) => <Ionicons name="bookmark-outline" size={size} color={color} />}
          labelStyle={styles.drawerItemLabel}
          style={styles.drawerItem}
        />
        
        <DrawerItem
          label="Profile"
          onPress={() => router.push('/(drawer)/(tabs)/profile')}
          icon={({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />}
          labelStyle={styles.drawerItemLabel}
          style={styles.drawerItem}
        />
        
        <DrawerItem
          label="Account Settings"
          onPress={() => router.push('/AccountSettingPage')}
          icon={({ color, size }) => <Ionicons name="settings-outline" size={size} color={color} />}
          labelStyle={styles.drawerItemLabel}
          style={styles.drawerItem}
        />
        
        <DrawerItem
          label="Support & Help"
          onPress={() => router.push('/SupportHelpCenter')}
          icon={({ color, size }) => <Ionicons name="help-circle-outline" size={size} color={color} />}
          labelStyle={styles.drawerItemLabel}
          style={styles.drawerItem}
        />
      </View>

      <View style={styles.drawerFooter}>
        <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
          <Ionicons name="log-out-outline" size={20} color="#fff" />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={CustomDrawerContent}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: '#F8F5F0',
          width: 280,
        },
        drawerActiveTintColor: '#EDAE49',
        drawerInactiveTintColor: '#666',
        drawerItemStyle: {
          borderRadius: 8,
        },
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          drawerLabel: 'Home',
          title: 'Home',
        }}
      />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: '#F8F5F0',
  },
  drawerHeader: {
    backgroundColor: '#EDAE49',
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
  },
  profileSection: {
    alignItems: 'center',
  },
  avatarContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 40,
    padding: 10,
    marginBottom: 15,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  drawerItems: {
    flex: 1,
    paddingHorizontal: 10,
  },
  drawerItem: {
    marginVertical: 2,
  },
  drawerItemLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  drawerFooter: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF4444',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  signOutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});