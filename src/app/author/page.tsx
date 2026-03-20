'use client';
import Navbar from "@/app/Layouts/Navbar";
import MainFooter from "@/app/Layouts/MainFooter";
import Image from "next/image";
import { BlogHeader } from "@/app/Layouts/BlogHeader";
import AuthorBio from "@/app/Layouts/BioRituMehrotra";

export default function BenchmarkingASRBlog() {
  return (
    <div className="min-h-screen bg-shunya-labs text-gray-200 pt-24">
      <Navbar />
      <div className="max-w-3xl mx-auto px-3 md:px-10 pb-8 md:py-10">
        <div>
            <AuthorBio />
        </div>
      </div>
      <MainFooter />
    </div>
  );
}