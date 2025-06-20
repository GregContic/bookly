"use client";
import Link from "next/link";
import Header from "../../../components/header";

export default function Services() {
  const footerColor = "#EDAE49";

  // Helper function to generate service ID from name
  const generateServiceId = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  };

  // Example data for services in categories
  const healthWellness = [
    { id: generateServiceId("PrimeCare Medical Clinic"), name: "PrimeCare Medical Clinic", logo: "/assets/primecare.png" },
    { id: generateServiceId("SmileBright Dental"), name: "SmileBright Dental", logo: "/assets/smilebright.png" },
    { id: generateServiceId("Evercare Family Medical Clinic"), name: "Evercare Family Medical Clinic", logo: "/assets/evercare.png" },
    { id: generateServiceId("Dr.teeth Dental Care"), name: "Dr.teeth Dental Care", logo: "/assets/drteeth.png" },
    { id: generateServiceId("Clear Vision Eye Clinic"), name: "Clear Vision Eye Clinic", logo: "/assets/clearvision.png" },
  ];
  const beautyCare = [
    { id: generateServiceId("Serene Escape Spa"), name: "Serene Escape Spa", logo: "/assets/sereneescape.png" },
    { id: generateServiceId("David's Salon"), name: "David's Salon", logo: "/assets/davidsalon.png" },
    { id: generateServiceId("Ink Haven Tattoo & Peircing Studio"), name: "Ink Haven Tattoo & Peircing Studio", logo: "/assets/inkhaven.png" },
    { id: generateServiceId("Kwentong Barbero"), name: "Kwentong Barbero", logo: "/assets/barber-logo.png" },
    { id: generateServiceId("Tranquil Touch Spa"), name: "Tranquil Touch Spa", logo: "/assets/tranquiltouch.png" },
  ];
  const automotive = [
    { id: generateServiceId("Autocare"), name: "Autocare", logo: "/assets/autocare.png" },
    { id: generateServiceId("Speedmaster Dhods"), name: "Speedmaster Dhods", logo: "/assets/speedmaster.png" },
    { id: generateServiceId("TT"), name: "TT", logo: "/assets/tt.png" },
    { id: generateServiceId("ProAuto Detailing"), name: "ProAuto Detailing", logo: "/assets/proauto.png" },
    { id: generateServiceId("Shine Car"), name: "Shine Car", logo: "/assets/shinecar.png" },
  ];
  const fitnessSports = [
    { id: generateServiceId("Zen Yoga Studio"), name: "Zen Yoga Studio", logo: "/assets/zenyoga.png" },
    { id: generateServiceId("Elevate Dance Academy"), name: "Elevate Dance Academy", logo: "/assets/elevate.png" },
    { id: generateServiceId("Altitude Gym"), name: "Altitude Gym", logo: "/assets/altitude.png" },
    { id: generateServiceId("Murphy's Fitness Gym"), name: "Murphy's Fitness Gym", logo: "/assets/murphys.png" },
    { id: generateServiceId("ZenFlow Yoga"), name: "ZenFlow Yoga", logo: "/assets/zenflow.png" },
  ];
  const homeServices = [
    { id: generateServiceId("Fresh Nest Cleaning"), name: "Fresh Nest Cleaning", logo: "/assets/freshnest.png" },
    { id: generateServiceId("SwiftFix Plumbing Services"), name: "SwiftFix Plumbing Services", logo: "/assets/swiftfix.png" },
    { id: generateServiceId("Power Pro Repair"), name: "Power Pro Repair", logo: "/assets/powerpro.png" },
    { id: generateServiceId("Baguio Home Cleaners"), name: "Baguio Home Cleaners", logo: "/assets/baguiocleaners.png" },
    { id: generateServiceId("QuickFix Solutions"), name: "QuickFix Solutions", logo: "/assets/quickfix.png" },
  ];
  const techItServices = [
    { id: generateServiceId("Byte Fix"), name: "Byte Fix", logo: "/assets/bytefix.png" },
    { id: generateServiceId("PC Masters Hub"), name: "PC Masters Hub", logo: "/assets/pcmasters.png" },
    { id: generateServiceId("Mobile Tech Repair Center"), name: "Mobile Tech Repair Center", logo: "/assets/mobiletech.png" },
    { id: generateServiceId("CloudSync IT Consulting"), name: "CloudSync IT Consulting", logo: "/assets/cloudsync.png" },
    { id: generateServiceId("TecnoPro"), name: "TecnoPro", logo: "/assets/tecnopro.png" },
  ];

  // Helper to render a category section
  function CategorySection({ title, services }: { title: string; services: { id: string; name: string; logo: string }[] }) {
    return (
      <>
        <div className="flex flex-row items-center justify-between mb-2 mt-10">
          <div className="text-2xl md:text-3xl font-bold text-black">{title}</div>
          <Link 
            href={`/pages/services/category/${encodeURIComponent(title)}`}
            className="text-black text-base underline hover:text-yellow-600 transition"
          >
            View more
          </Link>
        </div>        <div className="w-full flex flex-row gap-6 overflow-x-auto pb-4">
          {services.map((svc) => (            <Link
              key={svc.name}
              href={`/pages/services/shop/${svc.id}`}
              className="flex flex-col items-center bg-white border border-gray-300 rounded-xl min-w-[220px] max-w-[240px] px-4 py-6 shadow-sm hover:shadow-lg transition cursor-pointer relative group"
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
            </Link>
          ))}
        </div>
      </>
    );
  }
  return (
    <>
      <Header />
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
        <CategorySection title="Fitness & Sports" services={fitnessSports} />        <CategorySection title="Home Services" services={homeServices} />
        <CategorySection title="Tech & IT Services" services={techItServices} />
      </div>
    </main>
    </>
  );
}