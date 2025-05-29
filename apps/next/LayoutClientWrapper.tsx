"use client";
import { usePathname } from "next/navigation";
import Header from "./Header";
import Link from "next/link";
import Image from "next/image";

export default function LayoutClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = ["/sign-in", "/sign-up"].includes(pathname);

  return (
    <>
      {isAuthPage ? (
        <div className="w-full flex items-start">
          <Link
            href="/"
            className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors px-8 py-6"
            style={{ position: "absolute", top: 0, left: 0 }}
          >
            BOOKLY PH
          </Link>
          <div className="flex-grow flex flex-col bg-[#FFFFFF]">{children}</div>
        </div>
      ) : (
        <>
          <Header />
          <div className="flex-grow flex flex-col bg-[#FFFFFF]">{children}</div>
          <footer
            className="w-full"
            style={{
              background: "#EDAE49",
              marginTop: "auto",
              padding: 0,
            }}
          >
            <div
              style={{
                borderTop: "2px solid #fff",
                width: "100%",
                margin: 0,
                padding: 0,
              }}
            />
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "flex-start",
                justifyContent: "space-between",
                padding: "2rem 8vw 1rem 8vw",
                color: "#222",
              }}
            >
              {/* Logo */}
              <Image
                src="/assets/logo-footer.png"
                alt="Bookly Footer Logo"
                width={70}
                height={70}
                style={{
                  objectFit: "contain",
                  flex: "1 1 180px",
                  width: 100,
                  height: 100,
                  marginBottom: 5,
                }}
              />
              {/* Center columns */}
              <div
                style={{
                  display: "flex",
                  flex: "2 1 340px",
                  justifyContent: "center",
                  gap: "14rem", // Much more space between columns
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <a href="#" style={{ color: "#222", textDecoration: "none" }}>Blogs</a>
                  <a href="#" style={{ color: "#222", textDecoration: "none" }}>FAQs</a>
                  <a href="#" style={{ color: "#222", textDecoration: "none" }}>About Us</a>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <a href="#" style={{ color: "#222", textDecoration: "none" }}>Privacy Policy</a>
                  <a href="#" style={{ color: "#222", textDecoration: "none" }}>Refund Policy</a>
                  <a href="#" style={{ color: "#222", textDecoration: "none" }}>Terms and Conditions</a>
                </div>
              </div>
              {/* Socials */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1.2rem",
                  fontSize: "1.1rem",
                  flex: "1 1 180px",
                  justifyContent: "flex-end",
                }}
              >
                <a href="#" style={{ color: "#222", textDecoration: "none" }}>Facebook</a>
                <span>|</span>
                <a href="#" style={{ color: "#222", textDecoration: "none" }}>Instagram</a>
                <span>|</span>
                <a href="#" style={{ color: "#222", textDecoration: "none" }}>X</a>
                <span>|</span>
                <a href="#" style={{ color: "#222", textDecoration: "none" }}>Google</a>
              </div>
            </div>
            <div
              style={{
                textAlign: "center",
                color: "#222",
                fontSize: "1rem",
                paddingBottom: "0.7rem",
                paddingTop: "0.2rem",
                letterSpacing: "0.02em",
              }}
            >
              © 2025 Bookly PH. All rights reserved.
            </div>
          </footer>
        </>
      )}
    </>
  );
}