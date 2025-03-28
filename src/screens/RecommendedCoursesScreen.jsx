import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { colors } from '../utils/colors';
import { fonts } from '../utils/fonts';

const FILTERS = ['All', 'Beginner', 'Intermediate', 'Advanced'];

const RecommendedCoursesScreen = () => {
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecommendedCourses().then(courses => {
      setRecommendedCourses(courses);
      setLoading(false);
    });
  }, []);

  const fetchRecommendedCourses = async () => {
    // Simulated fetch, replace with actual API call
    return [
      {
        id: 1,
        title: "Machine Learning Basics",
        description: "Learn the fundamentals of ML algorithms and their applications in real-world scenarios. Perfect for beginners!",
        duration: "8 weeks",
        level: "Beginner",
        rating: 4.8,
        studentsCount: 1234,
        image: require('../assets/Image.png')
      },
      {
        id: 2,
        title: "Data Structures",
        description: "Master essential data structures and algorithms. Improve your problem-solving skills and code efficiency.",
        duration: "10 weeks",
        level: "Intermediate",
        rating: 4.6,
        studentsCount: 856,
        image: require('../assets/Image.png')
      },
      {
        id: 3,
        title: "Web Development",
        description: "Build modern web applications using the latest technologies and frameworks.",
        duration: "12 weeks",
        level: "Intermediate",
        rating: 4.9,
        studentsCount: 2341,
        image: require('../assets/Image.png')
      },
      {
        id: 4,
        title: "Mobile App Development",
        description: "Create cross-platform mobile applications using React Native.",
        duration: "10 weeks",
        level: "Intermediate",
        rating: 4.7,
        studentsCount: 1567,
        image: require('../assets/Image.png')
      },
      {
        id: 5,
        title: "UI/UX Design",
        description: "Learn design principles and create beautiful user interfaces.",
        duration: "6 weeks",
        level: "Beginner",
        rating: 4.5,
        studentsCount: 987,
        image: require('../assets/Image.png')
      }
    ];
  };

  const handleEnrollCourse = (courseId) => {
    // Handle course enrollment
    console.log('Enrolling in course:', courseId);
  };

  const filteredCourses = selectedFilter === 'All' 
    ? recommendedCourses 
    : recommendedCourses.filter(course => course.level === selectedFilter);

  const renderCourseCard = ({ item: course }) => (
    <View style={styles.courseCard}>
      <Image source={course.image} style={styles.courseImage} />
      <View style={styles.courseInfo}>
        <View style={styles.levelBadge}>
          <Text style={styles.levelText}>{course.level}</Text>
        </View>
        <View style={styles.courseHeader}>
          <Text style={styles.courseTitle}>{course.title}</Text>
          <View style={styles.ratingContainer}>
            <Text style={styles.ratingText}>★ {course.rating}</Text>
            <Text style={styles.studentsCount}>({course.studentsCount} students)</Text>
          </View>
        </View>
        <Text style={styles.courseDescription} numberOfLines={3}>
          {course.description}
        </Text>
        <View style={styles.courseFooter}>
          <View style={styles.courseMeta}>
            <Text style={styles.metaText}>⏱ {course.duration}</Text>
          </View>
          <TouchableOpacity 
            style={styles.enrollButton}
            onPress={() => handleEnrollCourse(course.id)}
          >
            <Text style={styles.buttonText}>Enroll Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Recommended Courses</Text>
        <Text style={styles.headerSubtitle}>Personalized for your learning journey</Text>
      </View>

      <View style={styles.filtersContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {FILTERS.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterButton,
                selectedFilter === filter && styles.filterButtonActive
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text style={[
                styles.filterText,
                selectedFilter === filter && styles.filterTextActive
              ]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filteredCourses}
        renderItem={renderCourseCard}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.coursesContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No courses found for the selected filter.
          </Text>
        }
      />
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
    padding: 20,
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.white,
  },
  headerSubtitle: {
    fontSize: 16,
    color: colors.white,
    opacity: 0.8,
    marginTop: 8,
  },
  filtersContainer: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: colors.lightGray,
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
  },
  filterText: {
    fontSize: 14,
    color: colors.secondary,
    fontWeight: '500',
  },
  filterTextActive: {
    color: colors.white,
  },
  coursesContainer: {
    padding: 16,
    gap: 16,
  },
  courseCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 16,
  },
  courseImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  courseInfo: {
    padding: 16,
  },
  levelBadge: {
    position: 'absolute',
    top: -30,
    right: 16,
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  levelText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
  courseHeader: {
    marginBottom: 8,
  },
  courseTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFB800',
    marginRight: 4,
  },
  studentsCount: {
    fontSize: 12,
    color: colors.secondary,
  },
  courseDescription: {
    fontSize: 14,
    color: colors.secondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  courseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  courseMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    fontSize: 14,
    color: colors.secondary,
    fontWeight: '500',
  },
  enrollButton: {
    backgroundColor: colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: colors.secondary,
    marginTop: 32,
  },
});

export default RecommendedCoursesScreen; 