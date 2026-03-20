import React from "react";

interface ProcessingUIProps {
  progress?: number; // Progress percentage (0 - 100)
  label?: string; // Optional label below the progress
  isActive?: boolean; // If true, shows pulsing animation on the dot
  dotColor?: string; // e.g. 'bg-black', 'bg-red-600', 'bg-green-500'
  showCopyButton?: boolean; // Toggle copy button visibility
  copyDisabled?: boolean; // Disable/enable copy button
  onCopyClick?: () => void; // Optional click handler for copy
  className?: string; // Optional additional styling
}

const ProcessingUI: React.FC<ProcessingUIProps> = ({
  progress = 0,
  label = "Processing...",
  isActive = false,
  dotColor = "bg-black",
  showCopyButton = true,
  copyDisabled = true,
  onCopyClick,
  className = "",
}) => {
  return (
    <div className={`flex items-center gap-2 sm:gap-3 w-full ${className}`}>
      {/* Main Player Section */}
      <div className="flex-1 rounded-xl p-2 sm:p-3 border glass-card-noblur border-gray-200">
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Dot Circle */}
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center">
            <div
              className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full ${dotColor} ${
                isActive ? "" : ""
              }`}
            ></div>
          </div>

          {/* Dotted Progress Bar */}
          <div className="flex-1 min-w-0">
            <div className="w-full h-2  flex items-center">
              <div className="flex justify-between w-full">
                {/* Mobile: 15 dots */}
                <div className="flex justify-between w-full sm:hidden">
                  {Array.from({ length: 15 }, (_, index) => {
                    const dotProgress = (index / 14) * 100;
                    const isActiveDot = dotProgress <= progress;
                    return (
                      <div
                        key={index}
                        className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
                          isActiveDot ? "bg-blue-600" : "bg-gray-300"
                        }`}
                      />
                    );
                  })}
                </div>
                {/* Desktop: 60 dots */}
                <div className="hidden sm:flex justify-between w-full">
                  {Array.from({ length: 60 }, (_, index) => {
                    const dotProgress = (index / 59) * 100;
                    const isActiveDot = dotProgress <= progress;
                    return (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                          isActiveDot ? "bg-blue-600" : "bg-gray-300"
                        }`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>

      {/* Copy Button (optional) */}
      {showCopyButton && (
        <button
          onClick={onCopyClick}
          disabled={copyDisabled}
          className={`p-2 sm:p-2.5 rounded-xl border glass-card-noblur transition-all duration-200 flex items-center justify-center ${
            copyDisabled
              ? "border-gray-300 text-gray-400 cursor-not-allowed"
              : "border-gray-200 text-black hover:bg-green-200 hover:text-green-700"
          }`}
          title={
            copyDisabled ? "No conversation to copy" : "Copy conversation"
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
      )}
    </div>
  );
};

export default ProcessingUI;
