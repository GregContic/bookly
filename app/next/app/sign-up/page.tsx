"use client";
import { useAuth } from "../auth/AuthContext";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function SignUp() {
  const { signedIn, setSignedIn } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSignedIn(true);
    router.replace("/");
  };

  useEffect(() => {
  if (signedIn) {
    router.replace("/");
  }
}, [signedIn, router]);

if (signedIn) return null;

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
      }}
    >
      <Link
        href="/"
        className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors px-8 py-6"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        BOOKLY PH
      </Link>
      <div
        style={{
          width: "45vw",
          minWidth: 400,
          maxWidth: 700,
          marginLeft: "5vw",
          marginTop: "6vh",
          padding: "2.5rem 3rem",
          borderRadius: "1rem",
          boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
          background: "#fff",
          textAlign: "center",
          animation: "flipIn 0.7s cubic-bezier(0.23, 1, 0.32, 1)",
          backfaceVisibility: "hidden",
          perspective: "1000px",
        }}
      >
        <h2 style={{ fontSize: "2rem", marginBottom: "1.2rem" }}>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "1rem",
                borderRadius: "0.5rem",
                border: "1px solid #ccc",
                fontSize: "1.1rem",
              }}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "1rem",
                borderRadius: "0.5rem",
                border: "1px solid #ccc",
                fontSize: "1.1rem",
              }}
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              marginBottom: "1rem",
              padding: "1rem",
              borderRadius: "0.5rem",
              border: "1px solid #ccc",
              fontSize: "1.1rem",
            }}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              marginBottom: "1rem",
              padding: "1rem",
              borderRadius: "0.5rem",
              border: "1px solid #ccc",
              fontSize: "1.1rem",
            }}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              marginBottom: "1rem",
              padding: "1rem",
              borderRadius: "0.5rem",
              border: "1px solid #ccc",
              fontSize: "1.1rem",
            }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.9rem",
              fontSize: "1.2rem",
              fontWeight: "bold",
              background: "#EDAE49",
              color: "#222",
              border: "none",
              borderRadius: "0.5rem",
              cursor: "pointer",
              marginBottom: "1rem",
              marginTop: "0.5rem",
              boxShadow: "inset 0 2px 8px rgba(0,0,0,0.12)",
            }}
          >
            Sign Up
          </button>
        </form>
        <div style={{ fontSize: "1rem" }}>
          Already have an account?{" "}
          <Link href="/sign-in" style={{ color: "#EDAE49", fontWeight: 600 }}>
            Sign in
          </Link>
        </div>
        <style>{`
          @keyframes flipIn {
            0% {
              opacity: 0;
              transform: rotateY(90deg) scale(0.8);
            }
            60% {
              opacity: 1;
              transform: rotateY(-10deg) scale(1.05);
            }
            80% {
              transform: rotateY(5deg) scale(0.97);
            }
            100% {
              opacity: 1;
              transform: rotateY(0deg) scale(1);
            }
          }
        `}</style>
      </div>
    </main>
  );
}