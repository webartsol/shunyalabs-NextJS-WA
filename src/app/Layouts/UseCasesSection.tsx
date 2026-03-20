import React from "react";

type UseCase = {
  icon: React.ReactNode;
  title: string;
  feature: string;
};

type UseCasesSectionProps = {
  title?: string;
  theme?: "blue" | "purple" | "teal" | "green";
  columns: {
    heading1: string;
    heading2: string;
  };
  cases: UseCase[];
};

export default function UseCasesSection({
  columns,
  cases,
}: UseCasesSectionProps) {
  // Theme gradients
  return (
    <section className="relative text-white md:py-20 py-10 product-bg2 overflow-hidden">
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-2xl md:text-4xl font-semibold mb-12 md:mb-20">Use Cases</h2>

        {/* Table Container */}
        <div className="overflow-hidden rounded-2xl backdrop-blur-xl shadow-lg border border-white/10">
          {/* Table Header */}
          <div className={`grid grid-cols-2 md:py-6 md:px-10 px-5 py-4 text-left md:text-md text-sm font-semibold bg-[#0F1128]`}>
            <span>{columns.heading1}</span>
            <span>{columns.heading2}</span>
          </div>

          {/* Rows */}
          {cases.map((useCase, idx) => (
            <div
              key={idx}
              className={`grid grid-cols-2 items-center px-6 py-5 text-left text-sm border-t border-white/5 bg-[#04050539] hover:bg-white/5 transition-all duration-300`}
            >
              {/* Left: Scenario */}
              <div className="flex items-center gap-3 ">
                <div
                  className={`md:w-12 w-10 md:h-12 h-10 flex items-center justify-center rounded-full bg-[#141734]`}
                >
                  {useCase.icon}
                </div>
                <span className="font-medium text-white text-[12px] md:text-[14px]">{useCase.title}</span>
              </div>

              {/* Right: Feature */}
              <span className="text-gray-300 text-[12px] md:text-[14px]">{useCase.feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
