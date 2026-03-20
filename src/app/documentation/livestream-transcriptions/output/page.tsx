"use client";
import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FiCopy, FiCheck } from "react-icons/fi";

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

export default function OutputPage() {
    return (
        <div className="min-h-screen bg-white rounded-2xl text-gray-800">
            <div className="max-w-5xl mx-auto py-6 leading-relaxed">
                <h1 className="text-3xl font-semibold mb-6">Output</h1>

                {/* Response Format */}
                <h2 className="text-2xl font-semibold mb-3">Response Format</h2>
                <p className="mb-6">
                The API returns JSON objects containing transcription results in real-time.
                </p>

                {/* Success Response */}
                <h2 className="text-2xl font-semibold mb-3">Success Response</h2>
                <h2 className="text-2xl font-semibold mb-3">Complete Segment</h2>
                <CodeBlock
                    language="json"
                    code={`{
  "uid": "client-identifier",
  "segments": [
    {
      "start": "0.000",
      "end": "2.500",
      "text": "Hello world, this is a test.",
      "completed": true,
      "segment_id": "seg_001",
      "rev": 1
    }
  ],
  "language": "en",
  "language_probability": 0.95
}`}
                />

                {/* Partial Segment */}
                <h2 className="text-2xl font-semibold mb-3">Partial Segment</h2>
                <CodeBlock
                    language="json"
                    code={`{
  "uid": "client-identifier",
  "segments": [
    {
      "start": "0.000",
      "end": "1.200",
      "text": "Hello",
      "completed": false,
      "segment_id": "seg_001",
      "rev": 1
    }
  ]
}`}
                />

                {/* Response Fields */}
                <h2 className="text-2xl font-semibold mt-8 mb-4">Response Fields</h2>
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
                            {([
                                ["uid", "string", "Client identifier for the session"],
                                ["segments", "array", "Array of transcription segments"],
                                ["segments[].start", "string", "Start time in seconds (3 decimal places)"],
                                ["segments[].end", "string", "End time in seconds (3 decimal places)"],
                                [
                                    "segments[].text",
                                    "string",
                                    "Transcribed text content",
                                ],
                                [
                                    "segments[].completed",
                                    "boolean",
                                    (
                                        <>
                                            <code className="font-mono text-orange-600 bg-black/10 px-1 rounded">true</code> if segment is finalized,&nbsp;
                                            <code className="font-mono text-orange-600 bg-black/10 px-1 rounded">false</code> if still processing
                                        </>
                                    ),
                                ],
                                ["segments[].segment_id", "string", "Unique identifier for this segment"],
                                ["segments[].rev", "integer", "Revision number (increments with updates)"],
                                ["language", "string", "Detected or specified language code"],
                                ["language_probability", "float", "Confidence score for language detection (0-1)"],
                            ] as Array<[string, string, React.ReactNode]>)
                                .map(([f, t, d]) => (
                                <tr key={String(f)}>
                                    <td className="border px-3 py-2 font-mono text-orange-600"><code className="font-mono text-orange-600 bg-black/10 px-1 rounded">{f}</code></td>
                                    <td className="border px-3 py-2">{t}</td>
                                    <td className="border px-3 py-2">{d}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Understanding Segment Updates */}
                <h2 className="text-2xl font-semibold mb-4">Understanding Segment Updates</h2>
                <p className="mb-3">
                You'll receive transcription results in real-time as the audio is processed:
                </p>
                <ul className="list-disc list-inside mb-6 space-y-1">
          <li>
            <b>Partial segments </b>(<code className="font-mono text-orange-600 bg-black/10 px-1 rounded text-xs">completed: false</code>) as speech is being processed
          </li>
          <li>
            <b>Complete segments </b>(<code className="font-mono text-orange-600 bg-black/10 px-1 rounded text-xs">completed: true</code>) when speech boundaries are detected
          </li>
          <li>
            <b>Updated segments </b>with the same <code className="font-mono text-orange-600 bg-black/10 px-1 rounded text-xs">segment_id</code> but higher <code className="font-mono text-orange-600 bg-black/10 px-1 rounded text-xs">rev</code> number if corrections are made
          </li>
        </ul>
        <h4 className="font-bold mb-2">Example flow:</h4>
                <CodeBlock
                    language="javascript"
                    code={`// First update (partial)
{ "segment_id": "seg_001", "text": "Hello", "completed": false, "rev": 1 }

// Second update (still partial, more text)
{ "segment_id": "seg_001", "text": "Hello world", "completed": false, "rev": 2 }

// Final update (complete)
{ "segment_id": "seg_001", "text": "Hello world", "completed": true, "rev": 3 }`}
                />
                {/* Working with Results */}
                <h2 className="text-2xl font-semibold mb-5">Working with Results</h2>

                <h4 className="font-bold mb-2">Display only completed segments:</h4>
                <CodeBlock
                    language="python"
                    code={`def on_message(ws, message):
    result = json.loads(message)

    if result.get('segments'):
        for segment in result['segments']:
            if segment['completed']:
                print(f"[{segment['start']}s - {segment['end']}s]: {segment['text']}")`}
                />

                <h4 className="font-bold mt-6 mb-2">Track segment revisions:</h4>
                <CodeBlock
                    language="javascript"
                    code={`const segments = new Map();

function handleResult(result) {
    if (result.segments) {
        result.segments.forEach(segment => {
            const existing = segments.get(segment.segment_id);

            if (!existing || segment.rev > existing.rev) {
                segments.set(segment.segment_id, segment);
            }
        });
    }
}`}
                />

                <h4 className="font-bold mt-6 mb-2">Check language detection confidence:</h4>
                <CodeBlock
                    language="python"
                    code={`if result.get('language_probability'):
    prob = result['language_probability']
    lang = result['language']

    if prob > 0.9:
        print(f"Confident detection: {lang}")
    elif prob > 0.7:
        print(f"Moderate confidence: {lang} ({prob:.2%})")
    else:
        print(f"Low confidence: {lang} ({prob:.2%})")`}
                />
            </div>
        </div>
    );
}
