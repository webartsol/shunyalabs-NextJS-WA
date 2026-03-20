import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Medical Transcription API Documentation | Shunya Labs",
    description: "Learn how to implement medical speech-to-text with Shunya Labs. Convert clinical conversations into accurate, structured transcripts using healthcare-trained AI models.",
    alternates: {
        canonical: "https://www.shunyalabs.ai/documentation/medical-transcription",
    },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Medical Transcription API Documentation | Shunya Labs",
    description:
      "Learn how to implement medical speech-to-text with Shunya Labs. Convert clinical conversations into accurate, structured transcripts using healthcare-trained AI models.",
    url: "https://www.shunyalabs.ai/documentation/medical-transcription",
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
    title: "Medical Transcription API Documentation | Shunya Labs",
    description:
      "Learn how to implement medical speech-to-text with Shunya Labs. Convert clinical conversations into accurate, structured transcripts using healthcare-trained AI models.",
    images: ["/logo-light.png"],
    creator: "@ShunyaLabs",
  },
};

export default function ZeroStt({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
