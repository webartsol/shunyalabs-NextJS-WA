import React from 'react';
import { languages } from '../lib/languages';

interface LanguageSelectorProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
  disabled?: boolean;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  onLanguageChange,
  disabled = false,
}) => {
  return (
    <select
      value={selectedLanguage}
      onChange={(e) => onLanguageChange(e.target.value)}
      disabled={disabled}
      className={`
        w-full px-4 py-3 rounded-lg
        bg-black/50 border border-white/20
        text-white placeholder-gray-400
        focus:outline-none focus:border-white/40
        transition-all duration-200
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-white/30'}
        backdrop-blur-md
      `}
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code} className="bg-[#0B0B0F]">
          {lang.name} {lang.native && `(${lang.native})`}
        </option>
      ))}
    </select>
  );
};
