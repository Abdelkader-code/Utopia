import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import LanguageSelector from '../components/LanguageSelector';
import Button from '../components/Button';
import { Globe, ArrowRight } from 'lucide-react';
import { Language } from '../types';

const Welcome: React.FC = () => {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    if (isAuthenticated) {
      navigate('/feed');
    }
    
    // Add animation delay
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [isAuthenticated, navigate]);
  
  const handleContinue = () => {
    navigate('/auth/login');
  };

  const handleLanguageSelect = (language: Language) => {
    // Just updating the language context is enough
    // The language selector component handles this
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800 flex flex-col justify-center items-center px-4 transition-colors duration-500">
      <div 
        className={`
          max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-xl 
          overflow-hidden transition-all duration-700 transform
          ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          border border-gray-100 dark:border-gray-700
        `}
      >
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <div className="bg-indigo-600 text-white p-4 rounded-full">
              <Globe size={32} />
            </div>
          </div>
          
          <h1 
            className={`
              text-3xl font-bold text-center mb-2 text-gray-800 dark:text-white
              transition-all duration-700 delay-100
              ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
          >
            {t('welcome')}
          </h1>
          
          <p 
            className={`
              text-gray-600 dark:text-gray-300 text-center mb-8
              transition-all duration-700 delay-200
              ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
          >
            Connect with the world in your language
          </p>

          <div 
            className={`
              transition-all duration-700 delay-300
              ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
          >
            <LanguageSelector onSelect={handleLanguageSelect} size="md" />
          </div>

          <div 
            className={`
              mt-8 
              transition-all duration-700 delay-400
              ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
          >
            <Button 
              variant="primary" 
              size="lg" 
              fullWidth 
              onClick={handleContinue}
              icon={<ArrowRight size={18} />}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;