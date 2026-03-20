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
      <h1>Translation</h1>
<p>Translation provides two methods to convert content between languages: runtime translation during transcription (audio to English only) and post-processing translation (text to any supported language).</p>
<p>For a list of supported languages, see Languages.</p>
<h2>Method 1: Runtime Translation (Audio to English)</h2>
<p>Automatically converts any language audio to English text during transcription. This uses the Whisper model's built-in translation capability.</p>
<h3>How to Enable</h3>
<CodeBlock
                    language="javascript"
                    code={`"task": "translate"
"language_code": "hi"  # optional `}
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
        "task": "translate",
        "language_code": "auto"  # optional
    }
    
    response = requests.post(url, headers=headers, files=files, data=data)
    print(response.json())`}
                />
<h3>Example Output:</h3>
<CodeBlock
                    language="javascript"
                    code={`{
  "success": true,
  "text": "Hello, how can I help you today?",
  "segments": [
    {
      "start": 0.0,
      "end": 4.5,
      "text": "Hello, how can I help you today?",
      "speaker": "SPEAKER_00"
    }
  ]
}`}
                />
<p><strong>Note:</strong>&nbsp;Original Hindi audio &quot;&#2344;&#2350;&#2360;&#2381;&#2340;&#2375;, &#2310;&#2332; &#2350;&#2376;&#2306; &#2310;&#2346;&#2325;&#2368; &#2325;&#2376;&#2360;&#2375; &#2350;&#2342;&#2342; &#2325;&#2352; &#2360;&#2325;&#2340;&#2366; &#2361;&#2370;&#2306;?&quot; is automatically translated to English.</p>
<h2>Method 2: Post-Processing Translation (Text to Any Language)</h2>
<p>Converts text from one language to any other. Works on any text, including transcriptions.</p>
<h2>How to Enable</h2>
<h3>Parameters:</h3>
<ul>
  <li><code>text</code> (String, required): The input text you want to translate</li>
  <li><code>source_lang</code> (String, optional): Language code for the language of your audio file. Default: &quot;en&quot;</li>
  <li><code>target_lang</code> (String, required): : Language code for the desired output language</li>
</ul>
<p>For a list of supported languages, see Languages.</p>
<h3>Request:</h3>
<CodeBlock
                    language="javascript"
                    code={`import requests

url = "https://tb.shunyalabs.ai/v1/translate"
headers = {"X-API-Key": "your-api-key"}

data = {
    "text": "Hello, how are you?",
    "source_lang": "en",
    "target_lang": "hi"
}

response = requests.post(url, headers=headers, data=data)
print(response.json())`}
                />
<h3>Example Output:</h3>
<CodeBlock
                    language="javascript"
                    code={`{
  "original_text": "Hello, how are you?",
  "translated_text": "नमस्ते, आप कैसे हैं?",
  "source_language": "en",
  "target_language": "hi"
}`}
                />
<h3>Best Practices</h3>
<ul>
  <li>Use&nbsp;runtime translation&nbsp;when you need audio in any language converted to English text</li>
  <li>Use&nbsp;post-processing translation&nbsp;when you need text translated to languages other than English</li>
  <li>Specify <code>source_lang</code> in post-processing for better translation accuracy</li>
</ul>
<h3>Use Cases</h3>
<ul>
  <li>Runtime Translation: International customer support (any language calls &rarr; English transcripts)</li>
  <li>Post-Processing Translation: Multilingual content delivery (English transcripts &rarr; Hindi, Tamil, etc.)</li>
  <li>Combined Workflow: Global training materials (Spanish audio &rarr; English text &rarr; Hindi text)</li>
  <li>Accessibility: Provide content in multiple languages for broader audience reach</li>
  <li>Business Intelligence: Analyze non-English conversations in English</li>
  <li>Legal &amp; Compliance: Translate recorded statements for multilingual documentation</li>
</ul>
      </div>
    </div>
  );
}
