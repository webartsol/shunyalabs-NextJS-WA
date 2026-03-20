# ShunyaLabs Realtime Transcription Module

This module provides real-time speech-to-text transcription using the ShunyaLabs API Gateway WebSocket service.

## Configuration

### API Key
You must obtain an API key from the ShunyaLabs team and set it in your environment:

```env
NEXT_PUBLIC_SHUNYALABS_API_KEY=your_api_key_here
```

### WebSocket Endpoint
The service connects to:
```
wss://tl.shunyalabs.ai/
```

## Protocol Overview

### 1. Connection Flow
1. Open WebSocket connection with API key (as header or query param)
2. Send INIT message with configuration
3. Stream audio as FRAME messages (Float32 base64-encoded)
4. Send END_OF_AUDIO sentinel when done
5. Receive transcripts and close connection

### 2. Message Format

#### INIT Message
```json
{
  "action": "send",
  "type": "init",
  "session_id": "<unique-session-id>",
  "config": {
    "uid": "client-<unique>",
    "language": "en",
    "task": "transcribe",
    "model": "pingala-v1-universal",
    "client_sample_rate": 16000,
    "deliver_deltas_only": false,
    "api_key": "<your-api-key>"
  }
}
```

#### FRAME Message (Audio)
```json
{
  "action": "send",
  "type": "frame",
  "session_id": "<same-session-id>",
  "frame_seq": 1,
  "audio_inline_b64": "<base64-float32-audio>",
  "dtype": "float32",
  "channels": 1,
  "sr": 16000
}
```

#### END_OF_AUDIO Message
```json
{
  "action": "send",
  "type": "frame",
  "session_id": "<same-session-id>",
  "frame_seq": 9999,
  "audio_inline_b64": "RU5EX09GX0FVRElP",
  "dtype": "float32",
  "channels": 1,
  "sr": 16000
}
```

### 3. Server Responses

#### Ready Signal
```json
{ "message": "SERVER_READY", "backend": "faster_whisper" }
```

#### Language Detection
```json
{ "language": "hi", "language_prob": 0.92 }
```

#### Transcript Segments
```json
{
  "timebase_hz": 16000,
  "segments": [
    {
      "text": "Hello world",
      "start": 0.0,
      "end": 2.4,
      "completed": false
    }
  ]
}
```

#### Stream End
```json
{ "event": "STREAM_END" }
```

## Audio Format

- **Format**: Float32 (IEEE 754), little-endian, mono
- **Sample Rate**: 16000 Hz
- **Chunk Size**: ~256-300ms recommended (4096-4800 samples)
- **Encoding**: Base64 for transport in JSON

## React Integration

The module provides React components that handle:
- Microphone access and audio capture
- WebSocket connection management
- Real-time transcript display
- Metrics tracking (WPM, latency, word count)
- Language selection
- Audio level monitoring

## Testing

Run the test script to verify your API key and connection:

```bash
cd src/app/modules/realtime/test
export SHUNYALABS_API_KEY=your_key
node test-shunyalabs-api.js
```

## Troubleshooting

1. **No transcripts received**:
   - Ensure API key is valid
   - Check that all messages include `{"action": "send"}`
   - Verify session_id is consistent across messages

2. **Connection errors**:
   - Verify API key is set correctly
   - Check network connectivity
   - Ensure WebSocket port is not blocked

3. **Audio issues**:
   - Verify microphone permissions
   - Check audio format is Float32 at 16kHz
   - Ensure audio chunks are properly base64 encoded

## Rate Limits

- Maximum concurrent connections: Server-configured (typically 4-240)
- Maximum connection duration: 300 seconds
- If capacity is full, you'll receive `{"status": "WAIT"}` messages
