import { NextRequest, NextResponse } from "next/server";
import { prepareSignAndSend } from "@/lib/brickken";

// Body: { assetName, tokenSymbol, targetUSD, tokenizerEmail }
// This calls newTokenization. Whitelisting, the STO, and investing are
// separate calls, wire them up the same way once this one is working.
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { assetName, tokenSymbol, targetUSD, tokenizerEmail } = body;

    if (!assetName || !tokenSymbol || !targetUSD || !tokenizerEmail) {
      return NextResponse.json(
        { error: "assetName, tokenSymbol, targetUSD, and tokenizerEmail are all required" },
        { status: 400 }
      );
    }

    const result = await prepareSignAndSend("newTokenization", {
      tokenizerEmail,
      name: assetName,
      tokenSymbol,
      tokenType: "RWA_TOKEN",
      supplyCap: String(targetUSD),
    });

    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? "Tokenization failed" }, { status: 500 });
  }
}
