import React from "react";
import Navbar from '../Layouts/Navbar'
import { DOCS_URL } from '../utils/constants';
import FeatureQuadrant from "../components/FeatureQuadrant";
import HomeFooter from "../Layouts/HomeFooter";
import MainFooter from "../Layouts/MainFooter";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

function page() {
  return (
    <div className="min-h-screen bg-[#0C0B10] text-white pt-20">
      <Navbar />

      {/* Hero Section */}
      <section className="relative text-white md:py-24 py-16 text-center px-4 sm:px-6">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight m-auto">
            Domain specialised models for accurate transcription
          </h1>

          <p className="mt-6 text-lg md:text-2xl max-w-5xl text-gray-300 mx-auto">
            ASR trained on your domain’s language, accents, and jargon—so
            transcripts are not just accurate, but actually usable.
          </p>
        </div>

        <div className="max-w-5xl mx-auto mt-24 w-[360px] px-4  border-red-500">
          <div className=" border border-[#1E1E25] hover:border-[#2A2A35] transition-all bg-[#0F0F15] rounded-2xl p-6 text-left bg-gradient-to-b from-black to-blue-900">
            <h3 className="font-semibold text-xl mb-4 text-center">
              Zero STT Med
            </h3>
            <div className="text-center">
              <p className="text-gray-300 text-base leading-relaxed mt-6">
                Medical transcription model trained on clinical audio, built to
                capture medical terminology and abbreviations.
              </p>

              <Link
                href="/zero-med"
                className="mt-12 inline-flex items-center gap-2 text-white group duration-300"
              >
                <span className="group-hover:text-cyan-400">Try now</span>

                <ChevronRight
                  size={18}
                  className="transition-all duration-300 group-hover:translate-x-1 group-hover:text-cyan-400"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <div className="w-full">
        <FeatureQuadrant
          heading="Built for your domain, not just your language"
          subheading=" "
          rows={[
            {
              desc: `Trained on field-specific language—medical terms, support scripts, policy/legal phrasing—so it actually understands how your domain speaks`,
              title: "Domain-tuned understanding ",
            },
            {
              title: "Keyword-level accuracy",
              desc: `Fewer critical errors on key entities (symptoms, dosages, order IDs, intents) compared to generic ASR models`,
            },
            {
              desc: `Transcripts optimized for downstream tasks—notes, summaries, QA flags, CRM fields—so less post-processing and faster automation.`,
              title: "Formatted outputs",
            },
          ]}
        />
      </div>

      <section className="relative text-white md:py-24 py-12 text-center px-4 sm:px-6 bg-[#141414] mt-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold leading-tight m-auto">
            Medical ASR that understands clinical reality
          </h2>

          <p className="mt-6 text-lg md:text-xl max-w-5xl text-gray-400 mx-auto">
            Zero STT Med reaches 11.1% WER and 5.1% CER on noisy, multi-speaker
            medical audio, outperforming Whisper, ElevenLabs Scribe, and AWS
            Transcribe.{" "}
          </p>
        </div>
        <a href={`${DOCS_URL}/med-transcription`} target="_blank" rel="noopener noreferrer">
          <button
            className="px-10 py-3 mt-12 rounded-2xl text-white text-base font-medium 
             bg-gradient-to-r from-[#361D83] to-[#145AE8]
             hover:opacity-90 transition duration-300"
          >
            Learn now
          </button>
        </a>
      </section>

      <HomeFooter />
      <MainFooter />
    </div>
  );
}

export default page;
