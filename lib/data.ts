import { Business, DogProfile, FundingCategory } from "./types";

// Rough real world cost multipliers. Small numbers on purpose, this is
// sandbox testnet money, not real currency.
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

export const BUSINESSES: Business[] = [
  {
    id: "pawwash",
    kind: "business",
    name: "PawWash Mobile Grooming",
    pitch: "A van that brings the grooming table to the driveway.",
    targetUSD: 20000,
    tokenSymbol: "PWASH",
  },
  {
    id: "happytails",
    kind: "business",
    name: "Happy Tails Daycare",
    pitch: "Adding a second play yard to cut the waitlist.",
    targetUSD: 35000,
    tokenSymbol: "HTAIL",
  },
  {
    id: "pawvan",
    kind: "business",
    name: "PawVan 03",
    pitch: "A second mobile grooming unit for the east side of town.",
    targetUSD: 25000,
    tokenSymbol: "PWVAN",
  },
];
