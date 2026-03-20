import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "How to Choose a Speech AI Platform for Indian Enterprise in 2026",
    description: "Not all speech AI platforms work for your language, your audio, or your compliance needs. Here is a practical evaluation framework with the six criteria that actually matter in 2026.",
    alternates: {
        canonical: "https://www.shunyalabs.ai/blog/how-to-choose-a-speech-ai-platform",
    },
icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "How to Choose a Speech AI Platform for Indian Enterprise in 2026",
    description: "Not all speech AI platforms work for your language, your audio, or your compliance needs. Here is a practical evaluation framework with the six criteria that actually matter in 2026.",
    url: "https://www.shunyalabs.ai/",
    siteName: "Shunya Labs",
    images: [
      {
        url: "/assets/blog/speech-aI-platform.png",
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
    title: "How to Choose a Speech AI Platform for Indian Enterprise in 2026",
    description: "Not all speech AI platforms work for your language, your audio, or your compliance needs. Here is a practical evaluation framework with the six criteria that actually matter in 2026.",
    images: ["/assets/blog/speech-aI-platform.png"],
    creator: "@ShunyaLabs",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
