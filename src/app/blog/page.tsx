import type { Metadata } from "next";
import LatestBlog from "@/app/Layouts/LatestBlog";
import Navbar from "@/app/Layouts/Navbar";
import featuredImg from '../../../public/assets/blog/code-switching.png';
import BlogList from "@/app/Layouts/BlogList";
import HomeFooter from "@/app/Layouts/HomeFooter";
import MainFooter from "@/app/Layouts/MainFooter";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "AI, Speech Recognition & Tech Insights | Shunya Labs Blog",
  description:
    "Read expert articles on speech recognition, artificial intelligence, and the technologies powering tomorrow",
};

export default function Blog() {
  return (
    <>
      <div className="bg-shunya-labs pt-24">
        <Navbar />

        <section className="relative text-white md:py-10 py-5 text-center">
          <div className="max-w-4xl mx-auto px-6">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              Our Blogs
            </h1>
          </div>
        </section>

        <div className="md:px-0 py-10 px-4 max-w-7xl m-auto flex flex-col items-center justify-center md:gap-12 gap-4">
          <LatestBlog
            title="Code-Switching ASR Explained: Why Hinglish Breaks Every Standard Model"
            description="Most voice technology was built for clean, single-language speech and struggles the moment someone mixes Hindi and English or any other language"
            logo={featuredImg}
            date="18 Mar 2026"
            link="/blog/code-switching-asr-explained"
            author="Navvya Jain"
            category="AI Trends"
          />
        </div>

        <div className="w-[85%] mx-auto border-b border-gray-700"></div>

        {/* ✔ FIX: Wrap BlogList inside Suspense */}
        <Suspense fallback={<div className="text-white p-10">Loading blog list...</div>}>
          <BlogList />
        </Suspense>
        {/* <SubscribeBox /> */}
      </div>

      <HomeFooter />
      <MainFooter />
    </>
  );
}
