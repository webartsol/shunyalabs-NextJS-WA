import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Data Privacy & Protection Policy | Shunya Labscy Policy",
    description: "Your privacy matters to us. Learn how Shunya Labs safeguards your personal information, ensures GDPR compliance, and upholds the highest standards of data protection.",
    alternates: {
        canonical: "https://www.shunyalabs.ai/privacy-policy",
    },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Data Privacy & Protection Policy | Shunya Labscy Policy",
    description:
      "Your privacy matters to us. Learn how Shunya Labs safeguards your personal information, ensures GDPR compliance, and upholds the highest standards of data protection.",
    url: "https://www.shunyalabs.ai/privacy-policy",
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
    title: "Data Privacy & Protection Policy | Shunya Labscy Policy",
    description:
      "Your privacy matters to us. Learn how Shunya Labs safeguards your personal information, ensures GDPR compliance, and upholds the highest standards of data protection.",
    images: ["/logo-light.png"],
    creator: "@ShunyaLabs",
  },
};

export default function PrivacyPolicy({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
