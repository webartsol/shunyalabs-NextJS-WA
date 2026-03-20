import React from 'react';
import { DOCS_URL } from '../../../utils/constants';

export const HomePageButtons = () => {
  return (
    <div className="flex flex-wrap justify-center items-center gap-6 py-5">
      {/* 1️⃣ Cloud API */}
      <a
        href="/pricing"
        className="group relative inline-flex items-center px-8 py-1 rounded-full
          border border-white/30 bg-[linear-gradient(90deg,#361D83_0%,#3F2E71_50%,#0C061D_100%)]
          text-white transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.6)]
          min-w-[260px]"
      >
        <div className="flex flex-col items-center justify-center w-full text-center">
          <span className="font-semibold text-md leading-tight">Cloud API</span>
          <span className="text-xs text-gray-300">Production Ready</span>
        </div>
        <span className="absolute right-5 text-xl group-hover:translate-x-1 transition-transform duration-200">
          →
        </span>
      </a>

      {/* 2️⃣ Developer Documentation */}
      <a
        href={`${DOCS_URL}/overview`} target="_blank" rel="noopener noreferrer"
        className="group relative inline-flex items-center px-10 py-1 rounded-full
          border border-white/30
          text-white transition-all duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.6)]
          min-w-[260px] bg-[linear-gradient(90deg,#5C19C1_0%,#604C7F_55%,#240554_100%)]"
      >
        <div className="flex flex-col items-center justify-center w-full text-center">
          <span className="font-semibold text-md leading-tight">Developer Documentation</span>
          <span className="text-xs text-gray-300">Local Deployment</span>
        </div>
        <span className="absolute right-5 text-xl group-hover:translate-x-1 transition-transform duration-200">
          →
        </span>
      </a>

      {/* 3️⃣ Hugging Face */}
      <a
        target='_blank'
        href="https://huggingface.co/shunyalabs"
        className="group relative inline-flex items-center px-8 py-1 rounded-full
          border border-white/30
          text-white transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.6)]
          min-w-[260px] bg-[linear-gradient(90deg,#0F3685_0%,#424893_50%,#361D83_100%)]"
        id='hugging_face_button'
      >
        <div className="flex flex-col items-center justify-center w-full text-center">
          <span className="font-semibold text-md leading-tight">Hugging Face</span>
          <span className="text-xs text-gray-300">Open Models</span>
        </div>
        <span className="absolute right-5 text-xl group-hover:translate-x-1 transition-transform duration-200">
          →
        </span>
      </a>
    </div>
  );
};

export default HomePageButtons;
