import React, { useState } from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import { colors } from '../utils/colors';
import { fonts } from '../utils/fonts';
import { BaseUrlContext } from '../../ApiContext';
import { useContext } from 'react';

// Memoized InputField component to prevent unnecessary re-renders
const InputField = React.memo(({ icon, placeholder, value, onChangeText, secureTextEntry, keyboardType, autoCapitalize, autoCorrect }) => (
  <View style={styles.inputContainer}>
    {icon}
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor={colors.secondary}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      autoCorrect={autoCorrect}
    />
  </View>
));

const SignupScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secureEntry, setSecureEntry] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { baseUrl, loading, refetch } = useContext(BaseUrlContext);
  // Input validation functions
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateName = (name) => {
    return name.trim().length > 0;
  };

  const validateUsername = (username) => {
    return username.trim().length > 0;
  };

  const validatePassword = (password) => {
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return re.test(String(password));
  };

  // Handle email/password signup
  const handleSignup = async () => {
    if (!validateEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address (e.g., example@example.com).');
      return;
    }
    if (!validateName(name)) {
      Alert.alert('Invalid Name', 'Please enter your name.');
      return;
    }
    if (!validateUsername(username)) {
      Alert.alert('Invalid Username', 'Please enter a username.');
      return;
    }
    if (!validatePassword(password)) {
      Alert.alert(
        'Weak Password',
        'Password must be at least 8 characters long and include both letters and numbers.'
      );
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('${baseUrl}/api/register/', {
        email: email,
        username: username,
        name: name,
        password: password,
      });

      if (response.status === 201) {
        Alert.alert('Success', 'Account created successfully! Please complete your onboarding.');

        // Navigate to the onboarding screen
        navigation.replace('Onboarding');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Something went wrong. Please try again.';
      Alert.alert('Signup Failed', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButtonWrapper} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back-outline" color={colors.primary} size={30} />
      </TouchableOpacity>

      <View style={styles.textContainer}>
        <Text style={styles.headingText}>Let's get,</Text>
        <Text style={styles.headingText}>started</Text>
      </View>

      <View style={styles.formContainer}>
        <InputField
          icon={<Ionicons name="mail-outline" color={colors.secondary} size={30} style={styles.inputIcon} />}
          placeholder="Enter your email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <InputField
          icon={<Ionicons name="person-outline" color={colors.secondary} size={30} style={styles.inputIcon} />}
          placeholder="Enter your name"
          value={name}
          onChangeText={(text) => setName(text)}
          autoCapitalize="words"
          autoCorrect={true}
        />

        <InputField
          icon={<Ionicons name="at-outline" color={colors.secondary} size={30} style={styles.inputIcon} />}
          placeholder="Enter your username"
          value={username}
          onChangeText={(text) => setUsername(text)}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <View style={styles.inputContainer}>
          <SimpleLineIcons name="lock" color={colors.secondary} size={30} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor={colors.secondary}
            secureTextEntry={secureEntry}
            value={password}
            onChangeText={(text) => setPassword(text)}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity onPress={() => setSecureEntry((prev) => !prev)}>
            <Feather name={secureEntry ? 'eye' : 'eye-off'} color={colors.secondary} size={30} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.signupButtonWrapper}
          onPress={handleSignup}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <Text style={styles.signupButtonText}>Sign up</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.continueText}>or continue with</Text>

        {/* Google Sign-In Button (UI only, no functionality) */}
        <TouchableOpacity
          style={styles.googleButtonWrapper}
          onPress={() => Alert.alert('Info', 'Google Sign-In is not available.')}
          disabled={true}
        >
          <View style={styles.googleButtonContent}>
            <Image source={require('../assets/Vector.png')} style={styles.googleLogo} />
            <Text style={styles.googleButtonText}>Sign in with Google</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButtonWrapper} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignupScreen;

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
  signupButtonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderRadius: 98,
    backgroundColor: colors.primary,
    paddingVertical: 15,
    marginTop: 20,
  },
  signupButtonText: {
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
  loginButtonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    marginTop: 20,
    gap: 5,
  },
  loginText: {
    color: colors.primary,
    fontFamily: fonts.SemiBold,
    fontSize: 16,
  },
  loginButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontFamily: fonts.Bold,
  },
});