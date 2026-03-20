import React from "react";
import Link from "next/link";


interface RowItem {
  leftTitle?: string;
  leftHeading?: string;
  leftText?: string;
  rightTitle?: string;
  rightHeading?: string;
  rightText?: string;
  learnmoreLeft?: string;
  learnmoreRight?: string;
  link?: string;
}

interface FeatureQuadrantProps {
  heading: string;
  subheading: string;
  rows: RowItem[]; // exactly 3 rows
}

export default function FeatureQuadrant({ heading, subheading, rows }: FeatureQuadrantProps) {
  return (
    <div className="w-full py-20">

      <div className="max-w-6xl mx-auto px-14 relative">

        {/* Heading */}
        <h2 className="text-center text-white font-semibold text-2xl">
          {heading}
        </h2>
        <p className="text-center text-gray-400 text-lg mt-2 mb-16">
          {subheading}
        </p>

        {/* GRID WITH EQUAL HEIGHT ROWS */}
        <div
          className="
            relative
            grid grid-cols-2 auto-rows-[220px] gap-y-0"
        >
          {/* Horizontal line 1 */}
          <div className="absolute left-0 right-0 top-[220px] border-t border-white/20"></div>
          {/* Horizontal line 2 */}
          <div className="absolute left-0 right-0 top-[440px] border-t border-white/20"></div>

          {rows.map((row, i) => (
            <React.Fragment key={i}>
              {/* Left cell */}
              <div className="pr-20 flex flex-col justify-center">
                {row.leftTitle && (
                  <div className="flex justify-center">
                    <h3
                      className="font-semibold text-3xl text-center w-[200px]
             bg-gradient-to-b from-blue-400 to-purple-500
             bg-clip-text text-transparent"
                    >
                      {row.leftTitle}
                    </h3>

                  </div>
                )}
                {row.leftHeading && (
                  <h2 className="text-white leading-relaxed text-2xl font-semibold whitespace-pre-line mb-3 mt-5">
                    {row.leftHeading}
                  </h2>
                )}
                {row.leftText && (
                  <p className="text-gray-300 leading-relaxed text-lg whitespace-pre-line">
                    {row.leftText}
                  </p>
                )}
              </div>

              {/* Right cell */}
              <div className="pl-20 flex flex-col justify-center">
                {row.rightTitle && (
                  <div className="flex justify-center">
                    <h3
                      className="font-semibold text-3xl text-center w-[200px]
             bg-gradient-to-b from-blue-400 to-purple-500
             bg-clip-text text-transparent"
                    >
                      {row.rightTitle}
                    </h3>
                  </div>
                )}
                {row.rightHeading && (
                  <h2 className="text-white leading-relaxed text-2xl font-semibold whitespace-pre-line mb-3">
                    {row.rightHeading}
                  </h2>
                )}
                {row.rightText && (
                  <p className="text-gray-300 leading-relaxed text-lg whitespace-pre-line">
                    {row.rightText}
                  </p>
                )}
              </div>
            </React.Fragment>
          ))}

        </div>

      </div>
    </div>
  );
}