import { FiArrowRight } from 'react-icons/fi';

const FEATURES = [
  {
    title: 'Accurate medical transcription',
    desc:
      'High-accuracy medical ASR tuned for clinical jargon and noisy real-world audio. Built for compliance.',
    cta: 'See how in docs',
  },
  {
    title: 'Sentiment Analysis',
    desc:
      'Understand customer sentiment from calls and voice notes. Useful for QA and automated routing.',
    cta: 'See how in docs',
  },
  {
    title: 'PII Redaction',
    desc:
      'Automatically detect and redact sensitive data (PII/PHI) before storage to simplify compliance.',
    cta: 'See how in docs',
  },
];

export default function FeatureCards() {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">What you can build next</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {FEATURES.map((f) => (
          <article
            key={f.title}
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <div className="aspect-[4/3] rounded-xl bg-white/10 mb-4" />
            <h3 className="text-base font-semibold">{f.title}</h3>
            <p className="text-sm text-gray-300 mt-2">{f.desc}</p>

            <button className="mt-4 inline-flex items-center gap-2 text-sm text-white/90 hover:text-white">
              {f.cta} <FiArrowRight />
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
