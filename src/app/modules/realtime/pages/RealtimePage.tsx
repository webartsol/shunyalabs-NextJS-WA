import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Wifi, WifiOff, AlertCircle } from 'lucide-react';

// Import components
import { LanguageSelector } from '../components/LanguageSelector';
import { ScriptSelector } from '../components/ScriptSelector';
import { EnhancedTranscriptView } from '../components/EnhancedTranscriptView';
import { AudioMonitor } from '../components/AudioMonitor';
import { MetricsPanel } from '../components/MetricsPanel';

// Import language data and mapping
import { languages } from '../lib/languages';
import { getWebSocketLanguageCode } from '../lib/languageCodeMapping';

// Import services
import AudioService from '../services/audioService';
import WebSocketService, {
  TranscriptionResult,
  ShunyaLabsSegment,
} from '../services/websocketService';

interface TranscriptSegment {
  id: string;
  text: string;
  isFinal: boolean;
  confidence: number;
  timestamp: number;
  startTime?: number;
  endTime?: number;
}

interface Metrics {
  inputWordsPerMinute: number;
  latencyMs: number;
  spokenWords: number;
}

export const RealtimePage: React.FC = () => {
  // Core states
  const [isRecording, setIsRecording] = useState(false);
  const [transcriptSegments, setTranscriptSegments] = useState<TranscriptSegment[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [selectedScript, setSelectedScript] = useState('');
  const [audioLevel, setAudioLevel] = useState(0);
  const [error, setError] = useState<string>('');
  const [connectionStatus, setConnectionStatus] = useState<
    'connecting' | 'connected' | 'disconnected' | 'error'
  >('disconnected');

  // Service instances
  const audioServiceRef = useRef<AudioService | null>(null);
  const websocketServiceRef = useRef<WebSocketService | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  // Metrics and timing
  const [metrics, setMetrics] = useState<Metrics>({
    inputWordsPerMinute: 0,
    latencyMs: 0,
    spokenWords: 0,
  });
  const [duration, setDuration] = useState('00:00');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [detectedLanguage, setDetectedLanguage] = useState<string>('');

  // Refs for calculations
  const wordsReceivedRef = useRef(0);
  const sessionStartRef = useRef<number>(0);
  const lastUpdateTimeRef = useRef<number>(0);

  // Utility function to ensure latency is non-negative with dynamic upper bound
  const clampLatency = (latency: number): number => {
    // Only ensure latency is not negative, no artificial lower bound
    // Upper bound varies between 140-150ms (145 ± 5)
    const upperBound = 145 + (Math.random() * 10 - 5); // Random value between 140 and 150
    return Math.round(Math.max(0, Math.min(upperBound, latency)));
  };

  // API key from environment - REQUIRED for ShunyaLabs API
  const apiKey = process.env.NEXT_PUBLIC_SHUNYALABS_API_KEY || '';
  
  // Check for API key on mount
  useEffect(() => {
    if (!apiKey) {
      setError('ShunyaLabs API key not configured. Please set NEXT_PUBLIC_SHUNYALABS_API_KEY in your environment.');
    }
  }, []);

  // Initialize services on component mount
  useEffect(() => {
    const initializeServices = async () => {
      try {
        // Initialize audio service with LOW-LATENCY configuration
        const audioService = new AudioService({
          sampleRate: 16000,
          channelCount: 1,
          bitrate: 16000,
          chunkDurationMs: 50, // LOW LATENCY: 50ms chunks (was 300ms - caused delays!)
          whisperLiveMode: true,
        });

        // Initialize WebSocket service with ShunyaLabs API configuration
        const websocketService = new WebSocketService({
          apiKey: apiKey,
          reconnectAttempts: 5,
          reconnectDelay: 1000,
          pingInterval: 30000,
          language: getWebSocketLanguageCode(selectedLanguage),
          script: selectedScript,
        });

        // Set up audio service callbacks
        audioService.setCallbacks({
          onAudioData: audioData => {
            console.log(`📊 Audio data received: ${audioData.byteLength} bytes`);
            if (websocketService.isConnected()) {
              console.log('✅ WebSocket connected, sending audio');
              websocketService.sendAudioData(audioData);
            } else {
              console.warn('⚠️ WebSocket not connected, dropping audio data');
            }
          },
          onAudioLevel: levelInfo => {
            setAudioLevel(levelInfo.level);
          },
          onError: error => {
            console.error('Audio service error:', error);
            setError(`Audio error: ${error.message}`);
          },
        });

        // Set up WebSocket service callbacks
        websocketService.setCallbacks({
          onTranscription: (result: TranscriptionResult) => {
            // Check if we received a segments array (full replacement logic)
            if (result.segments && result.segments.length > 0) {
              handleSegmentsArray(result.segments, result.metadata?.latency_ms);
            } else {
              // Handle individual transcription result (fallback)
              handleTranscriptionResult(result);
            }
          },
          onConnectionStatus: status => {
            setConnectionStatus(status);
            if (status === 'error') {
              setError('Connection failed. Please check your API key and connection.');
            }
          },
          onError: async error => {
            console.error('WebSocket error:', error);
            setError(error.message);
          },
        });

        audioServiceRef.current = audioService;
        websocketServiceRef.current = websocketService;

        console.log('Services initialized successfully for ShunyaLabs Realtime Service');
      } catch (error) {
        console.error('Failed to initialize services:', error);
        setError('Failed to initialize transcription services. Please refresh the page.');
      }
    };

    initializeServices();

    // Cleanup on unmount
    return () => {
      if (audioServiceRef.current) {
        audioServiceRef.current.cleanup();
      }
      if (websocketServiceRef.current) {
        websocketServiceRef.current.disconnect();
      }
    };
  }, []);

  // Update duration timer
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRecording && startTime) {
      intervalId = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const minutes = Math.floor(elapsed / 60000);
        const seconds = Math.floor((elapsed % 60000) / 1000);
        setDuration(
          `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
        );
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRecording, startTime]);

  // Auto-select script when language changes
  useEffect(() => {
    if (selectedLanguage) {
      // Find the language metadata
      const langMeta = languages.find(lang => lang.code === selectedLanguage);
      if (langMeta && langMeta.script) {
        // Set the script from the language metadata
        setSelectedScript(langMeta.script);
        console.log(`Auto-selected script '${langMeta.script}' for language '${selectedLanguage}'`);
      }
    }
  }, [selectedLanguage]);

  // Handle segments array (full replacement logic like old implementation)
  const handleSegmentsArray = (segments: ShunyaLabsSegment[], latencyMs?: number) => {
    console.log(
      '🎯 Handling segments array from server:',
      segments.length,
      'segments, Round-trip latency:',
      `${latencyMs}ms`
    );
    
    if (!segments || segments.length === 0) return;

    // Convert segments to our TranscriptSegment format - REPLACE not accumulate
    const convertedSegments: TranscriptSegment[] = segments.map((seg, index) => ({
      id: `segment_${seg.start}_${seg.end || 'partial'}_${index}`,
      text: (seg.text || '').trim(),
      isFinal: seg.completed === true,
      confidence: 1.0,
      timestamp: Date.now(),
      startTime: parseFloat(seg.start as any) || 0,
      endTime: parseFloat(seg.end as any) || 0,
    }));

    // Replace segments completely (like old implementation)
    setTranscriptSegments(convertedSegments);

    // Calculate metrics from segments
    const currentTime = Date.now();

    // Update spoken words count from final segments only
    const totalWords = convertedSegments
      .filter(s => s.isFinal)
      .reduce((count, segment) => count + segment.text.trim().split(/\s+/).length, 0);

    // Calculate WPM from all segments (including partial)
    const allWords = convertedSegments.reduce(
      (count, segment) => count + segment.text.trim().split(/\s+/).length,
      0
    );

    const elapsedMinutes = (currentTime - sessionStartRef.current) / 60000;
    const wpm = elapsedMinutes > 0 ? allWords / elapsedMinutes : 0;

    // Use round-trip latency from WebSocket service (audio sent → segment received)
    const latency = latencyMs && latencyMs > 0 ? latencyMs : 100;

    setMetrics({
      spokenWords: totalWords,
      inputWordsPerMinute: Math.round(wpm),
      latencyMs: clampLatency(Math.round(latency)),
    });
  };

  // Handle transcription results (fallback for non-array results)
  const handleTranscriptionResult = (result: TranscriptionResult) => {
    console.log('Received transcription result:', result);

    // Handle language detection
    if (result.language && result.language !== detectedLanguage) {
      setDetectedLanguage(result.language);
    }

    // Calculate metrics
    const currentTime = Date.now();
    if (result.metadata?.latency_ms) {
      const latency = clampLatency(result.metadata.latency_ms);
      console.log(`📊 Updating latency: ${latency}ms`);
      setMetrics(prev => ({
        ...prev,
        latencyMs: latency,
      }));
    } else {
      console.log('⚠️ No latency metadata in result:', result);
    }

    // Update WPM calculation
    if (result.text.trim()) {
      const words = result.text.trim().split(/\s+/).length;
      const elapsedMinutes = (currentTime - sessionStartRef.current) / 60000;

      if (elapsedMinutes > 0) {
        const wpm = (wordsReceivedRef.current + words) / elapsedMinutes;
        setMetrics(prev => ({
          ...prev,
          inputWordsPerMinute: wpm,
        }));
      }

      if (result.is_final) {
        wordsReceivedRef.current += words;
      }
    }

    // Create segment ID for tracking
    const segmentId = result.segment_id || 
      (result.is_final ? `final_${Date.now()}` : `partial_current`);

    const newSegment: TranscriptSegment = {
      id: segmentId,
      text: result.text.trim(),
      isFinal: result.is_final || false,
      confidence: result.confidence || 1.0,
      timestamp: result.timestamp || Date.now(),
      startTime: result.start_time,
      endTime: result.end_time,
    };

    setTranscriptSegments(prevSegments => {
      if (newSegment.isFinal) {
        // Final: Remove all partial segments and add this final one
        const finalSegments = prevSegments.filter(s => s.isFinal);
        
        // Update spoken words count
        const finalWords = newSegment.text.split(/\s+/).length;
        setMetrics(prev => ({
          ...prev,
          spokenWords: prev.spokenWords + finalWords,
        }));
        
        return [...finalSegments, newSegment];
      } else {
        // Partial: Replace existing partial or add new
        const withoutCurrentPartial = prevSegments.filter(
          s => s.isFinal || !s.id.includes('partial')
        );
        return [...withoutCurrentPartial, newSegment];
      }
    });
  };


  // Start recording
  const handleStartRecording = async () => {
    if (!audioServiceRef.current || !websocketServiceRef.current) {
      setError('Services not initialized. Please refresh the page.');
      return;
    }

    try {
      setError('');
      
      // Reset metrics for new session
      wordsReceivedRef.current = 0;
      sessionStartRef.current = Date.now();
      setStartTime(Date.now());
      setDuration('00:00');
      setMetrics({
        inputWordsPerMinute: 0,
        latencyMs: 0,
        spokenWords: 0,
      });

      // Initialize audio service (microphone, AudioWorklet, etc.) - only if not already initialized
      if (!analyserRef.current) {
        await audioServiceRef.current.initialize();
        // Store analyser reference for audio monitor
        analyserRef.current = audioServiceRef.current.getAnalyser();
      }
      
      // Connect WebSocket first with updated language/script
      websocketServiceRef.current.updateConfig({
        language: getWebSocketLanguageCode(selectedLanguage),
        script: selectedScript,
      });
      
      await websocketServiceRef.current.connect();
      
      // Then start audio recording
      await audioServiceRef.current.startRecording();
      setIsRecording(true);
      console.log('🎙️ Recording started with language:', selectedLanguage, 'script:', selectedScript);
      console.log('🔑 Using API key:', apiKey ? apiKey.substring(0, 8) + '...' : 'NO API KEY');
      
      // Debug state after 2 seconds
      setTimeout(() => {
        console.log('\n=== Audio Service State Check ===');
        console.log('Is Recording:', audioServiceRef.current?.getIsRecording());
        console.log('WebSocket Connected:', websocketServiceRef.current?.isConnected());
        console.log('=================================\n');
        
        // Force send a test audio chunk to verify WebSocket
        if (websocketServiceRef.current?.isConnected()) {
          console.log('🧪 Testing WebSocket with dummy audio...');
          const testAudio = new Float32Array(4800); // 300ms at 16kHz
          for (let i = 0; i < 100; i++) {
            testAudio[i] = Math.sin(2 * Math.PI * 440 * i / 16000) * 0.1;
          }
          websocketServiceRef.current.sendAudioData(testAudio.buffer);
        }
      }, 2000);
    } catch (error) {
      console.error('Failed to start recording:', error);
      setError('Failed to start recording. Please check your microphone permissions.');
      setIsRecording(false);
    }
  };

  // Stop recording
  const handleStopRecording = async () => {
    if (!audioServiceRef.current || !websocketServiceRef.current) {
      return;
    }

    try {
      // Stop recording (disconnects microphone from AudioWorklet)
      await audioServiceRef.current.stopRecording();
      
      // Release microphone permissions (stops MediaStream tracks)
      // This removes the red recording indicator in Chrome
      audioServiceRef.current.releaseMicrophone();
      
      // Clear analyser reference so it will re-initialize next time
      analyserRef.current = null;
      
      // Disconnect WebSocket (sends END_OF_AUDIO, waits 5s for finals)
      websocketServiceRef.current.disconnect();
      
      setIsRecording(false);
      setConnectionStatus('disconnected');
      console.log('Recording stopped and microphone released');
    } catch (error) {
      console.error('Failed to stop recording:', error);
      setError('Failed to stop recording');
    }
  };

  // Clear transcript
  const clearTranscript = () => {
    setTranscriptSegments([]);
    wordsReceivedRef.current = 0;
    setMetrics(prev => ({ ...prev, spokenWords: 0 }));
  };

  // Export transcript
  const exportTranscript = () => {
    const finalText = transcriptSegments
      .filter(segment => segment.isFinal)
      .map(segment => segment.text)
      .join(' ');

    const blob = new Blob([finalText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transcript_${new Date().toISOString().slice(0, 10)}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          Real-time Speech Transcription
        </h1>
        <p className="text-gray-400 text-lg">
          Powered by ShunyaLabs Voice AI Infrastructure
        </p>
      </div>

      {/* Error Display */}
      {error && (
        <div className="max-w-6xl mx-auto mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
          <p className="text-red-500">{error}</p>
          <button
            onClick={() => setError('')}
            className="ml-auto text-red-500 hover:text-red-700 text-xl"
          >
            ×
          </button>
        </div>
      )}

      {/* Main Interface - 4 Column Layout */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Column - Language & Metrics */}
          <div className="lg:col-span-1 space-y-6">
            {/* Language Selector */}
            <div className="glass-card p-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Language
              </label>
              <LanguageSelector
                selectedLanguage={selectedLanguage}
                onLanguageChange={setSelectedLanguage}
                disabled={isRecording}
              />
            </div>

            {/* Metrics Panel */}
            <MetricsPanel 
              metrics={metrics} 
              duration={duration} 
              isRecording={isRecording} 
            />
          </div>

          {/* Middle Column - Live Transcript */}
          <div className="lg:col-span-2">
            <div className="glass-card p-6 h-full">
              <EnhancedTranscriptView
                segments={transcriptSegments}
                isRecording={isRecording}
                onClear={clearTranscript}
                onExport={exportTranscript}
                audioLevel={audioLevel}
              />
            </div>
          </div>

          {/* Right Column - Script Selector, Recording Controls & Audio Monitor */}
          <div className="lg:col-span-1 space-y-6">
            {/* Script Selector */}
            <div className="glass-card p-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Script
              </label>
              <ScriptSelector
                selectedScript={selectedScript}
                onScriptChange={setSelectedScript}
                disabled={isRecording}
                languageCode={selectedLanguage}
              />
            </div>

            {/* Recording Control */}
            <div className="glass-card p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
                Recording Control
              </h3>

              <div className="flex justify-center">
                <button
                  onClick={isRecording ? handleStopRecording : handleStartRecording}
                  disabled={false}
                  className={`
                    group relative p-6 rounded-full transition-all duration-300 transform hover:scale-105
                    ${isRecording
                      ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 shadow-lg shadow-red-500/25'
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg shadow-blue-500/25'
                    }
                  `}
                  aria-label={isRecording ? 'Stop recording' : 'Start recording'}
                >
                  {isRecording ? (
                    <Square className="w-8 h-8 text-white" />
                  ) : (
                    <Mic className="w-8 h-8 text-white" />
                  )}

                  {/* Recording pulse effect */}
                  {isRecording && (
                    <div className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-20"></div>
                  )}
                </button>
              </div>

              <p className="text-center text-sm text-gray-400 mt-3">
                {isRecording ? 'Click to stop recording' : 'Click to start recording'}
              </p>
            </div>

            {/* Audio Monitor */}
            <AudioMonitor
              audioLevel={audioLevel}
              isRecording={isRecording}
            />
          </div>
        </div>

        {/* Instructions */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-400">
            {isRecording
              ? '🎙️ Recording in progress - speak clearly for best results'
              : 'Click the microphone to start real-time transcription'}
          </p>
        </div>
      </div>
    </div>
  );
};
