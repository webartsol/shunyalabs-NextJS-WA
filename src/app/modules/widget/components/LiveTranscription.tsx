import React, {
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import { ConversationDisplay } from "./ConversationDisplay";
import {
  transcriptionApi,
  TranscriptionResult,
} from "../services/transcriptionApi";
import { getLanguageNameByCode } from "../config/language-mapping";
import { AudioPlayer } from "./AudioPlayer";
import { LoaderCircle, MicOff, Mic } from "lucide-react";
import { useVakToken } from "@/app/hooks/useVakToken";
import ProcessingUI from "./ProcessingUI";
import { RecordingProcessingUI } from "./RecordingProcessingUI";
import { WidgetMessageDisplay } from "./WidgetMessageDisplay";

interface LiveTranscriptionProps {
  selectedLanguage?: string;
  onTranscriptionComplete?: () => void;
  isProcessingUpload?: boolean;
  onCancelUpload?: () => void;
  uiText?: {
    buttons: Record<string, string>;
    placeholders: Record<string, string>;
    messages: Record<string, string>;
    labels: Record<string, string>;
  };
  headerTab: any;
  audioURL: any;
}

export interface LiveTranscriptionRef {
  startTranscription: () => void;
  stopTranscription: () => void;
  setTranscriptionResult: (result: any) => void;
  setProcessingState: (isProcessing: boolean) => void;
}

export const LiveTranscription = forwardRef<
  LiveTranscriptionRef,
  LiveTranscriptionProps
>(
  (
    {
      selectedLanguage = "English",
      onTranscriptionComplete,
      isProcessingUpload = false,
      onCancelUpload,
      uiText,
      headerTab,
      audioURL,
    },
    ref
  ) => {
    const { tokenRef: vakTokenRef } = useVakToken();

    // Keep transcriptionApi singleton in sync with the session token
    useEffect(() => {
      transcriptionApi.setSessionToken(vakTokenRef.current);
    });

    const [isTranscriptionInProgress, setIsTranscriptionInProgress] =
      useState(false);
    const [transcriptionProgress, setTranscriptionProgress] = useState(0);
    const [transcriptionTimeRemaining, setTranscriptionTimeRemaining] =
      useState(120);
    const [isRecording, setIsRecording] = useState(false);
    const [isProcessingTranscription, setIsProcessingTranscription] =
      useState(false);
    const [conversationData, setConversationData] = useState<any>(null);
    const [showTranscription, setShowTranscription] = useState(false);
    const [currentFileSize, setCurrentFileSize] = useState<number>(0);
    const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(
      null
    );
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const transcriptionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const transcriptionIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const [isPreparingRecording, setIsPreparingRecording] = useState(false);
    // derived flags (central truth)
    const isLiveBusy =
      isPreparingRecording || isRecording || isProcessingTranscription;

    // ✅ Audio player should show only when NOT uploading AND NOT recording/processing
    const shouldShowAudioPlayer =
      !isProcessingUpload && !isTranscriptionInProgress && !isLiveBusy;

    // useEffect(()=>{
    //   console.log(shouldShowAudioPlayer);
    //   console.log(recordedAudioUrl);
    //   console.log(audioURL);

    // },[shouldShowAudioPlayer,recordedAudioUrl,audioURL])

    // Start microphone recording
    const startRecording = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
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

        const mediaRecorder = new MediaRecorder(stream, {
          mimeType: selectedMimeType || undefined,
          audioBitsPerSecond: 64000, // 64kbps for maximum compression
        });
        mediaRecorderRef.current = mediaRecorder;
        audioChunksRef.current = [];

        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
            // Update current file size
            const totalSize = audioChunksRef.current.reduce(
              (sum, chunk) => sum + chunk.size,
              0
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
        setIsPreparingRecording(false); // ✅ Recording shuru ho gaya, ab preparing false kar dos
      } catch (error) {
        console.error("Error accessing microphone:", error);
        alert(
          "Microphone access denied. Please allow microphone access to record audio."
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

    // Process transcription with API
    const processTranscription = async (audioBlob: Blob) => {
      setIsProcessingTranscription(true);
      try {
        // ===== File size validation =====
        const maxSize = 2 * 1024 * 1024; // 2MB
        const fileSizeMB = audioBlob.size / 1024 / 1024;

        if (audioBlob.size > maxSize) {
          throw new Error(
            `Audio file too large: ${fileSizeMB.toFixed(
              2
            )}MB. Maximum allowed: 2MB. Please record for a shorter duration.`
          );
        }

        if (fileSizeMB > 1.5) {
          console.warn(
            "⚠️ Warning: File getting large, continuing transcription..."
          );
        }

        let result;
        try {
          result = await transcriptionApi.transcribeAudio(
            audioBlob,
            getLanguageNameByCode(selectedLanguage),
            headerTab
          );
          const audioUrl = URL.createObjectURL(audioBlob);
          setRecordedAudioUrl(audioUrl);
        } catch (apiError) {
          console.error("API Error:", apiError);
          // fallback mock
          result = {
            success: true,
            text: "",
            segments: [],
            detected_language: selectedLanguage,
            unique_speakers: [],
            total_time: 0,
          };
        }

        // ===== Handle new API response structure =====
        const duration = result.audio_duration || result.total_time || 10;

        // Derive unique speakers safely
        const rawSpeakers = result.unique_speakers && result.unique_speakers.length > 0
          ? result.unique_speakers
          : (result.segments && result.segments.length > 0
            ? [...new Set(result.segments.map((s: any) => s.speaker || "SPEAKER_00"))]
            : (result.speakers && result.speakers.length > 0 ? result.speakers : ["SPEAKER_00"]));

        const unique_speakers = rawSpeakers.filter((s: any) => s !== null && s !== undefined).map((s: any) => s.toString());
        if (unique_speakers.length === 0) unique_speakers.push("SPEAKER_00");

        // ===== No Speech Detected Logic =====
        if (
          !result ||
          !result.success ||
          (!result.text && (!result.segments || result.segments.length === 0))
        ) {
          console.warn("🎙 No speech detected in audio.");
          setConversationData({ speakers: [] }); // trigger fallback UI
          setShowTranscription(false);
          setIsProcessingTranscription(false);
          return;
        }

        // ===== Normal successful transcription =====
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
            const segmentsForSpeaker = result.segments?.filter((s: any) => (s.speaker || "SPEAKER_00") === speakerId) || [];

            return {
              id: speakerId,
              name: `Speaker ${speakerNum}`,
              role: speakerNum === 1 ? "Customer" : "Agent",
              total_segments: segmentsForSpeaker.length || (speakerId === "SPEAKER_00" ? 1 : 0),
              total_duration: segmentsForSpeaker.reduce((sum: number, s: any) => sum + ((s.end || 0) - (s.start || 0)), 0) || (speakerId === "SPEAKER_00" ? duration : 0),
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
        setTimeout(() => setIsProcessingTranscription(false), 0);
      } catch (error) {
        console.error("Transcription error:", error);
        // Show fallback UI for API failure
        setConversationData({ speakers: [] });
        setShowTranscription(false);
        setIsProcessingTranscription(false);
      }
    };

    // Start transcription (2-minute countdown with recording)
    const startTranscription = async () => {
      setIsPreparingRecording(true); // ✅ instantly hide player
      setIsTranscriptionInProgress(true);
      setTranscriptionProgress(0);
      setTranscriptionTimeRemaining(120);
      setConversationData(null);
      setShowTranscription(false);
      setCurrentFileSize(0);

      // Clear any existing intervals/timeouts
      if (transcriptionIntervalRef.current) {
        clearInterval(transcriptionIntervalRef.current);
      }
      if (transcriptionTimeoutRef.current) {
        clearTimeout(transcriptionTimeoutRef.current);
      }

      // Start recording
      await startRecording();

      // Update progress every second
      transcriptionIntervalRef.current = setInterval(() => {
        setTranscriptionTimeRemaining((prev) => {
          const newTime = prev - 1;
          const progress = ((120 - newTime) / 120) * 100;
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

    // Stop transcription
    const stopTranscription = async () => {
      setIsTranscriptionInProgress(false);
      setTranscriptionProgress(0);
      setTranscriptionTimeRemaining(120);
      setCurrentFileSize(0);
      setIsPreparingRecording(false);

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

    const setTranscriptionResult = (result: any) => {
      // ✅ Default fallback language
      const language = result.detected_language || selectedLanguage || "English";
      const duration = result?.audio_duration || result?.total_time || 10;

      // Derive unique speakers safely
      const rawSpeakers = result.unique_speakers && result.unique_speakers.length > 0
        ? result.unique_speakers
        : (result.segments && result.segments.length > 0
          ? [...new Set(result.segments.map((s: any) => s.speaker || "SPEAKER_00"))]
          : (result.speakers && result.speakers.length > 0 ? result.speakers : ["SPEAKER_00"]));

      const unique_speakers = rawSpeakers.filter((s: any) => s !== null && s !== undefined).map((s: any) => s.toString());
      if (unique_speakers.length === 0) unique_speakers.push("SPEAKER_00");

      // ✅ Handle segments dynamically
      const segments = result?.segments?.map((segment: any, index: number) => {
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
            text: result?.text || "",
            speaker: "SPEAKER_00",
            speaker_name: "Speaker 1",
            speaker_role: "User",
          },
        ];

      // ✅ Handle speaker list dynamically
      const speakers = unique_speakers.map((speakerId: string) => {
        const speakerNum = parseInt(speakerId.split("_")[1] || "0", 10) + 1;
        const segmentsForSpeaker = result.segments?.filter((s: any) => (s.speaker || "SPEAKER_00") === speakerId) || [];

        return {
          id: speakerId,
          name: `Speaker ${speakerNum}`,
          role: speakerNum === 1 ? "Customer" : "Agent",
          total_segments: segmentsForSpeaker.length || (speakerId === "SPEAKER_00" ? 1 : 0),
          total_duration: segmentsForSpeaker.reduce((sum: number, s: any) => sum + ((s.end || 0) - (s.start || 0)), 0) || (speakerId === "SPEAKER_00" ? duration : 0),
        };
      });

      // ✅ Build final conversation object
      const conversationData = {
        text: result?.text || "",
        segments,
        speakers,
        language,
        conversation_summary: {
          total_duration: duration,
          speaker_count: unique_speakers.length,
          main_topic: "Uploaded File Transcription",
          resolution: "Transcription completed successfully",
        },
      };

      // ✅ Update UI states
      setConversationData(conversationData);
      setShowTranscription(true);
      setIsTranscriptionInProgress(false);

      setTimeout(() => {
        setIsProcessingTranscription(false);
      }, 0);
    };

    // Set processing state from parent
    const setProcessingState = (isProcessing: boolean) => {
      setIsProcessingTranscription(isProcessing);
    };

    // Expose functions to parent component via ref
    useImperativeHandle(ref, () => ({
      startTranscription,
      stopTranscription,
      setTranscriptionResult,
      setProcessingState,
    }));

    // Cleanup on unmount
    useEffect(() => {
      return () => {
        stopTranscription();
      };
    }, []);

    const handleCopy = () => {
      console.log("copied");
    };
    useEffect(() => {
      if (audioURL) {
        // ✅ When user uploads a file, clear the recorded audio
        setRecordedAudioUrl(null);
      }
    }, [audioURL]);

    const hasSpeakers =
      conversationData?.speakers && conversationData.speakers.length > 0;

    return (
      <div className="space-y-4 flex-grow h-full overflow-hidden">
        {/* Upload Processing */}
        {isProcessingUpload && (
          <RecordingProcessingUI
            isRecording={isRecording}
            isProcessing={isProcessingUpload} // only true after recording stops
            progress={transcriptionProgress}
            timeRemaining={transcriptionTimeRemaining}
            fileSizeKB={currentFileSize / 1024}
          />
        )}

        {/* Recording or Processing Transcription */}
        {(isTranscriptionInProgress || isProcessingTranscription) && (
          <RecordingProcessingUI
            isRecording={isRecording}
            isProcessing={isProcessingTranscription} // only true after recording stops
            progress={transcriptionProgress}
            timeRemaining={transcriptionTimeRemaining}
            fileSizeKB={currentFileSize / 1024}
          />
        )}

        <>
          {hasSpeakers ? (
            <>
              {/* ✅ Audio Player */}
              {shouldShowAudioPlayer && (recordedAudioUrl || audioURL) && (
                <AudioPlayer
                  key={recordedAudioUrl || audioURL}
                  audioUrl={recordedAudioUrl || audioURL}
                  conversationData={conversationData}
                  onCopy={handleCopy}
                />
              )}

              {/* ✅ Conversation Display */}
              {showTranscription && conversationData && (
                <div className="mt-4">
                  <ConversationDisplay
                    conversationData={
                      showTranscription && conversationData
                        ? conversationData
                        : null
                    }
                    currentTime={0}
                    isPlaying={false}
                    isStopped={true}
                    isDemoAudio={false}
                    isProcessing={
                      isProcessingTranscription || isProcessingUpload
                    }
                    isProcessingUpload={isProcessingUpload}
                    uiText={uiText}
                    isRecording={isRecording}
                    selectedHeaderTab={headerTab}
                  />
                </div>
              )}
            </>
          ) : (
            // 🎙 Fallback: No Speech Detected
            !isRecording &&
            !isProcessingTranscription &&
            !isProcessingUpload && (
              <WidgetMessageDisplay
                type="empty"
                title="No speech detected"
                description="Start a new recording to transcribe your audio."
                icon={<Mic className="w-10 h-10 text-gray-400" />}
              />
            )
          )}
        </>
      </div>
    );
  }
);
