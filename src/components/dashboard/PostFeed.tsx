/**
 * Post Feed Component
 * 
 * Core component for displaying and managing posts. Features:
 * - Real-time post updates
 * - Post creation
 * - Like/Unlike functionality
 * - Comments system
 * - Optimistic updates
 * 
 * @note Uses Firebase for data and Socket.io for real-time
 */

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from '@/store/useAuthStore';
import Image from 'next/image';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Post, createPost, subscribeToPosts, likePost, unlikePost, addComment } from '@/lib/firebase';
import { formatDistanceToNow } from 'date-fns';
import { Timestamp } from 'firebase/firestore';

// Helper function to safely format timestamp
const formatTimestamp = (timestamp: Timestamp | null) => {
  if (!timestamp) return 'Just now';
  try {
    return formatDistanceToNow(timestamp.toDate(), { addSuffix: true });
  } catch {
    return 'Just now';
  }
};

export default function PostFeed() {
  const user = useAuthStore((state) => state.user);
  const [isCreating, setIsCreating] = useState(false);
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [commentText, setCommentText] = useState('');
  const [activeComment, setActiveComment] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToPosts(setPosts);
    return () => unsubscribe();
  }, []);

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim() || !user) return;

    setLoading(true);
    try {
      await createPost(newPost, user);
      setNewPost('');
      setIsCreating(false);
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async (postId: string) => {
    if (!user) return;
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    try {
      if (post.likes.includes(user.uid)) {
        await unlikePost(postId, user.uid);
      } else {
        await likePost(postId, user.uid);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleComment = async (postId: string) => {
    if (!user || !commentText.trim()) return;

    try {
      await addComment(postId, commentText, user);
      setCommentText('');
      setActiveComment(null);
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Create Post Form */}
      <div className="bg-black/30 backdrop-blur-md rounded-2xl border border-border p-4">
        {!isCreating ? (
          <button
            onClick={() => setIsCreating(true)}
            className="w-full text-left p-3 rounded-lg hover:bg-primary/10 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Image
                src={user?.photoURL || '/images/default_pfp.jpg'}
                alt="Your avatar"
                width={40}
                height={40}
                className="rounded-full"
              />
              <span className="text-muted-foreground">
                What&apos;s on your mind?
              </span>
            </div>
          </button>
        ) : (
          <AnimatePresence>
            <motion.form
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onSubmit={handleCreatePost}
              className="space-y-4"
            >
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Share your thoughts..."
                className="w-full p-3 bg-background rounded-lg resize-none min-h-[100px]"
                disabled={loading}
              />

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="btn-secondary"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  disabled={loading || !newPost.trim()}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <LoadingSpinner />
                      <span>Posting...</span>
                    </div>
                  ) : (
                    'Post'
                  )}
                </button>
              </div>
            </motion.form>
          </AnimatePresence>
        )}
      </div>

      {/* Posts Feed */}
      <div className="space-y-4">
        {posts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black/30 backdrop-blur-md rounded-2xl border border-border p-6"
          >
            {/* Author Info */}
            <div className="flex items-center gap-3 mb-4">
              <Image
                src={post.authorImage || '/images/default_pfp.jpg'}
                alt={post.authorName}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <p className="font-medium">{post.authorName}</p>
                <p className="text-sm text-muted-foreground">
                  {formatTimestamp(post.createdAt)}
                </p>
              </div>
            </div>

            {/* Post Content */}
            <p className="mb-4">{post.content}</p>
            

            {/* Post Actions */}
            <div className="flex items-center gap-6 text-muted-foreground">
              <button 
                onClick={() => handleLike(post.id)}
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <span>{post.likes.includes(user?.uid || '') ? '❤️' : '🤍'}</span>
                <span>{post.likes.length}</span>
              </button>
              <button 
                onClick={() => setActiveComment(activeComment === post.id ? null : post.id)}
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <span>💬</span>
                <span>{post.comments.length}</span>
              </button>
            </div>

            {/* Comments Section */}
            {activeComment === post.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-border"
              >
                <div className="space-y-4">
                  {post.comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <div className="flex-shrink-0 w-8 h-8">
                        <Image
                          src={comment.authorImage || '/images/default_pfp.jpg'}
                          alt={comment.authorName}
                          width={32}
                          height={32}
                          className="rounded-full object-cover w-full h-full"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{comment.authorName}</p>
                        <p className="text-sm">{comment.content}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatTimestamp(comment.createdAt)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 flex gap-2">
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Write a comment..."
                    className="flex-1 input"
                  />
                  <button
                    onClick={() => handleComment(post.id)}
                    disabled={!commentText.trim()}
                    className="btn-primary"
                  >
                    Send
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
} 