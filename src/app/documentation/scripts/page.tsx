"use client";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState } from "react";
import { FiCopy, FiCheck } from "react-icons/fi";

export default function ScriptsPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const codeExample = `# Auto-detect script (recommended)
data = {"output_script": "auto"}

# Force Latin/roman script
data = {"output_script": "Latin"}

# Devanagari script
data = {"output_script": "Devanagari"}`;

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <div className="max-w-5xl mx-auto py-6 leading-relaxed">
        <h1 className="text-3xl font-semibold mb-6">Scripts</h1>

        <p className="mb-6">
          Use the{" "}
          <code className="bg-gray-200 px-1 rounded text-red-600">
            output_script
          </code>{" "}
          parameter to specify the writing system for your transcription output.
          ShunyaLabs supports <b>30+ writing scripts</b>.
        </p>

        {/* ==== Scripts Table ==== */}
        <div className="overflow-x-auto mb-10">
          <table className="w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100 text-gray-800 font-semibold">
              <tr>
                <th className="border px-3 py-2 text-left">Script Code</th>
                <th className="border px-3 py-2 text-left">Script Name</th>
                <th className="border px-3 py-2 text-left">Languages Supported</th>
                <th className="border px-3 py-2 text-left">Example</th>
              </tr>
            </thead>
            <tbody>
              {scripts.map((row) => (
                <tr key={row.code}>
                  <td className="border px-3 py-2 font-mono text-red-600">{row.code}</td>
                  <td className="border px-3 py-2">{row.name}</td>
                  <td className="border px-3 py-2">{row.languages}</td>
                  <td className="border px-3 py-2">{row.example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ==== Code Example ==== */}
        <h2 className="text-2xl font-semibold mb-3">Script Usage Examples</h2>
        <div className="relative group">
<button
  onClick={() => handleCopy(codeExample)}
  className="absolute top-2 right-3 text-gray-500 hover:text-gray-700 transition"
  title="Copy code"
>
  {copied ? (
    <FiCheck className="text-green-600 mt-2" />
  ) : (
    <FiCopy className="mt-2" />
  )}
</button>


          <SyntaxHighlighter
            language="python"
            style={oneLight}
            customStyle={{
              borderRadius: "8px",
              fontSize: "0.9rem",
              padding: "1rem",
            }}
          >
            {codeExample}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}

/* ===== Data ===== */
const scripts = [
  { code: "auto", name: "Auto-detect", languages: "All languages", example: "System automatically selects" },
  { code: "latin", name: "Latin/Roman", languages: "144+ languages", example: "Everything starts forever" },
  { code: "devanagari", name: "Devanagari", languages: "21+ languages", example: "सब कुछ सदा शुरू होता है" },
  { code: "bengali", name: "Bengali", languages: "2+ languages", example: "সব কিছু চিরকাল শুরু হয়" },
  { code: "gurmukhi", name: "Gurmukhi", languages: "1+ language", example: "ਸਭ ਕੁਝ ਸਦਾ ਸ਼ੁਰੂ ਹੁੰਦਾ ਹੈ" },
  { code: "gujarati", name: "Gujarati", languages: "1+ language", example: "બધું સદાકાળ શરૂ થાય છે" },
  { code: "oriya", name: "Odia", languages: "1+ language", example: "ସବୁକିଛି ସଦାରଣ ଆରମ୍ଭ ହୁଏ" },
  { code: "tamil", name: "Tamil", languages: "1+ language", example: "எல்லாமும் என்றென்றும் தொடங்குகிறது" },
  { code: "telugu", name: "Telugu", languages: "1+ language", example: "అన్నీ ఎప్పటికీ ప్రారంభమవుతాయి" },
  { code: "kannada", name: "Kannada", languages: "1+ language", example: "ಎಲ್ಲವೂ ಶಾಶ್ವತವಾಗಿ ಆರಂಭವಾಗುತ್ತದೆ" },
  { code: "malayalam", name: "Malayalam", languages: "1+ language", example: "എല്ലാം എന്നെന്നും തുടങ്ങുന്നു" },
  { code: "sinhala", name: "Sinhala", languages: "1+ language", example: "සියල්ලම සදාකාලිකව ආරම්භ වේ" },
  { code: "thai", name: "Thai", languages: "1+ language", example: "ทุกอย่างเริ่มต้นตลอดไป" },
  { code: "lao", name: "Lao", languages: "1+ language", example: "ທຸກສິ່ງທຸກຢ່າງເລີ່ມຕົ້ນຕະຫຼອດໄປ" },
  { code: "burmese", name: "Burmese", languages: "1+ language", example: "အရာအားလုံးစတင်နေဆဲဖြစ်သည်" },
  { code: "khmer", name: "Khmer", languages: "1+ language", example: "អ្វីគ្រប់យ៉ាងចាប់ផ្តើមជានិច្ច" },
  { code: "arabic", name: "Arabic", languages: "17+ languages", example: "كل شيء يبدأ إلى الأبد" },
  { code: "hebrew", name: "Hebrew", languages: "1+ language", example: "הכול מתחיל לנצח" },
  { code: "armenian", name: "Armenian", languages: "1+ language", example: "ամեն ինչ սկսվում է հավիտյան" },
  { code: "georgian", name: "Georgian", languages: "1+ language", example: "ყველაფერი იწყება სამუდამოდ" },
  { code: "greek", name: "Greek", languages: "1+ language", example: "Όλα ξεκινούν για πάντα" },
  { code: "cyrillic", name: "Cyrillic", languages: "11+ languages", example: "Все начинается навсегда" },
  { code: "mongolian", name: "Mongolian", languages: "1+ language", example: "Бүх зүйл үүрд эхэлдэг" },
  { code: "tibetan", name: "Tibetan", languages: "1+ language", example: "གཞན་གྱི་ཡིག་ཆའི་འགོ་འཛུགས" },
  { code: "korean", name: "Korean Hangul", languages: "1+ language", example: "모든 것은 영원히 시작됩니다" },
  { code: "chinese", name: "Chinese Simplified", languages: "2+ languages", example: "一切永远开始" },
  { code: "japanese", name: "Japanese", languages: "1+ language", example: "すべてが永遠に始まります" },
  { code: "latin-ext", name: "Latin Extended", languages: "All languages", example: "Omnia in aeternum incipiunt" },
];
