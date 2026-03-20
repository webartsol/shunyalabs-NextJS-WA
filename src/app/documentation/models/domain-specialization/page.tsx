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
    <div className="min-h-screen bg-white rounded-2xl text-gray-800">

      <div className="max-w-5xl mx-auto py-6 leading-relaxed">
        <h1 className="text-3xl font-semibold mb-6">Domain Specialization</h1>

        <p className="mb-2">
        Domain-specialized models are fine-tuned for specific industries, delivering enhanced accuracy for specialized terminology and context. 
        Built on our core language models, these models understand industry-specific vocabulary, jargon, and speech patterns to provide superior 
        transcription quality where it matters most.
        </p>
        <p className="mb-4">
        We've launched Zero Med, purpose-built for healthcare professionals who demand clinical-grade transcription.
        </p>
        <h2 className="text-xl font-bold mb-4">Zero Med</h2>
        <p className="mb-2">Trained on extensive medical datasets, Zero Med captures medical terminology, drug names, and diagnostic language and more with exceptional accuracy, helping healthcare professionals document care with confidence.</p>
        <p className="mb-4">To transcribe medical speech, pass the following parameters:</p>
        <CodeBlock
                    language="javascript"
                    code={`data = {
    "model": "zero-med"
    "language_code": "med-en"
}
`}
                />
        <h3 className="text-lg font-semibold mb-4">Supported Languages</h3>
        <p className="mb-4">Zero STT Med is available in three languages:</p>
        <div className="overflow-x-auto mb-6">
          <table className="border border-gray-300 text-sm">
            <thead className="bg-gray-100 text-gray-800 font-semibold">
              <tr>
                <th className="border px-3 py-2 text-left">Language</th>
                <th className="border px-3 py-2 text-left"><code className="font-mono text-orange-600 bg-black/10 px-1 rounded">"language_code"</code></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-3 py-2">
                English
                </td>
                <td className="border px-3 py-2">
                med-en
                </td>
              </tr>
              <tr>
                <td className="border px-3 py-2">
                Korean
                </td>
                <td className="border px-3 py-2">
                med-ko
                </td>
              </tr>
              <tr>
                <td className="border px-3 py-2">
                Japanese
                </td>
                <td className="border px-3 py-2">
                med-jp
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mb-4"><em>Support for other languages will be coming soon.</em></p>
      </div>
    </div>
  );
}
