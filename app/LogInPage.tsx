import { FontAwesome } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Image, SafeAreaView, ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuth } from './context/AuthContext';

export default function LogInPage() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fontsLoaded] = useFonts({
    'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#EDAE49', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#fff" />
      </SafeAreaView>
    );
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    if (isLoading) return;
    
    try {
      setIsLoading(true);

      if (!email || !password) {
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }

      if (!validateEmail(email)) {
        Alert.alert('Error', 'Please enter a valid email address');
        return;
      }

      await signIn(email, password);
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.message === 'User not found') {
        Alert.alert('Error', 'No account found with this email');
      } else if (error.message === 'Invalid credentials') {
        Alert.alert('Error', 'Invalid email or password');
      } else {
        Alert.alert('Error', 'Failed to login. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.topSection}>
          <Image source={require('../assets/images/Logo-1.png')} style={styles.logo} resizeMode="contain" />
        </View>
        <View style={styles.card}>
          <Text style={styles.formTitle}>Log in to your account</Text>
          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialBox}>
              <FontAwesome name="facebook" size={24} color="#1877F2" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBox}>
              <FontAwesome name="twitter" size={24} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBox}>
              <FontAwesome name="google" size={24} color="#DB4437" />
            </TouchableOpacity>
          </View>
          <Text style={styles.orText}>Or use your email account</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.floatingLabel}>Email</Text>
            <TextInput
              style={styles.input}
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              editable={!isLoading}
              autoCapitalize="none"
              placeholder=""
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.floatingLabel}>Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              editable={!isLoading}
              placeholder=""
            />
          </View>
          <View style={styles.rowBetween}>
            <View style={styles.rememberMeContainer}>
              <Switch
                trackColor={{ false: "#E0E0E0", true: "#EDAE49" }}
                thumbColor={rememberMe ? "#fff" : "#fff"}
                ios_backgroundColor="#E0E0E0"
                onValueChange={setRememberMe}
                value={rememberMe}
              />
              <Text style={styles.rememberMeText}>Remember Me</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <LinearGradient
            colors={['#fcb045', '#ed8f2b']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientButton}
          >
            <TouchableOpacity
              style={[styles.registerButton, isLoading && styles.disabledButton]}
              onPress={handleLogin}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.registerButtonText}>Log in</Text>
              )}
            </TouchableOpacity>
          </LinearGradient>
          <Text style={styles.footerText}>
            Don't have an account?{' '}
            <Text style={styles.loginLink} onPress={() => router.push('/RegistrationPage')}>
              Register Here
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EDAE49',
  },
  topSection: {
    alignItems: 'center',
    marginTop: 80,
    marginBottom: 20,
  },
  logo: {
    width: 90,
    height: 90,
    marginBottom: 5,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 18,
    color: '#222',
    textAlign: 'center',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  socialBox: {
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: '#eee',
  },
  orText: {
    marginVertical: 10,
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
  },
  inputWrapper: {
    width: '100%',
    marginVertical: 8,
    position: 'relative',
  },
  floatingLabel: {
    position: 'absolute',
    top: -10,
    left: 14,
    backgroundColor: '#fff',
    paddingHorizontal: 4,
    fontSize: 13,
    color: '#222',
    zIndex: 2,
    fontWeight: '500',
  },
  input: {
    width: '100%',
    borderColor: '#fcb045',
    borderWidth: 1.2,
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 44,
    fontSize: 15,
    color: '#222',
    backgroundColor: '#fff',
    shadowColor: 'transparent',
    paddingTop: 14,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 18,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rememberMe: {
    // flexDirection: 'row',
    // alignItems: 'center',
  },
  rememberMeText: {
    marginLeft: 5,
    fontSize: 13,
    color: '#222',
  },
  forgotText: {
    color: '#888',
    fontSize: 13,
    textDecorationLine: 'underline',
  },
  gradientButton: {
    width: '100%',
    borderRadius: 999,
    marginTop: 18,
    marginBottom: 10,
    overflow: 'hidden',
    height: 40,
    justifyContent: 'center',
  },
  registerButton: {
    backgroundColor: 'transparent',
    paddingVertical: 0,
    borderRadius: 14,
    width: '100%',
    alignItems: 'center',
    height: 40,
    justifyContent: 'center',
    shadowColor: 'transparent',
    borderWidth: 0,
  },
  registerButtonText: {
    color: '#222',
    fontWeight: 'normal',
    fontSize: 16,
    textAlign: 'center',
  },
  footerText: {
    marginTop: 18,
    fontSize: 13,
    color: '#888',
    textAlign: 'center',
  },
  loginLink: {
    color: '#EDAE49',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  disabledButton: {
    opacity: 0.7,
  },
});
