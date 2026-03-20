"use client";
import { useState } from "react";
import SidebarItem from "./SidebarItem";

const menu = [
  {
    title: "Livestream Transcriptions",
    sub: ["Quickstart", "Input", "Output", "Troubleshooting"],
  },
  {
    title: "Batch Transcriptions",
    sub: ["Quickstart", "Input", "Output", "Troubleshooting"],
  },
  // { title: "Models" },
  { title: "Medical Transcription" },
  { title: "Languages" },
  {
    title: "Models",
    sub: ["Language Models", "Domain Specialization", "On-Device Models"],
  },
  { title: "Scripts" },
  {
    title: "Features",
    sub: [
      "Language Identification",
      "Translation",
      "Translitration",
      "Speaker Diarization",
      "Speaker Identification",
      "Word Timestamps",
      "Summarization",
      "Intent Detection",
      "Sentiment Analysis",
    ],
  },
];

export default function Sidebar() {
  const [open, setOpen] = useState<string | null>(null);

  const handleClick = (title: string) => {
    setOpen((prev) => (prev === title ? null : title));
  };

  return (
    <div>
      <h1 className="text-gray-700 font-semibold mb-4 text-lg ms-2">
        Speech to text
      </h1>

      {/* ✅ Other menu items */}
      <nav className="space-y-2">
        {menu.map((item) => (
          <SidebarItem
            key={item.title}
            title={item.title}
            sub={item.sub}
            isOpen={open === item.title}
            onClick={() => handleClick(item.title)}
          />
        ))}
      </nav>
    </div>
  );
}
