import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Image, Text, FlatList, TouchableOpacity, Animated } from 'react-native';
import { Button, TextInput, RadioButton, ActivityIndicator } from 'react-native-paper';
import moment from 'moment-timezone';
import { colors } from '../utils/colors';
import Icon from 'react-native-vector-icons/Feather';
import FlatAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
 // Import the Icon component

// List of default avatars (use relative paths)
const defaultAvatars = [
  require('../assets/avatars/avatar1.jpg'),
  require('../assets/avatars/avatar2.jpg'),
  require('../assets/avatars/avatar3.jpg'),
  require('../assets/avatars/avatar4.jpg'),
  require('../assets/avatars/avatar5.jpg'),
  require('../assets/avatars/avatar6.jpg'),
];

const ProfileSetupScreen = () => {
  const [fullName, setFullName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(defaultAvatars[0]); // Track selected avatar
  const [bio, setBio] = useState('');
  const [interests, setInterests] = useState([]);
  const [learningStyle, setLearningStyle] = useState('');
  const [language, setLanguage] = useState('English');
  const [timezone, setTimezone] = useState('');
  const [theme, setTheme] = useState('light');
  const [isSubmitting, setIsSubmitting] = useState(false); // For submit button loading state
  const [scaleAnim] = useState(new Animated.Value(1)); // For avatar selection animation

  // Auto-detect timezone
  useEffect(() => {
    const detectedTimezone = moment.tz.guess();
    setTimezone(detectedTimezone);
  }, []);

  // Handle avatar selection with animation
  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 0.8, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
  };

  // Handle form submission
  const handleSubmit = () => {
    if (!fullName.trim()) {
      alert('Please enter your full name.'); // Basic error handling
      return;
    }
    setIsSubmitting(true);
    const profileData = {
      fullName,
      avatar: selectedAvatar,
      bio,
      interests,
      learningStyle,
      language,
      timezone,
      theme,
    };
    console.log('Profile Data:', profileData);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Profile saved successfully!');
    }, 2000);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Set Up Your Profile</Text>
        <Text style={styles.headerSubtitle}>Complete your profile to personalize your experience</Text>
      </View>

      {/* Full Name */}
      <View style={styles.inputContainer}>
        <Icon name="user" size={24} color={colors.secondary} style={styles.inputIcon} />
        <TextInput
          label="Full Name"
          value={fullName}
          onChangeText={setFullName}
          style={styles.input}
          mode="outlined"
          theme={{ colors: { primary: colors.primary } }}
          placeholder="Enter your full name"
          placeholderTextColor={colors.gray}
        />
      </View>

      {/* Avatar Selection */}
      <View style={styles.avatarSection}>
        <Text style={styles.label}>Choose Your Avatar</Text>
        <View style={styles.avatarListContainer}>
          <FlatList
            data={defaultAvatars}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleAvatarSelect(item)}
                style={styles.avatarContainer}
              >
                <Animated.Image
                  source={item}
                  style={[
                    styles.avatarImage,
                    selectedAvatar === item && styles.selectedAvatar,
                    { transform: [{ scale: selectedAvatar === item ? scaleAnim : 1 }] }, // Animation
                  ]}
                />
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.avatarList}
          />
        </View>
      </View>

      {/* Bio */}
      <View style={styles.inputContainer}>
        <FlatAwesome name="pencil-square-o" size={24} color={colors.secondary} style={styles.inputIcon} />
        <TextInput
          label="Bio"
          value={bio}
          onChangeText={setBio}
          multiline
          numberOfLines={3}
          style={styles.input}
          mode="outlined"
          theme={{ colors: { primary: colors.primary } }}
          placeholder="Tell us about yourself..."
          placeholderTextColor={colors.gray}
        />
      </View>

      {/* Interests */}
      <Text style={styles.label}>Interests</Text>
      <View style={styles.interestsContainer}>
        {['Data Structure', 'AI/ML', 'Android', 'Web', 'Networking', 'Database', 'iOS'].map((interest) => (
          <Button
            key={interest}
            mode={interests.includes(interest) ? 'contained' : 'outlined'}
            onPress={() =>
              setInterests((prev) =>
                prev.includes(interest)
                  ? prev.filter((item) => item !== interest)
                  : [...prev, interest]
              )
            }
            style={[
              styles.interestButton,
              interests.includes(interest) && { backgroundColor: colors.primary },
            ]}
            labelStyle={{ color: interests.includes(interest) ? '#fff' : colors.primary }}
          >
            {interest}
          </Button>
        ))}
      </View>

      {/* Learning Style */}
      <Text style={styles.label}>Learning Style</Text>
      <RadioButton.Group onValueChange={setLearningStyle} value={learningStyle}>
        <RadioButton.Item label="Visual Learner" value="Visual" color={colors.primary} />
        <RadioButton.Item label="Auditory Learner" value="Auditory" color={colors.primary} />
        <RadioButton.Item label="Kinesthetic Learner" value="Kinesthetic" color={colors.primary} />
        <RadioButton.Item label="Reading/Writing Learner" value="Reading/Writing" color={colors.primary} />
      </RadioButton.Group>

      {/* Preferred Language */}
      <View style={styles.inputContainer}>
        <MaterialIcons name="language" size={24} color={colors.secondary} style={styles.inputIcon} />
        <TextInput
          label="Preferred Language"
          value={language}
          onChangeText={setLanguage}
          style={styles.input}
          mode="outlined"
          theme={{ colors: { primary: colors.primary } }}
          placeholder="Select your preferred language"
          placeholderTextColor={colors.gray}
        />
      </View>

      {/* Timezone */}
      <View style={styles.inputContainer}>
        <MaterialIcons name="access-time" size={24} color={colors.secondary} style={styles.inputIcon} />
        <TextInput
          label="Timezone"
          value={timezone}
          editable={false}
          caretHidden={true} // Hide cursor
          style={styles.input}
          mode="outlined"
          theme={{ colors: { primary: colors.primary } }}
        />
      </View>

      {/* Submit Button */}
      <Button
        mode="contained"
        onPress={handleSubmit}
        style={styles.submitButton}
        labelStyle={{ color: '#fff' }}
        disabled={isSubmitting} // Disable button when submitting
      >
        {isSubmitting ? (
          <ActivityIndicator animating={true} color="#fff" /> // Custom loading indicator
        ) : (
          'Save Profile'
        )}
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: 20,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: colors.secondary,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.primary,
    marginBottom: 8,
  },
  avatarSection: {
    marginBottom: 16,
  },
  avatarListContainer: {
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 5,
    padding: 10,
  },
  avatarList: {
    alignItems: 'center',
  },
  avatarContainer: {
    margin: 8,
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedAvatar: {
    borderColor: colors.primary,
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  interestButton: {
    margin: 4,
    borderColor: colors.gray,
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: colors.primary,
  },
});

export default ProfileSetupScreen;