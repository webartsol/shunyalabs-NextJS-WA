import React, { useState, useRef, useEffect } from "react";
import { ConversationDisplay } from "./ConversationDisplay";
import { AudioSample } from "../hooks/useContentMapping";
import { InnerTabs } from "./InnerTabs";
// Define the conversation data interface directly
interface WidgetConversationData {
  text: string;
  segments: Array<{
    id: number;
    start: number;
    end: number;
    text: string;
    speaker: string;
    speaker_name: string;
    speaker_role: string;
  }>;
  speakers: Array<{
    id: string;
    name: string;
    role: string;
    total_segments: number;
    total_duration: number;
  }>;
  language: string;
  conversation_summary: {
    total_duration: number;
    speaker_count: number;
    main_topic: string;
    resolution: string;
  };
}
interface DemoAudioPlayerProps {
  audioSample?: AudioSample | null;
  selectedInnerTab?: string;
  uiText?: {
    buttons: Record<string, string>;
    placeholders: Record<string, string>;
    messages: Record<string, string>;
    labels: Record<string, string>;
  };
  selectedHeaderTab?: string;
}

export const DemoAudioPlayer: React.FC<DemoAudioPlayerProps> = ({
  audioSample,
  selectedInnerTab,
  uiText,
  selectedHeaderTab,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isStopped, setIsStopped] = useState(true);
  const [showTranscription, setShowTranscription] = useState(false);
  const [demoTranscriptionData, setDemoTranscriptionData] =
    useState<WidgetConversationData | null>(null);
  const [isLoadingTranscription, setIsLoadingTranscription] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isAudioReady, setIsAudioReady] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const previousAudioSampleRef = useRef<string | null>(null);

  const attemptPlay = () => {
    if (!audioRef.current) return;

    const playPromise = audioRef.current.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setIsStopped(false);
          // Show transcription if there's demo transcription data
          if (demoTranscriptionData) {
            setShowTranscription(true);
          }
        })
        .catch((error) => {
          // Don't show alert for AbortError or NotAllowedError
          if (error.name !== "AbortError" && error.name !== "NotAllowedError") {
            console.error("Audio playback failed:", error);
          }
        });
    }
  };

  const handlePlayPause = () => {
    // Check if inner tab is selected (handle empty string and undefined)
    if (!selectedInnerTab || selectedInnerTab.trim() === "") {
      return;
    }

    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // Just attempt to play - the browser will load the audio as needed
        // Calling play() directly prevents the browser from suspending the download
        attemptPlay();
      }
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setIsStopped(true);
    setCurrentTime(0);
    setShowTranscription(false);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setIsAudioReady(true);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current && duration > 0) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const newTime = (clickX / width) * duration;
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  // Copy conversation functionality
  const formatConversation = () => {
    if (!demoTranscriptionData?.segments) return "";

    const groupedSegments = groupSegmentsBySpeaker(
      demoTranscriptionData.segments
    );

    return groupedSegments
      .map((group) => {
        const timestamp = formatTimestamp(group.start);
        return `[${timestamp}] ${group.speaker_name}: ${group.text}`;
      })
      .join("\n\n");
  };

  const formatTimestamp = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const groupSegmentsBySpeaker = (segments: any[]) => {
    if (!segments.length) return [];

    const sortedSegments = [...segments].sort((a, b) => a.start - b.start);
    const grouped: any[] = [];
    let currentGroup: any = null;

    sortedSegments.forEach((segment) => {
      if (!currentGroup || currentGroup.speaker !== segment.speaker) {
        if (currentGroup) {
          grouped.push(currentGroup);
        }
        currentGroup = {
          speaker: segment.speaker,
          speaker_name: segment.speaker_name,
          speaker_role: segment.speaker_role,
          start: segment.start,
          end: segment.end,
          text: segment.text.trim(),
          segmentIds: [segment.id],
        };
      } else {
        currentGroup.text += " " + segment.text.trim();
        currentGroup.end = segment.end;
        currentGroup.segmentIds.push(segment.id);
      }
    });

    if (currentGroup) {
      grouped.push(currentGroup);
    }

    return grouped;
  };

  const handleCopyConversation = async () => {
    const conversationText = formatConversation();

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(conversationText);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = conversationText;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert(
        "Failed to copy to clipboard. Please select and copy the text manually."
      );
    }
  };

  // Use real audio duration
  const effectiveDuration = duration > 0 ? duration : 0;
  const progressPercentage =
    effectiveDuration > 0 ? (currentTime / effectiveDuration) * 100 : 0;

  // Reset audio state and update src when audio sample changes
  useEffect(() => {
    if (selectedInnerTab == "upload") return;
    setIsAudioReady(false);
    if (audioRef.current) {
      // Pause any playing audio
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
      setIsStopped(true);
      setCurrentTime(0);
      setShowTranscription(false);

      // If we're changing from one audio file to another, fully release the previous one
      if (
        previousAudioSampleRef.current &&
        previousAudioSampleRef.current !== audioSample?.file
      ) {
        audioRef.current.removeAttribute("src");
        audioRef.current.load(); // Force reload to clear buffer
      }

      // Update the src attribute
      if (audioSample?.file) {
        audioRef.current.src = audioSample.file;
        previousAudioSampleRef.current = audioSample.file;
      } else {
        audioRef.current.removeAttribute("src");
        audioRef.current.load(); // Force reload to clear buffer
        previousAudioSampleRef.current = null;
      }
    }
  }, [audioSample?.file]);

  // Load transcription data when audio sample changes
  useEffect(() => {
    if (audioSample?.transcription) {
      setIsLoadingTranscription(true);
      fetch(audioSample.transcription)
        .then((response) => response.json())
        .then((data) => {
          // Transform words array into segments grouped by speaker
          const words = data.transcript?.words || [];
          const segments: any[] = [];
          const speakers = new Set<string>();

          if (words.length > 0) {
            words.forEach((word: any, index: number) => {
              const speaker = word.speaker || "SPEAKER_00";
              speakers.add(speaker);

              // Create a segment for each word to get true word-by-word timing
              const segment = {
                id: index,
                start: word.start,
                end: word.end,
                text: word?.word,
                speaker: speaker ,
                speaker_name: `Speaker ${
                  parseInt(speaker?.split("_")[1] || "0", 10) + 1
                }`,
              };

              segments.push(segment);
            });
          }
          
          // Create speakers array
          const speakersArray = Array.from(speakers).map((speaker, index) => ({
            id: speaker,
            name: `Speaker ${parseInt(speaker?.split("_")[1] || "0", 10) + 1}`,
            role:
              speaker === "SPEAKER_00"
                ? "Customer"
                : speaker === "SPEAKER_01"
                ? "Agent"
                : "Speaker",
            total_segments: segments.filter((s) => s.speaker === speaker)
              .length,
            total_duration: segments
              .filter((s) => s.speaker === speaker)
              .reduce((sum, s) => sum + (s.end - s.start), 0),
          }));

          const transformedData = {
            text: data.transcript?.text || "",
            segments: segments,
            speakers: speakersArray,
            language: data.transcript?.language || "en",
            conversation_summary: {
              total_duration: Math.max(...segments.map((s) => s.end), 0),
              speaker_count: speakersArray.length,
              main_topic: "Customer Support Call",
              resolution: "Transcription completed successfully",
            },
          };
          
          setDemoTranscriptionData(transformedData);
          setIsLoadingTranscription(false);
        })
        .catch((error) => {
          console.error("Error loading transcription:", error);
          setIsLoadingTranscription(false);
        });
    } else {
      setDemoTranscriptionData(null);
    }
  }, [audioSample?.transcription]);

  // Cleanup on component unmount - release audio resources
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        // Pause and reset the audio
        audioRef.current.pause();
        audioRef.current.currentTime = 0;

        // Remove the src to release the resource
        audioRef.current.removeAttribute("src");
        audioRef.current.load(); // Force reload to clear buffer
      }
    };
  }, []);

  return (
    <div className="space-y-4">
      {/* Audio Player Controls */}
      <div className="flex items-center gap-2 sm:gap-3 demo-audio-player">
        {/* Audio Player */}
        <div
          className={`flex-1 rounded-xl p-2 sm:p-3 border ${
            selectedInnerTab && selectedInnerTab.trim() !== ""
              ? "glass-card-noblur border-gray-200"
              : "glass-card-100 border-gray-300"
          }`}
        >
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Play/Pause Button - Black circular button */}
            <button
              name="play-btn"
              id={selectedInnerTab=='customer-support-call' ? "ASR_STT_customer_support_play" :
                   selectedInnerTab=='podcast' ? "ASR_STT_podcast_play" :
                   selectedInnerTab=='medical-patient-notes' ? "ASR_MT_customer_support_play" :
                   selectedInnerTab=='medical-doctor-appointment' ? "ASR_MT_podcast_play" :
                   "ASR_Play_Btn"}
              onClick={handlePlayPause}
              disabled={!selectedInnerTab || selectedInnerTab.trim() === ""}
              aria-label={isPlaying ? "Pause audio" : "Play audio"}
              title={isPlaying ? "Pause" : "Play"}
              className={`bg-white w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                selectedInnerTab && selectedInnerTab.trim() !== ""
                  ? "bg-black hover:bg-white text-white cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {isPlaying ? (
                <svg
                  className="text-black w-4 h-4 sm:w-5 sm:h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg> 
              ) : (
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <circle cx="18" cy="18" r="18" fill="white" />
                  <path
                    d="M12.8965 12.8958C12.8964 12.6216 12.9687 12.3522 13.106 12.1149C13.2433 11.8775 13.4409 11.6806 13.6786 11.544C13.9164 11.4074 14.186 11.336 14.4602 11.3369C14.7344 11.3379 15.0035 11.4111 15.2404 11.5493L24.5887 17.0023C24.8246 17.1392 25.0205 17.3356 25.1567 17.5719C25.2929 17.8082 25.3647 18.0762 25.365 18.3489C25.3652 18.6217 25.2939 18.8897 25.158 19.1263C25.0222 19.3628 24.8267 19.5596 24.591 19.6969L15.2404 25.1514C15.0035 25.2896 14.7344 25.3629 14.4602 25.3638C14.186 25.3647 13.9164 25.2933 13.6786 25.1567C13.4409 25.0201 13.2433 24.8232 13.106 24.5859C12.9687 24.3485 12.8964 24.0791 12.8965 23.8049V12.8958Z"
                    fill={
                      !selectedInnerTab ||
                      selectedInnerTab.trim() === "" ||
                      selectedInnerTab === "upload"
                        ? "#9ca3af" // gray-400
                        : "black"
                    }
                  />
                </svg>
              )}
            </button>

            {/* Dotted Progress Bar - Mobile Responsive */}
            <div className="flex-1 min-w-0">
              <div
                className="w-full h-2 cursor-pointer  flex items-center"
                onClick={handleProgressClick}
              >
                {/* Create individual dots spanning full width - Mobile Responsive */}
                <div className="flex justify-between w-full">
                  {/* Mobile: 15 dots, Desktop: 30 dots */}
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
          {/* Audio Element for real playback */}
          <audio
            ref={audioRef}
            crossOrigin="anonymous"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
            onCanPlay={() => setIsAudioReady(true)}
            preload="none"
          >
            Your browser does not support the audio element.
          </audio>
        </div>

        {/* Copy Button - Outside player, same line, always visible */}
        <button
          id="ASR_copy"
          onClick={handleCopyConversation}
          disabled={!demoTranscriptionData}
          className={`
            p-2 sm:p-2.5 rounded-xl border transition-all duration-200 flex items-center justify-center
            ${
              copied
                ? " glass-card-copy text-green-700 border-green-200  border-radius-full"
                : !demoTranscriptionData
                ? "glass-card border-gray-300 text-gray-400 cursor-not-allowed"
                : "glass-card border-gray-200 text-black hover:bg-green-200 hover:text-green-700"
            }
          `}
          title={
            copied
              ? "Copied!"
              : !demoTranscriptionData
              ? "No conversation to copy"
              : "Copy Conversation"
          }
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </button>
      </div>

      {/* ===== Transcription Display - Always visible ===== */}
      <div className="flex flex-col flex-1 h-full min-h-0 overflow-hidden">
        {/* Inner wrapper ensures transcript fits within the parent height */}
        <div className="mt-4 flex flex-col flex-1 min-h-0 overflow-hidden">
          <div className="flex-1 min-h-0 overflow-hidden">
            <ConversationDisplay
              conversationData={
                showTranscription && demoTranscriptionData
                  ? demoTranscriptionData
                  : null
              }
              currentTime={currentTime}
              isPlaying={isPlaying}
              isStopped={isStopped}
              isDemoAudio={true}
              isProcessing={false}
              uiText={uiText}
              isProcessingUpload={false}
              isRecording={false}
              selectedHeaderTab={selectedHeaderTab}
            />
          </div>
        </div>
      </div>

      {/* Loading state for transcription */}
      {showTranscription && isLoadingTranscription && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <span className="text-gray-600">Loading transcription...</span>
          </div>
        </div>
      )}

      {/* Message when no inner tab is selected */}
      {(!selectedInnerTab || selectedInnerTab.trim() === "") && (
        <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <svg
              className="w-5 h-5 text-yellow-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-yellow-800 font-medium">
              Please select a tab to enable audio playback
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
