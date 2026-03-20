import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Zero STT Med: Accurate, Real-Time Medical Speech-to-Text for Healthcare Professionals",
    description: "Zero STT Med delivers highly accurate medical speech-to-text for hospitals and clinics. Built on domain-specialized models trained on real clinical audio.",
    alternates: {
        canonical: "https://www.shunyalabs.ai/blog/introducing-zero-stt-med-medical-speech-to-text-for-healthcare",
    },
	icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Zero STT Med: Accurate, Real-Time Medical Speech-to-Text for Healthcare Professionals",
    description: "Zero STT Med delivers highly accurate medical speech-to-text for hospitals and clinics. Built on domain-specialized models trained on real clinical audio.",
    url: "https://www.shunyalabs.ai/",
    siteName: "Shunya Labs",
    images: [
      {
        url: "/assets/blog/introducing-zero-stt.jpg",
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
    title: "Zero STT Med: Accurate, Real-Time Medical Speech-to-Text for Healthcare Professionals",
    description: "Zero STT Med delivers highly accurate medical speech-to-text for hospitals and clinics. Built on domain-specialized models trained on real clinical audio.",
    images: ["/assets/blog/introducing-zero-stt.jpg"],
    creator: "@ShunyaLabs",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
