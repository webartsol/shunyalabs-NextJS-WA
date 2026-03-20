// 'use client';
// import Navbar from "@/app/Layouts/Navbar";
// import MainFooter from "@/app/Layouts/MainFooter";
// import Image from "next/image";
// import { BlogHeader } from "@/app/Layouts/BlogHeader";
// import AuthorBio from "@/app/Layouts/AuthorBio";
// import { FiCheck, FiCopy } from "react-icons/fi";
// import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
// import { useState } from "react";
// import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";

// // ✅ A reusable CodeBlock component
// function CodeBlock({
//     language,
//     code,
// }: {
//     language: string;
//     code: string;
// }) {
//     const [copied, setCopied] = useState(false);

//     const handleCopy = async () => {
//         try {
//             await navigator.clipboard.writeText(code);
//             setCopied(true);
//             setTimeout(() => setCopied(false), 1500);
//         } catch (err) {
//             console.error("Failed to copy code:", err);
//         }
//     };

//     return (
//         <div className="relative mb-6">
//             {/* Copy button */}
//             <button
//                 onClick={handleCopy}
//                 className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 transition"
//                 title="Copy code"
//             >
//                 {copied ? <FiCheck className="text-green-600 mt-2" /> : <FiCopy className="mt-2" />}
//             </button>

//             {/* Code block */}
//             <SyntaxHighlighter
//                 language={language}
//                 style={oneLight}
//                 customStyle={{
//                     borderRadius: "10px",
//                     padding: "14px",
//                     fontSize: "14px",
//                     backgroundColor: "#f9f9f9",
//                 }}
//             >
//                 {code.trim()}
//             </SyntaxHighlighter>
//         </div>
//     );
// }

// export default function BenchmarkingASRBlog() {
//   return (
//     <div className="min-h-screen bg-shunya-labs text-gray-200">
//       <Navbar />

//       <div className="max-w-5xl mx-auto px-3 md:px-10 pb-8 md:py-10">
//       <div className="bg-black/40 p-6 md:p-10 rounded-2xl shadow-lg border border-gray-800 mt-8">
//       <div className="blog-content">
//       <BlogHeader
//         title="Getting Started with ASR APIs: Node.js Quickstart"
//         author="Harish Kumar"
//         role="Senior Business Analyst"
//         imageSrc="/assets/blog/5.png"
//       />
// <p>Ever wonder how your phone transcribes your voice messages or how virtual assistants understand your commands? 
//     The magic behind it is Automatic Speech Recognition (ASR). ASR APIs allow developers to integrate this powerful technology into their own applications.&nbsp;</p>
//     <h2>What is an ASR API?</h2>
//     <p>An <strong>ASR API</strong> is a service that converts spoken language (audio) into written text. You send an audio file to the API, 
//     and it returns a transcription. This is incredibly useful for a wide range of applications, 
//     from creating subtitles for videos to enabling voice-controlled interfaces and analyzing customer service calls.</p>
//     <p>This simple process enables complex features like:</p>
//     <ul>
// <li>🎬 Auto-generated subtitles</li>
// <li>🗣️ Voice-controlled applications</li>
// <li>📞 Speech analytics for customer calls</li>
// </ul>
// <p>Before we dive into the code, you'll need two things for most ASR providers:</p>
// <ol>
// <li><strong>1. An API Key</strong>: Sign up with an ASR provider (like Google Cloud Speech-to-Text, AssemblyAI, 
// Deepgram, or AWS Transcribe) to get your unique API key. This key authenticates your requests.</li>
// <li><strong>2. An Audio File</strong>: Have a sample audio file (e.g., in .wav, .mp3, or .m4a format) ready to test. 
// For this guide, we'll assume you have a file named my-audio.wav.</li>
// <li><strong>3. API Endpoint</strong>: The URL for the service, which we'll assume is https://api.shunya.org/v1/transcribe.</li>
// </ol>
// <h2>Integrating ASR APIs with Node.js</h2>
// <p>Let’s go step by step and build a working Node.js script that sends an audio file to ShunyaLabs Pingala ASR API, 
//     retrieves the transcription, and displays it neatly on your terminal.</p>
//     <p>We’ll use the following dependencies:</p>
// <ul>
// <li>axios — for HTTP communication</li>
// <li>form-data — to handle multipart file uploads</li>
// </ul>
// <h3><strong>Step 1: Set Up Your Environment</strong></h3>
// <p>Make sure you have Node.js v14+ installed, then set up your project:</p>
// <CodeBlock language="bash" code={`# Create a project folder
// mkdir asr-node-demo && cd asr-node-demo

// # Initialize npm
// npm init -y
// # Install dependencies
// npm install axios form-data`} />
// <h3><strong>Step 2: Building the Node.js Script</strong></h3>
// <p>Create a file named <em>transcribe_shunya.js</em> and let's build it section by section.</p>
// <h4><strong>Part A: Configuration</strong></h4>
// <p>First, we'll import the necessary libraries and set up our configuration variables at the top of the file. This makes them easy to change later.</p>
// <p>Create a file named <em>transcribe_shunya.js</em> and let's build it section by section.</p>
// <CodeBlock language="bash" code={`---transcribe_shunya.js
// import fs from "fs";
// import axios from "axios";
// import FormData from "form-data";
// --- Configuration —
// const API_KEY = "YOUR_SHUNYA_LABS_API_KEY";
// const API_URL = "https://tb.shunyalabs.ai/transcribe";
// const AUDIO_FILE_PATH = "sample.wav";
// `} />
// <p>Here’s what each variable does:</p>
// <ul>
//     <li>API_KEY: Your personal authentication token.</li>
//     <li>API_URL: The endpoint where transcription jobs are submitted.</li>
// </ul>
// <h4>AUDIO_FILE_PATH: Path to your local audio file.</h4>
// <h4><strong>Part B: Submitting the Transcription Job</strong></h4>
// <p>This function handles the initial POST request. It opens your audio file, specifies the language model (pingalla), and sends it all to the API to start the process.</p>
// <CodeBlock language="bash" code={`async function submitTranscriptionJob(apiUrl, apiKey, filePath)
//  {
//  console.log("1. Submitting transcription job...");
// const form = new FormData();
// form.append("file", fs.createReadStream(filePath));
// form.append("language_code", "auto");
// form.append("output_script", "auto");
// try {
// const response = await axios.post(apiUrl, form, {
// headers: 
// { "X-API-Key": apiKey,
// ...form.getHeaders(),
//  },
//  });
// console.log("   -> Job submitted successfully!");
// return response.data;
// } 
// catch (error) {
// console.error("   -> Error submitting job:", error.response?.data || error.message);
// return null;
// }
// }
// `} />
// <h4><strong>Part C: Displaying the Transcription Result</strong></h4>
// <p>Once the API finishes processing, it returns a JSON response containing your transcription and metadata.</p>
// <CodeBlock language="bash" code={`function printTranscriptionResult(result) {
//   if (!result || !result.success) {
//     console.log("❌ Transcription failed.");
//     return;
//   }

//   console.log("\\n✅ Transcription Complete!");
//   console.log("=".repeat(50));
//   console.log("Final Transcript:\\n");
//   console.log(result.text || "No transcript found");
//   console.log("=".repeat(50));

//   if (result.segments && result.segments.length) {
//     console.log("\\nSpeaker Segments:");
//     result.segments.forEach((seg) => {
//       console.log(\`[\${seg.start}s → \${seg.end}s] \${seg.speaker}: \${seg.text}\`);
//     });
//   }
// }
// `} />
// <h4><strong>Part D: Putting It All Together</strong></h4>
// <p>Finally, the main function orchestrates the entire process by calling our functions in the correct order. The if __name__ == "__main__": block ensures this code only runs when the script is executed directly.</p>
// <CodeBlock language="bash" code={`async function main() 
// {
// const result = await submitTranscriptionJob(API_URL, API_KEY, AUDIO_FILE_PATH);
// if (result) {
// printTranscriptionResult(result);
// }
// }
// main();
// `} />
// <h3><strong>Step 3: Run the node.js Script</strong></h3>
// <p>With your audio file in the same folder, run:</p>
// <p><em>node transcribe_shunya.js</em></p>
// <p>If everything’s set up correctly, you’ll see:</p>
// <CodeBlock language="bash" code={`1. Submitting a transcription job…

// → Job submitted successfully with ID: abc123
// ✅ Transcription Complete!
// Final Transcript:
// ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਤੁਸੀਂ ਕਿਵੇਂ ਹੋ?
// `} />
// <h2><strong>How It Works Behind the Scenes</strong></h2>
// <p>Here’s what your script actually does step by step:</p>
// <ol>
// <li><strong>1. Upload: </strong>The script sends your audio and metadata to ShunyaLabs’ ASR REST API.</li>
// <li><strong>2. Processing: </strong>The backend model (Pingala V1) performs multilingual ASR, handling Indian languages, accents, and speech clarity.</li>
// <li><strong>3. Response: </strong>The API returns a JSON response with:</li>
// <ul>
// <li>Full text transcript</li>
// <li>Timestamps for each segment</li>
// <li>Speaker diarization info (if enabled)</li>
// </ul>
// </ol>
// <p>This same pattern — submit → poll → retrieve — is used by nearly every ASR provider, from Google Cloud to AssemblyAI to Pingala.</p>
// <h3><strong>Best Practices</strong></h3>
// <ol>
// <li> <strong>1. </strong>Keep files under 10 MB for WebSocket requests (REST supports larger).</li>
// <li><strong>2. Store API keys securely: </strong><em>export SHUNYA_API_KEY="your_key_here"</em></li>
// <li>Use clean mono audio (16kHz) for best accuracy.</li>
// <li><strong>3. Experiment with parameters</strong> like:</li>
// <ul>
// <li>--language-code hi for Hindi</li>
// <li>--output-script Devanagari for Hindi text output</li>
// </ul>
// </ol>
// <p><strong>Final Thoughts</strong></p>
// <p>You’ve just built a working speech-to-text integration in Node.js using ShunyaLabs Pingala ASR API -  
//     the same technology that powers real-time captioning, transcription tools, and voice analytics systems.</p>
//     <p>With its multilingual support, low-latency streaming, and simple REST/WebSocket APIs, Pingala makes it easy for developers to bring accurate, 
//         fast, and inclusive ASR into any workflow -&nbsp; whether for India or the world.</p>
//         <p>Automatic Speech Recognition bridges the gap between humans and machines, making technology more natural and inclusive.</p>
//         <p>As models like Pingala V1 continue to improve in accuracy and efficiency, ASR is becoming not only smarter -&nbsp; but accessible to every app that can listen.</p>
// </div>
// <AuthorBio/>
// </div>
// </div>
//       <MainFooter />

//     </div>
//   );
// }
'use client';
import Navbar from "@/app/Layouts/Navbar";
import MainFooter from "@/app/Layouts/MainFooter";
import Image from "next/image";
import { BlogHeader } from "@/app/Layouts/BlogHeader";
import AuthorBio from "@/app/Layouts/BioHarishKumar";
import { FiCheck, FiCopy } from "react-icons/fi";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { useState } from "react";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import Footer from "@/app/Layouts/Footer";

// ✅ A reusable CodeBlock component
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
      {/* Copy button */}
      <button
        onClick={handleCopy}
        className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 transition z-10 "
        title="Copy code"
      >
        {copied ? <FiCheck className="text-green-600 mt-2" /> : <FiCopy className="mt-2" />}
      </button>

      {/* Code block */}
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

export default function BenchmarkingASRBlog() {
  return (
    <div className="min-h-screen bg-shunya-labs text-gray-200 pt-24">
      <Navbar />

      <div className="max-w-5xl mx-auto px-3 md:px-10 pb-8 md:py-10">
        <div className="bg-black/40 p-6 md:p-10 rounded-2xl shadow-lg border border-gray-800 mt-8">
          <div className="blog-content space-y-8">
            <BlogHeader
              title="Getting Started with ASR APIs: Node.js Quickstart"
              author="Harish Kumar"
              role="Senior Business Analyst"
              category="Build & Learn"
              date="23 Oct 2025"
              imageSrc="/assets/blog/Build-and-Learn-1.png"
            />

            <p className="text-lg leading-relaxed">
              Ever wonder how your phone transcribes your voice messages or how virtual assistants understand your commands?
              The magic behind it is <strong>Automatic Speech Recognition (ASR)</strong>. ASR APIs allow developers to integrate this powerful technology into their own applications.
            </p>

            {/* What is ASR API */}
            <section className="space-y-6 mt-12">
              <h2 className="text-3xl font-bold text-white">What is an ASR API?</h2>

              <p className="text-lg leading-relaxed">
                An <strong>ASR API</strong> is a service that converts spoken language (audio) into written text. You send an audio file to the API,
                and it returns a transcription. This is incredibly useful for a wide range of applications,
                from creating subtitles for videos to enabling voice-controlled interfaces and analyzing customer service calls.
              </p>

              <p className="text-lg leading-relaxed">This simple process enables complex features like:</p>

              <ul className="list-disc list-outside ml-8 space-y-2 text-lg leading-relaxed">
                <li className="pl-2">🎬 Auto-generated subtitles</li>
                <li className="pl-2">🗣️ Voice-controlled applications</li>
                <li className="pl-2">📞 Speech analytics for customer calls</li>
              </ul>

              <p className="text-lg leading-relaxed mt-6">Before we dive into the code, you'll need two things for most ASR providers:</p>

              <ol className="list-decimal list-outside ml-8 space-y-3 text-lg leading-relaxed mt-4">
                <li className="pl-2">
                  <strong>An API Key</strong>: Sign up with an ASR provider (like Google Cloud Speech-to-Text, AssemblyAI,
                  Deepgram, or AWS Transcribe) to get your unique API key. This key authenticates your requests.
                </li>
                <li className="pl-2">
                  <strong>An Audio File</strong>: Have a sample audio file (e.g., in .wav, .mp3, or .m4a format) ready to test.
                  For this guide, we'll assume you have a file named <code className="bg-gray-800 px-2 py-1 rounded">my-audio.wav</code>.
                </li>
                <li className="pl-2">
                  <strong>API Endpoint</strong>: The URL for the service, which we'll assume is <code className="bg-gray-800 px-2 py-1 rounded">https://api.shunya.org/v1/transcribe</code>.
                </li>
              </ol>
            </section>

            {/* Integration Section */}
            <section className="space-y-6 mt-12">
              <h2 className="text-3xl font-bold text-white">Integrating ASR APIs with Node.js</h2>

              <p className="text-lg leading-relaxed">
                Let's go step by step and build a working Node.js script that sends an audio file to ShunyaLabs Pingala ASR API,
                retrieves the transcription, and displays it neatly on your terminal.
              </p>

              <p className="text-lg leading-relaxed">We'll use the following dependencies:</p>

              <ul className="list-disc list-outside ml-8 space-y-2 text-lg leading-relaxed">
                <li className="pl-2"><code className="bg-gray-800 px-2 py-1 rounded">axios</code> — for HTTP communication</li>
                <li className="pl-2"><code className="bg-gray-800 px-2 py-1 rounded">form-data</code> — to handle multipart file uploads</li>
              </ul>
            </section>

            {/* Step 1 */}
            <section className="space-y-6 mt-12">
              <h3 className="text-2xl font-semibold text-gray-100">
                <strong>Step 1: Set Up Your Environment</strong>
              </h3>

              <p className="text-lg leading-relaxed">
                Make sure you have Node.js v14+ installed, then set up your project:
              </p>

              <CodeBlock
                language="bash"
                code={`# Create a project folder
mkdir asr-node-demo && cd asr-node-demo

# Initialize npm
npm init -y

# Install dependencies
npm install axios form-data`}
              />
            </section>

            {/* Step 2 */}
            <section className="space-y-6 mt-12">
              <h3 className="text-2xl font-semibold text-gray-100">
                <strong>Step 2: Building the Node.js Script</strong>
              </h3>

              <p className="text-lg leading-relaxed">
                Create a file named <code className="bg-gray-800 px-2 py-1 rounded">transcribe_shunya.js</code> and let's build it section by section.
              </p>

              {/* Part A */}
              <div className="space-y-4 mt-8">
                <h4 className="text-xl font-semibold text-gray-100">
                  <strong>Part A: Configuration</strong>
                </h4>

                <p className="text-lg leading-relaxed">
                  First, we'll import the necessary libraries and set up our configuration variables at the top of the file. This makes them easy to change later.
                </p>

                <CodeBlock
                  language="javascript"
                  code={`// transcribe_shunya.js
import fs from "fs";
import axios from "axios";
import FormData from "form-data";

// --- Configuration ---
const API_KEY = "YOUR_SHUNYA_LABS_API_KEY";
const API_URL = "https://tb.shunyalabs.ai/transcribe";
const AUDIO_FILE_PATH = "sample.wav";
// --------------------`}
                />

                <p className="text-lg leading-relaxed">Here's what each variable does:</p>

                <ul className="list-disc list-outside ml-8 space-y-2 text-lg leading-relaxed">
                  <li className="pl-2"><strong>API_KEY</strong>: Your personal authentication token.</li>
                  <li className="pl-2"><strong>API_URL</strong>: The endpoint where transcription jobs are submitted.</li>
                  <li className="pl-2"><strong>AUDIO_FILE_PATH</strong>: Path to your local audio file.</li>
                </ul>
              </div>

              {/* Part B */}
              <div className="space-y-4 mt-8">
                <h4 className="text-xl font-semibold text-gray-100">
                  <strong>Part B: Submitting the Transcription Job</strong>
                </h4>

                <p className="text-lg leading-relaxed">
                  This function handles the initial POST request. It opens your audio file, specifies the language model (pingalla), and sends it all to the API to start the process.
                </p>

                <CodeBlock
                  language="javascript"
                  code={`async function submitTranscriptionJob(apiUrl, apiKey, filePath) {
  console.log("1. Submitting transcription job...");
  
  const form = new FormData();
  form.append("file", fs.createReadStream(filePath));
  form.append("language_code", "auto");
  form.append("output_script", "auto");
  
  try {
    const response = await axios.post(apiUrl, form, {
      headers: {
        "X-API-Key": apiKey,
        ...form.getHeaders(),
      },
    });
    
    console.log("   -> Job submitted successfully!");
    return response.data;
  } catch (error) {
    console.error("   -> Error submitting job:", error.response?.data || error.message);
    return null;
  }
}`}
                />
              </div>

              {/* Part C */}
              <div className="space-y-4 mt-8">
                <h4 className="text-xl font-semibold text-gray-100">
                  <strong>Part C: Displaying the Transcription Result</strong>
                </h4>

                <p className="text-lg leading-relaxed">
                  Once the API finishes processing, it returns a JSON response containing your transcription and metadata.
                </p>

                <CodeBlock
                  language="javascript"
                  code={`function printTranscriptionResult(result) {
  if (!result || !result.success) {
    console.log("❌ Transcription failed.");
    return;
  }

  console.log("\\n✅ Transcription Complete!");
  console.log("=".repeat(50));
  console.log("Final Transcript:\\n");
  console.log(result.text || "No transcript found");
  console.log("=".repeat(50));

  if (result.segments && result.segments.length) {
    console.log("\\nSpeaker Segments:");
    result.segments.forEach((seg) => {
      console.log(\`[\${seg.start}s → \${seg.end}s] \${seg.speaker}: \${seg.text}\`);
    });
  }
}`}
                />
              </div>

              {/* Part D */}
              <div className="space-y-4 mt-8">
                <h4 className="text-xl font-semibold text-gray-100">
                  <strong>Part D: Putting It All Together</strong>
                </h4>

                <p className="text-lg leading-relaxed">
                  Finally, the main function orchestrates the entire process by calling our functions in the correct order.
                </p>

                <CodeBlock
                  language="javascript"
                  code={`async function main() {
  const result = await submitTranscriptionJob(API_URL, API_KEY, AUDIO_FILE_PATH);
  
  if (result) {
    printTranscriptionResult(result);
  }
}

main();`}
                />
              </div>
            </section>

            {/* Step 3 */}
            <section className="space-y-6 mt-12">
              <h3 className="text-2xl font-semibold text-gray-100">
                <strong>Step 3: Run the Node.js Script</strong>
              </h3>

              <p className="text-lg leading-relaxed">
                With your audio file in the same folder, run:
              </p>

              <CodeBlock
                language="bash"
                code={`node transcribe_shunya.js`}
              />

              <p className="text-lg leading-relaxed mt-4">If everything's set up correctly, you'll see:</p>

              <CodeBlock
                language="text"
                code={`1. Submitting transcription job…
   -> Job submitted successfully!

✅ Transcription Complete!
==================================================
Final Transcript:

ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਤੁਸੀਂ ਕਿਵੇਂ ਹੋ?
==================================================`}
              />
            </section>

            {/* How It Works */}
            <section className="space-y-6 mt-12">
              <h2 className="text-3xl font-bold text-white">
                <strong>How It Works Behind the Scenes</strong>
              </h2>

              <p className="text-lg leading-relaxed">Here's what your script actually does step by step:</p>

              <ol className="list-decimal list-outside ml-8 space-y-3 text-lg leading-relaxed mt-4">
                <li className="pl-2">
                  <strong>Upload:</strong> The script sends your audio and metadata to ShunyaLabs' ASR REST API.
                </li>
                <li className="pl-2">
                  <strong>Processing:</strong> The backend model (Pingala V1) performs multilingual ASR, handling Indian languages, accents, and speech clarity.
                </li>
                <li className="pl-2">
                  <strong>Response:</strong> The API returns a JSON response with:
                  <ul className="list-disc list-outside ml-8 space-y-2 mt-2">
                    <li className="pl-2">Full text transcript</li>
                    <li className="pl-2">Timestamps for each segment</li>
                    <li className="pl-2">Speaker diarization info (if enabled)</li>
                  </ul>
                </li>
              </ol>

              <p className="text-lg leading-relaxed mt-6">
                This same pattern — submit → poll → retrieve — is used by nearly every ASR provider, from Google Cloud to AssemblyAI to Pingala.
              </p>
            </section>

            {/* Best Practices */}
            <section className="space-y-6 mt-12">
              <h3 className="text-2xl font-semibold text-gray-100">
                <strong>Best Practices</strong>
              </h3>

              <ol className="list-decimal list-outside ml-8 space-y-4 text-lg leading-relaxed">
                <li className="pl-2">
                  Keep files under 10 MB for WebSocket requests (REST supports larger).
                </li>
                <li className="pl-2">
                  <strong>Store API keys securely:</strong>
                  <CodeBlock
                    language="bash"
                    code={`export SHUNYA_API_KEY="your_key_here"`}
                  />
                </li>
                <li className="pl-2">
                  Use clean mono audio (16kHz) for best accuracy.
                </li>
                <li className="pl-2">
                  <strong>Experiment with parameters</strong> like:
                  <ul className="list-disc list-outside ml-8 space-y-2 mt-2">
                    <li className="pl-2"><code className="bg-gray-800 px-2 py-1 rounded">--language-code hi</code> for Hindi</li>
                    <li className="pl-2"><code className="bg-gray-800 px-2 py-1 rounded">--output-script Devanagari</code> for Hindi text output</li>
                  </ul>
                </li>
              </ol>
            </section>

            {/* Final Thoughts */}
            <section className="space-y-6 mt-16">
              <h2 className="text-3xl font-bold text-white">
                <strong>Final Thoughts</strong>
              </h2>

              <p className="text-lg leading-relaxed">
                You've just built a working speech-to-text integration in Node.js using ShunyaLabs Pingala ASR API -
                the same technology that powers real-time captioning, transcription tools, and voice analytics systems.
              </p>

              <p className="text-lg leading-relaxed">
                With its multilingual support, low-latency streaming, and simple REST/WebSocket APIs, Pingala makes it easy for developers to bring accurate,
                fast, and inclusive ASR into any workflow - whether for India or the world.
              </p>

              <p className="text-lg leading-relaxed">
                Automatic Speech Recognition bridges the gap between humans and machines, making technology more natural and inclusive.
              </p>

              <p className="text-lg leading-relaxed">
                As models like Pingala V1 continue to improve in accuracy and efficiency, ASR is becoming not only smarter - but accessible to every app that can listen.
              </p>
            </section>

            <div className="mt-16">
              <AuthorBio />
            </div>
          </div>
        </div>
      </div>
      <Footer
        text="One platform for speech in and speech out—secure by design, built to scale."
        title="The fastest way to add voice AI to your products"
      />

      <MainFooter />
    </div>
  );
}