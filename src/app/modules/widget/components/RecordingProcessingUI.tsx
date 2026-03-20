"use client";
import React, { useMemo } from "react";
import { LoaderCircle, Mic } from "lucide-react";
import ProcessingUI from "./ProcessingUI";

interface RecordingProcessingUIProps {
  isRecording: boolean;
  isProcessing: boolean;
  progress: number;
  timeRemaining?: number;
  fileSizeKB?: number;
  label?: string;
  dotColor?: string;
}

export const RecordingProcessingUI: React.FC<RecordingProcessingUIProps> = ({
  isRecording,
  isProcessing,
  progress,
  timeRemaining = 0,
  fileSizeKB = 0,
  label = "Recording in progress...",
  dotColor = "bg-black",
}) => {
  /** ===============================
   * Derived UI Mode
   * =============================== */
  const mode = useMemo<"recording" | "processing" | "idle">(() => {
    if (isRecording) return "recording";
    if (isProcessing) return "processing";
    return "idle";
  }, [isRecording, isProcessing]);

  /** ===============================
   * Computed Time String
   * =============================== */
  const formattedTime = useMemo(() => {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = (timeRemaining % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  }, [timeRemaining]);

  /** ===============================
   * Shared Gradient Definition
   * =============================== */
  const GradientDef = () => (
    <svg width="0" height="0" className="absolute">
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#853AF9" />
          <stop offset="50%" stopColor="#B0B2FF" />
          <stop offset="100%" stopColor="#1266ED" />
        </linearGradient>
      </defs>
    </svg>
  );

  /** ===============================
   * Shared Icon Wrapper (ensures identical layout)
   * =============================== */
  const IconWrapper: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => <div className="h-20 flex items-center justify-center">{children}</div>;

  /** ===============================
   * Recording UI
   * =============================== */
  const RecordingView = () => (
    <div className="flex flex-col items-center justify-center space-y-3">
      <IconWrapper>
        <div className="relative flex items-center justify-center">
          {[
            "w-14 h-14 sm:w-20 sm:h-20 opacity-20 animate-ping",
            "w-12 h-12 sm:w-16 sm:h-16 opacity-30 animate-pulse",
          ].map((cls, i) => (
            <div
              key={i}
              className={`absolute rounded-full bg-gradient-to-r from-[#853AF9] via-[#B0B2FF] to-[#1266ED] ${cls}`}
            ></div>
          ))}
          <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-[#853AF9] via-[#B0B2FF] to-[#1266ED] flex items-center justify-center">
            <Mic className="text-white" size={24} />
          </div>
        </div>
      </IconWrapper>

      <p className="text-white font-semibold text-lg sm:text-xl tracking-wide">
        RECORDING
      </p>
      <p className="text-gray-400 text-sm">
        {formattedTime} remaining • {fileSizeKB.toFixed(1)} KB
      </p>
    </div>
  );

  /** ===============================
   * Processing UI (same layout as RecordingView)
   * =============================== */
  const ProcessingView = () => (
    <div className="flex flex-col items-center justify-center space-y-3">
      <IconWrapper>
        <LoaderCircle
          className="animate-spin"
          style={{ stroke: "url(#gradient)" }}
          size={40}
        />
      </IconWrapper>

      <p className="text-white font-semibold text-lg sm:text-xl tracking-wide">
        PROCESSING
      </p>
      <p className="text-gray-400 text-sm">Your audio is being transcribed</p>
    </div>
  );

  /** ===============================
   * Render Component
   * =============================== */
  return (
    <div className="rounded-xl flex flex-col items-center justify-center h-full text-center  z-10">
      {/* Fixed progress bar at top */}
      <div className=" top-0 left-0 w-full h-[8px] pointer-events-none">
        <ProcessingUI
          progress={progress}
          label={label}
          isActive={true}
          dotColor={dotColor}
        />
      </div>

      {/* Centered mode content */}
      <div className="flex flex-col items-center justify-center flex-grow">
        <GradientDef />
        {mode === "recording" && <RecordingView />}
        {mode === "processing" && <ProcessingView />}
      </div>
    </div>
  );
};
