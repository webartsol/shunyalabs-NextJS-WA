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
              src="/assets/images/dummy-avatar.jpg"
              alt="Navvya Jain"
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
            <p className="text-lg font-semibold text-white">Navvya Jain</p>
            <p className="text-xs text-gray-400">
              Research & Product Analyst, Shunya Labs
            </p>
          </div>
        </div>

        {/* Bio Section */}
        <p className="text-gray-300 text-2sm leading-relaxed mb-2">
          <span className="font-semibold text-white">Bio: </span>
          Navvya works at the intersection of product strategy and applied AI research at Shunya Labs. With a background in human behaviour and communication, she writes about the people, markets, and technology behind voice AI, with a particular focus on how speech interfaces are reshaping access across emerging markets.
        </p>

        {/* <p className="text-gray-400 text-2sm leading-relaxed">
          She focuses on understanding how people interact with voice
          interfaces and how AI systems can be designed to work reliably across
          real-world environments. Her research explores the technology,
          markets, and infrastructure shaping the future of conversational AI,
          with a particular focus on Indic languages and emerging digital
          ecosystems.
        </p> */}
      </div>
    </div>
  );
};

export default AuthorBio;