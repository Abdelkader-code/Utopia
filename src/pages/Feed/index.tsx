import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';
import Layout from '../../components/Layout';
import { Post as PostType } from '../../types';
import PostItem from './components/PostItem';
import CreatePostBox from './components/CreatePostBox';

// Mock data for posts
const mockPosts: PostType[] = [
  {
    id: 'post-1',
    userId: 'user-1',
    content: 'Just joined Utopia! Excited to connect with everyone in this new social space. 🚀',
    likes: 24,
    comments: 5,
    createdAt: new Date(Date.now() - 3600000), // 1 hour ago
    isLiked: false
  },
  {
    id: 'post-2',
    userId: 'user-2',
    content: 'Exploring the beautiful streets of Paris today. The architecture is breathtaking! 🗼',
    images: ['https://images.pexels.com/photos/532826/pexels-photo-532826.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
    likes: 156,
    comments: 42,
    createdAt: new Date(Date.now() - 7200000), // 2 hours ago
    isLiked: true
  },
  {
    id: 'post-3',
    userId: 'user-3',
    content: 'Just finished reading an amazing book about sustainable living. Would highly recommend! 📚 #sustainability #reading',
    likes: 89,
    comments: 15,
    createdAt: new Date(Date.now() - 86400000), // 1 day ago
    isLiked: false
  },
  {
    id: 'post-4',
    userId: 'user-4',
    content: 'Working on a new project that combines AI and renewable energy. So excited about the possibilities! 💡',
    likes: 201,
    comments: 35,
    createdAt: new Date(Date.now() - 172800000), // 2 days ago
    isLiked: false
  },
  {
    id: 'post-5',
    userId: 'user-5',
    content: 'Beautiful sunset at the beach today. Nature never fails to amaze me. ✨',
    images: ['https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'],
    likes: 312,
    comments: 28,
    createdAt: new Date(Date.now() - 259200000), // 3 days ago
    isLiked: true
  }
];

const Feed: React.FC = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading posts
    const timer = setTimeout(() => {
      setPosts(mockPosts);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleCreatePost = (content: string) => {
    if (!user || !content.trim()) return;

    const newPost: PostType = {
      id: `post-${Date.now()}`,
      userId: user.id,
      content: content.trim(),
      likes: 0,
      comments: 0,
      createdAt: new Date(),
      isLiked: false
    };

    setPosts([newPost, ...posts]);
  };

  const handleLikePost = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const isLiked = !post.isLiked;
        return {
          ...post,
          likes: isLiked ? post.likes + 1 : post.likes - 1,
          isLiked
        };
      }
      return post;
    }));
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto w-full px-4">
        <CreatePostBox onCreatePost={handleCreatePost} />
        
        <div className="space-y-4 mt-6">
          {isLoading ? (
            <div className="flex flex-col space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow animate-pulse">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/6"></div>
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            posts.length > 0 ? (
              posts.map(post => (
                <PostItem 
                  key={post.id} 
                  post={post} 
                  onLike={handleLikePost} 
                />
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 dark:text-gray-400">No posts yet. Be the first to share something!</p>
              </div>
            )
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Feed;