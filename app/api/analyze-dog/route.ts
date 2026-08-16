import { NextRequest, NextResponse } from "next/server";

const MODELS = ["gemini-3.5-flash", "gemini-flash-latest", "gemini-3.7-flash", "gemini-2.5-flash-lite"];

async function tryModel(model: string, apiKey: string, prompt: string, mimeType: string, imageBase64: string) {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: prompt },
              { inline_data: { mime_type: mimeType, data: imageBase64 } },
            ],
          },
        ],
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error?.message ?? `${model} failed with ${response.status}`);
  }

  const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!raw) {
    throw new Error(`${model} returned no usable content`);
  }

  return raw;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.GOOGLE_AI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "GOOGLE_AI_API_KEY is not set" }, { status: 500 });
  }

  try {
    const { imageBase64, mimeType, dogName } = await req.json();

    if (!imageBase64) {
      return NextResponse.json({ error: "imageBase64 is required" }, { status: 400 });
    }

    const prompt = `Look at this dog photo and return a short profile as plain JSON only,
no markdown, no extra text. Use this exact shape:
{"breed":"...","size":"Small|Medium|Large","energy":"Low|Medium|High","careNeeds":"one short sentence"}`;

    let raw: string | null = null;
    let lastError = "";

    for (const model of MODELS) {
      try {
        raw = await tryModel(model, apiKey, prompt, mimeType ?? "image/jpeg", imageBase64);
        break;
      } catch (err: any) {
        lastError = err.message ?? String(err);
        continue;
      }
    }

    if (!raw) {
      throw new Error(`All models failed. Last error: ${lastError}`);
    }

    const cleaned = raw.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(cleaned);

    return NextResponse.json({
      name: dogName ?? "This dog",
      breed: parsed.breed ?? "Mixed breed",
      size: parsed.size ?? "Medium",
      energy: parsed.energy ?? "Medium",
      careNeeds: parsed.careNeeds ?? "Regular brushing and walks",
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? "Could not read the photo" }, { status: 500 });
  }
}
