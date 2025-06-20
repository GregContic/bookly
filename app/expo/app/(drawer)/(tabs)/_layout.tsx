import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          paddingHorizontal: 15,
          paddingVertical: 8,
          position: 'absolute',
          left: 15,
          right: 15,
          bottom: 25,
          elevation: 15,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 10,
          height: 70,
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: '#EDAE49',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarLabelStyle: {
          display: 'none',
        },
        tabBarItemStyle: {
          paddingTop: 10,
          paddingBottom: 10,
          alignItems: 'center',
          justifyContent: 'center',        },
      }}
    >
      <Tabs.Screen
        name="home/index"        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <View style={{
              width: 45,
              height: 45,
              borderRadius: 22.5,
              backgroundColor: focused ? '#EDAE49' : 'transparent',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Ionicons 
                name={focused ? "home" : "home-outline"} 
                size={24} 
                color={focused ? '#fff' : '#9CA3AF'} 
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="services/index"
        options={{
          title: 'Services',
          tabBarIcon: ({ color, focused }) => (
            <View style={{
              width: 45,
              height: 45,
              borderRadius: 22.5,
              backgroundColor: focused ? '#EDAE49' : 'transparent',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Ionicons 
                name={focused ? "apps" : "apps-outline"} 
                size={24} 
                color={focused ? '#fff' : '#9CA3AF'} 
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="book-appointment/index"
        options={{
          title: 'Book',
          tabBarIcon: ({ color, focused }) => (
            <View style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: '#EDAE49',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: -25,
              shadowColor: '#EDAE49',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 12,
              borderWidth: 3,
              borderColor: '#fff',
            }}>
              <Ionicons 
                name="calendar" 
                size={26} 
                color="#fff" 
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="saved/index"
        options={{
          title: 'Saved',
          tabBarIcon: ({ color, focused }) => (
            <View style={{
              width: 45,
              height: 45,
              borderRadius: 22.5,
              backgroundColor: focused ? '#EDAE49' : 'transparent',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Ionicons 
                name={focused ? "bookmark" : "bookmark-outline"} 
                size={24} 
                color={focused ? '#fff' : '#9CA3AF'} 
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <View style={{
              width: 45,
              height: 45,
              borderRadius: 22.5,
              backgroundColor: focused ? '#EDAE49' : 'transparent',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Ionicons 
                name={focused ? "person" : "person-outline"} 
                size={24} 
                color={focused ? '#fff' : '#9CA3AF'} 
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
