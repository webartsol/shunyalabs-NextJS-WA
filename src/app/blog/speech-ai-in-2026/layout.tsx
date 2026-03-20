import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Speech AI in 2026: What It Is and How Real-Time Voice is Changing Every Industry",
    description: "Speech AI went from experiment to infrastructure in 2026. Here is what it actually is, what drove the explosion, and how real-time voice is already reshaping India across every industry.",
    alternates: {
        canonical: "https://www.shunyalabs.ai/blog/speech-ai-in-2026",
    },
	icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Speech AI in 2026: What It Is and How Real-Time Voice is Changing Every Industry",
    description: "Speech AI went from experiment to infrastructure in 2026. Here is what it actually is, what drove the explosion, and how real-time voice is already reshaping India across every industry.",
    url: "https://www.shunyalabs.ai/",
    siteName: "Shunya Labs",
    images: [
      {
        url: "/assets/blog/speech-ai-in-2026.jpg",
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
    title: "Speech AI in 2026: What It Is and How Real-Time Voice is Changing Every Industry",
    description: "Speech AI went from experiment to infrastructure in 2026. Here is what it actually is, what drove the explosion, and how real-time voice is already reshaping India across every industry.",
    images: ["/assets/blog/speech-ai-in-2026.jpg"],
    creator: "@ShunyaLabs",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
