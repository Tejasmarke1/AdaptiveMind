import { StyleSheet, Text, View ,Image, TouchableOpacity} from 'react-native'
import React from 'react'
import { colors } from '../utils/colors'
import { fonts } from '../utils/fonts'
import { useNavigation } from '@react-navigation/native'

const HomeScreen = () => {
    const navigation=useNavigation();

    const handleLogin=()=>{
        navigation.navigate("Login");

    };
    const handleSignup=()=>{
        navigation.navigate("UserDashboard");

    };
  return (
    <View style={styles.container}>
      <Image source={require("../assets/logo.png")} style={styles.logo}/>
      <Image source={require("../assets/Image.png")} style={styles.banner}/>  
      <Text style={styles.title}>AdaptiveMind</Text>
      <Text style={styles.subtitle}>Learn Smarter, Adapt Faster.</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.loginbuttonWrapper,
            {backgroundColor:colors.primary}]}onPress={handleLogin}
            >
            <Text style={styles.loginbuttontext}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginbuttonWrapper} onPress={handleSignup}>
            <Text style={styles.signupbuttontext}>Sign-up</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: colors?.white || '#FFFFFF',
        alignItems:"center",
    }, 
    logo:{
        width:113.11,
        height:40,
        marginVertical:50
    },
    banner:{
        height:250,
        width:231,
        marginVertical:20,  
    },
    title:{
        fontSize:44,
        fontFamily:fonts.Bold,
        paddingHorizontal:20,
        textAlign:"center",
        color:colors.primary,
        marginTop:40
    },
    subtitle:{
        fontSize:18,
        fontFamily:fonts.Medium,
        color:colors.secondary,
        textAlign:'center',
        marginVertical:10,
        paddingHorizontal:20,

    },
    buttonContainer:{
        flexDirection:'row',
        marginTop:20,
        borderWidth:2,
        borderColor:colors.primary,
        width:"85%",
        height:60,
        borderRadius:100,
        marginTop:60,



    },
    loginbuttonWrapper:{
        justifyContent:"center",
        alignItems:'center',
        width:'50%',
        borderRadius:98,
    },
    loginbuttontext:{
        backgroundColor:colors.primary,
        color:colors.white,
        fontSize:18,
        fontFamily:fonts.SemiBold,
    },
    signupbuttontext:{
        fontSize:18,
        fontFamily:fonts.SemiBold,
    }




})