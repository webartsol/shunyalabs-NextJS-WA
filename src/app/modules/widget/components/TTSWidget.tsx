"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import axios from "axios";
import { GroupedLanguageSelect } from "./GroupedLanguageSelect";
import { useVakToken } from "@/app/hooks/useVakToken";
const MAX_CHARS = 1000;

const CODE_TO_LANGUAGE: Record<string, string> = {
  as: "Assamese", bn: "Bengali", brx: "Bodo", doi: "Dogri", en: "English",
  gu: "Gujarati", hi: "Hindi", kn: "Kannada", ks: "Kashmiri", kok: "Konkani",
  mai: "Maithili", ml: "Malayalam", mni: "Manipuri", mr: "Marathi",
  ne: "Nepali", or: "Odia", pa: "Punjabi", sa: "Sanskrit", sat: "Santali",
  sd: "Sindhi", ta: "Tamil", te: "Telugu", ur: "Urdu",
};

const FORMATS = ["mp3", "pcm", "wav", "ogg_opus", "flac", "mulaw", "alaw"];
const FORMAT_LABELS: Record<string, string> = {
  mp3: "MP3", pcm: "PCM", wav: "WAV", ogg_opus: "OGG Opus",
  flac: "FLAC", mulaw: "mu-law", alaw: "A-law",
};

const EXPRESSION_STYLES = [
  "Neutral", "Happy", "Sad", "Angry", "Fearful", "Surprised",
  "Disgust", "News", "Conversational", "Narrative", "Enthusiastic",
];

interface Voice {
  name: string;
  gender: "male" | "female";
  nativeLanguage: string;
  accentInfo: string;
  id: string;
  previewUrl?: string;
}

const ALL_VOICES: Voice[] = [
  { name: "Bimal", gender: "male", nativeLanguage: "Assamese", accentInfo: "Speaks all languages · Assamese accent", id: "bimal" },
  { name: "Anjana", gender: "female", nativeLanguage: "Assamese", accentInfo: "Speaks all languages · Assamese accent", id: "anjana" },
  { name: "Arjun", gender: "male", nativeLanguage: "Bengali", accentInfo: "Speaks all languages · Bengali accent", id: "arjun" },
  { name: "Priyanka", gender: "female", nativeLanguage: "Bengali", accentInfo: "Speaks all languages · Bengali accent", id: "priyanka" },
  { name: "Daimalu", gender: "male", nativeLanguage: "Bodo", accentInfo: "Speaks all languages · Bodo accent", id: "daimalu" },
  { name: "Hasina", gender: "female", nativeLanguage: "Bodo", accentInfo: "Speaks all languages · Bodo accent", id: "hasina" },
  { name: "Vishal", gender: "male", nativeLanguage: "Dogri", accentInfo: "Speaks all languages · Dogri accent", id: "vishal" },
  { name: "Neelam", gender: "female", nativeLanguage: "Dogri", accentInfo: "Speaks all languages · Dogri accent", id: "neelam" },
  { name: "Varun", gender: "male", nativeLanguage: "English", accentInfo: "Speaks all languages · English accent", id: "varun" },
  { name: "Nisha", gender: "female", nativeLanguage: "English", accentInfo: "Speaks all languages · English accent", id: "nisha" },
  { name: "Rakesh", gender: "male", nativeLanguage: "Gujarati", accentInfo: "Speaks all languages · Gujarati accent", id: "rakesh" },
  { name: "Pooja", gender: "female", nativeLanguage: "Gujarati", accentInfo: "Speaks all languages · Gujarati accent", id: "pooja" },
  { name: "Rajesh", gender: "male", nativeLanguage: "Hindi", accentInfo: "Speaks all languages · Hindi accent", id: "rajesh" },
  { name: "Sunita", gender: "female", nativeLanguage: "Hindi", accentInfo: "Speaks all languages · Hindi accent", id: "sunita" },
  { name: "Kiran", gender: "male", nativeLanguage: "Kannada", accentInfo: "Speaks all languages · Kannada accent", id: "kiran" },
  { name: "Shreya", gender: "female", nativeLanguage: "Kannada", accentInfo: "Speaks all languages · Kannada accent", id: "shreya" },
  { name: "Farooq", gender: "male", nativeLanguage: "Kashmiri", accentInfo: "Speaks all languages · Kashmiri accent", id: "farooq" },
  { name: "Habba", gender: "female", nativeLanguage: "Kashmiri", accentInfo: "Speaks all languages · Kashmiri accent", id: "habba" },
  { name: "Mohan", gender: "male", nativeLanguage: "Konkani", accentInfo: "Speaks all languages · Konkani accent", id: "mohan" },
  { name: "Sarita", gender: "female", nativeLanguage: "Konkani", accentInfo: "Speaks all languages · Konkani accent", id: "sarita" },
  { name: "Suresh", gender: "male", nativeLanguage: "Maithili", accentInfo: "Speaks all languages · Maithili accent", id: "suresh" },
  { name: "Meera", gender: "female", nativeLanguage: "Maithili", accentInfo: "Speaks all languages · Maithili accent", id: "meera" },
  { name: "Krishnan", gender: "male", nativeLanguage: "Malayalam", accentInfo: "Speaks all languages · Malayalam accent", id: "krishnan" },
  { name: "Deepa", gender: "female", nativeLanguage: "Malayalam", accentInfo: "Speaks all languages · Malayalam accent", id: "deepa" },
  { name: "Tomba", gender: "male", nativeLanguage: "Manipuri", accentInfo: "Speaks all languages · Manipuri accent", id: "tomba" },
  { name: "Ibemhal", gender: "female", nativeLanguage: "Manipuri", accentInfo: "Speaks all languages · Manipuri accent", id: "ibemhal" },
  { name: "Siddharth", gender: "male", nativeLanguage: "Marathi", accentInfo: "Speaks all languages · Marathi accent", id: "siddharth" },
  { name: "Ananya", gender: "female", nativeLanguage: "Marathi", accentInfo: "Speaks all languages · Marathi accent", id: "ananya" },
  { name: "Bikash", gender: "male", nativeLanguage: "Nepali", accentInfo: "Speaks all languages · Nepali accent", id: "bikash" },
  { name: "Sapana", gender: "female", nativeLanguage: "Nepali", accentInfo: "Speaks all languages · Nepali accent", id: "sapana" },
  { name: "Bijay", gender: "male", nativeLanguage: "Odia", accentInfo: "Speaks all languages · Odia accent", id: "bijay" },
  { name: "Sujata", gender: "female", nativeLanguage: "Odia", accentInfo: "Speaks all languages · Odia accent", id: "sujata" },
  { name: "Gurpreet", gender: "male", nativeLanguage: "Punjabi", accentInfo: "Speaks all languages · Punjabi accent", id: "gurpreet" },
  { name: "Simran", gender: "female", nativeLanguage: "Punjabi", accentInfo: "Speaks all languages · Punjabi accent", id: "simran" },
  { name: "Vedant", gender: "male", nativeLanguage: "Sanskrit", accentInfo: "Speaks all languages · Sanskrit accent", id: "vedant" },
  { name: "Gayatri", gender: "female", nativeLanguage: "Sanskrit", accentInfo: "Speaks all languages · Sanskrit accent", id: "gayatri" },
  { name: "Chandu", gender: "male", nativeLanguage: "Santali", accentInfo: "Speaks all languages · Santali accent", id: "chandu" },
  { name: "Roshni", gender: "female", nativeLanguage: "Santali", accentInfo: "Speaks all languages · Santali accent", id: "roshni" },
  { name: "Amjad", gender: "male", nativeLanguage: "Sindhi", accentInfo: "Speaks all languages · Sindhi accent", id: "amjad" },
  { name: "Kavita", gender: "female", nativeLanguage: "Sindhi", accentInfo: "Speaks all languages · Sindhi accent", id: "kavita" },
  { name: "Murugan", gender: "male", nativeLanguage: "Tamil", accentInfo: "Speaks all languages · Tamil accent", id: "murugan" },
  { name: "Thangam", gender: "female", nativeLanguage: "Tamil", accentInfo: "Speaks all languages · Tamil accent", id: "thangam" },
  { name: "Vishnu", gender: "male", nativeLanguage: "Telugu", accentInfo: "Speaks all languages · Telugu accent", id: "vishnu" },
  { name: "Lakshmi", gender: "female", nativeLanguage: "Telugu", accentInfo: "Speaks all languages · Telugu accent", id: "lakshmi" },
  { name: "Salman", gender: "male", nativeLanguage: "Urdu", accentInfo: "Speaks all languages · Urdu accent", id: "salman" },
  { name: "Fatima", gender: "female", nativeLanguage: "Urdu", accentInfo: "Speaks all languages · Urdu accent", id: "fatima" },
];

const SELECT_CLASS = "w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#1e5eff]/50 appearance-none cursor-pointer pr-8";
const SELECT_ARROW: React.CSSProperties = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 10px center",
};
const LABEL_CLASS = "text-white text-xs font-semibold tracking-wide mb-2 block";

export const TTSWidget: React.FC = () => {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("en");
  const [selectedVoice, setSelectedVoice] = useState<string>("varun");
  const [speed, setSpeed] = useState(1);
  const [format, setFormat] = useState("mp3");
  const [expression, setExpression] = useState("Neutral");
  const [trimSilence, setTrimSilence] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const { tokenRef: vakTokenRef } = useVakToken();
  const [error, setError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const voiceScrollRef = useRef<HTMLDivElement>(null);

  // Scroll to native speakers when language changes
  useEffect(() => {
    const container = voiceScrollRef.current;
    if (!container) return;
    const langName = CODE_TO_LANGUAGE[language] || language;
    const firstNativeCard = container.querySelector(`[data-language="${langName}"]`) as HTMLElement;
    if (firstNativeCard) {
      const scrollLeft = firstNativeCard.offsetLeft - container.offsetLeft - 8;
      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
      // Auto-select the first native speaker (male) for this language
      const voiceId = firstNativeCard.getAttribute("data-voice-id");
      if (voiceId) setSelectedVoice(voiceId);
    }
  }, [language]);

  // Reset player state when audioUrl changes
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
  }, [audioUrl]);

  // Auto-regenerate when expression changes (if audio was already generated)
  const prevExpressionRef = useRef(expression);
  useEffect(() => {
    if (prevExpressionRef.current !== expression) {
      prevExpressionRef.current = expression;
      if (audioUrl && text.trim()) {
        handleGenerate();
      }
    }
  }, [expression]);

  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current && duration > 0) {
      const rect = e.currentTarget.getBoundingClientRect();
      const newTime = ((e.clientX - rect.left) / rect.width) * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleGenerate = useCallback(async () => {
    if (!text.trim()) return;
    setIsGenerating(true);
    setError(null);
    setAudioUrl(null);

    try {
      const response = await axios.post(
        "/api/vak/tts",
        {
          text: expression !== "Neutral" ? `<${expression}> ${text}` : text,
          speaker: selectedVoice,
          model: "zero-indic",
          response_format: format === "ogg_opus" ? "wav" : format,
          expression_style: expression,
          speed,
          trim_silence: trimSilence,
        },
        {
          headers: {
            "Content-Type": "application/json",
            ...(vakTokenRef.current ? { "X-Session-Token": vakTokenRef.current } : {}),
          },
          responseType: "blob",
          timeout: 120000,
        }
      );

      const blob = new Blob([response.data], { type: `audio/${format === "ogg_opus" ? "ogg" : format}` });
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (err: any) {
      console.error("TTS error:", err);
      setError(
        err?.response?.status === 429
          ? "Rate limit exceeded. Please wait a moment and try again."
          : "Failed to generate speech. Please try again."
      );
    } finally {
      setIsGenerating(false);
    }
  }, [text, selectedVoice, format, speed, language, trimSilence, expression]);

  const filteredVoices = ALL_VOICES;

  return (
    <div className="flex flex-col gap-6">
      {/* Controls Bar */}
      <div className="w-full">
        <div className="glass-card relative overflow-visible rounded-2xl px-4 sm:px-6 lg:px-8 py-4 sm:py-5 border border-gray-800 backdrop-blur-xl">
          <div className="flex flex-col gap-5">
            {/* Row 1: Text Input */}
            <div>
              <label className={LABEL_CLASS}>Text Input</label>
              <div className="relative">
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value.slice(0, MAX_CHARS))}
                  placeholder="Ready to hear it in action? Type or paste any text here to try it out.."
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/30 focus:outline-none focus:border-[#1e5eff]/50 resize-none"
                />
                <span className="absolute bottom-2 right-3 text-white/40 text-xs">
                  {text.length} / {MAX_CHARS}
                </span>
              </div>
            </div>

            {/* Row 2: Language, Speed, Format, Expression, Trim */}
            <div className="flex flex-col md:flex-row gap-4 items-start">
              {/* Language */}
              <div className="relative w-full md:flex-1 md:min-w-[140px]">
                <label className={LABEL_CLASS}>Language</label>
                <GroupedLanguageSelect
                  value={language}
                  onChange={setLanguage}
                  label=""
                  selectedHeaderTab="text-to-speech"
                />
              </div>

              {/* Speed */}
              <div className="w-full md:flex-1 md:min-w-[120px]">
                <label className={LABEL_CLASS}>Speed: {speed}x</label>
                <input
                  type="range"
                  min={0.25}
                  max={4}
                  step={0.25}
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#1e5eff]"
                />
                <div className="flex justify-between text-white/30 text-[10px] mt-1">
                  <span>0.25x</span>
                  <span>4.0x</span>
                </div>
              </div>

              {/* Format */}
              <div className="w-full md:flex-1 md:min-w-[100px]">
                <label className={LABEL_CLASS}>Format</label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  className={SELECT_CLASS}
                  style={SELECT_ARROW}
                >
                  {FORMATS.map((f) => (
                    <option key={f} value={f} className="bg-[#1a1a2e] text-white">
                      {FORMAT_LABELS[f]}
                    </option>
                  ))}
                </select>
              </div>

              {/* Expression */}
              <div className="w-full md:flex-1 md:min-w-[120px]">
                <label className={LABEL_CLASS}>Expression Style</label>
                <select
                  value={expression}
                  onChange={(e) => setExpression(e.target.value)}
                  className={SELECT_CLASS}
                  style={SELECT_ARROW}
                >
                  {EXPRESSION_STYLES.map((style) => (
                    <option key={style} value={style} className="bg-[#1a1a2e] text-white">
                      {style}
                    </option>
                  ))}
                </select>
              </div>

              {/* Trim Silence */}
              <div className="w-full md:flex-1 md:min-w-[80px] flex flex-col">
                <label className={LABEL_CLASS}>Trim Silence</label>
                <button
                  onClick={() => setTrimSilence(!trimSilence)}
                  className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${trimSilence ? "bg-[#1e5eff]" : "bg-white/20"}`}
                >
                  <span
                    className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${trimSilence ? "translate-x-6" : ""}`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Voice Selection + Output Area */}
      <div className="w-full glass-card-noblur rounded-xl overflow-hidden">
        <div className="p-4 sm:p-5">
          {/* Voice Selection */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-3">
              <label className="text-white text-xs font-semibold tracking-wide">Select Voice</label>
              <span className="text-white/40 text-xs">
                {filteredVoices.length} Speakers
              </span>
            </div>
            <div ref={voiceScrollRef} className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {filteredVoices.map((voice) => (
                <button
                  key={voice.id}
                  data-language={voice.nativeLanguage}
                  data-voice-id={voice.id}
                  onClick={() => setSelectedVoice(voice.id)}
                  className={`flex-shrink-0 w-[140px] sm:w-[160px] md:w-[180px] p-3 rounded-xl border transition-all duration-200 text-left ${
                    selectedVoice === voice.id
                      ? "border-[#1e5eff] bg-[#1e5eff]/10"
                      : "border-white/10 bg-white/5 hover:border-white/20"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                      voice.gender === "female" ? "bg-pink-500/20 text-pink-400" : "bg-blue-500/20 text-blue-400"
                    }`}>
                      {voice.gender === "female" ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>
                      )}
                    </div>
                    <span className="text-white text-sm font-medium">{voice.name}</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="inline-flex items-center w-max bg-gradient-to-r from-[#073B8E] to-[#5218C5] text-white text-[9px] px-2 py-0.5 rounded-full font-medium">
                      Native: {voice.nativeLanguage}
                    </span>
                    <span className="text-white/40 text-[10px] leading-tight mt-1">
                      {voice.accentInfo}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !text.trim()}
            className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
              isGenerating || !text.trim()
                ? "bg-[#1e5eff]/40 text-white/50 cursor-not-allowed"
                : "bg-[#1e5eff] text-white hover:bg-[#1650dd] shadow-lg shadow-[#1e5eff]/20"
            }`}
          >
            {isGenerating ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Generating...
              </span>
            ) : (
              "Generate Speech"
            )}
          </button>

          {/* Error */}
          {error && (
            <div className="mt-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Generating Loader */}
          {isGenerating && (
            <div className="mt-4 flex items-center justify-center gap-3 p-6 rounded-xl border border-white/10 bg-white/5">
              <svg className="animate-spin h-5 w-5 text-[#1e5eff]" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span className="text-white/60 text-sm">Generating audio...</span>
            </div>
          )}

          {/* Audio Player */}
          {audioUrl && !isGenerating && (
            <div className="mt-4 flex items-center gap-2 sm:gap-3">
              <div className="flex-1 rounded-xl p-2 sm:p-3 border glass-card-noblur border-gray-200">
                <div className="flex items-center space-x-2 sm:space-x-4">
                  {/* Play/Pause Button */}
                  <button
                    onClick={handlePlayPause}
                    className={`bg-white w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                      isPlaying ? "bg-black text-white" : "bg-black hover:bg-white text-white cursor-pointer"
                    }`}
                  >
                    {isPlaying ? (
                      <svg className="text-black w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                      </svg>
                    ) : (
                      <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="18" cy="18" r="18" fill="white" />
                        <path d="M12.8965 12.8958C12.8964 12.6216 12.9687 12.3522 13.106 12.1149C13.2433 11.8775 13.4409 11.6806 13.6786 11.544C13.9164 11.4074 14.186 11.336 14.4602 11.3369C14.7344 11.3379 15.0035 11.4111 15.2404 11.5493L24.5887 17.0023C24.8246 17.1392 25.0205 17.3356 25.1567 17.5719C25.2929 17.8082 25.3647 18.0762 25.365 18.3489C25.3652 18.6217 25.2939 18.8897 25.158 19.1263C25.0222 19.3628 24.8267 19.5596 24.591 19.6969L15.2404 25.1514C15.0035 25.2896 14.7344 25.3629 14.4602 25.3638C14.186 25.3647 13.9164 25.2933 13.6786 25.1567C13.4409 25.0201 13.2433 24.8232 13.106 24.5859C12.9687 24.3485 12.8964 24.0791 12.8965 23.8049V12.8958Z" fill="black" />
                      </svg>
                    )}
                  </button>

                  {/* Dotted Progress Bar */}
                  <div className="flex-1 min-w-0">
                    <div
                      className="w-full h-2 cursor-pointer flex items-center"
                      onClick={handleProgressClick}
                    >
                      <div className="flex justify-between w-full">
                        {/* Mobile: 15 dots */}
                        <div className="flex justify-between w-full sm:hidden">
                          {Array.from({ length: 15 }, (_, index) => {
                            const dotProgress = (index / 14) * 100;
                            const isActive = dotProgress <= progressPercentage;
                            return (
                              <div
                                key={index}
                                className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
                                  isActive ? "bg-blue-600" : "bg-gray-300"
                                }`}
                              />
                            );
                          })}
                        </div>
                        {/* Desktop: 60 dots */}
                        <div className="hidden sm:flex justify-between w-full">
                          {Array.from({ length: 60 }, (_, index) => {
                            const dotProgress = (index / 59) * 100;
                            const isActive = dotProgress <= progressPercentage;
                            return (
                              <div
                                key={index}
                                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                                  isActive ? "bg-blue-600" : "bg-gray-300"
                                }`}
                              />
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hidden Audio */}
                <audio
                  ref={audioRef}
                  src={audioUrl}
                  onTimeUpdate={() => {
                    if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
                  }}
                  onLoadedMetadata={() => {
                    if (audioRef.current && !isNaN(audioRef.current.duration)) {
                      setDuration(audioRef.current.duration);
                    }
                  }}
                  onDurationChange={() => {
                    if (audioRef.current && !isNaN(audioRef.current.duration) && audioRef.current.duration > 0) {
                      setDuration(audioRef.current.duration);
                    }
                  }}
                  onEnded={() => setIsPlaying(false)}
                  preload="metadata"
                  className="hidden"
                />
              </div>

              {/* Download Button */}
              <a
                href={audioUrl}
                download={`tts-output.${format === "ogg_opus" ? "ogg" : format}`}
                className="p-2 sm:p-2.5 rounded-xl border transition-all duration-200 flex items-center justify-center glass-card border-gray-200 text-black hover:bg-blue-100 hover:text-[#1e5eff]"
                title="Download Audio"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
