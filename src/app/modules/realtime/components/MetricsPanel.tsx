import React from 'react';
import { Activity, Clock, Timer } from 'lucide-react';

interface MetricsPanelProps {
  metrics: {
    inputWordsPerMinute: number;
    latencyMs: number;
    spokenWords: number;
  };
  duration: string;
  isRecording: boolean;
}

export const MetricsPanel: React.FC<MetricsPanelProps> = ({
  metrics,
  duration,
  isRecording,
}) => {
  return (
    <div className="glass-card p-4">
      <h3 className="text-sm font-semibold mb-3 text-gray-300">Live Metrics</h3>
      <div className="space-y-3">
        {/* Input WPM */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-400">WPM</span>
          </div>
          <p className="text-lg font-bold text-white">
            {Math.round(metrics.inputWordsPerMinute)}
          </p>
        </div>

        {/* Latency */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-green-400" />
            <span className="text-sm text-gray-400">Latency</span>
          </div>
          <p className="text-lg font-bold text-white">
            {metrics.latencyMs}ms
          </p>
        </div>

        {/* Duration */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Timer className="w-4 h-4 text-orange-400" />
            <span className="text-sm text-gray-400">Duration</span>
          </div>
          <p className="text-lg font-bold text-white">{duration}</p>
        </div>
      </div>
    </div>
  );
};