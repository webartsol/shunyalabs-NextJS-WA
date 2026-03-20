"use client";
import Image from "next/image";
import Link from "next/link";
import { DOCS_URL } from "../utils/constants";
import { FaLinkedinIn, FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
import logo from "../../../assets/icons/sl-logo.png";

export default function MainFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0B0B0F] text-gray-300 py-12 px-6 md:px-16 border-t border-gray-800">

      {/* ========================================================= */}
      {/* ========== SECTION 1: MAIN TOP LINK GROUP =============== */}
      {/* ========================================================= */}

      <div className="md:pl-12 max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-8 gap-12 mb-12">

        <div className="">
          <Image src={logo} alt="Shunya Labs" width={160} height={40} />
          <p className="text-gray-400 text-sm">Shunya Labs, Inc.</p>
        </div>

        {/* Product */}
        <div>
          <p className="font-semibold text-white mb-3">Product</p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/overview">Overview</Link></li>
            <li><Link href="/models-page">Models</Link></li>
            <li><Link href="/voice-agent">Voice Agents</Link></li>
            <li><Link href="/speech-intelligence-page">Speech Intelligence</Link></li>
            <li><Link href="/audio-processing">Audio Processing</Link></li>
            <li><Link href="/deployment">Deployment</Link></li>
          </ul>
        </div>

        {/* Models */}
        <div>
          <p className="font-semibold text-white mb-3">Models</p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li className="font-medium text-gray-300"><Link href='/language-models'>Language Models</Link></li>
            <li><Link href="/zero-indic">Zero STT Indic</Link></li>
            <li><Link href="/zero-code-switch">Zero STT Codeswitch</Link></li>
            {/* <li><Link href="/zero-stt">Zero STT Universal</Link></li> */}

            <li className="font-medium text-gray-300 mt-4"><Link href='/domain-specialisation'>Specialised Models</Link></li>
            <li><Link href="/zero-med">Zero STT Med</Link></li>

            <li className="font-medium text-gray-300 mt-4"><Link href='/on-device-models'>On Device Models</Link></li>
          </ul>
        </div>

        {/* Solutions */}
        <div>
          <p className="font-semibold text-white mb-3">Solutions</p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/contact-centers">Contact Centers</Link></li>
            <li><Link href="/media-entertainment">Media & Entertainment</Link></li>
            <li><Link href="/healthcare">Healthcare</Link></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <p className="font-semibold text-white mb-3">Resources</p>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><Link href="/blog">Blogs</Link></li>
            <li><Link href="/benchmarks">Benchmarks</Link></li>
            <li><Link href="/media">News & Media</Link></li>
            <li><Link href="/patents">Patents</Link></li>
            <li><Link href="/research">Research</Link></li>
          </ul>
        </div>

        {/* Documentation */}
        <div>
          <p className="font-semibold text-white mb-3">
            <Link
              href={`${DOCS_URL}/overview`} target="_blank" rel="noopener noreferrer"
            >
              Documentation
            </Link>
          </p>
        </div>

        {/* About + Pricing */}
        <div>
          <ul className="space-y-2 text-sm md:ms-10">
            <li><Link href="/about" className="font-semibold text-white">About us</Link></li>
          </ul>
        </div>

        <div>
          <ul className="space-y-2 text-sm">
            <li><Link href="/pricing" className="font-semibold text-white">Pricing</Link></li>
          </ul>
        </div>
      </div>

      <div className="text-center mb-5">
        <p className="font-bold text-lg text-gray-400 mb-3">Follow us on</p>
        {/* RIGHT → SOCIAL ICONS */}
        <div className="flex justify-center items-center gap-4">
          <Link href="https://www.linkedin.com/company/shunya-labs-ai/" target="_blank"
            className="p-2 bg-[#CB8EFF] text-[#000000] hover:bg-[#2d2d2d] hover:text-[#CB8EFF] rounded-full transition">
            <FaLinkedinIn size={18} />
          </Link>
          <Link href="https://www.facebook.com/people/ShunyaLabsAI/61577801851308/" target="_blank"
            className="p-2 bg-[#CB8EFF] text-[#000000] hover:bg-[#2d2d2d] hover:text-[#CB8EFF] rounded-full transition">
            <FaFacebookF size={18} />
          </Link>
          <Link href="https://www.instagram.com/shunyalabsai/" target="_blank"
            className="p-2 bg-[#CB8EFF] text-[#000000] hover:bg-[#2d2d2d] hover:text-[#CB8EFF] rounded-full transition">
            <FaInstagram size={18} />
          </Link>
          <Link href="https://x.com/ShunyaLabsAI" target="_blank"
            className="p-2 bg-[#CB8EFF] text-[#000000] hover:bg-[#2d2d2d] hover:text-[#CB8EFF] rounded-full transition">
            <FaXTwitter size={18} />
          </Link>
        </div>
      </div>


      {/* ========================================================= */}
      {/* ========== SECTION 3: COPYRIGHT + LEGAL LINKS =========== */}
      {/* ========================================================= */}

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center pt-6 border-t border-gray-800">

        {/* LEFT → COPYRIGHT */}
        <p className="text-center md:text-left text-sm text-gray-400 mb-4 md:mb-0">
          © {currentYear} Shunya Labs Inc. All rights reserved.
        </p>

        {/* RIGHT → LEGAL LINKS */}
        <div className="flex justify-center md:justify-end gap-6 text-sm text-gray-300">
          <Link href="/privacy-policy">Privacy</Link>
          <Link href="/terms-conditions">Terms</Link>
          <Link href="/security-policy">Security</Link>
          <Link href="/general-rail-m-license">General License</Link>
          <Link href="/shunya-labs-custom-model-rail-m-license">Custom License</Link>
        </div>
      </div>

    </footer>
  );
}
