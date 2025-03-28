import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { colors } from '../utils/colors';
import { useNavigation } from '@react-navigation/native';

const PersonalizedAnalyticsScreen = () => {
  const navigation = useNavigation();

  const learningStats = {
    totalHours: 45,
    weeklyAverage: 6.5,
    streakDays: 7,
    completedCourses: 3,
    inProgress: 2,
    quizScore: 85,
    assignmentsCompleted: 12,
  };

  const progressData = [
    { label: 'Python', progress: 75 },
    { label: 'React Native', progress: 60 },
    { label: 'UI/UX Design', progress: 30 },
  ];

  const recentAchievements = [
    {
      title: 'Perfect Week',
      description: 'Completed all daily goals for 7 days straight',
      date: 'Today',
      icon: '🔥',
    },
    {
      title: 'Quick Learner',
      description: 'Completed 3 courses in record time',
      date: 'Yesterday',
      icon: '⚡',
    },
    {
      title: 'Quiz Master',
      description: 'Scored 100% in 5 consecutive quizzes',
      date: '2 days ago',
      icon: '🏆',
    },
  ];

  const renderProgressBar = (progress) => (
    <View style={styles.progressBarContainer}>
      <View style={[styles.progressBar, { width: `${progress}%` }]} />
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Learning Analytics</Text>
      </View>

      {/* Learning Overview */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Learning Overview</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{learningStats.totalHours}h</Text>
            <Text style={styles.statLabel}>Total Learning</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{learningStats.weeklyAverage}h</Text>
            <Text style={styles.statLabel}>Weekly Average</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{learningStats.streakDays}</Text>
            <Text style={styles.statLabel}>Day Streak</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{learningStats.quizScore}%</Text>
            <Text style={styles.statLabel}>Quiz Score</Text>
          </View>
        </View>
      </View>

      {/* Course Progress */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Course Progress</Text>
        {progressData.map((course, index) => (
          <View key={index} style={styles.courseProgressItem}>
            <View style={styles.courseProgressHeader}>
              <Text style={styles.courseName}>{course.label}</Text>
              <Text style={styles.progressText}>{course.progress}%</Text>
            </View>
            {renderProgressBar(course.progress)}
          </View>
        ))}
      </View>

      {/* Recent Achievements */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Achievements</Text>
        {recentAchievements.map((achievement, index) => (
          <View key={index} style={styles.achievementCard}>
            <View style={styles.achievementIcon}>
              <Text style={styles.achievementIconText}>{achievement.icon}</Text>
            </View>
            <View style={styles.achievementContent}>
              <Text style={styles.achievementTitle}>{achievement.title}</Text>
              <Text style={styles.achievementDescription}>{achievement.description}</Text>
              <Text style={styles.achievementDate}>{achievement.date}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
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
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    width: (Dimensions.get('window').width - 56) / 2,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  courseProgressItem: {
    marginBottom: 16,
  },
  courseProgressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  courseName: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  progressText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: colors.lightGray,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  achievementCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.calmBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  achievementIconText: {
    fontSize: 20,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  achievementDate: {
    fontSize: 12,
    color: colors.textLight,
  },
});

export default PersonalizedAnalyticsScreen; 