import React from "react";
import {
  Mic,
  FileAudio,
  Info,
  AlertCircle,
  XCircle,
  CheckCircle2,
  Loader2,
} from "lucide-react";

interface WidgetMessageDisplayProps {
  type?: "info" | "error" | "success" | "warning" | "empty" | "loading";
  title?: string;
  description?: string;
  icon?: React.ReactNode | string | null;
  actionLabel?: string;
  onActionClick?: () => void;
  className?: string;
}

/**
 * Centralized message display component for all Widget UI states
 * Consistent height, spacing & alignment with RecordingProcessingUI
 */
export const WidgetMessageDisplay: React.FC<WidgetMessageDisplayProps> = ({
  type,
  title = "",
  description = "",
  icon,
  actionLabel,
  onActionClick,
  className = "",
}) => {
  const defaultIcons = {
    info: <Info className="w-10 h-10 text-blue-400" />,
    error: <XCircle className="w-10 h-10 text-red-400" />,
    success: <CheckCircle2 className="w-10 h-10 text-green-400" />,
    warning: <AlertCircle className="w-10 h-10 text-yellow-400" />,
    empty: <FileAudio className="w-10 h-10 text-gray-400" />,
    loading: <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />,
  };

  const colors = {
    info: "text-blue-400",
    error: "text-red-400",
    success: "text-green-400",
    warning: "text-yellow-400",
    empty: "text-gray-300",
    loading: "text-blue-400",
  }[type || "info"];

  /** Shared fixed-height wrapper for stable icon placement */
  const IconWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="h-20 flex items-center justify-center">{children}</div>
  );

  /** Decide which icon to render (or none at all) */
  const renderIcon = () => {
    // 1️⃣ If icon is explicitly empty string, null, or undefined → skip
    if (
      icon === "" ||
      icon === null ||
      icon === undefined
    ) {
      return null;
    }

    // 2️⃣ If a custom icon is passed → use it
    if (icon) {
      return icon;
    }

    // 3️⃣ If no icon but type is defined → show default icon
    if (type) {
      return defaultIcons[type];
    }

    // 4️⃣ Otherwise → no icon at all
    return null;
  };

  const iconElement = renderIcon();

  return (
    <div
      className={`w-full h-full flex items-center justify-center text-center  ${className}`}
    >
      <div className="flex flex-col items-center justify-center space-y-3 px-4 max-w-md">
        {iconElement && <IconWrapper>{iconElement}</IconWrapper>}

        {title && (
          <p
            className={`font-semibold text-lg sm:text-xl ${
              type ? colors : "text-white"
            } tracking-wide`}
          >
            {title}
          </p>
        )}

        {description && (
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            {description}
          </p>
        )}

        {actionLabel && onActionClick && (
          <button
            onClick={onActionClick}
            className="mt-2 px-5 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-all"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
};
