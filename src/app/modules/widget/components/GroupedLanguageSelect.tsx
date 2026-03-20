"use client";
import React, { useState, useRef, useEffect } from "react";
import { getLanguagesWithRegion, getSTTMedLanguagesWithRegion, getLanguageNameByCode, getDirectLanguages } from "../config/language-mapping";

interface GroupedLanguageSelectProps {
  value?: string;
  onChange: (code: string) => void;
  label?: string;
  showFlags?: boolean;
  className?: string;
  flag?: any;
  flagCode?: any;
  selectedHeaderTab?: string;
}

export const GroupedLanguageSelect: React.FC<GroupedLanguageSelectProps> = ({
  value = "",
  onChange,
  label = "Select Language",
  showFlags = true,
  className = "",
  flagCode = "",
  selectedHeaderTab,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const TTS_LANGUAGE_LIST = [
    { code: "as", name: "Assamese", flagCode: "🇮🇳" },
    { code: "bn", name: "Bengali", flagCode: "🇮🇳" },
    { code: "brx", name: "Bodo", flagCode: "🇮🇳" },
    { code: "doi", name: "Dogri", flagCode: "🇮🇳" },
    { code: "en", name: "English", flagCode: "🇺🇸" },
    { code: "gu", name: "Gujarati", flagCode: "🇮🇳" },
    { code: "hi", name: "Hindi", flagCode: "🇮🇳" },
    { code: "kn", name: "Kannada", flagCode: "🇮🇳" },
    { code: "ks", name: "Kashmiri", flagCode: "🇮🇳" },
    { code: "kok", name: "Konkani", flagCode: "🇮🇳" },
    { code: "mai", name: "Maithili", flagCode: "🇮🇳" },
    { code: "ml", name: "Malayalam", flagCode: "🇮🇳" },
    { code: "mni", name: "Manipuri", flagCode: "🇮🇳" },
    { code: "mr", name: "Marathi", flagCode: "🇮🇳" },
    { code: "ne", name: "Nepali", flagCode: "🇮🇳" },
    { code: "or", name: "Odia", flagCode: "🇮🇳" },
    { code: "pa", name: "Punjabi", flagCode: "🇮🇳" },
    { code: "sa", name: "Sanskrit", flagCode: "🇮🇳" },
    { code: "sat", name: "Santali", flagCode: "🇮🇳" },
    { code: "sd", name: "Sindhi", flagCode: "🇮🇳" },
    { code: "ta", name: "Tamil", flagCode: "🇮🇳" },
    { code: "te", name: "Telugu", flagCode: "🇮🇳" },
    { code: "ur", name: "Urdu", flagCode: "🇮🇳" },
  ];

  const regions =
    selectedHeaderTab === "medical-transcription"
      ? [
        {
          region: "English",
          languages: [{ code: "en", name: "English", flagCode: "🇺🇸" }],
        },
      ]
      : selectedHeaderTab === "zero-code-switch"
        ? [
          {
            region: "Indic",
            languages: [{ code: "hi-en", name: "Hinglish", flagCode: "🇮🇳" }],
          },
        ]
        : selectedHeaderTab === "text-to-speech"
          ? [
            {
              region: "Languages",
              languages: TTS_LANGUAGE_LIST,
            },
          ]
          : [
            {
              region: "Languages",
              languages: getDirectLanguages(),
            },
          ];

  // Get all languages flattened
  const allLanguages = regions.flatMap((region) =>
    region.languages.map((lang) => ({ ...lang, region: region.region }))
  );

  // Find selected language
  const selectedLanguage = allLanguages.find((lang) => lang.code === value);

  // Most used languages
  const mostUsed =
    selectedHeaderTab === "zero-code-switch"
      ? []
      : allLanguages.filter((lang) => ["en", "hi"].includes(lang.code));

  // Filter languages based on search
  const filteredRegions = regions
    .map((region) => ({
      ...region,
      languages: region.languages.filter(
        (lang) =>
          lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lang.code.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    }))
    .filter((region) => region.languages.length > 0);

  const filteredMostUsed = mostUsed.filter(
    (lang) =>
      lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lang.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const handleSelect = (code: string) => {
    onChange(code);
    setIsOpen(false);
    setSearchTerm("");
  };

  const toggleDropdown = () => {
    if (selectedHeaderTab === "zero-code-switch" || selectedHeaderTab === "medical-transcription") return;
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchTerm("");
    }
  };

  return (
    <div
      className={`w-full z-50 ${className} relative  overflow-visible`}
      ref={dropdownRef}
    >
      {label && (
        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}

      <div className="relative">
        {/* Custom Select Button */}
        <button
          id="ASR_STT_language"
          type="button"
          onClick={toggleDropdown}
          disabled={selectedHeaderTab === "zero-code-switch" || selectedHeaderTab === "medical-transcription"}
          className={`relative w-full rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-3 sm:px-6 py-2 text-left text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-600 ${selectedHeaderTab === "zero-code-switch" || selectedHeaderTab === "medical-transcription"
            ? "opacity-50 cursor-not-allowed"
            : ""
            }`}
        >
          <span className="block truncate">
            {selectedLanguage ? (
              <>
                {/* Show real flag when selected */}
                {showFlags && (
                  <span className="mr-2 text-lg">
                    {selectedLanguage.flagCode || "🌐"}
                  </span>
                )}
                {selectedLanguage.name}
              </>
            ) : (
              <>
                {/* Placeholder flag even when NOT selected */}
                {showFlags && (
                  <span className="mr-2 text-lg text-gray-400"></span>
                )}
                <span className="text-gray-500 dark:text-gray-400">
                  ---- Select ----
                </span>
              </>
            )}
          </span>

          {/* Dropdown Arrow */}
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${isOpen ? "transform rotate-180" : ""
                }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </span>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg shadow-xl max-h-60 sm:max-h-80 md:max-h-96 overflow-hidden">
            {/* Search Input */}
            <div className="sticky top-0 z-10 p-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
              <div className="relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search languages..."
                  className="w-full px-3 py-2 pl-10 text-sm border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </div>
            </div>

            {/* Options List */}
            <div className="overflow-y-auto max-h-80 custom-scrollbar relative ">
              {/* Most Used Section */}
              {filteredMostUsed.length > 0 && (
                <div className="py-1">
                  <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider bg-gray-200 dark:bg-gray-800/50">
                    Most Used ({filteredMostUsed.length})
                  </div>
                  {filteredMostUsed.map((lang) => (
                    <button
                      key={`most-used-${lang.code}`}
                      onClick={() => handleSelect(lang.code)}
                      className={`w-full px-4 py-2 text-left text-sm flex items-center gap-3 transition-colors duration-150 ${value === lang.code
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400"
                        : "text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                    >
                      {showFlags && lang.flagCode && (
                        <span className="text-xl flex-shrink-0">
                          {lang.flagCode}
                        </span>
                      )}
                      <span className="flex-1 truncate">{lang.name}</span>
                      {value === lang.code && (
                        <svg
                          className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* Regional Groups */}
              {filteredRegions.map((region) => (
                <div key={region.region} className="py-1">
                  <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider bg-gray-200 dark:bg-gray-800/50">
                    {region.region} ({region.languages.length})
                  </div>
                  {region.languages.map((lang) => (
                    <button
                      key={`${region.region}-${lang.code}`}
                      onClick={() => handleSelect(lang.code)}
                      className={`w-full px-4 py-2.5 text-left text-sm flex items-center gap-3 transition-colors duration-150 ${value === lang.code
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400"
                        : "text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                    >
                      {showFlags && lang.flagCode && (
                        <span className="text-xl flex-shrink-0">
                          {lang.flagCode}
                        </span>
                      )}
                      <span className="flex-1 truncate">{lang.name}</span>
                      {value === lang.code && (
                        <svg
                          className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              ))}

              {/* No Results */}
              {filteredMostUsed.length === 0 &&
                filteredRegions.length === 0 && (
                  <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                    <svg
                      className="w-12 h-12 mx-auto mb-3 text-gray-400 dark:text-gray-600"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="m21 21-4.35-4.35" />
                    </svg>
                    <p className="text-sm">No languages found</p>
                    <p className="text-xs mt-1">Try a different search term</p>
                  </div>
                )}
            </div>
          </div>
        )}
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 4px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4b5563;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #6b7280;
        }
      `}</style>
    </div>
  );
};
