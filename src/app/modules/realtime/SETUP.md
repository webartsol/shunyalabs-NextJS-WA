# ShunyaLabs Realtime Setup Guide

## Quick Setup

1. **Get API Key**
   Contact the ShunyaLabs team to obtain your API key for testing.

2. **Set Environment Variable**
   Create a `.env.local` file in the project root:
   ```
   NEXT_PUBLIC_SHUNYALABS_API_KEY=your_api_key_here
   ```

3. **Test Connection**
   Open the test page in your browser:
   ```
   src/app/modules/realtime/test/test-audio-pipeline.html
   ```
   Enter your API key and click "Start Recording" to test the connection.

## Troubleshooting

### No Transcriptions Appearing

1. **Check Browser Console**
   - Look for "🚀 Sending INIT message" - confirms WebSocket connection
   - Look for "✅ Server ready" - confirms server is accepting connections
   - Look for "📝 Received segments" - confirms transcriptions are being received

2. **Verify Audio Pipeline**
   - Check for "Sending audio chunk" messages with sample counts
   - Verify chunks are ~300ms (4800 samples at 16kHz)
   - Ensure microphone permissions are granted

3. **Common Issues**
   - **Invalid API Key**: Check for "❌ Invalid API key" in console
   - **No Audio**: Ensure microphone is not muted and browser has permission
   - **Wrong Sample Rate**: Audio should be resampled from native rate to 16kHz

## Debug Mode

To enable verbose logging, open browser console and run:
```javascript
localStorage.setItem('SHUNYALABS_DEBUG', 'true');
```

## Test Script

Use the Node.js test script to verify API connectivity:
```bash
cd src/app/modules/realtime/test
export SHUNYALABS_API_KEY=your_key
node test-shunyalabs-api.js
```
