import { auth, GoogleSignin } from "./firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithCredential, GoogleAuthProvider, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

// Register User with Email & Phone
export const registerUser = async (email, password, phoneNumber) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Save phone number in user profile
    await userCredential.user.updateProfile({ phoneNumber });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Google Sign-In
export const googleSignIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    const googleCredential = GoogleAuthProvider.credential(userInfo.idToken);
    await signInWithCredential(auth, googleCredential);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Phone Authentication
export const sendOTP = async (phoneNumber, recaptchaVerifier) => {
  try {
    const confirmation = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
    return { success: true, confirmation };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const verifyOTP = async (confirmation, otp) => {
  try {
    await confirmation.confirm(otp);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
