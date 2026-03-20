"use client";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FiCopy, FiCheck } from "react-icons/fi";
import Navbar from "@/app/Layouts/Navbar";

function CodeBlock({ language, code }: { language: string; code: string }) {
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
        {copied ? <FiCheck className="text-green-600 mt-2" /> : <FiCopy className="mt-2"/>}
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

export default function TroubleshootingPage() {
  return (
    <div className="min-h-screen bg-white rounded-2xl text-gray-800">
      <div className="max-w-5xl mx-auto py-6 leading-relaxed">
        <h1 className="text-3xl font-bold mb-8">Troubleshooting</h1>

        <h2 className="text-2xl font-bold mb-4">Common Issues</h2>

        {/* Connection Problems */}
        <h3 className="text-xl font-bold mb-2">Connection Problems</h3>
        <p className="font-bold mb-2">Error message:</p>
        <CodeBlock
          language=""
          code={`WebSocket connection failed`}
        />

        <p className="font-bold mt-4 mb-1">Solutions:</p>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>Verify the API endpoint URL is correct: <code className="font-mono text-orange-600 bg-black/10 px-1 rounded text-xs">wss://tl.shunyalabs.ai/</code></li>
          <li>Check network connectivity and firewall settings</li>
          <li>Ensure WebSocket support in your environment</li>
          <li>Test with a simple WebSocket connection first</li>
        </ul>
        <p className="font-bold mb-2">Implement reconnection logic:</p>
        <CodeBlock
          language="javascript"
          code={`function connectWithRetry(retries = 5, delay = 1000) {
  const ws = new WebSocket('wss://tl.shunyalabs.ai/');

  ws.onerror = (error) => {
    if (retries > 0) {
      setTimeout(() => {
        console.log(\`Retrying... (\${retries} attempts left)\`);
        connectWithRetry(retries - 1, delay * 2);
      }, delay);
    }
  };

  return ws;
}`}
        />

        {/* Audio Quality Issues */}
        <h3 className="text-xl font-bold mt-8 mb-2">
        Audio Quality Issues
        </h3>
        <p className="font-bold mb-2">Problem: Poor transcription accuracy</p>

        <p className="font-bold mt-3 mb-1">Solutions:</p>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li>Verify audio format matches requirements (Float32, 16kHz, mono)</li>
          <li>Check audio levels (not too quiet or clipping)</li>
          <li>Reduce background noise</li>
          <li>Use 200-300ms chunk sizes</li>
          <li>Set correct <code className="font-mono text-orange-600 bg-black/10 px-1 rounded text-xs">language</code> parameter</li>
        </ul>
        <p className="font-bold mb-2">Problem: Audio sounds distorted</p>

        <p className="font-bold mt-3 mb-1">Solutions:</p>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li>Confirm Float32 little-endian encoding</li>
          <li>Verify Base64 encoding is correct</li>
          <li>Check sample rate is 16000 Hz</li>
          <li>Ensure mono channel audio (not stereo)</li>
        </ul>

        {/* Performance Issues */}
        <h3 className="text-xl font-bold mt-8 mb-2">
        Performance Issues
        </h3>
        <p className="font-bold mb-2">Problem: High latency</p>

        <p className="font-bold mt-3 mb-1">Solutions:</p>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li>Send smaller audio chunks (200-300ms)</li>
          <li>Check network latency to API endpoint</li>
          <li>Don't buffer too much audio before sending</li>
          <li>Monitor frame sequence numbers for gaps</li>
        </ul>
        <p className="font-bold mb-2">Problem: Transcription lags behind speech</p>

        <p className="font-bold mt-3 mb-1">Solutions:</p>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li>Reduce chunk size to send more frequently</li>
          <li>Check system resources (CPU, memory)</li>
          <li>Monitor WebSocket buffer sizes</li>
        </ul>

        {/* Message Format Errors */}
        <h3 className="text-xl font-bold mt-8 mb-2">
        Message Format Errors
        </h3>
        <p className="font-bold mb-2">Problem: Messages rejected</p>

        <p className="font-bold mt-3 mb-1">Solutions:</p>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li>Ensure every message includes <code className="font-mono text-orange-600 bg-black/10 px-1 rounded text-xs">"action": "send"</code></li>
          <li>Verify JSON is properly formatted</li>
          <li>Check <code className="font-mono text-orange-600 bg-black/10 px-1 rounded text-xs">frame_seq</code> increments sequentially</li>
          <li>Confirm Base64 encoding is correct</li>
        </ul>
        <p className="font-bold mb-2">Problem: No transcription results</p>

        <p className="font-bold mt-3 mb-1">Solutions:</p>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li>Verify <code className="font-mono text-orange-600 bg-black/10 px-1 rounded text-xs">init</code> message was sent before frames</li>
          <li>Check audio data is not empty or corrupted</li>
          <li>Ensure audio contains actual speech (not silence)</li>
          <li>Monitor <code className="font-mono text-orange-600 bg-black/10 px-1 rounded text-xs">onmessage</code> handler is set up correctly</li>
        </ul>

        {/* Session Management */}
        <h3 className="text-xl font-bold mt-8 mb-2">
        Session Management
        </h3>
        <p className="font-bold mb-2">Problem: Session expires unexpectedly</p>

        <p className="font-bold mt-3 mb-1">Solutions:</p>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li>Implement keepalive pings for idle connections</li>
          <li>Monitor <code className="font-mono text-orange-600 bg-black/10 px-1 rounded text-xs">onclose</code> events</li>
          <li>Properly send END_OF_AUDIO sentinel when done</li>
        </ul>
        <p className="font-bold mb-2">Problem: Multiple sessions interfere</p>

        <p className="font-bold mt-3 mb-1">Solutions:</p>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li>Ensure one stream per WebSocket connection</li>
          <li>Close previous connections before starting new sessions</li>
        </ul>

        {/* HTTP Status Codes */}
        <h3 className="text-xl font-bold mt-8 mb-2">
        HTTP Status Codes
        </h3>
        <p className="mb-3">
        While WebSocket connections don't use traditional HTTP status codes, here are connection-related codes you may encounter:
        </p>
        <div className="overflow-x-auto mb-8">
                    <table className="border border-gray-300 text-sm">
                        <thead className="bg-gray-100 text-gray-800 font-semibold">
                            <tr>
                                <th className="border px-3 py-2 text-left">Code</th>
                                <th className="border px-3 py-2 text-left">Meaning</th>
                                <th className="border px-3 py-2 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ["1000", "Normal closure", "Session ended successfully"],
                                ["1006", "Abnormal closure", "Check connection and retry"],
                                ["1008", "Policy violation", "Verify message format and size"],
                                ["1011", "Server error", "Contact support"],
                            ].map(([f, t, d]) => (
                                <tr key={f}>
                                    <td className="border px-3 py-2">{f}</td>
                                    <td className="border px-3 py-2">{t}</td>
                                    <td className="border px-3 py-2">{d}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

        {/* Debugging Tips */}
        <h3 className="text-xl font-bold mt-8 mb-2">Debugging Tips</h3>
        <p className="font-bold mb-2">Enable detailed logging:</p>
        <CodeBlock language="javascript" code={`ws.onopen = () => console.log('Connected');
ws.onclose = (event) => console.log('Closed:', event.code, event.reason);
ws.onerror = (error) => console.error('Error:', error);
ws.onmessage = (event) => console.log('Received:', event.data);`} />

        <p className="font-bold mb-2">Test with sample audio first:</p>
        <CodeBlock language="python" code={`# Test with a known-good audio file first
# to verify your setup before using live audio`} />
<p className="font-bold mb-2">Validate audio format:</p>
        <CodeBlock language="python" code={`def check_audio_format(sample_rate, channels, dtype):
    if sample_rate != 16000:
        print(f"Warning: Sample rate is {sample_rate}Hz, expected 16000Hz")

    if channels != 1:
        print(f"Warning: {channels} channels detected, expected mono (1)")

    if dtype != np.float32:
        print(f"Warning: Data type is {dtype}, expected float32")`} />

      </div>
    </div>
  );
}
