import { useState, useEffect, useMemo } from 'react';
import widgetConfig from '../config/widget-config.json';

export interface ContentMapping {
  headerTab: string;
  innerTab: string;
  language: string;
}

export interface AudioSample {
  file: string;
  transcription: string;
  duration: number;
  title: string;
  description: string;
}

export interface InnerTabConfig {
  title: string;
  description: string;
  features: string[];
  buttonText: string;
  audioSamples?: Record<string, AudioSample>;
  id: string;
}

export interface HeaderTabConfig {
  title: string;
  description: string;
  icon: string;
  color: string;
  innerTabs: Record<string, InnerTabConfig>;
  audioSamples?: Record<string, AudioSample>;
}

export interface LanguageConfig {
  name: string;
  flag: string;
  code: string;
  rtl: boolean;
  ui: {
    buttons: Record<string, string>;
    placeholders: Record<string, string>;
    messages: Record<string, string>;
    labels: Record<string, string>;
  };
}

export interface ContentMappingResult {
  headerTabConfig: HeaderTabConfig | null;
  innerTabConfig: InnerTabConfig | null;
  languageConfig: LanguageConfig | null;
  audioSample: AudioSample | null;
  uiText: {
    buttons: Record<string, string>;
    placeholders: Record<string, string>;
    messages: Record<string, string>;
    labels: Record<string, string>;
  };
  isLoading: boolean;
  error: string | null;
}


export const useContentMapping = (mapping: ContentMapping): ContentMappingResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const result = useMemo(() => {
    try {
      setIsLoading(true);
      setError(null);

      // Get header tab configuration
        const headerTabConfig = (widgetConfig.headerTabs[mapping.headerTab as keyof typeof widgetConfig.headerTabs] ?? null) as unknown as HeaderTabConfig | null;

      if (!headerTabConfig) {
        throw new Error(`Header tab '${mapping.headerTab}' not found`);
      }

      // Get inner tab configuration
      const innerTabConfig = headerTabConfig.innerTabs[mapping.innerTab] as
        | InnerTabConfig
        | undefined;

      if (!innerTabConfig) {
        throw new Error(
          `Inner tab '${mapping.innerTab}' not found for header tab '${mapping.headerTab}'`
        );
      }

      // Get language configuration
      const languageConfig = widgetConfig.languages[
        mapping.language as keyof typeof widgetConfig.languages
      ] as LanguageConfig | undefined;

      if (!languageConfig) {
        throw new Error(`Language '${mapping.language}' not found`);
      }

      // Get audio sample for the current configuration from inner tab
      const audioSample = innerTabConfig.audioSamples?.[mapping.language] as
        | AudioSample
        | undefined;

      if (!audioSample) {
        // Audio sample not found for the current configuration
      }

      // Use simple English UI text for all languages (content display is always English)
      const uiText = {
        buttons: {
          play: 'Play',
          pause: 'Pause',
          stop: 'Stop',
          copy: 'Copy',
          download: 'Download',
          upload: 'Upload',
          startTranscription: 'Start Transcription',
          startMedicalTranscription: 'Start Medical Transcription',
          generateSpeech: 'Generate Speech',
          analyzeSentiment: 'Analyze Sentiment',
          startConversation: 'Start Conversation',
        },
        placeholders: {
          selectLanguage: 'Select Language',
          uploadFile: 'Upload audio file',
          enterText: 'Enter text here...',
          transcriptionResults: 'Transcription results will appear here...',
          medicalTranscriptionResults: 'Medical transcription results will appear here...',
        },
        messages: {
          processing: 'Processing...',
          completed: 'Transcription completed',
          error: 'An error occurred',
          success: 'Success!',
          recording: 'Recording... Click to stop',
          clickToStart: 'Click to start recording',
          processingAudio: 'Processing audio...',
          transcriptionCompleted: 'Transcription completed successfully',
        },
        labels: {
          duration: 'Duration',
          speakers: 'speakers',
          conversationTranscript: 'Conversation Transcript',
          copyConversation: 'Copy Conversation',
          copied: 'Copied!',
          uploadAudioFile: 'Upload Audio File',
          recordAudio: 'Record Audio',
          transcriptionResults: 'Transcription Results',
          medicalTranscriptionResults: 'Medical Transcription Results',
        },
      };

      setIsLoading(false);

      return {
        headerTabConfig,
        innerTabConfig,
        languageConfig,
        audioSample: audioSample || null,
        uiText,
        isLoading: false,
        error: null,
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      setIsLoading(false);

      return {
        headerTabConfig: null,
        innerTabConfig: null,
        languageConfig: null,
        audioSample: null,
        uiText: {
          buttons: {},
          placeholders: {},
          messages: {},
          labels: {},
        },
        isLoading: false,
        error: errorMessage,
      };
    }
  }, [mapping.headerTab, mapping.innerTab, mapping.language]);

  return result;
};

// Helper function to get available header tabs
export const getAvailableHeaderTabs = () => {
  return Object.keys(widgetConfig.headerTabs).map(key => ({
    key,
    ...widgetConfig.headerTabs[key as keyof typeof widgetConfig.headerTabs],
  }));
};

// Helper function to get available inner tabs for a header tab
export const getAvailableInnerTabs = (headerTab: string) => {
  const headerTabConfig = widgetConfig.headerTabs[headerTab as keyof typeof widgetConfig.headerTabs] as unknown as HeaderTabConfig | undefined;

  if (!headerTabConfig) {
    return [];
  }

  return Object.keys(headerTabConfig.innerTabs).map(key => ({
    key,
    ...headerTabConfig.innerTabs[key],
  }));
};

// Helper function to get available languages
export const getAvailableLanguages = () => {
  return Object.keys(widgetConfig.languages).map(key => ({
    key,
    ...widgetConfig.languages[key as keyof typeof widgetConfig.languages],
  }));
};

// Helper function to get audio sample for specific configuration
export const getAudioSample = (headerTab: string, language: string): AudioSample | null => {
  const headerTabConfig = widgetConfig.headerTabs[headerTab as keyof typeof widgetConfig.headerTabs] as unknown as HeaderTabConfig | undefined;

  if (!headerTabConfig) {
    return null;
  }

  return (headerTabConfig.audioSamples?.[language] as AudioSample | undefined) || null;
};

// Helper function to get UI text for specific language
export const getUIText = (language: string) => {
  const languageConfig = widgetConfig.languages[language as keyof typeof widgetConfig.languages] as
    | LanguageConfig
    | undefined;

  if (!languageConfig) {
    return {
      buttons: {},
      placeholders: {},
      messages: {},
      labels: {},
    };
  }

  return languageConfig.ui;
};

// Helper function to check if a feature is enabled
export const isFeatureEnabled = (feature: string): boolean => {
  const features = widgetConfig.features as Record<string, any>;
  return features[feature]?.enabled === true;
};

// Helper function to get feature configuration
export const getFeatureConfig = (feature: string) => {
  const features = widgetConfig.features as Record<string, any>;
  return features[feature] || null;
};

export default useContentMapping;
