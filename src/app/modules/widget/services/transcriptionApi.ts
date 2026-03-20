// Transcription API Service
// This service handles all API calls related to audio transcription according to API_IMPLEMENTATION_DETAILS.md
import { getLanguageNameByCode } from "../config/language-mapping";

export interface TranscriptionOptions {
  language: string;
  speakerCount: number;
  quality: string;
  realTime: boolean;
}

export interface TranscriptionSegment {
  start: number;
  end: number;
  text: string;
  speaker: string;
}

export interface TranscriptionResult {
  success: boolean;
  text: string;
  segments: TranscriptionSegment[];
  detected_language: string;
  language_probability: number;
  total_segments: number;
  chunks_processed: number;
  chunk_size_seconds: number;
  filename: string;
  total_time: number;
  model_used: string;
  has_speaker_diarization: boolean;
  unique_speakers: string[];
  diarization_time: number;
  audio_duration?: number;
  speakers?: any[];
}

export interface UploadResponse {
  upload_id: string;
  status: string;
  estimated_time: string;
}

export interface StatusResponse {
  status: string;
  progress: number;
  transcript_ready: boolean;
}

class TranscriptionApiService {
  private baseUrl = "/api/vak"; // Legacy methods fallback
  private _sessionToken: string | null = null;

  setSessionToken(token: string | null) {
    this._sessionToken = token;
  }

  // Main transcription method according to API specification
  async transcribeAudio(
    audioBlob: Blob,
    languageCode: string,
    headerTab: string = "",
  ): Promise<TranscriptionResult> {
    const isCodeSwitch = headerTab === "zero-code-switch";
    const isMedical = headerTab === "medical-transcription";
    const model = isCodeSwitch ? "zero-codeswitch" : isMedical ? "zero-med" : "zero-indic";

    const formData = new FormData();

    formData.append("index", "0");
    formData.append("chunk_size", "120");
    formData.append("output_script", "auto");
    formData.append("model", model);
    formData.append("task", "transcribe");
    // Use correct filename based on actual MIME type
    const filename = audioBlob.type.includes("webm")
      ? "audio.webm"
      : audioBlob.type.includes("ogg")
        ? "audio.ogg"
        : audioBlob.type.includes("mp4")
          ? "audio.m4a"
          : "audio.wav";
    formData.append(
      "file",
      new Blob([audioBlob], { type: audioBlob.type }),
      filename,
    );
    // Codeswitch always uses "Auto", others use the selected language
    formData.append("language_code", isCodeSwitch ? "Auto" : getLanguageNameByCode(languageCode));
    formData.append("enable_diarization", "true");
    formData.append("use_vad_chunking", "true");
    formData.append("response_format", "verbose_json");
    formData.append("enable_profanity_hashing", "false");

    // Recorded audio goes through the proxy route
    if (!this._sessionToken) {
      const match = document.cookie.match(/(?:^|; )vak_token=([^;]*)/);
      if (match) this._sessionToken = decodeURIComponent(match[1]);
    }

    try {
      const response = await fetch("/api/vak/stt", {
        method: "POST",
        headers: {
          ...(this._sessionToken ? { "X-Session-Token": this._sessionToken } : {}),
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Transcription failed: ${response.statusText}`);
      }

      const result = await response.json();

      // Handle ASR API response format
      if (result.detail && result.detail.includes("Audio conversion failed")) {
        throw new Error("Invalid audio file format");
      }

      // Check if response has the expected format
      if (!result.text && !result.transcription) {
        throw new Error("Invalid API response format");
      }

      // Convert ASR response to expected format if needed
      const transcriptionResult: TranscriptionResult = {
        success: true,
        text: result.text || result.transcription || "",
        segments: result.segments || [],
        detected_language: result.detected_language || languageCode,
        language_probability: result.language_probability || 1.0,
        total_segments:
          result.total_segments ||
          (result.segments ? result.segments.length : 0),
        chunks_processed: result.chunks_processed || 1,
        chunk_size_seconds: result.chunk_size_seconds || 120,
        filename: result.filename || "recording.wav",
        total_time: result.total_time || result.audio_duration || 0,
        audio_duration: result.audio_duration || result.total_time || 0,
        model_used: result.model_used || "default",
        has_speaker_diarization: result.has_speaker_diarization || false,
        unique_speakers:
          result.unique_speakers ||
          (result.segments
            ? [...new Set(result.segments.map((s: any) => s.speaker))]
            : []),
        speakers: result.speakers || [],
        diarization_time: result.diarization_time || 0,
      };

      return transcriptionResult;
    } catch (error) {
      console.error("Transcription API error:", error);
      throw new Error("Failed to transcribe audio");
    }
  }

  // Legacy methods for backward compatibility
  async uploadAudioFile(
    file: File,
    options: TranscriptionOptions,
  ): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append("audio_file", file);
    formData.append("language", options.language);
    formData.append("speaker_count", options.speakerCount.toString());
    formData.append("quality", options.quality);
    formData.append("real_time", options.realTime.toString());

    try {
      const response = await fetch(`${this.baseUrl}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      throw new Error("Failed to upload audio file");
    }
  }

  async checkStatus(uploadId: string): Promise<StatusResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/status/${uploadId}`);

      if (!response.ok) {
        throw new Error(`Status check failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      throw new Error("Failed to check transcription status");
    }
  }

  async getTranscriptionResult(uploadId: string): Promise<TranscriptionResult> {
    try {
      const response = await fetch(`${this.baseUrl}/result/${uploadId}`);

      if (!response.ok) {
        throw new Error(`Result fetch failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      throw new Error("Failed to fetch transcription result");
    }
  }

  async cancelTranscription(uploadId: string): Promise<{ status: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/cancel/${uploadId}`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error(`Cancel failed: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      throw new Error("Failed to cancel transcription");
    }
  }

  // Polling method for real-time status updates
  async pollTranscriptionStatus(
    uploadId: string,
    onProgress: (status: StatusResponse) => void,
    onComplete: (result: TranscriptionResult) => void,
    onError: (error: Error) => void,
    interval: number = 2000,
  ): Promise<void> {
    const poll = async () => {
      try {
        const status = await this.checkStatus(uploadId);
        onProgress(status);

        if (status.status === "completed" && status.transcript_ready) {
          const result = await this.getTranscriptionResult(uploadId);
          onComplete(result);
          return;
        }

        if (status.status === "failed") {
          onError(new Error("Transcription failed"));
          return;
        }

        // Continue polling
        setTimeout(poll, interval);
      } catch (error) {
        onError(error as Error);
      }
    };

    poll();
  }
}

export const transcriptionApi = new TranscriptionApiService();
