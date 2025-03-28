import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { colors } from '../utils/colors';

const AnimatedProgressBar = ({ progress }) => {
  const animatedProgress = useSharedValue(0);

  useEffect(() => {
    animatedProgress.value = withTiming(progress, { duration: 1000 });  // Smooth transition
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: `${animatedProgress.value}%`,
  }));

  return (
    <View style={styles.cardWrapper}>
      <View style={styles.card}>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Learning Progress</Text>
          <View style={styles.progressBar}>
            <Animated.View style={[styles.progressFill, animatedStyle]} />
          </View>
          <Text style={styles.percentage}>{progress}% Completed</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 6,
    width: '100%',
    maxWidth: 400,
    borderRadius: 20,
    marginBottom: 16,
    overflow: 'hidden',
    backgroundColor: colors.white,
  },
  card: {
    borderRadius: 20,
    padding: 16,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray,
  },
  contentContainer: {
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 10,
    color: colors.primary,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: colors.lightGray,
    borderRadius: 4,
    overflow: 'hidden',
    marginVertical: 6,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  percentage: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: '600',
    color: colors.secondary,
  },
});

export default AnimatedProgressBar;