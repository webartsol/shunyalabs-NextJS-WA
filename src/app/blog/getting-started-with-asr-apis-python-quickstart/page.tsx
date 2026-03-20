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
//         title="Getting Started with ASR APIs: Python Quickstart"
//         author="Harish Kumar"
//         role="Senior Business Analyst"
//         imageSrc="/assets/blog/6.png"
//       />
// <p>Ever wonder how your phone transcribes your voice messages or how virtual assistants understand your commands? 
//     The magic behind it is <strong>Automatic Speech Recognition (ASR)</strong>. ASR APIs allow developers to integrate this powerful technology into their own applications. </p>
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
// <h2>Integrating ASR APIs with Python</h2>
// <p>Automatic Speech Recognition (ASR) APIs allow your applications to convert spoken language into text, unlocking powerful new user experiences. 
//     Let's go step by step so you can confidently integrate ASR APIs—using Python </p>
//     <p>We'll use the requests library to handle all our communication with the API.</p>
// <h3><strong>Step 1: Set Up Your Environment</strong></h3>
// <p>First, create a virtual environment and install requests.</p>
// <CodeBlock
//   language="bash"
//   code={`# Create and activate a virtual environment
// python -m venv venv
// source venv/bin/activate  # On Windows, use 'venv\\Scripts\\activate'
// # Install the necessary library
// pip install requests`}
// />
// <h3><strong>Step 2: Building the Python Script</strong></h3>
// <p>Create a file named <em>transcribe_shunya.py</em> and let's build it section by section.</p>
// <h4><strong>Part A: Configuration</strong></h4>
// <p>First, we'll import the necessary libraries and set up our configuration variables at the top of the file. This makes them easy to change later.</p>
// <p>Create a file named <em>transcribe_shunya.py</em> and let's build it section by section.</p>
// <CodeBlock language="python" code={`# transcribe_shunya.py
// import requests
// import time
// import sys 
// # --- Configuration --- 
// API_KEY = "YOUR_SHUNYA_LABS_API_KEY" 
// API_URL = "https://api.shunya.org/v1/transcribe" 
// AUDIO_FILE_PATH = "my_punjabi_audio.wav" 
// # --------------------
// `} />
// <p>Here’s what each variable does:</p>
// <ul>
//     <li>API_KEY: Your personal authentication token.</li>
//     <li>API_URL: The endpoint where transcription jobs are submitted.</li>
//     <li>AUDIO_FILE_PATH: Path to your local audio file.</li>
// </ul>
// <h4><strong>Part B: Submitting the Transcription Job</strong></h4>
// <p>This function handles the initial POST request. It opens your audio file, specifies the language model (pingalla), and sends it all to the API to start the process.</p>
// <CodeBlock language="python" code={`def submit_transcription_job(api_url, api_key, file_path):
//    """Submits the audio file to the ASR API and returns the job ID."""
//   print("1. Submitting transcription job...")
//   headers = { "Authorization": f"Token {api_key}"}


// # Specify language and model; adjust based on API docs
// payload = {
//  "language": "pn",
// "model": "pingala-v1"}
// try:
// # We open the file in binary read mode ('rb')
// with open(file_path, 'rb') as audio_file:
// # The 'files' dictionary is how 'requests' handles multipart/form-data
// files = {'audio_file': (file_path, audio_file, 'audio/wav')}
// response = requests.post(api_url, headers=headers, data=payload, files=files)
// response.raise_for_status() # This will raise an error for bad responses (4xx or 5xx)
//  job_id = response.json().get("job_id")
// print(f"   -> Job submitted successfully with ID: {job_id}")
// return job_id
// except requests.exceptions.RequestException as e:
// print(f"   -> Error submitting job: {e}")
// return None
// `} />
// <h4><strong>Part C: Displaying the Transcription Result</strong></h4>
// <p>Once the API finishes processing, it returns a JSON response containing your transcription and metadata.</p>
// <CodeBlock language="python" code={`def print_transcription_result(result):
// """Display transcription text and segments."""
//  if not result or not result.get("success"):
// print("❌ Transcription failed.")
//  Return
// print("\n✅ Transcription Complete!")
// print("=" * 50)
// print("Final Transcript:\n")
// print(result.get("text", "No transcript found"))
// print("=" * 50)
//  # Optional: print speaker segments
// if result.get("segments"):
// print("\nSpeaker Segments:")
// for seg in result["segments"]:
// print(f"[{seg['start']}s → {seg['end']}s] {seg['speaker']}: {seg['text']}")
// `} />
// <h4><strong>Part D: Putting It All Together</strong></h4>
// <p>Finally, the main function orchestrates the entire process by calling our functions in the correct order. The if __name__ == "__main__": block ensures this code only runs when the script is executed directly.</p>
// <CodeBlock language="python" code={`def main():
// """Main function to run the transcription process."""
// result = submit_transcription_job(API_URL, API_KEY, AUDIO_FILE_PATH)

// if result:
// print_transcription_result(result)
// if __name__ == "__main__":
// main()
// `} />
// <h3><strong>Step 3: Run the Python Script</strong></h3>
// <p>With your audio file in the same folder, run:</p>
// <p><em>python transcribe_shunya.py</em></p>
// <p>If everything’s set up correctly, you’ll see:</p>
// <CodeBlock language="python" code={`If everything’s set up correctly, you’ll see:
// 1. Submitting a transcription job…

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
// <p>You can also use <strong>WebSocket streaming</strong> for near real-time transcription at:</p>
// <p><em>wss://tb.shunyalabs.ai/ws</em></p>
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
// <li><strong>5. Enable diarization</strong> to detect who’s speaking in multi-speaker audio.</li>
// </ol>
// <h2><strong>Using the REST API Directly (Optional)</strong></h2>
// <p>If you prefer using curl, try this:</p>
// <CodeBlock language="python" code={`curl -X POST "https://tb.shunyalabs.ai/transcribe" \
// -H "X-API-Key: YOUR_SHUNYALABS_API_KEY" \
// -F "file=@sample.wav" \
//  -F "language_code=auto" \
// -F "output_script=auto"\
// `} />
// <p>The API responds with JSON:</p>
// <CodeBlock language="python" code={`{
// "success": true,
// "text": "Good morning everyone, this is a sample transcription using ShunyaLabs ASR.",
// "detected_language": "English",
// "segments": [
// {"start": 0.0, "end": 3.5, "speaker": "SPEAKER_00", "text": "Good morning everyone"}]
// }
// `} />
// <p><strong>Final Thoughts</strong></p>
// <p>You’ve just built a working speech-to-text integration using Python and the ShunyaLabs Pingala ASR API -  
//     the same foundation that powers real-time captioning, transcription tools, and voice analytics platforms.
// </p>
//     <p>With its multilingual support, low-latency WebSocket streaming, and simple REST API, 
//         Pingala makes it easy for developers to integrate accurate ASR into any workflow - whether you’re building for India or the world.</p>
//         <p>Automatic Speech Recognition bridges the gap between humans and machines, making technology more natural and inclusive.</p>
//         <p>As models like Pingala V1 continue advancing in language accuracy and CPU efficiency, 
//             ASR is becoming not just smarter, but also more accessible — ready to transform every app that can listen.</p>
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
                className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 transition z-10"
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
              title="Getting Started with ASR APIs: Python Quickstart"
              author="Harish Kumar"
              role="Senior Business Analyst"
              category="Build & Learn"
              date="23 Oct 2025"
              imageSrc="/assets/blog/Build-and-Learn.png"
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
              <h2 className="text-3xl font-bold text-white">Integrating ASR APIs with Python</h2>

              <p className="text-lg leading-relaxed">
                Automatic Speech Recognition (ASR) APIs allow your applications to convert spoken language into text, unlocking powerful new user experiences. 
                Let's go step by step so you can confidently integrate ASR APIs—using Python.
              </p>

              <p className="text-lg leading-relaxed">
                We'll use the <code className="bg-gray-800 px-2 py-1 rounded">requests</code> library to handle all our communication with the API.
              </p>
            </section>

            {/* Step 1 */}
            <section className="space-y-6 mt-12">
              <h3 className="text-2xl font-semibold text-gray-100">
                <strong>Step 1: Set Up Your Environment</strong>
              </h3>

              <p className="text-lg leading-relaxed">
                First, create a virtual environment and install <code className="bg-gray-800 px-2 py-1 rounded">requests</code>.
              </p>

              <CodeBlock
                language="bash"
                code={`# Create and activate a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows, use 'venv\\Scripts\\activate'

# Install the necessary library
pip install requests`}
              />
            </section>

            {/* Step 2 */}
            <section className="space-y-6 mt-12">
              <h3 className="text-2xl font-semibold text-gray-100">
                <strong>Step 2: Building the Python Script</strong>
              </h3>

              <p className="text-lg leading-relaxed">
                Create a file named <code className="bg-gray-800 px-2 py-1 rounded">transcribe_shunya.py</code> and let's build it section by section.
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
                  language="python" 
                  code={`# transcribe_shunya.py
import requests
import time
import sys 

# --- Configuration --- 
API_KEY = "YOUR_SHUNYA_LABS_API_KEY" 
API_URL = "https://api.shunya.org/v1/transcribe" 
AUDIO_FILE_PATH = "my_punjabi_audio.wav" 
# --------------------`} 
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
                  language="python" 
                  code={`def submit_transcription_job(api_url, api_key, file_path):
    """Submits the audio file to the ASR API and returns the job ID."""
    print("1. Submitting transcription job...")
    headers = {"Authorization": f"Token {api_key}"}

    # Specify language and model; adjust based on API docs
    payload = {
        "language": "pn",
        "model": "pingala-v1"
    }
    
    try:
        # We open the file in binary read mode ('rb')
        with open(file_path, 'rb') as audio_file:
            # The 'files' dictionary is how 'requests' handles multipart/form-data
            files = {'audio_file': (file_path, audio_file, 'audio/wav')}
            response = requests.post(api_url, headers=headers, data=payload, files=files)
            response.raise_for_status()  # This will raise an error for bad responses (4xx or 5xx)
            
            job_id = response.json().get("job_id")
            print(f"   -> Job submitted successfully with ID: {job_id}")
            return job_id
    except requests.exceptions.RequestException as e:
        print(f"   -> Error submitting job: {e}")
        return None`} 
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
                  language="python" 
                  code={`def print_transcription_result(result):
    """Display transcription text and segments."""
    if not result or not result.get("success"):
        print("❌ Transcription failed.")
        return
    
    print("\\n✅ Transcription Complete!")
    print("=" * 50)
    print("Final Transcript:\\n")
    print(result.get("text", "No transcript found"))
    print("=" * 50)
    
    # Optional: print speaker segments
    if result.get("segments"):
        print("\\nSpeaker Segments:")
        for seg in result["segments"]:
            print(f"[{seg['start']}s → {seg['end']}s] {seg['speaker']}: {seg['text']}")`} 
                />
              </div>

              {/* Part D */}
              <div className="space-y-4 mt-8">
                <h4 className="text-xl font-semibold text-gray-100">
                  <strong>Part D: Putting It All Together</strong>
                </h4>

                <p className="text-lg leading-relaxed">
                  Finally, the main function orchestrates the entire process by calling our functions in the correct order. The <code className="bg-gray-800 px-2 py-1 rounded">if __name__ == "__main__":</code> block ensures this code only runs when the script is executed directly.
                </p>

                <CodeBlock 
                  language="python" 
                  code={`def main():
    """Main function to run the transcription process."""
    result = submit_transcription_job(API_URL, API_KEY, AUDIO_FILE_PATH)
    
    if result:
        print_transcription_result(result)

if __name__ == "__main__":
    main()`} 
                />
              </div>
            </section>

            {/* Step 3 */}
            <section className="space-y-6 mt-12">
              <h3 className="text-2xl font-semibold text-gray-100">
                <strong>Step 3: Run the Python Script</strong>
              </h3>

              <p className="text-lg leading-relaxed">
                With your audio file in the same folder, run:
              </p>

              <CodeBlock 
                language="bash" 
                code={`python transcribe_shunya.py`} 
              />

              <p className="text-lg leading-relaxed mt-4">If everything's set up correctly, you'll see:</p>

              <CodeBlock 
                language="text" 
                code={`1. Submitting transcription job…
   -> Job submitted successfully with ID: abc123

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

              <p className="text-lg leading-relaxed mt-4">
                You can also use <strong>WebSocket streaming</strong> for near real-time transcription at:
              </p>

              <p className="text-lg leading-relaxed">
                <code className="bg-gray-800 px-3 py-1 rounded">wss://tb.shunyalabs.ai/ws</code>
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
                <li className="pl-2">
                  <strong>Enable diarization</strong> to detect who's speaking in multi-speaker audio.
                </li>
              </ol>
            </section>

            {/* REST API Section */}
            <section className="space-y-6 mt-12">
              <h2 className="text-3xl font-bold text-white">
                <strong>Using the REST API Directly (Optional)</strong>
              </h2>

              <p className="text-lg leading-relaxed">If you prefer using curl, try this:</p>

              <CodeBlock 
                language="bash" 
                code={`curl -X POST "https://tb.shunyalabs.ai/transcribe" \\
  -H "X-API-Key: YOUR_SHUNYALABS_API_KEY" \\
  -F "file=@sample.wav" \\
  -F "language_code=auto" \\
  -F "output_script=auto"`} 
              />

              <p className="text-lg leading-relaxed mt-6">The API responds with JSON:</p>

              <CodeBlock 
                language="json" 
                code={`{
  "success": true,
  "text": "Good morning everyone, this is a sample transcription using ShunyaLabs ASR.",
  "detected_language": "English",
  "segments": [
    {
      "start": 0.0,
      "end": 3.5,
      "speaker": "SPEAKER_00",
      "text": "Good morning everyone"
    }
  ]
}`} 
              />
            </section>

            {/* Final Thoughts */}
            <section className="space-y-6 mt-16">
              <h2 className="text-3xl font-bold text-white">
                <strong>Final Thoughts</strong>
              </h2>

              <p className="text-lg leading-relaxed">
                You've just built a working speech-to-text integration using Python and the ShunyaLabs Pingala ASR API - 
                the same foundation that powers real-time captioning, transcription tools, and voice analytics platforms.
              </p>

              <p className="text-lg leading-relaxed">
                With its multilingual support, low-latency WebSocket streaming, and simple REST API, 
                Pingala makes it easy for developers to integrate accurate ASR into any workflow - whether you're building for India or the world.
              </p>

              <p className="text-lg leading-relaxed">
                Automatic Speech Recognition bridges the gap between humans and machines, making technology more natural and inclusive.
              </p>

              <p className="text-lg leading-relaxed">
                As models like Pingala V1 continue advancing in language accuracy and CPU efficiency, 
                ASR is becoming not just smarter, but also more accessible — ready to transform every app that can listen.
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