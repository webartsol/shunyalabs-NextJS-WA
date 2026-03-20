'use client';
import Image, { StaticImageData } from 'next/image';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

type FeaturePoint = {
  heading: string;
  description: string;
};

type FeatureCardProps = {
  title: string;
  image: StaticImageData;
  points: FeaturePoint[];
  buttonText?: string;
  imagePosition?: 'left' | 'right';
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  image,
  points,
  buttonText = 'Try Now',
  imagePosition = 'right',
}) => {
  const isImageLeft = imagePosition === 'left';
  const router = useRouter();

  // ✅ First point active by default
  const [activeIndex, setActiveIndex] = useState(0);

  const goToContact = () => {
    router.push('/contact'); // ✅ navigate to /contact
  };

  return (
    <div className="relative group rounded-2xl p-[2px] transition-all duration-700">
      {/* Card inner container */}
      <div
        className="relative bg-[#0E111A]/50 backdrop-blur-sm border border-gray-700 rounded-2xl 
        p-6 text-center hover:shadow-[0_0_50px_#7B61FFaa] md:text-left md:p-20 transition-all duration-700 group-hover:border-transparent"
      >
        {/* Title */}
        <div className="text-center md:mb-16 mb-6">
          <h2 className="text-xl md:text-[1.65rem] font-semibold leading-snug text-white">
            {title}
          </h2>
        </div>

        {/* Main Grid */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* ✅ Text Section */}
          <div
            className={`text-white ${
              isImageLeft ? 'md:order-2 md:pl-10' : 'md:order-1 md:pr-10'
            } order-2`}
          >
            <div className="relative md:pl-6">
              <div className="md:space-y-6 space-y-4">
                {points.map((point, idx) => {
                  const isActive = activeIndex === idx;

                  return (
                    <div
                      key={idx}
                      onMouseEnter={() => setActiveIndex(idx)} // highlight hovered point
                      onMouseLeave={() => setActiveIndex(0)} // revert to first on leave
                      className={`ps-4 cursor-pointer border-l-4 transition-all duration-700 
                        ${
                          isActive
                            ? 'text-white border-purple-400'
                            : 'text-gray-500 border-transparent hover:text-white hover:border-purple-400'
                        }`}
                    >
                      <h3 className="text-base md:text-lg font-semibold mb-1">
                        {point.heading}
                      </h3>
                      <p className="text-sm md:text-[0.95rem] leading-relaxed">
                        {point.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Button */}
            {buttonText && (
              <button
                onClick={goToContact}
                className="bg-white text-black hover:bg-[#2E6BFF] hover:text-white md:mt-10 mt-5 md:ms-5 px-6 py-2.5 rounded-full text-[0.95rem] font-medium transition-all duration-300 shadow-sm"
              >
                {buttonText}
              </button>
            )}
          </div>

          {/* ✅ Image Section */}
          <div
            className={`w-full flex ${
              isImageLeft
                ? 'justify-start md:order-1'
                : 'justify-end md:order-2'
            } order-1`}
          >
            <div className="w-full md:w-[90%] h-[200px] sm:h-[240px] md:h-[380px] md:rounded-xl rounded-base overflow-hidden">
              <Image
                src={image}
                alt={title}
                className="w-full h-full object-cover rounded-xl"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
