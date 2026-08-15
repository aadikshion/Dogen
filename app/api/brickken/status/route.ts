import { NextRequest, NextResponse } from "next/server";
import { getTransactionStatus } from "@/lib/brickken";

export async function GET(req: NextRequest) {
  const txId = req.nextUrl.searchParams.get("txId");
  if (!txId) {
    return NextResponse.json({ error: "txId is required" }, { status: 400 });
  }

  try {
    const status = await getTransactionStatus(txId);
    return NextResponse.json(status);
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? "Status check failed" }, { status: 500 });
  }
}
