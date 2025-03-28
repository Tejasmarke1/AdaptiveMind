import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import ForgotPasswordScreen from './src/screens/ForgetPassScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import { BaseUrlProvider } from './ApiContext';
import ProfileSetupScreen from './src/screens/ProfileSetupScreen';
import UserDashboardScreen from './src/screens/UserDashbordScreen';
import RecommendedCoursesScreen from './src/screens/RecommendedCoursesScreen';
import RecentActivityScreen from './src/screens/RecentActivityScreen';
import AchievementsScreen from './src/screens/AchievementsScreen';
import BadgesScreen from './src/screens/BadgesScreen';
import AIChatbotScreen from './src/screens/AIChatbotScreen';
import CommunityDiscussionScreen from './src/screens/CommunityDiscussionScreen';
import DiscussionDetailScreen from './src/screens/DiscussionDetailScreen';
import PersonalizedAnalyticsScreen from './src/screens/PersonalizedAnalyticsScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <BaseUrlProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
          <Stack.Screen name="UserDashboard" component={UserDashboardScreen} />
          <Stack.Screen name="RecommendedCourses" component={RecommendedCoursesScreen} />
          <Stack.Screen name="RecentActivity" component={RecentActivityScreen} />
          <Stack.Screen name="Achievements" component={AchievementsScreen} />
          <Stack.Screen name="Badges" component={BadgesScreen} />
          <Stack.Screen name="AIChatbot" component={AIChatbotScreen} />
          <Stack.Screen name="CommunityDiscussion" component={CommunityDiscussionScreen} />
          <Stack.Screen name="DiscussionDetail" component={DiscussionDetailScreen} />
          <Stack.Screen name="PersonalizedAnalytics" component={PersonalizedAnalyticsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </BaseUrlProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the app takes up the full screen
  },
});
