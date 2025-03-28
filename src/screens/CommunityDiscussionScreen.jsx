import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import { colors } from '../utils/colors';
import { useNavigation } from '@react-navigation/native';

const CommunityDiscussionScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState('trending'); // trending, latest, following

  const discussions = [
    {
      id: '1',
      title: 'Best practices for React Native state management',
      author: {
        name: 'Sarah Chen',
        avatar: require('../assets/avatars/avatar1.jpg'),
        role: 'Senior Developer',
      },
      content: 'I\'ve been working with React Native for a while now, and I\'d like to share some insights about state management...',
      likes: 128,
      comments: 32,
      timeAgo: '2h ago',
      tags: ['React Native', 'State Management'],
    },
    {
      id: '2',
      title: 'Python vs JavaScript for beginners',
      author: {
        name: 'Mike Johnson',
        avatar: require('../assets/avatars/avatar2.jpg'),
        role: 'Tech Educator',
      },
      content: 'As someone who teaches both languages, I often get asked which one to start with...',
      likes: 95,
      comments: 45,
      timeAgo: '4h ago',
      tags: ['Python', 'JavaScript', 'Beginner'],
    },
    {
      id: '3',
      title: 'UI/UX Design Principles in Practice',
      author: {
        name: 'Emma Davis',
        avatar: require('../assets/avatars/avatar3.jpg'),
        role: 'UI/UX Designer',
      },
      content: 'Let\'s discuss how to apply design principles in real-world scenarios...',
      likes: 76,
      comments: 28,
      timeAgo: '6h ago',
      tags: ['UI/UX', 'Design'],
    },
  ];

  const renderDiscussionItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.discussionCard}
      onPress={() => navigation.navigate('DiscussionDetail', { discussion: item })}
    >
      <View style={styles.discussionHeader}>
        <View style={styles.authorInfo}>
          <Image source={item.author.avatar} style={styles.authorAvatar} />
          <View>
            <Text style={styles.authorName}>{item.author.name}</Text>
            <Text style={styles.authorRole}>{item.author.role}</Text>
          </View>
        </View>
        <Text style={styles.timeAgo}>{item.timeAgo}</Text>
      </View>

      <Text style={styles.discussionTitle}>{item.title}</Text>
      <Text style={styles.discussionContent} numberOfLines={3}>
        {item.content}
      </Text>

      <View style={styles.tagsContainer}>
        {item.tags.map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>#{tag}</Text>
          </View>
        ))}
      </View>

      <View style={styles.discussionFooter}>
        <View style={styles.interactionButton}>
          <Text style={styles.interactionIcon}>❤️</Text>
          <Text style={styles.interactionText}>{item.likes}</Text>
        </View>
        <View style={styles.interactionButton}>
          <Text style={styles.interactionIcon}>💬</Text>
          <Text style={styles.interactionText}>{item.comments}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Community</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'trending' && styles.activeTab]}
          onPress={() => setActiveTab('trending')}
        >
          <Text style={[styles.tabText, activeTab === 'trending' && styles.activeTabText]}>
            Trending
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'latest' && styles.activeTab]}
          onPress={() => setActiveTab('latest')}
        >
          <Text style={[styles.tabText, activeTab === 'latest' && styles.activeTabText]}>
            Latest
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'following' && styles.activeTab]}
          onPress={() => setActiveTab('following')}
        >
          <Text style={[styles.tabText, activeTab === 'following' && styles.activeTabText]}>
            Following
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={discussions}
        renderItem={renderDiscussionItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.discussionsContainer}
      />

      <TouchableOpacity style={styles.newDiscussionButton}>
        <Text style={styles.newDiscussionButtonText}>+ New Discussion</Text>
      </TouchableOpacity>
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
  tabContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  activeTabText: {
    color: colors.white,
  },
  discussionsContainer: {
    padding: 16,
  },
  discussionCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  discussionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  authorName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  authorRole: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  timeAgo: {
    fontSize: 12,
    color: colors.textLight,
  },
  discussionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  discussionContent: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  tag: {
    backgroundColor: colors.calmBlue,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
  discussionFooter: {
    flexDirection: 'row',
    gap: 16,
  },
  interactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  interactionIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  interactionText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  newDiscussionButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: colors.primary,
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 20,
    shadowColor: colors.shadow,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  newDiscussionButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CommunityDiscussionScreen; 