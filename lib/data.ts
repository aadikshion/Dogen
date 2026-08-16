import { Business, DogProfile, FundingCategory } from "./types";

const SIZE_MULTIPLIER: Record<DogProfile["size"], number> = {
  Small: 1,
  Medium: 1.5,
  Large: 2.2,
};

const ENERGY_MULTIPLIER: Record<DogProfile["energy"], number> = {
  Low: 1,
  Medium: 1.2,
  High: 1.5,
};

export const DIRECT_PREFIX: Record<string, string> = {
  feeding: "F",
  vet: "V",
  grooming: "G",
  training: "T",
};

export function buildFundingCategories(profile: DogProfile): FundingCategory[] {
  const sizeMult = SIZE_MULTIPLIER[profile.size];
  const energyMult = ENERGY_MULTIPLIER[profile.energy];

  return [
    {
      id: "feeding",
      kind: "direct",
      title: "Feeding",
      description: `A year of food sized for a ${profile.size.toLowerCase()} dog.`,
      targetUSD: Math.round(600 * sizeMult),
    },
    {
      id: "vet",
      kind: "direct",
      title: "Vet and health",
      description: "Checkups, vaccines, and a buffer for anything unexpected.",
      targetUSD: Math.round(500 * sizeMult),
    },
    {
      id: "grooming",
      kind: "direct",
      title: "Grooming",
      description: `${profile.careNeeds}.`,
      targetUSD: Math.round(300 * sizeMult * energyMult),
    },
    {
      id: "training",
      kind: "direct",
      title: "Training",
      description: `Sized for a ${profile.energy.toLowerCase()} energy dog.`,
      targetUSD: Math.round(250 * energyMult),
    },
  ];
}

export function totalAnnualCost(profile: DogProfile): number {
  return buildFundingCategories(profile).reduce((sum, c) => sum + c.targetUSD, 0);
}

export const BUSINESSES: Business[] = [
  {
    id: "pawwash",
    kind: "business",
    name: "The Daily Wag",
    category: "Grooming",
    pitch: "A mobile grooming van bringing wash day to your driveway.",
    purpose: "Buys the van and the grooming equipment inside it.",
    structure: "Each backer's contribution is recorded as its own token.",
    targetUSD: 20000,
    symbolPrefix: "W",
  },
  {
    id: "happytails",
    kind: "business",
    name: "Paws & Palms",
    category: "Daycare & Spa",
    pitch: "A resort style daycare and spa adding a second play yard.",
    purpose: "Funds construction of the new yard and spa equipment.",
    structure: "Each backer's contribution is recorded as its own token.",
    targetUSD: 35000,
    symbolPrefix: "P",
  },
  {
    id: "pawvan",
    kind: "business",
    name: "Bark Bound Enterprises",
    category: "Training",
    pitch: "A mobile training van bringing structured sessions to your street.",
    purpose: "Buys the van and training equipment for mobile sessions.",
    structure: "Each backer's contribution is recorded as its own token.",
    targetUSD: 25000,
    symbolPrefix: "B",
  },
];
