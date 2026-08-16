# Dogen

See the economy behind your dog.

Dogen turns a simple photo of a dog into a view of the costs, services, businesses, and funding opportunities that exist around it.

## What it does

Upload a photo of your dog.

Google AI reads the photo and creates a profile with the dog's breed, size, energy level, and care needs. Dogen uses that profile to estimate what a year of owning the dog could cost across feeding, vet care, grooming, and training.

From there, you can take two paths.

### Fund your dog directly

Put sandbox money toward a specific part of your dog's care. Feeding, vet and health, grooming, or training.

This can be useful for people who already know the dog, including family, friends, and co-owners.

### Invest in your dog's world

Dogs create demand for an entire ecosystem of businesses.

Dogen lets you explore opportunities such as mobile grooming, daycare, and training services, then back a business with sandbox funds.

You do not need to own a dog to take part.

### Then take it on-chain

Once an opportunity is selected, Dogen can tokenize it through Brickken's sandbox on Ethereum Sepolia.

Each tokenization goes through the actual prepare, sign, and send flow, with the resulting transaction available to verify on-chain.

After a dog profile is created, ElevenLabs can also turn a short line based on that profile into audio, giving the dog a voice.

## Proof it works

Dogen runs on Ethereum Sepolia.

**Chain ID:** `11155111`  
**Network:** Ethereum Sepolia

The transactions below were produced by the application and can be verified publicly on Sepolia Etherscan.

- **FEEDI, Feeding**  
  https://sepolia.etherscan.io/tx/0x60ca39cdda253234007332d1ed02716ef35822118d003e6c83f56d23ab12f6f1

- **VET, Vet and health**  
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

**Signer / reward wallet:**  
`0xa38F413E38cF78fed5f0e112dE5f65512860EcF3`

## Brickken integration

Dogen connects directly to Brickken's sandbox API through Next.js API routes.

The current tokenization flow uses `newTokenization` and runs the full prepare, sign, and send lifecycle against the sandbox.

Transactions are signed locally with the whitelisted wallet, sent for broadcast, and then checked until the transaction is confirmed.

The integration is structured to support the wider Brickken tokenization lifecycle as the project continues to expand.

## Google AI and ElevenLabs

### Google AI

Google AI analyzes the uploaded dog photo and returns a structured profile containing:

- Breed
- Size
- Energy level
- Care needs

That profile drives the yearly cost estimate shown throughout the Dog Economy.

### ElevenLabs

ElevenLabs turns a short line generated from the dog's profile into audio.

Once the profile exists, the dog can speak.

## Stack

- Next.js
- Google AI
- ElevenLabs
- Brickken REST API
- Ethereum Sepolia

## Running it

See `SETUP.md` for the exact setup instructions, including installing dependencies, adding the required environment variables, and starting the development server.

## AI tools used in this build

Claude and Chatgpt were used during planning and product development.

## Milestones

### Completed

- Dog photo upload
- AI generated dog profile
- Breed, size, energy, and care analysis
- Personalized yearly cost estimate
- Direct dog care funding
- Dog business investment opportunities
- ElevenLabs voice generation
- Brickken sandbox tokenization
- Real Sepolia transactions
- Public transaction verification

### Next

The next stage is expanding the Brickken integration beyond token creation to support the wider funding lifecycle, including whitelisting, opening investment offers, accepting investments, claiming tokens, closing offers, and dividend distribution.

The foundation for that expansion is already in place.
