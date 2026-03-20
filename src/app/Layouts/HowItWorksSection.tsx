import React from "react";
import { HiOutlineCode } from "react-icons/hi";
import { DOCS_URL } from "../utils/constants";
import { ChevronRight } from 'lucide-react';
type Step = {
  number: number;
  text: string;
};

type HowItWorksSectionProps = {
  title?: string;
  steps: Step[];
  tab: string
};

export default function HowItWorksSection({ steps, tab }: HowItWorksSectionProps) {

  const docLink =
    tab === "mt"
      ? `${DOCS_URL}/med-transcription`
      : `${DOCS_URL}/batch/quickstart`;
  return (
    <section className="bg-[#1a2370] text-white py-10 md:py-20">
      <div className="max-w-6xl mx-auto px-6 text-center relative">
        {/* Title */}
        <h2 className="text-2xl md:text-4xl font-semibold mb-12 md:mb-20">How It Works</h2>

        {/* ✅ Desktop Layout (Your Original, unchanged) */}
        <div className="hidden md:flex relative justify-between items-start">
          <div className="absolute top-[35px] left-[calc(50%/3)] right-[calc(50%/3)] h-[2px] bg-white via-blue-500/60 to-blue-500/20 z-0"></div>

          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center relative z-10 w-full">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white text-gray-700 text-2xl font-bold shadow-[0_0_25px_6px_rgba(37,99,235,0.7)]">
                {step.number}
              </div>

              <div className="bg-white text-[16px] text-gray-900 mt-8 w-[320px] min-h-[85px] flex items-center justify-center text-sm font-medium rounded-md shadow-md hover:shadow-lg transition-all duration-300 px-4">
                {step.text}
              </div>
            </div>
          ))}
        </div>

        {/* ✅ Mobile Layout (Fixed vertical line ending) */}
        <div className="flex flex-col relative items-start mt-10 md:hidden">
          {/* Vertical line that ends at last circle center */}
          <div
            className="absolute left-[28px] top-[20px] w-[2px] bg-white/60 z-0"
            style={{
              height: `calc(100% - 40px)`, // dynamically stops before last circle bottom
            }}
          ></div>

          {steps.map((step, idx) => (
            <div key={idx} className="flex items-start mb-10 relative z-10 pl-2 last:mb-0">
              {/* Number Circle */}
              <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-white text-gray-800 text-lg font-bold shadow-[0_0_15px_4px_rgba(255,255,255,0.4)]">
                {step.number}
              </div>

              {/* Card */}
              <div className="bg-white text-gray-900 ml-6 w-[calc(100%-4rem)] p-4 rounded-md shadow-md text-left text-sm font-medium">
                {step.text}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center justify-center mt-16 text-center">
          <p className="text-white font-medium text-xl mb-3">Ready to build?</p>

          <a
            href={docLink}
            className="text-white text-lg font-semibold underline underline-offset-4 decoration-white decoration-1 hover:decoration-2 transition-all flex items-center gap-3"
          >
            {tab == 'mt' ? 'See medical transcription API docs ' : 'See livestream and batch API docs'}
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-[#0B0B45] hover:scale-105 transition">
              <ChevronRight className="text-lg" />
            </div>
          </a>
        </div>

      </div>
    </section>
  );
}
