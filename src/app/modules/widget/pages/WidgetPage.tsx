
"use client";
import React, { useEffect, useState } from 'react';
import { WidgetHeader } from '../components/WidgetHeader';
import { WidgetContent } from '../components/WidgetContent';

interface WidgetPageProps {
  showHeaderTabs?: boolean;
  showLanguageDropdown?: boolean;
  fromPage?: string
  defaultdHeaderTab?: string,

}
export const WidgetPage: React.FC<WidgetPageProps> = ({
  showHeaderTabs = true,
  showLanguageDropdown = true,
  fromPage = '',
  defaultdHeaderTab = 'speech-to-text'
}) => {
  const [selectedHeaderTab, setSelectedHeaderTab] = useState<string>('speech-to-text');
  const [selectedInnerTab, setSelectedInnerTab] = useState<string>('upload');
  const [innertab, setInnertab] = useState<string | null>(null);

  // ✅ Read query only on client
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("innertab");

      setInnertab(tab);
    }
  }, []);

  useEffect(() => {
    setSelectedHeaderTab(defaultdHeaderTab);
  }, [defaultdHeaderTab]);

  // ✅ React to query after it's loaded
  // useEffect(() => {
  //   if (innertab === "mt") {
  //     setSelectedHeaderTab('medical-transcription');
  //   } else {
  //     setSelectedHeaderTab('speech-to-text')
  //   }
  // }, [innertab]);

  // When header changes, reset inner tab accordingly
  useEffect(() => {
    if (selectedHeaderTab === 'medical-transcription') {
      setSelectedInnerTab('upload');
    } else {
      setSelectedInnerTab('upload');
    }
  }, [selectedHeaderTab]);

  const handleHeaderTabChange = (tab: string) => {
    setSelectedHeaderTab(tab);
    // Reset inner tab when header changes
    if (tab === 'speech-to-text') {
      setSelectedInnerTab('upload');
    } else {
      setSelectedInnerTab('default');
    }
  };

  const handleStartTranscript = (language: string) => {
    // console.log('Starting transcription with language:', language);
  };

  return (
    <div className="text-white">
      <main className="mt-5">
        <div className="container mx-auto px-2 sm:px-4 mt-4 sm:mt-8">
          {/* Content */}
          <div className=" rounded-lg shadow-lg overflow-hidden max-w-[1250px] mx-auto mt-4 sm:mt-6 h-auto">
            <WidgetContent
              selectedHeaderTab={selectedHeaderTab}
              selectedInnerTab={selectedInnerTab}
              onInnerTabChange={setSelectedInnerTab}
              onStartTranscript={handleStartTranscript}
              setSelectedInnerTab={setSelectedInnerTab}
              handleHeaderTabChange={handleHeaderTabChange}
              shouldShowHeaderTabs={showHeaderTabs}
              shouldShowPreRecorded={true}
              selectedLang={'English'}
              showLanguageDropdown={showLanguageDropdown}
              fromPage={fromPage}
            />
          </div>
        </div>
      </main>
    </div>
  );
};
