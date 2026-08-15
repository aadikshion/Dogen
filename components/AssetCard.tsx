import Link from "next/link";
import { AssetListItem } from "@/lib/types";

export default function AssetCard({ item }: { item: AssetListItem }) {
  const title = item.kind === "direct" ? item.title : item.name;
  const description = item.kind === "direct" ? item.description : item.pitch;

  return (
    <Link href={`/asset/${item.id}?kind=${item.kind}`} className="card" style={{ display: "block" }}>
      <div className="label">{item.kind === "direct" ? "Direct" : "Business"}</div>
      <h3 style={{ fontSize: 18, marginBottom: 8 }}>{title}</h3>
      <p style={{ color: "#5c574a", fontSize: 14, marginBottom: 16 }}>{description}</p>
      <div className="target mono">${item.targetUSD.toLocaleString()}</div>
    </Link>
  );
}
