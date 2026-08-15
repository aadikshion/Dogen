# Running Dogen locally

## 1. Install

```
npm install
```

## 2. Add your keys

Copy the example env file and fill it in.

```
cp .env.local.example .env.local
```

You need:

- A Google AI API key, from Google AI Studio.
- An ElevenLabs API key and a voice id.
- A Brickken sandbox API key, plus a signer wallet that Brickken has whitelisted. Ask for both in the same request. The wallet also needs a small amount of Sepolia test ETH to pay gas, get that from any Sepolia faucet.

## 3. Run it

```
npm run dev
```

Open http://localhost:3000.

## What is already wired up

- Meet my dog: uploads a photo, calls Google AI, shows the profile, plays a voice line through ElevenLabs.
- Dog Economy: shows funding targets sized to the dog's profile, and a fixed list of example dog businesses.
- Asset page: the Tokenize with Brickken button runs the real prepare, sign, and send flow against the sandbox, then polls for confirmation and shows the transaction.

## What is not wired up yet

This scaffold covers newTokenization only, since that is the step judges specifically want to see working. The rest of the lifecycle from the build doc still needs to be added the same way:

- whitelist, before anyone besides the tokenizer can hold the token
- newSto, to actually open the funding round with dates and a raise minimum and maximum
- newInvest, for someone to put money in
- claimTokens, for the backer to claim their token
- closeOffer and dividendDistribution, once a round wraps up

Each one follows the same shape as `lib/brickken.ts`. Add a method name and the fields that method needs, call `prepareSignAndSend`, done.

## A note on the status response

`get-transaction-status` field names in the code right now (`status`, `txHash`) are a best guess based on the docs. Check the real response shape once you make a live call and adjust `lib/brickken.ts` and `app/asset/[id]/page.tsx` if the field names differ.
