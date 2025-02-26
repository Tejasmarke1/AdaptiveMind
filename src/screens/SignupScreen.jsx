import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { colors } from '../utils/colors'
import { fonts } from '../utils/fonts'
import { useNavigation } from '@react-navigation/native'
import Ionicons from "react-native-vector-icons/Ionicons"
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"
import Feather from "react-native-vector-icons/Feather"

const SignupScreen = () => {
  const navigation = useNavigation();
  const handleLogin=()=>{
    navigation.navigate("Login");

};
  const [secureEntry, setSecureEntry] = useState(true);

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
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" color={colors.secondary} size={30} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor={colors.secondary}
            
          />
        </View>
        <View style={styles.inputContainer}>
          <SimpleLineIcons name="screen-smartphone" color={colors.secondary} size={30} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            placeholderTextColor={colors.secondary}

          />
        </View>

        <View style={styles.inputContainer}>
          <SimpleLineIcons name="lock" color={colors.secondary} size={30} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor={colors.secondary}
            secureTextEntry={secureEntry}
          />
          <TouchableOpacity onPress={() => setSecureEntry((prev) => !prev)}>
            <Feather name={secureEntry ? "eye" : "eye-off"} color={colors.secondary} size={30} />
          </TouchableOpacity>
        </View>

      
        

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButtonWrapper} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.loginButtonText}>Sign up</Text>
        </TouchableOpacity>

        <Text style={styles.continueText}>or continue with</Text>

        {/* Google Sign-In Button */}
        <TouchableOpacity style={styles.googleButtonWrapper}>
          <View style={styles.googleButtonContent}>
            <Image source={require("../assets/Vector.png")} style={styles.googleLogo} />
            <Text style={styles.googleButtonText}>Sign in with Google</Text>
          </View>
        </TouchableOpacity>
        
      
        <TouchableOpacity style={styles.registerButtonWrapper} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.registerText}>Already have an account! </Text>
        <Text style={styles.registerButtonText}>Login</Text>
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
    backgroundColor:colors.white,
    paddingVertical: 15,
    marginTop: 20,
    borderColor: colors.primary,
    borderWidth: 2,
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
    gap:5,
  },
  registerText: {
    color: colors.primary,
    fontFamily: fonts.SemiBold,
    fontSize: 16,
    marginLeft: 10,
  },
  registerButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontFamily: fonts.Bold,
  
  },
  
  

});
