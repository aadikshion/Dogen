"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Nav() {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);

  function load() {
    const stored = window.localStorage.getItem("dogen-profile");
    if (stored) {
      const parsed = JSON.parse(stored);
      setPhotoUrl(parsed.photoUrl ?? null);
      setName(parsed.name ?? null);
    } else {
      setPhotoUrl(null);
      setName(null);
    }
  }

  useEffect(() => {
    load();
    window.addEventListener("dogen-profile-updated", load);
    return () => window.removeEventListener("dogen-profile-updated", load);
  }, []);

  return (
    <div className="nav">
      <Link href="/" className="nav-name">
        Dogen
      </Link>
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <Link href="/meet-my-dog" style={{ color: "var(--text-on-ink)", fontSize: 14, textDecoration: "none" }}>
          Meet my dog
        </Link>
        <Link href="/dog-economy" style={{ color: "var(--text-on-ink)", fontSize: 14, textDecoration: "none" }}>
          Dog economy
        </Link>
        {photoUrl && <img src={photoUrl} alt={name ?? "Dog"} className="avatar" />}
        <span className="tag">sandbox · sepolia</span>
      </div>
    </div>
  );
}
