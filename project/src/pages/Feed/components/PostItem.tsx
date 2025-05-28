import React, { useState } from 'react';
import { formatDistanceToNow } from '../../utils/dateUtils';
import { Post } from '../../../types';
import Avatar from '../../../components/Avatar';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { useLanguage } from '../../../contexts/LanguageContext';

interface PostItemProps {
  post: Post;
  onLike: (postId: string) => void;
}

// Mock user data for posts
const mockUsers = {
  'user-1': {
    username: 'johndoe',
    displayName: 'John Doe',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  'user-2': {
    username: 'sarahsmith',
    displayName: 'Sarah Smith',
    avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  'user-3': {
    username: 'miketan',
    displayName: 'Mike Tan',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  'user-4': {
    username: 'emilyjohnson',
    displayName: 'Emily Johnson',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  'user-5': {
    username: 'davidwilson',
    displayName: 'David Wilson',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
};

const PostItem: React.FC<PostItemProps> = ({ post, onLike }) => {
  const { t } = useLanguage();
  const [isLikeAnimating, setIsLikeAnimating] = useState(false);
  
  const user = mockUsers[post.userId as keyof typeof mockUsers];
  
  const handleLike = () => {
    setIsLikeAnimating(true);
    onLike(post.id);
    setTimeout(() => setIsLikeAnimating(false), 500);
  };

  // Process content for hashtags and mentions
  const processContent = (content: string) => {
    return content
      .replace(/(#\w+)/g, '<span class="text-indigo-600 dark:text-indigo-400 font-medium">$1</span>')
      .replace(/(@\w+)/g, '<span class="text-teal-600 dark:text-teal-400 font-medium">$1</span>');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-200 hover:shadow-md">
      <div className="p-4">
        <div className="flex items-start">
          <Avatar src={user?.avatar} alt={user?.displayName} size="md" />
          <div className="ml-3 flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {user?.displayName}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  @{user?.username} · {formatDistanceToNow(post.createdAt)}
                </p>
              </div>
            </div>
            
            <div className="mt-2">
              <p 
                className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap break-words"
                dangerouslySetInnerHTML={{ __html: processContent(post.content) }}
              />
            </div>
            
            {post.images && post.images.length > 0 && (
              <div className="mt-3 rounded-lg overflow-hidden">
                {post.images.map((img, index) => (
                  <img 
                    key={index} 
                    src={img} 
                    alt="Post attachment" 
                    className="w-full h-auto max-h-96 object-cover"
                  />
                ))}
              </div>
            )}
            
            <div className="mt-3 flex items-center justify-between text-gray-500 dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-700">
              <button 
                className={`flex items-center space-x-1 transition-colors duration-200 rounded-md px-2 py-1 ${
                  post.isLiked 
                    ? 'text-rose-600 dark:text-rose-400' 
                    : 'hover:text-rose-600 dark:hover:text-rose-400'
                }`}
                onClick={handleLike}
              >
                <Heart 
                  size={18} 
                  className={`${post.isLiked ? 'fill-current' : ''} ${
                    isLikeAnimating ? 'animate-ping-once' : ''
                  }`} 
                />
                <span className="text-sm">{post.likes}</span>
              </button>
              
              <button className="flex items-center space-x-1 transition-colors duration-200 rounded-md px-2 py-1 hover:text-indigo-600 dark:hover:text-indigo-400">
                <MessageCircle size={18} />
                <span className="text-sm">{post.comments}</span>
              </button>
              
              <button className="flex items-center space-x-1 transition-colors duration-200 rounded-md px-2 py-1 hover:text-teal-600 dark:hover:text-teal-400">
                <Share2 size={18} />
                <span className="text-sm">{t('share')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;