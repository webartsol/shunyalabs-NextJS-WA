'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
    {
        question: "What plans does Shunya Labs offer?",
        answer: (
            <div className="space-y-4 text-gray-300">
                <p>Shunya Labs offers three plans:</p>
                <p>
                    <strong className="text-white">Pay as you go</strong> — Start with $200 in free credits, then add credit as needed. There is no minimum amount for recharging.
                </p>
                <p>
                    <strong className="text-white">Volume</strong> — Buy the volume pack and get better rates for all services. Credits remain valid for the whole year and then expire.
                </p>
                <p>
                    <strong className="text-white">Enterprise</strong> — For businesses with large volumes, custom deployment needs, or dedicated support requirements, we offer bulk prices. Get in touch with us.
                </p>
            </div>
        )
    },
    {
        question: "How do I receive my free credits?",
        answer: <p className="text-gray-300">When you sign up and finish onboarding, you automatically receive $200 in free credits. No credit card is required to get started.</p>
    },
    // {
    //     question: "Is there a minimum wallet balance required to make requests?",
    //     answer: <p className="text-gray-300">Yes. Your wallet balance must be at least $1 for API requests to process successfully. Please ensure you maintain a minimum balance of $1 to avoid service interruptions.</p>
    // },
    {
        question: "Do my credits expire?",
        answer: <p className="text-gray-300">Credits on the Pay as you go plan never expire. However, Volume plan credits are valid for one year from the date of purchase and will expire after that.</p>
    },
    {
        question: "What happens when I switch plans?",
        answer: <p className="text-gray-300">If you upgrade from Pay as you go to Volume, any remaining credits in your wallet carry over and you'll immediately start enjoying discounted rates on all services. If you upgrade to Enterprise, our team will work with you to set up your custom pricing and migrate your account accordingly.</p>
    },
    {
        question: "What happens if I run out of credits on the Volume plan?",
        answer: <p className="text-gray-300">Simply top up your wallet with any amount to continue enjoying discounted Volume rates. Your plan remains active until your yearly renewal.</p>
    }
];


export default function FAQSection() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="py-20 bg-[#0B0B0F] text-white">
            <div className="max-w-[1330px] mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Frequently Asked Questions</h2>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`border border-white/10 rounded-2xl overflow-hidden transition-colors duration-300 bg-[#1A0B2E] ${activeIndex === index ? 'border-purple-500/30' : 'hover:bg-[#251042]'
                                }`}
                        >
                            <button
                                onClick={() => toggleAccordion(index)}
                                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                            >
                                <span className="text-lg font-medium pr-8">{faq.question}</span>
                                <div className={`p-2 rounded-full ${activeIndex === index ? 'bg-purple-600/20 text-white' : 'bg-white/5 text-white'}`}>
                                    {activeIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                </div>
                            </button>

                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <div className="px-6 pb-8 pt-2 border-t border-white/5 mx-6 mt-2">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
