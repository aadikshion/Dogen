import Link from "next/link";

export default function Nav() {
  return (
    <div className="nav">
      <Link href="/" className="nav-name">
        Dogen
      </Link>
      <span className="tag">sandbox · sepolia</span>
    </div>
  );
}
