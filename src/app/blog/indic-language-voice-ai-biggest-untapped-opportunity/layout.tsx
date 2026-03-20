import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Why Indic Language Voice AI Is the Most Underserved AI Market",
    description: "Why do standard speech APIs fail for Hindi, Tamil & Marathi users? We break down the Indic voice AI gap, the technical reasons, and what production-grade looks like.",
    alternates: {
        canonical: "https://www.shunyalabs.ai/blog/indic-language-voice-ai-biggest-untapped-opportunity",
    },
icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Why Indic Language Voice AI Is the Most Underserved AI Market",
    description: "Why do standard speech APIs fail for Hindi, Tamil & Marathi users? We break down the Indic voice AI gap, the technical reasons, and what production-grade looks like.",
    url: "https://www.shunyalabs.ai/",
    siteName: "Shunya Labs",
    images: [
      {
        url: "/assets/blog/why-indec-language.png",
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
    title: "Why Indic Language Voice AI Is the Most Underserved AI Market",
    description: "Why do standard speech APIs fail for Hindi, Tamil & Marathi users? We break down the Indic voice AI gap, the technical reasons, and what production-grade looks like.",
    images: ["/assets/blog/why-indec-language.png"],
    creator: "@ShunyaLabs",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
