import { NextRequest, NextResponse } from "next/server";
import { prepareSignAndSend } from "@/lib/brickken";

const DEMO_INVESTOR_ADDRESS = process.env.BRICKKEN_SIGNER_ADDRESS ?? "";

export async function POST(req: NextRequest) {
  try {
    const { tokenSymbol, investorEmail } = await req.json();
    if (!tokenSymbol || !investorEmail) {
      return NextResponse.json(
        { error: "tokenSymbol and investorEmail are required" },
        { status: 400 }
      );
    }
    const result = await prepareSignAndSend("claimTokens", {
      tokenSymbol,
      investorEmail,
      investorAddress: DEMO_INVESTOR_ADDRESS,
      signerAddress: DEMO_INVESTOR_ADDRESS,
    });
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? "Claim failed" }, { status: 500 });
  }
}
