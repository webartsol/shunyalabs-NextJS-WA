// import React from 'react';

// interface WidgetHeaderProps {
//   selectedTab: string;
//   onTabChange: (tab: string) => void;
// }

// const headerTabs = [
//   {
//     id: 'speech-to-text',
//     label: 'Speech To Text',
//     icon: (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="20"
//         height="20"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         className="lucide lucide-languages"
//       >
//         <path d="m5 8 6 6" />
//         <path d="m4 14 6-6 2-3" />
//         <path d="M2 5h12" />
//         <path d="M7 2h1" />
//         <path d="m22 22-5-10-5 10" />
//         <path d="M14 18h6" />
//       </svg>
//     ),
//     description: 'Audio transcription to text',
//   },
//   {
//     id: 'medical-transcription',
//     label: 'Medical Transcription',
//     icon: (
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         width="20"
//         height="20"
//         viewBox="0 0 24 24"
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="2"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         className="lucide lucide-stethoscope"
//       >
//         <path d="M11 2v2" />
//         <path d="M5 2v2" />
//         <path d="M5 3H4a2 2 0 0 0-2 2v4a6 6 0 0 0 12 0V5a2 2 0 0 0-2-2h-1" />
//         <path d="M8 15a6 6 0 0 0 12 0v-3" />
//         <circle cx="20" cy="10" r="2" />
//       </svg>
//     ),
//     description: 'Medical audio transcription with specialized terminology',
//   },
// ];

// export const WidgetHeader: React.FC<WidgetHeaderProps> = ({ selectedTab, onTabChange }) => {
//   return (
//     <div className="max-w-[1300px] mx-auto pt-1">
//       <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
//         {headerTabs.map((tab) => (
//           <button
//             key={tab.id}
//             onClick={() => onTabChange(tab.id)}
//             title={tab.description}
//             className={`
//               flex-1 px-4 py-3 text-center transition-all duration-300 flex flex-col items-center justify-center
//               rounded-xl border-2 min-h-[80px] sm:min-h-[90px] shadow-sm backdrop-blur-md
//               ${selectedTab === tab.id
//                 ? 'bg-white text-black border-white shadow-lg scale-[1.02]'
//                 : 'glass-card border-white/20 text-white hover:scale-[1.02] hover:border-white/40 transition-all'
//               }
//             `}
//           >
//             <div className="flex flex-col items-center space-y-1">
//               {/* ICON */}
//               <div className={`${selectedTab === tab.id ? 'text-black' : 'text-white'}`}>
//                 {tab.icon}
//               </div>

//               {/* LABEL */}
//               <span
//                 className={`font-medium text-xs sm:text-sm leading-tight ${selectedTab === tab.id ? 'text-black' : 'text-white'
//                   }`}
//               >
//                 {tab.label}
//               </span>
//             </div>
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };
import React from 'react';

interface WidgetHeaderProps {
  selectedTab: string;
  onTabChange: (tab: string) => void;
}

const headerTabs = [
  {
    id: 'speech-to-text',
    btnId: "ASR_STT_button",
    label: 'Zero STT Indic',
    description: 'Audio transcription to text',
  },
  {
    id: 'zero-code-switch',
    btnId: "ASR_ZCS_button",
    label: 'Zero STT Codeswitch',
    description: 'Seamlessly transcribe mixed-language conversations',
  },
  {
    id: 'medical-transcription',
    btnId: "ASR_MT_button",
    label: 'Zero STT Med',
    description: 'Medical audio transcription with specialized terminology',
  },
  {
    id: 'text-to-speech',
    btnId: "TTS_button",
    label: 'Zero TTS Indic',
    description: 'Text to speech synthesis for Indic languages',
  },
  // {
  //   id: 'zero-code-switch',
  //   btnId: "ASR_ZCS_button",
  //   label: 'Codeswitch',
  //   icon: (
  //     <svg
  //       xmlns="http://www.w3.org/2000/svg"
  //       width="20"
  //       height="20"
  //       viewBox="0 0 24 24"
  //       fill="none"
  //       stroke="currentColor"
  //       strokeWidth="2"
  //       strokeLinecap="round"
  //       strokeLinejoin="round"
  //       className="lucide lucide-repeat"
  //     >
  //       <path d="m17 2 4 4-4 4" />
  //       <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
  //       <path d="m7 22-4-4 4-4" />
  //       <path d="M21 13v1a4 4 0 0 1-4 4H3" />
  //     </svg>
  //   ),
  //   description: 'Seamlessly transcribe mixed-language conversations',
  // },
];

export const WidgetHeader: React.FC<WidgetHeaderProps> = ({ selectedTab, onTabChange }) => {
  return (
    <div className="max-w-[1300px] mx-auto pt-1">
      <div className="w-full rounded-2xl sm:rounded-full bg-white/10 backdrop-blur-md p-1 sm:p-1.5 flex flex-wrap sm:flex-nowrap gap-1 sm:gap-2">
        {headerTabs.map((tab) => (
          <button
            key={tab.id}
            id={tab.btnId}
            onClick={() => onTabChange(tab.id)}
            title={tab.description}
            className={`
              flex-1 px-2 sm:px-4 lg:px-6 py-2 sm:py-3 text-center transition-all duration-300 rounded-xl sm:rounded-full font-semibold text-[11px] sm:text-sm lg:text-base
              ${selectedTab === tab.id
                ? 'bg-[#1e5eff] text-white shadow-lg'
                : 'text-white/70 hover:text-white hover:bg-white/10'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};