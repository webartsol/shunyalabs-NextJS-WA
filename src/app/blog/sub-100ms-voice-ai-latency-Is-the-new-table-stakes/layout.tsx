import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Why Sub-100ms Voice AI Latency Is the New Table Stakes",
    description: "Voice AI latency below 500ms is no longer a differentiator. It is the baseline expectation. Here is where the time goes, why pipelines break, and how to fix each layer.",
    alternates: {
        canonical: "https://www.shunyalabs.ai/blog/sub-100ms-voice-ai-latency-Is-the-new-table-stakes",
    },
	icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
     title: "Why Sub-100ms Voice AI Latency Is the New Table Stakes",
    description: "Voice AI latency below 500ms is no longer a differentiator. It is the baseline expectation. Here is where the time goes, why pipelines break, and how to fix each layer.",
    url: "https://www.shunyalabs.ai/",
    siteName: "Shunya Labs",
    images: [
      {
        url: "/assets/blog/why-sub-100ms.jpg",
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
     title: "Why Sub-100ms Voice AI Latency Is the New Table Stakes",
    description: "Voice AI latency below 500ms is no longer a differentiator. It is the baseline expectation. Here is where the time goes, why pipelines break, and how to fix each layer.",
    images: ["/assets/blog/why-sub-100ms.jpg"],
    creator: "@ShunyaLabs",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
