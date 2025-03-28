import { ActivityIndicator, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import { colors } from '../utils/colors';
import { fonts } from '../utils/fonts';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BaseUrlContext } from '../../ApiContext';
import { useContext } from 'react';


const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureEntry, setSecureEntry] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { baseUrl, loading, refetch } = useContext(BaseUrlContext);

  // Email validation function
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  useEffect(() => {
    const checkUserSession = async () => {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const userData = await AsyncStorage.getItem('user');
      if (accessToken && userData) {
        navigation.replace('Onboarding');
      }
    };
    checkUserSession();
  }, []);

  const handleLogin = async () => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${baseUrl}/api/login/`, // ✅ Corrected template literal usage
        { email, password },
        { headers: { 'Content-Type': 'application/json' } }
      );

      console.log('Full API Response:', response); // Debugging

      if (response.data) {
        console.log('Token Response:', response.data);
      } else {
        console.log('No data in response:', response);
      }

      // Extract tokens and onboarding status
      const accessToken = response.data?.access;
      const refreshToken = response.data?.refresh;
      const isOnboarded = response.data?.is_onboarded;

      if (accessToken) {
        await AsyncStorage.setItem('accessToken', accessToken);
        await AsyncStorage.setItem('refreshToken', refreshToken);
        console.log('Stored Tokens:', { accessToken, refreshToken });

        // Navigate based on onboarding status
        if (isOnboarded) {
          navigation.replace('UserDashboard'); // Redirect to Dashboard
        } else {
          navigation.replace('Onboarding'); // Redirect to Onboarding page
        }
      } else {
        Alert.alert('Error', 'No access token received.');
      }
    } catch (error) {
      console.error('Login Error:', error);

      if (error.response) {
        console.log('Error Response Data:', error.response.data);
        Alert.alert('Login Failed', JSON.stringify(error.response.data));
      } else {
        Alert.alert('Login Failed', 'Something went wrong.');
      }
    } finally {
      setIsLoading(false);
    }
  };





  const handleSignup = () => {
    navigation.navigate('Signup');
  };
  const handleForgetPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButtonWrapper} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-outline" color={colors.primary} size={30} />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.headingText}>Hey,</Text>
        <Text style={styles.headingText}>Welcome</Text>
        <Text style={styles.headingText}>Back</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" color={colors.secondary} size={30} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor={colors.secondary}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        <View style={styles.inputContainer}>
          <SimpleLineIcons name="lock" color={colors.secondary} size={30} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor={colors.secondary}
            secureTextEntry={secureEntry}
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity onPress={() => setSecureEntry((prev) => !prev)}>
            <Feather name={secureEntry ? 'eye' : 'eye-off'} color={colors.secondary} size={30} />
          </TouchableOpacity>
        </View>

        {/* Forgot Password */}
        <View style={styles.forgotPasswordContainer}>
          <TouchableOpacity onPress={handleForgetPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <TouchableOpacity
          style={styles.loginButtonWrapper}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Text style={styles.loginButtonText}>Login</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.continueText}>or continue with</Text>

        {/* Google Sign-In Button */}
        <TouchableOpacity
          style={styles.googleButtonWrapper}
          onPress={() => Alert.alert('Info', 'Google Sign-In is not available.')}
        >
          <View style={styles.googleButtonContent}>
            <Image source={require('../assets/Vector.png')} style={styles.googleLogo} />
            <Text style={styles.googleButtonText}>Sign in with Google</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.registerButtonWrapper} onPress={handleSignup}>
          <Text style={styles.registerText}>Don't have an account?</Text>
          <Text style={styles.registerButtonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
  },
  backButtonWrapper: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginTop: 10,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginVertical: 20,
  },
  headingText: {
    fontSize: 32,
    color: colors.primary,
    fontFamily: fonts.SemiBold,
  },
  formContainer: {
    marginVertical: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 100,
    paddingHorizontal: 20,
    height: 50,
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 15,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    fontSize: 16,
    fontFamily: fonts.Regular,
    color: colors.primary,
  },
  forgotPasswordContainer: {
    alignItems: 'flex-end',
    marginTop: 5,
  },
  forgotPasswordText: {
    color: colors.primary,
    fontFamily: fonts.SemiBold,
    fontSize: 14,
  },
  loginButtonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: 98,
    backgroundColor: colors.primary,
    paddingVertical: 15,
    marginTop: 20,
  },
  loginButtonText: {
    color: colors.white,
    fontSize: 18,
    fontFamily: fonts.SemiBold,
  },
  continueText: {
    color: colors.primary,
    fontFamily: fonts.Regular,
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
  },
  googleButtonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: 98,
    backgroundColor: colors.white,
    paddingVertical: 15,
    marginTop: 20,
    borderColor: colors.primary,
    borderWidth: 2,
    ...Platform.select({
      android: {
        elevation: 3,
      },
      ios: {
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
      },
    }),
  },
  googleButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  googleButtonText: {
    color: colors.primary,
    fontSize: 18,
    fontFamily: fonts.SemiBold,
    marginLeft: 10,
  },
  googleLogo: {
    height: 25,
    width: 25,
    resizeMode: 'contain',
  },
  registerButtonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    marginTop: 20,
    gap: 5,
  },
  registerText: {
    color: colors.primary,
    fontFamily: fonts.SemiBold,
    fontSize: 16,
  },
  registerButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontFamily: fonts.Bold,
  },
});