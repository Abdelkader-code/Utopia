import React from 'react';
import { languages } from '../data/languages';
import { useLanguage } from '../contexts/LanguageContext';
import { Language } from '../types';

interface LanguageSelectorProps {
  onSelect?: (language: Language) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  onSelect, 
  className = '',
  size = 'md'
}) => {
  const { currentLanguage, setLanguage, t } = useLanguage();

  const handleLanguageSelect = (language: Language) => {
    setLanguage(language);
    if (onSelect) {
      onSelect(language);
    }
  };

  const sizeClasses = {
    sm: 'text-sm p-2',
    md: 'text-base p-3',
    lg: 'text-lg p-4'
  };

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      <h2 className="text-center font-semibold mb-4 text-gray-800 dark:text-gray-200">
        {t('selectLanguage')}
      </h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageSelect(lang.code)}
            className={`
              flex items-center justify-center space-x-2 rounded-lg 
              transition-all duration-300 ease-in-out
              ${sizeClasses[size]}
              ${currentLanguage === lang.code 
                ? 'bg-indigo-600 text-white shadow-md transform scale-105' 
                : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700'}
              border-2 ${currentLanguage === lang.code 
                ? 'border-indigo-400' 
                : 'border-gray-200 dark:border-gray-700'}
            `}
          >
            <span className="text-xl">{lang.flag}</span>
            <span className="font-medium">{lang.nativeName}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;