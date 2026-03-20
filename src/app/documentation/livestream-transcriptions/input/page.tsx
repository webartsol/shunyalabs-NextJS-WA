"use client";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FiCopy, FiCheck } from "react-icons/fi";
import Link from "next/link";

function CodeBlock({
  language,
  code,
}: {
  language: string;
  code: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  return (
    <div className="relative mb-6">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 transition"
        title="Copy code"
      >
        {copied ? <FiCheck className="text-green-600 mt-2" /> : <FiCopy className="mt-2" />}
      </button>

      <SyntaxHighlighter
        language={language}
        style={oneLight}
        customStyle={{
          borderRadius: "10px",
          padding: "14px",
          fontSize: "14px",
          backgroundColor: "#f9f9f9",
        }}
      >
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  );
}

export default function InputPage() {
  return (
    <div className="min-h-screen bg-white rounded-2xl text-gray-800">

      <div className="max-w-5xl mx-auto py-6 leading-relaxed">
        <h1 className="text-3xl font-semibold mb-6">Input</h1>

        {/* Audio Format Requirements */}
        <h2 className="text-2xl font-semibold mb-3">Audio Format Requirements</h2>
        <p className="mb-4">
        ShunyaLabs accepts audio in the following format for livestream transcription:
        </p>
        <table className="border border-gray-300 text-sm mb-4">
            <thead className="bg-gray-100 text-gray-800 font-semibold">
              <tr>
                <th className="border px-3 py-2 text-left">Parameter</th>
                <th className="border px-3 py-2 text-left">Requirement</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-3 py-2 font-semibold">
                Format
                </td>
                <td className="border px-3 py-2">Float32 (IEEE 754), little-endian</td>
              </tr>
              <tr>
                <td className="border px-3 py-2 font-semibold">
                Sample Rate
                </td>
                <td className="border px-3 py-2">16,000 Hz (16 kHz)</td>
              </tr>
              <tr>
                <td className="border px-3 py-2 font-semibold">
                Channels
                </td>
                <td className="border px-3 py-2">1 (mono)</td>
              </tr>
              <tr>
                <td className="border px-3 py-2 font-semibold">
                Data Type
                </td>
                <td className="border px-3 py-2">Float32 (32-bit floating point)</td>
              </tr>
              <tr>
                <td className="border px-3 py-2 font-semibold">
                Chunk Size
                </td>
                <td className="border px-3 py-2">200-300 ms recommended</td>
              </tr>
              <tr>
                <td className="border px-3 py-2 font-semibold">
                Encoding
                </td>
                <td className="border px-3 py-2">Base64 for transmission</td>
              </tr>
            </tbody>
          </table>


        {/* Request Parameters */}
        <h2 className="text-2xl font-semibold mb-4">Request Parameters</h2>
        <h3 className="text-xl font-semibold mb-4">Initialize Session (<code className="font-mono text-orange-600 bg-black/10 px-2 rounded">init</code>)</h3>
        <div className="overflow-x-auto mb-8">
          <table className="border border-gray-300 text-sm">
            <thead className="bg-gray-100 text-gray-800 font-semibold">
              <tr>
                <th className="border px-3 py-2 text-left">Parameter</th>
                <th className="border px-3 py-2 text-left">Type</th>
                <th className="border px-3 py-2 text-left">Default</th>
                <th className="border px-3 py-2 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-3 py-2 font-mono text-orange-600">
                <code className="font-mono text-orange-600 bg-black/10 px-1 rounded">action</code>
                </td>
                <td className="border px-3 py-2">string</td>
                <td className="border px-3 py-2 font-semibold">Required</td>
                <td className="border px-3 py-2">
                Must be <code className="font-mono text-orange-600 bg-black/10 px-1 rounded">"send"</code>
                </td>
              </tr>
              <tr>
                <td className="border px-3 py-2 font-mono text-orange-600">
                <code className="font-mono text-orange-600 bg-black/10 px-1 rounded">type</code>
                </td>
                <td className="border px-3 py-2">string</td>
                <td className="border px-3 py-2 text-gray-600 font-semibold">Required</td>
                <td className="border px-3 py-2">
                Must be <code className="font-mono text-orange-600 bg-black/10 px-1 rounded">"init"</code>
                </td>
              </tr>
              <tr>
                <td className="border px-3 py-2 font-mono text-orange-600">
                <code className="font-mono text-orange-600 bg-black/10 px-1 rounded">config</code>
                </td>
                <td className="border px-3 py-2">object</td>
                <td className="border px-3 py-2 text-gray-600 font-semibold">Required</td>
                <td className="border px-3 py-2">
                Configuration options
                </td>
              </tr>
              <tr>
                <td className="border px-3 py-2 font-mono text-orange-600">
                <code className="font-mono text-orange-600 bg-black/10 px-1 rounded">config.language</code>
                </td>
                <td className="border px-3 py-2">string</td>
                <td className="border px-3 py-2 text-gray-600"><code className="font-mono text-orange-600 bg-black/10 px-1 rounded">null</code></td>
                <td className="border px-3 py-2">
                Language code (e.g., 'en', 'es', 'fr'). Use <code className="font-mono text-orange-600 bg-black/10 px-1 rounded">null</code> for auto-detection
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-semibold mb-4">Initialize Session (<code className="font-mono text-orange-600 bg-black/10 px-2 rounded">frame</code>)</h3>
        <div className="overflow-x-auto mb-8">
          <table className="border border-gray-300 text-sm">
            <thead className="bg-gray-100 text-gray-800 font-semibold">
              <tr>
                <th className="border px-3 py-2 text-left">Parameter</th>
                <th className="border px-3 py-2 text-left">Type</th>
                <th className="border px-3 py-2 text-left">Default</th>
                <th className="border px-3 py-2 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-3 py-2 font-mono text-orange-600">
                <code className="font-mono text-orange-600 bg-black/10 px-1 rounded">action</code>
                </td>
                <td className="border px-3 py-2">string</td>
                <td className="border px-3 py-2 font-semibold">Required</td>
                <td className="border px-3 py-2">
                Must be <code className="font-mono text-orange-600 bg-black/10 px-1 rounded">"send"</code>
                </td>
              </tr>
              <tr>
                <td className="border px-3 py-2 font-mono text-orange-600">
                <code className="font-mono text-orange-600 bg-black/10 px-1 rounded">type</code>
                </td>
                <td className="border px-3 py-2">string</td>
                <td className="border px-3 py-2 text-gray-600 font-semibold">Required</td>
                <td className="border px-3 py-2">
                Must be <code className="font-mono text-orange-600 bg-black/10 px-1 rounded">"frame"</code>
                </td>
              </tr>
              <tr>
                <td className="border px-3 py-2 font-mono text-orange-600">
                <code className="font-mono text-orange-600 bg-black/10 px-1 rounded">frame_seq</code>
                </td>
                <td className="border px-3 py-2">integer</td>
                <td className="border px-3 py-2 text-gray-600 font-semibold">Required</td>
                <td className="border px-3 py-2">
                Sequential frame number starting from 0
                </td>
              </tr>
              <tr>
                <td className="border px-3 py-2 font-mono text-orange-600">
                <code className="font-mono text-orange-600 bg-black/10 px-1 rounded">audio_inline_b64</code>
                </td>
                <td className="border px-3 py-2">string</td>
                <td className="border px-3 py-2 text-gray-600 font-semibold">Required</td>
                <td className="border px-3 py-2">
                Base64-encoded audio data
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-xl font-semibold mb-1">End Stream</h3>
        <p className="mb-4">
        To end the stream, send a final frame with <code className="font-mono text-orange-600 bg-black/10 px-1 rounded text-sm">audio_inline_b64</code> set to the base64 encoding of the literal string <code className="font-mono text-orange-600 bg-black/10 px-1 rounded text-sm">"END_OF_AUDIO"</code>.
        The base64 value is: <code className="font-mono text-orange-600 bg-black/10 px-1 rounded text-sm">RU5EX09GX0FVRElP</code>
        </p>

        {/* Complete JavaScript Example */}
        <h2 className="text-2xl font-semibold mb-3">Complete JavaScript Example</h2>
        <p className="mb-4">
        Full implementation with audio capture from microphone.
        </p>
        <CodeBlock
          language="javascript"
          code={`class TranscriptionClient {
    constructor(apiEndpoint) {
        this.apiEndpoint = apiEndpoint;
        this.ws = null;
        this.frameSeq = 0;
        this.audioContext = null;
    }

    async connect() {
        return new Promise((resolve, reject) => {
            this.ws = new WebSocket(this.apiEndpoint);

            this.ws.onopen = () => {
                console.log('Connected to transcription service');
                this.initializeSession();
                resolve();
            };

            this.ws.onmessage = (event) => {
                this.handleTranscriptionResult(JSON.parse(event.data));
            };

            this.ws.onerror = (error) => {
                console.error('WebSocket error:', error);
                reject(error);
            };
        });
    }

    initializeSession() {
        this.ws.send(JSON.stringify({
            action: 'send',
            type: 'init',
            config: {
                language: 'en'
            }
        }));
    }

    async startRecording() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            this.audioContext = new AudioContext({ sampleRate: 16000 });
            const source = this.audioContext.createMediaStreamSource(stream);

            const processor = this.audioContext.createScriptProcessor(4096, 1, 1);
            processor.onaudioprocess = (event) => {
                const audioData = event.inputBuffer.getChannelData(0);
                this.sendAudioFrame(audioData);
            };

            source.connect(processor);
            processor.connect(this.audioContext.destination);

        } catch (error) {
            console.error('Error starting recording:', error);
        }
    }

    sendAudioFrame(audioData) {
        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;

        const base64Audio = this.arrayBufferToBase64(audioData.buffer);

        this.ws.send(JSON.stringify({
            action: 'send',
            type: 'frame',
            frame_seq: this.frameSeq++,
            audio_inline_b64: base64Audio
        }));
    }

    endStream() {
        const eos = btoa('END_OF_AUDIO');
        this.ws.send(JSON.stringify({
            action: 'send',
            type: 'frame',
            frame_seq: this.frameSeq++,
            audio_inline_b64: eos
        }));
    }

    handleTranscriptionResult(result) {
        if (result.segments) {
            result.segments.forEach(segment => {
                if (segment.completed) {
                    console.log(\`[\${segment.start}s - \${segment.end}s]: \${segment.text}\`);
                }
            });
        }
    }

    arrayBufferToBase64(buffer) {
        const bytes = new Uint8Array(buffer);
        let binary = '';
        for (let i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
    }
}

// Usage
const client = new TranscriptionClient('wss://tl.shunyalabs.ai/');

async function main() {
    await client.connect();
    await client.startRecording();

    // Record for 30 seconds, then stop
    setTimeout(() => {
        client.endStream();
    }, 30000);
}

main();`}
        />

        {/* Complete Python Example */}
        <h2 className="text-2xl font-semibold mt-10 mb-4">
        Complete Python Example
        </h2>
        <p className="mb-4">
        Full implementation with microphone audio capture and real-time transcription.
        </p>
        <CodeBlock
          language="python"
          code={`import websocket
import json
import base64
import numpy as np
import pyaudio
import threading
import time

class TranscriptionClient:
    def __init__(self, api_endpoint):
        self.api_endpoint = api_endpoint
        self.ws = None
        self.frame_seq = 0
        self.audio = pyaudio.PyAudio()
        self.stream = None
        self.recording = False

    def on_message(self, ws, message):
        result = json.loads(message)

        if 'segments' in result:
            for segment in result['segments']:
                if segment.get('completed', False):
                    print(f"[{segment['start']}s - {segment['end']}s]: {segment['text']}")

    def on_error(self, ws, error):
        print(f"Error: {error}")

    def on_close(self, ws, close_status_code, close_msg):
        print("Connection closed")

    def on_open(self, ws):
        print("Connected to transcription service")
        self.initialize_session()
        self.start_recording()

    def initialize_session(self):
        init_message = {
            "action": "send",
            "type": "init",
            "config": {
                "language": "en"
            }
        }

        self.ws.send(json.dumps(init_message))

    def start_recording(self):
        self.recording = True

        self.stream = self.audio.open(
            format=pyaudio.paFloat32,
            channels=1,
            rate=16000,
            input=True,
            frames_per_buffer=4096,
            stream_callback=self.audio_callback
        )

        self.stream.start_stream()

    def audio_callback(self, in_data, frame_count, time_info, status):
        if self.recording and self.ws:
            audio_data = np.frombuffer(in_data, dtype=np.float32)
            self.send_audio_frame(audio_data)

        return (in_data, pyaudio.paContinue)

    def send_audio_frame(self, audio_data):
        if not self.ws or self.ws.sock is None:
            return

        audio_bytes = audio_data.astype(np.float32).tobytes()
        base64_audio = base64.b64encode(audio_bytes).decode('utf-8')

        frame_message = {
            "action": "send",
            "type": "frame",
            "frame_seq": self.frame_seq,
            "audio_inline_b64": base64_audio
        }

        self.ws.send(json.dumps(frame_message))
        self.frame_seq += 1

    def stop_recording(self):
        self.recording = False
        if self.stream:
            self.stream.stop_stream()
            self.stream.close()

    def end_session(self):
        end_of_audio = 'END_OF_AUDIO'.encode('utf-8')
        base64_sentinel = base64.b64encode(end_of_audio).decode('utf-8')

        frame_msg = {
            "action": "send",
            "type": "frame",
            "frame_seq": self.frame_seq,
            "audio_inline_b64": base64_sentinel
        }
        self.ws.send(json.dumps(frame_msg))

    def connect(self):
        self.ws = websocket.WebSocketApp(
            self.api_endpoint,
            on_open=self.on_open,
            on_message=self.on_message,
            on_error=self.on_error,
            on_close=self.on_close
        )

        wst = threading.Thread(target=self.ws.run_forever)
        wst.daemon = True
        wst.start()

        return wst

# Usage example
if __name__ == "__main__":
    client = TranscriptionClient("wss://tl.shunyalabs.ai/")

    try:
        client.connect()

        # Keep running
        while True:
            time.sleep(1)

    except KeyboardInterrupt:
        print("Stopping...")
        client.stop_recording()
        client.end_session()`}
        />
      </div>
    </div>
  );
}
