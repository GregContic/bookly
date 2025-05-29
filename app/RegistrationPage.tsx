import { useFonts } from 'expo-font';
import { LinearGradient } from 'expo-linear-gradient';
import * as React from 'react';
import { ActivityIndicator, Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
//import CreateAccountScreen from './screens/CreateAccountScreen';
//Navigations:
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from './context/AuthContext';

export default function RegistrationPage() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [fontsLoaded] = useFonts({
    'Montserrat-Bold': require('../assets/fonts/Montserrat-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = async () => {
    try {
      setIsLoading(true);

      if (!username || !email || !password || !confirmPassword) {
        Alert.alert('Error', 'Please fill in all fields');
        return;
      }

      if (!validateEmail(email)) {
        Alert.alert('Error', 'Please enter a valid email address');
        return;
      }

      if (password !== confirmPassword) {
        Alert.alert('Error', 'Passwords do not match');
        return;
      }

      if (password.length < 6) {
        Alert.alert('Error', 'Password must be at least 6 characters long');
        return;
      }

      await signUp(email, username, password);
    } catch (error: any) {
      console.error('Registration error:', error);
      if (error.message === 'User already exists') {
        Alert.alert('Error', 'An account with this email already exists');
      } else {
        Alert.alert('Error', 'Failed to create account. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.topSection}>
          <Image
            source={require('../assets/images/Logo-1.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        <View style={styles.card}>
          <Text style={styles.formTitle}>Create Your Account</Text>
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
            <Text style={styles.floatingLabel}>Username</Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              editable={!isLoading}
              placeholder=""
            />
          </View>
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
          <View style={styles.inputWrapper}>
            <Text style={styles.floatingLabel}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              editable={!isLoading}
              placeholder=""
            />
          </View>
          <LinearGradient
            colors={["#fcb045", "#ed8f2b"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.gradientButton}
          >
            <TouchableOpacity
              style={[styles.registerButton, isLoading && styles.disabledButton]}
              onPress={handleRegister}
              disabled={isLoading}
              activeOpacity={0.8}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.registerButtonText}>Register</Text>
              )}
            </TouchableOpacity>
          </LinearGradient>
          <Text style={styles.footerText}>
            Already have an account?{' '}
            <Text style={styles.loginLink} onPress={() => router.push('/LogInPage')}>
              Login Here
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
  appTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#222',
    fontFamily: 'Montserrat-Bold',
    marginBottom: 10,
    letterSpacing: 1,
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
