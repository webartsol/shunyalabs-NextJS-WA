'use client';
import Image from 'next/image';
import React from 'react';

type LatestBlogProps = {
  logo: any;
  title: string;
  description: string;
  link?: string;
  date: string;
  category?: string;
  author?: string;
};

const LatestBlog: React.FC<LatestBlogProps> = ({
  logo,
  title,
  description,
  link,
  date,
  category = "Product",
  author = "",
}) => {
  return (
    <a
      href={link || '#'}
      className="block w-full cursor-pointer transition-all duration-500"
    >
      {/* TOP LARGE BANNER */}
      <div className="relative w-full aspect-[16/6] md:aspect-[16/6] rounded-3xl overflow-hidden mb-4">
        <Image
          src={logo}
          alt="Blog Banner"
          fill
          className="object-cover"
          priority={false}
        />
      </div>

      {/* CATEGORY + DATE BELOW IMAGE */}
      <div className="flex items-center justify-between mb-8 px-2 md:px-4">
        {/* <span className="bg-white text-black text-sm px-5 py-2 rounded-full shadow-md">
          {category}
        </span> */}

        <span className="text-gray-300 text-sm">
          {date}
        </span>
      </div>

      {/* TITLE */}
      <h2 className="text-center text-2xl md:text-3xl font-semibold text-white mb-4 px-6">
        {title}
      </h2>

      {/* DESCRIPTION */}
      <p className="text-center text-gray-400 text-base md:text-lg mx-auto leading-relaxed mb-6">
        {description}
      </p>

      {/* CATEGORY */}
      <div className='flex justify-center mb-4'>
        <span className="text-sm bg-black/60 px-3 py-1 rounded-full text-gray-300 border border-gray-700">
          {category}
        </span>
      </div>

      {/* AUTHOR */}
      <p className="text-center text-gray-400 font-medium">{author}</p>
    </a>
  );
};

export default LatestBlog;
