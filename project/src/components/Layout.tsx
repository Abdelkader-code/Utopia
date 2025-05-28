import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import Avatar from './Avatar';
import ThemeToggle from './ThemeToggle';
import { Home, User, MessageSquare, Bell, Settings, LogOut } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { t } = useLanguage();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/feed', icon: <Home size={24} />, label: t('feed') },
    { path: '/profile', icon: <User size={24} />, label: t('profile') },
    { path: '/messages', icon: <MessageSquare size={24} />, label: t('messages') },
    { path: '/notifications', icon: <Bell size={24} />, label: t('notifications') },
    { path: '/settings', icon: <Settings size={24} />, label: t('settings') },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col transition-colors duration-300">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">Utopia</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              
              <div className="relative group">
                <div className="flex items-center">
                  <Avatar 
                    src={user?.avatar} 
                    alt={user?.displayName} 
                    size="sm" 
                    className="cursor-pointer"
                  />
                </div>
                
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden origin-top-right scale-0 group-hover:scale-100 transition-transform duration-200 z-50">
                  <div className="py-2">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.displayName}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">@{user?.username}</p>
                    </div>
                    
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
                    >
                      <LogOut size={16} className="mr-2 text-gray-500 dark:text-gray-400" />
                      {t('logout')}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </div>
      </main>

      {/* Mobile bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-md md:hidden">
        <div className="flex justify-around">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center py-3 px-4 transition-colors duration-200 ${
                isActive(item.path)
                  ? 'text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400'
              }`}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Desktop sidebar navigation */}
      <nav className="hidden md:block fixed left-0 top-16 bottom-0 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
        <div className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-colors duration-200 ${
                isActive(item.path)
                  ? 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Layout;