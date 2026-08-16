import { NextRequest, NextResponse } from "next/server";

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

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt },
                { inline_data: { mime_type: mimeType ?? "image/jpeg", data: imageBase64 } },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data?.error?.message ?? `Google AI request failed with ${response.status}`);
    }

    const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!raw) {
      throw new Error("Google AI did not return a usable response");
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
