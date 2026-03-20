import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Code-Switching ASR Explained: Why Hinglish Breaks Every Standard Model",
    description: "Explore how to use Automatic Speech Recognition (ASR) APIs in Python. Follow this quickstart to transcribe audio to text and create powerful voice-enabled applications.",
    alternates: {
        canonical: "https://www.shunyalabs.ai/blog/getting-started-with-asr-apis-python-quickstart",
    },
	icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Code-Switching ASR Explained: Why Hinglish Breaks Every Standard Model",
    description: "Explore how to use Automatic Speech Recognition (ASR) APIs in Python. Follow this quickstart to transcribe audio to text and create powerful voice-enabled applications.",
    url: "https://www.shunyalabs.ai/",
    siteName: "Shunya Labs",
    images: [
      {
        url: "/assets/blog/Build-and-Learn.png",
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
    title: "Code-Switching ASR Explained: Why Hinglish Breaks Every Standard Model",
    description: "Explore how to use Automatic Speech Recognition (ASR) APIs in Python. Follow this quickstart to transcribe audio to text and create powerful voice-enabled applications.",
    images: ["/assets/blog/Build-and-Learn.png"],
    creator: "@ShunyaLabs",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
