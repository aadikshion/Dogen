import { Wallet } from "ethers";

const BASE_URL = process.env.BRICKKEN_BASE_URL ?? "https://api.sandbox.brickken.com";
const API_KEY = process.env.BRICKKEN_API_KEY ?? "";
const CHAIN_ID = process.env.BRICKKEN_CHAIN_ID ?? "aa36a7";
const SIGNER_ADDRESS = process.env.BRICKKEN_SIGNER_ADDRESS ?? "";
const SIGNER_PRIVATE_KEY = process.env.BRICKKEN_SIGNER_PRIVATE_KEY ?? "";

function assertConfigured() {
  if (!API_KEY) throw new Error("BRICKKEN_API_KEY is not set");
  if (!SIGNER_ADDRESS) throw new Error("BRICKKEN_SIGNER_ADDRESS is not set");
  if (!SIGNER_PRIVATE_KEY) throw new Error("BRICKKEN_SIGNER_PRIVATE_KEY is not set");
}

async function brickkenFetch(path: string, options: RequestInit) {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
      ...(options.headers ?? {}),
    },
  });

  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(body?.message ?? `Brickken request failed with ${res.status}`);
  }

  return body;
}

export type PrepareResponse = {
  txId: string;
  transactions: Array<Record<string, any>>;
  info?: Record<string, any>;
};

// Step one, prepare an unsigned transaction for the given method.
export async function prepareTransaction(
  method: string,
  fields: Record<string, any>
): Promise<PrepareResponse> {
  assertConfigured();
  return brickkenFetch("/prepare-transactions", {
    method: "POST",
    body: JSON.stringify({
      method,
      chainId: CHAIN_ID,
      signerAddress: SIGNER_ADDRESS,
      ...fields,
    }),
  });
}

// Step two, sign every transaction Brickken handed back with the signer wallet.
export async function signTransactions(
  transactions: Array<Record<string, any>>
): Promise<string[]> {
  assertConfigured();
  const wallet = new Wallet(SIGNER_PRIVATE_KEY);
  const signed: string[] = [];
  for (const tx of transactions) {
    const signedTx = await wallet.signTransaction(tx as any);
    signed.push(signedTx);
  }
  return signed;
}

// Step three, send the signed payloads back to Brickken so it can broadcast them.
export async function sendTransactions(txId: string, signedTransactions: string[]) {
  return brickkenFetch("/send-transactions", {
    method: "POST",
    body: JSON.stringify({ txId, signedTransactions }),
  });
}

// Step four, poll until the transaction is mined. Do not resend on pending.
export async function getTransactionStatus(txId: string) {
  return brickkenFetch(`/get-transaction-status?txId=${txId}`, {
    method: "GET",
  });
}

// Convenience wrapper that runs prepare, sign, and send in one call.
// Status still has to be polled separately, since confirmation can take a moment.
export async function prepareSignAndSend(method: string, fields: Record<string, any>) {
  const prepared = await prepareTransaction(method, fields);
  const signed = await signTransactions(prepared.transactions);
  const sendResult = await sendTransactions(prepared.txId, signed);
  return { txId: prepared.txId, info: prepared.info, sendResult };
}

export async function pollUntilConfirmed(
  txId: string,
  { intervalMs = 4000, maxAttempts = 30 } = {}
) {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const status = await getTransactionStatus(txId);
    if (status.status && status.status !== "pending") {
      return status;
    }
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }
  throw new Error("Timed out waiting for confirmation, check get-transaction-status manually");
}
