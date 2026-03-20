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
      <h1>Intent Detection</h1>
<p>Intent detection automatically identifies the purpose or category of a conversation using AI intelligence. You can provide custom intent categories, and the system will classify the transcription accordingly with a confidence score.</p>
<h3>How to Enable</h3>
<CodeBlock
                    language="javascript"
                    code={`
        "enable_intent_detection": "true"
    `}
                />
<h2>During Transcription</h2>
<h3>Parameters:</h3>
<ul>
  <li><code>enable_intent_detection</code> (String, required): Set to &quot;true&quot; to enable intent detection</li>
  <li><code>intent_choices</code> (String, optional): JSON array of intent choices (max 5 categories)</li>
</ul>
<h3>Request:</h3>
<CodeBlock
                    language="javascript"
                    code={`import requests

url = "https://tb.shunyalabs.ai/transcribe"
headers = {"X-API-Key": "your-api-key"}

with open("customer_call.wav", "rb") as f:
    files = {"file": f}
    data = {
        "enable_intent_detection": "true",
        "intent_choices": '["support", "billing", "technical", "sales"]' # optional
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
  "text": "Hi, I'm having trouble with my account login. I keep getting an error message when I try to reset my password.",
  "segments": [...],
  "intent": {
    "intent": "technical",
    "confidence": 0.89
  }
}
    `}
                />
<h2>Standalone Intent Detection</h2>
<h3>Parameters:</h3>
<ul>
  <li><code>text</code> (String, required): Input text to analyze</li>
  <li><code>intent_choices</code> (String, optional): JSON array of intent choices (max 5 categories)</li>
</ul>
<h3>Request:</h3>
<CodeBlock
                    language="javascript"
                    code={`import requests

url = "https://tb.shunyalabs.ai/v1/intent"
headers = {"X-API-Key": "your-api-key"}

data = {
    "text": "I was charged twice for my subscription this month. Can you help me get a refund?",
    "choices": '["support", "billing", "technical", "sales"]' #optional
}

response = requests.post(url, headers=headers, data=data)
print(response.json())
    `}
                />
<h3>Example Output:</h3>
<CodeBlock
                    language="javascript"
                    code={`{
  "intent": "billing",
  "confidence": 0.92
}
    `}
                />
<h3>Best Practices:</h3>
<ul>
  <li>Limit intent choices to 3-5 categories for best accuracy</li>
  <li>Use clear, distinct category names</li>
  <li>Provide representative text (avoid very short inputs)</li>
  <li>Higher confidence scores (&gt;0.8) indicate more reliable classifications</li>
</ul>
<h3>Use Cases</h3>
<ul>
  <li>Customer Support: Automatically route calls to appropriate departments (billing, technical, general inquiry)</li>
  <li>Chatbot Analytics: Understand user intentions in conversational AI interactions</li>
  <li>Survey Analysis: Categorize open-ended survey responses</li>
  <li>Content Classification: Organize podcast episodes, meetings, or interviews by topic</li>
  <li>Call Center Optimization: Identify common customer issues and trends
</li>
</ul>
      </div>
    </div>
  );
}
