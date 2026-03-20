"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import languagesCatalog from "@/languages.json";
import { useVakToken } from "@/app/hooks/useVakToken";
// ---------------------------------------------------------------------------
// Data (self-contained, mirrors the VAK app's language + speaker catalog)
// ---------------------------------------------------------------------------

interface Language {
  code: string;
  name: string;
  nativeName: string;
  speakerCount?: string;
}

const LANGUAGES: Language[] = (languagesCatalog as { languages: Language[] }).languages || [];

interface SpeakerEntry {
  male: string;
  female: string;
  language: string;
  nativeName: string;
}

const TTS_SPEAKERS: Record<string, SpeakerEntry> = {
  as: { male: "Bimal", female: "Anjana", language: "Assamese", nativeName: "অসমীয়া" },
  bn: { male: "Arjun", female: "Priyanka", language: "Bengali", nativeName: "বাংলা" },
  brx: { male: "Daimalu", female: "Hasina", language: "Bodo", nativeName: "बड़ो" },
  doi: { male: "Vishal", female: "Neelam", language: "Dogri", nativeName: "डोगरी" },
  en: { male: "Varun", female: "Nisha", language: "English", nativeName: "English" },
  gu: { male: "Rakesh", female: "Pooja", language: "Gujarati", nativeName: "ગુજરાતી" },
  hi: { male: "Rajesh", female: "Sunita", language: "Hindi", nativeName: "हिन्दी" },
  kn: { male: "Kiran", female: "Shreya", language: "Kannada", nativeName: "ಕನ್ನಡ" },
  kas: { male: "Farooq", female: "Habba", language: "Kashmiri", nativeName: "کٲشِر" },
  kok: { male: "Mohan", female: "Sarita", language: "Konkani", nativeName: "कोंकणी" },
  mai: { male: "Suresh", female: "Meera", language: "Maithili", nativeName: "मैथिली" },
  ml: { male: "Krishnan", female: "Deepa", language: "Malayalam", nativeName: "മലയാളം" },
  mni: { male: "Tomba", female: "Ibemhal", language: "Manipuri", nativeName: "ꯃꯩꯇꯩ ꯂꯣꯟ" },
  mr: { male: "Siddharth", female: "Ananya", language: "Marathi", nativeName: "मराठी" },
  ne: { male: "Bikash", female: "Sapana", language: "Nepali", nativeName: "नेपाली" },
  or: { male: "Bijay", female: "Sujata", language: "Odia", nativeName: "ଓଡ଼ିଆ" },
  pa: { male: "Gurpreet", female: "Simran", language: "Punjabi", nativeName: "ਪੰਜਾਬੀ" },
  sa: { male: "Vedant", female: "Gayatri", language: "Sanskrit", nativeName: "संस्कृतम्" },
  sat: { male: "Chandu", female: "Roshni", language: "Santali", nativeName: "ᱥᱟᱱᱛᱟᱲᱤ" },
  sd: { male: "Amjad", female: "Kavita", language: "Sindhi", nativeName: "سنڌي" },
  ta: { male: "Murugan", female: "Thangam", language: "Tamil", nativeName: "தமிழ்" },
  te: { male: "Vishnu", female: "Lakshmi", language: "Telugu", nativeName: "తెలుగు" },
  ur: { male: "Salman", female: "Fatima", language: "Urdu", nativeName: "اردو" },
};

interface SpeakerOption {
  value: string;
  voice: "male" | "female";
  language: string;
  nativeName: string;
  isNative: boolean;
}

function getAllSpeakersForLanguage(targetCode: string): SpeakerOption[] {
  const nativeTts = TTS_SPEAKERS[targetCode.toLowerCase()];
  const nativeNames = new Set<string>();
  if (nativeTts) {
    if (nativeTts.male) nativeNames.add(nativeTts.male);
    if (nativeTts.female) nativeNames.add(nativeTts.female);
  }

  const all: SpeakerOption[] = [];
  for (const tts of Object.values(TTS_SPEAKERS)) {
    if (tts.male) all.push({ value: tts.male, voice: "male", language: tts.language, nativeName: tts.nativeName, isNative: nativeNames.has(tts.male) });
    if (tts.female) all.push({ value: tts.female, voice: "female", language: tts.language, nativeName: tts.nativeName, isNative: nativeNames.has(tts.female) });
  }

  const sortByLangThenName = (a: SpeakerOption, b: SpeakerOption) =>
    a.language.localeCompare(b.language) || a.value.localeCompare(b.value);
  const native = all.filter((s) => s.isNative).sort(sortByLangThenName);
  const rest = all.filter((s) => !s.isNative).sort(sortByLangThenName);
  return [...native, ...rest];
}

type TtsStyleTag = "Neutral" | "Happy" | "Sad" | "Angry" | "Fearful" | "Surprised" | "Disgust" | "News" | "Conversational" | "Narrative" | "Enthusiastic";

const STYLE_OPTIONS: { value: TtsStyleTag; label: string }[] = [
  { value: "Neutral", label: "Neutral" },
  { value: "Happy", label: "Happy" },
  { value: "Sad", label: "Sad" },
  { value: "Angry", label: "Angry" },
  { value: "Fearful", label: "Fearful" },
  { value: "Surprised", label: "Surprised" },
  { value: "Disgust", label: "Disgust" },
  { value: "News", label: "News" },
  { value: "Conversational", label: "Conversational" },
  { value: "Narrative", label: "Narrative" },
  { value: "Enthusiastic", label: "Enthusiastic" },
];

const STYLE_EMOJIS: Record<string, string> = {
  Happy: "😊", Sad: "😢", Angry: "😠", Fearful: "😨", Surprised: "😲",
  Disgust: "🤢", News: "📰", Conversational: "💬", Narrative: "📖",
  Enthusiastic: "🤩", Neutral: "😐",
};

// ---------------------------------------------------------------------------
// Chevron icon
// ---------------------------------------------------------------------------

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
  );
}

function ArrowLeftRight({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3 4 7l4 4" /><path d="M4 7h16" /><path d="m16 21 4-4-4-4" /><path d="M20 17H4" /></svg>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
  );
}

// Resolve language name for STT API (mirrors VAK app logic)
function resolveSttLanguageName(lang: Language): string {
  if (lang.code === "en") return "English";
  const overrides: Record<string, string> = {
    "Indian English": "English",
    "Brajbhasha": "Braj",
    "Mahasu Pahari": "Pahari Mahasui",
    "Meitei (Manipuri)": "Meitei",
  };
  if (overrides[lang.name]) return overrides[lang.name];
  return lang.name.replace(/_/g, " ").replace(/\s*\([^)]*\)\s*/g, " ").trim() || "English";
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Cookie helpers
// ---------------------------------------------------------------------------
export default function VAKSection() {
  const [sourceLanguage, setSourceLanguage] = useState<Language>(LANGUAGES[0]); // Hindi
  const [targetLanguage, setTargetLanguage] = useState<Language>(LANGUAGES.find((l) => l.code === "en")!); // English

  const [selectedSpeaker, setSelectedSpeaker] = useState("Nisha");
  const [selectedStyle, setSelectedStyle] = useState<TtsStyleTag>("Neutral");

  // --- VAK token (shared hook) ---
  const { tokenRef: vakTokenRef } = useVakToken();

  const [languagePickerMode, setLanguagePickerMode] = useState<"source" | "target" | null>(null);
  const [languageSearchQuery, setLanguageSearchQuery] = useState("");
  const [isSpeakerPickerOpen, setIsSpeakerPickerOpen] = useState(false);
  const [isStylePickerOpen, setIsStylePickerOpen] = useState(false);
  const [speakerSearchQuery, setSpeakerSearchQuery] = useState("");
  const [typedInput, setTypedInput] = useState("");

  // Session state
  type SessionState = "idle" | "recording" | "transcribing" | "translating" | "speaking";
  const [sessionState, setSessionState] = useState<SessionState>("idle");
  const [originalText, setOriginalText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const abortRef = useRef<AbortController | null>(null);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  // TTS audio cache for speaker buttons
  const sourceTtsRef = useRef<{ text: string; url: string; audio: HTMLAudioElement } | null>(null);
  const targetTtsRef = useRef<{ text: string; url: string; audio: HTMLAudioElement } | null>(null);
  const [playingSource, setPlayingSource] = useState(false);
  const [playingTarget, setPlayingTarget] = useState(false);

  const languageSearchRef = useRef<HTMLInputElement>(null);
  const speakerSearchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (languagePickerMode !== null) {
      setTimeout(() => languageSearchRef.current?.focus(), 30);
    }
  }, [languagePickerMode]);

  useEffect(() => {
    if (isSpeakerPickerOpen) {
      setTimeout(() => speakerSearchRef.current?.focus(), 30);
    }
  }, [isSpeakerPickerOpen]);

  // When target language changes, auto-select native speaker
  useEffect(() => {
    const tts = TTS_SPEAKERS[targetLanguage.code.toLowerCase()];
    if (tts) setSelectedSpeaker(tts.female);
  }, [targetLanguage.code]);

  const filteredLanguages = useMemo(() => {
    const q = languageSearchQuery.trim().toLowerCase();
    if (!q) return LANGUAGES;
    return LANGUAGES.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.nativeName.toLowerCase().includes(q) ||
        l.code.toLowerCase().includes(q)
    );
  }, [languageSearchQuery]);

  const speakerOptions = useMemo(
    () => getAllSpeakersForLanguage(targetLanguage.code),
    [targetLanguage.code]
  );

  const filteredSpeakers = useMemo(() => {
    const q = speakerSearchQuery.trim().toLowerCase();
    if (!q) return speakerOptions;
    return speakerOptions.filter(
      (s) =>
        s.value.toLowerCase().includes(q) ||
        s.language.toLowerCase().includes(q)
    );
  }, [speakerSearchQuery, speakerOptions]);

  const currentSpeakerMeta = useMemo(() => {
    const match = speakerOptions.find((s) => s.value === selectedSpeaker);
    return match || { language: targetLanguage.name, voice: "female" as const };
  }, [speakerOptions, selectedSpeaker, targetLanguage.name]);

  const closeAll = () => {
    setLanguagePickerMode(null);
    setIsSpeakerPickerOpen(false);
    setIsStylePickerOpen(false);
    setLanguageSearchQuery("");
    setSpeakerSearchQuery("");
  };

  // ---- Refs for latest values (used in async callbacks) ----
  const selectedSpeakerRef = useRef(selectedSpeaker);
  selectedSpeakerRef.current = selectedSpeaker;
  const selectedStyleRef = useRef(selectedStyle);
  selectedStyleRef.current = selectedStyle;
  const sourceCodeRef = useRef(sourceLanguage.code);
  sourceCodeRef.current = sourceLanguage.code;
  const targetCodeRef = useRef(targetLanguage.code);
  targetCodeRef.current = targetLanguage.code;

  // ---- Auto-play TTS helper ----
  // Guard: skip TTS auto-play when source language changes
  const skipTtsRef = useRef(false);
  const ttsAbortRef = useRef<AbortController | null>(null);
  const speakerTtsAbortRef = useRef<AbortController | null>(null);
  const [isTtsLoading, setIsTtsLoading] = useState(false);
  const [isTtsLoadingSource, setIsTtsLoadingSource] = useState(false);

  // Generates TTS for the target side and plays it automatically
  const autoPlayTts = useCallback(async (text: string) => {
    if (!text.trim()) return;
    if (skipTtsRef.current) { skipTtsRef.current = false; return; }

    // Abort any in-flight TTS request
    ttsAbortRef.current?.abort();
    const ac = new AbortController();
    ttsAbortRef.current = ac;

    // Clean up any playing audio
    if (targetTtsRef.current) {
      targetTtsRef.current.audio.pause();
      URL.revokeObjectURL(targetTtsRef.current.url);
      targetTtsRef.current = null;
    }
    setPlayingTarget(false);
    setIsTtsLoading(true);
    try {
      const ttsRes = await fetch("/api/vak/tts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(vakTokenRef.current ? { "X-Session-Token": vakTokenRef.current } : {}),
        },
        body: JSON.stringify({
          text: text.trim(),
          speaker: selectedSpeakerRef.current,
          emotion: selectedStyleRef.current,
          style: selectedStyleRef.current,
          expression_style: selectedStyleRef.current,
          language: targetCodeRef.current,
        }),
        signal: ac.signal,
      });
      if (!ttsRes.ok) throw new Error("TTS failed");
      const blob = await ttsRes.blob();
      // Check if aborted while waiting for blob
      if (ac.signal.aborted) return;
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      targetTtsRef.current = { text, url, audio };
      audio.onended = () => setPlayingTarget(false);
      audio.onerror = () => setPlayingTarget(false);
      setIsTtsLoading(false);
      setPlayingTarget(true);
      await audio.play();
    } catch (err: any) {
      if (err?.name === "AbortError") return;
      console.error("[VAK] auto-play TTS error:", err);
      setPlayingTarget(false);
      setIsTtsLoading(false);
    }
  }, []);
  const autoPlayTtsRef = useRef(autoPlayTts);
  autoPlayTtsRef.current = autoPlayTts;

  // ---- API helpers ----
  const translateOnly = useCallback(async (text: string) => {
    if (!text.trim()) return;
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    setOriginalText(text.trim());
    setTranslatedText("");
    setError(null);
    setSessionState("translating");

    try {
      const trRes = await fetch("/api/vak/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: text.trim(),
          source_lang: sourceCodeRef.current,
          target_lang: targetCodeRef.current,
        }),
        signal: ac.signal,
      });
      if (!trRes.ok) throw new Error("Translation failed");
      const trData = await trRes.json();
      const translated = (trData.translated_text || text).trim();
      // Skip text-change invalidation — we handle TTS auto-play right here
      skipTextInvalidateRef.current = true;
      setTranslatedText(translated);
      setSessionState("idle");
      // Auto-play TTS for the translated text
      if (translated) {
        autoPlayTtsRef.current(translated);
      }
    } catch (err: any) {
      if (err?.name === "AbortError") return;
      console.error("VAK error:", err);
      setError("Could not translate text right now. Please try again.");
      setSessionState("idle");
    }
  }, []); // uses refs — no deps needed

  const handleSubmitText = useCallback(() => {
    const text = typedInput.trim();
    if (!text) return;
    setTypedInput("");
    translateOnly(text);
  }, [typedInput, translateOnly]);

  // Speaker button handler: generate TTS or replay cached audio
  const handleSpeakerClick = useCallback(async (
    side: "source" | "target",
    text: string,
    langCode: string,
  ) => {
    if (!text.trim()) return;
    const ref = side === "source" ? sourceTtsRef : targetTtsRef;
    const setPlaying = side === "source" ? setPlayingSource : setPlayingTarget;
    const setLoading = side === "source" ? setIsTtsLoadingSource : setIsTtsLoading;

    // If cached audio exists for the same text, just replay it
    if (ref.current && ref.current.text === text) {
      const audio = ref.current.audio;
      if (!audio.paused) {
        audio.pause();
        audio.currentTime = 0;
        setPlaying(false);
        return;
      }
      setPlaying(true);
      audio.currentTime = 0;
      audio.onended = () => setPlaying(false);
      audio.onerror = () => setPlaying(false);
      await audio.play().catch(() => setPlaying(false));
      return;
    }

    // Abort any in-flight speaker TTS request
    speakerTtsAbortRef.current?.abort();
    const ac = new AbortController();
    speakerTtsAbortRef.current = ac;

    // Clean up old cache
    if (ref.current) {
      ref.current.audio.pause();
      URL.revokeObjectURL(ref.current.url);
      ref.current = null;
    }

    // Generate new TTS
    setPlaying(false);
    setLoading(true);
    try {
      const ttsRes = await fetch("/api/vak/tts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(vakTokenRef.current ? { "X-Session-Token": vakTokenRef.current } : {}),
        },
        body: JSON.stringify({
          text: text.trim(),
          speaker: selectedSpeaker,
          emotion: selectedStyle,
          style: selectedStyle,
          expression_style: selectedStyle,
          language: langCode,
        }),
        signal: ac.signal,
      });
      if (!ttsRes.ok) throw new Error("TTS failed");
      const blob = await ttsRes.blob();
      if (ac.signal.aborted) return;
      const url = URL.createObjectURL(blob);
      const audio = new Audio(url);
      ref.current = { text, url, audio };
      audio.onended = () => setPlaying(false);
      audio.onerror = () => setPlaying(false);
      setLoading(false);
      setPlaying(true);
      await audio.play();
    } catch (err: any) {
      if (err?.name === "AbortError") return;
      console.error(`[VAK] ${side} TTS error:`, err);
      setPlaying(false);
      setLoading(false);
    }
  }, [selectedSpeaker, selectedStyle]);

  // Invalidate TTS cache when text, language, speaker, or emotion changes
  const invalidateTtsCache = useCallback(() => {
    // Abort any in-flight TTS requests
    ttsAbortRef.current?.abort();
    ttsAbortRef.current = null;
    speakerTtsAbortRef.current?.abort();
    speakerTtsAbortRef.current = null;
    setIsTtsLoading(false);
    setIsTtsLoadingSource(false);

    if (sourceTtsRef.current) {
      sourceTtsRef.current.audio.pause();
      URL.revokeObjectURL(sourceTtsRef.current.url);
      sourceTtsRef.current = null;
      setPlayingSource(false);
    }
    if (targetTtsRef.current) {
      targetTtsRef.current.audio.pause();
      URL.revokeObjectURL(targetTtsRef.current.url);
      targetTtsRef.current = null;
      setPlayingTarget(false);
    }
  }, []);

  // Invalidate cache on text change — but skip if translateOnly just set the text
  // (translateOnly already handles TTS auto-play after setting translatedText)
  const skipTextInvalidateRef = useRef(false);
  useEffect(() => {
    if (skipTextInvalidateRef.current) {
      skipTextInvalidateRef.current = false;
      return;
    }
    invalidateTtsCache();
  }, [originalText, translatedText, invalidateTtsCache]);
  // On speaker/emotion change: invalidate cache and auto-play TTS if translated text exists
  const prevSpeaker = useRef(selectedSpeaker);
  const prevStyle = useRef(selectedStyle);
  useEffect(() => {
    const speakerChanged = prevSpeaker.current !== selectedSpeaker;
    const styleChanged = prevStyle.current !== selectedStyle;
    prevSpeaker.current = selectedSpeaker;
    prevStyle.current = selectedStyle;
    // Only invalidate + re-play when speaker or style actually changed
    // (translatedText is in deps so we get the latest value, but don't act on text-only changes)
    if (!speakerChanged && !styleChanged) return;
    invalidateTtsCache();
    // Skip if speaker changed due to destination language change — translateOnly handles TTS
    if (skipSpeakerTtsRef.current) {
      skipSpeakerTtsRef.current = false;
      return;
    }
    if (translatedText.trim()) {
      autoPlayTtsRef.current(translatedText);
    }
  }, [selectedSpeaker, selectedStyle, invalidateTtsCache, translatedText]);

  // On source language change: translate destination text → new source language (update source side)
  const prevSourceLang = useRef(sourceLanguage.code);
  useEffect(() => {
    if (prevSourceLang.current !== sourceLanguage.code) {
      const prevCode = prevSourceLang.current;
      prevSourceLang.current = sourceLanguage.code;
      skipTtsRef.current = true;
      invalidateTtsCache();
      const destText = translatedTextRef.current;
      if (destText && destText.trim()) {
        // Translate destination text into the new source language
        const ac = new AbortController();
        abortRef.current?.abort();
        abortRef.current = ac;
        setSessionState("translating");
        setError(null);
        fetch("/api/vak/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: destText.trim(),
            source_lang: targetCodeRef.current,
            target_lang: sourceLanguage.code,
          }),
          signal: ac.signal,
        })
          .then(async (res) => {
            if (!res.ok) throw new Error("Translation failed");
            const data = await res.json();
            const translated = (data.translated_text || destText).trim();
            setOriginalText(translated);
            setSessionState("idle");
          })
          .catch((err) => {
            if (err?.name === "AbortError") return;
            console.error("VAK source-lang translate error:", err);
            setError("Could not translate text right now. Please try again.");
            setSessionState("idle");
          });
      }
    }
  }, [sourceLanguage.code]); // eslint-disable-line react-hooks/exhaustive-deps

  // On destination language change: select native speaker, re-translate and auto-play TTS
  const prevTargetLang = useRef(targetLanguage.code);
  const skipSpeakerTtsRef = useRef(false);
  useEffect(() => {
    if (prevTargetLang.current !== targetLanguage.code) {
      prevTargetLang.current = targetLanguage.code;
      invalidateTtsCache();
      // Auto-select native speaker for the new target language
      // Skip auto-play from speaker change effect — translateOnly will handle TTS
      const nativeTts = TTS_SPEAKERS[targetLanguage.code.toLowerCase()];
      const nativeSpeaker = nativeTts ? (nativeTts.female || nativeTts.male) : selectedSpeakerRef.current;
      if (nativeTts) {
        skipSpeakerTtsRef.current = true;
        setSelectedSpeaker(nativeSpeaker);
      }
      const text = originalTextRef.current;
      if (text && text.trim()) {
        translateOnlyRef.current(text);
      }
    }
  }, [targetLanguage.code]); // eslint-disable-line react-hooks/exhaustive-deps

  // Use refs so onstop closure always reads latest values
  const sourceLanguageRef = useRef(sourceLanguage);
  sourceLanguageRef.current = sourceLanguage;
  const originalTextRef = useRef(originalText);
  originalTextRef.current = originalText;
  const translatedTextRef = useRef(translatedText);
  translatedTextRef.current = translatedText;
  const translateOnlyRef = useRef(translateOnly);
  translateOnlyRef.current = translateOnly;

  const handleStartRecording = useCallback(async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, sampleRate: 44100 },
      });

      // Pick best supported mime type
      const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : MediaRecorder.isTypeSupported("audio/ogg;codecs=opus")
          ? "audio/ogg;codecs=opus"
          : MediaRecorder.isTypeSupported("audio/mp4")
            ? "audio/mp4"
            : "audio/webm";

      const recorder = new MediaRecorder(stream, { mimeType });
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        const blob = new Blob(chunks, { type: mimeType });
      if (blob.size === 0) {
          setSessionState("idle");
          return;
        }

        setSessionState("transcribing");
        try {
          const fd = new FormData();
          const ext = mimeType.includes("ogg") ? "ogg" : mimeType.includes("mp4") ? "mp4" : "webm";
          fd.append("file", new File([blob], `recording.${ext}`, { type: mimeType }));
          fd.append("model", "zero-indic");
          fd.append("language_code", "auto");
          fd.append("language", resolveSttLanguageName(sourceLanguageRef.current));

         const sttRes = await fetch("/api/vak/stt", {
            method: "POST",
            headers: {
              ...(vakTokenRef.current ? { "X-Session-Token": vakTokenRef.current } : {}),
            },
            body: fd,
          });
          const sttData = await sttRes.json().catch(() => ({}));
       
          if (!sttRes.ok) {
            throw new Error(sttData?.detail || `STT failed (${sttRes.status})`);
          }

          const transcription = (
            sttData.text || sttData.transcription || sttData.transcript ||
            sttData.result?.text || sttData.data?.text || ""
          ).trim();

          if (!transcription) {
            setError("Could not transcribe audio. Please try speaking louder or longer.");
            setSessionState("idle");
            return;
          }
          setOriginalText(transcription);
          await translateOnlyRef.current(transcription);
        } catch (err: any) {
        
          setError(err?.message || "Transcription failed");
          setSessionState("idle");
        }
      };

      mediaRecorderRef.current = recorder;
      recorder.start(1000); // collect chunks every 1s
      setSessionState("recording");
    } catch (err: any) {
      setError("Microphone access denied");
    }
  }, []); // no deps needed — uses refs for latest values

  const handleStopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
      mediaRecorderRef.current.stop();
    }
  }, []);

  const handleMicClick = useCallback(() => {
    if (sessionState === "recording") {
      handleStopRecording();
    } else {
      handleStartRecording();
    }
  }, [sessionState, handleStartRecording, handleStopRecording]);

  const isProcessing = sessionState !== "idle" && sessionState !== "recording";

  const handleSwap = () => {
    const tmp = sourceLanguage;
    setSourceLanguage(targetLanguage);
    setTargetLanguage(tmp);
  };

  const formatLabel = (lang: Language) =>
    lang.nativeName === lang.name
      ? lang.nativeName
      : `${lang.nativeName}  (${lang.name})`;

  return (
    <section className="bg-white py-16 md:py-24 px-6">
      <div className="max-w-[1300px] mx-auto">
        {/* Header - outside dark container */}
        <div className="text-center mb-8 max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-2">
            Vāķ
          </h2>
          <p className="text-gray-500 text-sm mb-4">
            Real-Time Speech-to-Speech Translation · 55 Languages · 2,970 Pairs
          </p>
        </div>

        {/* Dark container */}
        <div className="max-w-4xl mx-auto bg-[#070a10] rounded-3xl p-6">
          {/* Language Route */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 text-sm">
              <span className="text-[#42E8E0] font-medium">SOURCE</span>
              <span className="text-white">{sourceLanguage.name}</span>
              <span className="text-white/40">→</span>
              <span className="text-[#42E8E0] font-medium">DESTINATION</span>
              <span className="text-white">{targetLanguage.name}</span>
            </div>
          </div>

          {/* Main Panel */}
          <div className="space-y-4">

          {/* Translation Card - single block with separator */}
          <div className="rounded-2xl border border-[#0B3D3B]/20 bg-gradient-to-br from-[#0D2F2E] to-[#0F3533] p-5 md:p-6 min-h-[220px]">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-0 h-full min-h-[180px]">
              {/* Source Side */}
              <div className="flex flex-col p-2 md:p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] uppercase tracking-widest font-bold text-[#42E8E0]/80">{sourceLanguage.name}</span>
                  <div className="flex items-center gap-2">
                    {originalText && (
                      <>
                        <button type="button" onClick={() => handleSpeakerClick("source", originalText, sourceLanguage.code)} className={`p-1.5 rounded-lg hover:bg-white/10 transition-colors ${isTtsLoadingSource ? "text-[#42E8E0]" : playingSource ? "text-[#42E8E0]" : "text-white/40 hover:text-white/70"}`} title={playingSource ? "Stop" : "Listen"} disabled={isTtsLoadingSource}>
                          {isTtsLoadingSource ? (
                            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                          ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M11 5L6 9H2v6h4l5 4V5z" /></svg>
                          )}
                        </button>
                        <button type="button" onClick={() => { navigator.clipboard.writeText(originalText); }} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white/40 hover:text-white/70" title="Copy">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto max-h-[200px] scrollbar-hide flex items-center justify-center">
                  {originalText ? (
                    <p className="text-white text-base md:text-lg text-center leading-relaxed">{originalText}</p>
                  ) : (
                    <p className="text-white/25 text-sm text-center">Tap mic to speak, or type and press Enter to translate</p>
                  )}
                </div>
              </div>

              {/* Separator */}
              <div className="hidden md:flex items-stretch justify-center px-2">
                <div className="w-px bg-white/15" />
              </div>
              <div className="md:hidden border-t border-white/15 my-3" />

              {/* Target Side */}
              <div className="flex flex-col p-2 md:p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] uppercase tracking-widest font-bold text-[#42E8E0]/80">{targetLanguage.name}</span>
                  <div className="flex items-center gap-2">
                    {translatedText && (
                      <>
                        <button type="button" onClick={() => handleSpeakerClick("target", translatedText, targetLanguage.code)} className={`p-1.5 rounded-lg hover:bg-white/10 transition-colors ${isTtsLoading ? "text-[#42E8E0]" : playingTarget ? "text-[#42E8E0]" : "text-white/40 hover:text-white/70"}`} title={playingTarget ? "Stop" : "Listen"} disabled={isTtsLoading}>
                          {isTtsLoading ? (
                            <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>
                          ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M11 5L6 9H2v6h4l5 4V5z" /></svg>
                          )}
                        </button>
                        <button type="button" onClick={() => { navigator.clipboard.writeText(translatedText); }} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-white/40 hover:text-white/70" title="Copy">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        </button>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto max-h-[200px] scrollbar-hide flex items-center justify-center">
                  {(isProcessing || sessionState === "recording") && !translatedText ? (
                    <div className="flex items-center gap-2 text-white/40 text-sm">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      {sessionState === "recording" && "Listening..."}
                      {sessionState === "transcribing" && "Transcribing..."}
                      {sessionState === "translating" && "Translating..."}
                      {sessionState === "speaking" && "Generating speech..."}
                    </div>
                  ) : translatedText ? (
                    <div className="flex flex-col items-center gap-2">
                      <p className="text-white text-base md:text-lg text-center leading-relaxed">{translatedText}</p>
                      {isTtsLoading && (
                        <div className="flex items-center gap-2 text-[#42E8E0]/70 text-xs">
                          <svg className="animate-spin h-3.5 w-3.5" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Generating speech...
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-white/25 text-sm text-center">Translation will appear here</p>
                  )}
                </div>
                {error && (
                  <p className="text-red-400 text-xs mt-2 text-center">{error}</p>
                )}
              </div>
            </div>
          </div>

          {/* Controls Dock */}
          <div className="border border-white/10 rounded-2xl bg-white/[0.03] p-4  space-y-4">
            {/* Controls row */}
            <div className="flex flex-wrap items-end gap-3 md:gap-4">
              {/* Source */}
              <div className="flex-1 min-w-[120px] basis-[calc(40%-20px)] md:basis-0 relative">
                <label className="block text-xs font-medium text-white/70 mb-1.5">Source</label>
                <button
                  type="button"
                  onClick={() => {
                    if (languagePickerMode === "source") {
                      closeAll();
                    } else {
                      closeAll();
                      setLanguagePickerMode("source");
                    }
                  }}
                  className="w-full flex items-center justify-between gap-2 rounded-xl border border-white/15 bg-white/5 px-3 h-10 hover:bg-white/10 hover:border-white/30 transition-all duration-200"
                >
                  <span className="truncate text-sm text-white">{formatLabel(sourceLanguage)}</span>
                  <ChevronDown className="h-3.5 w-3.5 shrink-0 text-white/40" />
                </button>

                {languagePickerMode === "source" && (
                  <div className="fixed inset-0 z-[90]" onClick={(e) => { e.stopPropagation(); closeAll(); }} />
                )}
                {languagePickerMode === "source" && (
                  <div className="absolute top-full left-0 mt-1 z-[91] w-72 bg-[#141418] border border-white/20 rounded-xl shadow-2xl overflow-hidden">
                    <div className="p-2">
                      <div className="relative">
                        <SearchIcon className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/40" />
                        <input
                          ref={languageSearchRef}
                          value={languageSearchQuery}
                          onChange={(e) => setLanguageSearchQuery(e.target.value)}
                          placeholder="Search language"
                          className="h-8 w-full rounded-lg border border-white/20 bg-white/5 pl-8 pr-3 text-sm text-white outline-none focus:border-white/40 placeholder-white/30"
                        />
                      </div>
                    </div>
                    <div className="max-h-52 overflow-y-auto scrollbar-hide">
                      {filteredLanguages.map((lang) => {
                        const isSelected = lang.code === sourceLanguage.code;
                        return (
                          <button
                            key={lang.code}
                            type="button"
                            className={`w-full px-3 py-2 text-left text-sm hover:bg-white/10 transition-colors ${isSelected ? "bg-[#1e5eff]/15 text-[#1e5eff]" : "text-white"}`}
                            onClick={() => {
                              setSourceLanguage(lang);
                              closeAll();
                            }}
                          >
                            <span className="flex items-center justify-between">
                              <span>{lang.nativeName === lang.name ? lang.nativeName : `${lang.nativeName} (${lang.name})`}</span>
                              {lang.speakerCount && (
                                <span className="text-[10px] text-white/30">{lang.speakerCount}</span>
                              )}
                            </span>
                          </button>
                        );
                      })}
                      {filteredLanguages.length === 0 && (
                        <p className="px-3 py-2 text-sm text-white/40">No language found.</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Swap */}
              <button
                type="button"
                onClick={handleSwap}
                className="self-end mb-[3px] rounded-lg p-2 md:p-2.5 border border-white/20 bg-white/5 hover:bg-white/10 active:scale-95 transition-all shrink-0"
                title="Swap languages"
              >
                <ArrowLeftRight className="h-3.5 w-3.5 md:h-4 md:w-4 text-white/80" />
              </button>

              {/* Target */}
              <div className="flex-1 min-w-[120px] basis-[calc(40%-20px)] md:basis-0 relative">
                <label className="block text-xs font-medium text-white/70 mb-1.5">Destination</label>
                <button
                  type="button"
                  onClick={() => {
                    if (languagePickerMode === "target") {
                      closeAll();
                    } else {
                      closeAll();
                      setLanguagePickerMode("target");
                    }
                  }}
                  className="w-full flex items-center justify-between gap-2 rounded-xl border border-white/15 bg-white/5 px-3 h-10 hover:bg-white/10 hover:border-white/30 transition-all duration-200"
                >
                  <span className="truncate text-sm text-white">{formatLabel(targetLanguage)}</span>
                  <ChevronDown className="h-3.5 w-3.5 shrink-0 text-white/40" />
                </button>

                {languagePickerMode === "target" && (
                  <div className="fixed inset-0 z-[90]" onClick={(e) => { e.stopPropagation(); closeAll(); }} />
                )}
                {languagePickerMode === "target" && (
                  <div className="absolute top-full left-0 mt-1 z-[91] w-72 bg-[#141418] border border-white/20 rounded-xl shadow-2xl overflow-hidden">
                    <div className="p-2">
                      <div className="relative">
                        <SearchIcon className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/40" />
                        <input
                          value={languageSearchQuery}
                          onChange={(e) => setLanguageSearchQuery(e.target.value)}
                          placeholder="Search language"
                          className="h-8 w-full rounded-lg border border-white/20 bg-white/5 pl-8 pr-3 text-sm text-white outline-none focus:border-white/40 placeholder-white/30"
                        />
                      </div>
                    </div>
                    <div className="max-h-52 overflow-y-auto scrollbar-hide">
                      {filteredLanguages.map((lang) => {
                        const isSelected = lang.code === targetLanguage.code;
                        return (
                          <button
                            key={lang.code}
                            type="button"
                            className={`w-full px-3 py-2 text-left text-sm hover:bg-white/10 transition-colors ${isSelected ? "bg-[#1e5eff]/15 text-[#1e5eff]" : "text-white"}`}
                            onClick={() => {
                              setTargetLanguage(lang);
                              closeAll();
                            }}
                          >
                            <span className="flex items-center justify-between">
                              <span>{lang.nativeName === lang.name ? lang.nativeName : `${lang.nativeName} (${lang.name})`}</span>
                              {lang.speakerCount && (
                                <span className="text-[10px] text-white/30">{lang.speakerCount}</span>
                              )}
                            </span>
                          </button>
                        );
                      })}
                      {filteredLanguages.length === 0 && (
                        <p className="px-3 py-2 text-sm text-white/40">No language found.</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Speaker */}
              <div className="flex-1 min-w-[150px] basis-full md:basis-0 relative">
                <label className="block text-xs font-medium text-white/70 mb-1.5">Speaker</label>
                <button
                  type="button"
                  onClick={() => {
                    if (isSpeakerPickerOpen) {
                      closeAll();
                    } else {
                      closeAll();
                      setIsSpeakerPickerOpen(true);
                    }
                  }}
                  className="w-full flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 h-10 hover:bg-white/10 hover:border-white/30 transition-all duration-200"
                >
                  <div className="flex items-center gap-0 flex-1 min-w-0">
                    <span className="text-sm font-semibold text-[#42E8E0]/80 truncate">
                      {currentSpeakerMeta.language}
                    </span>
                    <span className="mx-2 text-[5px] font-semibold text-white shrink-0">⬤</span>
                    <span className="text-sm text-white shrink-0">{selectedSpeaker}</span>
                    <span className="ml-1 text-[10px] text-white shrink-0">
                      {currentSpeakerMeta.voice === "female" ? "♀" : "♂"}
                    </span>
                  </div>
                  <ChevronDown className="h-3.5 w-3.5 shrink-0 text-white/40" />
                </button>

                {isSpeakerPickerOpen && (
                  <div className="fixed inset-0 z-[90]" onClick={(e) => { e.stopPropagation(); closeAll(); }} />
                )}
                {isSpeakerPickerOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 z-[91] bg-[#141418] border border-white/20 rounded-xl shadow-2xl overflow-hidden">
                    <div className="p-2">
                      <div className="relative">
                        <SearchIcon className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/40" />
                        <input
                          ref={speakerSearchRef}
                          value={speakerSearchQuery}
                          onChange={(e) => setSpeakerSearchQuery(e.target.value)}
                          placeholder="Search speaker or language"
                          className="h-8 w-full rounded-lg border border-white/20 bg-white/5 pl-8 pr-3 text-sm text-white outline-none focus:border-white/40 placeholder-white/30"
                        />
                      </div>
                    </div>
                    <div className="max-h-60 overflow-y-auto scrollbar-hide">
                      {filteredSpeakers.map((speaker, idx) => {
                        const prevSpeaker = filteredSpeakers[idx - 1];
                        const isFirstNative = idx === 0 && speaker.isNative;
                        const isFirstOther = !speaker.isNative && (idx === 0 || prevSpeaker?.isNative);
                        return (
                          <div key={`${speaker.value}-${speaker.voice}`}>
                            {isFirstNative && (
                              <div className="px-3 pt-2.5 pb-1 text-[9px] font-bold uppercase tracking-widest text-[#42E8E0]/80">
                                Native Speakers
                              </div>
                            )}
                            {isFirstOther && (
                              <>
                                <div className="mx-2 my-1 border-t border-white/10" />
                                <div className="px-3 pt-1.5 pb-1 text-[9px] font-bold uppercase tracking-widest text-white/40">
                                  Other Languages
                                </div>
                              </>
                            )}
                            <button
                              type="button"
                              className={`w-full px-3 py-2 text-left transition-colors flex flex-col gap-0.5 group ${
                                speaker.value === selectedSpeaker
                                  ? "bg-[#1e5eff]/10 text-[#1e5eff]"
                                  : "hover:bg-white/10 hover:pl-4"
                              }`}
                              onClick={() => {
                                setSelectedSpeaker(speaker.value);
                                closeAll();
                              }}
                            >
                              <div className="flex items-center justify-between gap-2 min-w-0 w-full">
                                <div className="flex items-center gap-0 min-w-0">
                                  <span className={`text-sm font-semibold truncate ${speaker.value === selectedSpeaker ? "text-[#1e5eff]" : "text-[#42E8E0]/80"}`}>
                                    {speaker.language}
                                  </span>
                                  <span className={`mx-2 text-[5px] font-semibold shrink-0 ${speaker.value === selectedSpeaker ? "text-[#1e5eff]" : "text-white"}`}>⬤</span>
                                  <span className="text-sm text-white shrink-0">{speaker.value}</span>
                                  <span className="ml-1 text-[10px] text-white shrink-0">{speaker.voice === "female" ? "♀" : "♂"}</span>
                                </div>
                                {speaker.value === selectedSpeaker && (
                                  <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-[#1e5eff]" />
                                )}
                              </div>
                              <div className="text-[10px] text-white/30 leading-none truncate">
                                Other languages with {speaker.language} accent
                              </div>
                            </button>
                          </div>
                        );
                      })}
                      {filteredSpeakers.length === 0 && (
                        <p className="px-3 py-2 text-sm text-white/40">No speaker found.</p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Emotions */}
              <div className="flex-1 min-w-[120px] basis-full md:basis-0 relative">
                <label className="block text-xs font-medium text-white/70 mb-1.5">Emotions</label>
                <button
                  type="button"
                  onClick={() => {
                    if (isStylePickerOpen) {
                      closeAll();
                    } else {
                      closeAll();
                      setIsStylePickerOpen(true);
                    }
                  }}
                  className="w-full flex items-center justify-between gap-2 rounded-xl border border-white/15 bg-white/5 px-3 h-10 hover:bg-white/10 hover:border-white/30 transition-all duration-200"
                >
                  <span className="text-sm text-white">{STYLE_EMOJIS[selectedStyle] || "😐"} {selectedStyle}</span>
                  <ChevronDown className="h-3.5 w-3.5 shrink-0 text-white/40" />
                </button>

                {isStylePickerOpen && (
                  <div className="fixed inset-0 z-[90]" onClick={(e) => { e.stopPropagation(); closeAll(); }} />
                )}
                {isStylePickerOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 z-[91] bg-[#141418] border border-white/20 rounded-xl shadow-2xl max-h-60 overflow-y-auto scrollbar-hide">
                    {STYLE_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        className={`w-full px-3 py-2 text-left text-sm hover:bg-white/10 transition-colors ${
                          opt.value === selectedStyle ? "bg-[#1e5eff]/10 text-[#1e5eff]" : "text-white"
                        }`}
                        onClick={() => {
                          setSelectedStyle(opt.value);
                          closeAll();
                        }}
                      >
                        {STYLE_EMOJIS[opt.value] || "😐"} {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-white/10" />

            {/* Input area */}
            <div className="flex items-end gap-3">
              <div className="flex-1 relative">
                <textarea
                  value={typedInput}
                  onChange={(e) => setTypedInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey && typedInput.trim()) { e.preventDefault(); handleSubmitText(); } }}
                  placeholder="Type text in source language to translate..."
                  disabled={isProcessing}
                  rows={4}
                  className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-white/30 transition-all disabled:opacity-40 resize-none"
                />
              </div>
              {typedInput.trim() ? (
                /* Send button */
                <button
                  type="button"
                  onClick={handleSubmitText}
                  disabled={isProcessing}
                  className="shrink-0 w-11 h-11 rounded-full bg-[#1e5eff] flex items-center justify-center hover:bg-[#1650dd] transition-colors shadow-lg shadow-[#1e5eff]/20 disabled:opacity-40 disabled:cursor-not-allowed"
                  title="Send"
                >
                  <svg className="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m22 2-7 20-4-9-9-4Z" />
                    <path d="M22 2 11 13" />
                  </svg>
                </button>
              ) : (
                /* Mic button */
                <button
                  type="button"
                  onClick={handleMicClick}
                  disabled={isProcessing}
                  className={`shrink-0 w-11 h-11 rounded-full flex items-center justify-center transition-colors shadow-lg disabled:opacity-40 disabled:cursor-not-allowed ${
                    sessionState === "recording"
                      ? "bg-red-500 hover:bg-red-600 shadow-red-500/20 animate-pulse"
                      : "bg-[#1e5eff] hover:bg-[#1650dd] shadow-[#1e5eff]/20"
                  }`}
                  title={sessionState === "recording" ? "Stop recording" : "Press to speak"}
                >
                  {sessionState === "recording" ? (
                    <svg className="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="6" y="6" width="12" height="12" rx="2" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                      <line x1="12" x2="12" y1="19" y2="22" />
                    </svg>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Info badges */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/50">
              <span className="w-1.5 h-1.5 rounded-full bg-[#42E8E0]" />
              {LANGUAGES.length} Languages
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/50">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1e5eff]" />
              {Object.keys(TTS_SPEAKERS).length * 2} Speakers
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/50">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              {STYLE_OPTIONS.length} Emotions
            </span>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
