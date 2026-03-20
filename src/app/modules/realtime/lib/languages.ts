export interface LanguageMeta {
  code: string;
  name: string;
  native?: string;
  script: string;
}

export interface Script {
  code: string;
  name: string;
}

// Available languages
export const languages: LanguageMeta[] = [
  // English variants
  { code: 'en', name: 'English', native: 'English', script: 'Latin' },
  // { code: 'en-GB', name: 'English (UK)', native: 'English (UK)', script: 'Latin' },
  // { code: 'en-US', name: 'English (US)', native: 'English (US)', script: 'Latin' },
  // { code: 'en-IN', name: 'English (India)', native: 'English (India)', script: 'Latin' },
  
  // Indic languages
  // { code: 'hi', name: 'Hindi', native: 'हिन्दी', script: 'Devanagari' },
  // { code: 'bn', name: 'Bengali', native: 'বাংলা', script: 'Bengali' },
  // { code: 'ta', name: 'Tamil', native: 'தமிழ்', script: 'Tamil' },
  // { code: 'te', name: 'Telugu', native: 'తెలుగు', script: 'Telugu' },
  // { code: 'mr', name: 'Marathi', native: 'मराठी', script: 'Devanagari' },
  // { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી', script: 'Gujarati' },
  // { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', script: 'Kannada' },
  // { code: 'ml', name: 'Malayalam', native: 'മലയാളം', script: 'Malayalam' },
  // { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', script: 'Gurmukhi' },
  // { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ', script: 'Odia' },
  // { code: 'as', name: 'Assamese', native: 'অসমীয়া', script: 'Bengali' },
  // { code: 'ur', name: 'Urdu', native: 'اردو', script: 'Arabic' },
  // { code: 'ne', name: 'Nepali', native: 'नेपाली', script: 'Devanagari' },
  
  // European languages
  // { code: 'es', name: 'Spanish', native: 'Español', script: 'Latin' },
  // { code: 'fr', name: 'French', native: 'Français', script: 'Latin' },
  // { code: 'de', name: 'German', native: 'Deutsch', script: 'Latin' },
  // { code: 'it', name: 'Italian', native: 'Italiano', script: 'Latin' },
  // { code: 'pt', name: 'Portuguese', native: 'Português', script: 'Latin' },
  // { code: 'ru', name: 'Russian', native: 'Русский', script: 'Cyrillic' },
  // { code: 'pl', name: 'Polish', native: 'Polski', script: 'Latin' },
  // { code: 'nl', name: 'Dutch', native: 'Nederlands', script: 'Latin' },
  
  // Asian languages
  // { code: 'zh', name: 'Chinese', native: '中文', script: 'Chinese' },
  // { code: 'ja', name: 'Japanese', native: '日本語', script: 'Japanese' },
  // { code: 'ko', name: 'Korean', native: '한국어', script: 'Korean' },
  // { code: 'th', name: 'Thai', native: 'ไทย', script: 'Thai' },
  // { code: 'vi', name: 'Vietnamese', native: 'Tiếng Việt', script: 'Latin' },
  // { code: 'id', name: 'Indonesian', native: 'Bahasa Indonesia', script: 'Latin' },
  
  // Middle Eastern
  // { code: 'ar', name: 'Arabic', native: 'العربية', script: 'Arabic' },
  // { code: 'he', name: 'Hebrew', native: 'עברית', script: 'Hebrew' },
  // { code: 'fa', name: 'Persian', native: 'فارسی', script: 'Arabic' },
  // { code: 'tr', name: 'Turkish', native: 'Türkçe', script: 'Latin' },
];

// Available scripts
export const scripts: Script[] = [
  { code: 'Latin', name: 'Latin' },
  // { code: 'Devanagari', name: 'Devanagari' },
  // { code: 'Bengali', name: 'Bengali' },
  // { code: 'Tamil', name: 'Tamil' },
  // { code: 'Telugu', name: 'Telugu' },
  // { code: 'Gujarati', name: 'Gujarati' },
  // { code: 'Kannada', name: 'Kannada' },
  // { code: 'Malayalam', name: 'Malayalam' },
  // { code: 'Gurmukhi', name: 'Gurmukhi' },
  // { code: 'Odia', name: 'Odia' },
  // { code: 'Arabic', name: 'Arabic' },
  // { code: 'Cyrillic', name: 'Cyrillic' },
  // { code: 'Chinese', name: 'Chinese' },
  // { code: 'Japanese', name: 'Japanese' },
  // { code: 'Korean', name: 'Korean' },
  // { code: 'Thai', name: 'Thai' },
  // { code: 'Hebrew', name: 'Hebrew' },
];
