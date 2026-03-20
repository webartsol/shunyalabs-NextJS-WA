import LatestMedia from "@/app/Layouts/LatestMedia";
import MainFooter from "@/app/Layouts/MainFooter";
import Navbar from "@/app/Layouts/Navbar";
import type { Metadata } from "next";

const mediaList = [
  {
    link: "https://hindi.news18.com/news/delhi/cancer-survivor-idea-ritu-mehrotra-shunyaa-labs-voice-ai-mood-detection-200-languages-local18-ws-l-10222482.html",
    date: "Feb 26, 2026",
    title: "कमांड के साथ आपका मूड भी पहचानेगा यह AI! कैंसर से जंग के ...",
    description: "Success Story Ritu Mehrotra Shunyaa Labs: भारत की शून्य लैब्स ने वॉइस AI इंफ्रास्ट्रक्चर में ऐसा इतिहास रचा है.",
    logo: "/assets/media/news-18.jpg",
  },
  {
    link: "https://www.tribuneindia.com/news/india/india-must-build-sovereign-infra-for-artificial-intelligence-experts/amp",
    date: "Feb 19, 2026",
    title: "India must build sovereign infra for artificial intelligence: Experts",
    description: "The time is ripe for India to bring an ‘artificial intelligence' infrastructure on the likes of digital public ...",
    logo: "/assets/media/thebuneindia.jpg",
  },
  {
    link: "https://cxotoday.com/media-coverage/shunya-labs-in-partnership-with-nasscom-launches-vak-indias-largest-open-weight-voice-ai-across-55-languages/",
    date: "Feb 19, 2026",
    title: "Shunya Labs, in partnership with Nasscom, Launches Vāķ, India’s ...",
    description: "Shunya Labs, a Nasscom GenAI Cohort 1 startup, has announced the launch of Vāķ, India’s largest open-weight ...",
    logo: "/assets/media/cxo.jpg",
  },
  {
    link: "https://analyticsindiamag.com/ai-news/shunya-labs-unveils-real-time-ai-translation-model-for-55-indian-languages",
    date: "Feb 18, 2026",
    title: "Shunya Labs Unveils Real-Time AI Translation Model for ...",
    description: "Launch Vāķ, a real-time voice translation model for 55 Indian languages, at India AI Impact Summit 2026.",
    logo: "/assets/media/aim.jpg",
  },
  {
    link: "https://cxotoday.com/media-coverage/shunya-labs-unveils-vak-a-real-time-translation-model-available-in-55-indian-languages-across-2970-translation-pairs/",
    date: "Feb 18, 2026",
    title: "Shunya Labs unveils Vāķ, a real-time translation model ...",
    description: "Open-weight translation model with voice preservation, <1.5s latency, and zero-shot cloning, enabling sovereign ...",
    logo: "/assets/media/cxo.jpg",
  },
  {
    link: "https://www.apnnews.com/shunya-labs-unveils-vak-a-real-time-translation-model-available-in-55-indian-languages-across-2970-translation-pairs/",
    date: "Feb 18, 2026",
    title: "Shunya Labs unveils Vāķ, a real-time translation model ...",
    description: "Gurugram : Shunya Labs, a Nasscom GenAI Cohort 1 startup, has announced the launch of Vāķ, India’s largest open-weight ...",
    logo: "/assets/media/apn-news-logo.jpg",
  },
  {
    link: "https://www.varindia.com/news/shunya-labs-develops-cpu-optimized-voice-ai-stack-for-the-next-billion-users",
    date: "Feb 13, 2026",
    title: "Shunya Labs develops CPU-optimized voice AI stack for ...",
    description: "Shunya Labs has announced a CPU-compatible voice AI architecture that enables high-accuracy speech recognition and multilingual ...",
    logo: "/assets/media/varindia.jpg",
  },
  {
    link: "https://enterpriseai.economictimes.indiatimes.com/news/industry/shunya-labs-launches-innovative-cpu-compatible-voice-ai-stack-for-real-time-applications/128297497",
    date: "Feb 13, 2026",
    title: "Shunya Labs unveils CPU-compatible voice AI stack for real ...",
    description: "The platform targets regulated sectors such as healthcare, BFSI and government, where low latency and data sovereignty are critical.",
    logo: "/assets/media/et-ai.jpg",
  },
  {
    link: "https://cxotoday.com/media-coverage/shunya-labs-builds-the-cpu-compatible-voice-ai-stack-for-the-next-billion-users/",
    date: "Feb 12, 2026",
    title: "Shunya Labs Builds the CPU Compatible Voice AI Stack for the ...",
    description: "Shunya Labs, a research-driven voice AI company, today announced a CPU-compatible voice AI architecture that enables ...",
    logo: "/assets/media/cxo.jpg",
  },
  {
    link: "https://m.economictimes.com/tech/artificial-intelligence/nasscom-planning-local-benchmarks-for-indic-ai-models/amp_articleshow/124218208.cms",
    date: "Sep 30, 2025",
    title: "Nasscom planning local benchmarks for Indic AI models ...",
    description: "The plan is in its early stages, with Nasscom AI, the industry body's AI initiative, set to start consultations with industry experts ...",
    logo: "/assets/media/12.png",
  },
  {
    link: "https://www.techinasia.com/indian-ai-lab-shunya-labs-clashes-hugging-face-over-nvidias-leadership",
    date: "Sep 22, 2025",
    title: "Indian AI lab challenges Hugging Face over alleged Nvidia bias",
    description: "According to the platform, its speech recognition model Pingala V1 has reached a word error rate (WER) of 3.1%. ...",
    logo: "/assets/media/11.png",
  },
  {
    link: "https://zeenews.india.com/technology/redefining-voice-tech-check-5-automatic-speech-recognition-engines-in-2025-2952829.html",
    date: "Aug 28, 2025",
    title: "Redefining Voice Tech: Check 5 Automatic Speech Recognition ...",
    description: "Speech recognition technology is evolving rapidly. Automatic Speech Recognition (ASR) engines are no longer just simple ...",
    logo: "/assets/media/10.png",
  },
  {
    link: "https://www.unite.ai/the-new-digital-divide-in-ai-why-edge-ready-cpu-first-models-will-win-the-cost-war/",
    date: "Aug 26, 2025",
    title: "The New Digital Divide in AI: Why Edge-Ready, CPU-First Models ...",
    description: "The global artificial intelligence (AI) market is expanding at a staggering pace. In 2024, it was valued at $257.68 billion, with ...",
    logo: "/assets/media/9.png",
  },
  {
    link: "https://finance.yahoo.com/news/shunya-labs-launches-pingala-v1-135500875.html?guccounter=1&guce_referrer=aHR0cHM6Ly93d3cuZ29vZ2xlLmNvbS8&guce_referrer_sig=AQAAAMtr0jnmGFiQWsfH3SgnlGfhIzj5YjDGLEAIshdW1UY5M_FG5tDC0OqCi9WV9FAOP4_IlHvya0EhubMNezysyydSXpq3OfJcj3ujbmwmWWvJydYH7IXk6yfnAMoMj_vbhj0DO4Dn9kPGrWCzjQgosW_Sx8cnY_B2GlDAENC7nJJW",
    date: "Jul 24, 2025",
    title: "Shunya Labs Launches Pingala V1: Top-Ranked CPU-Based ...",
    description: "MENLO PARK, Calif., July 24, 2025 /PRNewswire/ -- Shunya Labs, the AI infrastructure company pioneering real-time, privacy-first ...",
    logo: "/assets/media/8.png",
  },
  {
    link: "https://analyticsindiamag.com/ai-news-updates/united-we-care-launches-shunya-labs-a-voice-ai-infra-for-32-indic-languages/",
    date: "Jul 17, 2025",
    title: "United We Care’ Launches Shunya Labs, a Voice AI Infra ...",
    description: "The AI-driven mental health solutions startup has launched Shunya Labs to redefine AI speech technology.",
    logo: "/assets/media/7.png",
  },
  {
    link: "https://www.entrepreneur.com/en-in/news-and-trends/united-we-care-launches-shunya-labs-to-revolutionise-ai/494739",
    date: "Jul 17, 2025",
    title: "United We Care Launches Shunya Labs to Revolutionise AI...",
    description: "The platform supports over 32 Indic languages, including Hindi, Marathi, Assamese, and Maithili. Seven additional languages are currently being...",
    logo: "/assets/media/6.png",
  },
  {
    link: "https://www.vccircle.com/kunalshah-ashneer-grover-backed-wellness-startup-pivots-to-ai-looks-to-raise-series-a",
    date: "Jan 15, 2025",
    title: "Kunal Shah, Ashneer Grover-backed wellness startup pivots ...",
    description: "United We Care, backed by prominent investors Kunal Shah and Ashneer Grover, pivots to AI with Shunya Labs, aiming to ra...",
    logo: "/assets/media/5.png",
  },
  {
    link: "https://healthcare.financialexpressb2b.com/interviews/why-ai-still-falls-short-in-solving-healthcares-problems",
    date: "Jan 10, 2025",
    title: "Why AI Still Falls Short in Solving Healthcare's Hardest Problems...",
    description: "An in-depth analysis of AI's current limitations in healthcare and the challenges that remain in solving complex medical...",
    logo: "/assets/media/4.png",
  },
  {
    link: "https://www.smartprix.com/bytes/from-google-to-shunya-labs-whos-really-winning-the-voice-tech-arms-race/",
    date: "Jan 08, 2025",
    title: "From Google to Shunya Labs: Who's Really Winning the Voice...",
    description: "A comprehensive comparison of voice technology leaders, examining how Shunya Labs competes with tech giants like Google...",
    logo: "/assets/media/3.png",
  },
  {
    link: "https://cxotoday.com/story/5-groundbreaking-speech-recognition-engines-that-are-redefining-the-asr-landscape-in-2025/",
    date: "Jan 05, 2025",
    title: "5 Groundbreaking Speech Recognition Engines That Are...",
    description: "Featuring the top 5 speech recognition engines revolutionizing automatic speech recognition, including Shunya Labs' inno...",
    logo: "/assets/media/2.png",
  },
  {
    link: "https://cxotoday.com/story/from-talk-to-text-5-speech-recognition-engines-defining-the-pace-for-2025/",
    date: "Jan 03, 2025",
    title: "From Talk to Text: 5 Speech Recognition Engines Defining th...",
    description: "An analysis of the leading speech recognition technologies shaping 2025, highlighting breakthrough innovations in real-t...",
    logo: "/assets/media/2.png",
  },
  {
    link: "https://www.cxodigitalpulse.com/from-talk-to-text-5-speech-recognition-engines-defining-the-pace-for-2025/",
    date: "Jan 03, 2025",
    title: "From Talk to Text: 5 Speech Recognition Engines Defining th...",
    description: "Exploring the cutting-edge speech recognition engines that are setting new standards for accuracy, speed, and multilingu...",
    logo: "/assets/media/1.png",
  },
];

export default function Media() {
  return (
    <div className="bg-shunya-labs pt-24">
      <Navbar />

      <section className="relative text-white md:py-10 py-5 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">Media Coverage</h1>
          <h2 className="mt-6 text-lg md:text-2xl text-gray-300 max-w-4xl mx-auto">
            Featuring ShunyaLabs and our leadership in AI infrastructure, voice technology, and edge computing
          </h2>
        </div>
      </section>

      <div className="grid sm:grid-cols-3 gap-8 md:px-0 py-10 px-4 max-w-7xl m-auto items-center justify-center md:gap-12 gap-4">
        {mediaList.map((media:any, index) => (
          <LatestMedia
            key={index}
            link={media.link}
            date={media.date}
            title={media.title}
            description={media.description}
            logo={media.logo}
          />
        ))}
      </div>

      <MainFooter />
    </div>
  );
}
