import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { colors } from '../utils/colors';
import { useNavigation } from '@react-navigation/native';

const BadgesScreen = () => {
  const navigation = useNavigation();

  const badges = [
    {
      id: '1',
      title: 'Early Bird',
      description: 'Completed 5 lessons before 9 AM',
      icon: '🌅',
      earned: true,
      dateEarned: 'March 15, 2024',
    },
    {
      id: '2',
      title: 'Streak Master',
      description: 'Maintained a 7-day learning streak',
      icon: '🔥',
      earned: true,
      dateEarned: 'March 10, 2024',
    },
    {
      id: '3',
      title: 'Perfect Score',
      description: 'Achieved 100% on any quiz',
      icon: '🎯',
      earned: false,
    },
    {
      id: '4',
      title: 'Social Butterfly',
      description: 'Participated in 10 discussions',
      icon: '🦋',
      earned: false,
    },
    {
      id: '5',
      title: 'Course Master',
      description: 'Completed your first course',
      icon: '👑',
      earned: true,
      dateEarned: 'March 1, 2024',
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
        <Text style={styles.headerTitle}>Badges</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.badgesContainer}>
          {badges.map((badge) => (
            <View 
              key={badge.id} 
              style={[
                styles.badgeCard,
                !badge.earned && styles.lockedBadge
              ]}
            >
              <View style={styles.badgeIconContainer}>
                <Text style={styles.badgeIcon}>{badge.icon}</Text>
              </View>
              <View style={styles.badgeContent}>
                <Text style={styles.badgeTitle}>{badge.title}</Text>
                <Text style={styles.badgeDescription}>{badge.description}</Text>
                {badge.earned && (
                  <Text style={styles.dateEarned}>Earned: {badge.dateEarned}</Text>
                )}
              </View>
              {!badge.earned && (
                <View style={styles.lockIcon}>
                  <Text style={styles.lockIconText}>🔒</Text>
                </View>
              )}
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
  badgesContainer: {
    padding: 16,
  },
  badgeCard: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lockedBadge: {
    opacity: 0.7,
  },
  badgeIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.calmBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  badgeIcon: {
    fontSize: 28,
  },
  badgeContent: {
    flex: 1,
  },
  badgeTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  badgeDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  dateEarned: {
    fontSize: 12,
    color: colors.textLight,
    fontStyle: 'italic',
  },
  lockIcon: {
    padding: 8,
  },
  lockIconText: {
    fontSize: 20,
  },
});

export default BadgesScreen; 