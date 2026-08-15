"use client";

import { useEffect, useState } from "react";
import AssetCard from "@/components/AssetCard";
import { buildFundingCategories, BUSINESSES } from "@/lib/data";
import { DogProfile, FundingCategory } from "@/lib/types";

export default function DogEconomy() {
  const [profile, setProfile] = useState<DogProfile | null>(null);
  const [categories, setCategories] = useState<FundingCategory[]>([]);
  const [tab, setTab] = useState<"direct" | "business">("direct");

  useEffect(() => {
    const stored = window.localStorage.getItem("dogen-profile");
    if (stored) {
      const parsed = JSON.parse(stored) as DogProfile;
      setProfile(parsed);
      const built = buildFundingCategories(parsed);
      setCategories(built);
      window.localStorage.setItem("dogen-categories", JSON.stringify(built));
    }
  }, []);

  const dogName = profile?.name ?? "your dog";

  return (
    <div className="page">
      <div className="label">Step two</div>
      <h1 style={{ marginBottom: 24 }}>The {dogName} economy</h1>

      {!profile && (
        <div className="card" style={{ marginBottom: 24 }}>
          You have not added a dog yet, so the funding targets below are just examples.
          Go back to Meet my dog to get numbers sized for your own dog.
        </div>
      )}

      <div className="tabs">
        <button
          className={`tab ${tab === "direct" ? "active" : ""}`}
          onClick={() => setTab("direct")}
        >
          Fund {dogName} directly
        </button>
        <button
          className={`tab ${tab === "business" ? "active" : ""}`}
          onClick={() => setTab("business")}
        >
          Invest in {dogName}'s world
        </button>
      </div>

      {tab === "direct" ? (
        <div className="grid">
          {categories.length > 0
            ? categories.map((c) => <AssetCard key={c.id} item={c} />)
            : buildFundingCategories({
                name: "a dog",
                breed: "Mixed",
                size: "Medium",
                energy: "Medium",
                careNeeds: "Regular brushing and walks",
              }).map((c) => <AssetCard key={c.id} item={c} />)}
        </div>
      ) : (
        <div className="grid">
          {BUSINESSES.map((b) => (
            <AssetCard key={b.id} item={b} />
          ))}
        </div>
      )}
    </div>
  );
}
