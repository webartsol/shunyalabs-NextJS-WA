"use client";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FiCopy, FiCheck } from "react-icons/fi";
import MainFooter from "@/app/Layouts/MainFooter";
import type { Metadata } from "next";


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
                    Convert your audio files into accurate text transcriptions with support
                    for <b>200+ languages</b> and <b>speaker diarization</b>.
                </p>

                <h2 className="text-2xl font-semibold mb-3">
                    Transcribe a pre-recorded audio file
                </h2>

                {/* Overview */}
                <h3 className="text-xl font-semibold mt-8 mb-3">Overview</h3>
                <p className="mb-6">
                    By the end of this tutorial, you’ll be able to transcribe an audio file
                    using REST and WebSocket APIs.
                </p>

                {/* Get Your API Key */}
                <h3 className="text-xl font-semibold mb-3">Get Your API Key</h3>
                <p className="mb-2">To use the ShunyaLabs ASR API, you'll need an API key.</p>
                <ol className="list-decimal list-inside space-y-1 mb-8">
                    <li>
                        Contact{" "}
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

                {/* REST API */}
                <h3 className="text-2xl font-semibold mb-4">REST API</h3>
                <p className="mb-4">
                    The REST API provides a simple interface for batch transcription.
                </p>

                <h4 className="font-semibold mb-2">Step 1: Install the requests library</h4>
                <CodeBlock language="bash" code={`pip install requests`} />

                <h4 className="font-semibold mt-6 mb-2">Step 2: Transcribe your audio file</h4>
                <CodeBlock
                    language="python"
                    code={`import requests

url = "https://tb.shunyalabs.ai/transcribe"
headers = {"X-API-Key": "your_api_key_here"}

with open("your_audio.wav", "rb") as audio_file:
    files = {"file": audio_file}
    data = {
        "language_code": "en"
    }

    response = requests.post(url, headers=headers, files=files, data=data)
    result = response.json()

print(result["text"])`}
                />

                <h4 className="font-semibold mt-6 mb-2">Step 3: View the response</h4>
                <CodeBlock
                    language="json"
                    code={`{
  "success": true,
  "text": "Hello, this is your transcribed text.",
  "detected_language": "English",
  "total_time": 2.34
}`}
                />



                {/* WebSocket API */}
                <h3 className="text-2xl font-semibold mt-10 mb-3">WebSocket API</h3>
                <p className="mb-6">
                    The WebSocket API provides a persistent connection for faster
                    transcription and real-time processing feedback.
                </p>

                <h4 className="font-semibold mb-2">Step 1: Install dependencies</h4>
                <CodeBlock language="bash" code={`pip install websockets`} />

                <h4 className="font-semibold mt-6 mb-2">Step 2: Connect and send audio</h4>
                <CodeBlock
                    language="python"
                    code={`import asyncio
import websockets
import base64
import json

async def transcribe_audio():
    uri = "wss://tb.shunyalabs.ai/ws"
    async with websockets.connect(uri) as websocket:
        config = {
            "api_key": "your_api_key_here",
            "language_code": "en"
        }

        with open("your_audio.wav", "rb") as audio_file:
            audio_data = base64.b64encode(audio_file.read()).decode()

        message = json.dumps({"config": config, "audio": audio_data})
        await websocket.send(message)

        response = await websocket.recv()
        result = json.loads(response)
        print(result["text"])

asyncio.run(transcribe_audio())`}
                />

                {/* Using cURL */}
                <h3 className="text-2xl font-semibold mt-10 mb-3">Using cURL</h3>
                <p className="mb-4">
                    You can also quickly test your transcription without writing any code:
                </p>
                <CodeBlock
                    language="bash"
                    code={`curl -X POST "https://tb.shunyalabs.ai/transcribe" \\
-H "X-API-Key: your_api_key_here" \\
-F "file=@your_audio.wav" \\
-F "language_code=en" \\`
                    }
                />
            </div>
        </div>
    );
}