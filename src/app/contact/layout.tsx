import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Shunya Labs",
    description: "Contact Shunya Labs",
    alternates: {
        canonical: "https://www.shunyalabs.ai/contact",
    },
  };

export default function ContactPage({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
