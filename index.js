/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { firebase } from '@react-native-firebase/app';

// Firebase configuration (replace with your Firebase project config)
const firebaseConfig = {
  apiKey: "AIzaSyB_02bArt7S8KIFL8PuFaBtTthjrGtceEw",
  authDomain: "gentle-dominion-441117-p8.firebaseapp.com",
  projectId: "gentle-dominion-441117-p8",
  storageBucket: "gentle-dominion-441117-p8.firebasestorage.app",
  messagingSenderId: "837601444314",
  appId: "1:837601444314:web:1b0ec2146bf0b2bc3a00e3",
  measurementId: "G-KSLX8VQHD3"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

AppRegistry.registerComponent(appName, () => App);