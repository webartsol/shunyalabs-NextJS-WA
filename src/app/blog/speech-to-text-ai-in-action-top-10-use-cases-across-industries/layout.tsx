import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Speech-to-Text AI Applications: Top 10 Industry Use Cases",
    description: "Discover how speech-to-text AI transforms healthcare, education, finance, and more. Explore 10 real-world use cases driving innovation across industries.",
    alternates: {
        canonical: "https://www.shunyalabs.ai/blog/speech-to-text-ai-in-action-top-10-use-cases-across-industries",
    },
	icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Speech-to-Text AI Applications: Top 10 Industry Use Cases",
    description: "Discover how speech-to-text AI transforms healthcare, education, finance, and more. Explore 10 real-world use cases driving innovation across industries.",
    url: "https://www.shunyalabs.ai/",
    siteName: "Shunya Labs",
    images: [
      {
        url: "/assets/blog/Use-cases.png",
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
    title: "Speech-to-Text AI Applications: Top 10 Industry Use Cases",
    description: "Discover how speech-to-text AI transforms healthcare, education, finance, and more. Explore 10 real-world use cases driving innovation across industries.",
    images: ["/assets/blog/Use-cases.png"],
    creator: "@ShunyaLabs",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
