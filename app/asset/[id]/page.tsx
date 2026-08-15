"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { BUSINESSES } from "@/lib/data";
import { AssetListItem, FundingCategory } from "@/lib/types";

type Step = "idle" | "preparing" | "sent" | "confirmed" | "failed";

export default function AssetDetail({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams();
  const kind = searchParams.get("kind") === "business" ? "business" : "direct";

  const [item, setItem] = useState<AssetListItem | null>(null);
  const [email, setEmail] = useState("owner@example.com");
  const [step, setStep] = useState<Step>("idle");
  const [txHash, setTxHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (kind === "business") {
      const found = BUSINESSES.find((b) => b.id === params.id) ?? null;
      setItem(found);
    } else {
      const stored = window.localStorage.getItem("dogen-categories");
      if (stored) {
        const categories = JSON.parse(stored) as FundingCategory[];
        setItem(categories.find((c) => c.id === params.id) ?? null);
      }
    }
  }, [kind, params.id]);

  async function tokenize() {
    if (!item) return;
    setError(null);
    setStep("preparing");

    const assetName = item.kind === "direct" ? item.title : item.name;
    const tokenSymbol =
      item.kind === "business" ? item.tokenSymbol : item.id.slice(0, 5).toUpperCase();

    try {
      const res = await fetch("/api/brickken/prepare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assetName,
          tokenSymbol,
          targetUSD: item.targetUSD,
          tokenizerEmail: email,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Tokenization failed");

      setStep("sent");
      await pollStatus(data.txId);
    } catch (err: any) {
      setError(err.message ?? "Something went wrong");
      setStep("failed");
    }
  }

  async function pollStatus(txId: string) {
    for (let attempt = 0; attempt < 20; attempt++) {
      const res = await fetch(`/api/brickken/status?txId=${txId}`);
      const data = await res.json();
      if (data.status && data.status !== "pending") {
        setStep("confirmed");
        setTxHash(data.txHash ?? null);
        return;
      }
      await new Promise((r) => setTimeout(r, 4000));
    }
    setError("Still pending after a while, check the status manually with this txId: " + txId);
  }

  if (!item) {
    return (
      <div className="page">
        <p>Could not find that item. Go back and pick a dog or business first.</p>
      </div>
    );
  }

  const title = item.kind === "direct" ? item.title : item.name;
  const description = item.kind === "direct" ? item.description : item.pitch;
  const tokenSymbol = item.kind === "business" ? item.tokenSymbol : item.id.slice(0, 5).toUpperCase();
  const buttonLabel =
    item.kind === "direct" ? "Record this on Brickken" : "Tokenize with Brickken";
  const explainer =
    item.kind === "direct"
      ? "This creates a token that stands for who backed this category. It is a transparent record, not a claim of ownership."
      : "This creates a token representing a real world asset, tracked and moved through Brickken's sandbox.";

  return (
    <div className="page">
      <Link href="/dog-economy" style={{ fontSize: 14, color: "#8a8270", textDecoration: "none" }}>
        ← Back to the dog economy
      </Link>
      <div className="label" style={{ marginTop: 16 }}>
        Step three
      </div>
      <h1 style={{ marginBottom: 24 }}>{title}</h1>

      <div className="card">
        <p style={{ marginBottom: 20 }}>{description}</p>

        <div style={{ display: "grid", gap: 12 }}>
          <Row label="Funding target" value={`$${item.targetUSD.toLocaleString()}`} />
          <Row label="Token symbol" value={tokenSymbol} />
          <Row label="Network" value="Ethereum Sepolia" />
        </div>
      </div>

      <div className="card">
        <div className="label">Tokenizer email</div>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 12px",
            fontSize: 15,
            border: "1px solid var(--line)",
            borderRadius: 6,
            marginBottom: 20,
          }}
        />

        {step === "idle" && (
          <>
            <p style={{ fontSize: 13, color: "#8a8270", marginBottom: 12 }}>{explainer}</p>
            <button className="btn btn-brass" onClick={tokenize}>
              {buttonLabel}
            </button>
          </>
        )}

        {step !== "idle" && (
          <div>
            <StatusLine label="Prepared and signed" done={step !== "preparing"} active={step === "preparing"} />
            <StatusLine label="Sent to Brickken" done={step === "confirmed"} active={step === "sent"} />
            <StatusLine label="Confirmed on chain" done={step === "confirmed"} active={false} />

            {step === "confirmed" && (
              <>
                <p className="mono" style={{ marginTop: 16, fontSize: 13 }}>
                  Asset tokenized. Token: {tokenSymbol}. Chain: Sepolia.
                  {txHash ? ` Transaction: ${txHash}` : ""}
                </p>
                <div style={{ marginTop: 24, borderTop: "1px solid var(--line)", paddingTop: 20 }}>
                  <div className="label">What happens next</div>
                  <ul style={{ margin: 0, paddingLeft: 20, fontSize: 14, color: "#5c574a", lineHeight: 1.9 }}>
                    <li>Backers who want to hold this token get whitelisted</li>
                    <li>A funding round opens with a start and end date</li>
                    <li>Investors put money in and claim their token</li>
                    <li>The round closes and funds move to what was raised for</li>
                  </ul>
                </div>
              </>
            )}

            {error && <p style={{ marginTop: 16, color: "#a13f3f" }}>{error}</p>}
          </div>
        )}
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <span style={{ color: "#8a8270" }}>{label}</span>
      <span className="mono" style={{ fontWeight: 600 }}>
        {value}
      </span>
    </div>
  );
}

function StatusLine({ label, done, active }: { label: string; done: boolean; active: boolean }) {
  return (
    <div className="status-line">
      <span className={`dot ${done ? "done" : active ? "active" : ""}`} />
      {label}
    </div>
  );
}
