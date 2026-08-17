import { NextRequest, NextResponse } from "next/server";
import { prepareSignAndSend } from "@/lib/brickken";

const DEMO_INVESTOR_ADDRESS = process.env.BRICKKEN_SIGNER_ADDRESS ?? "";

export async function POST(req: NextRequest) {
  try {
    const { tokenSymbol, investorEmail, investmentAmount, paymentTokenSymbol } = await req.json();
    if (!tokenSymbol || !investorEmail || !investmentAmount) {
      return NextResponse.json(
        { error: "tokenSymbol, investorEmail, and investmentAmount are required" },
        { status: 400 }
      );
    }
    const result = await prepareSignAndSend("newInvest", {
      tokenSymbol,
      investorEmail,
      investorAddress: DEMO_INVESTOR_ADDRESS,
      investmentAmount,
      paymentTokenSymbol: paymentTokenSymbol ?? "USDT",
      signerAddress: DEMO_INVESTOR_ADDRESS,
    });
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? "Investment failed" }, { status: 500 });
  }
}
