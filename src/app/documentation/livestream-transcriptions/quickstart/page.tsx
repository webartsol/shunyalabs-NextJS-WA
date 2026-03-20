"use client";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FiCopy, FiCheck } from "react-icons/fi";
import MainFooter from "@/app/Layouts/MainFooter";

// ✅ A reusable CodeBlock component
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
            {/* Copy button */}
            <button
                onClick={handleCopy}
                className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 transition"
                title="Copy code"
            >
                {copied ? <FiCheck className="text-green-600 mt-2" /> : <FiCopy className="mt-2" />}
            </button>

            {/* Code block */}
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

export default function Quickstart() {
    return (
        <div className="min-h-screen bg-white rounded-2xl text-gray-800">

            <div className="max-w-5xl mx-auto py-6 leading-relaxed">
                <h1 className="text-3xl font-semibold mb-6">Quickstart</h1>
                <p className="mb-6">
                Convert live audio streams into accurate text transcriptions in real-time with sub-second latency.
                </p>

                {/* Overview */}
                <h3 className="text-xl font-semibold mt-8 mb-3">Overview</h3>
                <p className="mb-6">
                By the end of this tutorial, you'll be able to transcribe live audio streams using our WebSocket API.
                </p>

                {/* Get Your API Key */}
                <h3 className="text-xl font-semibold mb-3">Get Your API Key</h3>
                <p className="mb-2">To use ShunyaLabs ASR API, you'll need an API key.</p>
                <ol className="list-decimal list-inside space-y-1 mb-8">
                    <li>
                    Contact our team at {" "}
                        <a
                            href="mailto:api@shunyalabs.ai"
                            className="text-blue-500 font-medium"
                        >
                            api@shunyalabs.ai
                        </a>
                    </li>
                    <li>Request API access for your use case</li>
                    <li>Receive your unique API key via email</li>
                    <li>Start transcribing immediately</li>
                </ol>

                {/* JavaScript/Browser Example */}
                <h3 className="text-2xl font-semibold mb-4">JavaScript/Browser Example</h3>
                <p className="mb-4">
                Real-time transcription for web applications.
                </p>

                <h4 className="font-semibold mb-2">Step 1: Establish WebSocket connection</h4>
                <CodeBlock language="javascript" code={`// Connect to the transcription service
const ws = new WebSocket('wss://tl.shunyalabs.ai/');

ws.onopen = () => {
    console.log('Connected to transcription service');
};

ws.onmessage = (event) => {
    const result = JSON.parse(event.data);
    console.log('Transcription:', result);
};

ws.onerror = (error) => {
    console.error('WebSocket error:', error);
};

ws.onclose = () => {
    console.log('Connection closed');
};
`} />

                <h4 className="font-semibold mt-6 mb-2">Step 2: Initialize transcription session</h4>
                <CodeBlock
                    language="javascript"
                    code={`// Send initialization message
ws.send(JSON.stringify({
    action: 'send',
    type: 'init',
    config: {
        language: 'en',
        api_key: 'YOUR_API_KEY_HERE'
    }
}));`}
                />

                <h4 className="font-semibold mt-6 mb-2">Step 3: Send audio data</h4>
                <CodeBlock
                    language="javascript"
                    code={`let frameCounter = 0;

function sendAudioChunk(audioBuffer) {
    const base64Audio = arrayBufferToBase64(audioBuffer);
    
    ws.send(JSON.stringify({
        action: 'send',
        type: 'frame',
        frame_seq: frameCounter++,
        audio_inline_b64: base64Audio,
        dtype: 'float32',
        channels: 1,
        sr: 16000
    }));
}

// Helper function to convert ArrayBuffer to Base64
function arrayBufferToBase64(buffer) {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}`}
                />

<h4 className="font-semibold mt-6 mb-2">Step 4: End the stream</h4>
                <CodeBlock
                    language="javascript"
                    code={`// Signal end of audio stream
const eos = btoa('END_OF_AUDIO');
ws.send(JSON.stringify({
    action: 'send',
    type: 'frame',
    frame_seq: frameCounter++,
    audio_inline_b64: eos,
    dtype: 'float32',
    channels: 1,
    sr: 16000
}));`}
                />

<h4 className="font-semibold mt-6 mb-2">Step 5: View your results</h4>
                <CodeBlock
                    language="javascript"
                    code={`ws.onmessage = (event) => {
    const result = JSON.parse(event.data);
    
    if (result.segments) {
        result.segments.forEach(segment => {
            console.log(\`[\${segment.start}s - \${segment.end}s]: \${segment.text}\`);
        });
    }
};`}
                />
           

                {/* Python Example */}
                <h3 className="text-2xl font-semibold mt-10 mb-3">Python Example</h3>
                <p className="mb-6">
                Real-time transcription for backend and scripting use cases.
                </p>

                <h4 className="font-semibold mb-2">Step 1: Install websockets</h4>
                <CodeBlock language="bash" code={`pip install websocket-client`} />

                <h4 className="font-semibold mt-6 mb-2">Step 2: Connect and transcribe</h4>
                <CodeBlock
                    language="python"
                    code={`import websocket
import json
import base64

# Connect to service
ws = websocket.WebSocket()
ws.connect("wss://tl.shunyalabs.ai/")

# Initialize session
init_message = {
    "action": "send",
    "type": "init",
    "config": {
        "language": "en",
        "api_key": "YOUR_API_KEY_HERE"
    }
}
ws.send(json.dumps(init_message))

# Send audio frame
frame_seq = 0
audio_bytes = b'...'  # Your audio data as bytes
base64_audio = base64.b64encode(audio_bytes).decode('utf-8')

frame_message = {
    "action": "send",
    "type": "frame",
    "frame_seq": frame_seq,
    "audio_inline_b64": base64_audio,
    "dtype": "float32",
    "channels": 1,
    "sr": 16000
}
ws.send(json.dumps(frame_message))

# Receive transcription
response = ws.recv()
result = json.loads(response)
print(result)`}
                />

<h4 className="font-semibold mb-2">Step 3: End the stream</h4>
<CodeBlock language="python" code={`# Send END_OF_AUDIO sentinel
end_of_audio = base64.b64encode(b'END_OF_AUDIO').decode('utf-8')

end_message = {
    "action": "send",
    "type": "frame",
    "frame_seq": frame_seq + 1,
    "audio_inline_b64": end_of_audio,
    "dtype": "float32",
    "channels": 1,
    "sr": 16000
}
ws.send(json.dumps(end_message))
ws.close()`} />

                
            </div>
        </div>
    );
}
