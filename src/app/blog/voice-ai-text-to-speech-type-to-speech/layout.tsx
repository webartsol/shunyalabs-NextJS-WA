import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Voice AI, Text to Speech & Type to Speech: The Technologies Quietly Changing How We Communicate",
    description: "Understand the real difference between Voice AI, Text to Speech, and Type to Speech. Learn how Shunya Labs is building the tools that make spoken communication smarter, faster, and more human.",
    alternates: {
        canonical: "https://www.shunyalabs.ai/blog/voice-ai-text-to-speech-type-to-speech",
    },
	icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Voice AI, Text to Speech & Type to Speech: The Technologies Quietly Changing How We Communicate",
    description: "Understand the real difference between Voice AI, Text to Speech, and Type to Speech. Learn how Shunya Labs is building the tools that make spoken communication smarter, faster, and more human.",
    url: "https://www.shunyalabs.ai/",
    siteName: "Shunya Labs",
    images: [
      {
        url: "/assets/blog/type-to-speech.png",
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
    title: "Voice AI, Text to Speech & Type to Speech: The Technologies Quietly Changing How We Communicate",
    description: "Understand the real difference between Voice AI, Text to Speech, and Type to Speech. Learn how Shunya Labs is building the tools that make spoken communication smarter, faster, and more human.",
    images: ["/assets/blog/type-to-speech.png"],
    creator: "@ShunyaLabs",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
