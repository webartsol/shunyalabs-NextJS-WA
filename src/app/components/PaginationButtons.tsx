import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PaginationButtons({ currentPage, totalPages, onPrev, onNext }: any) {
  return (
    <div className="flex justify-center items-center gap-8 py-10">

      {/* LEFT BUTTON */}
      <button
        onClick={onPrev}
        disabled={currentPage === 1}
        className={`
          w-12 h-12 flex items-center justify-center rounded-full border transition-all duration-300 shadow-[0_0_0_3px_rgba(255,255,255,0.12)]
          
          ${
            currentPage > 1
              ? "bg-white border-[#dcdcdc] text-black hover:bg-gray-100" // move possible → WHITE
              : "bg-[#111] border-[#2a2a2a] text-gray-700 cursor-not-allowed" // disabled → DARK
          }
        `}
      >
        <ChevronLeft size={26} strokeWidth={2.5} />
      </button>

      {/* RIGHT BUTTON */}
      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className={`
          w-12 h-12 flex items-center justify-center rounded-full border transition-all duration-300 shadow-[0_0_0_3px_rgba(255,255,255,0.05)]
          
          ${
            currentPage < totalPages
              ? "bg-white border-[#dcdcdc] text-black hover:bg-gray-100" // move possible → WHITE
              : "bg-[#111] border-[#2a2a2a] text-gray-700 cursor-not-allowed" // disabled → DARK
          }
        `}
      >
        <ChevronRight size={26} strokeWidth={2.5} />
      </button>

    </div>
  );
}
