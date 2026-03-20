"use client";
import Link from "next/link";
import { DOCS_URL } from "../utils/constants";
import { useEffect, useState, useRef } from "react";
import { FiChevronDown, FiArrowUp, FiPlay } from "react-icons/fi";
import logo from "../../../assets/icons/sl-logo.png";
import { IoChevronForward } from "react-icons/io5";
// import { SignInButton, UserButton, useUser, useClerk } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import HomePageBanner from "../components/HomePageBanner";

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const navbarRef = useRef<HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // const { isSignedIn, isLoaded, user } = useUser();
  const isSignedIn = false;
  const isLoaded = true;
  const user: any = null;

  // const { signOut } = useClerk();
  const signOut = () => { };
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // 🆕 which section on the right side is active in Models dropdown
  const [hoveredModelMenu, setHoveredModelMenu] = useState<"indic" | "specialised" | "device" | "translation">("indic");


  // ✅ Close dropdowns only when clicking outside (desktop only)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Skip this logic entirely for mobile
      if (window.innerWidth < 768) return;

      // Skip when mobile dropdowns are open
      if (openDropdown === "mobile" || openDropdown?.endsWith("-m")) return;

      // Close if the click is outside navbar
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
        setUserMenuOpen(false);
      }
    };

    // ✅ Use capturing phase to ensure React state updates first
    document.addEventListener("click", handleClickOutside, true);
    return () =>
      document.removeEventListener("click", handleClickOutside, true);
  }, [openDropdown]);

  const [isScrolled, setIsScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // shrink + background toggle
      setIsScrolled(currentScrollY > 20);

      // slide effect (optional: hide when scrolling down, show when scrolling up)
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Dropdown style with correct z-index
  const dropdownClass = (isOpen: boolean) =>
    `absolute z-[99999] top-full left-0 mt-2 w-[200px] bg-[#111] border border-gray-700 
     rounded-md shadow-lg pointer-events-auto transform transition-all duration-300 ease-out origin-top ${isOpen
      ? "opacity-100 translate-y-0 scale-100 visible"
      : "opacity-0 -translate-y-2 scale-95 invisible"
    }`;

  return (
    <>
      <HomePageBanner />
      <nav
        ref={navbarRef}
        className={`fixed z-[999999] w-full left-0 right-0 transition-all duration-500 ease-in-out
            ${isScrolled
            ? `backdrop-blur-md h-[65px] md:h-[75px] bg-black/70 shadow-lg py-0 top-0`
            : `bg-[#ffffff00] h-[90px] md:h-[107px] py-4 ${isHomePage ? "top-[40px] md:top-[60px]" : "top-0"}`
          }
            `}
      >
        {/* ✅ Transparent backdrop (disabled for mobile) */}
        {openDropdown &&
          openDropdown !== "mobile" &&
          !openDropdown.endsWith("-m") && (
            <button
              aria-label="dropdown backdrop"
              className="fixed inset-0 z-[99997] bg-transparent cursor-default"
              onClick={() => setOpenDropdown(null)}
            />
          )}

        <div className="max-w-[1330px] mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img
              src={logo.src}
              alt="Shunya Labs Logo"
              className="w-[130px] md:w-[160px]"
              loading="lazy"
            />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6 text-gray-300 text-sm font-medium relative">

            {/* PRODUCT DROPDOWN (Same style as Solutions / Resources) */}
            <div className="relative">
              <button
                onClick={() =>
                  setOpenDropdown(openDropdown === "product" ? null : "product")
                }
                className="flex items-center gap-1 hover:text-white transition"
              >
                Product
                <FiChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${openDropdown === "product" ? "rotate-180" : ""
                    }`}
                />
              </button>

              {/* DROPDOWN */}
              <div
                className={`
    absolute top-full left-0 mt-3 w-[800px]
    rounded-2xl bg-[#0B0C10]/95 backdrop-blur-xl
    border border-white/10 shadow-[0_10px_45px_rgba(0,0,0,0.8)]
    transition-all duration-300 origin-top z-[99999] overflow-hidden
    ${openDropdown === "product"
                    ? "opacity-100 scale-100 visible"
                    : "opacity-0 scale-95 invisible"
                  }
  `}
              >
                <div className="p-6">

                  {/* 2 COLUMNS */}
                  <div className="grid grid-cols-2 gap-6">

                    {/* COLUMN 1 */}
                    <div className="space-y-4">

                      <Link
                        href="/overview"
                        className="block p-3 rounded-xl border border-transparent
          hover:border-white/10 hover:bg-white/10 hover:backdrop-blur-xl
          hover:shadow-lg transition-all duration-300"
                      >
                        <div className="text-white font-semibold text-sm">Overview</div>
                        <div className="text-gray-400 text-xs mt-1">
                          High-level view of the Shunya Labs AI ecosystem
                        </div>
                      </Link>

                      <Link
                        href="/models-page"
                        className="block p-3 rounded-xl border border-transparent
          hover:border-white/10 hover:bg-white/10 hover:backdrop-blur-xl
          hover:shadow-lg transition-all duration-300"
                      >
                        <div className="text-white font-semibold text-sm">Models</div>
                        <div className="text-gray-400 text-xs mt-1">
                          Explore detailed specifications of our AI models
                        </div>
                      </Link>

                      <Link
                        href="/voice-agent"
                        className="block p-3 rounded-xl border border-transparent
          hover:border-white/10 hover:bg-white/10 hover:backdrop-blur-xl
          hover:shadow-lg transition-all duration-300"
                      >
                        <div className="text-white font-semibold text-sm">Voice Agent</div>
                        <div className="text-gray-400 text-xs mt-1">
                          Build intelligent conversational voice assistant workflows
                        </div>
                      </Link>

                    </div>

                    {/* COLUMN 2 */}
                    <div className="space-y-4">

                      <Link
                        href="/speech-intelligence-page"
                        className="block p-3 rounded-xl border border-transparent
          hover:border-white/10 hover:bg-white/10 hover:backdrop-blur-xl
          hover:shadow-lg transition-all duration-300"
                      >
                        <div className="text-white font-semibold text-sm">
                          Speech Intelligence
                        </div>
                        <div className="text-gray-400 text-xs mt-1">
                          Tools for speech analytics, insights, and automation
                        </div>
                      </Link>

                      <Link
                        href="/audio-processing"
                        className="block p-3 rounded-xl border border-transparent
          hover:border-white/10 hover:bg-white/10 hover:backdrop-blur-xl
          hover:shadow-lg transition-all duration-300"
                      >
                        <div className="text-white font-semibold text-sm">Audio Processing</div>
                        <div className="text-gray-400 text-xs mt-1">
                          Enhancements, denoising, segmentation & signal processing
                        </div>
                      </Link>

                      <Link
                        href="/deployment"
                        className="block p-3 rounded-xl border border-transparent
          hover:border-white/10 hover:bg-white/10 hover:backdrop-blur-xl
          hover:shadow-lg transition-all duration-300"
                      >
                        <div className="text-white font-semibold text-sm">Deployment</div>
                        <div className="text-gray-400 text-xs mt-1">
                          Deploy models on cloud, on-prem, or edge infrastructure
                        </div>
                      </Link>

                    </div>

                  </div>
                </div>
              </div>

            </div>

            {/* Models Dropdown (Multilevel) */}
            {/* MODELS — Glassmorphic Speechmatics-style Mega Dropdown */}
            <div className="relative">
              <button
                onClick={() =>
                  setOpenDropdown(openDropdown === "model" ? null : "model")
                }
                className="flex items-center gap-1 hover:text-white transition"
              >
                Models
                <FiChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${openDropdown === "model" ? "rotate-180" : ""
                    }`}
                />
              </button>

              {/* Mega Menu Container */}
              <div
                className={`
                absolute top-full left-0 mt-3 w-[850px]
                rounded-2xl 
p-2
  bg-[#0B0C10]/95      
  backdrop-blur-xl       
  border border-white/10 
  shadow-[0_10px_45px_rgba(0,0,0,0.8)]
  overflow-hidden

                transition-all duration-300 origin-top z-[99999]
                ${openDropdown === "model"
                    ? "opacity-100 scale-100 visible"
                    : "opacity-0 scale-95 invisible"
                  }
              `}
              >
                <div className="grid grid-cols-3">

                  {/* LEFT COLUMN — MAIN CATEGORY LINKS */}
                  <div className="col-span-1 border-r border-white/10 p-3">



                    {/* Language Models */}
                    <Link
                      href="/language-models"
                      className={`relative flex items-start justify-between p-3 rounded-xl cursor-pointer gap-2 transition-all duration-300 ease-out border ${hoveredModelMenu === "indic"
                        ? "bg-white/10 backdrop-blur-xl border-white/10 shadow-lg"
                        : "border-transparent hover:bg-white/10 hover:backdrop-blur-xl hover:border-white/10 hover:shadow-lg"
                        }`}
                      onMouseEnter={() => setHoveredModelMenu("indic")}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="text-white font-semibold text-sm">
                          Language Models
                        </div>
                        <div className="text-gray-500 text-xs mt-1">
                          Accurate models covering 200+ languages
                        </div>
                      </div>
                      <span className="text-gray-500 text-base flex-shrink-0 self-center"><IoChevronForward /></span>
                    </Link>

                    {/* Specialised Models */}
                    <Link
                      href="/domain-specialisation"
                      className={`relative flex items-start justify-between p-3 rounded-xl cursor-pointer mt-2 gap-2 transition-all duration-300 ease-out border ${hoveredModelMenu === "specialised"
                        ? "bg-white/10 backdrop-blur-xl border-white/10 shadow-lg"
                        : "border-transparent hover:bg-white/10 hover:backdrop-blur-xl hover:border-white/10 hover:shadow-lg"
                        }`}
                      onMouseEnter={() => setHoveredModelMenu("specialised")}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="text-white font-semibold text-sm">
                          Specialised Models
                        </div>
                        <div className="text-gray-500 text-xs mt-1">
                          Domain specialised models
                        </div>
                      </div>
                      <span className="text-gray-500 text-base flex-shrink-0 self-center"><IoChevronForward /></span>
                    </Link>

                    {/* Translation Models */}
                    <Link
                      href="/vak"
                      className={`relative flex items-start justify-between p-3 rounded-xl cursor-pointer mt-2 gap-2 transition-all duration-300 ease-out border ${hoveredModelMenu === "translation"
                        ? "bg-white/10 backdrop-blur-xl border-white/10 shadow-lg"
                        : "border-transparent hover:bg-white/10 hover:backdrop-blur-xl hover:border-white/10 hover:shadow-lg"
                        }`}
                      onMouseEnter={() => setHoveredModelMenu("translation")}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="text-white font-semibold text-sm">
                          Translation Models
                        </div>
                        <div className="text-gray-500 text-xs mt-1">
                          Real-time speech to speech translation
                        </div>
                      </div>
                      <span className="text-gray-500 text-base flex-shrink-0 self-center"><IoChevronForward /></span>
                    </Link>

                    {/* On Device Models */}
                    <Link
                      href="/on-device-models"
                      className={`relative flex items-start justify-between p-3 rounded-xl cursor-pointer mt-2 gap-2 transition-all duration-300 ease-out border ${hoveredModelMenu === "device"
                        ? "bg-white/10 backdrop-blur-xl border-white/10 shadow-lg"
                        : "border-transparent hover:bg-white/10 hover:backdrop-blur-xl hover:border-white/10 hover:shadow-lg"
                        }`}
                      onMouseEnter={() => setHoveredModelMenu("device")}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="text-white font-semibold text-sm">
                          On Device Models
                        </div>
                        <div className="text-gray-500 text-xs mt-1">
                          Offline and edge-friendly models
                        </div>
                      </div>
                      {/* <span className="text-gray-500 text-base flex-shrink-0 self-center"><IoChevronForward /></span> */}
                    </Link>
                  </div>

                  {/* RIGHT COLUMN — SUBMENU CONTENT */}
                  <div className="col-span-2 p-6">

                    {/* LANGUAGE MODELS PANEL */}
                    {hoveredModelMenu === "indic" && (
                      <div className="grid grid-cols-2 gap-6">

                        <Link href="/zero-indic" className="group py-2 px-3 rounded-lg transition-all duration-300 ease-out hover:bg-white/10 hover:backdrop-blur-xl hover:border-white/10 hover:shadow-lg border border-transparent">
                          <div className="text-white font-medium">
                            Zero STT Indic
                          </div>
                          <div className="text-gray-500 text-xs mt-1 group-hover:text-gray-300">
                            Accurate transcription for Indic languages
                          </div>
                        </Link>

                        <Link href="/zero-code-switch" className="group py-2 px-3 rounded-lg transition-all duration-300 ease-out hover:bg-white/10 hover:backdrop-blur-xl hover:border-white/10 hover:shadow-lg border border-transparent">
                          <div className="text-white font-medium">
                            Zero STT Codeswitch
                          </div>
                          <div className="text-gray-500 text-xs mt-1 group-hover:text-gray-300">
                            Native codeswitch transcriptions
                          </div>
                        </Link>

                        {/* <Link href="/zero-stt" className="group py-2 px-3 rounded-lg transition-all duration-300 ease-out hover:bg-white/10 hover:backdrop-blur-xl hover:border-white/10 hover:shadow-lg border border-transparent">
                          <div className="text-white font-medium">
                            Zero STT Universal
                          </div>
                          <div className="text-gray-500 text-xs mt-1 group-hover:text-gray-300">
                            Accurate transcriptions for 200+ languages
                          </div>
                        </Link> */}

                      </div>
                    )}

                    {/* SPECIALISED MODELS PANEL */}
                    {hoveredModelMenu === "specialised" && (
                      <div className="grid grid-cols-2 gap-6">

                        <Link href="/zero-med" className="group py-2 px-3 rounded-lg transition-all duration-300 ease-out hover:bg-white/10 hover:backdrop-blur-xl hover:border-white/10 hover:shadow-lg border border-transparent">
                          <div className="text-white font-medium">
                            Zero STT Med
                          </div>
                          <div className="text-gray-500 text-xs mt-1 group-hover:text-gray-300">
                            Transcription for medical speech
                          </div>
                        </Link>

                      </div>
                    )}

                    {/* TRANSLATION MODELS PANEL */}
                    {hoveredModelMenu === "translation" && (
                      <div className="grid grid-cols-2 gap-6">

                        <Link href="/vak" className="group py-2 px-3 rounded-lg transition-all duration-300 ease-out hover:bg-white/10 hover:backdrop-blur-xl hover:border-white/10 hover:shadow-lg border border-transparent">
                          <div className="text-white font-medium">
                            Vāķ
                          </div>
                          <div className="text-gray-500 text-xs mt-1 group-hover:text-gray-300">
                            Speech to Speech translation in 55 Indic languages
                          </div>
                        </Link>

                      </div>
                    )}

                    {/* ON DEVICE PANEL */}
                    {hoveredModelMenu === "device" && (
                      <div className="grid grid-cols-2 gap-6">
                        {/* 
                      <Link href="/on-device-models" className="group py-2 px-3 rounded-lg transition-all duration-300 ease-out hover:bg-white/10 hover:backdrop-blur-xl hover:border-white/10 hover:shadow-lg border border-transparent">
                        <div className="text-white font-medium">
                          On-device STT
                        </div>
                        <div className="text-gray-500 text-xs mt-1 group-hover:text-gray-300">
                          Offline speech processing for edge devices
                        </div>
                      </Link> */}

                      </div>
                    )}

                  </div>
                </div>
              </div>
            </div>


            <div className="relative">
              <button
                onClick={() =>
                  setOpenDropdown(openDropdown === "solutions" ? null : "solutions")
                }
                className="flex items-center gap-1 hover:text-white transition"
              >
                Solutions
                <FiChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${openDropdown === "solutions" ? "rotate-180" : ""
                    }`}
                />
              </button>

              <div
                className={`
    absolute top-full left-0 mt-3 w-[720px]
    rounded-2xl bg-[#0B0C10]/95 backdrop-blur-xl
    border border-white/10 shadow-[0_10px_45px_rgba(0,0,0,0.8)]
    transition-all duration-300 origin-top z-[99999]
    ${openDropdown === "solutions"
                    ? "opacity-100 scale-100 visible"
                    : "opacity-0 scale-95 invisible"
                  }
  `}
              >
                <div className="p-6">

                  {/* GRID: 2 COLUMNS */}
                  <div className="grid grid-cols-2 gap-6">

                    {/* LEFT COLUMN - 3 LINKS */}
                    <div className="space-y-4">

                      <Link
                        href="/use-cases"
                        className="block p-3 rounded-xl border border-transparent
          hover:border-white/10 hover:bg-white/10 hover:backdrop-blur-xl
          hover:shadow-lg transition-all duration-300"
                      >
                        <div className="text-white font-semibold text-sm">Use Cases</div>
                        <div className="text-gray-400 text-xs mt-1">
                          Explore real-world speech AI applications
                        </div>
                      </Link>

                      <Link
                        href="/contact-centers"
                        className="block p-3 rounded-xl border border-transparent
          hover:border-white/10 hover:bg-white/10 hover:backdrop-blur-xl
          hover:shadow-lg transition-all duration-300"
                      >
                        <div className="text-white font-semibold text-sm">Contact Centers</div>
                        <div className="text-gray-400 text-xs mt-1">
                          Real-time intelligence for support & operations
                        </div>
                      </Link>

                      <Link
                        href="/media-entertainment"
                        className="block p-3 rounded-xl border border-transparent
          hover:border-white/10 hover:bg-white/10 hover:backdrop-blur-xl
          hover:shadow-lg transition-all duration-300"
                      >
                        <div className="text-white font-semibold text-sm">
                          Media & Entertainment
                        </div>
                        <div className="text-gray-400 text-xs mt-1">
                          Automation for production & post-processing
                        </div>
                      </Link>

                    </div>

                    {/* RIGHT COLUMN – USE CASE */}
                    <div className="space-y-4">

                      <Link
                        href="/healthcare"
                        className="block p-3 rounded-xl border border-transparent
          hover:border-white/10 hover:bg-white/10 hover:backdrop-blur-xl
          hover:shadow-lg transition-all duration-300"
                      >
                        <div className="text-white font-semibold text-sm">Healthcare</div>
                        <div className="text-gray-400 text-xs mt-1">
                          Medical speech AI for clinical workflows
                        </div>
                      </Link>

                    </div>
                  </div>
                </div>
              </div>

            </div>


            {/* Resources Dropdown */}
            <div className="relative">
              <button
                onClick={() =>
                  setOpenDropdown(openDropdown === "resources" ? null : "resources")
                }
                className="flex items-center gap-1 hover:text-white transition"
              >
                Resources
                <FiChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${openDropdown === "resources" ? "rotate-180" : ""
                    }`}
                />
              </button>

              <div
                className={`
    absolute top-full left-0 mt-3 w-[700px]
    rounded-2xl bg-[#0B0C10]/95 backdrop-blur-xl
    border border-white/10 shadow-[0_10px_45px_rgba(0,0,0,0.8)]
    transition-all duration-300 origin-top z-[99999]
    ${openDropdown === "resources"
                    ? "opacity-100 scale-100 visible"
                    : "opacity-0 scale-95 invisible"
                  }
  `}
              >
                <div className="p-6">

                  {/* GRID: 2 COLUMNS */}
                  <div className="grid grid-cols-2 gap-6">

                    {/* LEFT COLUMN — 3 LINKS */}
                    <div className="space-y-4">

                      <Link
                        href="/blog"
                        className="block p-3 rounded-xl border border-transparent
          hover:border-white/10 hover:bg-white/10 hover:backdrop-blur-xl
          hover:shadow-lg transition-all duration-300"
                      >
                        <div className="text-white font-semibold text-sm">Blog</div>
                        <div className="text-gray-400 text-xs mt-1">
                          Insights, product updates & engineering articles
                        </div>
                      </Link>

                      <Link
                        href="/benchmarks"
                        className="block p-3 rounded-xl border border-transparent
          hover:border-white/10 hover:bg-white/10 hover:backdrop-blur-xl
          hover:shadow-lg transition-all duration-300"
                      >
                        <div className="text-white font-semibold text-sm">Benchmarks</div>
                        <div className="text-gray-400 text-xs mt-1">
                          Compare accuracy across datasets and models
                        </div>
                      </Link>

                      <Link
                        href="/media"
                        className="block p-3 rounded-xl border border-transparent
          hover:border-white/10 hover:bg-white/10 hover:backdrop-blur-xl
          hover:shadow-lg transition-all duration-300"
                      >
                        <div className="text-white font-semibold text-sm">News & Media</div>
                        <div className="text-gray-400 text-xs mt-1">
                          Press coverage, announcements & interviews
                        </div>
                      </Link>

                    </div>

                    {/* RIGHT COLUMN — ONLY PATENTS */}
                    <div className="space-y-4">

                      <Link
                        href="/patents"
                        className="block p-3 rounded-xl border border-transparent
          hover:border-white/10 hover:bg-white/10 hover:backdrop-blur-xl
          hover:shadow-lg transition-all duration-300"
                      >
                        <div className="text-white font-semibold text-sm">Patents</div>
                        <div className="text-gray-400 text-xs mt-1">
                          Explore our patented research & innovations
                        </div>
                      </Link>

                      <Link
                        href="/research"
                        className="block p-3 rounded-xl border border-transparent
          hover:border-white/10 hover:bg-white/10 hover:backdrop-blur-xl
          hover:shadow-lg transition-all duration-300"
                      >
                        <div className="text-white font-semibold text-sm">Research</div>
                        <div className="text-gray-400 text-xs mt-1">
                          Read our latest research publications
                        </div>
                      </Link>

                    </div>

                  </div>
                </div>
              </div>

            </div>


            {/* Single Links */}
            <Link
              href={`${DOCS_URL}/overview`} target="_blank" rel="noopener noreferrer"
              className="hover:text-white transition"
            >
              Documentation
            </Link>

            <Link href="/about" className="block px-4 py-2">
              About Us
            </Link>
            <Link href="/pricing" className="hover:text-white transition">
              Pricing
            </Link>
          </div>
          <Link
            href="https://playground.shunyalabs.ai/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex bg-gradient-to-r from-[#1266ED] via-[#2197EC] to-[#2FC8EB] hover:opacity-90 text-white px-6 py-2 rounded-xl text-sm font-semibold transition items-center gap-2"
          >
            <FiPlay className="w-4 h-4" />
            Playground
          </Link>
          {/* Buttons */}
          <div className="hidden md:flex items-center gap-3 mt-0.5">
            {isLoaded && !isSignedIn && (
              <>
                {/* <SignInButton
                mode="modal"
                appearance={{
                  variables: {
                    colorBackground: "#0B0C10",
                    colorInputBackground: "#1a1a1a",
                    colorInputText: "#ffffff",
                    colorText: "#ffffff",
                    colorTextSecondary: "#9ca3af",
                    colorPrimary: "#2563eb",
                  },
                  elements: {
                    modalContent: "bg-[#0B0C10] border border-gray-700",
                    modalBackdrop: "bg-black/80",
                    formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white",
                    socialButtonsBlockButton: "bg-[#1a1a1a] border-gray-600 text-white hover:bg-[#2a2a2a]",
                    formFieldInput: "bg-[#1a1a1a] border-gray-600 text-white",
                  },
                }}
              >
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-sm font-semibold transition">
                  Sign In
                </button>
              </SignInButton> */}
                <button
                  onClick={() =>
                    window.open(
                      'https://console.shunyalabs.ai/',
                      '_blank',
                      'noopener,noreferrer'
                    )
                  }
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-sm font-semibold transition"
                >
                  Sign In
                </button>

              </>
            )}
            {/* <Link
            href="/pricing"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full text-sm font-semibold transition"
          >
            Get Started
          </Link> */}
            <Link
              href="/contact"
              className="border border-gray-400 text-gray-200 hover:bg-gray-800 px-5 py-2 rounded-xl text-sm font-semibold transition"
            >
              Contact Sales
            </Link>
            {/* User Icon - Extreme Right */}
            {isLoaded && isSignedIn && (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden border-2 border-gray-600 hover:border-gray-400 transition-colors"
                >
                  {user?.imageUrl ? (
                    <img
                      src={user.imageUrl}
                      alt={user.fullName || "User"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-700 flex items-center justify-center text-white font-semibold">
                      {user?.firstName?.[0] || user?.emailAddresses[0]?.emailAddress[0] || "U"}
                    </div>
                  )}
                </button>

                {/* Custom User Menu Dropdown */}
                {userMenuOpen && (
                  <>
                    <button
                      className="fixed inset-0 z-[99998] bg-transparent cursor-default"
                      onClick={() => setUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 w-48 bg-[#0B0C10] border border-gray-700 rounded-lg shadow-lg z-[99999] overflow-hidden">
                      <a
                        href="https://console.shunyalabs.ai/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition cursor-pointer"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        Dashboard
                      </a>
                      <button
                        onClick={() => {
                          signOut();
                          setUserMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition cursor-pointer"
                      >
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white text-xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden bg-[#0B0C10] border-t border-gray-700 px-6 py-4 text-gray-300 text-sm transition-all duration-300 z-[99999] relative ${mobileMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
            }`}
        >
          <div className="space-y-3">
            {/* PRODUCT — Mobile Dropdown */}
            <div>
              <button
                onClick={() =>
                  setOpenDropdown(openDropdown === "product-m" ? null : "product-m")
                }
                className="flex w-full items-center justify-between text-left py-2"
              >
                <span>Product</span>
                <FiChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${openDropdown === "product-m" ? "rotate-180" : ""
                    }`}
                />
              </button>

              {openDropdown === "product-m" && (
                <div className="pl-4 space-y-2">

                  <Link
                    href="/overview"
                    className="block hover:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Overview
                  </Link>

                  <Link
                    href="/models-page"
                    className="block hover:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Models
                  </Link>

                  <Link
                    href="/voice-agent"
                    className="block hover:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Voice Agent
                  </Link>

                  <Link
                    href="/speech-intelligence-page"
                    className="block hover:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Speech Intelligence
                  </Link>

                  <Link
                    href="/audio-processing"
                    className="block hover:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Audio Processing
                  </Link>

                  <Link
                    href="/deployment"
                    className="block hover:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Deployment
                  </Link>

                </div>
              )}
            </div>


            {/* Models */}
            <div>
              <button
                onClick={() =>
                  setOpenDropdown(
                    openDropdown === "models-m" ? null : "models-m"
                  )
                }
                className="flex w-full items-center justify-between text-left py-2"
              >
                <span>Models</span>
                <FiChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${openDropdown === "models-m" ? "rotate-180" : ""
                    }`}
                />
              </button>
              {openDropdown === "models-m" && (
                <div className="pl-4 space-y-2">
                  {/* Language Models */}
                  <div>
                    <Link
                      href="/language-models"
                      className="block hover:text-white font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Language Models
                    </Link>
                    <div className="pl-4 space-y-1 mt-1">
                      <Link
                        href="/zero-indic"
                        className="block text-sm text-gray-400 hover:text-white"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Zero STT Indic
                      </Link>
                      <Link
                        href="/zero-code-switch"
                        className="block text-sm text-gray-400 hover:text-white"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Zero STT Codeswitch
                      </Link>
                    </div>
                  </div>

                  {/* Translation Models */}
                  <div className="mt-2">
                    <Link
                      href="/vak"
                      className="block hover:text-white font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Translation Models
                    </Link>
                    <div className="pl-4 space-y-1 mt-1">
                      <Link
                        href="/vak"
                        className="block text-sm text-gray-400 hover:text-white"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Vāķ
                      </Link>
                    </div>
                  </div>

                  {/* On Device Models */}
                  <Link
                    href="/on-device-models"
                    className="block hover:text-white mt-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    On Device Models
                  </Link>
                </div>
              )}
            </div>

            {/* Solutions */}
            <div>
              <button
                onClick={() =>
                  setOpenDropdown(
                    openDropdown === "solutions-m" ? null : "solutions-m"
                  )
                }
                className="flex w-full items-center justify-between text-left py-2"
              >
                <span>Solutions</span>
                <FiChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${openDropdown === "solutions-m" ? "rotate-180" : ""
                    }`}
                />
              </button>
              {openDropdown === "solutions-m" && (
                <div className="pl-4 space-y-2">
                  <Link
                    href="/use-cases"
                    className="block hover:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Use Cases
                  </Link>
                  <Link
                    href="/contact-centers"
                    className="block hover:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Contact Centers
                  </Link>
                  <Link
                    href="/media-entertainment"
                    className="block hover:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Media and Entertainment
                  </Link>
                  <Link
                    href="/healthcare"
                    className="block hover:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Healthcare
                  </Link>
                </div>
              )}
            </div>

            {/* Resources */}
            <div>
              <button
                onClick={() =>
                  setOpenDropdown(
                    openDropdown === "resources-m" ? null : "resources-m"
                  )
                }
                className="flex w-full items-center justify-between text-left py-2"
              >
                <span>Resources</span>
                <FiChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${openDropdown === "resources-m" ? "rotate-180" : ""
                    }`}
                />
              </button>
              {openDropdown === "resources-m" && (
                <div className="pl-4 space-y-2">
                  <Link
                    href="/blog"
                    className="block hover:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Blog
                  </Link>

                  <Link
                    href="/benchmarks"
                    className="block hover:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Benchmarks
                  </Link>

                  <Link
                    href="/media"
                    className="block hover:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    News & Media
                  </Link>

                  <Link
                    href="/patents"
                    className="block hover:text-white"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Patents
                  </Link>

                  {/* <Link
                                    href="#"
                                    className="block hover:text-white"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Case Studies
                                </Link> */}
                </div>
              )}
            </div>

            {/* Simple Links */}
            <Link
              href={`${DOCS_URL}/overview`} target="_blank" rel="noopener noreferrer"
              className="block py-2 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Documentation
            </Link>
            <Link
              href="/about"
              className="block hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="/pricing"
              className="block py-2 hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>

            {/* Buttons */}
            <div className="flex flex-col gap-3 mt-4">
              <Link
                href="https://playground.shunyalabs.ai/"
                className="bg-gradient-to-r from-[#1266ED] via-[#2197EC] to-[#2FC8EB] hover:opacity-90 text-white px-5 py-2 rounded-xl text-center font-semibold flex items-center justify-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
                target="_blank"
                rel="noopener noreferrer"

              >
                <FiPlay className="w-4 h-4" />
                Playground
              </Link>
              {isLoaded && !isSignedIn && (
                <>
                  {/* <SignInButton
                  mode="modal"
                  appearance={{
                    variables: {
                      colorBackground: "#0B0C10",
                      colorInputBackground: "#1a1a1a",
                      colorInputText: "#ffffff",
                      colorText: "#ffffff",
                      colorTextSecondary: "#9ca3af",
                      colorPrimary: "#2563eb",
                    },
                    elements: {
                      modalContent: "bg-[#0B0C10] border-0 rounded-xl shadow-2xl",
                      modalBackdrop: "bg-black/80",
                      formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white rounded-lg",
                      socialButtonsBlockButton: "bg-[#1a1a1a] border-0 text-white hover:bg-[#2a2a2a] rounded-lg shadow-sm",
                      formFieldInput: "bg-[#1a1a1a] border-0 text-white rounded-lg focus:ring-2 focus:ring-blue-500",
                    },
                  }}
                >
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-center font-semibold w-full">
                    Sign In
                  </button>
                </SignInButton> */}
                  <button
                    onClick={() =>
                      window.open(
                        'https://console.shunyalabs.ai/',
                        '_blank',
                        'noopener,noreferrer'
                      )
                    }
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl text-center font-semibold w-full"
                  >
                    Sign In
                  </button>
                </>
              )}
              <Link
                href="/contact"
                className="border border-gray-400 text-gray-200 hover:bg-gray-800 px-5 py-2 rounded-xl text-center font-semibold"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Sales
              </Link>
              {/* User Icon - Mobile */}
              {isLoaded && isSignedIn && (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center justify-center w-10 h-10 rounded-full overflow-hidden border-2 border-gray-600 hover:border-gray-400 transition-colors mx-auto"
                  >
                    {user?.imageUrl ? (
                      <img
                        src={user.imageUrl}
                        alt={user.fullName || "User"}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-700 flex items-center justify-center text-white font-semibold">
                        {user?.firstName?.[0] || user?.emailAddresses[0]?.emailAddress[0] || "U"}
                      </div>
                    )}
                  </button>

                  {/* Custom User Menu Dropdown - Mobile */}
                  {userMenuOpen && (
                    <div className="mt-2 w-full bg-[#0B0C10] border border-gray-700 rounded-lg shadow-lg overflow-hidden">
                      <a
                        href="https://console.shunyalabs.ai/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition cursor-pointer"
                        onClick={() => {
                          setUserMenuOpen(false);
                          setMobileMenuOpen(false);
                        }}
                      >
                        Dashboard
                      </a>
                      <button
                        onClick={() => {
                          signOut();
                          setUserMenuOpen(false);
                          setMobileMenuOpen(false);
                        }}
                        className="w-full text-left px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition cursor-pointer"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div >
      </nav >
    </>
  );
}

