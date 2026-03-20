"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiSearch } from "react-icons/fi";
import PaginationButtons from "../components/PaginationButtons";
import { CheckSquare } from "lucide-react";
import { useSearchParams } from "next/navigation";

const blogs = [

  {
    category: "AI Trends",
    title: "Voice AI, Text to Speech & Type to Speech: The Technologies Quietly Changing How We Communicate",
    date: "17 Mar 2026",
    image: "/assets/blog/type-to-speech.png",
    Link: "/blog/voice-ai-text-to-speech-type-to-speech",
  },

  {
    category: "AI Trends",
    title: "How to Choose a Speech AI Platform: The 2026 Evaluation Guide",
    date: "16 Mar 2026",
    image: "/assets/blog/speech-aI-platform.png",
    Link: "/blog/how-to-choose-a-speech-ai-platform",
  },
  {
    category: "AI Trends",
    title: "Speech AI in 2026: What It Is and How Real-Time Voice is Changing Every Industry",
    date: "13 Mar 2026",
    image: "/assets/blog/speech-ai-in-2026.jpg",
    Link: "/blog/speech-ai-in-2026",
  },

  {
    category: "AI Trends",
    title: "Why Sub-100ms Voice AI Latency Is the New Table Stakes (And How to Achieve It)",
    date: "12 Mar 2026",
    image: "/assets/blog/why-sub-100ms.jpg",
    Link: "/blog/sub-100ms-voice-ai-latency-Is-the-new-table-stakes",
  },

  {
    category: "AI Trends",
    title:
      "Voice AI's trillion-dollar opportunity: Conversation graphs",
    date: "11 Mar 2026",
    image: "/assets/blog/Voice-AI-trillion-dollar-opportunity-Conversation-graphs.png",
    Link: "/blog/voice-al-trillion-dollar-opportunity",
  },

  {
    category: "AI Trends",
    title:
      "Why Indic Language Voice AI Is the Biggest Untapped Opportunity in Tech",
    date: "10 Mar 2026",
    image: "/assets/blog/why-indec-language.png",
    Link: "/blog/indic-language-voice-ai-biggest-untapped-opportunity",
  },

  {
    category: "Product",
    title:
      "Zero STT Med: Accurate, Real-Time Medical Speech-to-Text for Healthcare Professionals",
    date: "18 Nov 2025",
    image: "/assets/blog/introducing-zero-stt.jpg",
    Link: "/blog/introducing-zero-stt-med-medical-speech-to-text-for-healthcare",
  },
  {
    category: "Product",
    title:
      "Why Multilingual Voice AI Fails on Real-World Audio — and How We Fixed It",
    date: "03 Nov 2025",
    image: "/assets/blog/Why-multilingual.png",
    Link: "/blog/why-multilingual-voice-ai-fails-on-real-world-audio-and-how-we-fixed-it",
  },
  {
    category: "Build & Learn",
    title: "Getting Started with ASR APIs: Python Quickstart",
    date: "23 Oct 2025",
    image: "/assets/blog/Build-and-Learn.png",
    Link: "/blog/getting-started-with-asr-apis-python-quickstart",
  },
  {
    category: "Build & Learn",
    title: "Getting Started with ASR APIs: Node.js Quickstart",
    date: "23 Oct 2025",
    image: "/assets/blog/Build-and-Learn-1.png",
    Link: "/blog/getting-started-with-asr-apis-node-js-quickstart",
  },
  {
    category: "AI Trends",
    title: "Benchmarking Top Open-Source Speech Recognition Models",
    date: "10 Oct 2025",
    image: "/assets/blog/AI-Trends-1.png",
    Link: "/blog/benchmarking-top-open-source-speech-recognition-models",
  },
  {
    category: "AI Trends",
    title: "Top 10 AI Transcription Tools: A Simple Comparison",
    date: "10 Oct 2025",
    image: "/assets/blog/AI-Trends.png",
    Link: "/blog/top-10-ai-transcription-tools-a-simple-comparison",
  },
  {
    category: "Use Cases",
    title: "Speech-to-Text AI in Action: Top 10 Use Cases Across Industries",
    date: "10 Oct 2025",
    image: "/assets/blog/Use-cases.png",
    Link: "/blog/speech-to-text-ai-in-action-top-10-use-cases-across-industries",
  },
  {
    category: "Engineering & Research",
    title:
      "Automatic Speech Recognition Explained: Everything You Need to Know About ASR",
    date: "26 Sep 2025",
    image: "/assets/blog/Engineering-and-research.png",
    Link: "/blog/automatic-speech-recognition-explained-everything-you-need-to-know-about-asr",
  },
  {
    category: "Product",
    title:
      "Introducing Zero STT Med: Shunya Labs’ Purpose-Built Medical Speech-to-Text Transcription for Healthcare",
    date: "18 Nov 2025",
    image: "/assets/blog/introducing-zero-stt.jpg",
    Link: "/blog/introducing-zero-stt-med-medical-speech-to-text-for-healthcare",
  },

];

export default function BlogListPage() {
  const [active, setActive] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const searchParams = useSearchParams();
  const blogListRef = useRef<HTMLDivElement | null>(null);

  const ITEMS_PER_PAGE = 9;
  const [currentPage, setCurrentPage] = useState(1);

  // Normalize helper
  const normalize = (str: string) =>
    str.toLowerCase().replace(/\s+/g, " ").trim();

  // URL CATEGORY FILTER
  useEffect(() => {
    const cat = searchParams.get("category");

    if (cat) {
      setActive(cat);

      setTimeout(() => {
        if (blogListRef.current) {
          const elementTop =
            blogListRef.current.getBoundingClientRect().top + window.scrollY;

          const OFFSET = 120;

          window.scrollTo({
            top: elementTop - OFFSET,
            behavior: "smooth",
          });
        }
      }, 200);
    }
  }, [searchParams]);

  // SEARCH DEBOUNCE
  useEffect(() => {
    setIsSearching(true);

    const timeout = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  // RESET PAGE WHEN TAB CHANGES
  useEffect(() => {
    setCurrentPage(1);
  }, [active, debouncedSearch]);

  // FILTER LOGIC
  const filteredBlogs = blogs.filter((blog) => {
    const q = debouncedSearch.toLowerCase();

    const tabMatch =
      normalize(active) === "all" ||
      normalize(blog.category) === normalize(active);

    const searchMatch =
      blog.title.toLowerCase().includes(q) ||
      blog.category.toLowerCase().includes(q) ||
      blog.date.toLowerCase().includes(q);

    return tabMatch && searchMatch;
  });

  // PAGINATION
  const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedBlogs = filteredBlogs.slice(startIndex, endIndex);

  const tabs = [
    "All",
    "Engineering & Research",
    "AI Trends",
    "Product",
    "Build & Learn",
    "Use Cases",
  ];

  return (
    <div className="text-white px-6 md:px-12 py-12">
      <div className="max-w-7xl mx-auto flex flex-col">
        <div className="w-full pb-10 text-white">
          <h2
            className="text-center text-xl font-medium mb-8"
            ref={blogListRef}
          >
            Topics
          </h2>

          <div className="flex flex-wrap justify-between items-center gap-4">
            {/* SEARCH */}
            <div className="flex items-center bg-[#1B1B1B] border border-gray-700 text-gray-300 px-4 py-2 rounded-full w-full md:w-[300px]">
              <FiSearch className="mr-2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent outline-none text-sm text-gray-300 w-full"
              />
            </div>

            {/* TABS */}
            <div className="flex flex-wrap items-center">
              {tabs.map((tab) => {
                const isActive = normalize(active) === normalize(tab);
                const isAll = tab === "All";

                return (
                  <button
                    key={tab}
                    onClick={() => setActive(tab)}
                    className={`flex items-center gap-2 px-5 mx-2 my-2 md:my-0 py-2 rounded-full border text-sm transition-all
                      ${isActive
                        ? "bg-white text-black border-white"
                        : "border-gray-500 text-gray-300 hover:border-gray-300"
                      }`}
                  >
                    <span>{tab}</span>
                    {isAll && <CheckSquare size={18} strokeWidth={2} />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* BLOG GRID */}
        <main className="grid sm:grid-cols-3 gap-3 md:gap-6 justify-center">
          {isSearching ? (
            <div className="col-span-3 flex justify-center py-10">
              <div className="w-8 h-8 border-4 border-gray-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : paginatedBlogs.length === 0 ? (
            <div className="col-span-3 text-center py-10 text-gray-400">
              No matching blogs found.
            </div>
          ) : (
            paginatedBlogs.map((blog, i) => (
              <Link
                key={i}
                href={blog.Link}
                className="bg-black/40 cursor-pointer border border-gray-800 rounded-2xl p-4 hover:border-gray-600 transition-all duration-300"
              >
                <div className="relative rounded-xl aspect-[16/8.5] w-full overflow-hidden">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover opacity-90"
                    loading="lazy"
                  />
                </div>

                <div className="mt-4 text-center">
                  <span className="text-xs bg-black/60 px-3 py-1 rounded-full text-gray-300 border border-gray-700">
                    {blog.category}
                  </span>

                  <h3 className="mt-3 text-sm font-medium">{blog.title}</h3>

                  <p className="text-xs text-gray-400 mt-1">{blog.date}</p>
                </div>
              </Link>
            ))
          )}
        </main>

        {/* PAGINATION */}
        <PaginationButtons
          currentPage={currentPage}
          totalPages={totalPages}
          onPrev={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          onNext={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
        />
      </div>
    </div>
  );
}