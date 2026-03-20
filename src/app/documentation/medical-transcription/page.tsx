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

export default function MedicalTranscription() {
    return (
        <div className="min-h-screen bg-white rounded-2xl text-gray-800">

            <div className="max-w-5xl mx-auto py-6 leading-relaxed">
                <h1 className="text-3xl font-semibold mb-6">Zero STT Med - Batch Transcription Documentation</h1>
                <p className="font-bold">Medical-grade Speech-to-Text powered by ShunyaLabs</p>
                <p className="mb-6">
                Zero Med is our domain-specific speech recognition model optimized for medical transcription, 
                offering superior accuracy for medical terminology, procedures, and clinical documentation.
                </p>

                <h2 className="text-2xl font-semibold mb-3">
                Prerequisites
                </h2>
                
                <ul className="list-disc list-inside space-y-1 mb-8">
                    <li>Python 3.8 or higher</li>
                    <li>Valid API key (contact api@shunyalabs.ai to get your unique API key)</li>
                    <li>Audio files in supported formats (WAV, MP3, M4A, FLAC, OGG, AAC, WMA, MP4, MKV, MOV, AVI, WebM)</li>
                </ul>
                <p className="font-bold">Installation:</p>
                <CodeBlock language="bash" code={`pip install requests`} />
                <h3 className="text-2xl font-semibold mb-4">Input - REST API</h3>
                <CodeBlock language="python" code={`import requests


url = "https://tb.shunyalabs.ai/transcribe"
headers = {"X-API-Key": YOUR_API_KEY}

with open(your_audio_file, "rb") as your_audio_file:
    files = {"file": your_audio_file}
    data = {
        "language_code": "med-en",
        "enable_diarization": "true"
    }

    response = requests.post(url, headers=headers, files=files, data=data)
    result = response.json()

print(result["text"])
`} />

<h3 className="text-2xl font-semibold mb-4">Input - cURL</h3>
                <CodeBlock
                    language="bash"
                    code={`curl -X POST "https://tb.shunyalabs.ai/transcribe" \\
  -H "X-API-Key: <YOUR_API_KEY>" \\
  -F "file=@your_audio_file.wav" \\
  -F "language_code=med-en" \\
  -F "enable_diarization=true"
`}
                />           

<h3 className="text-2xl font-semibold mb-4">File Size Limits</h3>
<p><strong>Maximum file size:</strong> 30 MB</p>
<p><strong>For files larger than 30MB:</strong> Split audio into smaller segments before processing.</p>
<h3 className="text-2xl font-semibold mb-4">Parameters</h3>
<div className="overflow-x-auto mb-8">
          <table className="border border-gray-300 text-sm">
            <thead className="bg-gray-100 text-gray-800 font-semibold">
              <tr>
                <th className="border px-3 py-2 text-left">Parameter</th>
                <th className="border px-3 py-2 text-left">Value</th>
                <th className="border px-3 py-2 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-3 py-2 font-mono text-orange-600">
                <code className="font-mono text-orange-600 bg-black/10 px-1 rounded">--audio-file</code>
                </td>
                <td className="border px-3 py-2 font-mono text-orange-600">
                <code className="font-mono text-orange-600 bg-black/10 px-1 rounded">&lt;your_audio_file&gt;</code>
                </td>
                <td className="border px-3 py-2">Path to your audio file</td>
              </tr>
              <tr>
                <td className="border px-3 py-2 font-mono text-orange-600">
                <code className="font-mono text-orange-600 bg-black/10 px-1 rounded">--language-code</code>
                </td>
                <td className="border px-3 py-2 font-mono text-orange-600">
                <code className="font-mono text-orange-600 bg-black/10 px-1 rounded">med-en</code>
                </td>
                <td className="border px-3 py-2">
                Use <code className="font-mono text-orange-600 bg-black/10 px-1 rounded">med-en</code>for Zero Med model
                </td>
              </tr>
              <tr>
                <td className="border px-3 py-2 font-mono text-orange-600">
                <code className="font-mono text-orange-600 bg-black/10 px-1 rounded">--api-key</code>
                </td>
                <td className="border px-3 py-2 font-mono text-orange-600">
                <code className="font-mono text-orange-600 bg-black/10 px-1 rounded">&lt;YOUR_API_KEY&gt;</code>
                </td>
                <td className="border px-3 py-2">Your authentication key</td>
              </tr>
              <tr>
                <td className="border px-3 py-2 font-mono text-orange-600">
                <code className="font-mono text-orange-600 bg-black/10 px-1 rounded">--api-url</code>
                </td>
                <td className="border px-3 py-2 font-mono text-orange-600">
                <code className="font-mono text-orange-600 bg-black/10 px-1 rounded">https://tb.shunyalabs.ai</code>
                </td>
                <td className="border px-3 py-2">API endpoint</td>
              </tr>
              <tr>
                <td className="border px-3 py-2 font-mono text-orange-600">
                <code className="font-mono text-orange-600 bg-black/10 px-1 rounded">--enable-diarization</code>
                </td>
                <td className="border px-3 py-2 font-mono text-orange-600">
                <code className="font-mono text-orange-600 bg-black/10 px-1 rounded">True (optional)</code>
                </td>
                <td className="border px-3 py-2">Speaker identification</td>
              </tr>
            </tbody>
          </table>
        </div>

                <h3 className="text-2xl font-semibold mt-10 mb-3">Output</h3>
                <p>
                The API returns a JSON response with the transcription:
                </p>
                <p><em>Note: segments appear only when enable_diarization parameter is set to true</em></p>
                <CodeBlock
                    language="json"
                    code={`{
  "success": true,
  "text": "Patient presents with acute onset chest pain radiating to left arm. History of hypertension and diabetes mellitus type 2.",
  "segments": [
    {
      "start": 0.0,
      "end": 5.2,
      "text": "Patient presents with acute onset chest pain radiating to left arm.",
      "speaker": "SPEAKER_00"
    },
    {
      "start": 5.5,
      "end": 9.8,
      "text": "History of hypertension and diabetes mellitus type 2.",
      "speaker": "SPEAKER_00"
    }
  ],
  "total_segments": 2,
  "filename": "your_audio_file.wav",
  "unique_speakers": ["SPEAKER_00"]
}
`}
                />
                <h4 className="text-xl font-semibold mt-10 mb-3">Relevant Response Fields</h4>
                <div className="overflow-x-auto mb-8">
          <table className="border border-gray-300 text-sm">
            <thead className="bg-gray-100 text-gray-800 font-semibold">
              <tr>
                <th className="border px-3 py-2 text-left">Field</th>
                <th className="border px-3 py-2 text-left">Type</th>
                <th className="border px-3 py-2 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-3 py-2 font-mono text-orange-600">
                <code className="font-mono text-orange-600 bg-black/10 px-1 rounded">success</code>
                </td>
                <td className="border px-3 py-2">boolean</td>
                <td className="border px-3 py-2">Whether transcription succeeded</td>
              </tr>
              <tr>
                <td className="border px-3 py-2 font-mono text-orange-600">
                <code className="font-mono text-orange-600 bg-black/10 px-1 rounded">text</code>
                </td>
                <td className="border px-3 py-2">string</td>
                <td className="border px-3 py-2">Complete transcription text</td>
              </tr>
              <tr>
                <td className="border px-3 py-2 font-mono text-orange-600">
                <code className="font-mono text-orange-600 bg-black/10 px-1 rounded">segments</code>
                </td>
                <td className="border px-3 py-2">array</td>
                <td className="border px-3 py-2">
                Timestamped segments with speaker labels—these appear only when enable_diarization parameter is set to true
                </td>
              </tr>
              <tr>
                <td className="border px-3 py-2 font-mono text-orange-600">
                <code className="font-mono text-orange-600 bg-black/10 px-1 rounded">total_segments</code>
                </td>
                <td className="border px-3 py-2">integer</td>
                <td className="border px-3 py-2">
                Number of transcribed segments
                </td>
              </tr>
              <tr>
                <td className="border px-3 py-2 font-mono text-orange-600">
                <code className="font-mono text-orange-600 bg-black/10 px-1 rounded">filename</code>
                </td>
                <td className="border px-3 py-2">string</td>
                <td className="border px-3 py-2">
                Original filename
                </td>
              </tr>
              <tr>
                <td className="border px-3 py-2 font-mono text-orange-600">
                <code className="font-mono text-orange-600 bg-black/10 px-1 rounded">unique_speakers</code>
                </td>
                <td className="border px-3 py-2">array</td>
                <td className="border px-3 py-2">
                List of speaker IDs found—these appear only when enable_diarization parameter is set to true
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <h4 className="text-xl font-semibold mt-10 mb-3">Segment Object</h4>
        <p>Each segment in the <code className="font-mono text-orange-600 bg-black/10 px-1 rounded">segments</code> array contains:</p>
        <p><em>Note: segments appear only when enable_diarization parameter is set to true</em></p>
        <div className="overflow-x-auto mb-8">
          <table className="border border-gray-300 text-sm">
            <thead className="bg-gray-100 text-gray-800 font-semibold">
              <tr>
                <th className="border px-3 py-2 text-left">Field</th>
                <th className="border px-3 py-2 text-left">Type</th>
                <th className="border px-3 py-2 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-3 py-2 font-mono text-orange-600">
                <code className="font-mono text-orange-600 bg-black/10 px-1 rounded">start</code>
                </td>
                <td className="border px-3 py-2">float</td>
                <td className="border px-3 py-2">Start time in seconds</td>
              </tr>
              <tr>
                <td className="border px-3 py-2 font-mono text-orange-600">
                <code className="font-mono text-orange-600 bg-black/10 px-1 rounded">end</code>
                </td>
                <td className="border px-3 py-2">float</td>
                <td className="border px-3 py-2">End time in seconds</td>
              </tr>
              <tr>
                <td className="border px-3 py-2 font-mono text-orange-600">
                <code className="font-mono text-orange-600 bg-black/10 px-1 rounded">text</code>
                </td>
                <td className="border px-3 py-2">string</td>
                <td className="border px-3 py-2">
                Transcribed text for this segment
                </td>
              </tr>
              <tr>
                <td className="border px-3 py-2 font-mono text-orange-600">
                <code className="font-mono text-orange-600 bg-black/10 px-1 rounded">speaker</code>
                </td>
                <td className="border px-3 py-2">string</td>
                <td className="border px-3 py-2">
                Speaker identifier (e.g., SPEAKER_00)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <h4 className="text-xl font-semibold mt-10 mb-3">Working with Results</h4>
        <p><strong>Extract full transcript:</strong></p>
        <CodeBlock
                    language="python"
                    code={`result = transcribe_file("your_audio_file.wav", YOUR_API_KEY)
full_text = result["text"]
print(full_text)
`}
                />   
                <p><strong>Process segments with timestamps:</strong></p>
        <CodeBlock
                    language="python"
                    code={`for segment in result["segments"]:
    print(f"[{segment['start']:.2f}s - {segment['end']:.2f}s] {segment['speaker']}: {segment['text']}")
`}
                />
                <p className="mb-2"><em>Note: segments appear only when enable_diarization parameter is set to true</em></p>
                <p><strong>Identify unique speakers:</strong></p>
        <CodeBlock
                    language="python"
                    code={`speakers = result["unique_speakers"]
print(f"Found {len(speakers)} speakers: {', '.join(speakers)}")
`}
                />
                <p className="mb-2"><em>Note: unique_speakers appear only when enable_diarization parameter is set to true</em></p>
                <h3 className="text-2xl font-semibold mt-10 mb-3">Troubleshooting</h3>
                <div className="overflow-x-auto mb-8">
          <table className="border border-gray-300 text-sm">
            <thead className="bg-gray-100 text-gray-800 font-semibold">
              <tr>
                <th className="border px-3 py-2 text-left">Issue</th>
                <th className="border px-3 py-2 text-left">Cause</th>
                <th className="border px-3 py-2 text-left">Solution</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-3 py-2 font-semibold">
                HTTP 400: Bad Request
                </td>
                <td className="border px-3 py-2">Invalid parameters</td>
                <td className="border px-3 py-2">Verify <code className="font-mono text-orange-600 bg-black/10 px-1 rounded">language_code=med-en</code></td>
              </tr>
              <tr>
                <td className="border px-3 py-2 font-semibold">
                HTTP 401: Unauthorized
                </td>
                <td className="border px-3 py-2">Invalid API key</td>
                <td className="border px-3 py-2">Check authentication credentials</td>
              </tr>
              <tr>
                <td className="border px-3 py-2 font-semibold">
                HTTP 413: File Too Large
                </td>
                <td className="border px-3 py-2">Exceeds 30 MB limit</td>
                <td className="border px-3 py-2">
                Split file into smaller segments
                </td>
              </tr>
              <tr>
                <td className="border px-3 py-2 font-semibold">
                HTTP 500: Internal Error
                </td>
                <td className="border px-3 py-2">Server-side issue</td>
                <td className="border px-3 py-2">
                Contact support with error details
                </td>
              </tr>
              <tr>
                <td className="border px-3 py-2 font-semibold">
                Connection Timeout
                </td>
                <td className="border px-3 py-2">Network/server problem</td>
                <td className="border px-3 py-2">
                Verify connectivity and retry
                </td>
              </tr>
              <tr>
                <td className="border px-3 py-2 font-semibold">
                SSL Certificate Error
                </td>
                <td className="border px-3 py-2">HTTPS certificate issue</td>
                <td className="border px-3 py-2">
                Script handles automatically
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <h4 className="text-xl font-semibold mt-10 mb-3">Best Practices</h4>
        <ul className="list-decimal list-inside space-y-1 mb-8">
            <li>Always specify <code className="font-mono text-orange-600 bg-black/10 px-1 rounded">language_code=med-en</code> to use the Zero STT Med model</li>
            <li>Split files larger than 30MB into smaller segments before processing</li>
            <li>Enable diarization for multi-speaker clinical discussions</li>
            </ul>
            <p><strong>Model:</strong> Zero STT Med | Optimized for: Medical terminology, procedures, and clinical documentation</p>
            </div>
        </div>
    );
}
