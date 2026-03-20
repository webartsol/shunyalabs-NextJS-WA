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
        <h1 className="text-3xl font-semibold mb-6">Language Models</h1>

        <p className="mb-2">
        Language models are our core transcription engines, delivering industry-leading accuracy across an unmatched 200+ languages.
        </p>
        <p className="mb-4">
        We provide three specialized categories of language models to meet diverse transcription needs:
        </p>
        <ol className="list-inside list-disc mb-4">
            <li><strong>Zero Indic </strong> - Optimised performance for Indic languages</li>
            <li><strong>Zero Codeswitch </strong> - Designed for mixed-language speech patterns</li>
            <li><strong>Zero Universal </strong> - Support for 200+ languages worldwide</li>
        </ol>
        <h2 className="text-xl font-bold mb-4">Zero Indic Models </h2>
        <p className="mb-2">Specialized models fine-tuned for Indian languages, offering superior accuracy for regional speech patterns and accents.</p>
        <p className="mb-2">To use this category of models, pass the model parameter <code className="font-mono text-orange-600 bg-black/10 px-1 rounded">"model":"zero-indic"</code> along with the appropriate language code.</p>
        <p className="mb-4">For example, to transcribe audio in Hindi using Zero Indic Hindi:</p>
        <CodeBlock
                    language="javascript"
                    code={`data = {
    "model": "zero-indic"
    "language_code": "hi"
}
`}
                />
        <h3 className="text-lg font-semibold mb-4">Supported Languages</h3>
        <p className="mb-4">Languages currently supported by Zero Indic models:</p>
        <div className="overflow-x-auto mb-6">
          <table className="border border-gray-300 text-sm">
            <thead className="bg-gray-100 text-gray-800 font-semibold">
              <tr>
                <th className="border px-3 py-2 text-left">Language</th>
                <th className="border px-3 py-2 text-left"><code className="font-mono text-orange-600 bg-black/10 px-1 rounded">"model"</code></th>
                <th className="border px-3 py-2 text-left"><code className="font-mono text-orange-600 bg-black/10 px-1 rounded">"language_code"</code></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-3 py-2">
                Hindi
                </td>
                <td className="border px-3 py-2">
                zero-indic
                </td>
                <td className="border px-3 py-2">
                hi
                </td>
              </tr>
              <tr>
                <td className="border px-3 py-2">
                Telugu
                </td>
                <td className="border px-3 py-2">
                zero-indic
                </td>
                <td className="border px-3 py-2">
                te
                </td>
              </tr>
              <tr>
                <td className="border px-3 py-2">
                Kannada
                </td>
                <td className="border px-3 py-2">
                zero-indic
                </td>
                <td className="border px-3 py-2">
                kn
                </td>
              </tr>
              <tr>
                <td className="border px-3 py-2">
                Bengali
                </td>
                <td className="border px-3 py-2">
                zero-indic
                </td>
                <td className="border px-3 py-2">
                bn
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mb-4"><em>Support for other languages will be coming soon.</em></p>
        <h2 className="text-xl font-bold mb-4">Zero Code-Switch Models</h2>
        <p className="mb-2">Industry-leading code-switch models designed by Shunya Labs to handle multilingual speech, generating accurate output across multiple languages within a single conversation.</p>
        <p className="mb-2">To use this category of models, pass the model parameter <code className="font-mono text-orange-600 bg-black/10 px-1 rounded">"model":"zero-indic"</code> along with the appropriate language code.</p>
        <p className="mb-4">Currently, the Hinglish model is available. To transcribe audio in Hinglish:</p>
        <CodeBlock
                    language="javascript"
                    code={`data = {
    "model": "zero-codeswitch"
    "language_code": "hi-en"
}
`}
                />
        <h2 className="text-xl font-bold mb-4">Zero Universal</h2>
        <p className="mb-2">A universal speech-to-text model supporting 200+ languages, providing broad multilingual transcription capabilities across diverse linguistic and acoustic environments.</p>
        <p className="mb-2">You can auto-detect the language of your audio by setting <code className="font-mono text-orange-600 bg-black/10 px-1 rounded"> "language_code": "auto" </code>:</p>
        <CodeBlock
                    language="javascript"
                    code={`data = {
    "language_code": "auto"
}
`}
                />
        <p className="mb-2">For optimal accuracy, specify the language of your audio input from our <a className="font-semibold underline text-blue-700" href="https://www.shunyalabs.ai/documentation/languages">list of supported languages.</a></p>
        <p className="mb-2">For example, for audio in English:</p>
        <CodeBlock
                    language="javascript"
                    code={`data = {
    "language_code": "en"
}
`}
                />

      </div>
    </div>
  );
}
