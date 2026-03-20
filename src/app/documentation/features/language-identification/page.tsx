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
        <h1 className="text-3xl font-semibold mb-6">Language Identification</h1>

        <p className="mb-2">
        Language identification allows you to detect the language of your audio recordings. It provides the detected language code, full language name, and a confidence score indicating detection accuracy.
        </p>
        <h3 className="text-lg font-semibold mb-4">How to Enable</h3>
        <CodeBlock
                    language="javascript"
                    code={`"enable_language_identification": "true"`}
                />
        <h3 className="text-lg font-semibold mb-4">Request:</h3>
        <CodeBlock
                    language="javascript"
                    code={`import requests

url = "https://tb.shunyalabs.ai/transcribe"
headers = {"X-API-Key": "your-api-key"}

with open("audio.wav", "rb") as f:
    files = {"file": f}
    data = {
        "enable_language_identification": "true"
    }
    
    response = requests.post(url, headers=headers, files=files, data=data)
    print(response.json())
    `}
                />
        <h3 className="text-lg font-semibold mb-4">Example Output:</h3>
        <CodeBlock
                    language="javascript"
                    code={`{
  "success": true,
  "text": "Hello, how can I help you today?",
  "segments": [...],
  "language_identification": {
    "status": "success",
    "language": "en",
    "confidence": 0.9876
  }
}
    `}
                />
        <h3 className="text-lg font-semibold mb-4">Understanding Confidence Scores:</h3>
        <p className="mb-2"><code className="font-mono text-orange-600 bg-black/10 px-1 rounded">confidence</code> (0.0-1.0) indicates the confidence in accuracy of language detection</p>
        <ol className="list-inside list-disc mb-4">
            <li>Scores &gt; 0.9: Very high confidence</li>
            <li>Scores 0.8-0.9: High confidence</li>
            <li>Scores 0.7-0.8: Moderate confidence</li>
            <li>Scores &lt; 0.7: Low confidence (language may be ambiguous or mixed)</li>
        </ol>
        <h3 className="text-lg font-semibold mb-4">Best Practices</h3>
        <ol className="list-inside list-disc mb-4">
            <li>Provide at least 3-5 seconds of clear audio for accurate identification</li>
            <li>Works best with continuous speech rather than isolated words</li>
        </ol>
        <h3 className="text-lg font-semibold mb-4">Use Cases</h3>
        <ol className="list-inside list-disc mb-4">
            <li>Multi-Language Support: Automatically route calls to language-specific support teams</li>
            <li>Content Classification: Organize audio/video libraries by detected language</li>
            <li>Language Learning: Verify language usage in educational content</li>
            <li>International Call Centers: Identify caller language for appropriate agent assignment</li>
            <li>Media Analytics: Analyze language distribution in podcasts or broadcast content</li>
            <li>Compliance: Ensure content is in the expected language for regulatory requirements</li>
        </ol>
      </div>
    </div>
  );
}
