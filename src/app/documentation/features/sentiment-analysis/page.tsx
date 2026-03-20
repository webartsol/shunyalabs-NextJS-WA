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
      <h1>Sentiment Analysis</h1>
<p>Sentiment analysis automatically detects the emotional tone of transcribed content using AI intelligence. It classifies text as positive, negative, or neutral, and provides a confidence score indicating the strength of the sentiment.</p>
<h3>How to Enable</h3>
<CodeBlock
                    language="javascript"
                    code={`"enable_sentiment_analysis": "true"
    `}
                />
<h2>During Transcription</h2>
<h3>Parameters:</h3>
<ul>
  <li><code>enable_sentiment_analysis</code> (String, required): Set to &quot;true&quot; to enable sentiment analysis</li>
</ul>
<h3>Request:</h3>
<CodeBlock
                    language="javascript"
                    code={`import requests

url = "https://tb.shunyalabs.ai/transcribe"
headers = {"X-API-Key": "your-api-key"}

with open("customer_feedback.wav", "rb") as f:
    files = {"file": f}
    data = {
        "enable_sentiment_analysis": "true"
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
  "text": "I absolutely love this product! The customer service team was incredibly helpful and resolved my issue within minutes. This is exactly what I was looking for.",
  "segments": [...],
  "sentiment": {
    "sentiment": "positive",
    "score": 0.92
  }
}
    `}
                />
<h2>Standalone Sentiment Analysis</h2>
<h3>Parameters:</h3>
<ul>
  <li><code>text</code> (String, required): Input text to analyze</li>
</ul>
<h3>Request:</h3>
<CodeBlock
                    language="javascript"
                    code={`import requests

url = "https://tb.shunyalabs.ai/v1/sentiment"
headers = {"X-API-Key": "your-api-key"}

data = {
    "text": "I'm extremely frustrated with this service. I've been waiting for three weeks and still haven't received any response."
}

response = requests.post(url, headers=headers, data=data)
print(response.json())
    `}
                />
<h3>Example Output:</h3>
<CodeBlock
                    language="javascript"
                    code={`{
  "sentiment": "negative",
  "score": 0.88
}
    `}
                />
<h3>Understanding Sentiment Scores:</h3>
<p><code>score</code> (0.0-1.0) indicates the confidence in the sentiment classification</p>
<ul>
  <li>Scores &gt; 0.8: High confidence</li>
  <li>Scores 0.6-0.8: Moderate confidence</li>
  <li>Scores &lt; 0.6: Lower confidence (may indicate mixed or ambiguous sentiment)</li>
</ul>
<h3>Best Practices</h3>
<ul>
  <li>Provide sufficient context for accurate sentiment detection (avoid very short inputs)</li>
  <li>Mixed emotions (frustration + appreciation) often result in neutral classification</li>
  <li>Sentiment works best with complete thoughts and coherent statements</li>
  <li>Use for overall tone analysis rather than word-by-word sentiment tracking</li>
  <li>Combine with intent detection for comprehensive conversation analysis</li>
</ul>
<h3>Use Cases</h3>
<ul>
  <li>Customer Service: Monitor customer satisfaction in support calls and flag negative interactions</li>
  <li>Brand Monitoring: Analyze sentiment in customer feedback and product reviews</li>
  <li>Employee Engagement: Gauge sentiment in team meetings or one-on-one conversations</li>
  <li>Market Research: Understand emotional responses in focus groups and interviews</li>
  <li>Quality Assurance: Identify at-risk customers based on negative sentiment patterns</li>
  <li>Product Feedback: Track positive and negative reactions to product demos or launches</li>
</ul>
      </div>
    </div>
  );
}
