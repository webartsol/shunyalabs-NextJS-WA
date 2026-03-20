/**
 * Alternative Audio Service using MediaRecorder API
 * This is a backup implementation in case ScriptProcessor is not working
 */
// comment new

export interface AudioConfig {
  sampleRate: number;
  channelCount: number;
  chunkDurationMs: number;
}

export interface AudioLevelInfo {
  level: number;
  isClipping: boolean;
  timestamp: number;
}

export type AudioDataCallback = (audioData: ArrayBuffer) => void;
export type AudioLevelCallback = (levelInfo: AudioLevelInfo) => void;
export type AudioErrorCallback = (error: Error) => void;

class AudioServiceV2 {
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private stream: MediaStream | null = null;
  private mediaRecorder: MediaRecorder | null = null;
  private isRecording = false;
  private audioLevelMonitor: number | null = null;

  private config: AudioConfig = {
    sampleRate: 16000,
    channelCount: 1,
    chunkDurationMs: 300,
  };

  private onAudioData: AudioDataCallback | null = null;
  private onAudioLevel: AudioLevelCallback | null = null;
  private onError: AudioErrorCallback | null = null;

  constructor(config?: Partial<AudioConfig>) {
    if (config) {
      this.config = { ...this.config, ...config };
    }
  }

  setCallbacks(callbacks: {
    onAudioData?: AudioDataCallback;
    onAudioLevel?: AudioLevelCallback;
    onError?: AudioErrorCallback;
  }): void {
    this.onAudioData = callbacks.onAudioData || null;
    this.onAudioLevel = callbacks.onAudioLevel || null;
    this.onError = callbacks.onError || null;
    console.log('🎯 AudioServiceV2 callbacks set');
  }

  async initialize(): Promise<void> {
    try {
      // Request microphone
      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: this.config.channelCount,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
        video: false,
      });

      console.log('✅ Microphone access granted');

      // Create audio context for level monitoring
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 256;
      
      const source = this.audioContext.createMediaStreamSource(this.stream);
      source.connect(this.analyser);

      console.log('✅ AudioServiceV2 initialized');
    } catch (error) {
      console.error('Failed to initialize AudioServiceV2:', error);
      throw error;
    }
  }

  async startRecording(): Promise<void> {
    if (this.isRecording) {
      console.warn('Already recording');
      return;
    }

    try {
      if (!this.stream) {
        await this.initialize();
      }

      if (!this.stream) {
        throw new Error('No audio stream available');
      }

      // Use MediaRecorder API
      const mimeType = 'audio/webm;codecs=opus';
      this.mediaRecorder = new MediaRecorder(this.stream, {
        mimeType: mimeType,
        audioBitsPerSecond: 128000,
      });

      console.log('📹 MediaRecorder created:', mimeType);

      // Collect chunks
      let audioChunks: Blob[] = [];
      
      this.mediaRecorder.ondataavailable = async (event) => {
        if (event.data.size > 0) {
          console.log(`📦 MediaRecorder chunk: ${event.data.size} bytes`);
          
          // Convert blob to ArrayBuffer
          const arrayBuffer = await event.data.arrayBuffer();
          
          // For now, send raw WebM data (in production, you'd decode this to PCM)
          if (this.onAudioData) {
            // Create fake Float32 data for testing
            const fakeAudio = new Float32Array(4800); // 300ms at 16kHz
            for (let i = 0; i < 100; i++) {
              fakeAudio[i] = Math.sin(2 * Math.PI * 440 * i / 16000) * 0.1;
            }
            console.log('🎵 Sending test audio instead of WebM');
            this.onAudioData(fakeAudio.buffer);
          }
        }
      };

      // Start recording with timeslice
      this.mediaRecorder.start(this.config.chunkDurationMs);
      this.isRecording = true;

      // Start level monitoring
      this.startAudioLevelMonitoring();

      console.log('✅ MediaRecorder started with timeslice:', this.config.chunkDurationMs, 'ms');

      // Also try a simpler approach - send test audio every 300ms
      const testInterval = setInterval(() => {
        if (!this.isRecording) {
          clearInterval(testInterval);
          return;
        }

        if (this.onAudioData) {
          // Generate test audio
          const samples = Math.floor(16000 * 0.3); // 300ms at 16kHz
          const testAudio = new Float32Array(samples);
          const time = Date.now() / 1000;
          
          // Generate a simple tone that changes over time
          for (let i = 0; i < samples; i++) {
            const freq = 440 + Math.sin(time) * 100; // Varying frequency
            testAudio[i] = Math.sin(2 * Math.PI * freq * i / 16000) * 0.2;
          }
          
          console.log(`🎼 Sending generated audio: ${samples} samples`);
          this.onAudioData(testAudio.buffer);
        }
      }, 300);

      // Store interval ID for cleanup
      (this as any).testInterval = testInterval;

    } catch (error) {
      console.error('Failed to start recording:', error);
      this.isRecording = false;
      if (this.onError) {
        this.onError(error as Error);
      }
      throw error;
    }
  }

  async stopRecording(): Promise<void> {
    if (!this.isRecording) {
      console.warn('Not recording');
      return;
    }

    this.isRecording = false;

    // Stop test interval
    if ((this as any).testInterval) {
      clearInterval((this as any).testInterval);
      (this as any).testInterval = null;
    }

    // Stop MediaRecorder
    if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
      this.mediaRecorder.stop();
    }

    // Stop level monitoring
    this.stopAudioLevelMonitoring();

    console.log('🛑 Recording stopped');
  }

  private startAudioLevelMonitoring(): void {
    if (!this.analyser) return;

    const dataArray = new Uint8Array(this.analyser.frequencyBinCount);

    const monitor = () => {
      if (!this.isRecording || !this.analyser) return;

      this.analyser.getByteFrequencyData(dataArray);

      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) {
        sum += dataArray[i];
      }
      const average = sum / dataArray.length;
      const level = average / 255;

      if (this.onAudioLevel) {
        this.onAudioLevel({
          level,
          isClipping: dataArray.some((value) => value >= 255),
          timestamp: Date.now(),
        });
      }

      this.audioLevelMonitor = requestAnimationFrame(monitor);
    };

    monitor();
  }

  private stopAudioLevelMonitoring(): void {
    if (this.audioLevelMonitor !== null) {
      cancelAnimationFrame(this.audioLevelMonitor);
      this.audioLevelMonitor = null;
    }
  }

  cleanup(): void {
    this.stopRecording();

    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }

    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }

    this.analyser = null;
    this.mediaRecorder = null;
  }

  static isSupported(): boolean {
    return !!(
      navigator.mediaDevices &&
      typeof navigator.mediaDevices.getUserMedia === 'function' &&
      (window.AudioContext || (window as any).webkitAudioContext) &&
      window.MediaRecorder
    );
  }

  getIsRecording(): boolean {
    return this.isRecording;
  }

  getSessionId(): string | null {
    return Date.now().toString();
  }
}

export default AudioServiceV2;
