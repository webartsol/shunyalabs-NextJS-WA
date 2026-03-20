import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Audio Processing for Voice AI & Speech Recognition | Shunya Labs",
    description: "Enhance audio quality with Shunya Labs audio processing tools. Remove noise, optimize clarity, and prepare recordings for accurate speech-to-text and voice AI applications.",
    alternates: {
        canonical: "https://www.shunyalabs.ai/audio-processing",
    },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Audio Processing for Voice AI & Speech Recognition | Shunya Labs",
    description:
      "Enhance audio quality with Shunya Labs audio processing tools. Remove noise, optimize clarity, and prepare recordings for accurate speech-to-text and voice AI applications.",
    url: "https://www.shunyalabs.ai/audio-processing",
    siteName: "Shunya Labs",
    images: [
      {
        url: "/logo-light.png",
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
    title: "Audio Processing for Voice AI & Speech Recognition | Shunya Labs",
    description:
      "Enhance audio quality with Shunya Labs audio processing tools. Remove noise, optimize clarity, and prepare recordings for accurate speech-to-text and voice AI applications.",
    images: ["/logo-light.png"],
    creator: "@ShunyaLabs",
  },
};

export default function ZeroStt({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
