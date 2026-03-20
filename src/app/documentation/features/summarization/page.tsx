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
      <h1>Summarization</h1>
<p>Summarization generates concise summaries of transcribed content using AI intelligence. You can summarize audio during transcription or apply it to existing text transcripts. Control summary length by passing an optional parameter.</p>
<h3>How to Enable</h3>
<CodeBlock
                    language="javascript"
                    code={`"include_word_timestamps": "true"
    `}
                />
<h2>During Transcription</h2>
<h3>Parameters:</h3>
<ul>
  <li><code>enable_summarization</code> (String, required): Set to &quot;true&quot; to enable summarization</li>
  <li><code>summary_max_length</code> (Integer, optional): Maximum summary length in characters</li>
</ul>
<h3>Request</h3>
<CodeBlock
                    language="javascript"
                    code={`import requests

url = "https://tb.shunyalabs.ai/transcribe"
headers = {"X-API-Key": "your-api-key"}

with open("team_meeting.wav", "rb") as f:
    files = {"file": f}
    data = {
        "enable_summarization": "true"
        "summary_max_length": "200" #optional
    }
    
    response = requests.post(url, headers=headers, files=files, data=data)
    print(response.json())
    `}
                />
<h2>Standalone Summarization:</h2>
<h3>Parameters:</h3>
<ul>
  <li><code>text</code> (String, required): Input text to summarize (up to 10,000 characters)</li>
  <li><code>summary_max_length</code> (Integer, optional): Maximum summary length in characters</li>
</ul>
<h3>Request:</h3>
<CodeBlock
                    language="javascript"
                    code={`import requests

url = "https://tb.shunyalabs.ai/v1/summarize"
headers = {"X-API-Key": "your-api-key"}

data = {
    "text": "Long transcription text goes here...",
    "summary_max_length": "200" #optional
}

response = requests.post(url, headers=headers, data=data)
print(response.json())
    `}
                />
<h3>Example Output:</h3>
<CodeBlock
                    language="javascript"
                    code={`{
  "summary": "The quarterly review showed 15% revenue growth, with strong performance in the enterprise segment. Key challenges include increased competition and rising customer acquisition costs. Strategic priorities for next quarter are product innovation and market expansion."
}
    `}
                />
<h3>Best Practices:</h3>
<ul>
  <li>Set summary_max_length based on your use case</li>
  <li>Longer input texts may require longer summary_max_length for comprehensive summaries</li>
  <li>Summaries work best with coherent, complete conversations</li>
</ul>
<h3>Use Cases</h3>
<ol>
  <li>Meeting Minutes: Quickly generate executive summaries of team meetings</li>
  <li>Long-Form Content: Create TL;DR versions of podcasts, lectures, or webinars</li>
  <li>Customer Calls: Generate call summaries for CRM systems</li>
  <li>Research Interviews: Extract key insights from interview transcriptions</li>
  <li>Content Curation: Create brief descriptions for audio/video content libraries</li>
  <li>Email Updates: Convert meeting recordings into email-friendly summaries</li>
</ol>

      </div>
    </div>
  );
}
