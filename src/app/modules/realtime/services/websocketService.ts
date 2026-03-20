export interface TranscriptionResult {
  text: string;
  is_final: boolean;
  confidence: number;
  start_time?: number;
  end_time?: number;
  timestamp: number;
  session_id?: string;
  message_id?: string;
  segment_id?: string;
  language?: string;
  script?: string;
  sentence_state?: 'incomplete' | 'complete' | 'paragraph_end';
  sentence_confidence?: number;
  segments?: ShunyaLabsSegment[];
  metadata?: {
    word_rate_wpm?: number;
    processing_time_ms?: number;
    latency_ms?: number;
  };
}

// ShunyaLabs specific interfaces
export interface ShunyaLabsSegment {
  text: string;
  start: number;
  end?: number;
  completed: boolean;
}

export interface ShunyaLabsMessage {
  message?: string;
  backend?: string;
  status?: string;
  language?: string;
  language_prob?: number;
  segments?: ShunyaLabsSegment[];
  timebase_hz?: number;
  event?: string;
  type?: string;
}

export interface ShunyaLabsInitConfig {
  uid: string;
  language: string | null;
  task: string;
  model: string;
  client_sample_rate: number;
  deliver_deltas_only: boolean;
  api_key: string;
}

export interface WebSocketConfig {
  url?: string;
  apiKey: string;
  reconnectAttempts: number;
  reconnectDelay: number;
  pingInterval: number;
  language: string;
  script?: string;
}

export type TranscriptionCallback = (result: TranscriptionResult) => void;
export type ConnectionStatusCallback = (
  status: 'connecting' | 'connected' | 'disconnected' | 'error'
) => void;
export type ErrorCallback = (error: Error) => void;

class WebSocketService {
  private websocket: WebSocket | null = null;
  private config: WebSocketConfig;
  private reconnectTimer: number | null = null;
  private reconnectAttempts = 0;
  private isIntentionalClose = false;
  private connectionStatus: 'connecting' | 'connected' | 'disconnected' | 'error' = 'disconnected';
  
  // Session management
  private sessionId: string = '';
  private frameSequence: number = 0;
  private clientUid: string = '';
  private lastAudioSentTime: number = 0; // Track when audio was sent for latency calculation
  
  // Callbacks
  private onTranscription: TranscriptionCallback | null = null;
  private onConnectionStatus: ConnectionStatusCallback | null = null;
  private onError: ErrorCallback | null = null;

  // ShunyaLabs API Gateway endpoint
  private readonly API_GATEWAY_URL = 'wss://tl.shunyalabs.ai/';

  constructor(config: WebSocketConfig) {
    this.config = {
      ...config,
      url: this.API_GATEWAY_URL
    };
    this.clientUid = this.generateUID();
  }

  /**
   * Generate a unique client ID
   */
  private generateUID(): string {
    return 'client-' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Generate a session ID
   */
  private generateSessionId(): string {
    return 'session-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Set callback functions
   */
  setCallbacks(callbacks: {
    onTranscription?: TranscriptionCallback;
    onConnectionStatus?: ConnectionStatusCallback;
    onError?: ErrorCallback;
  }): void {
    this.onTranscription = callbacks.onTranscription || null;
    this.onConnectionStatus = callbacks.onConnectionStatus || null;
    this.onError = callbacks.onError || null;
  }

  /**
   * Connect to WebSocket server
   */
  async connect(): Promise<void> {
    try {
      this.isIntentionalClose = false;
      this.setConnectionStatus('connecting');
      
      // Generate new session ID
      this.sessionId = this.generateSessionId();
      this.frameSequence = 0;

      // Build WebSocket URL with API key as query parameter (for compatibility)
      const wsUrl = `${this.config.url}?api_key=${encodeURIComponent(this.config.apiKey)}`;
      
      console.log('Connecting to ShunyaLabs WebSocket API Gateway');
      console.log('Session ID:', this.sessionId);

      // Connect with API key header if possible
      this.websocket = new WebSocket(wsUrl);
      this.setupWebSocketHandlers();

      // Wait for connection to open
      return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('WebSocket connection timeout'));
        }, 10000);

        if (this.websocket) {
          this.websocket.onopen = () => {
            clearTimeout(timeout);
            // Send INIT message immediately after connection
            this.sendInitMessage();
            resolve();
          };

          this.websocket.onerror = (error) => {
            clearTimeout(timeout);
            reject(new Error(`WebSocket connection failed: ${error}`));
          };
        }
      });
    } catch (error) {
      console.error('Failed to connect:', error);
      this.setConnectionStatus('error');
      throw error;
    }
  }

  /**
   * Send INIT message
   */
  private sendInitMessage(): void {
    if (!this.websocket || this.websocket.readyState !== WebSocket.OPEN) return;

    const initMessage = {
      action: 'send',
      type: 'init',
      session_id: this.sessionId,
      config: {
        uid: this.clientUid,
        language: this.config.language === 'auto' || this.config.language === '' ? null : this.config.language,
        task: 'transcribe',
        model: 'pingala-v1-universal',
        client_sample_rate: 16000,
        deliver_deltas_only: false,
        api_key: this.config.apiKey
      } as ShunyaLabsInitConfig
    };

    console.log('🚀 Sending INIT message:', JSON.stringify(initMessage, null, 2));
    this.websocket.send(JSON.stringify(initMessage));
  }

  /**
   * Setup WebSocket event handlers
   */
  private setupWebSocketHandlers(): void {
    if (!this.websocket) return;

    this.websocket.onopen = () => {
      console.log('✅ WebSocket connected to ShunyaLabs API Gateway');
      console.log('🌐 WebSocket readyState:', this.websocket?.readyState);
      console.log('🌐 WebSocket URL:', this.websocket?.url);
      this.setConnectionStatus('connected');
      this.reconnectAttempts = 0;
    };

    this.websocket.onmessage = (event) => {
      this.handleMessage(event.data);
    };

    this.websocket.onerror = (error) => {
      console.error('WebSocket error:', error);
      if (this.onError) {
        this.onError(new Error('WebSocket connection error'));
      }
    };

    this.websocket.onclose = (event) => {
      console.log('WebSocket closed:', event.code, event.reason);
      
      if (event.code === 1000 && event.reason === 'invalid_api_key') {
        this.setConnectionStatus('error');
        if (this.onError) {
          this.onError(new Error('Invalid API key'));
        }
      } else if (!this.isIntentionalClose) {
        this.setConnectionStatus('disconnected');
        this.attemptReconnect();
      } else {
        this.setConnectionStatus('disconnected');
      }
    };
  }

  /**
   * Handle incoming messages
   */
  private handleMessage(data: string): void {
    try {
      const message: ShunyaLabsMessage = JSON.parse(data);
      
      // Handle different message types
      if (message.message === 'SERVER_READY') {
        console.log('✅ Server ready:', message.backend);
      } else if (message.type === 'error' && message.message === 'invalid_api_key') {
        console.error('❌ Invalid API key');
        if (this.onError) {
          this.onError(new Error('Invalid API key'));
        }
        this.disconnect();
      } else if (message.language && message.language_prob !== undefined) {
        console.log('🌐 Language detected:', message.language, 'probability:', message.language_prob);
      } else if (message.segments) {
        console.log('📝 Received segments:', message.segments.length);
        this.handleSegments(message.segments, message.timebase_hz);
      } else if (message.event === 'STREAM_END') {
        console.log('✅ Stream ended');
      } else if (message.status === 'WAIT') {
        console.log('⏳ Server busy, wait time:', message.message, 'minutes');
      } else {
        console.log('❓ Unknown message:', message);
      }
    } catch (error) {
      console.error('Failed to parse message:', error);
    }
  }

  /**
   * Handle transcript segments
   */
  private handleSegments(segments: ShunyaLabsSegment[], timebaseHz?: number): void {
    // Calculate round-trip latency
    const now = Date.now();
    const roundTripLatency = this.lastAudioSentTime > 0 ? now - this.lastAudioSentTime : 0;

    if (roundTripLatency > 0) {
      console.log(`⏱️ Round-trip latency: ${roundTripLatency}ms`);
    }

    console.log(`📦 Received ${segments.length} segments from server`);

    // Send all segments as one result (like old implementation)
    // This allows the UI to do full replacement logic
    const result: TranscriptionResult = {
      text: '', // Not used when segments array is provided
      is_final: false,
      confidence: 0.95,
      timestamp: now,
      session_id: this.sessionId,
      segments: segments, // Pass the entire segments array
      metadata: {
        latency_ms: roundTripLatency > 0 ? roundTripLatency : undefined,
      },
    };

    if (this.onTranscription) {
      this.onTranscription(result);
    }
  }

  /**
   * Send audio data as FRAME message
   */
  sendAudioData(audioData: ArrayBuffer): void {
    if (!this.websocket || this.websocket.readyState !== WebSocket.OPEN) {
      console.warn('WebSocket not connected, cannot send audio');
      return;
    }

    // Track when we send audio for latency calculation
    this.lastAudioSentTime = Date.now();

    // Increment frame sequence
    this.frameSequence++;

    // Convert ArrayBuffer to base64
    const base64Audio = this.arrayBufferToBase64(audioData);

    const frameMessage = {
      action: 'send',
      type: 'frame',
      session_id: this.sessionId,
      frame_seq: this.frameSequence,
      audio_inline_b64: base64Audio,
      dtype: 'float32',
      channels: 1,
      sr: 16000
    };

    // Debug logging
    const audioByteLength = audioData.byteLength;
    const sampleCount = audioByteLength / 4; // Float32 = 4 bytes per sample
    const durationMs = (sampleCount / 16000) * 1000;
    console.log(`Sending FRAME ${this.frameSequence}: ${sampleCount} samples (${durationMs.toFixed(1)}ms), ${base64Audio.length} base64 chars`);

    this.websocket.send(JSON.stringify(frameMessage));
  }

  /**
   * Send END_OF_AUDIO sentinel
   */
  sendEndOfAudio(): void {
    if (!this.websocket || this.websocket.readyState !== WebSocket.OPEN) {
      return;
    }

    // Increment frame sequence
    this.frameSequence++;

    // Create END_OF_AUDIO sentinel
    const endOfAudio = new TextEncoder().encode('END_OF_AUDIO');
    const base64Sentinel = this.arrayBufferToBase64(endOfAudio.buffer);

    const endMessage = {
      action: 'send',
      type: 'frame',
      session_id: this.sessionId,
      frame_seq: this.frameSequence,
      audio_inline_b64: base64Sentinel,
      dtype: 'float32',
      channels: 1,
      sr: 16000
    };

    console.log('Sending END_OF_AUDIO sentinel');
    this.websocket.send(JSON.stringify(endMessage));
  }

  /**
   * Convert ArrayBuffer to base64
   */
  private arrayBufferToBase64(buffer: ArrayBuffer): string {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }

  /**
   * Update configuration
   */
  updateConfig(updates: Partial<WebSocketConfig>): void {
    this.config = { ...this.config, ...updates };
  }

  /**
   * Disconnect from WebSocket
   */
  disconnect(): void {
    this.isIntentionalClose = true;
    
    // Send END_OF_AUDIO before closing
    this.sendEndOfAudio();
    
    // Keep WebSocket open for 3 seconds to receive final transcripts
    // The server sends STREAM_END event after processing END_OF_AUDIO
    setTimeout(() => {
      if (this.websocket) {
        this.websocket.close();
        this.websocket = null;
      }
      this.setConnectionStatus('disconnected');
      console.log('WebSocket disconnected after receiving final segments');
    }, 5000);  // 3 seconds to match working implementation
  }

  /**
   * Attempt to reconnect
   */
  private attemptReconnect(): void {
    if (this.reconnectAttempts >= this.config.reconnectAttempts) {
      console.error('Max reconnection attempts reached');
      this.setConnectionStatus('error');
      if (this.onError) {
        this.onError(new Error('Failed to reconnect after multiple attempts'));
      }
      return;
    }

    this.reconnectAttempts++;
    const delay = this.config.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);
    
    console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.config.reconnectAttempts}) in ${delay}ms`);
    
    this.reconnectTimer = window.setTimeout(() => {
      this.connect().catch(error => {
        console.error('Reconnection failed:', error);
        this.attemptReconnect();
      });
    }, delay);
  }

  /**
   * Set connection status
   */
  private setConnectionStatus(status: 'connecting' | 'connected' | 'disconnected' | 'error'): void {
    this.connectionStatus = status;
    if (this.onConnectionStatus) {
      this.onConnectionStatus(status);
    }
  }

  /**
   * Check if connected
   */
  isConnected(): boolean {
    const connected = this.websocket !== null && this.websocket.readyState === WebSocket.OPEN;
    console.log(`🔌 WebSocket connected check: ${connected}, readyState: ${this.websocket?.readyState}`);
    return connected;
  }

  /**
   * Get connection status
   */
  getConnectionStatus(): string {
    return this.connectionStatus;
  }
}

export default WebSocketService;