import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Voice AI Research & Publications | Shunya Labs",
    description: "Explore Shunya Labs research in voice AI, speech recognition, and multilingual language models. Discover patents, papers, and innovations powering next-generation voice agents.",
    alternates: {
        canonical: "https://www.shunyalabs.ai/research",
    },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Voice AI Research & Publications | Shunya Labs",
    description:
      "Explore Shunya Labs research in voice AI, speech recognition, and multilingual language models. Discover patents, papers, and innovations powering next-generation voice agents.",
    url: "https://www.shunyalabs.ai/research",
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
    title: "Voice AI Research & Publications | Shunya Labs",
    description:
      "Explore Shunya Labs research in voice AI, speech recognition, and multilingual language models. Discover patents, papers, and innovations powering next-generation voice agents.",
    images: ["/logo-light.png"],
    creator: "@ShunyaLabs",
  },
};

export default function ZeroStt({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
