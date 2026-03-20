import React, {
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
  useCallback,
} from "react";
import { AlertCircle, Globe } from "lucide-react";
import { cn } from "@/app/lib/utils";
import { ConversationDisplay } from "./ConversationDisplay";
import { AudioUploadZone } from "./AudioUploadZone";
import {
  getAvailableLanguages,
  getLanguageNameByCode,
} from "../config/language-mapping";
import { GroupedLanguageSelect } from "./GroupedLanguageSelect";
import { AudioPlayer } from "./AudioPlayer";
import { useVakToken } from "@/app/hooks/useVakToken";

interface LiveTranscriptionWidgetProps {
  selectedLanguage?: string;
  onTranscriptionComplete?: () => void;
  uiText?: {
    buttons: Record<string, string>;
    placeholders: Record<string, string>;
    messages: Record<string, string>;
    labels: Record<string, string>;
  };
}

export interface LiveTranscriptionWidgetRef {
  startTranscription: () => void;
  stopTranscription: () => void;
  setTranscriptionResult: (result: any) => void;
}

interface TranscriptSegment {
  id: string;
  text: string;
  isFinal: boolean;
  confidence: number;
  timestamp: number;
  startTime?: number;
  endTime?: number;
  speaker?: string;
  speaker_name?: string;
  speaker_role?: string;
}
let localAudioUrl: any;
export const LiveTranscriptionWidget = forwardRef<
  LiveTranscriptionWidgetRef,
  LiveTranscriptionWidgetProps
>(({ selectedLanguage = "English", onTranscriptionComplete, uiText }, ref) => {
  // Core states
  const [isTranscriptionInProgress, setIsTranscriptionInProgress] =
    useState(false);
  const [isFileUpload, setIsFileUpload] = useState(false);
  const [transcriptionProgress, setTranscriptionProgress] = useState(0);
  const [transcriptionTimeRemaining, setTranscriptionTimeRemaining] =
    useState(120);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessingTranscription, setIsProcessingTranscription] =
    useState(false);
  const [conversationData, setConversationData] = useState<any>(null);
  const [showTranscription, setShowTranscription] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(selectedLanguage);
  const [error, setError] = useState<string>("");
  const [currentFileSize, setCurrentFileSize] = useState<number>(0);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const { tokenRef: vakTokenRef } = useVakToken();

  // Refs for calculations
  const transcriptionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const transcriptionIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const hasSpeakers =
    conversationData?.speakers && conversationData.speakers.length > 0;
  // Get available languages
  const languages = getAvailableLanguages();
  languages.sort((a: { name: string }, b: { name: any }) =>
    a.name.localeCompare(b.name),
  );
  // Process transcription with the working /api/transcribe-new endpoint
  const processTranscription = async (audioInput: Blob | File) => {
    try {
      // Set processing state to show loader
      setIsProcessingTranscription(true);
      setError("");

      // Process transcription with /api/transcribe-new endpoint

      // Check file size limit (100MB for file uploads, 2MB for recordings)
      const maxSize =
        audioInput instanceof File ? 100 * 1024 * 1024 : 2 * 1024 * 1024; // 100MB for files, 2MB for recordings
      const fileSizeMB = audioInput.size / 1024 / 1024;

      if (audioInput.size > maxSize) {
        throw new Error(
          `Audio file too large: ${fileSizeMB.toFixed(2)}MB. Maximum allowed: ${maxSize / (1024 * 1024)}MB.`,
        );
      }

      const formData = new FormData();
      formData.append("audio", audioInput, "recording.wav");
      formData.append("language_code", getLanguageNameByCode(currentLanguage));
      formData.append("index", "0");
      formData.append("chunk_size", "120");
      formData.append("enable_diarization", "true");
      formData.append("output_script", "auto");

      let response;
      try {
        const formDataNew = new FormData();
        const filename = audioInput.type.includes("webm")
          ? "audio.webm"
          : audioInput.type.includes("ogg")
            ? "audio.ogg"
            : audioInput.type.includes("mp4")
              ? "audio.m4a"
              : audioInput.type.includes("mpeg")
                ? "audio.mp3"
                : audioInput instanceof File
                  ? audioInput.name
                  : "audio.wav";
        formDataNew.append("file", audioInput, filename);
        formDataNew.append(
          "language_code",
          getLanguageNameByCode(currentLanguage),
        );
        formDataNew.append("index", "0");
        formDataNew.append("chunk_size", "120");
        formDataNew.append("enable_diarization", "true");
        formDataNew.append("output_script", "auto");

        response = await fetch("/api/vak/stt", {
          method: "POST",
          headers: {
            ...(vakTokenRef.current
              ? { "X-Session-Token": vakTokenRef.current }
              : {}),
          },
          body: formDataNew,
        });
      } catch (error) {
        response = await fetch("/api/vak/stt", {
          method: "POST",
          headers: {
            ...(vakTokenRef.current
              ? { "X-Session-Token": vakTokenRef.current }
              : {}),
          },
          body: formData,
        });
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Transcription failed: ${response.statusText} - ${errorText}`,
        );
      }

      const result = await response.json();
      localAudioUrl = URL.createObjectURL(audioInput);
      setRecordedAudioUrl(localAudioUrl);
      setIsFileUpload(false);
      // Transcription successful

      const duration = result.audio_duration || result.total_time || 10;
      // Derive unique speakers safely
      const rawSpeakers =
        result.unique_speakers && result.unique_speakers.length > 0
          ? result.unique_speakers
          : result.segments && result.segments.length > 0
            ? [
                ...new Set(
                  result.segments.map((s: any) => s.speaker || "SPEAKER_00"),
                ),
              ]
            : result.speakers && result.speakers.length > 0
              ? result.speakers
              : ["SPEAKER_00"];

      const unique_speakers = rawSpeakers
        .filter((s: any) => s !== null && s !== undefined)
        .map((s: any) => s.toString());
      if (unique_speakers.length === 0) unique_speakers.push("SPEAKER_00");

      // Convert API result to conversation data format (matching tb.shunyalabs.ai response)
      const conversationData = {
        text: result.text || "",
        segments: result.segments?.map((segment: any, index: number) => {
          const speakerId = segment.speaker || "SPEAKER_00";
          const speakerNum = parseInt(speakerId.split("_")[1] || "0", 10) + 1;
          return {
            id: index,
            start: segment.start || 0,
            end: segment.end || 0,
            text: segment.text || "",
            speaker: speakerId,
            speaker_name: `Speaker ${speakerNum}`,
            speaker_role: speakerNum === 1 ? "Customer" : "Agent",
          };
        }) || [
          {
            id: 0,
            start: 0,
            end: duration,
            text: result.text || "",
            speaker: "SPEAKER_00",
            speaker_name: "Speaker 1",
            speaker_role: "User",
          },
        ],
        speakers: unique_speakers.map((speakerId: string) => {
          const speakerNum = parseInt(speakerId.split("_")[1] || "0", 10) + 1;
          const segmentsForSpeaker =
            result.segments?.filter(
              (s: any) => (s.speaker || "SPEAKER_00") === speakerId,
            ) || [];

          return {
            id: speakerId,
            name: `Speaker ${speakerNum}`,
            role: speakerNum === 1 ? "Customer" : "Agent",
            total_segments:
              segmentsForSpeaker.length || (speakerId === "SPEAKER_00" ? 1 : 0),
            total_duration:
              segmentsForSpeaker.reduce(
                (sum: number, s: any) => sum + ((s.end || 0) - (s.start || 0)),
                0,
              ) || (speakerId === "SPEAKER_00" ? duration : 0),
          };
        }),
        language: result.detected_language || "English",
        conversation_summary: {
          total_duration: duration,
          speaker_count: unique_speakers.length,
          main_topic: "Live Transcription",
          resolution: "Transcription completed successfully",
        },
      };

      setConversationData(conversationData);
      setShowTranscription(true);

      // Notify parent that transcription is complete
      if (onTranscriptionComplete) {
        onTranscriptionComplete();
      }
    } catch (error) {
      console.error("❌ Transcription error:", error);
      setError("Failed to transcribe audio. Please try again.");
    } finally {
      setIsProcessingTranscription(false);
      setIsFileUpload(false);
    }
  };

  // File upload handlers
  const handleFileSelect = useCallback(
    (file: File) => {
      setError("");
      setSelectedFile(file);
      // Process the uploaded file
      processTranscription(file);
      setIsFileUpload(true);
    },
    [processTranscription],
  );

  const handleFileUpload = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        setError("");
        setSelectedFile(file);
        processTranscription(file);
        setIsFileUpload(true);
      }
    },
    [processTranscription],
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state !== "inactive"
      ) {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  // Start microphone recording (same as LiveTranscription.tsx)
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true, // keep — prevents echo
          noiseSuppression: false, // disable — flattens speaker features
          autoGainControl: false, // disable — normalizes volume differences
          sampleRate: 48000,
        },
      });
      // Check available MIME types - prefer compressed formats
      const mimeTypes = [
        "audio/webm;codecs=opus",
        "audio/webm",
        "audio/mp4",
        "audio/ogg",
        "audio/wav",
      ];
      let selectedMimeType = "";
      for (const mimeType of mimeTypes) {
        if (MediaRecorder.isTypeSupported(mimeType)) {
          selectedMimeType = mimeType;
          break;
        }
      }

      // Selected MIME type for recording

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: selectedMimeType || undefined,
        audioBitsPerSecond: 128000, // was 64000
      });
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
          // Update current file size
          const totalSize = audioChunksRef.current.reduce(
            (sum, chunk) => sum + chunk.size,
            0,
          );
          setCurrentFileSize(totalSize);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: selectedMimeType || "audio/wav",
        });

        // Stop all tracks to release microphone
        stream.getTracks().forEach((track) => track.stop());

        // Process transcription
        await processTranscription(audioBlob);
      };

      // Start recording with 1-second intervals
      mediaRecorder.start(1000);
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      setError(
        "Microphone access denied. Please allow microphone access to record audio.",
      );
    }
  };

  // Stop microphone recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  // Start transcription (2-minute countdown with recording) - same as LiveTranscription.tsx
  const startTranscription = async () => {
    // Clear any existing intervals/timeouts first
    if (transcriptionIntervalRef.current) {
      clearInterval(transcriptionIntervalRef.current);
      transcriptionIntervalRef.current = null;
    }
    if (transcriptionTimeoutRef.current) {
      clearTimeout(transcriptionTimeoutRef.current);
      transcriptionTimeoutRef.current = null;
    }

    setIsTranscriptionInProgress(true);
    setTranscriptionProgress(0);
    setTranscriptionTimeRemaining(120); // Back to 2 minutes
    setConversationData(null);
    setShowTranscription(false);

    // Start recording
    await startRecording();

    // Update progress every second
    transcriptionIntervalRef.current = setInterval(() => {
      setTranscriptionTimeRemaining((prev) => {
        const newTime = prev - 1;
        const progress = ((120 - newTime) / 120) * 100; // Back to 120 seconds
        setTranscriptionProgress(progress);

        if (newTime <= 0) {
          stopTranscription();
        }
        return newTime;
      });
    }, 1000);

    // Set timeout for 2 minutes
    transcriptionTimeoutRef.current = setTimeout(async () => {
      await stopTranscription();
    }, 120000); // 2 minutes in milliseconds
  };

  // Stop transcription - same as LiveTranscription.tsx
  const stopTranscription = async () => {
    setIsTranscriptionInProgress(false);
    setTranscriptionProgress(0);
    setTranscriptionTimeRemaining(120); // Back to 2 minutes

    // Stop recording if active
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }

    if (transcriptionIntervalRef.current) {
      clearInterval(transcriptionIntervalRef.current);
      transcriptionIntervalRef.current = null;
    }
    if (transcriptionTimeoutRef.current) {
      clearTimeout(transcriptionTimeoutRef.current);
      transcriptionTimeoutRef.current = null;
    }

    // Notify parent that transcription is stopped
    if (onTranscriptionComplete) {
      onTranscriptionComplete();
    }
  };

  // Set transcription result from uploaded file
  const setTranscriptionResult = (result: any) => {
    const duration = result.audio_duration || result.total_time || 10;

    // Derive unique speakers safely
    const rawSpeakers =
      result.unique_speakers && result.unique_speakers.length > 0
        ? result.unique_speakers
        : result.segments && result.segments.length > 0
          ? [
              ...new Set(
                result.segments.map((s: any) => s.speaker || "SPEAKER_00"),
              ),
            ]
          : result.speakers && result.speakers.length > 0
            ? result.speakers
            : ["SPEAKER_00"];

    const unique_speakers = rawSpeakers
      .filter((s: any) => s !== null && s !== undefined)
      .map((s: any) => s.toString());
    if (unique_speakers.length === 0) unique_speakers.push("SPEAKER_00");

    // Convert API result to conversation data format (matching tb.shunyalabs.ai response)
    const conversationData = {
      text: result.text || "",
      segments: result.segments?.map((segment: any, index: number) => {
        const speakerId = segment.speaker || "SPEAKER_00";
        const speakerNum = parseInt(speakerId.split("_")[1] || "0", 10) + 1;
        return {
          id: index,
          start: segment.start || 0,
          end: segment.end || 0,
          text: segment.text || "",
          speaker: speakerId,
          speaker_name: `Speaker ${speakerNum}`,
          speaker_role: speakerNum === 1 ? "Customer" : "Agent",
        };
      }) || [
        {
          id: 0,
          start: 0,
          end: duration,
          text: result.text || "",
          speaker: "SPEAKER_00",
          speaker_name: "Speaker 1",
          speaker_role: "User",
        },
      ],
      speakers: unique_speakers.map((speakerId: string) => {
        const speakerNum = parseInt(speakerId.split("_")[1] || "0", 10) + 1;
        const segmentsForSpeaker =
          result.segments?.filter(
            (s: any) => (s.speaker || "SPEAKER_00") === speakerId,
          ) || [];

        return {
          id: speakerId,
          name: `Speaker ${speakerNum}`,
          role: speakerNum === 1 ? "Customer" : "Agent",
          total_segments:
            segmentsForSpeaker.length || (speakerId === "SPEAKER_00" ? 1 : 0),
          total_duration:
            segmentsForSpeaker.reduce(
              (sum: number, s: any) => sum + ((s.end || 0) - (s.start || 0)),
              0,
            ) || (speakerId === "SPEAKER_00" ? duration : 0),
        };
      }),
      language: result.detected_language || "English",
      conversation_summary: {
        total_duration: duration,
        speaker_count: unique_speakers.length,
        main_topic: "Uploaded File Transcription",
        resolution: "Transcription completed successfully",
      },
    };

    setConversationData(conversationData);
    setShowTranscription(true);
    setIsTranscriptionInProgress(false);
    setIsProcessingTranscription(false);
  };

  // Expose functions to parent component via ref
  useImperativeHandle(ref, () => ({
    startTranscription,
    stopTranscription,
    setTranscriptionResult,
  }));

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Clean up intervals and timeouts on unmount
      if (transcriptionIntervalRef.current) {
        clearInterval(transcriptionIntervalRef.current);
      }
      if (transcriptionTimeoutRef.current) {
        clearTimeout(transcriptionTimeoutRef.current);
      }
      // Stop recording if active
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state === "recording"
      ) {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  return (
    <>
      <div className="space-y-4 p-4 sm:p-6 md:p-10 h-[300px] sm:h-[380px] md:h-[450px]">
        {/* Error Display */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
            <p className="text-red-700 text-sm">{error}</p>
            <button
              onClick={() => setError("")}
              className="ml-auto text-red-500 hover:text-red-700"
            >
              ×
            </button>
          </div>
        )}

        {/* Language Selection */}
        <div className="flex items-center justify-between">
          {/* <div className="flex items-center space-x-2">
          <Globe className="w-4 h-4 text-gray-500" />
          <label className="text-sm font-medium text-gray-700">Language:</label>
        </div> */}
          <div className="relative">
            {/* <select
            value={currentLanguage}
            onChange={e => setCurrentLanguage(e.target.value)}
            disabled={isRecording || isProcessingTranscription}
            className="bg-white border border-gray-200 rounded-md px-3 min-h-[40px] pr-8 text-sm font-medium text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer hover:border-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {languages.map(language => (
              <option key={language.code} value={language.code}>
                {language.flagCode} {language.name}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-1.5 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black lucide lucide-chevron-down-icon lucide-chevron-down"><path d="m6 9 6 6 6-6" /></svg>
          </div> */}
            <GroupedLanguageSelect
              value={currentLanguage}
              onChange={setCurrentLanguage}
              label=""
            />
          </div>
        </div>

        {/* Transcription Progress Bar - Shows only during transcription - EXACT SAME AS LiveTranscription.tsx */}
        {isTranscriptionInProgress && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-2 sm:p-3">
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Recording/Processing Status */}
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-600 flex items-center justify-center">
                {isRecording ? (
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                    <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                  </svg>
                ) : isProcessingTranscription ? (
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-white animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                  </svg>
                )}
              </div>

              {/* Dotted Progress Bar for Transcription */}
              <div className="flex-1 min-w-0">
                <div className="w-full h-2 cursor-default relative flex items-center">
                  <div className="flex justify-between w-full">
                    {/* Mobile: 15 dots, Desktop: 30 dots */}
                    <div className="flex justify-between w-full sm:hidden">
                      {Array.from({ length: 15 }, (_, index) => {
                        const dotProgress = (index / 14) * 100;
                        const isActive = dotProgress <= transcriptionProgress;
                        return (
                          <div
                            key={index}
                            className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
                              isActive ? "bg-blue-600" : "bg-blue-300"
                            }`}
                          />
                        );
                      })}
                    </div>
                    <div className="hidden sm:flex justify-between w-full">
                      {Array.from({ length: 30 }, (_, index) => {
                        const dotProgress = (index / 29) * 100;
                        const isActive = dotProgress <= transcriptionProgress;
                        return (
                          <div
                            key={index}
                            className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                              isActive ? "bg-blue-600" : "bg-blue-300"
                            }`}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Status display */}
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-blue-600 font-medium">
                    {isRecording
                      ? "Recording audio..."
                      : isProcessingTranscription
                        ? "Processing transcription..."
                        : "Transcribing audio..."}
                  </span>
                  <span className="text-xs text-blue-600">
                    {Math.floor(transcriptionTimeRemaining / 60)}:
                    {(transcriptionTimeRemaining % 60)
                      .toString()
                      .padStart(2, "0")}{" "}
                    remaining
                    {currentFileSize > 0 && (
                      <div className="text-xs text-blue-500 mt-1">
                        Size: {(currentFileSize / 1024).toFixed(1)} KB
                        {currentFileSize > 1.5 * 1024 * 1024 && ( // 1.5MB warning for 2-minute recordings
                          <span className="text-orange-600 ml-1">
                            ⚠️ Large file
                          </span>
                        )}
                      </div>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* File Upload Processing Loader (same as in LiveTranscription.tsx) */}
        {isFileUpload && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-2 sm:p-3 mt-3">
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Processing Icon */}
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-600 flex items-center justify-center">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-white animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              </div>

              {/* Dotted Progress Bar */}
              <div className="flex-1 min-w-0">
                <div className="w-full h-2 cursor-default relative flex items-center">
                  <div className="flex justify-between w-full">
                    {/* Mobile: 15 dots */}
                    <div className="flex justify-between w-full sm:hidden">
                      {Array.from({ length: 15 }, (_, index) => {
                        const dotProgress = (index / 14) * 100;
                        const isActive = dotProgress <= 50;
                        return (
                          <div
                            key={index}
                            className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
                              isActive ? "bg-blue-600" : "bg-blue-300"
                            }`}
                          />
                        );
                      })}
                    </div>
                    {/* Desktop: 30 dots */}
                    <div className="hidden sm:flex justify-between w-full">
                      {Array.from({ length: 30 }, (_, index) => {
                        const dotProgress = (index / 29) * 100;
                        const isActive = dotProgress <= 50;
                        return (
                          <div
                            key={index}
                            className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                              isActive ? "bg-blue-600" : "bg-blue-300"
                            }`}
                          />
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-blue-600 font-medium">
                    Processing uploaded file...
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {hasSpeakers && (
          <>
            {/* ✅ Show AudioPlayer only when valid conversationData */}
            {!isTranscriptionInProgress && !isFileUpload && (
              <AudioPlayer
                audioUrl={localAudioUrl}
                conversationData={conversationData}
              />
            )}
          </>
        )}
        {/* Live Transcription Display - Always visible */}
        <div className="mt-4">
          <ConversationDisplay
            conversationData={
              showTranscription && conversationData ? conversationData : null
            }
            currentTime={0}
            isPlaying={false}
            isStopped={true}
            isDemoAudio={false}
            isProcessing={isProcessingTranscription}
            uiText={uiText}
            isProcessingUpload={isFileUpload}
            isRecording={isRecording}
            selectedHeaderTab={"speech-to-text"}
          />
        </div>

        {/* Control Buttons - At the bottom */}
        <div className="flex flex-col gap-4 mt-6 ">
          {/* Main Action Buttons Row */}

          {/* Hidden File Input for direct file selection */}
          <input
            ref={fileInputRef}
            type="file"
            accept="audio/*,video/*"
            onChange={handleFileUpload}
            className="hidden"
            disabled={isRecording || isProcessingTranscription}
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-5 lg:gap-12 md:gap-10 py-2 px-3 sm:px-0 glass-card">
        <AudioUploadZone
          onFileSelect={handleFileSelect}
          disabled={isRecording || isProcessingTranscription}
        />
        {!isTranscriptionInProgress || !isRecording ? (
          // Start Transcription Button - shows when NOT actively recording
          <button
            onClick={startTranscription}
            disabled={isProcessingTranscription}
            className={cn(
              "px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-sm md:font-medium lg:font-medium rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500/25 shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2",
              isProcessingTranscription && "opacity-50 cursor-not-allowed",
            )}
          >
            Start Transcription
          </button>
        ) : (
          // Stop Transcription Button - ONLY shows during active live recording
          <button
            onClick={stopTranscription}
            disabled={isProcessingTranscription}
            className={cn(
              "px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-sm md:font-medium lg:font-medium rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-500/25 shadow-lg shadow-red-500/25 flex items-center justify-center gap-2",
              isProcessingTranscription && "opacity-50 cursor-not-allowed",
            )}
          >
            {isProcessingTranscription && (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
            )}
            Stop Transcription
          </button>
        )}
      </div>
    </>
  );
});
