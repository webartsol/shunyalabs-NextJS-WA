'use client';
import Image, { StaticImageData } from 'next/image';
import React from 'react';
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

type LatestMediaProps = {
  logo: StaticImageData;
  title: string;
  description: string;
  link?: string;
  date?: string;
};

const LatestMedia: React.FC<LatestMediaProps> = ({ logo, title, description, link, date }:any) => {
  return (
    <a
      href={link || '#'}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block rounded-2xl transition-all duration-700 cursor-pointer"
    >

      {/* Inner content */}
      <div
        className="relative items-center gap-6 
  bg-black/40 backdrop-blur-sm border border-gray-700 rounded-2xl 
  px-8 py-8 transition-all duration-500 hover:shadow-[0_0_50px_#7B61FFaa]"
      >
        {/* Logo */}
        <div className="flex-shrink-0 w-[320px] h-[200px] bg-white flex items-center justify-center overflow-hidden rounded-xl mb-3">
          <Image
            width={600}
            height={400}
            src={logo}
            alt="Media Logo"
            className="object-cover"
            loading="lazy"
          />
        </div>

        {/* Date */}
        {date && (
          <p className="text-gray-400 text-sm mb-1">
          {date}
          </p>
        )}

        {/* Text content */}
        <div className="text-center md:text-left flex-1">
          <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
            {title}
          </h3>
          <p className="text-gray-400 text-sm md:text-[0.95rem] leading-relaxed">
            {description}
          </p>
          <button className="md:mt-10 mt-5 flex items-center justify-center mx-auto gap-2 text-white font-medium px-6 py-2 rounded-full bg-gradient-to-r from-[#9333EA] to-[#412081] hover:opacity-90 shadow-[0_4px_20px_rgba(168,85,247,0.2)] transition-all duration-300">
                              Read Full Article
                              <FaArrowUpRightFromSquare style={{fontSize:"15px",marginTop:"2px"}}/>
                            </button>
        </div>
      </div>

    </a>
  );
};

export default LatestMedia;
