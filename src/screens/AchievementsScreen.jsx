import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { colors } from '../utils/colors';
import { useNavigation } from '@react-navigation/native';

const AchievementsScreen = () => {
  const navigation = useNavigation();

  const achievements = [
    {
      id: '1',
      title: 'First Course Completed',
      description: 'Complete your first course',
      progress: 100,
      dateEarned: 'March 15, 2024',
      icon: '🎓',
    },
    {
      id: '2',
      title: 'Perfect Attendance',
      description: 'Complete all lessons in a week',
      progress: 75,
      dateEarned: 'March 10, 2024',
      icon: '⭐',
    },
    {
      id: '3',
      title: 'Social Butterfly',
      description: 'Participate in 10 discussions',
      progress: 40,
      dateEarned: 'March 5, 2024',
      icon: '🦋',
    },
    {
      id: '4',
      title: 'Night Owl',
      description: 'Complete a lesson after 10 PM',
      progress: 0,
      icon: '🦉',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Achievements</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.achievementsContainer}>
          {achievements.map((achievement) => (
            <View key={achievement.id} style={styles.achievementCard}>
              <View style={styles.achievementIconContainer}>
                <Text style={styles.achievementIcon}>{achievement.icon}</Text>
              </View>
              <View style={styles.achievementContent}>
                <Text style={styles.achievementTitle}>{achievement.title}</Text>
                <Text style={styles.achievementDescription}>
                  {achievement.description}
                </Text>
                <View style={styles.progressContainer}>
                  <View 
                    style={[
                      styles.progressBar,
                      { width: `${achievement.progress}%` }
                    ]} 
                  />
                </View>
                <Text style={styles.progressText}>
                  {achievement.progress}% Complete
                </Text>
                {achievement.dateEarned && (
                  <Text style={styles.dateEarned}>
                    Earned: {achievement.dateEarned}
                  </Text>
                )}
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.primary,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  backButtonText: {
    fontSize: 24,
    color: colors.white,
    fontWeight: '300',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: colors.white,
  },
  content: {
    flex: 1,
  },
  achievementsContainer: {
    padding: 16,
  },
  achievementCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  achievementIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.calmBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  achievementIcon: {
    fontSize: 28,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 12,
  },
  progressContainer: {
    height: 6,
    backgroundColor: colors.lightGray,
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
    marginBottom: 4,
  },
  dateEarned: {
    fontSize: 12,
    color: colors.textLight,
    fontStyle: 'italic',
  },
});

export default AchievementsScreen; 