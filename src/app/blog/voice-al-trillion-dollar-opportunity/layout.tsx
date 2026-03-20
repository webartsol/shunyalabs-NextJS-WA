import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Why Voice AI Isn’t Just Automation, It’s the Next Trillion-Dollar Enterprise Platform",
    description: "Voice AI is entering its breakthrough moment. Explore how capturing signals, commitments, and decisions from conversations could create the next trillion-dollar enterprise platform.",
    alternates: {
        canonical: "https://www.shunyalabs.ai/blog/voice-al-trillion-dollar-opportunity",
    },
	icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Why Voice AI Isn’t Just Automation, It’s the Next Trillion-Dollar Enterprise Platform",
    description: "Voice AI is entering its breakthrough moment. Explore how capturing signals, commitments, and decisions from conversations could create the next trillion-dollar enterprise platform.",
    url: "https://www.shunyalabs.ai/",
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
   title: "Why Voice AI Isn’t Just Automation, It’s the Next Trillion-Dollar Enterprise Platform",
    description: "Voice AI is entering its breakthrough moment. Explore how capturing signals, commitments, and decisions from conversations could create the next trillion-dollar enterprise platform.",
    images: ["/logo-light.png"],
    creator: "@ShunyaLabs",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
