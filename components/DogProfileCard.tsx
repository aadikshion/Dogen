import { DogProfile } from "@/lib/types";

export default function DogProfileCard({ profile }: { profile: DogProfile }) {
  return (
    <div className="card">
      <div className="label">Profile</div>
      <h2 style={{ marginBottom: 12 }}>{profile.name}</h2>
      <div style={{ display: "grid", gap: 8 }}>
        <Row label="Breed" value={profile.breed} />
        <Row label="Size" value={profile.size} />
        <Row label="Energy" value={profile.energy} />
        <Row label="Care needs" value={profile.careNeeds} />
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
      <span style={{ color: "#8a8270" }}>{label}</span>
      <span style={{ fontWeight: 600, textAlign: "right" }}>{value}</span>
    </div>
  );
}
