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
      <h1>Speaker Identification</h1>
<p>Speaker identification goes beyond basic diarization by matching detected speakers against pre-registered voice profiles. Instead of generic labels (e.g., SPEAKER_00, SPEAKER_01), you can label speakers with their actual names (e.g., &quot;John Doe&quot;, &quot;Jane Smith&quot;).</p>
<p><strong>Note:</strong>&nbsp;Unregistered voices automatically fall back to generic labels.</p>
<p>This documentation covers how to use speaker identification:</p>
<ul>
  <li>Register new speakers in a project</li>
  <li>Transcribe audio with speaker identification enabled</li>
  <li>List all registered speakers</li>
  <li>Delete existing speakers</li>
</ul>
<h2>Register New Speakers</h2>
<p>To register speakers, you need a voice sample for each speaker (3-5 seconds of clear audio recommended). Each user is registered under a specific project.</p>
<p>So for instance, to register a User &ldquo;John Doe&rdquo; under a project &ldquo;test_project&rdquo; using sample audio for John Doe, john_voice_sample.wav:</p>
<CodeBlock
                    language="javascript"
                    code={`import requests

url = "https://tb.shunyalabs.ai/speakers/register"
headers = {"X-API-Key": "your-api-key"}

with open("john_voice_sample.wav", "rb") as f:
    files = {"file": f}  
    data = {
        "name": "John Doe",
        "project": "test_project"
    }
    response = requests.post(url, headers=headers, files=files, data=data)
    print(response.json())
    `}
                />
<h3>Response:</h3>
<CodeBlock
                    language="javascript"
                    code={`{
  "status": "success",
  "message": "Speaker 'John Doe' registered.",
  "vector_shape": [1, 192],
  "project": "test_project"
}
    `}
                />
<h2>Transcribe with Speaker Identification</h2>
<p>Once speakers are registered, enable speaker identification in your transcription request:</p>
<CodeBlock
                    language="javascript"
                    code={`import requests

url = "https://tb.shunyalabs.ai/transcribe"
headers = {"X-API-Key": "your_api_key_here"}

with open("your_audio.wav", "rb") as audio_file:
    files = {"file": audio_file}
    data = {
        "enable_diarization": "true"
        "use_identification": "true"
        "project": "test_project"
    }

    response = requests.post(url, headers=headers, files=files, data=data)
    result = response.json()

print(result["text"])
    `}
                />
<p><strong>Note:</strong>&nbsp;Unregistered participants will default to generic labels (&rdquo;SPEAKER_00&quot;, &ldquo;SPEAKER_01&quot;).</p>
<h3>Example Response:</h3>
<CodeBlock
                    language="javascript"
                    code={`{
  "success": true,
  "text": "Good morning everyone, let's begin the meeting. Thanks John. I have the sales report ready. Great, and I've prepared the marketing analysis.",
  "segments": [
    {
      "start": 0.0,
      "end": 3.5,
      "text": "Good morning everyone, let's begin the meeting.",
      "speaker": "John Doe"
    },
    {
      "start": 3.8,
      "end": 5.2,
      "text": "Thanks John. I have the sales report ready.",
      "speaker": "Jane Smith"
    },
    {
      "start": 5.5,
      "end": 8.9,
      "text": "Great, and I've prepared the marketing analysis.",
      "speaker": "Bob Johnson"
    },
    {
      "start": 9.2,
      "end": 11.5,
      "text": "Let me share my screen.",
      "speaker": "SPEAKER_03"
    }
  ],
  "has_speaker_diarization": true,
  "unique_speakers": ["John Doe", "Jane Smith", "Bob Johnson", "SPEAKER_03"],
  "diarization_time": 4.1
}
    `}
                />
<p><strong>Note:</strong>&nbsp;In the example above, &quot;John Doe&quot;, &quot;Jane Smith&quot;, and &quot;Bob Johnson&quot; were registered speakers and were successfully identified. &quot;SPEAKER_03&quot; represents an unregistered participant who received a generic label.</p>
<h3>List Registered Speakers</h3>
<p>To view all registered speakers in a project:</p>
<CodeBlock
                    language="javascript"
                    code={`import requests

url = "https://tb.shunyalabs.ai/speakers/list"
headers = {"X-API-Key": "your-api-key"}

response = requests.get(url, headers=headers)
result = response.json()

print(f"Registered speakers: {result['speakers']}")
print(f"Total count: {result['count']}")
    `}
                />
<h3>Response:</h3>
<CodeBlock
                    language="javascript"
                    code={`{
  "status": "success",
  "speakers": ["John Doe", "Jane Smith", "Bob Johnson"],
  "count": 3,
  "project": "test_project"
}
    `}
                />
<h3>Delete a Speaker</h3>
<CodeBlock
                    language="javascript"
                    code={`import requests

url = "https://tb.shunyalabs.ai/speakers/delete"
headers = {"X-API-Key": "your_api_key_here"}

    data = {
        "name": "John Doe",
        "project": "test_project"
    }

    response = requests.post(url, headers=headers, files=files, data=data)
    result = response.json()

print(result["text"])
    `}
                />
<h3>Response:</h3>
<CodeBlock
                    language="javascript"
                    code={`{
"status": "success",
"message": "Speaker 'John Doe' deleted successfully.",
"project": "test_project"
}
    `}
                />
      </div>
    </div>
  );
}
