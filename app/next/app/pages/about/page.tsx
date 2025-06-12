'use client';

import { Montserrat } from "next/font/google";
import Image from "next/image";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-montserrat",
});

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Introduction Section */}
        <div className="max-w-3xl mb-20">
          <h1 className={`text-5xl font-bold mb-4 text-black ${montserrat.className}`}>
            About <span style={{ color: "#EDAE49" }}>Us</span>
          </h1>
          <p className="text-lg text-black" style={{ fontFamily: "Gotham, Arial, sans-serif" }}>
            At Bookly PH, we believe that booking services should be as easy as a tap on your screen. Whether you need a health check-up, salon appointment, home repair, or tech support, we connect you with trusted service providers across Baguio City— all in one place.
          </p>
        </div>

        {/* Mission Section */}
        <div className="flex flex-col md:flex-row items-start gap-12 mb-20">
          <div className="flex-1">
            <Image
              src="/assets/mission-illustration.svg"
              alt="Mission Illustration"
              width={600}
              height={400}
              className="w-full"
              priority
            />
          </div>
          <div className="flex-1">
            <h2 className={`text-4xl font-bold mb-6 ${montserrat.className}`}>
              Our Mission
            </h2>
            <div className="space-y-6">
              <p className="text-lg">
                To revolutionize the way people book appointments by providing a seamless, 
                fast, and reliable multi-service booking platform that saves time, reduces 
                hassle, and enhances convenience for both customers and service providers.
              </p>
              <p className="text-lg text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed 
                do eiusmod tempor incididunt ut labore et dolore magna 
                aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
                ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                Duis aute irure dolor in reprehenderit in voluptate velit esse 
                cillum dolore eu fugiat nulla pariatur.
              </p>
            </div>
          </div>
        </div>

        {/* What We Offer Section */}
        <div className="relative bg-[#007ACC] text-white rounded-lg p-8 overflow-hidden">
          <div className="absolute top-4 right-4">
            <Image
              src="/assets/pencil-icon.svg"
              alt="Pencil Icon"
              width={40}
              height={40}
              className="transform rotate-45"
            />
          </div>
          <h2 className={`text-3xl font-bold mb-6 ${montserrat.className}`}>
            What we offer:
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded border border-white flex items-center justify-center mt-1">
                ✓
              </div>
              <p className="flex-1">
                All-in-One Booking – Find and book clinics, salons, and more in just a few clicks.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded border border-white flex items-center justify-center mt-1">
                ✓
              </div>
              <p className="flex-1">
                Trusted Providers – We partner with verified professionals to ensure quality services.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded border border-white flex items-center justify-center mt-1">
                ✓
              </div>
              <p className="flex-1">
                Real-Time Scheduling – Pick an available date and time that suits you best.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded border border-white flex items-center justify-center mt-1">
                ✓
              </div>
              <p className="flex-1">
                Secure Transactions – Safe and hassle-free online payments and booking confirmations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}