import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

// ✅ Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_02bArt7S8KIFL8PuFaBtTthjrGtceEw",
  authDomain: "gentle-dominion-441117-p8.firebaseapp.com",
  projectId: "gentle-dominion-441117-p8",
  storageBucket: "gentle-dominion-441117-p8.appspot.com",
  messagingSenderId: "837601444314",
  appId: "1:837601444314:android:bafb7249e1e346303a00e3",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth1 = getAuth(app);

// ✅ Configure Google Sign-In
GoogleSignin.configure({
  webClientId: "837601444314-5mhu0lda0jg4bjhtto100ubldjnre1l6.apps.googleusercontent.com", 
  offlineAccess: true, // Optional, for getting a refresh token
});

// ✅ Export Firebase Auth & Google Sign-In
export { auth1, GoogleSignin };
