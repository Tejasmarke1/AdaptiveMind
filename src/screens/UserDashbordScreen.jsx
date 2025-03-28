import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Image, Modal } from 'react-native';
import CardBox from '../components/CardBox';
import AnimatedProgressBar from '../components/AnimatedProgressBar';
import AIChatbotScreen from '../components/AIChatbotScreen';
import { colors } from '../utils/colors';
import { fonts } from '../utils/fonts';
import { useNavigation } from '@react-navigation/native';

const UserDashboardScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [userProgress, setUserProgress] = useState(0);
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [completedCourses, setCompletedCourses] = useState([]);
  const [activeTab, setActiveTab] = useState('active'); // 'active' or 'completed'
  const [showChatbot, setShowChatbot] = useState(false);

  useEffect(() => {
    // Simulating API call
    setTimeout(() => setUserProgress(70), 500);
  }, []);

  useEffect(() => {
    // Here you would fetch user data from an API
    fetchUserData().then(data => setUser(data));
    fetchRecommendedCourses().then(courses => setRecommendedCourses(courses));
    fetchEnrolledCourses().then(courses => setEnrolledCourses(courses));
    fetchCompletedCourses().then(courses => setCompletedCourses(courses));
  }, []);

  const fetchUserData = async () => {
    // Simulated fetch, replace this with your actual data fetching logic
    return {
      name: "John Doe",
      email: "john.doe@example.com",
      avatarUrl: require('../assets/avatars/avatar1.jpg')
    };
  };

  const fetchEnrolledCourses = async () => {
    // Simulated fetch, replace with actual API call
    return [
      {
        id: 1,
        title: "Python Programming",
        progress: 45,
        lastAccessed: "2 days ago",
        totalLessons: 24,
        completedLessons: 11
      },
      {
        id: 2,
        title: "React Native Development",
        progress: 60,
        lastAccessed: "1 day ago",
        totalLessons: 30,
        completedLessons: 18
      },
      {
        id: 3,
        title: "UI/UX Design Fundamentals",
        progress: 30,
        lastAccessed: "5 days ago",
        totalLessons: 20,
        completedLessons: 6
      }
    ];
  };

  const fetchCompletedCourses = async () => {
    // Simulated fetch, replace with actual API call
    return [
      {
        id: 4,
        title: "JavaScript Basics",
        completedDate: "March 15, 2024",
        totalLessons: 20,
        completedLessons: 20,
        certificateId: "CERT-JS-001"
      },
      {
        id: 5,
        title: "HTML & CSS Fundamentals",
        completedDate: "February 28, 2024",
        totalLessons: 15,
        completedLessons: 15,
        certificateId: "CERT-HTML-002"
      }
    ];
  };

  const fetchRecommendedCourses = async () => {
    return [
      {
        id: 1,
        title: "Machine Learning Basics",
        description: "Learn the fundamentals of ML algorithms",
        duration: "8 weeks",
        level: "Beginner"
      },
      {
        id: 2,
        title: "Data Structures",
        description: "Master essential data structures",
        duration: "10 weeks",
        level: "Intermediate"
      }
    ];
  };

  const handleContinueLearning = (courseId) => {
    // Navigate to course details/learning screen
    console.log('Continue learning course:', courseId);
  };

  const handleViewCertificate = (certificateId) => {
    // Navigate to certificate view screen
    console.log('Viewing certificate:', certificateId);
  };

  const handleSeeAllRecommendations = () => {
    navigation.navigate('RecommendedCourses');
  };

  const handleCloseChatbot = () => {
    setShowChatbot(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          {user && (
            <CardBox 
              name={user.name} 
              email={user.email} 
              avatarUrl={user.avatarUrl}
            />
          )}
        </View>

        <View style={styles.overallProgressSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Learning Progress</Text>
            <Text style={styles.overallProgressText}>{userProgress}% Complete</Text>
          </View>
          <AnimatedProgressBar progress={userProgress} />
        </View>

        <View style={styles.statsSection}>
          <TouchableOpacity 
            style={styles.statsCard}
            onPress={() => navigation.navigate('PersonalizedAnalytics')}
          >
            <View style={styles.statsIconContainer}>
              <Text style={styles.statsIcon}>📊</Text>
            </View>
            <View style={styles.statsContent}>
              <Text style={styles.statsValue}>85%</Text>
              <Text style={styles.statsLabel}>Analytics</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.statsCard}
            onPress={() => navigation.navigate('Achievements')}
          >
            <View style={styles.statsIconContainer}>
              <Text style={styles.statsIcon}>🏆</Text>
            </View>
            <View style={styles.statsContent}>
              <Text style={styles.statsValue}>12</Text>
              <Text style={styles.statsLabel}>Achievements</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.statsCard}
            onPress={() => navigation.navigate('Badges')}
          >
            <View style={styles.statsIconContainer}>
              <Text style={styles.statsIcon}>🎖️</Text>
            </View>
            <View style={styles.statsContent}>
              <Text style={styles.statsValue}>5</Text>
              <Text style={styles.statsLabel}>Badges</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.statsCard}
            onPress={() => navigation.navigate('CommunityDiscussion')}
          >
            <View style={styles.statsIconContainer}>
              <Text style={styles.statsIcon}>💬</Text>
            </View>
            <View style={styles.statsContent}>
              <Text style={styles.statsValue}>24</Text>
              <Text style={styles.statsLabel}>Discussions</Text>
            </View>
          </TouchableOpacity>
        </View>
        
        <View style={styles.enrolledSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Learning</Text>
          </View>
          <View style={styles.tabContainer}>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'active' && styles.activeTab]}
              onPress={() => setActiveTab('active')}
            >
              <Text style={[styles.tabText, activeTab === 'active' && styles.activeTabText]}>
                Active ({enrolledCourses.length})
              </Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
              onPress={() => setActiveTab('completed')}
            >
              <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}>
                Completed ({completedCourses.length})
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.enrolledCoursesContainer}>
            {activeTab === 'active' ? (
              enrolledCourses.map((course) => (
                <View key={course.id} style={styles.enrolledCourseItem}>
                  <View style={styles.courseDetails}>
                    <Text style={styles.enrolledCourseTitle}>{course.title}</Text>
                    <View style={styles.courseStats}>
                      <Text style={styles.lessonCount}>
                        {course.completedLessons}/{course.totalLessons} Lessons
                      </Text>
                      <Text style={styles.lastAccessed}>Last: {course.lastAccessed}</Text>
                    </View>
                    <View style={styles.progressContainer}>
                      <View style={[styles.progressBar, { width: `${course.progress}%` }]} />
                    </View>
                    <Text style={styles.progressText}>{course.progress}% Complete</Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.continueButtonSmall}
                    onPress={() => handleContinueLearning(course.id)}
                  >
                    <Text style={styles.buttonTextSmall}>Continue</Text>
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              completedCourses.map((course) => (
                <View key={course.id} style={styles.enrolledCourseItem}>
                  <View style={styles.courseDetails}>
                    <Text style={styles.enrolledCourseTitle}>{course.title}</Text>
                    <View style={styles.courseStats}>
                      <Text style={styles.lessonCount}>
                        {course.completedLessons}/{course.totalLessons} Lessons
                      </Text>
                      <Text style={styles.completedDate}>Completed: {course.completedDate}</Text>
                    </View>
                    <View style={styles.progressContainer}>
                      <View style={[styles.progressBar, { width: '100%' }]} />
                    </View>
                    <Text style={styles.progressText}>Course Completed!</Text>
                  </View>
                  <TouchableOpacity 
                    style={styles.certificateButton}
                    onPress={() => handleViewCertificate(course.certificateId)}
                  >
                    <Text style={styles.buttonTextSmall}>View Certificate</Text>
                  </TouchableOpacity>
                </View>
              ))
            )}
          </View>
        </View>

        <View style={styles.recentActivitySection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Activity</Text>
            <TouchableOpacity onPress={() => navigation.navigate('RecentActivity')}>
              <Text style={styles.seeAllButton}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.recentActivityContainer}>
            <View style={styles.recentActivityItem}>
              <View style={styles.activityIcon}>
                <Text style={styles.activityIconText}>✓</Text>
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Completed Lesson 5</Text>
                <Text style={styles.activitySubtitle}>Python Programming - Variables & Data Types</Text>
                <Text style={styles.activityTime}>2 hours ago</Text>
              </View>
            </View>
            <View style={styles.recentActivityItem}>
              <View style={[styles.activityIcon, styles.upcomingIcon]}>
                <Text style={styles.activityIconText}>📝</Text>
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>Upcoming Quiz</Text>
                <Text style={styles.activitySubtitle}>React Native - State Management</Text>
                <Text style={styles.activityTime}>Due in 2 days</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.recommendedPreviewSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommended for You</Text>
            <TouchableOpacity onPress={handleSeeAllRecommendations}>
              <Text style={styles.seeAllButton}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.recommendedPreviewContainer}>
            {recommendedCourses.slice(0, 2).map((course) => (
              <TouchableOpacity 
                key={course.id} 
                style={styles.recommendedPreviewItem}
                onPress={() => handleContinueLearning(course.id)}
              >
                <View style={styles.recommendedCourseHeader}>
                  <Text style={styles.recommendedCourseTitle}>{course.title}</Text>
                  <View style={styles.levelBadge}>
                    <Text style={styles.levelText}>{course.level}</Text>
                  </View>
                </View>
                <Text style={styles.recommendedCourseDescription} numberOfLines={2}>
                  {course.description}
                </Text>
                <Text style={styles.durationText}>⏱ {course.duration}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* AI Chatbot Floating Button */}
      <TouchableOpacity
        style={styles.chatbotButton}
        onPress={() => navigation.navigate('AIChatbot')}
        activeOpacity={0.8}
      >
        <View style={styles.chatbotIconContainer}>
          <Text style={styles.chatbotIcon}>🤖</Text>
        </View>
        <Text style={styles.chatbotText}>Ask AI</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: colors.primary,
    paddingTop: 40,
    paddingHorizontal: 16,
    paddingBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.white,
    marginBottom: 16,
  },
  overallProgressSection: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: colors.lightGray,
    borderRadius: 20,
    padding: 4,
    marginBottom: 16,
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
  },
  overallProgressText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.secondary,
  },
  enrolledSection: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  enrolledCoursesContainer: {
    gap: 16,
  },
  enrolledCourseItem: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
  },
  courseDetails: {
    flex: 1,
    marginRight: 12,
  },
  enrolledCourseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    marginBottom: 8,
  },
  courseStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  lessonCount: {
    fontSize: 12,
    color: colors.secondary,
    fontWeight: '500',
  },
  lastAccessed: {
    fontSize: 12,
    color: colors.secondary,
    fontStyle: 'italic',
  },
  completedDate: {
    fontSize: 12,
    color: colors.secondary,
    fontStyle: 'italic',
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
    color: colors.secondary,
    fontWeight: '500',
  },
  continueButtonSmall: {
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  certificateButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.secondary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonTextSmall: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  recommendedPreviewSection: {
    marginTop: 24,
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  seeAllButton: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  recommendedPreviewContainer: {
    gap: 16,
  },
  recommendedPreviewItem: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 20,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
  },
  recommendedCourseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  recommendedCourseTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
    flex: 1,
    marginRight: 8,
  },
  levelBadge: {
    backgroundColor: colors.calmBlue,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  levelText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
  recommendedCourseDescription: {
    fontSize: 14,
    color: colors.secondary,
    marginBottom: 8,
    lineHeight: 20,
  },
  durationText: {
    fontSize: 12,
    color: colors.secondary,
    fontWeight: '500',
  },
  recentActivitySection: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  recentActivityContainer: {
    gap: 16,
  },
  recentActivityItem: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
  },
  activityIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  upcomingIcon: {
    backgroundColor: colors.secondary,
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
  activityTime: {
    fontSize: 12,
    color: colors.secondary,
    fontStyle: 'italic',
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 24,
    gap: 12,
  },
  statsCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statsIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.calmBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  statsIcon: {
    fontSize: 28,
  },
  statsContent: {
    alignItems: 'center',
  },
  statsValue: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 6,
  },
  statsLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  chatbotButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: colors.primary,
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 1000,
  },
  chatbotIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  chatbotIcon: {
    fontSize: 20,
  },
  chatbotText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
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
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statIcon: {
    fontSize: 24,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.secondary,
    fontWeight: '500',
  },
});

export default UserDashboardScreen;