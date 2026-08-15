import Link from "next/link";

const STEPS = [
  { n: "01", title: "Meet your dog", body: "Upload a photo. Google AI builds a simple care profile." },
  { n: "02", title: "See the economy", body: "See what feeding, vet care, grooming, and training actually cost." },
  { n: "03", title: "Back something", body: "Fund your dog's care directly, or back a dog business nearby." },
  { n: "04", title: "Tokenize it", body: "Brickken turns the pick into a sandbox token on Sepolia." },
];

export default function Home() {
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
          {STEPS.map((step) => (
            <div key={step.n} className="card">
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
