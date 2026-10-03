import { TranslationStrings } from './types';
import en from './en';
import hi from './hi';
import te from './te';
import bn from './bn';
import mr from './mr';
import ta from './ta';
import gu from './gu';
import ur from './ur';
import kn from './kn';
import or from './or';
import ml from './ml';
import pa from './pa';
import asLang from './as';

export const supportedLanguages = [
  { code: 'en', name: 'English', nativeName: 'English', script: 'Latin' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', script: 'Devanagari' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', script: 'Telugu' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', script: 'Bengali' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', script: 'Devanagari' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', script: 'Tamil' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', script: 'Gujarati' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', script: 'Arabic' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', script: 'Kannada' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', script: 'Odia' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', script: 'Malayalam' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', script: 'Gurmukhi' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', script: 'Bengali' },
];

const translations: Record<string, TranslationStrings> = {
  en, hi, te, bn, mr, ta, gu, ur, kn, or, ml, pa, as: asLang
};

// Untranslated keys are still shipped as "[XX] keyName" markers. Showing those raw
// would leak debug text into the UI, so they fall back to the English string.
const PLACEHOLDER = /^\[[A-Z]{2}\]\s/;

const withEnglishFallback = (strings: TranslationStrings): TranslationStrings => {
  const merged = { ...en } as Record<string, string>;
  for (const [key, value] of Object.entries(strings)) {
    if (typeof value === 'string' && value && !PLACEHOLDER.test(value)) {
      merged[key] = value;
    }
  }
  return merged as unknown as TranslationStrings;
};

const resolved: Record<string, TranslationStrings> = Object.fromEntries(
  Object.entries(translations).map(([code, strings]) => [code, withEnglishFallback(strings)])
);

export const getTranslation = (lang: string): TranslationStrings => {
  return resolved[lang] || resolved['en'];
};

export const languages = supportedLanguages;

export { en, hi, te, bn, mr, ta, gu, ur, kn, or, ml, pa, asLang as as };
