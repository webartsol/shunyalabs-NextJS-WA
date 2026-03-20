import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Top 10 AI Transcription Tools in 2025 | Simple Comparison Guide",
    description:
        "Discover the top 10 AI transcription tools of 2025. Compare accuracy, pricing, and features to find the best speech-to-text software for your needs.",
    alternates: {
        canonical: "https://www.shunyalabs.ai/blog/top-10-ai-transcription-tools-a-simple-comparison",
    },
	icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Top 10 AI Transcription Tools in 2025 | Simple Comparison Guide",
    description:
        "Discover the top 10 AI transcription tools of 2025. Compare accuracy, pricing, and features to find the best speech-to-text software for your needs.",
    url: "https://www.shunyalabs.ai/",
    siteName: "Shunya Labs",
    images: [
      {
        url: "/assets/blog/AI-Trends.png",
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
    title: "Top 10 AI Transcription Tools in 2025 | Simple Comparison Guide",
    description:
        "Discover the top 10 AI transcription tools of 2025. Compare accuracy, pricing, and features to find the best speech-to-text software for your needs.",
    images: ["/assets/blog/AI-Trends.png"],
    creator: "@ShunyaLabs",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
