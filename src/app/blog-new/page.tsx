import type { Metadata } from "next";
import Navbar from "@/app/Layouts/Navbar";
import HomeFooter from "@/app/Layouts/HomeFooter";
import MainFooter from "@/app/Layouts/MainFooter";
import BlogListNew from "../Layouts/BlogListNew";

export default function Blog() {
    return (
        <>
            <div className="bg-shunya-labs pt-20">
                <Navbar />

                <section className="relative text-white md:py-10 py-5 text-center">
                    <div className="max-w-4xl mx-auto px-6">
                        {/* Title */}
                        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
                            Our Blog
                        </h1>
                    </div>
                </section>
                <BlogListNew/>

            </div>
            <HomeFooter/>
            <MainFooter/>
        </>
    )
}