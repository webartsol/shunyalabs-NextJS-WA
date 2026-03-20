// Import the CSV data instead of markdown
import csvData from '../../../data/languages/languages.csv';
import STTMedLangData from '../../../data/languages/Zero STT Med Languages - Sheet1.csv';
import { Globe, Heart, Sparkles, Users, Map, Compass, Building } from 'lucide-react';
import { languageToFlag } from "./languageToFlagMap";


export type LanguageStatus = 'available' | 'coming-soon';

export interface LanguageMeta {
  code: string; // ISO code like en, en-GB, hi, etc.
  name: string; // English name (with any variant)
  native: string; // Native script/name
  speakers: string; // Human-readable speaker count – e.g. 15M
  script: string; // Script family e.g. Latin, Devanagari
  status: LanguageStatus;
  sampleText: string;
  region: string; // Region heading the language belongs to
  // Optional UI helpers added later when merging CSV with flag mapping
  flag?: string; // path or emoji for flag
  flagCode?: string; // short emoji string for quick display
}

export interface Region {
  name: string;
  description: string;
  languages: LanguageMeta[];
  count: number; // number of languages in the region (derived)
}

/**
 * Parse the CSV file from docs/api into structured data that can
 * be consumed by UI components. The CSV file is imported as a raw string
 * via Vite (`?raw`).
 */
function parseLanguageCSV(csvContent: string): Region[] {
  const cleanedCSV = csvContent.replace(/^\uFEFF/, '').trim();
  const lines = cleanedCSV.split(/\r?\n/).filter(l => l.trim() && !/^,+$/.test(l));

  if (lines.length < 2) return [];

  const regions: Region[] = [];
  const regionMap: Record<string, Region> = {};

  const regionDescriptions: Record<string, string> = {
    Indic: 'Complete coverage of the Indian subcontinent',
    Asian: 'Comprehensive East & Southeast Asian coverage',
    European: 'From major languages to regional dialects',
    African: "Celebrating the continent's rich linguistic heritage",
    'Middle Eastern': 'Bridge between continents and cultures',
    'North American': 'Languages of North America including indigenous varieties',
    'South American': 'Languages of South America including indigenous varieties',
  };

  // ✅ CSV-safe split (handles commas inside quotes)
  const parseCSVLine = (line: string): string[] => {
    const regex = /(".*?"|[^",]+)(?=\s*,|\s*$)/g;
    const matches = line.match(regex);
    if (!matches) return [];
    return matches.map(v => v.replace(/^"|"$/g, '').trim());
  };

  // ✅ Extract header names dynamically
  const header = parseCSVLine(lines[0]).map(h => h.toLowerCase());
  const getIndex = (keyVariants: string[]): number => {
    return header.findIndex(h => keyVariants.some(k => h.includes(k)));
  };

  // ✅ Column index mapping
  const idxRegion = getIndex(['region']);
  const idxNativeName = getIndex(['native']);
  const idxEnglishName = getIndex(['[en]', 'english']);
  const idxCode = getIndex(['code']);
  const idxSpeakers = getIndex(['speaker', 'speal']);
  const idxStatus = getIndex(['status']);
  const idxScript = getIndex(['script']);

  // ✅ Parse data rows
  for (let i = 1; i < lines.length; i++) {
    const parts = parseCSVLine(lines[i]);
    if (parts.length < 3) continue;

    const region = parts[idxRegion] || '';
    const englishName = parts[idxEnglishName] || '';
    const nativeName = parts[idxNativeName] || '';
    const code = parts[idxCode] || '';
    const speakers = parts[idxSpeakers] || '';
    const status = parts[idxStatus] || '';
    const script = parts[idxScript] || '';

    if (!region || !englishName || !code) continue;

    const languageStatus: LanguageStatus = status.toLowerCase().includes('available')
      ? 'available'
      : 'coming-soon';

    // ✅ Create region entry if missing
    if (!regionMap[region]) {
      regionMap[region] = {
        name: region,
        description: regionDescriptions[region] || 'Diverse linguistic coverage',
        languages: [],
        count: 0,
      };
      regions.push(regionMap[region]);
    }

    // ✅ Add language object
    regionMap[region].languages.push({
      code,
      name: englishName, // ✅ English name for display
      native: nativeName || englishName, // ✅ fallback if native missing
      speakers: speakers ? `${speakers}M` : 'N/A',
      script: script || 'Unknown',
      status: languageStatus,
      sampleText: 'Everything starts from zero',
      region,
    });
  }

  // ✅ Count total languages per region
  regions.forEach(r => (r.count = r.languages.length));

  return regions;
}

export const regions: Region[] = parseLanguageCSV(csvData);
export const STTMedregions: Region[] = parseLanguageCSV(STTMedLangData);

// Create deduplicated languages array for dropdowns to avoid React key conflicts
export const languages: LanguageMeta[] = (() => {
  const seenLanguageCodes: Set<string> = new Set();
  const deduplicatedLanguages: LanguageMeta[] = [];

  regions.forEach(region => {
    region.languages.forEach(language => {
      if (!seenLanguageCodes.has(language.code)) {
        seenLanguageCodes.add(language.code);
        deduplicatedLanguages.push(language);
      }
    });
  });
  
  return deduplicatedLanguages;
})();


export const SttMedlanguages: LanguageMeta[] = (() => {
  const seenLanguageCodes: Set<string> = new Set();
  const deduplicatedLanguages: LanguageMeta[] = [];

  STTMedregions.forEach(region => {
    region.languages.forEach(language => {
      if (!seenLanguageCodes.has(language.code)) {
        seenLanguageCodes.add(language.code);
        deduplicatedLanguages.push(language);
      }
    });
  });
  
  return deduplicatedLanguages;
})();

export const scripts: string[] = Array.from(new Set(languages.map(l => l.script)))
  .filter(script => {
    // Filter out obvious non-script values
    const validScripts = [
      'Arabic',
      'Bengali',
      'Cyrillic',
      'Devanagari',
      'Georgian',
      'Greek',
      'Gujarati',
      'Gurmukhi',
      'Hangul',
      'Hebrew',
      'Hiragana',
      'Kannada',
      'Katakana',
      'Khmer',
      'Latin',
      'Malayalam',
      'Myanmar',
      'Odia',
      'Sinhala',
      'Tamil',
      'Telugu',
      'Thai',
      'Tibetan',
    ];
    return validScripts.includes(script);
  })
  .sort();

// Helper for region styling – updated for new region names
export const regionStyles: Record<
  string,
  { gradient: string; bgGradient: string; icon: typeof Globe }
> = {
  Indic: {
    gradient: 'from-orange-400 to-red-500',
    bgGradient: 'from-orange-50 to-red-50',
    icon: Heart,
  },
  Asian: {
    gradient: 'from-green-400 to-blue-500',
    bgGradient: 'from-green-50 to-blue-50',
    icon: Sparkles,
  },
  European: {
    gradient: 'from-blue-400 to-indigo-500',
    bgGradient: 'from-blue-50 to-indigo-50',
    icon: Globe,
  },
  African: {
    gradient: 'from-yellow-400 to-orange-500',
    bgGradient: 'from-yellow-50 to-orange-50',
    icon: Users,
  },
  'Middle Eastern': {
    gradient: 'from-purple-400 to-pink-500',
    bgGradient: 'from-purple-50 to-pink-50',
    icon: Building,
  },
  'North American': {
    gradient: 'from-teal-400 to-cyan-500',
    bgGradient: 'from-teal-50 to-cyan-50',
    icon: Compass,
  },
  'South American': {
    gradient: 'from-emerald-400 to-teal-500',
    bgGradient: 'from-emerald-50 to-teal-50',
    icon: Map,
  },
  // Default fallback style
  default: {
    gradient: 'from-gray-400 to-gray-600',
    bgGradient: 'from-gray-50 to-gray-100',
    icon: Globe,
  },
};
export const mergedLanguages = languages.map(lang => {
  // Flag code nikale
  const flagCode = languageToFlag[lang.code];
  // console.log("Lang code",lang.code);
  // console.log("FLAG CODE code",flagCode);
  
  const flagPath = flagCode?.code
    ? `/data/flags/4x3/${flagCode?.code}.svg`
    : `/data/flags/4x3/un.svg`; // fallback globe/un flag

  return {
    ...lang,
    flag: flagPath,
    flagCode:flagCode?.emoji
  };
});

// ✅ Region-wise merged languages (with flags and region details)
export const mergedRegions: Region[] = regions.map(region => {
  return {
    ...region,
    languages: region.languages.map(lang => {
      const flagCode = languageToFlag[lang.code];
      const flagPath = flagCode?.code
        ? `/data/flags/4x3/${flagCode.code}.svg`
        : `/data/flags/4x3/un.svg`; // fallback

      return {
        ...lang,
        flag: flagPath,
        flagCode: flagCode?.emoji || "🌐",
      };
    }),
  };
});

export const STTMedMergedRegions: Region[] = STTMedregions.map(region => {
  return {
    ...region,
    languages: region.languages.map(lang => {
      const flagCode = languageToFlag[lang.code];
      const flagPath = flagCode?.code
        ? `/data/flags/4x3/${flagCode.code}.svg`
        : `/data/flags/4x3/un.svg`; // fallback

      return {
        ...lang,
        flag: flagPath,
        flagCode: flagCode?.emoji || "🌐",
      };
    }),
  };
});
