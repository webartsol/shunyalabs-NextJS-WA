export interface AudioConfig {
  sampleRate: number;
  channelCount: number;
  bitrate: number;
  chunkDurationMs: number;
  whisperLiveMode?: boolean; // Enable WhisperLive/ShunyaLabs compatibility mode
}

export interface AudioLevelInfo {
  level: number;
  isClipping: boolean;
  timestamp: number;
}

export interface PCMFrame {
  seq: number;
  timestamp: number;
  pcm: Int16Array;
}

export type AudioDataCallback = (audioData: ArrayBuffer) => void;
export type AudioLevelCallback = (levelInfo: AudioLevelInfo) => void;
export type AudioErrorCallback = (error: Error) => void;

class AudioService {
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private microphone: MediaStreamAudioSourceNode | null = null;
  private stream: MediaStream | null = null;
  private pcmRecorderNode: AudioWorkletNode | null = null;
  private isRecording = false;
  private audioLevelMonitor: number | null = null;
  private chunkSequence = 0;
  private sessionId: string | null = null;

  private config: AudioConfig = {
    sampleRate: 16000,
    channelCount: 1,
    bitrate: 16000,
    chunkDurationMs: 50, // LOW LATENCY: 50ms chunks (was 300ms)
  };

  private onAudioData: AudioDataCallback | null = null;
  private onAudioLevel: AudioLevelCallback | null = null;
  private onError: AudioErrorCallback | null = null;

  constructor(config?: Partial<AudioConfig>) {
    if (config) {
      this.config = { ...this.config, ...config };
    }
    console.log('🎯 AudioService initialized with config:', this.config);
  }

  /**
   * Set callback functions
   */
  setCallbacks(callbacks: {
    onAudioData?: AudioDataCallback;
    onAudioLevel?: AudioLevelCallback;
    onError?: AudioErrorCallback;
  }): void {
    this.onAudioData = callbacks.onAudioData || null;
    this.onAudioLevel = callbacks.onAudioLevel || null;
    this.onError = callbacks.onError || null;
    console.log('🎯 Callbacks set:', {
      hasAudioData: !!this.onAudioData,
      hasAudioLevel: !!this.onAudioLevel,
      hasError: !!this.onError,
    });
  }

  /**
   * Initialize audio capture
   */
  async initialize(): Promise<void> {
    try {
      // Check if audio is supported
      if (!AudioService.isSupported()) {
        throw new Error('Audio recording is not supported in this browser');
      }

      // Check AudioWorklet support
      if (!('audioWorklet' in AudioContext.prototype)) {
        throw new Error('AudioWorklet is not supported in this browser');
      }

      // Request microphone permission with better error handling
      try {
        this.stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            sampleRate: 48000, // Let browser use native rate, worklet will downsample
            channelCount: 2, // Allow stereo, worklet will convert to mono
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
          },
          video: false,
        });
        console.log('✅ Microphone access granted');
      } catch (permissionError: any) {
        console.error('❌ Microphone permission denied or failed:', permissionError);
        if (permissionError.name === 'NotAllowedError') {
          throw new Error(
            'Microphone access denied. Please allow microphone access and refresh the page.'
          );
        } else if (permissionError.name === 'NotFoundError') {
          throw new Error('No microphone found. Please connect a microphone and refresh the page.');
        } else {
          throw new Error(`Failed to access microphone: ${permissionError.message}`);
        }
      }

      // Create audio context for audio level monitoring
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

      // Handle audio context state
      if (this.audioContext.state === 'suspended') {
        console.log('⏸️ Audio context suspended, will resume when starting recording');
      }

      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 256;
      this.analyser.smoothingTimeConstant = 0.8;

      // Connect microphone to analyser
      this.microphone = this.audioContext.createMediaStreamSource(this.stream);
      this.microphone.connect(this.analyser);

      // Load AudioWorklet processor with multiple fallback methods
      let workletUrl: string | null = null;
      let loadSucceeded = false;
      
      // Method 1: Try loading from public path with full URL (works better in production)
      try {
        const workletPath = '/modules/realtime/lib/worklets/pcm-recorder.worklet.js';
        const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
        workletUrl = baseUrl + workletPath;
        console.log('📦 Loading AudioWorklet from full URL:', workletUrl);
        
        await this.audioContext.audioWorklet.addModule(workletUrl);
        loadSucceeded = true;
        console.log('✅ AudioWorklet loaded successfully from full URL');
      } catch (error) {
        console.warn('⚠️ Failed to load worklet from full URL, trying relative path...', error);
      }
      
      // Method 2: Try relative path if full URL failed
      if (!loadSucceeded) {
        try {
          const workletPath = '/modules/realtime/lib/worklets/pcm-recorder.worklet.js';
          workletUrl = workletPath;
          console.log('📦 Loading AudioWorklet from relative path:', workletUrl);
          
          await this.audioContext.audioWorklet.addModule(workletPath);
          loadSucceeded = true;
          console.log('✅ AudioWorklet loaded successfully from relative path');
        } catch (error) {
          console.warn('⚠️ Failed to load worklet from relative path, trying inline method...', error);
        }
      }
      
      // Method 3: Create worklet from inline code as ultimate fallback
      if (!loadSucceeded) {
        try {
          console.log('📦 Creating AudioWorklet from inline code...');
          const workletCode = await this.getInlineWorkletCode();
          const blob = new Blob([workletCode], { type: 'application/javascript' });
          const blobUrl = URL.createObjectURL(blob);
          workletUrl = blobUrl;
          
          await this.audioContext.audioWorklet.addModule(blobUrl);
          loadSucceeded = true;
          console.log('✅ AudioWorklet loaded successfully from inline code');
          
          // Clean up blob URL after loading
          setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
        } catch (error) {
          console.error('❌ Failed to load worklet from inline code:', error);
        }
      }
      
      if (!loadSucceeded) {
        throw new Error('Failed to load AudioWorklet using any method');
      }

      try {
        // Create AudioWorkletNode
        this.pcmRecorderNode = new AudioWorkletNode(this.audioContext, 'pcm-recorder');

        // Set up PCM frame handler
        this.setupPCMFrameHandler();

        console.log('✅ AudioWorklet ready @16 kHz PCM');
      } catch (workletError: any) {
        console.error('❌ Failed to create AudioWorklet node:', workletError);
        console.error('Worklet URL was:', workletUrl);

        // Provide more specific error messages
        if (workletError instanceof TypeError) {
          throw new Error(
            'AudioWorklet module failed to load - check network connection and file availability'
          );
        } else if (workletError.name === 'AbortError') {
          throw new Error(
            'AudioWorklet module loading was aborted - the worklet file may not exist or have syntax errors'
          );
        } else {
          throw new Error(`AudioWorklet initialization failed: ${workletError.message}`);
        }
      }

      console.log('✅ Audio service initialized successfully');
      console.log('🎙️ Using AudioWorklet for low-latency PCM capture');
      console.log('📊 Native sample rate:', this.audioContext.sampleRate);
      console.log('📊 Target sample rate:', this.config.sampleRate);
      console.log('📊 Chunk duration:', this.config.chunkDurationMs, 'ms');
      console.log('📊 Audio context state:', this.audioContext.state);
    } catch (error) {
      console.error('❌ Failed to initialize audio service:', error);
      this.handleError(error as Error);
      throw error;
    }
  }

  /**
   * Get inline worklet code as fallback for production environments
   */
  private async getInlineWorkletCode(): Promise<string> {
    // This is the same code as in pcm-recorder.worklet.js
    return `
/**
 * PCM Recorder AudioWorklet Processor
 * Downsamples from 48kHz stereo to 16kHz mono PCM
 * Sends frames every 50ms for low-latency streaming
 */

class PCMRecorderProcessor extends AudioWorkletProcessor {
  constructor(options) {
    super();
    
    this.sampleRate = globalThis.sampleRate || 48000;
    this.channelCount = 1; // we'll convert to mono
    this.targetSampleRate = 16000;
    this.frameDurationMs = 50; // configurable frame duration
    this.downsampleRatio = this.sampleRate / this.targetSampleRate;
    this.frameSize = Math.floor((this.targetSampleRate * this.frameDurationMs) / 1000);
    
    // Buffer for accumulating downsampled samples
    this.buffer = new Float32Array(this.frameSize);
    this.bufferIndex = 0;
    this.sequenceNumber = 0;
    this.downsampleBuffer = new Float32Array(Math.ceil(this.downsampleRatio * 2)); // extra space for overlap
    this.downsampleIndex = 0;
    
    // Simple low-pass filter for anti-aliasing
    this.filterState = 0;
    this.filterAlpha = 0.1;
    
    console.log(\`PCMRecorderProcessor initialized: \${this.sampleRate}Hz -> \${this.targetSampleRate}Hz, frame=\${this.frameSize} samples\`);
    
    // Listen for parameter updates
    this.port.onmessage = (event) => {
      if (event.data.type === 'updateParams') {
        this.frameDurationMs = event.data.frameDurationMs || this.frameDurationMs;
        this.frameSize = Math.floor((this.targetSampleRate * this.frameDurationMs) / 1000);
        this.buffer = new Float32Array(this.frameSize);
        this.bufferIndex = 0;
      }
    };
  }

  process(inputs, outputs, parameters) {
    const input = inputs[0];
    
    if (!input || input.length === 0) {
      return true; // Keep processor alive
    }
    
    // Convert stereo to mono by averaging channels
    const monoInput = this.convertToMono(input);
    
    // Downsample to target rate
    const downsampledData = this.downsample(monoInput);
    
    // Accumulate samples into frames
    for (let i = 0; i < downsampledData.length; i++) {
      this.buffer[this.bufferIndex++] = downsampledData[i];
      
      // When frame is full, send it
      if (this.bufferIndex >= this.frameSize) {
        this.sendFrame();
        this.bufferIndex = 0;
      }
    }
    
    return true; // Keep processor alive
  }
  
  convertToMono(input) {
    const channelCount = input.length;
    const frameLength = input[0].length;
    const monoData = new Float32Array(frameLength);
    
    if (channelCount === 1) {
      // Already mono
      return input[0];
    }
    
    // Average all channels
    for (let i = 0; i < frameLength; i++) {
      let sum = 0;
      for (let ch = 0; ch < channelCount; ch++) {
        sum += input[ch][i];
      }
      monoData[i] = sum / channelCount;
    }
    
    return monoData;
  }
  
  downsample(input) {
    const outputLength = Math.floor(input.length / this.downsampleRatio);
    const output = new Float32Array(outputLength);
    
    for (let i = 0; i < outputLength; i++) {
      const sourceIndex = i * this.downsampleRatio;
      const sourceIndexFloor = Math.floor(sourceIndex);
      const sourceIndexCeil = Math.min(sourceIndexFloor + 1, input.length - 1);
      const fraction = sourceIndex - sourceIndexFloor;
      
      // Linear interpolation
      const sample = input[sourceIndexFloor] * (1 - fraction) + input[sourceIndexCeil] * fraction;
      
      // Simple low-pass filter to reduce aliasing
      this.filterState = this.filterState * (1 - this.filterAlpha) + sample * this.filterAlpha;
      output[i] = this.filterState;
    }
    
    return output;
  }
  
  sendFrame() {
    // Convert float32 to int16 PCM
    const pcmData = new Int16Array(this.frameSize);
    for (let i = 0; i < this.frameSize; i++) {
      // Clamp to [-1, 1] and convert to 16-bit
      const sample = Math.max(-1, Math.min(1, this.buffer[i]));
      pcmData[i] = Math.round(sample * 32767);
    }
    
    const frame = {
      seq: this.sequenceNumber++,
      timestamp: globalThis.performance?.now() || Date.now(),
      pcm: pcmData
    };
    
    this.port.postMessage(frame);
  }
}

registerProcessor('pcm-recorder', PCMRecorderProcessor);
    `;
  }

  /**
   * Setup PCM frame handler for AudioWorklet
   */
  private setupPCMFrameHandler(): void {
    if (!this.pcmRecorderNode) return;

    this.pcmRecorderNode.port.onmessage = (event) => {
      const frame: PCMFrame = event.data;

      if (this.onAudioData) {
        // ShunyaLabs API uses Float32Array format (same as WhisperLive)
        // Convert Int16 PCM to Float32 and send immediately (no buffering)
        const buffer = this.convertToFloat32Array(frame);
        this.onAudioData(buffer);
      }
    };
  }

  /**
   * Convert PCM frame to Float32Array for ShunyaLabs/WhisperLive
   * NO BUFFERING - immediate conversion and callback
   */
  private convertToFloat32Array(frame: PCMFrame): ArrayBuffer {
    // Convert Int16 to Float32 (normalize to [-1, 1] range)
    const float32Data = new Float32Array(frame.pcm.length);
    for (let i = 0; i < frame.pcm.length; i++) {
      float32Data[i] = frame.pcm[i] / 32768.0; // Normalize 16-bit PCM to [-1, 1]
    }

    // Return the Float32Array buffer directly - NO BUFFERING
    return float32Data.buffer;
  }

  /**
   * Start recording
   */
  async startRecording(): Promise<void> {
    if (this.isRecording) {
      console.warn('⚠️ Already recording');
      return;
    }

    if (!this.audioContext || !this.microphone || !this.pcmRecorderNode) {
      throw new Error('Audio service not initialized');
    }

    try {
      // Resume audio context if suspended
      if (this.audioContext.state === 'suspended') {
        await this.audioContext.resume();
        console.log('▶️ Audio context resumed');
      }

      // Connect microphone to PCM recorder (starts audio processing)
      this.microphone.connect(this.pcmRecorderNode);

      // Update frame duration in the worklet
      this.pcmRecorderNode.port.postMessage({
        type: 'updateParams',
        frameDurationMs: this.config.chunkDurationMs,
      });

      this.isRecording = true;
      this.chunkSequence = 0;

      // Start audio level monitoring
      this.startAudioLevelMonitoring();

      console.log('🎙️ PCM recording started');
      console.log('⚡ Low-latency mode: sending', this.config.chunkDurationMs, 'ms chunks');
    } catch (error) {
      console.error('❌ Failed to start recording:', error);
      this.handleError(error as Error);
      throw error;
    }
  }

  /**
   * Stop recording
   */
  stopRecording(): void {
    if (!this.isRecording) {
      console.warn('⚠️ Not currently recording');
      return;
    }

    try {
      if (this.microphone && this.pcmRecorderNode) {
        this.microphone.disconnect(this.pcmRecorderNode);
      }

      this.isRecording = false;
      this.stopAudioLevelMonitoring();

      console.log('⏹️ PCM recording stopped');
    } catch (error) {
      console.error('❌ Failed to stop recording:', error);
      this.handleError(error as Error);
    }
  }

  /**
   * Release microphone (stops all tracks, removes Chrome red indicator)
   * Call this after stopping recording to release browser permissions
   */
  releaseMicrophone(): void {
    if (this.stream) {
      console.log('🎤 Releasing microphone permissions...');
      this.stream.getTracks().forEach((track) => {
        track.stop();
        console.log(`  ⏹️ Stopped track: ${track.kind} (${track.label})`);
      });
      this.stream = null;
      console.log('✅ Microphone released - red indicator should disappear');
    }
  }

  /**
   * Start audio level monitoring
   */
  private startAudioLevelMonitoring(): void {
    if (!this.analyser || this.audioLevelMonitor) return;

    const updateAudioLevel = () => {
      if (!this.analyser || !this.isRecording) return;

      const bufferLength = this.analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      this.analyser.getByteFrequencyData(dataArray);

      // Calculate RMS level
      let sum = 0;
      for (let i = 0; i < bufferLength; i++) {
        sum += dataArray[i] * dataArray[i];
      }
      const rms = Math.sqrt(sum / bufferLength);
      const level = rms / 255; // Normalize to 0-1

      // Check for clipping
      const isClipping = level > 0.95;

      if (this.onAudioLevel) {
        this.onAudioLevel({
          level,
          isClipping,
          timestamp: Date.now(),
        });
      }

      this.audioLevelMonitor = requestAnimationFrame(updateAudioLevel);
    };

    this.audioLevelMonitor = requestAnimationFrame(updateAudioLevel);
  }

  /**
   * Stop audio level monitoring
   */
  private stopAudioLevelMonitoring(): void {
    if (this.audioLevelMonitor) {
      cancelAnimationFrame(this.audioLevelMonitor);
      this.audioLevelMonitor = null;
    }
  }

  /**
   * Handle errors
   */
  private handleError(error: Error): void {
    console.error('❌ AudioService error:', error);
    if (this.onError) {
      this.onError(error);
    }
  }

  /**
   * Get recording state
   */
  getIsRecording(): boolean {
    return this.isRecording;
  }

  /**
   * Get analyser node for audio visualization
   */
  getAnalyser(): AnalyserNode | null {
    return this.analyser;
  }

  /**
   * Get configuration
   */
  getConfig(): AudioConfig {
    return { ...this.config };
  }

  /**
   * Get audio format
   */
  getAudioFormat(): string {
    return 'float32';
  }

  /**
   * Check if audio recording is supported
   */
  static isSupported(): boolean {
    return !!(
      navigator.mediaDevices &&
      typeof navigator.mediaDevices.getUserMedia === 'function' &&
      window.AudioContext &&
      'audioWorklet' in AudioContext.prototype
    );
  }

  /**
   * Get available audio devices
   */
  static async getAudioDevices(): Promise<MediaDeviceInfo[]> {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      return devices.filter((device) => device.kind === 'audioinput');
    } catch (error) {
      console.error('Failed to get audio devices:', error);
      return [];
    }
  }

  /**
   * Cleanup resources
   */
  cleanup(): void {
    this.stopRecording();
    this.stopAudioLevelMonitoring();

    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop());
      this.stream = null;
    }

    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
    }

    this.microphone = null;
    this.analyser = null;
    this.pcmRecorderNode = null;

    console.log('🧹 Audio service cleaned up');
  }
}

export default AudioService;
