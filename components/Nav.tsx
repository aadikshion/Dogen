import Link from "next/link";

export default function Nav() {
  return (
    <div className="nav">
      <Link href="/" className="nav-name">
        Dogen
      </Link>
      <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
        <Link href="/meet-my-dog" style={{ color: "var(--text-on-ink)", fontSize: 14, textDecoration: "none" }}>
          Meet my dog
        </Link>
        <Link href="/dog-economy" style={{ color: "var(--text-on-ink)", fontSize: 14, textDecoration: "none" }}>
          Dog economy
        </Link>
        <span className="tag">sandbox · sepolia</span>
      </div>
    </div>
  );
}
