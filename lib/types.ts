export type DogProfile = {
  name: string;
  breed: string;
  size: "Small" | "Medium" | "Large";
  energy: "Low" | "Medium" | "High";
  careNeeds: string;
  photoUrl?: string;
};

export type FundingCategory = {
  id: string;
  kind: "direct";
  title: string;
  description: string;
  targetUSD: number;
};

export type Business = {
  id: string;
  kind: "business";
  name: string;
  pitch: string;
  targetUSD: number;
  tokenSymbol: string;
};

export type AssetListItem = FundingCategory | Business;

export type TokenizeResult = {
  txId: string;
  status: "prepared" | "sent" | "confirmed" | "failed";
  txHash?: string;
  tokenSymbol?: string;
  chainId?: string;
};
