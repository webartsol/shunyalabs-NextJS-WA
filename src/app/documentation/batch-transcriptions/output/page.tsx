"use client";
import { useState } from "react";
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
                    The API returns a JSON object containing your transcription and metadata.
                </p>

                {/* Success Response */}
                <h2 className="text-2xl font-semibold mb-3">Success Response</h2>
                <CodeBlock
                    language="json"
                    code={`{
  "success": true,
  "text": "Hello everyone, welcome to today's meeting. Let's begin with the quarterly review.",
  "segments": [
    {
      "start": 0.0,
      "end": 3.5,
      "text": "Hello everyone, welcome to today's meeting.",
      "speaker": "SPEAKER_00"
    },
    {
      "start": 3.5,
      "end": 5.8,
      "text": "Let's begin with the quarterly review.",
      "speaker": "SPEAKER_01"
    }
  ],
  "detected_language": "English",
  "language_probability": 0.99,
  "total_segments": 2,
  "chunks_processed": 1,
  "chunk_size_seconds": 120,
  "filename": "meeting.wav",
  "total_time": 2.34,
  "model_used": "english_en",
  "has_speaker_diarization": true,
  "unique_speakers": ["SPEAKER_00", "SPEAKER_01"],
  "diarization_time": 1.12
}`}
                />

                {/* Response Fields */}
                <h2 className="text-2xl font-semibold mt-8 mb-4">Response Fields</h2>
                <div className="overflow-x-auto mb-8">
                    <table className="w-full border border-gray-300 text-sm">
                        <thead className="bg-gray-100 text-gray-800 font-semibold">
                            <tr>
                                <th className="border px-3 py-2 text-left">Field</th>
                                <th className="border px-3 py-2 text-left">Type</th>
                                <th className="border px-3 py-2 text-left">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ["success", "boolean", "Whether transcription succeeded"],
                                ["text", "string", "Complete transcription text"],
                                ["segments", "array", "Timestamped segments with speaker labels"],
                                ["detected_language", "string", "Automatically detected language"],
                                [
                                    "language_probability",
                                    "float",
                                    "Confidence score for language detection (0–1)",
                                ],
                                ["total_segments", "integer", "Number of transcribed segments"],
                                ["chunks_processed", "integer", "Number of audio chunks processed"],
                                ["filename", "string", "Original filename"],
                                ["total_time", "float", "Processing time in seconds"],
                                ["model_used", "string", "ASR model used for transcription"],
                                [
                                    "has_speaker_diarization",
                                    "boolean",
                                    "Whether speaker labels are included",
                                ],
                                ["unique_speakers", "array", "List of speaker IDs found"],
                                ["diarization_time", "float", "Time spent on speaker diarization"],
                            ].map(([f, t, d]) => (
                                <tr key={f}>
                                    <td className="border px-3 py-2 font-mono text-orange-600">{f}</td>
                                    <td className="border px-3 py-2">{t}</td>
                                    <td className="border px-3 py-2">{d}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Segment Object */}
                <h2 className="text-2xl font-semibold mb-4">Segment Object</h2>
                <p className="mb-3">
                    Each segment in the <code className="bg-gray-100 px-1 rounded">segments</code> array contains:
                </p>

                <div className="overflow-x-auto mb-8">
                    <table className="w-full border border-gray-300 text-sm">
                        <thead className="bg-gray-100 text-gray-800 font-semibold">
                            <tr>
                                <th className="border px-3 py-2 text-left">Field</th>
                                <th className="border px-3 py-2 text-left">Type</th>
                                <th className="border px-3 py-2 text-left">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ["start", "float", "Start time in seconds"],
                                ["end", "float", "End time in seconds"],
                                ["text", "string", "Transcribed text for this segment"],
                                ["speaker", "string", "Speaker identifier (e.g., SPEAKER_00)"],
                            ].map(([f, t, d]) => (
                                <tr key={f}>
                                    <td className="border px-3 py-2 font-mono text-orange-600">{f}</td>
                                    <td className="border px-3 py-2">{t}</td>
                                    <td className="border px-3 py-2">{d}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Working with Results */}
                <h2 className="text-2xl font-semibold mb-5">Working with Results</h2>

                <h4 className="font-semibold mb-2">Extract full transcript:</h4>
                <CodeBlock
                    language="python"
                    code={`result = transcribe_file("audio.wav", api_key)
full_text = result["text"]
print(full_text)`}
                />

                <h4 className="font-semibold mt-6 mb-2">Process segments with timestamps:</h4>
                <CodeBlock
                    language="python"
                    code={`for segment in result["segments"]:
    print(f"[{segment['start']:.2f}s - {segment['end']:.2f}s] {segment['speaker']}: {segment['text']}")`}
                />

                <h4 className="font-semibold mt-6 mb-2">Output:</h4>
                <CodeBlock
                    language="bash"
                    code={`[0.00s - 3.50s] SPEAKER_00: Hello everyone, welcome to today’s meeting.
[3.50s - 5.80s] SPEAKER_01: Let's begin with the quarterly review.`}
                />

                <h4 className="font-semibold mt-6 mb-2">Identify unique speakers:</h4>
                <CodeBlock
                    language="python"
                    code={`speakers = result["unique_speakers"]
print(f"Found {len(speakers)} speakers: {', '.join(speakers)}")`}
                />

                <h4 className="font-semibold mt-6 mb-2">Check language detection:</h4>
                <CodeBlock
                    language="python"
                    code={`if result["language_probability"] > 0.9:
    print(f"Confident detection: {result['detected_language']}")
else:
    print(f"Uncertain detection: {result['detected_language']} ({result['language_probability']:.2%})")`}
                />
            </div>
        </div>
    );
}
