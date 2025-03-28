import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { colors } from '../utils/colors';
import { fonts } from '../utils/fonts';

const RecentActivityScreen = () => {
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'completed', 'upcoming'

  const activities = {
    completed: [
      {
        id: 1,
        type: 'lesson',
        title: 'Completed Lesson 5',
        subtitle: 'Python Programming - Variables & Data Types',
        time: '2 hours ago',
        course: 'Python Programming'
      },
      {
        id: 2,
        type: 'quiz',
        title: 'Completed Quiz 3',
        subtitle: 'React Native - Components',
        time: '1 day ago',
        course: 'React Native Development'
      },
      {
        id: 3,
        type: 'assignment',
        title: 'Submitted Assignment 2',
        subtitle: 'UI/UX Design - Wireframing',
        time: '2 days ago',
        course: 'UI/UX Design Fundamentals'
      }
    ],
    upcoming: [
      {
        id: 4,
        type: 'quiz',
        title: 'Upcoming Quiz',
        subtitle: 'React Native - State Management',
        time: 'Due in 2 days',
        course: 'React Native Development'
      },
      {
        id: 5,
        type: 'assignment',
        title: 'Assignment Due',
        subtitle: 'Python - Functions & Modules',
        time: 'Due in 3 days',
        course: 'Python Programming'
      }
    ]
  };

  const renderActivityItem = (activity) => (
    <View key={activity.id} style={styles.activityItem}>
      <View style={[
        styles.activityIcon,
        activity.type === 'lesson' && styles.lessonIcon,
        activity.type === 'quiz' && styles.quizIcon,
        activity.type === 'assignment' && styles.assignmentIcon
      ]}>
        <Text style={styles.activityIconText}>
          {activity.type === 'lesson' ? '✓' : activity.type === 'quiz' ? '📝' : '📋'}
        </Text>
      </View>
      <View style={styles.activityContent}>
        <Text style={styles.activityTitle}>{activity.title}</Text>
        <Text style={styles.activitySubtitle}>{activity.subtitle}</Text>
        <View style={styles.activityFooter}>
          <Text style={styles.courseName}>{activity.course}</Text>
          <Text style={styles.activityTime}>{activity.time}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Recent Activity</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'all' && styles.activeTab]}
          onPress={() => setActiveTab('all')}
        >
          <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
          onPress={() => setActiveTab('completed')}
        >
          <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}>
            Completed
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text style={[styles.tabText, activeTab === 'upcoming' && styles.activeTabText]}>
            Upcoming
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {activeTab === 'all' && (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Completed</Text>
              {activities.completed.map(renderActivityItem)}
            </View>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Upcoming</Text>
              {activities.upcoming.map(renderActivityItem)}
            </View>
          </>
        )}
        {activeTab === 'completed' && (
          <View style={styles.section}>
            {activities.completed.map(renderActivityItem)}
          </View>
        )}
        {activeTab === 'upcoming' && (
          <View style={styles.section}>
            {activities.upcoming.map(renderActivityItem)}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    backgroundColor: colors.primary,
    paddingTop: 40,
    paddingHorizontal: 16,
    paddingBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.white,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.lightGray,
    borderRadius: 20,
    padding: 4,
    margin: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    color: colors.secondary,
    fontWeight: '500',
  },
  activeTabText: {
    color: colors.white,
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 16,
  },
  activityItem: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activityIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  lessonIcon: {
    backgroundColor: colors.primary,
  },
  quizIcon: {
    backgroundColor: colors.secondary,
  },
  assignmentIcon: {
    backgroundColor: '#FF6B6B',
  },
  activityIconText: {
    fontSize: 20,
    color: colors.white,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 4,
  },
  activitySubtitle: {
    fontSize: 14,
    color: colors.secondary,
    marginBottom: 4,
  },
  activityFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  courseName: {
    fontSize: 12,
    color: colors.secondary,
    fontWeight: '500',
  },
  activityTime: {
    fontSize: 12,
    color: colors.secondary,
    fontStyle: 'italic',
  },
});

export default RecentActivityScreen; 