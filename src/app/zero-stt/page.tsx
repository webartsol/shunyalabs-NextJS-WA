import React from 'react'
import Navbar from '../Layouts/Navbar'
import { DOCS_URL } from '../utils/constants'
import { WidgetPage } from '../modules/widget/pages/WidgetPage'
import { LanguageRegions } from '../Layouts/LanguageRegions'
import HomeFooter from '../Layouts/HomeFooter'
import MainFooter from '../Layouts/MainFooter'

function page() {
    return (
        <div className="bg-black pt-20">
            <Navbar />

            <section className=" text-white py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Heading */}
                    <div className="text-center mb-16">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">
                            The world’s most accurate speech-to-text model
                            supporting 200+ languages
                        </h1>
                        <p className="text-gray-500 max-w-5xl mx-auto text-xl">
                            Zero Universal is 48% more accurate than the next best speech-to-text model, designed to support conversational speech in 200+ languages in noisy real world scenarios with speaker overlap.
                        </p>
                    </div>
                    <div id="HomePageWidget">
                        <WidgetPage showHeaderTabs={false} showLanguageDropdown={true} fromPage="zero-stt-med" />
                    </div>
                    <div className="flex justify-center">
                        <a href={`${DOCS_URL}/models/language`} target="_blank" rel="noopener noreferrer">
                            <button
                                className="px-12 py-3 mt-6 rounded-lg text-white text-base font-medium bg-blue-800
                         hover:opacity-90 transition duration-300"
                            >
                                Get Zero STT API now
                            </button>
                        </a>
                    </div>
                </div>

            </section>


            <section className="text-white py-16 px-4 md:px-16 mt-10">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-2xl md:text-4xl font-bold mb-6">
                        Speech recognition built for scale
                    </h2>
                    <p className="text-gray-500 max-w-5xl mx-auto text-lg md:text-xl mb-8 md:mb-16">
                        Deploy once, transcribe everywhere—with the accuracy and speed your users demand.
                    </p>

                    <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
                        {/* Card 1 */}
                        <div className="border border-gray-700 rounded-lg p-10 text-center">
                            <h3 className="text-xl font-semibold mb-4">Superior Accuracy</h3>
                            <p className="text-sm mt-2">
                                Industry-leading 3.10% WER delivers accurate transcriptions, built for production workloads where precision matters.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="border border-gray-700 rounded-lg p-10 text-center">
                            <h3 className="text-xl font-semibold mb-4">Broad Language Support</h3>
                            <p className="text-sm mt-2">
                                Understand the world with 200+ languages and robust accent support. One model that works everywhere, for everyone.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="border border-gray-700 rounded-lg p-10 text-center">
                            <h3 className="text-xl font-semibold mb-4">Subsecond Latency</h3>
                            <p className="text-sm mt-2">
                                Lightning-fast processing keeps conversations flowing naturally. Real-time transcription that feels instant, every time.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <LanguageRegions />
            <HomeFooter />
            <MainFooter />
        </div>
    )
}

export default page