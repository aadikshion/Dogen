# Dogen

See the economy behind your dog.

Dogen is built for two challenges at once. The DEV Weekend Challenge, Dog
Days Edition, and Build with Brickken. Both share one deadline pressure and
one build.

## What it does

Upload a photo of your dog. Google AI reads it and writes a short profile,
breed, size, energy level, and care needs. From that profile, Dogen works
out what a year of owning that dog actually costs, feeding, vet care,
grooming, and training.

From there you can do one of two things.

Fund your dog directly. People who already know your dog, family, friends,
co-owners, can put sandbox money toward a specific cost category.

Invest in your dog's world. A small list of real dog businesses, a mobile
grooming van, a daycare and spa, a mobile training service, sit alongside
the direct funding option. Anyone can back one, no dog required.

Either path ends the same way. The pick gets tokenized through Brickken, on
their sandbox, on Sepolia. After a profile is created, the dog can also
speak a short line about it, generated with ElevenLabs.

## Brickken integration

Surface used: REST, calling Brickken's sandbox API directly from Next.js
API routes.

Methods called so far: newTokenization. The prepare, sign, and send loop
lives in lib/brickken.ts and runs for real against the sandbox, no
mocked responses. Status is confirmed by polling get-transaction-status.

Methods planned before the campaign deadline: whitelist, newSto, newInvest,
claimTokens, closeOffer, dividendDistribution. Each one follows the same
shape already written for newTokenization.

## Google AI and ElevenLabs

Google AI (model: gemini-3.5-flash) reads the uploaded photo and returns a
structured profile, used to build the cost estimate shown on the Dog
Economy page.

ElevenLabs turns a short line of text into audio, giving the dog a voice
after its profile is created.

## Stack

Next.js.

## Running it

See SETUP.md for exact steps, installing, adding keys, and starting the
dev server.

## AI tools used in this build

Claude was used throughout, for planning the product direction, writing
the app code, and drafting this documentation. All Brickken calls, prompts
sent to Google AI, and the actual product decisions were reviewed and
directed by the developer, not generated blind.

## Status

The core loop works end to end: upload a dog, get an AI profile, hear it
speak, browse the dog economy, tokenize an asset for real on Brickken's
sandbox, and verify the result on a public block explorer. The rest of the
Brickken lifecycle, whitelisting, opening a funding round, taking real
investment, is written into the plan but not yet wired into the app.
