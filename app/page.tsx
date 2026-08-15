"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const STEPS = [
  { n: "01", title: "Meet your dog", body: "Upload a photo, AI builds a care profile." },
  { n: "02", title: "See the economy", body: "See feeding, vet, grooming, training costs." },
  { n: "03", title: "Back something", body: "Fund your dog, or back a business nearby." },
  { n: "04", title: "Tokenize it", body: "Brickken turns the pick into a sandbox token." },
];

export default function Home() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % STEPS.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <div className="hero">
        <h1>Dogs create an entire economy. We make that economy visible.</h1>
        <p>
          Upload your dog, see what a year of owning one costs, and put sandbox
          money behind it, or behind a dog business nearby.
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

      <div className="page">
        <div className="grid">
          {STEPS.map((step, i) => (
            <div key={step.n} className={`card step-card ${active === i ? "step-card-active" : ""}`}>
              <div className="mono" style={{ color: "var(--brass-dim)", fontSize: 13, marginBottom: 6 }}>
                {step.n}
              </div>
              <h3 style={{ fontSize: 17, marginBottom: 6 }}>{step.title}</h3>
              <p style={{ fontSize: 14, color: "#5c574a" }}>{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
