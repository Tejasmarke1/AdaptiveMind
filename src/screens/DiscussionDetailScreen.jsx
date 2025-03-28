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
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { colors } from '../utils/colors';
import { useNavigation, useRoute } from '@react-navigation/native';

const DiscussionDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { discussion } = route.params;
  const [comment, setComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);

  const comments = [
    {
      id: '1',
      author: {
        name: 'Alex Wong',
        avatar: require('../assets/avatars/avatar4.jpg'),
        role: 'Frontend Developer',
      },
      content: 'Great insights! I particularly agree with your point about using Redux for complex state management.',
      timeAgo: '1h ago',
      likes: 12,
      replies: 3,
    },
    {
      id: '2',
      author: {
        name: 'Lisa Chen',
        avatar: require('../assets/avatars/avatar5.jpg'),
        role: 'Mobile Developer',
      },
      content: 'Have you considered using MobX as an alternative? It provides a more straightforward approach in some cases.',
      timeAgo: '2h ago',
      likes: 8,
      replies: 2,
    },
  ];

  const renderCommentItem = ({ item }) => (
    <View style={styles.commentCard}>
      <View style={styles.commentHeader}>
        <View style={styles.authorInfo}>
          <Image source={item.author.avatar} style={styles.authorAvatar} />
          <View>
            <Text style={styles.authorName}>{item.author.name}</Text>
            <Text style={styles.authorRole}>{item.author.role}</Text>
          </View>
        </View>
        <Text style={styles.timeAgo}>{item.timeAgo}</Text>
      </View>

      <Text style={styles.commentContent}>{item.content}</Text>

      <View style={styles.commentFooter}>
        <TouchableOpacity style={styles.interactionButton}>
          <Text style={styles.interactionIcon}>❤️</Text>
          <Text style={styles.interactionText}>{item.likes}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.interactionButton}>
          <Text style={styles.interactionIcon}>💬</Text>
          <Text style={styles.interactionText}>{item.replies}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.replyButton}>
          <Text style={styles.replyButtonText}>Reply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Discussion</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.discussionCard}>
          <View style={styles.discussionHeader}>
            <View style={styles.authorInfo}>
              <Image source={discussion.author.avatar} style={styles.authorAvatar} />
              <View>
                <Text style={styles.authorName}>{discussion.author.name}</Text>
                <Text style={styles.authorRole}>{discussion.author.role}</Text>
              </View>
            </View>
            <Text style={styles.timeAgo}>{discussion.timeAgo}</Text>
          </View>

          <Text style={styles.discussionTitle}>{discussion.title}</Text>
          <Text style={styles.discussionContent}>{discussion.content}</Text>

          <View style={styles.tagsContainer}>
            {discussion.tags.map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>#{tag}</Text>
              </View>
            ))}
          </View>

          <View style={styles.discussionFooter}>
            <TouchableOpacity 
              style={styles.interactionButton}
              onPress={() => setIsLiked(!isLiked)}
            >
              <Text style={[styles.interactionIcon, isLiked && styles.likedIcon]}>
                {isLiked ? '❤️' : '🤍'}
              </Text>
              <Text style={styles.interactionText}>{discussion.likes}</Text>
            </TouchableOpacity>
            <View style={styles.interactionButton}>
              <Text style={styles.interactionIcon}>💬</Text>
              <Text style={styles.interactionText}>{discussion.comments}</Text>
            </View>
          </View>
        </View>

        <View style={styles.commentsSection}>
          <Text style={styles.commentsTitle}>Comments</Text>
          <FlatList
            data={comments}
            renderItem={renderCommentItem}
            keyExtractor={item => item.id}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a comment..."
          value={comment}
          onChangeText={setComment}
          multiline
        />
        <TouchableOpacity 
          style={[styles.sendButton, !comment.trim() && styles.sendButtonDisabled]}
          disabled={!comment.trim()}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
  discussionCard: {
    backgroundColor: colors.white,
    padding: 16,
    margin: 16,
    borderRadius: 12,
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
    fontSize: 24,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  discussionContent: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
    marginBottom: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
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
  likedIcon: {
    color: colors.coral,
  },
  interactionText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  commentsSection: {
    padding: 16,
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  commentCard: {
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
  commentContent: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginVertical: 12,
  },
  commentFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  replyButton: {
    marginLeft: 'auto',
  },
  replyButtonText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  input: {
    flex: 1,
    backgroundColor: colors.background,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: colors.textLight,
  },
  sendButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default DiscussionDetailScreen; 