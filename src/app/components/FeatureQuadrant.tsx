// import React from "react";

// interface RowItem {
//   leftTitle?: string;
//   leftText?: string;
//   rightTitle?: string;
//   rightText?: string;
// }

// interface FeatureQuadrantProps {
//   heading: string;
//   subheading: string;
//   rows: RowItem[];
// }

// export default function FeatureQuadrant({
//   heading,
//   subheading,
//   rows,
// }: FeatureQuadrantProps) {
//   return (
//     <div className="w-full mt-24">
//       <div className="max-w-6xl mx-auto px-6 relative">

//         {/* Heading */}
//         <h2 className="text-center text-white font-semibold text-3xl md:text-4xl">
//           {heading}
//         </h2>
//         <p className="text-center text-gray-400 text-base md:text-lg mt-2 mb-10 whitespace-pre-line">
//           {subheading}
//         </p>

//         {/* GRID */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-y-20 relative">

//           {/* Horizontal Dividers (Only on Desktop) */}
//           <div className="hidden md:block absolute left-0 right-0 top-[140px] h-px bg-gradient-to-r from-black via-white to-black opacity-30"></div>
//           <div className="hidden md:block absolute left-0 right-0 top-[310px] h-px bg-gradient-to-r from-black via-white to-black opacity-30"></div>

//           {/* Render Rows */}
//           {rows.map((row, i) => (
//             <React.Fragment key={i}>
              
//               {/* LEFT COLUMN */}
//               <div className="md:pr-16 flex flex-col md:items-center">
//                 {row.leftTitle && (
//                   <h3 className="text-[28px] md:text-[40px] font-semibold mb-3 bg-gradient-to-b from-blue-700 to-purple-400 bg-clip-text text-transparent">
//                     {row.leftTitle}
//                   </h3>
//                 )}
//                 {row.leftText && (
//                   <p className="text-gray-300 text-[16px] md:text-[18px] leading-relaxed">
//                     {row.leftText}
//                   </p>
//                 )}
//               </div>

//               {/* RIGHT COLUMN */}
//               <div className="md:pl-16 flex flex-col md:items-center mt-10 md:mt-0">
//                 {row.rightTitle && (
//                   <h3 className="text-[28px] md:text-[40px] font-semibold mb-3 bg-gradient-to-b from-blue-700 to-purple-400 bg-clip-text text-transparent">
//                     {row.rightTitle}
//                   </h3>
//                 )}
//                 {row.rightText && (
//                   <p className="text-gray-300 text-[16px] md:text-[18px] leading-relaxed">
//                     {row.rightText}
//                   </p>
//                 )}
//               </div>

//             </React.Fragment>
//           ))}

//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";

interface RowItem {
  title: string;
  desc: string;
}

interface FeatureQuadrantProps {
  heading: string;
  subheading?: string;
  rows: RowItem[];
}

export default function FeatureQuadrant({
  heading,
  subheading,
  rows,
}: FeatureQuadrantProps) {
  return (
    <div className="w-full mt-24">
      <div className="max-w-6xl mx-auto px-6 relative">

        {/* Heading */}
        <h2 className="text-center text-white font-semibold text-3xl md:text-4xl mb-12">
          {heading}
        </h2>

        {/* Rows Container */}
        <div className="flex flex-col">

          {rows.map((row, index) => {
            const isEvenRow = index % 2 === 0;
            const isLastRow = index === rows.length - 1;

            return (
              <React.Fragment key={index}>

                {/* Mobile Layout - Title upar, Desc niche */}
                <div className="md:hidden flex flex-col gap-4 py-8">
                  <h3 className="text-[28px] font-semibold 
                    bg-gradient-to-r from-[#8B5CF6] to-[#6366F1]
                    bg-clip-text text-transparent">
                    {row.title}
                  </h3>
                  <p className="text-gray-300 text-[16px] leading-relaxed">
                    {row.desc}
                  </p>
                </div>

                {/* Desktop Layout - Alternating sides */}
                <div className="hidden md:grid grid-cols-2 py-16">

                  {/* LEFT SIDE */}
                  <div className="pr-16 flex items-center">
                    {isEvenRow ? (
                      <p className="text-gray-300 text-[18px] leading-relaxed">
                        {row.desc}
                      </p>
                    ) : (
                      <h3 className="text-[32px] md:text-[42px] font-semibold 
                        bg-gradient-to-r from-[#8B5CF6] to-[#6366F1]
                        bg-clip-text text-transparent whitespace-pre-line">
                        {row.title}
                      </h3>
                    )}
                  </div>

                  {/* RIGHT SIDE */}
                  <div className="pl-16 flex items-center">
                    {isEvenRow ? (
                      <h3 className="text-[32px] md:text-[42px] font-semibold 
                        bg-gradient-to-r from-[#8B5CF6] to-[#6366F1]
                        bg-clip-text text-transparent whitespace-pre-line">
                        {row.title}
                      </h3>
                    ) : (
                      <p className="text-gray-300 text-[18px] leading-relaxed">
                        {row.desc}
                      </p>
                    )}
                  </div>

                </div>

                {/* Ray Line - Center se fade out dono taraf */}
                {!isLastRow && (
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                )}

              </React.Fragment>
            );
          })}

        </div>
      </div>
    </div>
  );
}