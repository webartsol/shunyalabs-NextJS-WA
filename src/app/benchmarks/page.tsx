'use client';

import AnimatedBarChart from '@/app/Layouts/AnimatedBarChart';
import Navbar from '@/app/Layouts/Navbar';
import { useRouter } from 'next/navigation'; // ✅ use next/navigation instead
import React from 'react';
import AnimatedBarGraph from '../Layouts/AnimatedBarGraph';
import BottomAnimatedGraph from '../Layouts/BottomAnimatedGraph';
import Milestones from '../Layouts/Milestones';
import MainFooter from '../Layouts/MainFooter';
import HomeFooter from '../Layouts/HomeFooter';

function Graphs() {
    const router = useRouter();

    return (
        <>
            <div className="min-h-screen about-bg text-white pt-20">
                <Navbar />

                {/* Hero Section */}
                <section className="relative text-white md:py-24 py-16 text-center px-4 sm:px-6">
                    <div className="max-w-5xl mx-auto px-6">
                        {/* Title */}
                        <h1 className="text-3xl sm:text-4xl max-w-2xl md:text-5xl font-bold leading-tight m-auto">
                            Proven performance, backed by data
                        </h1>

                        {/* Subtitle */}
                        <h2 className="mt-6 text-lg md:text-xl text-gray-300">
                            Shunyalabs’ transcription leads the way — producing 48% fewer errors than the next best model.
                        </h2>
                    </div>
                </section>

                <div className='flex justify-center'>
                    <button
                        onClick={() => router.push('/contact')}
                        className="w-[200px] text-sm md:text-base py-2 md:py-2.5 rounded-full font-medium transition-all duration-300 bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        Book a Meeting
                    </button>
                </div>

                {/* <AnimatedBarChart/> */}
                <AnimatedBarGraph />

                <BottomAnimatedGraph />

                <Milestones backgroundClass="bg-transparent" showGlow={false} />
            </div>
            <HomeFooter/>
           <MainFooter/>
        </>
    );
}

export default Graphs;
