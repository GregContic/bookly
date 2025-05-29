"use client";
import React from "react";

export default function Services() {
  const footerColor = "#EDAE49";

  // Example data for services in categories
  const healthWellness = [
    { name: "PrimeCare Medical Clinic", logo: "/assets/primecare.png" },
    { name: "SmileBright Dental", logo: "/assets/smilebright.png" },
    { name: "Evercare Family Medical Clinic", logo: "/assets/evercare.png" },
    { name: "Dr.teeth Dental Care", logo: "/assets/drteeth.png" },
    { name: "Clear Vision Eye Clinic", logo: "/assets/clearvision.png" },
  ];
  const beautyCare = [
    { name: "Serene Escape Spa", logo: "/assets/sereneescape.png" },
    { name: "David’s Salon", logo: "/assets/davidsalon.png" },
    { name: "Ink Haven Tattoo & Peircing Studio", logo: "/assets/inkhaven.png" },
    { name: "Kwentong Barbero", logo: "/assets/barber-logo.png" },
    { name: "Tranquil Touch Spa", logo: "/assets/tranquiltouch.png" },
  ];
  const automotive = [
    { name: "Autocare", logo: "/assets/autocare.png" },
    { name: "Speedmaster Dhods", logo: "/assets/speedmaster.png" },
    { name: "TT", logo: "/assets/tt.png" },
    { name: "ProAuto Detailing", logo: "/assets/proauto.png" },
    { name: "Shine Car", logo: "/assets/shinecar.png" },
  ];
  const fitnessSports = [
    { name: "Zen Yoga Studio", logo: "/assets/zenyoga.png" },
    { name: "Elevate Dance Academy", logo: "/assets/elevate.png" },
    { name: "Altitude Gym", logo: "/assets/altitude.png" },
    { name: "Murphy’s Fitness Gym", logo: "/assets/murphys.png" },
    { name: "ZenFlow Yoga", logo: "/assets/zenflow.png" },
  ];
  const homeServices = [
    { name: "Fresh Nest Cleaning", logo: "/assets/freshnest.png" },
    { name: "SwiftFix Plumbing Services", logo: "/assets/swiftfix.png" },
    { name: "Power Pro Repair", logo: "/assets/powerpro.png" },
    { name: "Baguio Home Cleaners", logo: "/assets/baguiocleaners.png" },
    { name: "QuickFix Solutions", logo: "/assets/quickfix.png" },
  ];
  const techItServices = [
    { name: "Byte Fix", logo: "/assets/bytefix.png" },
    { name: "PC Masters Hub", logo: "/assets/pcmasters.png" },
    { name: "Mobile Tech Repair Center", logo: "/assets/mobiletech.png" },
    { name: "CloudSync IT Consulting", logo: "/assets/cloudsync.png" },
    { name: "TecnoPro", logo: "/assets/tecnopro.png" },
  ];

  // Helper to render a category section
  function CategorySection({ title, services }: { title: string; services: { name: string; logo: string }[] }) {
    return (
      <>
        <div className="flex flex-row items-center justify-between mb-2 mt-10">
          <div className="text-2xl md:text-3xl font-bold text-black">{title}</div>
          <button className="text-black text-base underline hover:text-yellow-600 transition">
            View more
          </button>
        </div>
        <div className="w-full flex flex-row gap-6 overflow-x-auto pb-4">
          {services.map((svc) => (
            <div
              key={svc.name}
              className="flex flex-col items-center bg-white border border-gray-300 rounded-xl min-w-[220px] max-w-[240px] px-4 py-6 shadow-sm hover:shadow-lg transition"
              style={{ flex: "0 0 220px" }}
            >
              <img
                src={svc.logo}
                alt={svc.name}
                className="mb-4"
                style={{
                  width: 100,
                  height: 100,
                  objectFit: "contain",
                  borderRadius: 12,
                  background: "#f8f8f8",
                }}
              />
              <div className="text-base font-semibold text-center mt-2">
                {svc.name}
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        background: "linear-gradient(120deg, #fff 60%, #EDAE49 120%)",
        paddingTop: "8vh",
      }}
    >
      <div className="w-full max-w-7xl flex flex-col">
        {/* Header Row */}
        <div className="flex flex-row items-start justify-between mb-8">
          {/* Left: Header and Subheader with animation */}
          <div className="flex flex-col max-w-2xl">
            <h1
              className="text-4xl md:text-6xl font-extrabold leading-tight mb-2"
              style={{
                animation:
                  "slideUpFadeIn 0.9s cubic-bezier(.23,1.02,.53,.97), blurIn 0.7s 0.2s cubic-bezier(.23,1.02,.53,.97) both",
                animationFillMode: "both",
              }}
            >
              <span className="text-black">Your Trusted Source<br />for </span>
              <span style={{ color: footerColor }}>Quality Services</span>
            </h1>
            <p
              className="text-lg md:text-xl text-gray-700"
              style={{
                animation:
                  "slideRightFadeIn 1.1s 0.2s cubic-bezier(.23,1.02,.53,.97)",
                animationFillMode: "both",
              }}
            >
              Find the right service for your needs—whether it's beauty, wellness, home repairs, or professional consultations. Browse through our categories and book with trusted providers in just a few taps
            </p>
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
              @keyframes blurIn {
                0% {
                  opacity: 0;
                  filter: blur(16px);
                }
                80% {
                  opacity: 1;
                  filter: blur(2px);
                }
                100% {
                  opacity: 1;
                  filter: blur(0);
                }
              }
            `}</style>
          </div>
          {/* Right: Search Bar */}
          <div className="flex items-center max-w-sm ml-8 mt-2 w-[350px]">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-5 py-3 rounded-full border border-gray-300 focus:border-yellow-400 focus:outline-none text-lg shadow transition"
              style={{ minWidth: 240 }}
            />
          </div>
        </div>
        {/* Category Sections */}
        <CategorySection title="Health & Wellness" services={healthWellness} />
        <CategorySection title="Beauty & Personal Care" services={beautyCare} />
        <CategorySection title="Automotive Services" services={automotive} />
        <CategorySection title="Fitness & Sports" services={fitnessSports} />
        <CategorySection title="Home Services" services={homeServices} />
        <CategorySection title="Tech & IT Services" services={techItServices} />
      </div>
    </main>
  );
}