"use client";
import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FiCopy, FiCheck } from "react-icons/fi";
import Navbar from "@/app/Layouts/Navbar";

function CodeBlock({ language, code }: { language: string; code: string }) {
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
        {copied ? <FiCheck className="text-green-600 mt-2" /> : <FiCopy className="mt-2"/>}
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

export default function TroubleshootingPage() {
  return (
    <div className="min-h-screen bg-white rounded-2xl text-gray-800">
      <div className="max-w-5xl mx-auto py-6 leading-relaxed">
        <h1 className="text-3xl font-semibold mb-8">Troubleshooting</h1>

        <h2 className="text-2xl font-semibold mb-4">Common Issues</h2>

        {/* File Size Error */}
        <h3 className="text-xl font-semibold mb-2">File Size Error (413)</h3>
        <p className="font-semibold mb-2">Error message:</p>
        <CodeBlock
          language="bash"
          code={`HTTP 413: Request Entity Too Large
File 'meeting.wav' is 12.45 MB. Maximum allowed size is 10 MB.`}
        />

        <p className="font-semibold mt-4 mb-1">Solutions:</p>
        <ul className="list-disc list-inside mb-4 space-y-1">
          <li>Split your audio file into smaller segments</li>
          <li>Compress the audio file (reduce bitrate/sample rate)</li>
          <li>Use a tool like FFmpeg to reduce file size:</li>
        </ul>

        <CodeBlock
          language="bash"
          code={`ffmpeg -i input.wav -ar 16000 -ac 1 -b:a 64k output.wav`}
        />

        {/* Authentication Error */}
        <h3 className="text-xl font-semibold mt-8 mb-2">
          Authentication Error (401)
        </h3>
        <p className="font-semibold mb-2">Error message:</p>
        <CodeBlock language="bash" code={`HTTP 401: Unauthorized`} />

        <p className="font-semibold mt-3 mb-1">Solutions:</p>
        <ul className="list-disc list-inside mb-6 space-y-1">
          <li>Verify your API key is correct</li>
          <li>Check that the API key is included in the request header</li>
          <li>Ensure there are no extra spaces in the API key</li>
        </ul>

        {/* Bad Request */}
        <h3 className="text-xl font-semibold mt-8 mb-2">Bad Request Error (400)</h3>
        <p className="font-semibold mb-2">Error message:</p>
        <CodeBlock language="bash" code={`HTTP 400: Bad Request`} />

        <p className="font-semibold mt-3 mb-1">
          Possible causes and solutions:
        </p>
        <div className="overflow-x-auto mb-8">
          <table className="w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100 text-gray-800 font-semibold">
              <tr>
                <th className="border px-3 py-2 text-left">Cause</th>
                <th className="border px-3 py-2 text-left">Solution</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-3 py-2">Unsupported file format</td>
                <td className="border px-3 py-2">
                  Use WAV, MP3, M4A, or other supported formats
                </td>
              </tr>
              <tr>
                <td className="border px-3 py-2">Invalid parameter value</td>
                <td className="border px-3 py-2">
                  Check{" "}
                  <code className="bg-gray-200 text-red-600 px-1 rounded">
                    language_code
                  </code>
                  ,{" "}
                  <code className="bg-gray-200 text-red-600 px-1 rounded">
                    chunk_size
                  </code>
                  , and other parameters
                </td>
              </tr>
              <tr>
                <td className="border px-3 py-2">Corrupted audio file</td>
                <td className="border px-3 py-2">
                  Test with a different audio file
                </td>
              </tr>
              <tr>
                <td className="border px-3 py-2">Missing required fields</td>
                <td className="border px-3 py-2">
                  Ensure{" "}
                  <code className="bg-gray-200 text-red-600 px-1 rounded">
                    file
                  </code>{" "}
                  parameter is included
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Method Not Allowed */}
        <h3 className="text-xl font-semibold mb-2">Method Not Allowed (405)</h3>
        <p className="font-semibold mb-2">Error message:</p>
        <CodeBlock language="bash" code={`HTTP 405: Method Not Allowed`} />
        <p className="font-semibold mt-3 mb-1">Solution:</p>
        <ul className="list-disc list-inside mb-8 space-y-1">
          <li>Use POST method, not GET</li>
          <li>
            Correct: <code className="bg-gray-200 px-1">requests.post(...)</code>
          </li>
          <li>
            Incorrect: <code className="bg-gray-200 px-1">requests.get(...)</code>
          </li>
        </ul>

        {/* Audio Processing Failed */}
        <h3 className="text-xl font-semibold mb-2">
          Audio Processing Failed (500)
        </h3>
        <p className="font-semibold mb-2">Error message:</p>
        <CodeBlock
          language="bash"
          code={`HTTP 500: Audio splitting by VAD failed`}
        />
        <p className="font-semibold mt-3 mb-1">Solutions:</p>
        <ul className="list-disc list-inside mb-8 space-y-1">
          <li>Ensure audio contains clear speech</li>
          <li>Check audio is not completely silent</li>
          <li>Try reducing background noise</li>
          <li>Verify audio file is not corrupted</li>
        </ul>

        {/* Connection Timeout */}
        <h3 className="text-xl font-semibold mb-2">Connection Timeout</h3>
        <p className="font-semibold mb-1">Solutions:</p>
        <ul className="list-disc list-inside mb-3 space-y-1">
          <li>Check your internet connection</li>
          <li>Verify the API endpoint is accessible</li>
          <li>For large files, increase timeout settings:</li>
        </ul>
        <CodeBlock
          language="python"
          code={`response = requests.post(url, headers=headers, files=files, data=data, timeout=300)`}
        />

        {/* SSL Certificate */}
        <h3 className="text-xl font-semibold mb-2">SSL Certificate Errors</h3>
        <p className="mb-3">
          The Python scripts handle SSL verification automatically. If you encounter SSL
          errors:
        </p>
        <CodeBlock
          language="python"
          code={`# Add verify=False (not recommended for production)
response = requests.post(url, headers=headers, files=files, data=data, verify=False)`}
        />

        {/* HTTP Codes */}
        <h3 className="text-xl font-semibold mb-3">HTTP Status Codes</h3>
        <div className="overflow-x-auto mb-8">
          <table className="w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100 text-gray-800 font-semibold">
              <tr>
                <th className="border px-3 py-2 text-left">Code</th>
                <th className="border px-3 py-2 text-left">Meaning</th>
                <th className="border px-3 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["200", "Success", "Transcription completed"],
                ["400", "Bad Request", "Check parameters and file format"],
                ["401", "Unauthorized", "Verify API key"],
                ["405", "Method Not Allowed", "Use POST instead of GET"],
                ["413", "File Too Large", "Reduce file size below 10 MB"],
                ["500", "Server Error", "Retry or contact support"],
              ].map(([code, meaning, action]) => (
                <tr key={code}>
                  <td className="border px-3 py-2 font-mono text-orange-600">{code}</td>
                  <td className="border px-3 py-2">{meaning}</td>
                  <td className="border px-3 py-2">{action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Debugging */}
        <h2 className="text-2xl font-semibold mb-4">Debugging Tips</h2>
        <h4 className="font-semibold mb-2">Enable detailed error logging:</h4>
        <CodeBlock
          language="python"
          code={`import logging
logging.basicConfig(level=logging.DEBUG)

try:
    result = transcribe_file("audio.wav", api_key)
except Exception as e:
    logging.error(f"Transcription failed: {e}")`}
        />

        <h4 className="font-semibold mt-6 mb-2">Test with a simple file first:</h4>
        <CodeBlock
          language="python"
          code={`# Use a short, clear audio file to verify your setup
result = transcribe_file("test_short.wav", api_key)`}
        />

        <h4 className="font-semibold mt-6 mb-2">Validate your audio file:</h4>
        <CodeBlock
          language="python"
          code={`import os

def check_audio_file(path):
    if not os.path.exists(path):
        print("File does not exist")
        return False

    size_mb = os.path.getsize(path) / (1024 * 1024)
    print(f"File size: {size_mb:.2f} MB")

    if size_mb > 10:
        print("File exceeds 10 MB limit")
        return False

    return True

check_audio_file("your_audio.wav")`}
        />
      </div>
    </div>
  );
}
