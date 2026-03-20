import React, { useState, useRef, useEffect } from "react";

interface CommonAudioPlayerProps {
    audioUrl: any;
    conversationData: any;
    onCopy?: () => void;
    className?: string;
}

export const AudioPlayer: React.FC<CommonAudioPlayerProps> = ({
    audioUrl,
    conversationData,
    onCopy,
    className = "",
}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isAudioReady, setIsAudioReady] = useState(false);
    const [copied, setCopied] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null);
    const previousAudioUrlRef = useRef<string | null>(null);

    // Attempt to play audio with error handling
    const attemptPlay = () => {
        if (!audioRef.current) return;
        
        const playPromise = audioRef.current.play();
        
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    setIsPlaying(true);
                })
                .catch(error => {
                    // Don't show alert for AbortError or NotAllowedError
                    if (error.name !== 'AbortError' && error.name !== 'NotAllowedError') {
                        console.error('Audio playback failed:', error);
                    }
                });
        }
    };

    // Handle play/pause toggle
    const handlePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                attemptPlay();
            }
        }
    };

    // Copy conversation functionality
    const handleCopyConversation = async () => {
        if (!conversationData?.segments) return;

        const groupedSegments = groupSegmentsBySpeaker(conversationData.segments);

        const conversationText = groupedSegments
            .map(group => {
                const timestamp = formatTimestamp(group.start);
                return `[${timestamp}] ${group.speaker_name}: ${group.text}`;
            })
            .join('\n\n');

        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(conversationText);
            } else {
                const textArea = document.createElement('textarea');
                textArea.value = conversationText;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                textArea.style.top = '-999999px';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
            }

            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            alert('Failed to copy to clipboard. Please select and copy manually.');
        }
    };

    const formatTimestamp = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    const groupSegmentsBySpeaker = (segments: any[]) => {
        if (!segments.length) return [];

        const sortedSegments = [...segments].sort((a, b) => a.start - b.start);
        const grouped: any[] = [];
        let currentGroup: any = null;

        sortedSegments.forEach(segment => {
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
                currentGroup.text += ' ' + segment.text.trim();
                currentGroup.end = segment.end;
                currentGroup.segmentIds.push(segment.id);
            }
        });

        if (currentGroup) grouped.push(currentGroup);
        return grouped;
    };

    // Update current time
    const handleTimeUpdate = () => {
        if (audioRef.current && !isNaN(audioRef.current.currentTime)) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    // Set duration when audio metadata is loaded
    const handleLoadedMetadata = () => {
        if (audioRef.current && !isNaN(audioRef.current.duration) && audioRef.current.duration > 0) {
            setDuration(audioRef.current.duration);
            setIsAudioReady(true);
        }
    };

    // Handle click on progress bar
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

    // Use real audio duration - with safety checks
    const effectiveDuration = duration && duration > 0 && !isNaN(duration) ? duration : 0;
    const safeCurrentTime = currentTime && !isNaN(currentTime) ? currentTime : 0;
    const progressPercentage = effectiveDuration > 0 ? (safeCurrentTime / effectiveDuration) * 100 : 0;

    // Reset audio state and update src when audio URL changes
    useEffect(() => {
        setIsAudioReady(false);
        
        if (audioRef.current) {
            // Pause any playing audio
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
            setIsPlaying(false);
            setCurrentTime(0);
            setDuration(0);
            
            // If we're changing from one audio file to another, fully release the previous one
            if (previousAudioUrlRef.current && previousAudioUrlRef.current !== audioUrl) {
                audioRef.current.removeAttribute('src');
                audioRef.current.load(); // Force reload to clear buffer
            }
            
            // Update the src attribute
            if (audioUrl) {
                audioRef.current.src = audioUrl;
                previousAudioUrlRef.current = audioUrl;
                
                // For blob URLs (recordings), force load to ensure metadata is loaded
                if (audioUrl.startsWith('blob:')) {
                    audioRef.current.load();
                    // Try to preload metadata for blob URLs
                    audioRef.current.preload = 'metadata';
                }
            } else {
                audioRef.current.removeAttribute('src');
                audioRef.current.load(); // Force reload to clear buffer
                previousAudioUrlRef.current = null;
            }
        }
    }, [audioUrl]);

    // Cleanup on component unmount - release audio resources
    useEffect(() => {
        return () => {
            if (audioRef.current) {
                // Pause and reset the audio
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
                
                // Remove the src to release the resource
                audioRef.current.removeAttribute('src');
                audioRef.current.load(); // Force reload to clear buffer
            }
        };
    }, []);

    return (
        <div className={`flex items-center gap-2 sm:gap-3 audio-player ${className}`}>
            {/* Audio Player */}
            <div className="flex-1 rounded-xl p-2 sm:p-3 border glass-card-noblur border-gray-200">
                <div className="flex items-center space-x-2 sm:space-x-4">
                    {/* Play/Pause Button */}
                    <button
                     id={"ASR_Play_Btn"}
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
                            className="w-full h-2 cursor-pointer  flex items-center"
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
                    {...(audioUrl ? { src: audioUrl } : {})}
                    crossOrigin="anonymous"
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onEnded={() => setIsPlaying(false)}
                    onCanPlay={() => setIsAudioReady(true)}
                    onLoadedData={() => {
                        if (audioRef.current && audioRef.current.duration && 
                            !isNaN(audioRef.current.duration) && audioRef.current.duration > 0) {
                            setDuration(audioRef.current.duration);
                            setIsAudioReady(true);
                        }
                    }}
                    onDurationChange={() => {
                        if (audioRef.current && audioRef.current.duration && 
                            !isNaN(audioRef.current.duration) && audioRef.current.duration > 0) {
                            setDuration(audioRef.current.duration);
                            setIsAudioReady(true);
                        }
                    }}
                    preload="none"
                >
                    Your browser does not support the audio element.
                </audio>
            </div>

            {/* Download Button */}
            {/* {audioUrl && (
                <a
                    href={audioUrl}
                    download="recording"
                    className="p-2 sm:p-2.5 rounded-xl border transition-all duration-200 flex items-center justify-center glass-card border-gray-200 text-black hover:bg-blue-100 hover:text-[#1e5eff]"
                    title="Download Audio"
                >
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                </a>
            )} */}

            {/* Copy Button - Outside player, same line, always visible */}
            <button
                onClick={handleCopyConversation}
                disabled={!conversationData}
                className={`
                    p-2 sm:p-2.5 rounded-xl border transition-all duration-200 flex items-center justify-center
                    ${
                        copied
                            ? "glass-card-copy text-green-700 border-green-200"
                            : !conversationData
                            ? "glass-card border-gray-300 text-gray-400 cursor-not-allowed"
                            : "glass-card border-gray-200 text-black hover:bg-green-200 hover:text-green-700"
                    }
                `}
                title={
                    copied
                        ? "Copied!"
                        : !conversationData
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
    );
};