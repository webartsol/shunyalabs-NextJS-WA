import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Automatic Speech Recognition (ASR) & Speech to Text Explained | Complete Guide",
    description: "Discover how Automatic Speech Recognition (ASR) and speech-to-text technology work, their benefits, challenges, and future. Learn why ASR powers everything from Siri to smart devices.",
     alternates: {
        canonical: "https://www.shunyalabs.ai/blog/automatic-speech-recognition-explained-everything-you-need-to-know-about-asr",
    },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Automatic Speech Recognition (ASR) & Speech to Text Explained | Complete Guide",
    description: "Discover how Automatic Speech Recognition (ASR) and speech-to-text technology work, their benefits, challenges, and future. Learn why ASR powers everything from Siri to smart devices.",
    url: "https://www.shunyalabs.ai/",
    siteName: "Shunya Labs",
    images: [
      {
        url: "/assets/blog/Engineering-and-research.png",
        width: 1200,
        height: 630,
        alt: "Shunya Labs",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Automatic Speech Recognition (ASR) & Speech to Text Explained | Complete Guide",
    description: "Discover how Automatic Speech Recognition (ASR) and speech-to-text technology work, their benefits, challenges, and future. Learn why ASR powers everything from Siri to smart devices.",
    images: ["/assets/blog/Engineering-and-research.png"],
    creator: "@ShunyaLabs",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
