import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Shunya Labs Pricing",
    description: "Shunya Labs Pricing for Creators &amp; Businesses of All Sizes",
    alternates: {
        canonical: "https://www.shunyalabs.ai/pricing",
    },
  };

export default function Pricing({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
