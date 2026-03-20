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
    <div className="min-h-screen bg-white rounded-2xl text-gray-800 doc-page">

      <div className="max-w-5xl mx-auto py-6 leading-relaxed">
      <h1>Word Timestamps</h1>
<p>Word-level timestamps provide precise timing information for each individual word in the transcription, along with confidence scores. This feature breaks down each segment into individual words with their exact start and end times, as well as a probability score indicating the recognition confidence for each word.</p>
<h3>How to Enable</h3>
<CodeBlock
                    language="javascript"
                    code={`"include_word_timestamps": "true"
    `}
                />
<h3>Request</h3>
<CodeBlock
                    language="javascript"
                    code={`import requests

url = "https://tb.shunyalabs.ai/transcribe"
headers = {"X-API-Key": "your-api-key"}

with open("sample.wav", "rb") as f:
    files = {"file": f}
    data = {
        "include_word_timestamps": "true"
    }
    
    response = requests.post(url, headers=headers, files=files, data=data)
    print(response.json())
    `}
                />
<h3>Example Output:</h3>
<CodeBlock
                    language="javascript"
                    code={`{
  "success": true,
  "text": "Hello, how are you doing today?",
  "segments": [
    {
      "start": 0.0,
      "end": 3.5,
      "text": "Hello, how are you doing today?",
      "speaker": "SPEAKER_00",
      "words": [
        {
          "word": "Hello",
          "start": 0.0,
          "end": 0.5,
          "probability": 0.96
        },
        {
          "word": "how",
          "start": 0.8,
          "end": 1.0,
          "probability": 0.94
        },
        {
          "word": "are",
          "start": 1.1,
          "end": 1.3,
          "probability": 0.92
        },
        {
          "word": "you",
          "start": 1.4,
          "end": 1.7,
          "probability": 0.95
        },
        {
          "word": "doing",
          "start": 1.8,
          "end": 2.2,
          "probability": 0.89
        },
        {
          "word": "today",
          "start": 2.3,
          "end": 2.8,
          "probability": 0.91
        }
      ]
    }
  ]
}
    `}
                />
<h3>Understanding Confidence Scores:</h3>
<ol>
  <li><code>probability</code> (0.0-1.0): Word recognition confidence
    <ol>
        <li>0.9: Very high confidence</li>
      <li>0.8-0.9: High confidence</li>
      <li>0.7-0.8: Moderate confidence</li>
      <li>&lt; 0.7: Low confidence (may need review)</li>
    </ol>
  </li>
</ol>
<h3>Best Practices</h3>
<ul>
  <li>Enable only when needed: Word-level timestamps add 5-10% processing time</li>
  <li>Use for quality control: Filter and review words with probability &lt; 0.8</li>
  <li>Combine with diarization: Track which speaker said which words</li>
  <li>Performance trade-off: Balance between detailed timing and processing speed</li>
</ul>
<h3>Use Cases</h3>
<ul>
  <li>Video Subtitles: Generate precise word-by-word subtitle timing for video content</li>
  <li>Karaoke Applications: Create synchronized lyrics displays</li>
  <li>Quality Assurance: Identify low-confidence words for manual review</li>
  <li>Audio Editing: Locate and edit specific words in recordings</li>
  <li>Accessibility: Create detailed transcripts with precise timing for hearing-impaired users</li>
  <li>Language Learning: Analyze pronunciation timing and word recognition</li>
</ul>
      </div>
    </div>
  );
}
