import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { colors } from '../utils/colors';

const CardBox = ({ name, email, avatarUrl }) => {
  return (
    <View style={styles.cardWrapper}>
      <View style={styles.card}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatarBorder}>
            <Image
              source={avatarUrl}
              style={styles.avatar}
            />
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.name}>{name || 'Name'}</Text>
          <Text style={styles.email}>{email || 'email@example.com'}</Text>
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
      height: 10,
    },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 7,
    width: '100%',
    maxWidth: 400,
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden', // Ensure the rounded corners are effective
    backgroundColor: colors.white, // Use white as background for card wrapper
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    padding: 20,
    backgroundColor: colors.white, // Clean white for the card
    borderWidth: 1,
    borderColor: colors.gray, // Use your gray for a subtle border
  },
  avatarContainer: {
    marginRight: 20,
  },
  avatarBorder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.gray, // Light gray for the avatar border
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 3,
    borderColor: colors.white, // White border for a clean look
  },
  textContainer: {
    justifyContent: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: '700', // Bolder font weight for emphasis
    marginBottom: 4,
    color: colors.primary, // Use your primary color for the name
  },
  email: {
    fontSize: 14,
    color: colors.secondary, // Use secondary color for email
    letterSpacing: 0.1,
  },
});

export default CardBox;