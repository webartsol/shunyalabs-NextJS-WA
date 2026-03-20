import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Getting Started with ASR APIs | Python Quickstart Guide",
    description: "Most voice technology was built for clean, single-language speech and struggles the moment someone mixes Hindi and English or any other language",
    alternates: {
        canonical: "https://www.shunyalabs.ai/blog/code-switching-asr-explained",
    },
	icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Getting Started with ASR APIs | Python Quickstart Guide",
    description: "Most voice technology was built for clean, single-language speech and struggles the moment someone mixes Hindi and English or any other language",
    url: "https://www.shunyalabs.ai/",
    siteName: "Shunya Labs",
    images: [
      {
        url: "/assets/blog/code-switching.png",
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
    title: "Getting Started with ASR APIs | Python Quickstart Guide",
    description: "Most voice technology was built for clean, single-language speech and struggles the moment someone mixes Hindi and English or any other language",
    images: ["/assets/blog/code-switching.png"],
    creator: "@ShunyaLabs",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
