import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "AI Patents & Innovations in Voice and Language AI | Shunya Labs",
    description: "Explore Shunya Labs patents covering speech AI, LLM safety, clinical AI systems, and multilingual language technologies powering next-generation voice intelligence.",
    alternates: {
        canonical: "https://www.shunyalabs.ai/patents",
    },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "AI Patents & Innovations in Voice and Language AI | Shunya Labs",
    description:
      "Explore Shunya Labs patents covering speech AI, LLM safety, clinical AI systems, and multilingual language technologies powering next-generation voice intelligence.",
    url: "https://www.shunyalabs.ai/patents",
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
    title: "AI Patents & Innovations in Voice and Language AI | Shunya Labs",
    description:
      "Explore Shunya Labs patents covering speech AI, LLM safety, clinical AI systems, and multilingual language technologies powering next-generation voice intelligence.",
    images: ["/logo-light.png"],
    creator: "@ShunyaLabs",
  },
};

export default function ZeroStt({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
