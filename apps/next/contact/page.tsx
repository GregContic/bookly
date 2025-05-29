"use client";
import React from 'react'

export default function About() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          fontSize: "4rem",
          fontWeight: "bold",
          textAlign: "center",
          animation: "blurIn 1s ease",
        }}
      >
        Contact
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
  )
}