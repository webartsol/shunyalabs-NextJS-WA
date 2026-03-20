import React, { useEffect, useRef } from "react";
import { getAvailableInnerTabs } from "../hooks/useContentMapping";

interface InnerTabsProps {
  selectedTab: string;
  onTabChange: (tab: string) => void;
  headerTab: string;
  disabled?: boolean;
  isRecording?: boolean;
  onFileUpload?: (file: File) => void; // 👈 Add this prop
  fromPage?: string;
}

export const InnerTabs: React.FC<InnerTabsProps> = ({
  selectedTab,
  onTabChange,
  headerTab,
  disabled = false,
  isRecording = false,
  onFileUpload, // 👈 use this here
  fromPage = ''
}) => {
  const allInnerTabs = getAvailableInnerTabs(headerTab);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleTabClick = (tabKey: string) => {
    if (tabKey === "upload") {
      // 👇 open file dialog
      fileInputRef.current?.click();
    } else {
      onTabChange(tabKey);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onFileUpload) {
      onFileUpload(file);
      onTabChange("upload");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row md:flex-row items-center gap-2 w-full">
      {/* hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*"
        className="hidden"
        onChange={handleFileChange}
        disabled={disabled || isRecording}
      />

      {allInnerTabs.map((tab) => (
        <button
          key={tab.key}
          id={tab.id}
          onClick={() => handleTabClick(tab.key)}
          disabled={disabled || isRecording}
          className={`h-auto min-h-[36px] sm:min-h-[44px] w-full px-2 sm:px-4 flex items-center justify-center rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-normal sm:whitespace-nowrap text-center
            ${selectedTab === tab.key
              ? "bg-white text-black border"
              : "bg-transparent text-white border border-white/20 hover:bg-white/10"
            }
            disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {tab.title}
        </button>
      ))}
    </div>
  );
};
