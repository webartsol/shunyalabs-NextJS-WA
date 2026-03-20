import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Speech Intelligence & Conversational Analytics | Shunya Labs",
    description: "Analyze conversations with Shunya Labs speech intelligence. Detect intent, sentiment, speakers, and keywords while generating summaries and multilingual transcripts.",
    alternates: {
        canonical: "https://www.shunyalabs.ai/speech-intelligence-page",
    },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Speech Intelligence & Conversational Analytics | Shunya Labs",
    description:
      "Analyze conversations with Shunya Labs speech intelligence. Detect intent, sentiment, speakers, and keywords while generating summaries and multilingual transcripts.",
    url: "https://www.shunyalabs.ai/speech-intelligence-page",
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
    title: "Speech Intelligence & Conversational Analytics | Shunya Labs",
    description:
      "Analyze conversations with Shunya Labs speech intelligence. Detect intent, sentiment, speakers, and keywords while generating summaries and multilingual transcripts.",
    images: ["/logo-light.png"],
    creator: "@ShunyaLabs",
  },
};

export default function ZeroStt({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
