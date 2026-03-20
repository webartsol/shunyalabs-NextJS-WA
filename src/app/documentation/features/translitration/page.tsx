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
      <h1>Transliteration</h1>
<p>Transliteration converts text from one script to another while preserving pronunciation. You can transliterate during transcription or apply it to existing text, enabling script conversion for Indic languages.</p>
<p>For a list of supported scripts, see Scripts.</p>
<h3>How to Enable</h3>
<CodeBlock
                    language="javascript"
                    code={`"output_script": "Latin"
    `}
                />
<h3>Request:</h3>
<CodeBlock
                    language="javascript"
                    code={`import requests

url = "https://tb.shunyalabs.ai/transcribe"
headers = {"X-API-Key": "your-api-key"}

with open("hindi_audio.wav", "rb") as f:
    files = {"file": f}
    data = {
        "language_code": "hi",
        "output_script": "Latin"
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
  "text": "namaste, aap kaise hain?",
  "segments": [
    {
      "start": 0.0,
      "end": 3.5,
      "text": "namaste, aap kaise hain?",
      "speaker": "SPEAKER_00"
    }
  ]
}
    `}
                />
<p><strong>Note:</strong>&nbsp;Original Hindi audio &quot;&#2344;&#2350;&#2360;&#2381;&#2340;&#2375;, &#2310;&#2346; &#2325;&#2376;&#2360;&#2375; &#2361;&#2376;&#2306;?&quot; is transcribed and transliterated to Latin script.</p>
<p>For a list of supported scripts, see Scripts.</p>
<h2>Transliteration for Text Input</h2>
<h3>Parameters:</h3>
<ul>
  <li>text&nbsp;(String, required): Input text to transliterate</li>
  <li>language_code&nbsp;(String, required): Language code of the input text</li>
  <li>output_script&nbsp;(String, required): Target script</li>
</ul>
<h3>Request:</h3>
<CodeBlock
                    language="javascript"
                    code={`import requests

url = "https://tb.shunyalabs.ai/v1/transliterate"
headers = {"X-API-Key": "your-api-key"}

data = {
    "text": "नमस्ते",
    "language_code": "hi",
    "output_script": "Latin"
}

response = requests.post(url, headers=headers, data=data)
print(response.json())
    `}
                />
<h3>Example Output:</h3>
<CodeBlock
                    language="javascript"
                    code={`{
  "original_text": "नमस्ते",
  "transliterated_text": "namaste",
  "language_code": "hi",
  "output_script": "Latin"
}
    `}
                />
<h3>Use Cases</h3>
<ul>
  <li><strong>International Accessibility</strong>: Make Indic language content accessible to non-native script readers</li>
  <li><strong>Search &amp; Indexing</strong>: Enable Latin-based search for Indic language content</li>
  <li><strong>SMS &amp; Messaging</strong>: Convert native scripts for compatibility with limited character sets</li>
  <li><strong>Data Entry</strong>: Simplify input when native script keyboards are unavailable</li>
  <li><strong>Language Learning</strong>: Provide pronunciation guides for learners</li>
  <li><strong>Cross-Platform Compatibility</strong>: Ensure text displays correctly across different systems</li>
</ul>
      </div>
    </div>
  );
}
