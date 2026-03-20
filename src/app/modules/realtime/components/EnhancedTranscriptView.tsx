import React, { useRef, useEffect } from 'react';
import { Trash2, Download, Copy, CheckCircle, Mic } from 'lucide-react';

interface TranscriptSegment {
  id: string;
  text: string;
  isFinal: boolean;
  confidence: number;
  timestamp: number;
  startTime?: number;
  endTime?: number;
}

interface EnhancedTranscriptViewProps {
  segments: TranscriptSegment[];
  isRecording: boolean;
  onClear: () => void;
  onExport: () => void;
  audioLevel?: number;
}

export const EnhancedTranscriptView: React.FC<EnhancedTranscriptViewProps> = ({
  segments,
  isRecording,
  onClear,
  onExport,
  audioLevel = 0,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = React.useState(false);

  // Auto-scroll to bottom when new segments are added
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [segments]);

  const copyToClipboard = () => {
    const text = segments
      .map(segment => segment.text)
      .join(' ');
    
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const formatTime = (seconds: number) => {
    const date = new Date(seconds * 1000);
    const hh = String(date.getUTCHours()).padStart(2, '0');
    const mm = String(date.getUTCMinutes()).padStart(2, '0');
    const ss = String(date.getUTCSeconds()).padStart(2, '0');
    const mmm = String(date.getUTCMilliseconds()).padStart(3, '0');
    return `${hh}:${mm}:${ss},${mmm}`;
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <Mic className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Live Transcript</h3>
            <p className="text-xs text-gray-400">ShunyaLabs Real-time Transcription</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={copyToClipboard}
            className="p-2 rounded-lg bg-black/30 border border-white/10 hover:bg-black/40 transition-colors"
            title="Copy transcript"
          >
            {copied ? (
              <CheckCircle className="w-4 h-4 text-green-500" />
            ) : (
              <Copy className="w-4 h-4 text-gray-400" />
            )}
          </button>
          <button
            onClick={onExport}
            disabled={segments.length === 0}
            className="p-2 rounded-lg bg-black/30 border border-white/10 hover:bg-black/40 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Export transcript"
          >
            <Download className="w-4 h-4 text-gray-400" />
          </button>
          <button
            onClick={onClear}
            disabled={segments.length === 0}
            className="p-2 rounded-lg bg-black/30 border border-white/10 hover:bg-black/40 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Clear transcript"
          >
            <Trash2 className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Transcript Container */}
      <div
        ref={scrollContainerRef}
        className="flex-1 min-h-[300px] max-h-[400px] overflow-y-auto rounded-lg bg-black/30 border border-white/10 p-4"
      >
        {segments.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <div className="flex flex-col items-center justify-center text-gray-500">
              <Mic className="w-16 h-16 mb-4 text-gray-600" />
              <p className="text-lg mb-2">Ready for Transcription</p>
              <p className="text-sm text-center text-gray-400">
                {isRecording ? 'Listening...' : 'Start recording to see transcript'}
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {segments.map(segment => (
              <div
                key={`${segment.id}_${segment.timestamp}`}
                className={`
                  p-4 rounded-lg border-l-4 shadow-sm transition-all duration-300
                  ${segment.isFinal 
                    ? 'bg-white/10 border-l-gray-400 border border-white/5' 
                    : 'bg-blue-500/10 border-l-blue-400 border border-blue-500/20 animate-pulse'
                  }
                `}
              >
                {/* Timestamp if available */}
                {segment.startTime !== undefined && (
                  <div className="text-xs text-gray-500 mb-1">
                    [{formatTime(segment.startTime)}]
                  </div>
                )}

                {/* Segment text */}
                <div
                  className={`
                    text-base leading-relaxed
                    ${segment.isFinal ? 'text-gray-200' : 'text-blue-200 font-medium'}
                  `}
                >
                  {segment.text}
                </div>

                {/* Status indicator */}
                <div className="flex items-center justify-start mt-2">
                  <span
                    className={`
                      text-xs px-2 py-1 rounded-full
                      ${segment.isFinal
                        ? 'bg-green-500/20 text-green-300'
                        : 'bg-blue-500/20 text-blue-300'
                      }
                    `}
                  >
                    {segment.isFinal ? 'Final' : 'Partial'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Status Footer */}
      <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
        <span>
          {segments.filter(s => s.isFinal).length} final segments
          {segments.filter(s => !s.isFinal).length > 0 && (
            <>, {segments.filter(s => !s.isFinal).length} partial</>
          )}
        </span>
        <span>
          {segments.filter(s => s.isFinal).reduce((acc, s) => acc + s.text.split(/\s+/).length, 0)} words
        </span>
      </div>
    </div>
  );
};