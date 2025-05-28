import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';
import { translations } from '../data/translations';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations.en) => string;
}

const defaultLanguage: Language = 'en';

const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: defaultLanguage,
  setLanguage: () => {},
  t: (key) => key,
});

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('utopia-language');
    return (savedLanguage as Language) || defaultLanguage;
  });

  useEffect(() => {
    localStorage.setItem('utopia-language', currentLanguage);
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
  };

  const t = (key: keyof typeof translations.en): string => {
    return translations[currentLanguage][key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};