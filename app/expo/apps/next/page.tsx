"use client";
import Image from "next/image";
import { useAuth } from "./AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { BentoGrid } from "@/components/magicui/bento-grid";

// In the future, fetch these from your backend/API
const defaultCategories = [
  "Health & Wellness",
  "Beauty & Personal Care",
  "Automotive Services",
  "Fitness & Sports",
  "Home Service",
  "Tech & IT Services",
  "Pet Care",
  "Laundry",
  "Events",
  "Education",
  "Legal",
  "Finance",
];

const defaultStats = [
  {
    value: "20k+",
    description: "Trusted by over 20,000 service providers and customers across Baguio.",
  },
  {
    value: "150k+",
    description: "More than 150,000 successful bookings made across various services.",
  },
  {
    value: "98k+",
    description: "Over 90,000 positive reviews from satisfied customers.",
  },
];

export default function Home() {
  const { signedIn } = useAuth();
  const router = useRouter();

  const [categories, setCategories] = useState<string[]>(defaultCategories);
  const [stats, setStats] = useState(defaultStats);
  const [loading, setLoading] = useState(false);

  // Pagination logic
  const perPage = 6;
  const totalPages = Math.ceil(categories.length / perPage);
  const [page, setPage] = useState(0);

  // Animation state for category click
  const [clickedIdx, setClickedIdx] = useState<number | null>(null);

  // Animation state for page change
  const [pageAnimating, setPageAnimating] = useState(false);

  useEffect(() => {
    if (!signedIn) {
      router.replace("/sign-in");
    }
  }, [signedIn, router]);

  if (!signedIn) return null;

  return (
    <>
      {/* HERO SECTION */}
      <main
        style={{
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#fff",
          padding: "0 0 0 4vw",
        }}
      >
        {/* Left: Headline, subtext, search */}
        <div
          style={{
            width: "50vw",
            minWidth: 320,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <SparklesText>
            <h1
              className="text-4xl md:text-6xl font-extrabold mb-6"
              style={{
                lineHeight: 1.15,
                marginBottom: 24,
                animation: "slideUpFadeIn 0.9s cubic-bezier(.23,1.02,.53,.97)",
                animationFillMode: "both",
              }}
            >
              All your essential<br />
              services, just a<br />
              tap away.
            </h1>
          </SparklesText>
          <p
            style={{
              fontSize: "1.15rem",
              color: "#444",
              lineHeight: 1.6,
              maxWidth: 600,
              marginBottom: 36,
              animation: "slideRightFadeIn 1.1s 0.2s cubic-bezier(.23,1.02,.53,.97)",
              animationFillMode: "both",
            }}
          >
            Seamless scheduling for beauty, wellness, home, and more. Find trusted providers and manage your appointments with ease
          </p>
          {/* Search bar */}
          <div className="flex flex-row items-center gap-3 mt-2" style={{ maxWidth: 520 }}>
            <input
              type="text"
              placeholder="What service are you looking for?"
              className="w-full px-5 py-3 rounded-xl border border-gray-400 focus:border-yellow-500 focus:outline-none text-base shadow transition"
              style={{
                background: "#fff",
                fontSize: "1rem",
                borderWidth: 1.5,
              }}
            />
            <button
              className="rounded-xl px-7 py-3 font-semibold text-lg"
              style={{
                background: "#EDAE49",
                color: "#222",
                boxShadow: "0 2px 8px 0 rgba(237,174,73,0.10)",
                border: "none",
                transition: "background 0.2s",
              }}
            >
              Search
            </button>
          </div>
          {/* Keyframes for animation */}
          <style>{`
            @keyframes slideUpFadeIn {
              0% {
                opacity: 0;
                transform: translateY(40px) scale(0.98);
              }
              80% {
                opacity: 1;
                transform: translateY(-4px) scale(1.01);
              }
              100% {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
            }
            @keyframes slideRightFadeIn {
              0% {
                opacity: 0;
                transform: translateX(60px) scale(0.98);
              }
              80% {
                opacity: 1;
                transform: translateX(-4px) scale(1.01);
              }
              100% {
                opacity: 1;
                transform: translateX(0) scale(1);
              }
            }
          `}</style>
        </div>
        {/* Right: Illustration */}
        <div
          style={{
            width: "50vw",
            minWidth: 320,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingRight: "5vw",
          }}
        >
          <Image
            src="/assets/study.png"
            alt="Appointment illustration"
            width={500}
            height={500}
            style={{ objectFit: "contain", borderRadius: "1rem" }}
            priority
          />
        </div>
      </main>

      {/* BUSINESS CATEGORIES */}
      <div className="w-full flex flex-col items-center mt-16 px-4">
        <div className="font-bold text-3xl md:text-6xl mb-8 text-gray-900 text-left w-full">
          Business Categories
        </div>
        <div className="w-full flex justify-center">
          <div className="w-full max-w-7xl">
            {loading ? (
              <div className="text-center py-16 text-lg text-gray-500">Loading...</div>
            ) : (
              <BentoGrid
                className={`gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full transition-all duration-300
                  ${pageAnimating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}
              >
                {categories
                  .slice(page * perPage, page * perPage + perPage)
                  .map((cat, idx) => (
                    <div
                      key={cat}
                      className={`flex flex-col items-center justify-center border-2 bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all duration-200 hover:scale-105 ${
                        clickedIdx === idx ? "scale-95" : ""
                      }`}
                      style={{
                        minHeight: 56,
                        width: "100%",
                        boxSizing: "border-box",
                        borderColor: "#0E79B2",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setClickedIdx(idx);
                        setTimeout(() => setClickedIdx(null), 150);
                      }}
                    >
                      <span className="text-lg font-semibold" style={{ color: "#0E79B2" }}>{cat}</span>
                      <button
                        className="mt-2 px-3 py-2 rounded-lg border font-medium bg-blue-50 hover:bg-blue-100 transition"
                        style={{
                          borderColor: "#0E79B2",
                          color: "#0E79B2",
                        }}
                        onClick={e => {
                          e.stopPropagation();
                          alert(`Clicked ${cat}`);
                        }}
                      >
                        View Providers
                      </button>
                    </div>
                  ))}
              </BentoGrid>
            )}
            {/* Pagination Dots */}
            <div className="flex justify-center gap-3 mt-8">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  aria-label={`Go to page ${idx + 1}`}
                  onClick={() => {
                    setPageAnimating(true);
                    setTimeout(() => {
                      setPage(idx);
                      setPageAnimating(false);
                    }, 300);
                  }}
                  className={`w-4 h-4 rounded-full border-2 border-yellow-400 transition-all ${
                    idx === page ? "bg-yellow-400" : "bg-white"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* STATS SECTION */}
      <div
        style={{
          width: "100vw",
          maxWidth: "100%",
          background: "#EDAE49",
          borderRadius: "2rem",
          marginTop: 64,
          padding: "48px 0",
          display: "flex",
          justifyContent: "center",
          boxShadow: "0 4px 24px 0 rgba(237,174,73,0.10)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 1440,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "0 5vw",
          }}
        >
          <h1
            style={{
              color: "#222",
              fontWeight: 900,
              fontSize: "3rem",
              marginBottom: 40,
              textAlign: "center",
              letterSpacing: 1,
            }}
          >
            Bookly PH: Your Go-To Service Platform
          </h1>
          {/* Columns */}
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 32,
            }}
          >
            {stats.map((stat, idx) => (
              <div key={idx} style={{ flex: 1, minWidth: 220, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <h2 style={{ color: "#222", fontWeight: 700, fontSize: "2rem", marginBottom: 16, textAlign: "center" }}>
                  {stat.value}
                </h2>
                <div
                  style={{
                    color: "#222",
                    fontSize: "1.1rem",
                    marginBottom: 8,
                    width: 260,
                    wordBreak: "break-word",
                    textAlign: "center",
                  }}
                >
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}