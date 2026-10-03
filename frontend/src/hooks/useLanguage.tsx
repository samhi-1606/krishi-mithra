import React, { createContext, useContext, useState, useMemo } from 'react';
import { getTranslation } from '../i18n';
import type { TranslationStrings } from '../i18n/types';

// Create a translation accessor that works as both:
// - t.home (object property access)
// - t('Home') (function call - returns the argument as fallback)
type TranslationAccessor = TranslationStrings & ((key: string, fallback?: string) => string);

function createTranslationAccessor(translations: TranslationStrings): TranslationAccessor {
  const fn = (key: string, fallback?: string): string => {
    // Try to find the key in translations (camelCase match)
    const camelKey = key
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .split(' ')
      .map((w, i) => i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join('');
    
    const val = translations[camelKey as keyof TranslationStrings];
    if (typeof val === 'string') return val;
    
    // Return fallback or the key itself
    return fallback || key;
  };

  // Copy all translation properties onto the function
  Object.assign(fn, translations);

  return fn as TranslationAccessor;
}

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  t: TranslationAccessor;
};

const defaultTranslation = createTranslationAccessor(getTranslation('en'));

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: defaultTranslation,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLangState] = useState<string>(() => {
    try {
      return localStorage.getItem('krishi_language') || 'en';
    } catch {
      return 'en';
    }
  });

  const setLanguage = (lang: string) => {
    setLangState(lang);
    try {
      localStorage.setItem('krishi_language', lang);
    } catch {
      // localStorage might not be available
    }
  };

  const t = useMemo(() => createTranslationAccessor(getTranslation(language)), [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
