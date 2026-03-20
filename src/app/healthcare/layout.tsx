import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "AI Medical Transcription & Speech Recognition for Healthcare | Shunya Labs",
    description: "Streamline clinical documentation with Shunya Labs’ AI-powered medical transcription. Convert doctor-patient conversations into accurate, secure reports with multilingual support and HIPAA-grade data privacy.",
    alternates: {
        canonical: "https://www.shunyalabs.ai/healthcare",
    },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "AI Medical Transcription & Speech Recognition for Healthcare | Shunya Labs",
    description:
      "Streamline clinical documentation with Shunya Labs’ AI-powered medical transcription. Convert doctor-patient conversations into accurate, secure reports with multilingual support and HIPAA-grade data privacy.",
    url: "https://www.shunyalabs.ai/healthcare",
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
    title: "AI Medical Transcription & Speech Recognition for Healthcare | Shunya Labs",
    description:
      "Streamline clinical documentation with Shunya Labs’ AI-powered medical transcription. Convert doctor-patient conversations into accurate, secure reports with multilingual support and HIPAA-grade data privacy.",
    images: ["/logo-light.png"],
    creator: "@ShunyaLabs",
  },
};

export default function HealthCare({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
