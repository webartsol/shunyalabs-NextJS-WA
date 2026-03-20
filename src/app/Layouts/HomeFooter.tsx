import Link from "next/link";


export default function HomeFooter() {
  return (
    <footer className="relative bg-gradient-to-r from-[#001f4d] via-[#0a1f3d] to-[#1a0f3a] py-16 text-center text-white overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0">
        <div className="absolute left-[20%] top-[40%] w-48 h-48 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute right-[20%] bottom-[30%] w-48 h-48 bg-purple-700/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        {/* Title */}
        <p className="text-xl md:text-3xl font-semibold mb-3">
          The fastest way to add voice AI to your products
        </p>

        {/* Subtitle */}
        <p className="text-md md:text-[18px] text-gray-300 mb-8">
          One platform for speech in and speech out—secure by design, built to scale.
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
        <Link
  href="/pricing"
  className="inline-flex items-center justify-center md:px-6 md:py-3 px-5 py-2 bg-white text-black font-medium rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
  style={{ minWidth: '48px', minHeight: '48px' }}
  aria-label="Go to Pricing page"
>
  Get Started
</Link>

<Link
  href="/contact"
  className="inline-flex items-center justify-center md:px-6 md:py-3 px-5 py-2 border border-gray-400 text-white rounded-full hover:border-blue-500 hover:text-blue-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
  style={{ minWidth: '48px', minHeight: '48px' }}
  aria-label="Contact Sales"
>
  Contact Sales
</Link>

        </div>
      </div>
    </footer>
  );
}
