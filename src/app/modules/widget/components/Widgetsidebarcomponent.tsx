import React, { useEffect, useState } from "react";
import { InnerTabs } from "./InnerTabs";
import { GroupedLanguageSelect } from "./GroupedLanguageSelect";

interface WidgetSidebarProps {
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
  onFileUpload: (file: File) => void;
  onStartSpeaking: () => void;
  onStopRecording: () => void;
  onSampleSelect: (sampleType: string) => void;
  disabled?: boolean;
  isRecording?: boolean;
  selectedHeaderTab?: string;
  selectedInnerTab: string;
  onInnerTabChange: (tab: string) => void;
  shouldShowPreRecorded: boolean;
  handleInnerTabChangeParent?: (tab: string) => void;
  showLanguageDropdown?: boolean,
  fromPage?: string
}

export default function WidgetSidebar({
  selectedLanguage,
  onLanguageChange,
  onFileUpload,
  onStartSpeaking,
  onStopRecording,
  onSampleSelect,
  disabled = false,
  isRecording = false,
  selectedHeaderTab = "speech-to-text",
  selectedInnerTab,
  onInnerTabChange,
  shouldShowPreRecorded,
  handleInnerTabChangeParent,
  showLanguageDropdown = true,
  fromPage = ''
}: WidgetSidebarProps) {
  const [selectedSample, setSelectedSample] = useState<string>("upload");

  const handleInnerTabChange = (tab: string) => {
    setSelectedSample(tab);
    onInnerTabChange(tab);
    onSampleSelect(tab);
    handleInnerTabChangeParent && handleInnerTabChangeParent(tab);
  };

  // useEffect(() => {
  //   onLanguageChange((selectedHeaderTab == "speech-to-text" || selectedHeaderTab == "language-based-models") ? "en" : "med-en");
  //   setSelectedSample("upload");
  //   onSampleSelect("upload");
  // }, [selectedHeaderTab]);

  useEffect(() => {
    let lang = "en"; // default
    if (selectedHeaderTab === "zero-code-switch") {
      lang = "hi-en";
    } else if (selectedHeaderTab === "medical-transcription") {
      lang = "en";
    }

    if (fromPage !== "speech-to-text-language") {
      onLanguageChange(lang);
    }
    setSelectedSample("upload");
    onSampleSelect("upload");
  }, [selectedHeaderTab, fromPage]);


  return (
    <div className="w-full">
      <div className="glass-card relative overflow-visible rounded-2xl px-4 sm:px-6 lg:px-8 py-4 sm:py-5 border border-gray-800 backdrop-blur-xl transition-all duration-300">
        {/* ✅ 3-column flex layout */}
        <div className={`flex flex-col md:flex-row items-stretch w-full gap-4 md:gap-0 ${showLanguageDropdown ? "" : "justify-center"
          }`}>
          {/* 🟦 Column 1: Language (20%) */}
          {showLanguageDropdown &&
            <div className="relative flex flex-col justify-between w-full md:w-[20%] pr-0 md:pr-4 lg:pr-6">
              <div className={`relative `}>
                <label className="text-white text-[12px] mb-12 sm:text-xs font-semibold tracking-wide  block">
                  Language
                </label>
                <GroupedLanguageSelect
                  value={selectedLanguage}
                  label=""
                  onChange={onLanguageChange}
                  selectedHeaderTab={selectedHeaderTab}
                />
              </div>
              {/* 🔹 Vertical Divider inside this column */}
              <div className="hidden md:block absolute top-0 right-[-1px] h-full w-[0.01rem] bg-[#838383]" />
            </div>
          }

          {/* 🟨 Column 2: Input Audio (Dynamic) */}
          <div className={`flex flex-col w-full ${selectedHeaderTab === "language-based-models" ? "md:w-[20%]" : "md:w-[60%]"
            } pl-0 md:pl-4 lg:pl-6`}>
            <label className="text-white text-[12px] sm:text-xs font-semibold tracking-wide mb-2 ">
              Input Audio
            </label>

            {/* Dynamic Section */}
            {shouldShowPreRecorded ? (
              // 🟣 Case 1: Pre-recorded Section (Tabs)
              <div className="flex flex-col gap-2 sm:gap-3">
                {/* Tag */}
                <span className="inline-flex items-center justify-center w-max bg-gradient-to-r from-[#073B8E] to-[#5218C5] text-white text-[10px] sm:text-[11px] px-2 sm:px-3 py-1 rounded-full font-medium">
                  Pre-recorded
                </span>

                {/* Inner Tabs */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex flex-wrap gap-2 flex-1 min-w-0">
                    <InnerTabs
                      selectedTab={selectedSample}
                      onTabChange={handleInnerTabChange}
                      headerTab={selectedHeaderTab}
                      onFileUpload={onFileUpload}
                      fromPage={fromPage}
                    />
                  </div>
                </div>
              </div>
            ) : (
              // 🟠 Case 2: Upload Section (Manual file upload)
              <div className="flex flex-col gap-2 sm:gap-3">
                {/* Tag */}
                <span className="inline-flex items-center justify-center w-max bg-gradient-to-r from-[#073B8E] to-[#5218C5] text-white text-[10px] sm:text-[11px] px-2 sm:px-3 py-1 rounded-full font-medium">
                  Pre-recorded
                </span>

                {/* Upload Button */}
                <label
                  className={`${disabled || isRecording
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                    }`}
                >
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setSelectedSample("upload");
                        onFileUpload(file);
                      }
                    }}
                    disabled={disabled || isRecording}
                    className="hidden"
                  />

                  <div
                    className={`h-[36px] sm:h-[40px] lg:h-[44px] w-full sm:w-auto sm:max-w-[180px] px-3 sm:px-4 lg:px-5 flex items-center justify-center rounded-lg font-medium text-xs sm:text-sm transition-all duration-200
                  ${selectedSample === "upload"
                        ? "bg-white text-gray-900 hover:bg-gray-100"
                        : "bg-transparent text-white hover:bg-white/10 border border-white/20"
                      }`}
                  >
                    <span className="truncate">Upload your file</span>
                  </div>
                </label>
              </div>
            )}
          </div>

          {/* 🟥 Column 3 – Live Recording (20%) */}
          <div className="flex flex-col w-full md:w-[20%] pl-0 ">
            {/* ✅ Two sub-columns inside */}
            <div className={`flex flex-col sm:flex-row items-center justify-center w-full h-full ${selectedHeaderTab === "language-based-models" ? "gap-10" : "gap-5"
              }`}>
              {/* 🟣 Left Sub-column — "or" text */}
              <div className="hidden sm:flex items-center justify-center w-auto">
                <span className="text-white/60 text-xs sm:text-sm lg:text-base mt-4 sm:mt-6 pl-0 md:pl-4 lg:pl-0">or</span>
              </div>

              {/* 🔵 Right Sub-column — label + button */}
              <div className="flex flex-col items-start justify-center gap-2 w-full sm:w-auto sm:flex-1 sm:max-w-[160px] lg:max-w-[180px]">
                {/* Live recording badge */}
                <span className="inline-flex mt-3 mb-2 items-center lg:items-start justify-center lg:justify-start w-auto max-w-full bg-gradient-to-r from-[#073B8E] to-[#5218C5] text-white text-[10px] sm:text-[11px] px-2 sm:px-3 py-1 rounded-full font-medium whitespace-nowrap">
                  <span className="truncate">Live recording</span>
                </span>

                {/* Start Speaking button */}
                <button
                  id={isRecording ? "ASR_STT_start_speaking" : "ASR_STT_stop_recording"}
                  onClick={isRecording ? onStopRecording : onStartSpeaking}
                  disabled={disabled && !isRecording}
                  className={`h-[36px] sm:h-[40px] lg:h-[44px] w-full px-3 sm:px-4 flex items-center justify-center rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200
                ${isRecording
                      ? "bg-red-600 hover:bg-red-700 text-white"
                      : "bg-[#1E5EFF] hover:bg-[#2C6FFF] text-white"
                    }`}
                >
                  <span className="truncate">
                    {isRecording ? "Stop" : "Start Speaking"}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
