'use client';

import Navbar from "@/app/Layouts/Navbar";
import Footer from "@/app/Layouts/Footer";
import MainFooter from "@/app/Layouts/MainFooter";

import { BlogHeader } from "@/app/Layouts/BlogHeader";
import "../blog.css";
import ZoomImage from "@/app/components/ZoomImage";
import htwt from '../../../../public/assets/blog/how-they-wrok-together.png'
import Link from "next/link";
import AuthorBio from "@/app/Layouts/BioNavvyaJain";

function page() {
    return (
        <div className="blog-page bg-shunya-labs">
            <Navbar />
            <div className="blog-wrapper">
                <div className="blog-card-main">
                    <div className="blog-content">
                        <BlogHeader
                            title="Code-Switching ASR Explained: Why Hinglish Breaks Every Standard Model"
                            author="Navvya Jain"
                            role="Research & Product Analyst"
                            category="AI Infrastructure"
                            date="18 Mar 2026"
                            imageSrc="/assets/blog/code-switching.png"
                        />

                        <section className="tldr-section">
                            <div className="tldr-card">

                                <p className="tldr-title">
                                    TL;DR , Key Takeaways:
                                </p>

                                <ul className="tldr-list">

                                    <li className="tldr-item">
                                        <span className="bullet">•</span>
                                        <span>
                                            Most voice technology was built for clean, single-language speech and struggles the moment someone mixes Hindi and English or any other language
                                        </span>
                                    </li>

                                    <li className="tldr-item">
                                        <span className="bullet">•</span>
                                        <span>
                                            This is not a user error. Code-switching is how hundreds of millions of Indians naturally communicate
                                        </span>
                                    </li>

                                    <li className="tldr-item">
                                        <span className="bullet">•</span>
                                        <span>
                                            Standard ASR models fail at Hinglish because of gaps in acoustic modeling, vocabulary, language modeling, and training data
                                        </span>
                                    </li>

                                    <li className="tldr-item">
                                        <span className="bullet">•</span>
                                        <span>
                                            Fixing this requires a ground-up approach, not a patch on an existing English or Hindi model
                                        </span>
                                    </li>

                                </ul>

                            </div>
                        </section>

                        <section className="blog-section">
                            <p className="blog-text">
                                Most people have been there. You are talking to a voice assistant, a customer support bot, or a speech-to-text app, and mid-sentence it completely loses you. Not because you mumbled. Not because the connection was bad. Simply because you said something like:
                            </p>
                            <p className="blog-text">
                                “Yaar, can you just reschedule the meeting to 4 baje?”
                            </p>
                            <p className="blog-text">
                                The app either returns garbled text, skips the Hindi entirely, or stares back at you with a blinking cursor that quietly implies you said something wrong. You did not. You spoke the way most people in India speak every single day, and the technology just was not built for it.
                            </p>
                            <p className="blog-text">
                                This is the code-switching problem. It sits at the heart of why so much voice technology feels broken the moment a real Indian user picks it up.
                            </p>
                        </section>

                        <section className="blog-section">
                            <h2 className="blog-heading">
                                What Code-Switching Actually Is
                            </h2>

                            <p className="blog-text">
                                Linguists have studied code-switching for decades. At its core, it is the practice of moving between two or more languages within a single conversation, sometimes within a single sentence. Bilingual and multilingual speakers do this naturally, fluidly, and often without noticing.
                            </p>
                            <p className="blog-text">
                                In India, the most prominent example is Hinglish, the blend of Hindi and English that dominates urban conversation. But code-switching in India goes far beyond Hinglish. Tamil speakers in Chennai routinely mix Tamil with English. Bengali professionals in Kolkata do the same. In the South, you get Tanglish, Kanglish, Manglish. In Maharashtra, Marathi and English weave together constantly.
                            </p>
                            <p className="blog-text">
                                The critical thing to understand is that speakers switch to convey nuance, signal social identity, fill lexical gaps, or simply because one language has a better word for the thing they are trying to say. “Jugaad” does not have an English equivalent. “Overwhelming” does not have a Hindi one that carries exactly the same feeling. So speakers use both.
                            </p>
                            <p className="blog-text">
                                When you build speech technology that cannot handle this, you are not building speech technology for India. You are building something that works for a narrow slice of formal, scripted, monolingual speech that most real users will never produce.
                            </p>
                        </section>

                        <section className="blog-section">
                            <h2 className="blog-heading">
                                Why Standard ASR Models Break Down
                            </h2>

                            <p className="blog-text">
                                To understand why Hinglish is so difficult for most ASR systems, you need to understand how those systems are built.
                            </p>
                            <p className="blog-text">
                                A standard automatic speech recognition model is trained on audio data paired with text transcriptions. The model learns to map acoustic patterns to linguistic units, usually phonemes or subword tokens, and then to string those units into words and sentences. The quality of the output depends enormously on how well the training data matches the input it will later see in production.
                            </p>
                            <p className="blog-text">
                                Most of the large ASR models in circulation today were trained overwhelmingly on English data, with some multilingual variants trained on parallel datasets in many languages, each treated as a separate, clean category. The model learns English. Or it learns Hindi. It does not learn the space between them.
                            </p>
                            <p className="blog-text">
                                When a code-switched utterance arrives, several things go wrong at once.
                            </p>
                            <p className="blog-text">
                                The acoustic model is the first point of failure. Hindi phonemes and English phonemes are genuinely different. The retroflex consonants in Hindi, the aspirated stops, the nasal vowels, these sounds do not exist in English in the same form. When a speaker slides from English into Hindi mid-sentence, the acoustic character of the audio shifts in ways a model trained only on one language is not equipped to follow.
                            </p>
                            <p className="blog-text">
                                The language model compounds the problem. Modern ASR systems use language models to help decide which word sequence is most probable given the acoustic evidence. A language model trained on English assigns near-zero probability to Hindi words appearing in an English sentence.
                            </p>
                            <p className="blog-text">
                                So even if the acoustic model correctly identifies the sounds, the language model corrects them away, replacing them with the nearest English approximation. The Hindi word “karo” becomes “cargo.” “Bata” becomes “butter.” The output is fluent-sounding nonsense.
                            </p>
                            <p className="blog-text">
                                Then there is the vocabulary problem. Code-switched speech pulls from two lexicons simultaneously. A model trained on a single language simply does not have the vocabulary to recognize words from the other. This is not a tuning issue. It is a fundamental architectural gap.
                            </p>
                            <p className="blog-text">
                                Finally, there is the prosody and rhythm problem. Hindi and English have different stress patterns, different intonation curves, and different timing structures. When speakers mix languages, the prosodic cues that ASR models use to segment words and detect sentence boundaries become unreliable. The model loses its footing even at the most basic level of figuring out where one word ends and the next begins.
                            </p>
                        </section>

                        <section className="blog-section">
                            <h2 className="blog-heading">
                                The Data Problem Nobody Wants to Talk About
                            </h2>

                            <p className="blog-text">
                                Building a model that handles code-switching well requires training data that reflects code-switching, and this is where most efforts quietly fail.
                            </p>
                            <p className="blog-text">
                                Collecting naturalistic code-switched speech is hard. You cannot simply crawl the web for audio in the way you can for text. You need real conversations, real phone calls, real customer interactions where people are speaking the way they actually speak rather than performing a scripted version of their language for a microphone. That data is expensive to collect, ethically sensitive to handle, and time-consuming to transcribe accurately.
                            </p>
                            <p className="blog-text">
                                Transcribing code-switched speech is its own challenge. A transcriber fluent in Hindi may not accurately capture English portions and vice versa. Annotation guidelines for mixed-language text are not standardized. The same utterance might be written differently by ten different annotators, with inconsistent choices about spelling, script (Devanagari vs. Roman), and word boundaries.
                            </p>
                            <p className="blog-text">
                                This is one of the main reasons large general-purpose models perform so poorly on mixed languages despite performing reasonably well on them separately. The training data simply does not contain enough naturalistic code-switched examples to teach the model what to do when languages collide.
                            </p>
                        </section>

                        <section className="blog-section">
                            <h2 className="blog-heading">
                                What It Actually Takes to Solve This
                            </h2>

                            <p className="blog-text">
                                The first is building language-agnostic acoustic representations.
                            </p>
                            <p className="blog-text">
                                Rather than training separate acoustic models for each language and hoping they transfer, you train a single model on multilingual data with enough phonemic overlap to build shared representations. The model learns to represent sounds at a level of abstraction that generalizes across language boundaries.
                            </p>
                            <p className="blog-text">
                                The second is expanding the vocabulary and tokenization strategy.
                            </p>
                            <p className="blog-text">
                                Code-switched models need subword vocabularies that include units from both languages, and they need language identification signals that tell the language model which lexical distribution to draw from at any given moment. Some architectures do this with explicit language ID tags; others learn to do it implicitly from patterns in the training data.
                            </p>
                            <p className="blog-text">
                                The third, and in some ways the most important, is training on real code-switched data at scale.
                            </p>
                            <p className="blog-text">
                                There is no shortcut here. A model that has never been trained on Hinglish will not suddenly learn to handle Hinglish because it has seen a lot of Hindi and a lot of English. The mixing patterns, the syntactic borrowings, the phonological adaptations that happen when languages blend, these are things the model has to learn from examples.
                            </p>
                        </section>

                        <section className="blog-section">
                            <h2 className="blog-heading">
                                Where Shunya Labs Fits Into This
                            </h2>

                            <p className="blog-text">
                                At <a href="/" target="_blank">Shunya Labs</a>, this is not a theoretical problem. It is the core of what the team has been building toward.
                            </p>
                            <p className="blog-text">
                                Shunya Labs was designed from the ground up for the way people actually communicate. That means training on data that includes code-switched speech rather than treating it as noise to be filtered out. It means building a vocabulary and acoustic model that can handle the phonemic landscape of Indian languages without forcing every utterance through an English or formal Hindi lens. And it means testing against real-world speech that reflects the diversity of accents, dialects, and mixing patterns that show up when a product reaches users across the country.
                            </p>
                            <p className="blog-text">
                                The result is an ASR system that can handle a sentence like “Kya aap mujhe tomorrow ka schedule send kar sakte ho?” without losing the thread. Because the model was trained to understand the structure and patterns of code-switched speech at a deeper level.
                            </p>
                            <p className="blog-text">
                                At <a href="/" target="_blank">Shunya Labs</a> the speech technology work for the full range of Indian communication, not a filtered version of it. If you are building a voice product for India and your ASR only works when users speak like they are dictating a formal document, you are building on a foundation that will crack the moment real users show up.
                            </p>
                        </section>

                        <section className="blog-section">
                            <h2 className="blog-heading">
                                Why This Matters for Products Built on Voice
                            </h2>

                            <p className="blog-text">
                                The business case for getting this right is more straightforward than it might seem.
                            </p>
                            <p className="blog-text">
                                Voice interfaces in India are not a nice-to-have. For a significant portion of the population, they are the most natural and accessible way to interact with technology. Voice search, voice-driven customer support, voice-based financial services, these are not futuristic applications. They are live, growing markets where the quality of the underlying speech recognition directly determines whether the product works or fails.
                            </p>
                            <p className="blog-text">
                                Every percentage point of word error rate on code-switched speech is not an abstract benchmark number. It is a user who could not complete their task. It is a customer service interaction that went sideways because the system misheard a key instruction. It is a farmer who could not access agricultural information because the voice interface could not parse the way he naturally speaks.
                            </p>
                        </section>
                        <section className="blog-section">
                            <h2 className="blog-heading">
                                Building Speech That Reflects Reality
                            </h2>

                            <p className="blog-text">
                               Standard ASR models were built for a world where speakers are monolingual, accents are predictable, and language boundaries are clean. That world never really existed, and it certainly does not describe India.
                            </p>
                            <p className="blog-text">
                               The path forward is to build models complex enough to meet users where they are.
                            </p>
                        </section>

                        <div className="mt-16">
                            <AuthorBio />
                        </div>
                    </div>
                </div>
            </div>



            <Footer
                title="The fastest way to add voice AI to your products"
                text="One platform for speech in and speech out."
            />

            <MainFooter />

        </div>
    )
}

export default page