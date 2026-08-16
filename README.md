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

## Proof it actually works

Network: Ethereum Sepolia, chainId aa36a7 (11155111 decimal).

Real transactions produced by this build, verifiable on Sepolia Etherscan:

- FEEDI, Feeding
  https://sepolia.etherscan.io/tx/0x60ca39cdda253234007332d1ed02716ef35822118d003e6c83f56d23ab12f6f1
- VET, Vet and health
  https://sepolia.etherscan.io/tx/0xb0d3bd5aad94dec370fe0315560e443f0660b3abfda3a70809da5708c4f48511
- GROOM, Grooming
  https://sepolia.etherscan.io/tx/0xa8f019e7904e78e40985064bfb45232115621a5794174ddf1ebcc2c5b90e713e
- TRAIN, Training
  https://sepolia.etherscan.io/tx/0x08d4cee4e74323de6455cf5e1d67e66fedf9a29cdf20aadc3019415d44569a0c
- PWASH, The Daily Wag
  https://sepolia.etherscan.io/tx/0xa334c2c068d0997efc0da246e0602a178a0b7e5276ccbf94a8683cfe52a3efa9
- PWVAN, Bark Bound Enterprises
  https://sepolia.etherscan.io/tx/0x6530e77982ca139f9e5db66f1997d1112c717ede732d10106d78d65f6fcec211
- HTAIL, Paws & Palms
  https://sepolia.etherscan.io/tx/0xc1ba86293fb25508272d03d857e1e3347c1ed6508972ae45deb689659d3a978f

Signer / reward wallet: 0xa38F413E38cF78fed5f0e112dE5f65512860EcF3

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

## Proof it actually works

Network: Ethereum Sepolia  
Chain ID: `aa36a7` (`11155111` decimal)

These are real transactions produced by Dogen through Brickken's sandbox. Each transaction can be independently verified on Sepolia Etherscan.

- **FEEDI, Feeding**  
  https://sepolia.etherscan.io/tx/0x60ca39cdda253234007332d1ed02716ef35822118d003e6c83f56d23ab12f6f1

- **VET, Vet and Health**  
  https://sepolia.etherscan.io/tx/0xb0d3bd5aad94dec370fe0315560e443f0660b3abfda3a70809da5708c4f48511

- **GROOM, Grooming**  
  https://sepolia.etherscan.io/tx/0xa8f019e7904e78e40985064bfb45232115621a5794174ddf1ebcc2c5b90e713e

- **TRAIN, Training**  
  https://sepolia.etherscan.io/tx/0x08d4cee4e74323de6455cf5e1d67e66fedf9a29cdf20aadc3019415d44569a0c

- **PWASH, The Daily Wag**  
  https://sepolia.etherscan.io/tx/0xa334c2c068d0997efc0da246e0602a178a0b7e5276ccbf94a8683cfe52a3efa9

- **PWVAN, Bark Bound Enterprises**  
  https://sepolia.etherscan.io/tx/0x6530e77982ca139f9e5db66f1997d1112c717ede732d10106d78d65f6fcec211

- **HTAIL, Paws & Palms**  
  https://sepolia.etherscan.io/tx/0xc1ba86293fb25508272d03d857e1e3347c1ed6508972ae45deb689659d3a978f

Signer / reward wallet: `0xa38F413E38cF78fed5f0e112dE5f65512860EcF3`
