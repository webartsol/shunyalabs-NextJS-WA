import React from 'react'
import Navbar from '../Layouts/Navbar'
import AudioFeatureCard from '../components/AudioFeatureCard'
import Link from 'next/link'
import HomeFooter from '../Layouts/HomeFooter'
import MainFooter from '../Layouts/MainFooter'

function page() {
    return (
        <div className="min-h-screen bg-[#0B0A0F] text-white pt-20">
            <Navbar />

            {/* Hero Section */}
            <section className="relative text-white md:py-24 py-16 text-center px-4 sm:px-6">
                <div className="max-w-5xl mx-auto px-6">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight m-auto">
                        Studio-Quality Audio Processing
                    </h1>

                    <h2 className="mt-6 text-lg md:text-xl text-gray-300">
                        Proprietary tools that transform raw audio into crystal-clear voice for superior transcription and AI performance.
                    </h2>
                </div>
            </section>


            <div className="max-w-5xl mx-auto space-y-6 md:space-y-12 pt-8 pb-16 md:px-0 px-4">

                <AudioFeatureCard
                    title="Denoiser"
                    gradientColor="#1266ED"
                    desc="Eliminate background noise while preserving natural speech."
                    capabilities={[
                        "Real-time adaptive noise reduction",
                        "Multi-source interference suppression",
                        "Speech characteristic preservation",
                    ]}
                    useCases={[
                        "Call centers",
                        "Remote recordings",
                        "mobile apps",
                        "noisy environments",
                        "conference calls",
                    ]}
                />

                <AudioFeatureCard
                    title="Enhancement"
                    gradientColor="#9064E9"
                    desc="Optimize clarity and intelligibility for maximum accuracy."
                    capabilities={[
                        "Automatic volume normalization",
                        "Frequency optimization for speech",
                        "Artifact and distortion removal",
                    ]}
                    useCases={[
                        "Phone recordings",
                        "low-quality audio",
                        "variable conditions",
                        "legacy recordings",
                    ]}
                />

            </div>
            <div className='text-center pt-2 pb-12 md:pt-8 md:pb-20'>
                <Link href='/contact'
                    className="px-10 py-3 rounded-full text-white text-base font-medium 
             bg-gradient-to-r from-[#361D83] to-[#145AE8]
             hover:opacity-90 transition duration-300 mt-10"
                >
                    Contact Us
                </Link>
            </div>

            <HomeFooter/>
            <MainFooter/>
        </div>
    )
}

export default page