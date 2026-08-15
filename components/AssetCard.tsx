import Link from "next/link";
import { AssetListItem } from "@/lib/types";

const ICONS: Record<string, string> = {
  feeding: "🍖",
  vet: "🩺",
  grooming: "🧼",
  training: "🎾",
};

const ACCENTS: Record<string, string> = {
  feeding: "#c8963a",
  vet: "#a13f3f",
  grooming: "#3f7a8a",
  training: "#4b7a4f",
};

export default function AssetCard({ item }: { item: AssetListItem }) {
  const title = item.kind === "direct" ? item.title : item.name;
  const description = item.kind === "direct" ? item.description : item.pitch;
  const icon = item.kind === "direct" ? ICONS[item.id] ?? "🐾" : "🏪";
  const accent = item.kind === "direct" ? ACCENTS[item.id] ?? "#c8963a" : "#8a8270";

  return (
    <Link
      href={`/asset/${item.id}?kind=${item.kind}`}
      className="card"
      style={{ display: "block", borderLeft: `4px solid ${accent}` }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
        <span style={{ fontSize: 18 }}>{icon}</span>
        <div className="label" style={{ marginBottom: 0 }}>
          {item.kind === "direct" ? "Direct" : "Business"}
        </div>
      </div>
      <h3 style={{ fontSize: 18, marginBottom: 8 }}>{title}</h3>
      <p style={{ color: "#5c574a", fontSize: 14, marginBottom: 16 }}>{description}</p>
      <div className="target mono">${item.targetUSD.toLocaleString()}</div>
    </Link>
  );
}
