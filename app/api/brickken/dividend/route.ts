import { NextRequest, NextResponse } from "next/server";
import { prepareSignAndSend } from "@/lib/brickken";

export async function POST(req: NextRequest) {
  try {
    const { tokenSymbol, amount } = await req.json();
    if (!tokenSymbol || !amount) {
      return NextResponse.json(
        { error: "tokenSymbol and amount are required" },
        { status: 400 }
      );
    }
    const result = await prepareSignAndSend("dividendDistribution", {
      tokenSymbol,
      amount,
    });
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? "Distribution failed" }, { status: 500 });
  }
}
