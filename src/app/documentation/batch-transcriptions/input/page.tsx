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

        {/* Supported Audio Formats */}
        <h2 className="text-2xl font-semibold mb-3">Supported Audio Formats</h2>
        <p className="mb-4">
          ShunyaLabs accepts a wide range of audio and video formats:
        </p>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li>
            <b>Audio:</b> WAV, MP3, M4A, FLAC, OGG, AAC, WMA
          </li>
          <li>
            <b>Video:</b> MP4, MKV, MOV, AVI, WebM (audio track will be extracted)
          </li>
        </ul>

        {/* File Size Limits */}
        <h2 className="text-2xl font-semibold mb-3">File Size Limits</h2>
        <ul className="list-disc list-inside mb-2">
          <li>
            <b>Maximum file size:</b> 10 MB
          </li>
          <li>
            Files larger than 10 MB will be rejected with a{" "}
            <code className="bg-gray-200 text-red-600 px-1 rounded">413</code>{" "}
            error.
          </li>
        </ul>

        <p className="font-semibold mt-3 mb-1">
          Need to transcribe larger files? Consider:
        </p>
        <ul className="list-disc list-inside mb-8 space-y-1">
          <li>Splitting your audio into smaller segments</li>
          <li>Reducing the bitrate or sample rate</li>
          <li>Converting to a more compressed format like MP3</li>
        </ul>

        {/* Request Parameters */}
        <h2 className="text-2xl font-semibold mb-4">Request Parameters</h2>
        <div className="overflow-x-auto mb-8">
          <table className="w-full border border-gray-300 text-sm">
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
                  file
                </td>
                <td className="border px-3 py-2">file</td>
                <td className="border px-3 py-2">Required</td>
                <td className="border px-3 py-2">
                  Your audio or video file
                </td>
              </tr>
              <tr>
                <td className="border px-3 py-2 font-mono text-orange-600">
                  language_code
                </td>
                <td className="border px-3 py-2">string</td>
                <td className="border px-3 py-2 text-gray-600">auto</td>
                <td className="border px-3 py-2">
                  Target language for transcription
                </td>
              </tr>
              <tr>
                <td className="border px-3 py-2 font-mono text-orange-600">
                  output_script
                </td>
                <td className="border px-3 py-2">string</td>
                <td className="border px-3 py-2 text-gray-600">auto</td>
                <td className="border px-3 py-2">
                  Writing script for output text
                </td>
              </tr>
              <tr>
                <td className="border px-3 py-2 font-mono text-orange-600">
                  chunk_size
                </td>
                <td className="border px-3 py-2">integer</td>
                <td className="border px-3 py-2 text-gray-600">120</td>
                <td className="border px-3 py-2">
                  Processing chunk size in seconds (60, 120, or 180)
                </td>
              </tr>
              <tr>
                <td className="border px-3 py-2 font-mono text-orange-600">
                  enable_diarization
                </td>
                <td className="border px-3 py-2">boolean</td>
                <td className="border px-3 py-2 text-gray-600">true</td>
                <td className="border px-3 py-2">
                  Identify different speakers in the audio
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Language Codes */}
        <h2 className="text-2xl font-semibold mb-3">Language Codes and Output Scripts</h2>
        <p className="mb-2">
          See the full list of supported languages for <Link className="text-blue-500" href='/documentation/languages'>audio language detection.</Link>
        </p>
        <p className="mb-8">
          See the full list of supported languages for <Link className="text-blue-500" href='/documentation/scripts'>output script.</Link>
        </p>

        {/* Chunk Size */}
        <h2 className="text-2xl font-semibold mb-3">Chunk Size</h2>
        <p className="mb-2">Controls how audio is processed internally:</p>
        <ul className="list-disc list-inside mb-8 space-y-1">
          <li>
            <b>60 seconds:</b> Faster processing, suitable for short clips
          </li>
          <li>
            <b>120 seconds:</b> Balanced speed and accuracy (recommended)
          </li>
          <li>
            <b>180 seconds:</b> Best accuracy for longer continuous speech
          </li>
        </ul>

        {/* REST API Example */}
        <h2 className="text-2xl font-semibold mb-4">REST API Complete Example</h2>
        <CodeBlock
          language="python"
          code={`import requests

def transcribe_file(audio_path, api_key):
    """Transcribe an audio file with custom parameters."""
    url = "https://tb.shunyalabs.ai/transcribe"
    headers = {"X-API-Key": api_key}

    with open(audio_path, "rb") as audio_file:
        files = {"file": audio_file}
        data = {
            "language_code": "hi",
            "output_script": "Devanagari",
            "chunk_size": 120,
            "enable_diarization": "true"
        }

        response = requests.post(url, headers=headers, files=files, data=data)
        if response.status_code == 200:
            return response.json()
        else:
            raise Exception(f"Error: {response.status_code}, {response.text}")

# Example usage
result = transcribe_file("hindi_audio.wav", "your_api_key_here")
print(result["text"])`}
        />

        {/* WebSocket Example */}
        <h2 className="text-2xl font-semibold mt-10 mb-4">
          WebSocket Complete Example
        </h2>
        <CodeBlock
          language="python"
          code={`import asyncio
import websockets
import base64
import json
import os

async def transcribe_websocket(audio_path, api_key):
    """Transcribe via WebSocket with file size checking."""
    file_size_mb = os.path.getsize(audio_path) / (1024 * 1024)
    if file_size_mb > 10:
        raise ValueError(f"File size {file_size_mb:.2f} MB exceeds 10 MB limit")

    uri = "wss://tb.shunyalabs.ai/ws"
    async with websockets.connect(uri) as websocket:
        with open(audio_path, "rb") as audio_file:
            audio_data = base64.b64encode(audio_file.read()).decode()

        request = {
            "api_key": api_key,
            "audio": audio_data,
            "language_code": "auto",
            "chunk_size": 120,
            "enable_diarization": True,
            "output_script": "auto"
        }

        await websocket.send(json.dumps(request))
        response = await websocket.recv()
        result = json.loads(response)
        print(result["text"])

# Example usage
asyncio.run(transcribe_websocket("sample.wav", "your_api_key_here"))`}
        />
      </div>
    </div>
  );
}
