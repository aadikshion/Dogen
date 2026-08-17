import { NextRequest, NextResponse } from "next/server";
import { prepareSignAndSend } from "@/lib/brickken";

export async function POST(req: NextRequest) {
  try {
    const { tokenSymbol, tokenizerEmail } = await req.json();
    if (!tokenSymbol || !tokenizerEmail) {
      return NextResponse.json(
        { error: "tokenSymbol and tokenizerEmail are required" },
        { status: 400 }
      );
    }
    const result = await prepareSignAndSend("closeOffer", {
      tokenSymbol,
      tokenizerEmail,
    });
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? "Closing the offer failed" }, { status: 500 });
  }
}
