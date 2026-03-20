'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // ✅ new Next.js 15+ syntax
import { FaCheck } from 'react-icons/fa6'
import { DOCS_URL } from '../../utils/constants';
import { use } from 'react';
import Image from 'next/image';
import { getDirectLanguages } from '../../modules/widget/config/language-mapping';
import { languageToFlag } from '../../utils/languageToFlagMap';
import Navbar from '@/app/Layouts/Navbar';
import WhyShunyaLabsSection from '@/app/Layouts/WhyShunyaLabsSection';
import HomeFooter from '@/app/Layouts/HomeFooter';
import { LiveTranscriptionWidget } from '@/app/modules/widget';
import MainFooter from '@/app/Layouts/MainFooter';
import { WidgetPage } from '@/app/modules/widget/pages/WidgetPage';
import { WidgetContent } from '@/app/modules/widget/components/WidgetContent';
import Link from "next/link";

export default function SpeechToTextPage({
  params,
}: {
  params: Promise<{ language: string }>;
}) {
  const { language: langParam } = use(params); // ✅ unwrap params using React.use()
  const router = useRouter();
  const [selectedHeaderTab, setSelectedHeaderTab] = useState<string>('language-based-models');
  const langName = decodeURIComponent(langParam);
  const [selectedInnerTab, setSelectedInnerTab] = useState<string>('customer-support call');

  const allLangs = getDirectLanguages();
  const initialLanguage =
    allLangs.find(
      (l) => l.name.toLowerCase().replace(/\s+/g, '-') === langName
    ) || allLangs[0];

  const [selectedLang, setSelectedLang] = useState(initialLanguage);
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const flagCode = languageToFlag[selectedLang.code];
  const flag = flagCode
    ? `/data/flags/1x1/${flagCode}.svg`
    : '/data/flags/1x1/un.svg';

  // ✅ Close dropdown on outside click
  useEffect(() => {

    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ✅ Change language and route
  const handleLanguageSelect = (langCode: string) => {
    const newLang = allLangs.find((l) => l.code === langCode);
    if (newLang) {
      setSelectedLang(newLang);
      setOpen(false);
      const slug = newLang.name.toLowerCase().replace(/\s+/g, '-');
      router.push(`/speech-to-text/${slug}`);
    }
  };
  const handleStartTranscript = (language: string) => {
    // console.log('Starting transcription with language:', language);
  };

  const handleHeaderTabChange = (tab: string) => {
    setSelectedHeaderTab(tab);
    // Reset inner tab when header changes
    if (tab === 'speech-to-text') {
      setSelectedInnerTab('customer-support call');
    } else {
      setSelectedInnerTab('default');
    }
  };
  return (
    <>
      <div className='bg-shunya-labs pt-20'>
        {/* Header */}
        <div className="">
          <Navbar />
          <section className="relative text-white md:py-3 py-5 text-center">
            {/* <div className="max-w-4xl mx-auto px-6">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              The Voice AI Infrastructure Layer for Enterprises
            </h1>
            <p className="mt-6 text-lg md:text-2xl text-gray-300">
              Voice agents powered by foundational speech models—engineered for{' '}
              <span className="text-white font-medium">accuracy</span>,{' '}
              <span className="text-white font-medium">privacy</span>, and{' '}
              <span className="text-white font-medium">scale</span>.
            </p>
          </div> */}
          </section>
        </div>

        {/* --- Transcription Section --- */}
        <section className=" text-gray-100 px-4 md:px-10 py-16 flex flex-col items-center">
          {/* --- Heading --- */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-3xl md:text-4xl font-semibold mb-3 text-white">
              {selectedLang.name} Voice to Text Transcription
            </h1>
            <p className="text-gray-400">
              Convert {selectedLang.name} audio to clean text in seconds. Reliable, secure, and ready for production.
            </p>
          </div>

          <div className="w-full max-w-[1250px] backdrop-blur-sm ">
            {/* <LiveTranscriptionWidget selectedLanguage={selectedLang.code} />
             */}
            <WidgetContent
              selectedHeaderTab={selectedHeaderTab}
              selectedInnerTab={selectedInnerTab}
              onInnerTabChange={setSelectedInnerTab}
              onStartTranscript={handleStartTranscript}
              setSelectedInnerTab={setSelectedInnerTab}
              handleHeaderTabChange={handleHeaderTabChange}
              shouldShowHeaderTabs={false}
              shouldShowPreRecorded={false}
              selectedLang={selectedLang.code}
              fromPage="speech-to-text-language"
            />
          </div>
          <div className="mt-20">
            <Link href={`${DOCS_URL}/batch/quickstart`} target="_blank" rel="noopener noreferrer"
              className="px-6 py-2 bg-white text-black font-medium rounded-full shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
            >
              Access Zero STT {selectedLang.name} transcription
            </Link>
          </div>

        </section>
      </div>
      <WhyShunyaLabsSection />
      <HomeFooter />
      <MainFooter />
    </>
  );
}
