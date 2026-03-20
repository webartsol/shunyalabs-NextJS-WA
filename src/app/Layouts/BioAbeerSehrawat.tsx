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
              src="/assets/images/Author2.jpg"
              alt="Abeer Sehrawat"
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
            <p className="text-lg font-semibold text-white">Abeer Sehrawat</p>
            <p className="text-xs text-gray-400">
            Product Manager
            </p>
          </div>
        </div>

        {/* Bio Section */}
        <p className="text-gray-300 text-2sm leading-relaxed mb-2">
          <span className="font-semibold text-white">Bio: </span>
          Abeer Sehrawat is a Product Manager at Shunya Labs who owns the end-to-end user experience—making voice AI clear, 
          intuitive, and genuinely useful. She partners with design, research, and engineering to turn messy real-world scenarios into simple flows, 
          helpful defaults, and documentation that unblocks teams. Her focus: products that are easy to adopt (clean APIs, sensible UI), 
          fast to trust (accurate, low-latency), and respectful of context (privacy-first, deployable in cloud or on-prem).
        </p>

        <p className="text-gray-400 text-2sm leading-relaxed">
        Before Shunya Labs, she led high-visibility trust-and-safety operations and communications at Change.org during fast-moving global events, 
        then moved into sales and business development at startups, translating customer needs into product opportunities. 
        She holds a B.A. in Political Economy from UC Berkeley and Sciences Po.
        </p>
      </div>
    </div>
  );
};

export default AuthorBio;
