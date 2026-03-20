import React from "react";
import Navbar from "../Layouts/Navbar";
import { DOCS_URL } from '../utils/constants';
import { LanguageRegions } from "../Layouts/LanguageRegions";
import HomeFooter from "../Layouts/HomeFooter";
import MainFooter from "../Layouts/MainFooter";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Image from "next/image";

function page() {
  return (
    <div className="min-h-screen bg-[#0C0B10] text-white pt-20">
      <Navbar />

      {/* Hero Section */}
      <section className="relative text-white md:py-24 py-16 text-center px-4 sm:px-6">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight m-auto">
            One API for 200+ languages and multilingual transcriptions
          </h1>

          <p className="mt-6 text-lg md:text-2xl max-w-5xl text-gray-300 mx-auto">
            Reach the largest possible audience in real time—without juggling
            multiple language APIs or wrestling with complex setup.
          </p>
        </div>

        <div className="max-w-5xl mx-auto mt-24 grid grid-cols-1 md:grid-cols-3 gap-10 px-4">
          {/* Card 1 */}
          <div className="border border-[#1E1E25] hover:border-[#2A2A35] transition-all bg-[#0F0F15] rounded-2xl p-6 text-left bg-gradient-to-b from-black to-blue-900">
            <h3 className="font-semibold text-xl mb-4 text-center">
              Zero STT Indic
            </h3>
            <div className="text-center">
              <p className="text-gray-300 text-base leading-relaxed mt-6">
                Superior Indic models for industry best accuracy and speed in transcribing speech in Hindi, Bengali, Kannada and Telugu.
              </p>

              <Link
                href="/zero-indic"
                className="mt-12 inline-flex items-center gap-2 text-white group duration-300"
              >
                <span className="group-hover:text-cyan-400">Learn more</span>

                <ChevronRight
                  size={18}
                  className="transition-all duration-300 group-hover:translate-x-1 group-hover:text-cyan-400"
                />
              </Link>
            </div>
          </div>

          {/* Card 2 */}
          <div className="border border-[#1E1E25] hover:border-[#2A2A35] transition-all bg-[#0F0F15] rounded-2xl p-6 text-left bg-gradient-to-b from-black to-blue-900">
            <h3 className="font-semibold text-xl mb-4 text-center">
              Zero STT Code-switch
            </h3>

            <div className="text-center">
              <p className="text-gray-300 text-base leading-relaxed mt-6">
                The only model in the world that processes and returns output in mixed langauge tokens. Now available for Hinglish.
              </p>
              <Link
                href="/zero-code-switch"
                className="mt-12 inline-flex items-center gap-2 text-white group duration-300"
              >
                <span className="group-hover:text-cyan-400">Learn more</span>

                <ChevronRight
                  size={18}
                  className="transition-all duration-300 group-hover:translate-x-1 group-hover:text-cyan-400"
                />
              </Link>
            </div>
          </div>

          {/* Card 3 */}
          <div className="border border-[#1E1E25] hover:border-[#2A2A35] transition-all bg-[#0F0F15] rounded-2xl p-6 text-left bg-gradient-to-b from-black to-blue-900">
            <h3 className="font-semibold text-xl mb-4 text-center">
              Zero STT
            </h3>

            <div className="text-center">
              <p className="text-gray-300 text-base leading-relaxed mt-6">
                Universal language model that supports everyday conversational speech transcription in 200+ languages.
              </p>
              <Link
                href="/zero-stt"
                className="mt-12 inline-flex items-center gap-2 text-white group duration-300"
              >
                <span className="group-hover:text-cyan-400">Learn more</span>

                <ChevronRight
                  size={18}
                  className="transition-all duration-300 group-hover:translate-x-1 group-hover:text-cyan-400"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative text-white md:py-24 py-12 text-center px-4 sm:px-6">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold leading-tight m-auto">
            Experience the magic of Shunya Labs’ code-switching transcription
          </h2>

          <p className="mt-6 text-lg md:text-xl max-w-5xl text-gray-400 mx-auto">
            Shunya Labs’ code-switching ASR is the only in the world that
            returns native Hinglish transcripts in real time. Keep the natural
            flow of conversation and still get fast, accurate, mixed-language
            transcription.
          </p>
        </div>

        <div className="h-[50vh] bg-gray-800 max-w-5xl mx-auto mt-20 rounded-[75px]">
          <Image
            src="/assets/images/1-03 1.png"
            alt="img1"
            width={800}
            height={450}
            quality={100}
            className="h-full w-full"
            loading="lazy"
          />
        </div>
        <a href={`${DOCS_URL}/models/language`} target="_blank" rel="noopener noreferrer">
          <button
            className="px-10 py-3 mt-12 rounded-2xl text-white text-base font-medium 
             bg-gradient-to-r from-[#361D83] to-[#145AE8]
             hover:opacity-90 transition duration-300"
          >
            Try now
          </button>
        </a>
      </section>

      <section className="relative text-white md:py-24 py-12 text-center px-4 sm:px-6">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold leading-tight m-auto">
            Transcribe Indian languages like never before
          </h2>

          <p className="mt-6 text-lg md:text-xl max-w-5xl text-gray-400 mx-auto">
            Zero Indic is purpose-built for Indian speech, delivering up to 200%
            better accuracy than the next-best model. Unlock world-class support
            for your users with reliable, real-time transcripts that keep pace
            with the natural rhythm of conversation.
          </p>
        </div>

        <div className="h-[50vh] bg-gray-800 max-w-5xl mx-auto mt-20 rounded-[75px]">
          <Image
            src="/assets/images/1-04 1.png"
            alt="img1"
            width={800}
            height={450}
            quality={100}
            className="h-full w-full"
            loading="lazy"
          />
        </div>
        <a href={`${DOCS_URL}/models/language`} target="_blank" rel="noopener noreferrer">
          <button
            className="px-10 py-3 mt-12 rounded-2xl text-white text-base font-medium 
             bg-gradient-to-r from-[#361D83] to-[#145AE8]
             hover:opacity-90 transition duration-300"
          >
            Try now
          </button>
        </a>
      </section>

      <LanguageRegions
        title="One API for 200+ languages, covering 97% of the global population"
        subtitle="Zero STT is the world's most accurate speech-to-text model designed to support conversational speech in 200+ languages in noisy real world scenarios with speaker overlap. Transcribe audio in sub second latency for captions that feels natural."
      />

      <HomeFooter />
      <MainFooter />
    </div>
  );
}

export default page;
