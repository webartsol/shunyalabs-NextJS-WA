"use client";
import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    __ASR_GA_EVENT_BOUND__?: boolean;
  }
}

export default function GaEventBinder() {
  useEffect(() => {
    const asrButtons = [
      {
        buttonText: "Speach to Text",
        id: "ASR_STT_button",
        event_category: "ASR STT",
        language: "",
      },
      {
        buttonText: "Language",
        id: "ASR_STT_language",
        event_category: "ASR STT",
        language: "",
      },
      {
        buttonText: "Customer Support Call",
        id: "ASR_STT_customer_support",
        event_category: "ASR STT",
        language: "",
      },
      {
        buttonText: "Podcast",
        id: "ASR_STT_podcast",
        event_category: "ASR STT",
        language: "",
      },
      {
        buttonText: "Upload",
        id: "ASR_STT_upload",
        event_category: "ASR STT",
        language: "",
      },
      {
        buttonText: "Start Speaking",
        id: "ASR_STT_start_speaking",
        event_category: "ASR STT",
        language: "",
      },
      {
        buttonText: "Start Speaking Copy",
        id: "ASR_STT_start_speaking_copy",
        event_category: "ASR STT",
        language: "",
      },
      {
        buttonText: "Play Icon",
        id: "ASR_STT_customer_support_play",
        event_category: "ASR STT",
        language: "",
      },
      {
        buttonText: "Play Icon",
        id: "ASR_STT_podcast_play",
        event_category: "ASR STT",
        language: "",
      },
      {
        buttonText: "Copy Icon",
        id: "ASR_STT_customer_support_copy",
        event_category: "ASR STT",
        language: "",
      },
      {
        buttonText: "Copy Icon",
        id: "ASR_STT_podcast_copy",
        event_category: "ASR STT",
        language: "",
      },
      {
        buttonText: "Medical Transcription",
        id: "ASR_MT_button",
        event_category: "ASR MT",
        language: "",
      },
      {
        buttonText: "Language",
        id: "ASR_MT_language",
        event_category: "ASR MT",
        language: "",
      },
      {
        buttonText: "Patient Notes",
        id: "ASR_MT_patient_notes",
        event_category: "ASR MT",
        language: "",
      },
      {
        buttonText: "Doctor's Appointment",
        id: "ASR_MT_doctor_appointment",
        event_category: "ASR MT",
        language: "",
      },
      {
        buttonText: "Upload",
        id: "ASR_MT_upload",
        event_category: "ASR MT",
        language: "",
      },
      {
        buttonText: "Start Speaking",
        id: "ASR_MT_start_speaking",
        event_category: "ASR MT",
        language: "",
      },
      {
        buttonText: "Start Speaking Copy",
        id: "ASR_MT_start_speaking_copy",
        event_category: "ASR MT",
        language: "",
      },
      {
        buttonText: "Play Icon",
        id: "ASR_MT_customer_support_play",
        event_category: "ASR MT",
        language: "",
      },
      {
        buttonText: "Play Icon",
        id: "ASR_Play_Btn",
        event_category: "ASR Play Btn",
        language: "",
      },
      {
        buttonText: "Play Icon",
        id: "ASR_MT_podcast_play",
        event_category: "ASR MT",
        language: "",
      },
      {
        buttonText: "Copy Icon",
        id: "ASR_MT_customer_support_copy",
        event_category: "ASR MT",
        language: "",
      },
      {
        buttonText: "Copy Icon",
        id: "ASR_MT_podcast_copy",
        event_category: "ASR MT",
        language: "",
      },
      {
        buttonText: "Copy Icon",
        id: "ASR_copy",
        event_category: "ASR Copy",
        language: "",
      },
      {
        buttonText: "Stop Recording",
        id: "ASR_STT_stop_recording",
        event_category: "ASR STT stop recording",
        language: "",
      },

      {
        buttonText: "Hugging Face",
        id: "hugging_face_button",
        event_category: "hugging_face_button",
        language: "",
      },
    ];
    const setup = () => {
      // Attach a single global click listener
      // Avoid multiple listeners
      if (!window.__ASR_GA_EVENT_BOUND__) {
        window.__ASR_GA_EVENT_BOUND__ = true; // mark as bound once

        document.addEventListener("click", (event: any) => {
          const target = event.target.closest("[id]");
          if (!target) return;

          const btn = asrButtons.find(
            (b) => target.id === b.id.replace("#", "")
          );
          if (!btn) return; // not one of our tracked buttons

          // Optional: prevent rapid multiple clicks (within 1 second)
          if (target.dataset.gaClickLock === "true") return;
          target.dataset.gaClickLock = "true";
          setTimeout(() => (target.dataset.gaClickLock = "false"), 1000);

          // console.log(`🎯 GA Event fired for: ${target.id}`);

          window.gtag?.("event", target.id, {
            event_category: btn.event_category,
            event_label: btn.buttonText,
            button_id: btn.id,
            language: btn.language || "default",
          });
        });
      }

    };
    setup();
  }, []);

  return null;
}
