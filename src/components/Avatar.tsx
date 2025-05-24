import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'User avatar',
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    xs: 'w-6 h-6',
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  const textSizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  };

  return (
    <div
      className={`
        ${sizeClasses[size]}
        ${className}
        rounded-full overflow-hidden flex items-center justify-center
        bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300
        border-2 border-white dark:border-gray-800
      `}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/150?text=User';
          }}
        />
      ) : (
        <span className={`font-medium ${textSizeClasses[size]}`}>
          {alt ? getInitials(alt) : 'U'}
        </span>
      )}
    </div>
  );
};

export default Avatar;