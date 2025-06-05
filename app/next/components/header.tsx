"use client";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "../app/auth/AuthContext";
import { useState, useRef, useEffect } from "react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "About Us", href: "/about" },
  { name: "Contact Us", href: "/contact" },
];

export default function Header() {
  const { signedIn, setSignedIn } = useAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <header className="w-full px-6 py-4 shadow-md bg-white flex items-center justify-between relative">
      {/* Left: Logo */}
      <div style={{ minWidth: 200, display: "flex", alignItems: "center" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center" }}>
          <Image
            src="/assets/logo-header.png"
            alt="Bookly Header Logo"
            width={200}
            height={80}
            style={{ objectFit: "contain" }}
          />
        </Link>
      </div>
      {/* Center: Nav */}
      <nav
        className="space-x-6 hidden md:flex"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`text-gray-600 font-medium transition-colors ${
              !signedIn ? "pointer-events-none opacity-50" : "hover:text-blue-600"
            }`}
            tabIndex={signedIn ? 0 : -1}
            aria-disabled={!signedIn}
          >
            {item.name}
          </Link>
        ))}
      </nav>
      {/* Right: Icons */}
      <div className="flex items-center space-x-4 text-2xl text-gray-600 relative" style={{ minWidth: 80, justifyContent: "flex-end" }}>
        <button
          className="hover:text-blue-600 transition-colors"
          aria-label="Notifications"
        >
          🔔
        </button>
        <div ref={dropdownRef} className="relative">
          <button
            className="hover:text-blue-600 transition-colors"
            aria-label="Profile"
            onClick={() => setOpen((o) => !o)}
          >
            👤
          </button>
          {open && signedIn && (
            <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10">
              <Link
                href="/profile"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                Profile
              </Link>
              <button
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  setOpen(false);
                  setSignedIn(false);
                }}
              >
                Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}