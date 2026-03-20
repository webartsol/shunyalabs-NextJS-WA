import React from 'react'
import Navbar from '../Layouts/Navbar'
import { DOCS_URL } from '../utils/constants'
import { WidgetPage } from '../modules/widget/pages/WidgetPage'
import HomeFooter from '../Layouts/HomeFooter'
import MainFooter from '../Layouts/MainFooter'
import Link from 'next/link'

function page() {
    return (
        <div className="bg-black pt-20">
            <Navbar />

            <section className=" text-white py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Heading */}
                    <div className="text-center mb-16">
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">
                            Transform complex clinical conversations
                            into precise documentation
                        </h1>
                        <p className="text-gray-500 max-w-5xl mx-auto text-xl">
                            Zero Med delivers 11.1% WER and 5.1% CER on noisy, multi-speaker medical audio, trained on specialized medical data to ensure critical terminology is captured correctly every time. </p>
                    </div>
                    <div id="HomePageWidget">
                        <WidgetPage showHeaderTabs={false} showLanguageDropdown={true} fromPage="zero-stt-med" defaultdHeaderTab='medical-transcription' />
                    </div>
                    <div className="flex justify-center">
                        <Link
                            href={`${DOCS_URL}/med-transcription`} target="_blank" rel="noopener noreferrer"
                            className="px-12 py-3 mt-6 rounded-lg text-white text-base font-medium bg-blue-800
                         hover:opacity-90 transition duration-300"
                        >
                            Get Zero STT Med API now
                        </Link>
                    </div>
                </div>

            </section>


            <section className="text-white py-16 px-4 md:px-16 mt-10">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-2xl md:text-4xl font-bold mb-6">
                        Speech recognition built for healthcare
                    </h2>
                    <p className="text-gray-500 max-w-5xl mx-auto text-lg md:text-xl mb-8 md:mb-16">
                        Reduce administrative burden and improve accuracy—so healthcare professionals can focus more on patient care.
                    </p>

                    <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
                        {/* Card 1 */}
                        <div className="border border-gray-700 rounded-lg p-10 text-center">
                            <h3 className="text-xl font-semibold mb-4">Accurate Real-Time Transcripts</h3>
                            <p className="text-sm mt-2">
                                Delivers 11.1% WER and 5.1% CER on challenging medical audio with real-time processing. Purpose-built for clinical environments where every word matters. </p>
                        </div>

                        {/* Card 2 */}
                        <div className="border border-gray-700 rounded-lg p-10 text-center">
                            <h3 className="text-xl font-semibold mb-4">Clinical Terminology Precision</h3>
                            <p className="text-sm mt-2">
                                Specialized training on clinical conversations ensures accurate capture of complex medical terms—from rare drug names to procedural terminology that generic models miss.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="border border-gray-700 rounded-lg p-10 text-center">
                            <h3 className="text-xl font-semibold mb-4">Language Support</h3>
                            <p className="text-sm mt-2">
                                Processes speech in real hospital environments—handling background noise, equipment sounds, and overlapping conversations across English, Japanese, and Korean, with more languages coming soon.
                            </p>
                        </div>
                    </div>

                    <div className='text-center pt-16 pb-6'>
                        <Link href='/contact'
                            className="px-10 py-3 rounded-full text-white text-base font-medium 
             bg-gradient-to-r from-[#361D83] to-[#145AE8]
             hover:opacity-90 transition duration-300 mt-10"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
            <HomeFooter />
            <MainFooter />
        </div>
    )
}

export default page