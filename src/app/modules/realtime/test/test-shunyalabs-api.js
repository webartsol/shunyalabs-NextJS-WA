/**
 * Test script for ShunyaLabs Realtime WebSocket API
 * 
 * This demonstrates how to connect to the ShunyaLabs API Gateway WebSocket
 * and send audio for transcription.
 * 
 * Usage:
 * 1. Set your API key in the environment: export SHUNYALABS_API_KEY=your_key
 * 2. Run: node test-shunyalabs-api.js
 */

const WebSocket = require('ws');

const API_KEY = process.env.SHUNYALABS_API_KEY || '';
const WS_URL = 'wss://tl.shunyalabs.ai/';

if (!API_KEY) {
  console.error('Please set SHUNYALABS_API_KEY environment variable');
  process.exit(1);
}

async function testConnection() {
  const sessionId = `test-session-${Date.now()}`;
  const clientUid = `client-test-${Math.random().toString(36).substr(2, 9)}`;
  
  console.log('Connecting to ShunyaLabs WebSocket API...');
  console.log('Session ID:', sessionId);
  
  // Connect with API key as query parameter
  const ws = new WebSocket(`${WS_URL}?api_key=${encodeURIComponent(API_KEY)}`);
  
  ws.on('open', () => {
    console.log('WebSocket connected');
    
    // Send INIT message
    const initMessage = {
      action: 'send',
      type: 'init',
      session_id: sessionId,
      config: {
        uid: clientUid,
        language: 'en',
        task: 'transcribe',
        model: 'pingala-v1-universal',
        client_sample_rate: 16000,
        deliver_deltas_only: true,
        api_key: API_KEY
      }
    };
    
    console.log('Sending INIT message...');
    ws.send(JSON.stringify(initMessage));
    
    // Simulate sending audio frames
    let frameSeq = 1;
    const sendTestFrame = () => {
      // Create a test audio buffer (silence for demo)
      const audioBuffer = new Float32Array(4800); // 300ms at 16kHz
      const base64Audio = Buffer.from(audioBuffer.buffer).toString('base64');
      
      const frameMessage = {
        action: 'send',
        type: 'frame',
        session_id: sessionId,
        frame_seq: frameSeq++,
        audio_inline_b64: base64Audio,
        dtype: 'float32',
        channels: 1,
        sr: 16000
      };
      
      ws.send(JSON.stringify(frameMessage));
      console.log(`Sent audio frame ${frameSeq - 1}`);
    };
    
    // Send a few test frames
    const frameInterval = setInterval(() => {
      if (frameSeq <= 5) {
        sendTestFrame();
      } else {
        clearInterval(frameInterval);
        
        // Send END_OF_AUDIO
        const endOfAudioBytes = Buffer.from('END_OF_AUDIO', 'utf8');
        const endMessage = {
          action: 'send',
          type: 'frame',
          session_id: sessionId,
          frame_seq: frameSeq++,
          audio_inline_b64: endOfAudioBytes.toString('base64'),
          dtype: 'float32',
          channels: 1,
          sr: 16000
        };
        
        console.log('Sending END_OF_AUDIO...');
        ws.send(JSON.stringify(endMessage));
        
        // Close after a delay to receive any final messages
        setTimeout(() => {
          ws.close();
        }, 5000);
      }
    }, 300);
  });
  
  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data.toString());
      console.log('Received:', JSON.stringify(message, null, 2));
      
      if (message.message === 'SERVER_READY') {
        console.log('✓ Server is ready');
      } else if (message.language && message.language_prob) {
        console.log(`✓ Language detected: ${message.language} (confidence: ${message.language_prob})`);
      } else if (message.segments) {
        console.log('✓ Received transcript segments:');
        message.segments.forEach(segment => {
          const tag = segment.completed ? 'FINAL' : 'PARTIAL';
          console.log(`  [${segment.start}-${segment.end || '?'}] ${tag}: ${segment.text}`);
        });
      } else if (message.event === 'STREAM_END') {
        console.log('✓ Stream ended');
      }
    } catch (error) {
      console.error('Failed to parse message:', error);
    }
  });
  
  ws.on('error', (error) => {
    console.error('WebSocket error:', error);
  });
  
  ws.on('close', (code, reason) => {
    console.log(`WebSocket closed. Code: ${code}, Reason: ${reason}`);
  });
}

// Run the test
testConnection().catch(console.error);
