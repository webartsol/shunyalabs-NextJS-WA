import React, { useState, useRef, useEffect } from "react";
import { Loader2, Mic, Route } from "lucide-react";
import { WidgetMessageDisplay } from "./WidgetMessageDisplay";

interface Segment {
  id: number;
  start: number;
  end: number;
  text: string;
  speaker: string;
  speaker_name: string;
}

interface ConversationData {
  text: string;
  segments: Segment[];
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

interface ConversationDisplayProps {
  conversationData: ConversationData | null;
  currentTime?: number;
  isPlaying?: boolean;
  isStopped?: boolean;
  isDemoAudio?: boolean; // New prop to indicate if this is demo audio
  isProcessing?: boolean; // New prop to indicate if transcription is being processed
  uiText?: {
    buttons: Record<string, string>;
    placeholders: Record<string, string>;
    messages: Record<string, string>;
    labels: Record<string, string>;
  };
  isProcessingUpload: boolean;
  isRecording: boolean;
  selectedHeaderTab: string | undefined;
}

export const ConversationDisplay: React.FC<ConversationDisplayProps> = ({
  conversationData,
  currentTime = 0,
  isPlaying = false,
  isStopped = false,
  isDemoAudio = false,
  isProcessing = false,
  uiText,
  isRecording = false,
  isProcessingUpload = false,
  selectedHeaderTab = "speech-to-text",
}) => {
  const [displayedSegments, setDisplayedSegments] = useState<number[]>([]);
  const [typingText, setTypingText] = useState<string>("");
  const [currentTypingSegment, setCurrentTypingSegment] = useState<
    number | null
  >(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  // ✅ Handle missing or empty conversation
  const noSpeakers =
    !conversationData ||
    !conversationData.speakers ||
    conversationData.speakers.length === 0 ||
    (conversationData.segments?.length ?? 0) === 0;
  // Auto-scroll function
  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  // Use mapped UI text or fallback to English
  const labels = uiText?.labels || {
    conversationTranscript: "Conversation Transcript",
    copyConversation: "Copy Conversation",
    copied: "Copied!",
    duration: "Duration",
    speakers: "speakers",
  };

  // Simple typing effect for current segment
  const typeText = (
    text: string,
    segmentId: number,
    isUpdate: boolean = false
  ) => {
    // Clear any existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }

    // Only start typing if we have text to type
    if (!text || text.trim() === "") {
      setCurrentTypingSegment(null);
      setTypingText("");
      return;
    }

    // Set typing state immediately
    setCurrentTypingSegment(segmentId);

    // If this is an update to existing typing, start from current position
    let startIndex = 0;
    if (isUpdate && typingText.length > 0) {
      if (text.length > typingText.length) {
        startIndex = typingText.length;
      } else {
        setTypingText(text);
        setCurrentTypingSegment(null);
        return;
      }
    } else {
      setTypingText("");
    }

    let index = startIndex;
    const typingSpeed = 60; // Fixed 60ms per character for consistent animation

    const typeChar = () => {
      if (index < text.length) {
        setTypingText(text.slice(0, index + 1));
        index++;
        typingTimeoutRef.current = setTimeout(typeChar, typingSpeed);
      } else {
        setCurrentTypingSegment(null);
      }
    };

    // Start typing immediately
    typeChar();
  };

  // Update displayed segments based on current audio time
  useEffect(() => {
    if (!conversationData?.segments || !isPlaying) return;

    // Find segments that should be displayed based on current time
    const segmentsToShow = conversationData.segments.filter(
      (segment) => segment.start <= currentTime
    );

    const newSegments = segmentsToShow.filter(
      (segment) => !displayedSegments.includes(segment.id)
    );

    // Always process segments, whether new or existing
    if (segmentsToShow.length > 0) {
      // Add new segments to displayed segments (never remove existing ones)
      if (newSegments.length > 0) {
        setDisplayedSegments((prev) => {
          const newIds = newSegments.map((s) => s.id);
          const existingIds = prev;
          const combinedIds = [...new Set([...existingIds, ...newIds])];
          return combinedIds;
        });
      }

      // Get all displayed segments (including new ones)
      const allDisplayedSegments = conversationData.segments.filter(
        (segment) =>
          displayedSegments.includes(segment.id) ||
          newSegments.includes(segment)
      );

      // Group the segments to see if we need to start typing for a new group
      const groupedSegments = groupSegmentsBySpeaker(allDisplayedSegments);
      const latestGroup = groupedSegments[groupedSegments.length - 1];

      // Check if this is a new speaker by comparing with the last completed group
      const previousSegments = conversationData.segments.filter((segment) =>
        displayedSegments.includes(segment.id)
      );

      // Get the last speaker from previous segments
      const lastSpeaker =
        previousSegments.length > 0
          ? previousSegments[previousSegments.length - 1].speaker
          : null;

      const isNewSpeaker =
        lastSpeaker === null || lastSpeaker !== latestGroup.speaker;

      // Start typing animation for new speakers
      const shouldStartTyping =
        isNewSpeaker &&
        latestGroup.text &&
        latestGroup.text.trim() !== "" &&
        currentTypingSegment === null &&
        !groupedSegments.some((group) =>
          group.segmentIds.includes(currentTypingSegment || -1)
        );

      // Continue typing for same speaker with longer text (even if previous animation completed)
      const shouldContinueTyping =
        !isNewSpeaker &&
        latestGroup.text &&
        latestGroup.text.trim() !== "" &&
        latestGroup.text.length > typingText.length;

      if (shouldStartTyping) {
        // Start typing animation for the group
        typeText(latestGroup.text, latestGroup.segmentIds[0]);
      } else if (shouldContinueTyping) {
        // Continue typing animation for the group
        typeText(latestGroup.text, latestGroup.segmentIds[0], true);
      }
    }
  }, [currentTime, isPlaying, conversationData?.segments, displayedSegments]);

  // Handle segments that have finished - let typing animation complete naturally
  useEffect(() => {
    if (!conversationData?.segments || !isPlaying) return;

    // Find segments that have finished
    const finishedSegments = conversationData.segments.filter(
      (segment) =>
        segment.end <= currentTime && displayedSegments.includes(segment.id)
    );

    if (finishedSegments.length > 0 && currentTypingSegment !== null) {
      const currentSegment = conversationData.segments.find(
        (s) => s.id === currentTypingSegment
      );
      if (currentSegment && currentSegment.end <= currentTime) {
      }
    }
  }, [
    currentTime,
    isPlaying,
    conversationData?.segments,
    displayedSegments,
    currentTypingSegment,
  ]);

  // Only reset when stopped (not when paused)
  useEffect(() => {
    if (isStopped) {
      setDisplayedSegments([]);
      setTypingText("");
      setCurrentTypingSegment(null);

      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = null;
      }
    } else if (!isPlaying && !isStopped) {
    }
  }, [isPlaying, isStopped]);

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (displayedSegments.length > 0) {
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  }, [displayedSegments]);

  useEffect(() => {
    if (typingText && currentTypingSegment !== null) {
      setTimeout(() => {
        scrollToBottom();
      }, 50);
    }
  }, [typingText, currentTypingSegment]);

  const groupSegmentsBySpeaker = (segments: Segment[]) => {
    if (!segments.length) return [];

    const sortedSegments = [...segments].sort((a, b) => a.start - b.start);
    const grouped: Array<{
      speaker: string;
      speaker_name: string;
      start: number;
      end: number;
      text: string;
      segmentIds: number[];
    }> = [];

    let currentGroup: {
      speaker: string;
      speaker_name: string;
      start: number;
      end: number;
      text: string;
      segmentIds: number[];
    } | null = null;

    sortedSegments.forEach((segment) => {
      if (!currentGroup || currentGroup.speaker !== segment.speaker) {
        if (currentGroup) {
          grouped.push(currentGroup);
        }
        currentGroup = {
          speaker: segment.speaker,
          speaker_name: segment.speaker_name,
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
  const speakerGradients = [
    "bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500", // Speaker 1
    "bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500", // Speaker 2
    "bg-gradient-to-br from-green-500 via-lime-500 to-yellow-500", // Speaker 3
    "bg-gradient-to-br from-orange-500 via-red-500 to-pink-500", // Speaker 4
    "bg-gradient-to-br from-indigo-500 via-blue-500 to-sky-500", // Speaker 5
    "bg-gradient-to-br from-teal-500 via-emerald-500 to-green-500", // Speaker 6
    "bg-gradient-to-br from-yellow-500 via-amber-500 to-orange-500", // Speaker 7
    "bg-gradient-to-br from-purple-500 via-fuchsia-500 to-pink-500", // Speaker 8
    "bg-gradient-to-br from-rose-500 via-pink-500 to-purple-500", // Speaker 9
    "bg-gradient-to-br from-cyan-500 via-sky-500 to-indigo-500", // Speaker 10
  ];

  const formatTimestamp = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };
  if (
    conversationData &&
    !isProcessing &&
    !isRecording &&
    !isDemoAudio &&
    (conversationData.speakers?.length === 0 ||
      conversationData.segments?.length === 0)
  ) {
    return (
      <WidgetMessageDisplay
        type="empty"
        title="No speech detected"
        description="Start a new recording to transcribe your audio."
        icon={<Mic className="w-10 h-10 text-gray-400" />}
      />
    );
  }



if (!conversationData) {
  return (
    <div className="space-y-4">
      <div
        ref={scrollContainerRef}
        className="rounded-lg p-3 sm:p-4 h-52 overflow-y-auto scrollbar-hide"
      >
        <div className="flex items-center justify-center h-32 sm:h-40">
          {/* ✅ Use central message component */}
          {isProcessing && !isProcessingUpload ? (
            <WidgetMessageDisplay
              type="loading"
              title="Processing your audio..."
              description="Please wait while we transcribe your recording."
              icon={
                <div className="bg-gray-700 p-4 rounded-full flex items-center justify-center mb-3">
                  <Loader2 className="w-9 h-9 text-blue-400 animate-spin" />
                </div>
              }
            />
          ) : (
            isDemoAudio && (
              <WidgetMessageDisplay
                type="info"
                title={
                  ''
                }
                description={
                  selectedHeaderTab === "speech-to-text"
                    ? "Select your input language, then pick a sample, upload a file, or start speaking to capture live audio."
                    : selectedHeaderTab === "medical-transcription"
                    ? "Pick a sample, upload a file, or start speaking to capture live audio."
                    : "Select your input language, then upload a file or start speaking to capture live audio."
                }
                icon={
                  <div className="bg-gray-700 p-4 rounded-full flex items-center justify-center mb-3">
                    <Route size={36} color="#e5e7eb" strokeWidth={2.2} />
                  </div>
                }
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}

  return (
    <>
      <div className="space-y-4">
        {/* Conversation content - Mobile Responsive */}
        <div
          ref={scrollContainerRef}
          className="flex-1 min-h-0 overflow-y-auto rounded-lg p-3 sm:p-4 convo-div max-h-[200px] sm:max-h-[250px] md:max-h-[300px]"
        >
          {!isProcessingUpload && (
            <div className="space-y-3">
              {(() => {
                const segmentsToShow = isPlaying
                  ? conversationData.segments.filter((segment) =>
                      displayedSegments.includes(segment.id)
                    )
                  : isDemoAudio
                  ? conversationData.segments.filter(
                      (segment) => segment.start <= currentTime
                    )
                  : conversationData.segments;
                const groupedSegments = groupSegmentsBySpeaker(segmentsToShow);

                return groupedSegments.map((group, index) => {
                  const isLatestGroup = index === groupedSegments.length - 1;
                  const isTyping =
                    isLatestGroup &&
                    currentTypingSegment !== null &&
                    group.segmentIds.includes(currentTypingSegment);
                  const speakerIndex = parseInt(
                    group.speaker?.split("_")[1] || "0",
                    10
                  );
                  const gradientClass =
                    speakerGradients[speakerIndex % speakerGradients.length];

                  return (
                    <div key={`group-${group.segmentIds[0]}`} className="">
                      <div className="flex items-center space-x-2 mb-1">
                        <div className="">
                          <div
                            className={`
                              w-6 h-6  rounded-full flex items-center justify-center text-white font-bold text-xs
                              ${gradientClass}
                             
                            `}
                          >
                            {Number(group.speaker?.replace("SPEAKER_", "")) +
                              1 || 1}
                          </div>
                          <div
                            className={`
                               rounded-full opacity-0
                              ${
                                group.speaker === "SPEAKER_01"
                                  ? "bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500"
                                  : "bg-gradient-to-br from-blue-500 via-cyan-500 to-teal-500"
                              }
                              animate-ping
                            `}
                          ></div>
                        </div>

                        <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded">
                          {group.speaker_name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatTimestamp(group.start)}
                        </span>
                      </div>
                      <p className="text-white text-sm leading-relaxed">
                        {isTyping ? (
                          <span>
                            {typingText}
                            <span className="animate-pulse ml-1">|</span>
                          </span>
                        ) : (
                          <span>{group.text}</span>
                        )}
                      </p>
                    </div>
                  );
                });
              })()}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
