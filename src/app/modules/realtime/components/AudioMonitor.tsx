import React from 'react';

interface AudioMonitorProps {
  audioLevel: number;
  isRecording: boolean;
}

export const AudioMonitor: React.FC<AudioMonitorProps> = ({ audioLevel, isRecording }) => {
  const bars = 20;
  const activeBarCount = Math.floor(audioLevel * bars);

  return (
    <div className="glass-card p-4">
      <h3 className="text-sm font-semibold mb-3 text-gray-300">Audio Monitor</h3>
      <div className="flex items-center justify-center gap-1 h-16">
        {Array.from({ length: bars }, (_, i) => {
          const isActive = i < activeBarCount;
          const height = isActive ? 20 + Math.random() * 30 : 8;
          
          return (
            <div
              key={i}
              className={`
                w-2 rounded-full transition-all duration-150
                ${isActive 
                  ? isRecording 
                    ? 'bg-red-500' 
                    : 'bg-blue-500'
                  : 'bg-gray-700'
                }
              `}
              style={{
                height: `${height}px`,
                opacity: isActive ? 1 : 0.3,
              }}
            />
          );
        })}
      </div>
      <div className="text-center mt-2">
        <span className="text-xs text-gray-400">
          Level: {Math.round(audioLevel * 100)}%
        </span>
      </div>
    </div>
  );
};
