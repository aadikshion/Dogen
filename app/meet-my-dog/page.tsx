"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import DogProfileCard from "@/components/DogProfileCard";
import { DogProfile } from "@/lib/types";

function fileToBase64(file: File): Promise<{ base64: string; mimeType: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const [, base64] = result.split(",");
      resolve({ base64, mimeType: file.type });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function MeetMyDog() {
  const [dogName, setDogName] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [profile, setProfile] = useState<DogProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [audioLoading, setAudioLoading] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("dogen-profile");
    if (stored) {
      const parsed = JSON.parse(stored) as DogProfile;
      setProfile(parsed);
      setDogName(parsed.name);
      setPreviewUrl(parsed.photoUrl ?? null);
    }
  }, []);

  function startOver() {
    window.localStorage.removeItem("dogen-profile");
    window.localStorage.removeItem("dogen-categories");
    setProfile(null);
    setDogName("");
    setPreviewUrl(null);
    window.dispatchEvent(new Event("dogen-profile-updated"));
  }

  async function handleFile(file: File) {
    setError(null);
    setAnalyzing(true);
    try {
      const { base64, mimeType } = await fileToBase64(file);
      const dataUrl = `data:${mimeType};base64,${base64}`;
      setPreviewUrl(dataUrl);

      const res = await fetch("/api/analyze-dog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageBase64: base64, mimeType, dogName: dogName || "Your dog" }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Something went wrong reading the photo");

      const fullProfile = { ...data, photoUrl: dataUrl };
      setProfile(fullProfile);
      window.localStorage.setItem("dogen-profile", JSON.stringify(fullProfile));
      window.localStorage.removeItem("dogen-categories");
      window.dispatchEvent(new Event("dogen-profile-updated"));
    } catch (err: any) {
      setError(err.message ?? "Something went wrong");
    } finally {
      setAnalyzing(false);
    }
  }

  async function hearDog() {
    if (!profile) return;
    setAudioLoading(true);
    try {
      const line = `Hi, I'm ${profile.name}. Someone said they're going to help pay for my ${profile.careNeeds.toLowerCase()}. I don't fully understand tokens, but I understand treats, so I'm in favor.`;
      const res = await fetch("/api/speak", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: line }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Could not generate audio");
      }
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      new Audio(url).play();
    } catch (err: any) {
      setError(err.message ?? "Could not play audio");
    } finally {
      setAudioLoading(false);
    }
  }

  return (
    <div className="page">
      <div className="label">Step one</div>
      <h1 style={{ marginBottom: 24 }}>Meet your dog</h1>

      <div className="card">
        <div className="label">Dog's name</div>
        <input
          value={dogName}
          onChange={(e) => setDogName(e.target.value)}
          placeholder="Bruno"
          style={{
            width: "100%",
            padding: "10px 12px",
            fontSize: 15,
            border: "1px solid var(--line)",
            borderRadius: 6,
            marginBottom: 20,
          }}
        />

        <div className="label">Photo</div>
        <label className="upload-box" style={{ display: "block", cursor: "pointer" }}>
          {previewUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={previewUrl} alt="Dog preview" style={{ maxHeight: 220, borderRadius: 8 }} />
          ) : (
            <span style={{ color: "#8a8270" }}>Click to upload a photo</span>
          )}
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
        </label>

        {analyzing && (
          <p className="mono" style={{ marginTop: 16, color: "#8a8270", fontSize: 13 }}>
            Analyzing with Google AI...
          </p>
        )}
        {error && <p style={{ marginTop: 16, color: "#a13f3f" }}>{error}</p>}
      </div>

      {profile && (
        <div style={{ marginTop: 24 }}>
          <DogProfileCard profile={profile} />

          <div style={{ marginTop: 16, display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
            <button className="audio-btn" onClick={hearDog} disabled={audioLoading}>
              {audioLoading ? "Loading..." : `Hear ${profile.name} speak`}
            </button>
            <Link href="/dog-economy" className="btn btn-brass">
              See the dog economy
            </Link>
            <button
              onClick={startOver}
              style={{ background: "none", border: "none", color: "#8a8270", fontSize: 14, cursor: "pointer" }}
            >
              Start over with a different dog
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
