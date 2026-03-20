import React, { useRef } from 'react';
import {
  LiveTranscriptionWidget,
  LiveTranscriptionWidgetRef,
} from '../components/LiveTranscriptionWidget';

export const LiveTranscriptionPage: React.FC = () => {
  const liveTranscriptionRef = useRef<LiveTranscriptionWidgetRef>(null);

  const handleTranscriptionComplete = () => {
    console.log('Live transcription completed');
  };

  // Simple UI text
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Widget Container */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-200/30 shadow-xl p-6 sm:p-8">
          <LiveTranscriptionWidget
            ref={liveTranscriptionRef}
            selectedLanguage="en"
            onTranscriptionComplete={handleTranscriptionComplete}
            uiText={uiText}
          />
        </div>
      </div>
    </div>
  );
};
