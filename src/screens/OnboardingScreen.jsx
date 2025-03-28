import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../utils/colors';
import { fonts } from '../utils/fonts';
import { BaseUrlContext } from '../../ApiContext';

const OnboardingScreen = () => {
    const navigation = useNavigation();

    // State for form fields
    const [learningGoal, setLearningGoal] = useState(null);
    const [preferredSubjects, setPreferredSubjects] = useState([]);
    const [experienceLevel, setExperienceLevel] = useState(null);
    const [enableNotifications, setEnableNotifications] = useState(false);
    const [enableLeaderboard, setEnableLeaderboard] = useState(false);
    const [loading, setLoading] = useState(false);
    const { baseUrl,refetch } = useContext(BaseUrlContext);

    // Learning goals
    const learningGoals = [
        { label: 'Career Growth', value: 'career_growth' },
        { label: 'Skill Development', value: 'skill_development' },
        { label: 'Exam Preparation', value: 'exam_preparation' },
    ];

    // Preferred subjects
    const subjects = [
        { label: 'Machine Learning', value: 'machine_learning' },
        { label: 'Python', value: 'python' },
        { label: 'Data Structures & Algorithms', value: 'dsa' },
        { label: 'Web Development', value: 'web_development' },
    ];

    // Experience levels
    const experienceLevels = [
        { label: 'Beginner', value: 'beginner' },
        { label: 'Intermediate', value: 'intermediate' },
        { label: 'Advanced', value: 'advanced' },
    ];

    // Handle form submission
    const handleSubmit = async () => {
        setLoading(true);
        try {
            const token = await AsyncStorage.getItem('accessToken'); // Get token from AsyncStorage
            if (!token) {
                Alert.alert('Error', 'User is not authenticated.');
                return;
            }

            const userPreferences = {
                learning_goal: learningGoal,
                preferred_subjects: preferredSubjects,
                experience_level: experienceLevel,
                enable_notification: enableNotifications,
                enable_leaderboard: enableLeaderboard,
            };

            const response = await axios.patch(
                '${baseUrl}/api/onboarding/', // Replace with your API URL
                userPreferences,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 201 || response.status === 200) {
                Alert.alert('Success', 'Onboarding completed successfully!');
                navigation.navigate('Home'); // Navigate to the next screen
            } else {
                Alert.alert('Error', 'Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Onboarding Error:', error.response?.data || error.message);
            Alert.alert('Error', 'Failed to submit onboarding data.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Back Button */}
            <TouchableOpacity style={styles.backButtonWrapper} onPress={() => navigation.goBack()}>
                <Ionicons name="arrow-back-outline" color={colors.primary} size={30} />
            </TouchableOpacity>

            {/* Welcome Message */}
            <View style={styles.textContainer}>
                <Text style={styles.headingText}>Welcome to</Text>
                <Text style={styles.headingText}>AdaptiveMind!</Text>
            </View>

            {/* Learning Goal */}
            <Text style={styles.sectionTitle}>1. What is your learning goal?</Text>
            <RNPickerSelect
                onValueChange={(value) => setLearningGoal(value)}
                items={learningGoals}
                placeholder={{ label: 'Select a learning goal...', value: null }}
                style={pickerSelectStyles}
                useNativeAndroidPickerStyle={false}
                value={learningGoal}
            />

            {/* Preferred Subjects */}  
            <Text style={styles.sectionTitle}>2. What are your preferred subjects?</Text>
            {subjects.map((subject) => {
                const isSelected = preferredSubjects.includes(subject.value);
                return (
                    <TouchableOpacity
                        key={subject.value}
                        style={[
                            styles.checkbox,
                            isSelected && styles.checkboxSelected,
                        ]}
                        onPress={() => {
                            setPreferredSubjects((prev) =>
                                prev.includes(subject.value)
                                    ? prev.filter((item) => item !== subject.value)
                                    : [...prev, subject.value]
                            );
                        }}
                    >
                        <Text
                            style={[
                                styles.checkboxLabel,
                                { color: isSelected ? colors.white : colors.primary },
                            ]}
                        >
                            {subject.label}
                        </Text>
                    </TouchableOpacity>
                );
            })}

            {/* Experience Level */}
            <Text style={styles.sectionTitle}>3. What is your experience level?</Text>
            <RNPickerSelect
                onValueChange={(value) => setExperienceLevel(value)}
                items={experienceLevels}
                placeholder={{ label: 'Select your experience level...', value: null }}
                style={pickerSelectStyles}
                useNativeAndroidPickerStyle={false}
                value={experienceLevel}
            />

            {/* Enable Notifications */}
            <Text style={styles.sectionTitle}>4. Enable Notifications?</Text>
            <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>
                    Receive reminders for learning streaks, new quizzes, etc.
                </Text>
                <TouchableOpacity
                    style={[
                        styles.switchButton,
                        enableNotifications && styles.switchButtonSelected,
                    ]}
                    onPress={() => setEnableNotifications(!enableNotifications)}
                >
                    <Text
                        style={[
                            styles.switchButtonText,
                            { color: enableNotifications ? colors.white : colors.primary },
                        ]}
                    >
                        {enableNotifications ? 'ON' : 'OFF'}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Enable Leaderboard Participation */}
            <Text style={styles.sectionTitle}>5. Enable Leaderboard Participation?</Text>
            <View style={styles.switchContainer}>
                <Text style={styles.switchLabel}>
                    Participate in the leaderboard to track your progress.
                </Text>
                <TouchableOpacity
                    style={[
                        styles.switchButton,
                        enableLeaderboard && styles.switchButtonSelected,
                    ]}
                    onPress={() => setEnableLeaderboard(!enableLeaderboard)}
                >
                    <Text
                        style={[
                            styles.switchButtonText,
                            { color: enableLeaderboard ? colors.white : colors.primary },
                        ]}
                    >
                        {enableLeaderboard ? 'YES' : 'NO'}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Submit Button */}
            <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
                disabled={!learningGoal || !preferredSubjects.length || !experienceLevel || loading}
            >
                <Text style={styles.submitButtonText}>
                    {loading ? 'Submitting...' : 'Get Started'}
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
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
    sectionTitle: {
        fontSize: 18,
        color: colors.primary,
        fontFamily: fonts.SemiBold,
        marginTop: 20,
    },
    checkbox: {
        borderWidth: 1,
        borderColor: colors.secondary,
        borderRadius: 100,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginVertical: 5,
    },
    checkboxSelected: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    checkboxLabel: {
        fontSize: 16,
        fontFamily: fonts.Regular,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 10,
    },
    switchLabel: {
        fontSize: 16,
        color: colors.primary,
        fontFamily: fonts.Regular,
        flex: 1,
        marginRight: 10,
    },
    switchButton: {
        borderWidth: 1,
        borderColor: colors.secondary,
        borderRadius: 100,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    switchButtonSelected: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    switchButtonText: {
        fontSize: 16,
        fontFamily: fonts.Regular,
    },
    submitButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        borderRadius: 100,
        backgroundColor: colors.primary,
        paddingVertical: 15,
        marginTop: 30,
    },
    submitButtonText: {
        color: colors.white,
        fontSize: 18,
        fontFamily: fonts.SemiBold,
    },
});

const pickerSelectStyles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: colors.secondary,
        borderRadius: 10,
        backgroundColor: colors.white,
        paddingVertical: 12,
        paddingHorizontal: 10,
        marginVertical: 5,
    },
    inputIOS: {
        color: colors.primary,
        paddingRight: 30,
    },
    inputAndroid: {
        color: colors.primary,
        paddingRight: 30,
    },
});

export default OnboardingScreen;