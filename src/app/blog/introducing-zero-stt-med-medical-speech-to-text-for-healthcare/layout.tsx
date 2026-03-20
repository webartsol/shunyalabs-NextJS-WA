import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Zero STT Med: Accurate, Real-Time Medical Speech-to-Text for Healthcare Professionals",
    description: "Zero STT Med delivers highly accurate medical speech-to-text for hospitals and clinics. Built on domain-specialized models trained on real clinical audio.",
    alternates: {
        canonical: "https://www.shunyalabs.ai/blog/introducing-zero-stt-med-medical-speech-to-text-for-healthcare",
    },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
