import { MetadataRoute } from "next";
import { DOCS_URL } from "./utils/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2025-10-25");

  return [
    {
      url: "https://www.shunyalabs.ai/",
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: "https://www.shunyalabs.ai/zero-stt",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://www.shunyalabs.ai/zero-med",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://www.shunyalabs.ai/contact-centers",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://www.shunyalabs.ai/media-entertainment",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://www.shunyalabs.ai/healthcare",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://www.shunyalabs.ai/blog",
      lastModified,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: "https://www.shunyalabs.ai/about",
      lastModified,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: "https://www.shunyalabs.ai/media",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${DOCS_URL}/overview`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://www.shunyalabs.ai/pricing",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://www.shunyalabs.ai/contact",
      lastModified,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: "https://www.shunyalabs.ai/privacy-policy",
      lastModified,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: "https://www.shunyalabs.ai/terms-conditions",
      lastModified,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: "https://www.shunyalabs.ai/security-policy",
      lastModified,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    // Blog posts
    {
      url: "https://www.shunyalabs.ai/blog/getting-started-with-asr-apis-python-quickstart",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://www.shunyalabs.ai/blog/getting-started-with-asr-apis-node-js-quickstart",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://www.shunyalabs.ai/blog/benchmarking-top-open-source-speech-recognition-models",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://www.shunyalabs.ai/blog/top-10-ai-transcription-tools-a-simple-comparison",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://www.shunyalabs.ai/blog/speech-to-text-ai-in-action-top-10-use-cases-across-industries",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: "https://www.shunyalabs.ai/blog/automatic-speech-recognition-explained-everything-you-need-to-know-about-asr",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    // Documentation
    {
      url: `${DOCS_URL}/models`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${DOCS_URL}/languages`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${DOCS_URL}/scripts`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
