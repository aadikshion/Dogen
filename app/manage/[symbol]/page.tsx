"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

// This is the same wallet used to tokenize, shown here because it is
// already public in the project's README. In a full multi-wallet version,
// a second, separately funded wallet would stand in as the real investor.
const DEMO_INVESTOR_ADDRESS = "0xa38F413E38cF78fed5f0e112dE5f65512860EcF3";

type StepState = "idle" | "running" | "done" | "error";

function todayPlus(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString();
}

export default function ManageToken({ params }: { params: { symbol: string } }) {
  const searchParams = useSearchParams();
  const symbol = params.symbol;
  const assetName = searchParams.get("name") ?? symbol;
  const email = searchParams.get("email") ?? "owner@example.com";

  const [whitelistState, setWhitelistState] = useState<StepState>("idle");
  const [whitelistMsg, setWhitelistMsg] = useState("");

  const [stoState, setStoState] = useState<StepState>("idle");
  const [stoMsg, setStoMsg] = useState("");

  const [investState, setInvestState] = useState<StepState>("idle");
  const [investMsg, setInvestMsg] = useState("");

  const [claimState, setClaimState] = useState<StepState>("idle");
  const [claimMsg, setClaimMsg] = useState("");

  const [closeState, setCloseState] = useState<StepState>("idle");
  const [closeMsg, setCloseMsg] = useState("");

  const [dividendState, setDividendState] = useState<StepState>("idle");
  const [dividendMsg, setDividendMsg] = useState("");

  async function runStep(
    url: string,
    body: any,
    setState: (s: StepState) => void,
    setMsg: (m: string) => void
  ) {
    setState("running");
    setMsg("");
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Request failed");
      setState("done");
      setMsg(`txId: ${data.txId}`);
    } catch (err: any) {
      setState("error");
      setMsg(err.message ?? "Something went wrong");
    }
  }

  return (
    <div className="page">
      <Link href="/dog-economy" style={{ fontSize: 14, color: "#8a8270", textDecoration: "none" }}>
        Back to the dog economy
      </Link>
      <div className="label" style={{ marginTop: 16 }}>
        Funding lifecycle
      </div>
      <h1 style={{ marginBottom: 8 }}>{assetName}</h1>
      <p className="mono" style={{ fontSize: 13, color: "#8a8270", marginBottom: 24 }}>
        Token: {symbol}
      </p>

      <div className="card" style={{ marginBottom: 16, background: "#faf3e3", borderColor: "#e0cf9a" }}>
        <p style={{ fontSize: 13, color: "#7a6524", margin: 0 }}>
          Demo mode: the investor steps below use the same wallet that tokenized this asset,
          {" "}{DEMO_INVESTOR_ADDRESS}, since this build has one funded wallet. Every call is
          still real and hits Brickken's sandbox for real. A second, separately funded wallet
          would make this a true two party demo.
        </p>
      </div>

      <StepCard
        title="1. Whitelist the investor"
        description="A security token can only move between whitelisted wallets. This has to run before anyone can invest or claim."
        state={whitelistState}
        message={whitelistMsg}
        buttonLabel="Whitelist"
        onRun={() =>
          runStep(
            "/api/brickken/whitelist",
            { tokenSymbol: symbol, investorAddress: DEMO_INVESTOR_ADDRESS, investorEmail: email },
            setWhitelistState,
            setWhitelistMsg
          )
        }
      />

      <StepCard
        title="2. Open the funding round"
        description="Sets a start date, end date, and a raise minimum and maximum. This is what turns a tokenized asset into an actual offering."
        state={stoState}
        message={stoMsg}
        buttonLabel="Open round"
        onRun={() =>
          runStep(
            "/api/brickken/sto",
            {
              tokenSymbol: symbol,
              tokenizerEmail: email,
              offeringName: `${assetName} funding round`,
              startDate: todayPlus(0),
              endDate: todayPlus(30),
              acceptedCoin: "USDT",
              minRaiseUSD: "100",
              maxRaiseUSD: "1000",
              minInvestment: "10",
              maxInvestment: "500",
              tokenAmount: "1000",
            },
            setStoState,
            setStoMsg
          )
        }
      />

      <StepCard
        title="3. Invest"
        description="The demo investor puts sandbox money into the round."
        state={investState}
        message={investMsg}
        buttonLabel="Invest $50"
        onRun={() =>
          runStep(
            "/api/brickken/invest",
            { tokenSymbol: symbol, investorEmail: email, investmentAmount: "50", paymentTokenSymbol: "USDT" },
            setInvestState,
            setInvestMsg
          )
        }
      />

      <StepCard
        title="4. Claim the token"
        description="The investor claims the token they just invested for."
        state={claimState}
        message={claimMsg}
        buttonLabel="Claim"
        onRun={() =>
          runStep(
            "/api/brickken/claim",
            { tokenSymbol: symbol, investorEmail: email },
            setClaimState,
            setClaimMsg
          )
        }
      />

      <StepCard
        title="5. Close the offer"
        description="Ends the round once funding is done."
        state={closeState}
        message={closeMsg}
        buttonLabel="Close"
        onRun={() =>
          runStep(
            "/api/brickken/close",
            { tokenSymbol: symbol, tokenizerEmail: email },
            setCloseState,
            setCloseMsg
          )
        }
      />

      <StepCard
        title="6. Distribute a return"
        description="Only the wallet that tokenized this asset can do this. Sends a payout back to token holders."
        state={dividendState}
        message={dividendMsg}
        buttonLabel="Distribute $10"
        onRun={() =>
          runStep(
            "/api/brickken/dividend",
            { tokenSymbol: symbol, amount: "10" },
            setDividendState,
            setDividendMsg
          )
        }
      />
    </div>
  );
}

function StepCard({
  title,
  description,
  state,
  message,
  buttonLabel,
  onRun,
}: {
  title: string;
  description: string;
  state: StepState;
  message: string;
  buttonLabel: string;
  onRun: () => void;
}) {
  return (
    <div className="card">
      <h3 style={{ fontSize: 16, marginBottom: 6 }}>{title}</h3>
      <p style={{ fontSize: 13, color: "#5c574a", marginBottom: 12 }}>{description}</p>
      <button className="btn btn-brass" onClick={onRun} disabled={state === "running"}>
        {state === "running" ? "Running..." : buttonLabel}
      </button>
      {state === "done" && (
        <p className="mono" style={{ fontSize: 12, color: "#4b7a4f", marginTop: 10 }}>
          Sent. {message}
        </p>
      )}
      {state === "error" && (
        <p style={{ fontSize: 12, color: "#a13f3f", marginTop: 10 }}>{message}</p>
      )}
    </div>
  );
}
