import React from "react";

interface RowItem {
  leftTitle?: string;
  leftText?: string;
  rightTitle?: string;
  rightText?: string;
}

interface FeatureQuadrantProps {
  heading: string;
  subheading: string;
  rows: RowItem[]; // exactly 3 rows
}

export default function FeatureQuadrant3({
  heading,
  subheading,
  rows,
}: FeatureQuadrantProps) {
  return (
    <div className="w-full mt-24">
      <div className="max-w-5xl mx-auto px-6 relative">

        {/* Heading */}
        <h2 className="text-center text-white font-semibold text-3xl md:text-4xl mb-16">
          {heading}
        </h2>

        {/* ========================================================= */}
        {/* MOBILE VERSION (simple vertical UI like screenshot)       */}
        {/* ========================================================= */}
        <div className="md:hidden space-y-14">
          {rows.map((row, i) => (
            <div key={i} className="space-y-3">

              {/* LEFT TITLE */}
              {row.leftTitle && (
                <h3 className="text-[26px] font-semibold bg-gradient-to-b from-blue-700 to-purple-400 bg-clip-text text-transparent">
                  {row.leftTitle}
                </h3>
              )}

              {/* LEFT TEXT */}
              {row.leftText && (
                <p className="text-gray-300 text-[16px] leading-relaxed">
                  {row.leftText}
                </p>
              )}

              {/* RIGHT TITLE */}
              {row.rightTitle && (
                <h3 className="text-[26px] font-semibold bg-gradient-to-b from-blue-700 to-purple-400 bg-clip-text text-transparent">
                  {row.rightTitle}
                </h3>
              )}

              {/* RIGHT TEXT */}
              {row.rightText && (
                <p className="text-gray-300 text-[16px] leading-relaxed">
                  {row.rightText}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* ========================================================= */}
        {/* DESKTOP VERSION (original 2-column quadrant layout)       */}
        {/* ========================================================= */}
        <div className="hidden md:grid grid-cols-2 gap-y-20 relative">

          {/* Horizontal Dividers */}
          <div className="absolute left-0 right-0 top-[120px] h-px bg-gradient-to-r from-black via-white to-black opacity-30"></div>
          <div className="absolute left-0 right-0 top-[255px] h-px bg-gradient-to-r from-black via-white to-black opacity-30"></div>

          {rows.map((row, i) => (
            <React.Fragment key={i}>

              {/* LEFT COLUMN */}
              <div className="pr-16 flex flex-col justify-center items-start">
                {row.leftTitle && (
                  <h3 className="text-[40px] font-semibold mb-2 bg-gradient-to-b from-blue-700 to-purple-400 bg-clip-text text-transparent w-60">
                    {row.leftTitle}
                  </h3>
                )}
                {row.leftText && (
                  <p className="text-gray-300 text-[18px] leading-relaxed">
                    {row.leftText}
                  </p>
                )}
              </div>

              {/* RIGHT COLUMN */}
              <div className="pl-16 flex flex-col justify-center items-end">
                {row.rightTitle && (
                  <h3 className="text-[40px] font-semibold mb-2 text-end bg-gradient-to-b from-blue-700 to-purple-400 bg-clip-text text-transparent w-60">
                    {row.rightTitle}
                  </h3>
                )}
                {row.rightText && (
                  <p className="text-gray-300 text-[18px] text-right leading-relaxed">
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
