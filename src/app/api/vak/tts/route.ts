import { NextResponse } from "next/server";
import { getServerToken } from "../serverToken";

export const runtime = "nodejs";

const VALID_STYLE_TAGS = [
  "Happy", "Sad", "Angry", "Fearful", "Surprised", "Disgust",
  "News", "Conversational", "Narrative", "Enthusiastic", "Neutral",
] as const;

type TtsEmotion = (typeof VALID_STYLE_TAGS)[number];

type TtsRequestBody = {
  input?: string;
  text?: string;
  voice?: string;
  speaker?: string;
  speaker_name?: string;
  style?: string;
  emotion?: string;
  expression_style?: string;
  model?: string;
  response_format?: string;
  speed?: number;
  trim_silence?: boolean;
};

function normalizeEmotion(value: string | undefined): TtsEmotion | null {
  if (!value) return null;
  const normalized = value.trim().toLowerCase();
  if (!normalized) return null;
  return (VALID_STYLE_TAGS.find((tag) => tag.toLowerCase() === normalized) as TtsEmotion) ?? null;
}

function buildTtsPrompt(text: string, emotion?: TtsEmotion | null): string {
  const trimmed = text.trim();
  if (emotion && emotion !== "Neutral") {
    return `<${emotion}> ${trimmed}`;
  }
  return trimmed;
}

export async function POST(request: Request) {
  try {
    const ttsApiUrl = process.env.TTS_API_URL?.trim();
    if (!ttsApiUrl) {
      return NextResponse.json({ detail: "TTS_API_URL is not configured" }, { status: 500 });
    }

    // Use client token if provided, otherwise fetch server-side
    const sessionToken = request.headers.get("X-Session-Token")?.trim() || await getServerToken();
    if (!sessionToken) {
      return NextResponse.json({ detail: "Could not obtain session token" }, { status: 401 });
    }

    const body = (await request.json()) as TtsRequestBody;

    const rawText =
      (typeof body.text === "string" && body.text.trim()) ||
      (typeof body.input === "string" && body.input.trim()) ||
      "";

    const speaker =
      body.speaker?.trim() ||
      body.speaker_name?.trim() ||
      body.voice?.trim() ||
      "";

    if (!rawText || !speaker) {
      return NextResponse.json({ detail: "text/input and speaker are required" }, { status: 400 });
    }

    const emotionInput = body.expression_style ?? body.emotion ?? body.style;
    const emotion = normalizeEmotion(emotionInput);
    const text = buildTtsPrompt(rawText, emotion);

    const upstreamResponse = await fetch(ttsApiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sessionToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: text,
        voice: speaker,
        model: body.model ?? "zero-indic",
        response_format: body.response_format ?? "wav",
        speed: body.speed ?? 1,
        trim_silence: body.trim_silence ?? false,
      }),
      cache: "no-store",
    });

    if (!upstreamResponse.ok) {
      const detail = await upstreamResponse.text().catch(() => "");
      return new NextResponse(detail || "TTS request failed", { status: upstreamResponse.status });
    }

    const audioBuffer = await upstreamResponse.arrayBuffer();
    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        "Content-Type": upstreamResponse.headers.get("content-type") || "audio/wav",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    return NextResponse.json(
      { detail: error instanceof Error ? error.message : "Unexpected TTS error" },
      { status: 500 }
    );
  }
}
