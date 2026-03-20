import Link from "next/link";

type FooterProps = {
  text: string;
  title?:string
};

export default function Footer({
    text,
    title='Get Started'
}: FooterProps) {
    return (
        <footer className="w-full bg-[#111] text-center py-16 border-t border-gray-800">
            <div className="max-w-3xl mx-auto px-4">
                <p className="text-white text-2xl font-semibold mb-3">{title}</p>
                <p className="text-gray-400 mb-8">
                    {text}
                </p>

                <div className="flex justify-center gap-4">
                    <Link
                        href="/pricing"
                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2 rounded-full transition"
                    >
                        Try for Free
                    </Link>
                    <Link
                        href="/contact"
                        className="bg-white hover:bg-gray-100 text-black text-sm font-semibold px-6 py-2 rounded-full transition"
                    >
                        Contact Sales
                    </Link>
                </div>
            </div>
        </footer>
    );
}
