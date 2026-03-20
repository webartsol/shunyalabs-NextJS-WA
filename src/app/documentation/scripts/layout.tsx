import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Scripts Documentation for Speech-to-Text API | Shunya Labs",
    description: "Learn how to generate structured conversation scripts using the Shunya Labs speech-to-text API. Format transcripts with speaker labels, timestamps, and dialogue structure.",
    alternates: {
        canonical: "https://www.shunyalabs.ai/documentation/scripts",
    },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Scripts Documentation for Speech-to-Text API | Shunya Labs",
    description:
      "Learn how to generate structured conversation scripts using the Shunya Labs speech-to-text API. Format transcripts with speaker labels, timestamps, and dialogue structure.",
    url: "https://www.shunyalabs.ai/documentation/scripts",
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
    title: "Scripts Documentation for Speech-to-Text API | Shunya Labs",
    description:
      "Learn how to generate structured conversation scripts using the Shunya Labs speech-to-text API. Format transcripts with speaker labels, timestamps, and dialogue structure.",
    images: ["/logo-light.png"],
    creator: "@ShunyaLabs",
  },
};

export default function ZeroStt({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
