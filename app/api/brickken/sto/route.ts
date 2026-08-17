import { NextRequest, NextResponse } from "next/server";
import { prepareSignAndSend } from "@/lib/brickken";

export async function POST(req: NextRequest) {
  try {
    const {
      tokenSymbol,
      tokenizerEmail,
      offeringName,
      startDate,
      endDate,
      acceptedCoin,
      minRaiseUSD,
      maxRaiseUSD,
      minInvestment,
      maxInvestment,
      tokenAmount,
    } = await req.json();

    if (!tokenSymbol || !tokenizerEmail || !offeringName) {
      return NextResponse.json(
        { error: "tokenSymbol, tokenizerEmail, and offeringName are required" },
        { status: 400 }
      );
    }

    const result = await prepareSignAndSend("newSto", {
      tokenizerEmail,
      tokenSymbol,
      tokenAmount: tokenAmount ?? "1000",
      offeringName,
      startDate,
      endDate,
      acceptedCoin: acceptedCoin ?? "USDT",
      minRaiseUSD: minRaiseUSD ?? "100",
      maxRaiseUSD: maxRaiseUSD ?? "1000",
      minInvestment: minInvestment ?? "10",
      maxInvestment: maxInvestment ?? "500",
    });
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? "Opening the funding round failed" }, { status: 500 });
  }
}
