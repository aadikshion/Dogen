import { NextRequest, NextResponse } from "next/server";

// Body: { text }
// Returns raw audio bytes (audio/mpeg) so the client can play it directly.
export async function POST(req: NextRequest) {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  const voiceId = process.env.ELEVENLABS_VOICE_ID;

  if (!apiKey || !voiceId) {
    return NextResponse.json(
      { error: "ELEVENLABS_API_KEY and ELEVENLABS_VOICE_ID must both be set" },
      { status: 500 }
    );
  }

  try {
    const { text } = await req.json();
    if (!text) {
      return NextResponse.json({ error: "text is required" }, { status: 400 });
    }

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": apiKey,
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_multilingual_v2",
        }),
      }
    );

    if (!response.ok) {
      const message = await response.text();
      return NextResponse.json({ error: message }, { status: response.status });
    }

    const audio = await response.arrayBuffer();
    return new NextResponse(audio, {
      headers: { "Content-Type": "audio/mpeg" },
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? "Could not generate audio" }, { status: 500 });
  }
}
