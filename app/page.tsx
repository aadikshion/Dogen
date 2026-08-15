import Link from "next/link";

export default function Home() {
  return (
    <div className="hero">
      <h1>Dogs create an entire economy. We make that economy investable.</h1>
      <p>
        Upload your dog, see what a real year of owning one costs, and put real
        sandbox money behind it, or behind a dog business nearby.
      </p>
      <div className="hero-actions">
        <Link href="/meet-my-dog" className="btn btn-brass">
          Meet my dog
        </Link>
        <Link href="/dog-economy" className="btn btn-outline">
          Explore dog businesses
        </Link>
      </div>
    </div>
  );
}
