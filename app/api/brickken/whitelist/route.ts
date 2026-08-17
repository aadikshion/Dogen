import { NextRequest, NextResponse } from "next/server";
import { prepareSignAndSend } from "@/lib/brickken";

export async function POST(req: NextRequest) {
  try {
    const { tokenSymbol, investorAddress, investorEmail } = await req.json();
    if (!tokenSymbol || !investorAddress || !investorEmail) {
      return NextResponse.json(
        { error: "tokenSymbol, investorAddress, and investorEmail are all required" },
        { status: 400 }
      );
    }
    const result = await prepareSignAndSend("whitelist", {
      tokenSymbol,
      userToWhitelist: [{ investorAddress, investorEmail, whitelistStatus: true }],
    });
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? "Whitelist failed" }, { status: 500 });
  }
}
