import React, { useState } from 'react';
import { useLanguage } from '../../../contexts/LanguageContext';
import { useAuth } from '../../../contexts/AuthContext';
import Avatar from '../../../components/Avatar';
import Button from '../../../components/Button';
import { Image, Smile, MapPin, Send } from 'lucide-react';

interface CreatePostBoxProps {
  onCreatePost: (content: string) => void;
}

const CreatePostBox: React.FC<CreatePostBoxProps> = ({ onCreatePost }) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFocus = () => {
    setIsExpanded(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onCreatePost(content);
      setContent('');
      setIsExpanded(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 border border-gray-200 dark:border-gray-700 transition-all duration-300">
      <form onSubmit={handleSubmit}>
        <div className="flex items-start">
          <Avatar 
            src={user?.avatar} 
            alt={user?.displayName} 
            size="md" 
          />
          <div className="ml-3 flex-1">
            <textarea
              placeholder={`${t('createPost')}...`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onFocus={handleFocus}
              className="w-full bg-gray-100 dark:bg-gray-700 rounded-lg px-4 py-2 text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none transition-all duration-200"
              rows={isExpanded ? 4 : 2}
            />
            
            {isExpanded && (
              <div className="mt-3 flex items-center justify-between">
                <div className="flex space-x-2">
                  <button
                    type="button"
                    className="p-2 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <Image size={18} />
                  </button>
                  <button
                    type="button"
                    className="p-2 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <Smile size={18} />
                  </button>
                  <button
                    type="button"
                    className="p-2 text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <MapPin size={18} />
                  </button>
                </div>
                
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={!content.trim()}
                  icon={<Send size={16} />}
                >
                  {t('createPost')}
                </Button>
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePostBox;