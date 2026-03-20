import React, { Suspense, useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useVakToken } from "@/app/hooks/useVakToken";
import { InnerTabs } from "./InnerTabs";
import { DemoAudioPlayer } from "./DemoAudioPlayer";
import { LiveTranscription, LiveTranscriptionRef } from "./LiveTranscription";
import { AudioUploadZone } from "./AudioUploadZone";
import { useContentMapping } from "../hooks/useContentMapping";
import {
  getAvailableLanguages,
  getLanguagesWithRegion,
  getSTTMedLanguagesWithRegion,
  getLanguageNameByCode,
} from "../config/language-mapping";
import { getLanguagesByRegion } from "../config/language-mapping";
import { GroupedLanguageSelect } from "./GroupedLanguageSelect";
import WidgetSidebar from "./Widgetsidebarcomponent";
import { WidgetHeader } from "./WidgetHeader";
import { ConversationDisplay } from "./ConversationDisplay";
import axios from "axios";
import { WidgetMessageDisplay } from "./WidgetMessageDisplay";
import { TTSWidget } from "./TTSWidget";

interface WidgetContentProps {
  selectedHeaderTab: string;
  selectedInnerTab: string;
  onInnerTabChange: (tab: string) => void;
  onStartTranscript: (language: string) => void;
  setSelectedInnerTab: any;
  handleHeaderTabChange: any;
  shouldShowHeaderTabs: boolean;
  shouldShowPreRecorded: boolean;
  selectedLang: string;
  showLanguageDropdown?: boolean;
  fromPage?: string
}
let localAudioUrl: any;

// Wrapped in Suspense because useSearchParams() requires it for static/SSR pages.
// See: https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
export const WidgetContent: React.FC<WidgetContentProps> = (props) => (
  <Suspense fallback={null}>
    <WidgetContentInner {...props} />
  </Suspense>
);

const WidgetContentInner: React.FC<WidgetContentProps> = ({
  selectedHeaderTab,
  selectedInnerTab,
  onInnerTabChange,
  onStartTranscript,
  setSelectedInnerTab,
  handleHeaderTabChange,
  shouldShowHeaderTabs,
  shouldShowPreRecorded,
  selectedLang,
  showLanguageDropdown = true,
  fromPage
}) => {
  const searchParams = useSearchParams();
  const [selectedLanguage, setSelectedLanguage] = useState(selectedLang);
  const [isLiveTranscriptionMode, setIsLiveTranscriptionMode] = useState(false);
  const [isTranscriptionInProgress, setIsTranscriptionInProgress] =
    useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isProcessingUpload, setIsProcessingUpload] = useState(false);
  const [isLiveRecording, setIsLiveRecording] = useState(false);
  const liveTranscriptionRef = useRef<LiveTranscriptionRef>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadErrorDesc, setUploadErrorDesc] = useState<string | null>(null);
  const { tokenRef: vakTokenRef } = useVakToken();
  const LangWithRegions = getLanguagesWithRegion();
  // Use content mapping to get dynamic content - always use English for content display
  const contentMapping = useContentMapping({
    headerTab: selectedHeaderTab,
    innerTab: selectedInnerTab,
    language: "en", // Always use English for content display
  });
  // Custom handler to reset states when inner tab changes (or is re-clicked)
  const handleInnerTabChangeParent = (tab: string) => {
    // Reset all transcription-related states
    setIsLiveTranscriptionMode(false);
    setIsTranscriptionInProgress(false);
    setUploadedFile(null);
    setIsProcessingUpload(false);
    setIsLiveRecording(false);

    // Call the parent handler
    onInnerTabChange(tab);
  };

  useEffect(() => {
    if (fromPage == 'zero-code-switch') {
      setSelectedLanguage('hi-en')
    }
  }, [fromPage])

  // When a language is selected from the LanguageRegions section on the home page,
  // it sets a "lang" query param. We read it here to update the ASR_STT_language
  // dropdown, so clicking a language CTA scrolls up and selects that language.
  useEffect(() => {
    const langFromQuery = searchParams.get("lang");
    if (langFromQuery) {
      setSelectedLanguage(langFromQuery);
    }
  }, [searchParams]);

  // Reset live transcription mode when inner tab changes
  useEffect(() => {
    setIsLiveTranscriptionMode(false);
    setIsTranscriptionInProgress(false);
    setUploadedFile(null);
    setIsProcessingUpload(false);
    setIsLiveRecording(false);
  }, [selectedInnerTab]);

  useEffect(() => {
    if (selectedHeaderTab === 'zero-code-switch') {
      setSelectedLanguage('hi-en');
    }
  }, [selectedHeaderTab]);

  const handleFileUpload = async (file: File) => {
    setUploadError(null);
    setUploadErrorDesc(null);

    const MAX_FILE_SIZE = 30 * 1024 * 1024; // 30 MB
    // 🧹 Stop all audio players
    document.querySelectorAll("audio").forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
      audio.removeAttribute("src");
      audio.load();
    });

    await new Promise((r) => setTimeout(r, 100));

    setUploadedFile(file);
    setIsProcessingUpload(true);
    setIsLiveTranscriptionMode(true);
    liveTranscriptionRef.current?.setProcessingState?.(true);

    const isCodeSwitch = selectedHeaderTab === "zero-code-switch";
    const isMedical = selectedHeaderTab === "medical-transcription";
    const model = isCodeSwitch ? "zero-codeswitch" : isMedical ? "zero-med" : "zero-indic";

    const formData = new FormData();
    formData.append("file", file);
    formData.append("index", "0");
    formData.append("chunk_size", "120");
    formData.append("enable_diarization", "true");
    formData.append("output_script", "auto");
    formData.append("model", model);
    formData.append("language_code", isCodeSwitch ? "Auto" : getLanguageNameByCode(selectedLanguage));

    const startTime = Date.now();

    const directSttUrl = process.env.NEXT_PUBLIC_STT_API_URL;
    const useDirectApi = directSttUrl && vakTokenRef.current;

    try {
      const response = useDirectApi
        ? await axios.post(directSttUrl, formData, {
            headers: {
              accept: "application/json",
              "api-key": vakTokenRef.current!,
            },
            timeout: 120000,
            maxBodyLength: Infinity,
            maxContentLength: Infinity,
            validateStatus: () => true,
          })
        : await axios.post("/api/vak/stt", formData, {
            headers: {
              accept: "application/json",
              ...(vakTokenRef.current ? { "X-Session-Token": vakTokenRef.current } : {}),
            },
            timeout: 120000,
            maxBodyLength: Infinity,
            maxContentLength: Infinity,
            validateStatus: () => true,
          });

      if (response && response.status) {
        switch (response.status) {
          case 200:
            const result = response.data;
            localAudioUrl = URL.createObjectURL(file);
            liveTranscriptionRef.current?.setTranscriptionResult?.(result);
            break;

          case 413:
            setUploadError("File too large");
            setUploadErrorDesc(
              "This audio file exceeds the upload limit. Please upload a smaller file or split it into shorter clips."
            );
            break;

          case 504:
            setUploadError("Request timed out");
            setUploadErrorDesc(
              "The server took too long to respond. Please try again."
            );
            break;

          default:
            // Generic message for all other cases
            setUploadError("Upload failed");
            setUploadErrorDesc(
              "Something went wrong. Please try again, or contact support if it persists."
            );
            break;
        }

        setIsLiveTranscriptionMode(true);
        return;
      }

      throw new Error("No response from server");
    } catch (error: any) {
      console.error("❌ Upload transcription error:", error);

      const elapsed = (Date.now() - startTime) / 1000;

      // Check for 413 in the error response
      if (error?.response?.status === 413) {
        setUploadError("File too large");
        setUploadErrorDesc(
          "This audio file exceeds the upload limit. Please upload a smaller file or split it into shorter clips."
        );
      } else if (
        error.code === "ECONNABORTED" ||
        elapsed > 55 ||
        error?.response?.status === 504
      ) {
        setUploadError("Request timed out");
        setUploadErrorDesc(
          "The server took too long to respond. Please try again."
        );
      } else {
        // Generic message for everything else
        setUploadError("Upload failed");
        setUploadErrorDesc(
          "Something went wrong. Please try again, or contact support if it persists."
        );
      }

      setIsLiveTranscriptionMode(true);
    } finally {
      setIsProcessingUpload(false);

      const fileInput = document.querySelector(
        'input[type="file"]'
      ) as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    }
  };
  const handleStartSpeaking = () => {
    setUploadError(null);
    // setSelectedInnerTab(null)
    const audioElements = document.querySelectorAll("audio");
    audioElements.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
      audio.removeAttribute("src");
      audio.load(); // Force clear buffer
    });

    // Start live recording transcription
    setIsTranscriptionInProgress(true);
    setIsLiveTranscriptionMode(true);
    setIsLiveRecording(true); // Mark as live recording

    // Use setTimeout to ensure state updates are processed
    setTimeout(() => {
      if (liveTranscriptionRef.current) {
        liveTranscriptionRef.current.startTranscription();
      }
    }, 100); // Slightly longer delay to ensure cleanup completes

    // Call the original onStartTranscript function
    onStartTranscript(selectedLanguage);
  };
  const handleStopRecording = () => {
    // Stop the live recording transcription
    if (liveTranscriptionRef.current) {
      liveTranscriptionRef.current.stopTranscription();
    }

    // Reset states to show upload and start buttons again
    setIsTranscriptionInProgress(false);
    setIsLiveRecording(false);
  };

  const handleSampleSelect = (data: any) => {
    setSelectedInnerTab(data);
    setUploadError(null);
  };

  // Get available languages from the new language mapping
  const languages = getAvailableLanguages();

  languages.sort((a, b) => a.name.localeCompare(b.name));

  const renderContent = () => {
    // Handle speech-to-text and medical-transcription with same layout
    if (
      selectedHeaderTab === "speech-to-text" ||
      selectedHeaderTab === "medical-transcription" ||
      selectedHeaderTab === "language-based-models" ||
      selectedHeaderTab === "zero-code-switch"
    ) {
      return (
        <>
          {/* ===== Header Section ===== */}
          {shouldShowHeaderTabs && (
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              <div className="w-full lg:flex-1 mb-5">
                <WidgetHeader
                  selectedTab={selectedHeaderTab}
                  onTabChange={handleHeaderTabChange}
                />
              </div>

            </div>
          )}
          {/* ===== Main Layout ===== */}
          <div className="flex flex-col gap-6">
            {/* ===== Top Horizontal Bar (Previously Sidebar) ===== */}
            <div className="w-full">
              <WidgetSidebar
                selectedLanguage={selectedLanguage}
                onLanguageChange={setSelectedLanguage}
                onFileUpload={handleFileUpload}
                onStartSpeaking={handleStartSpeaking}
                onStopRecording={handleStopRecording}
                onSampleSelect={handleSampleSelect}
                disabled={isProcessingUpload || isTranscriptionInProgress}
                isRecording={isLiveRecording}
                selectedHeaderTab={selectedHeaderTab}
                selectedInnerTab={selectedInnerTab}
                onInnerTabChange={setSelectedInnerTab}
                shouldShowPreRecorded={shouldShowPreRecorded}
                handleInnerTabChangeParent={handleInnerTabChangeParent}
                showLanguageDropdown={showLanguageDropdown}
                fromPage={fromPage}
              />
            </div>

            {/* ===== Bottom Widget Area (Previously Right Side) ===== */}
            <div className="w-full glass-card-noblur rounded-xl h-[300px] sm:h-[380px] md:h-[440px] overflow-hidden">
              <div className="p-4 sm:p-4 flex-grow h-full">
                {/* Content Area */}
                <div className="space-y-4 flex-grow h-full">
                  {/* Demo Audio Player - Shows when not in live transcription mode */}
                  {!isLiveTranscriptionMode && (
                    <DemoAudioPlayer
                      key={`demo-player-${selectedInnerTab}-${selectedHeaderTab}`}
                      audioSample={contentMapping.audioSample}
                      selectedInnerTab={selectedInnerTab}
                      uiText={contentMapping.uiText}
                      selectedHeaderTab={selectedHeaderTab}
                    />
                  )}

                  {/* Live Transcription - Shows when in live transcription mode */}
                  {isLiveTranscriptionMode && (
                    <>
                      {uploadError ? (
                        <WidgetMessageDisplay
                          type="empty"
                          title={uploadError}
                          description={
                            uploadErrorDesc ||
                            "Something went wrong. Please try again."
                          }
                          // actionLabel="Try Again"
                          onActionClick={() => {
                            setIsProcessingUpload(false);
                            setIsTranscriptionInProgress(false);
                            setIsLiveTranscriptionMode(false);
                            setUploadedFile(null);
                            setUploadError(null);
                            setUploadErrorDesc(null);
                          }}
                          icon={""}
                        />
                      ) : (
                        <LiveTranscription
                          key={`live-transcription-${selectedInnerTab}-${selectedHeaderTab}`}
                          ref={liveTranscriptionRef}
                          selectedLanguage={selectedLanguage}
                          onTranscriptionComplete={() => { }}
                          isProcessingUpload={isProcessingUpload}
                          onCancelUpload={() => {
                            setIsProcessingUpload(false);
                            setIsTranscriptionInProgress(false);
                            setIsLiveTranscriptionMode(false);
                            setUploadedFile(null);
                            setUploadError(null);
                            setUploadErrorDesc(null);
                          }}
                          uiText={contentMapping.uiText}
                          headerTab={selectedHeaderTab}
                          audioURL={localAudioUrl}
                        />
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }

    // Handle text-to-speech
    if (selectedHeaderTab === "text-to-speech") {
      return (
        <>
          {shouldShowHeaderTabs && (
            <div className="flex flex-col lg:flex-row gap-6 items-center">
              <div className="w-full lg:flex-1 mb-5">
                <WidgetHeader
                  selectedTab={selectedHeaderTab}
                  onTabChange={handleHeaderTabChange}
                />
              </div>
            </div>
          )}
          <TTSWidget />
        </>
      );
    }

    // Default case for other tabs
    return (
      <div className="p-4 sm:p-8 text-center">
        <p className="text-gray-600">Select a tab to get started</p>
      </div>
    );
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 overflow-hidden scrollbar-hide">
        {renderContent()}
      </div>
    </div>
  );
};
