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
      <h1>Speaker Diarization</h1>
<p>Speaker diarization automatically separates different speakers in an audio recording, labeling each segment with a speaker tag (e.g., SPEAKER_00, SPEAKER_01). This tells you &quot;who spoke when&quot; in conversations, meetings, or interviews.</p>
<p>You can also pre-identify speakers and customize speaker tags to match your context, so transcripts automatically recognize and label known speakers. To learn how, see <a href="https://www.notion.so/Speaker-Diarization-2bc4582b34fa80668023e840ca151678?pvs=21">speaker identification</a>.</p>
<h3>How to Enable</h3>
<CodeBlock
                    language="javascript"
                    code={`"enable_diarization": "true"
    `}
                />
<h3>Full Speaker Diarization Request</h3>
<CodeBlock
                    language="javascript"
                    code={`import requests

url = "https://tb.shunyalabs.ai/transcribe"
headers = {"X-API-Key": "your_api_key_here"}

with open("your_audio.wav", "rb") as audio_file:
    files = {"file": audio_file}
    data = {
        "enable_diarization": "true"
    }

    response = requests.post(url, headers=headers, files=files, data=data)
    result = response.json()

print(result["text"])
    `}
                />
<h3>Example output:</h3>
<CodeBlock
                    language="javascript"
                    code={`{
  "success": true,
  "text": "Hello, thank you for calling customer support. How can I help you today? Hi, yes, I'm having trouble with my account login. I keep getting an error message. I'm sorry to hear that. Let me pull up your account and see what's going on.",
  "segments": [
    {
      "start": 0.0,
      "end": 5.5,
      "text": "Hello, thank you for calling customer support. How can I help you today?",
      "speaker": "SPEAKER_00"
    },
    {
      "start": 6.0,
      "end": 12.3,
      "text": "Hi, yes, I'm having trouble with my account login. I keep getting an error message.",
      "speaker": "SPEAKER_01"
    },
    {
      "start": 12.8,
      "end": 14.5,
      "text": "I'm sorry to hear that.",
      "speaker": "SPEAKER_00"
    },
    {
      "start": 14.6,
      "end": 18.9,
      "text": "Let me pull up your account and see what's going on.",
      "speaker": "SPEAKER_00"
    }
  ]
}
    `}
                />
<p>For custom speaker tags, see <a href="https://www.notion.so/Speaker-Diarization-2bc4582b34fa80668023e840ca151678?pvs=21">speaker identification</a>.</p>
<h3>Use Cases</h3>
<ul>
  <li>Meeting Transcriptions: Identify contributions from different participants in team meetings</li>
  <li>Interview Analysis: Separate interviewer and interviewee responses</li>
  <li>Customer Service: Distinguish between agent and customer in support calls</li>
  <li>Podcast Production: Track different hosts and guests automatically</li>
  <li>Legal Proceedings: Document who said what in depositions or hearings</li>
</ul>
      </div>
    </div>
  );
}
