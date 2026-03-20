import Image from "next/image";
import React from "react";

const AuthorBio = () => {
  return (
    <div className="mb-0 mt-8">
      <div className="bg-[#232328] p-5 rounded-xl border border-gray-700">
        
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-4">
          {/* Circular Image */}
          <div className="flex items-center justify-center w-[50px] h-[50px] rounded-full overflow-hidden border border-gray-600 flex-shrink-0">
            <Image
              src="/assets/images/RituMehrotra.jpg"
              alt="Ritu Mehrotra"
              className="object-cover w-full h-full"
              width={56}
              height={56}
              quality={100}
              loading="lazy"
            />
          </div>

          {/* Divider */}
          <div className="text-4xl font-light mb-2">|</div>

          {/* Name and Role */}
          <div>
            <p className="text-lg font-semibold text-white">Ritu Mehrotra</p>
            <p className="text-xs text-gray-400">Founder & CEO | Shunya Labs | & United We care</p>
          </div>
        </div>

        {/* Bio Section */}
        <p className="text-gray-300 text-2sm leading-relaxed mb-2">
          <span className="font-semibold text-white">Bio: </span>
          Ritu Mehrotra is the Founder and CEO of Shunya Labs, a deeptech
          company building voice infrastructure to democratize AI across
          languages and geographies. With over twenty years of experience in
          technology and business leadership, Ritu has contributed to the growth
          of global companies across travel, wellness, and AI sectors, bringing
          deep expertise in scaling products that serve diverse markets.
        </p>

        <p className="text-gray-300 text-2sm leading-relaxed mb-2">
          Her professional journey spans key roles at Booking.com, Zomato, and
          Mahindra Bristlecone, overseeing product expansion, localization,
          and cross-continental partnerships. At Shunya Labs, Ritu leads the
          development of multilingual, privacy-first AI speech solutions
          designed to be affordable, accurate, and locally deployable-making
          advanced voice technology accessible to enterprises globally.
        </p>

        <p className="text-gray-300 text-2sm leading-relaxed mb-2">
          Ritu's approach to AI is shaped by her academic background-including
          a Master's in International Business from the Indian Institute of
          Foreign Trade and advanced leadership coursework at Harvard Business
          School-as well as her experience as the founder of United We Care,
          a mental health technology platform. Through this interdisciplinary
          perspective, she advocates for the responsible and inclusive use of AI
          across industries.
        </p>

        <p className="text-gray-300 text-2sm leading-relaxed mb-4">
          A frequent speaker at industry forums, Ritu brings attention to the
          intersection of technology, mental health, and social equity. Her work
          centers on building AI infrastructure that is trustworthy, culturally
          relevant, and designed for real-world deployment across emerging
          markets.
        </p>

        {/* LinkedIn Link (bottom) */}
        <div className="mt-5 pt-4 border-t border-gray-700 flex items-center">
          <a
            href="https://www.linkedin.com/in/ritu-mehrotra-4861043/" // <-- change this if needed
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-300 hover:text-[#4FA7FF] transition-colors"
          >
            {/* LinkedIn Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-5 h-5"
            >
              <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.98H4.5V23H.5V8.98zM8.5 8.98H12.22V10.7H12.28C12.78 9.84 13.84 8.86 15.5 8.86 19.04 8.86 19.5 11.18 19.5 14.22V23H15.5V15.22C15.5 13.62 15.47 11.62 13.5 11.62 11.5 11.62 11.22 13.34 11.22 15.12V23H7.22L7.18 8.98H8.5z" />
            </svg>

            <span className="text-sm">Connect on LinkedIn</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AuthorBio;
