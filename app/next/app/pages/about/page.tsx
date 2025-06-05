'use client';

import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-montserrat",
});

export default function AboutPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "flex-start", // Align to top
        justifyContent: "flex-start", // Align to left
      }}
    >
      <div
        className="px-8 py-10 max-w-3xl pl-50 pt-20"
        style={{
          animation: "blurIn 1s ease",
        }}
      >
        <h1
          className={`text-5xl font-bold mb-4 text-left text-black ${montserrat.className}`}
        >
          About <span style={{ color: "#EDAE49" }}>Us</span>
        </h1>
        <p
          className="text-lg text-left text-black"
          style={{ fontFamily: "Gotham, Arial, sans-serif" }}
        >
          At Bookly PH, we believe that booking services should be as easy as a tap on your screen. Whether you need a health check-up, salon appointment, home repair, or tech support, we connect you with trusted service providers across Baguio City— all in one place.
        </p>
      </div>
      <style jsx>{`
        @keyframes blurIn {
          0% {
            opacity: 0;
            filter: blur(20px);
          }
          100% {
            opacity: 1;
            filter: blur(0);
          }
        }
      `}</style>
    </main>
  );
}