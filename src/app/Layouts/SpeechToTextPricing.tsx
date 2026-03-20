'use client';
import React from 'react';

export default function SpeechToTextPricing() {
  const data = [
    {
      mode: 'Batch Standard',
      price: '$0.0039',
      feature: 'Accurate transcription for 200+ languages -  language needs to be specified at the start',
    },
    {
      mode: 'Real-Time Standard',
      price: '$0.0045',
      feature: 'Low latency live captions - language needs to be specified at the start',
    },
    {
      mode: 'Batch Premium',
      price: '$0.0065',
      feature: 'Highest accuracy transcription with domain specific models - language autodetection',
    },
    {
      mode: 'Real-Time Premium',
      price: '$0.0075',
      feature: 'Ultra fast live captions with language autodetection, built to scale production',
    },
  ];

  return (
    <section className="w-full flex flex-col items-center justify-center pt-0 pb-8 md:py-16 px-6">
      <h2 className="text-2xl md:text-4xl font-semibold mb-12 md:mb-20 text-white text-center">
        Speech to text
      </h2>

      {/* Responsive Scroll Container */}
      <div className="w-full max-w-5xl overflow-x-auto rounded-2xl">
        <div className="min-w-[700px] bg-[#f8f8f8] text-gray-800 rounded-2xl overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.2)]">
          {/* Header */}
          <div className="grid grid-cols-3 font-semibold bg-[#f2f2f2] border-b border-gray-300 text-gray-800">
            <div className="py-6 px-3 md:py-4 md:px-6 text-left whitespace-nowrap">Mode</div>
            <div className="py-6 px-3 md:py-4 md:px-6 text-left whitespace-nowrap">Price (USD/min)</div>
            <div className="py-6 px-3 md:py-4 md:px-6 text-left whitespace-nowrap">Key Features</div>
          </div>

          {/* Rows */}
          {data.map((row, i) => (
            <div
              key={i}
              className={`grid grid-cols-3 text-gray-800 transition-all duration-300 ease-out cursor-pointer
                hover:bg-white hover:shadow-[0_0_25px_rgba(0,0,0,0.08)]
                ${i !== data.length - 1 ? 'border-b border-gray-200' : ''}`}
            >
              <div className="py-2 px-3 md:py-4 md:px-6 font-medium whitespace-nowrap">{row.mode}</div>
              <div className="py-2 px-3 md:py-4 md:px-6 whitespace-nowrap">{row.price}</div>
              <div className="py-2 px-3 md:py-4 md:px-6">{row.feature}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
