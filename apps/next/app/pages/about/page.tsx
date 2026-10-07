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
        </div>        {/* What We Offer Section - Clipboard Style */}
        <div className="flex justify-center mb-20">
          <div className="relative">
            {/* Clipboard Background */}
            <div className="bg-[#007ACC] p-8 rounded-lg shadow-lg relative">
              {/* Clipboard Clip */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-24 h-8 bg-gray-300 rounded-t-lg border-2 border-gray-400"></div>
              
              {/* Paper Content */}
              <div className="bg-white p-8 rounded-lg shadow-inner max-w-2xl">
                <h2 className={`text-3xl font-bold mb-8 text-black text-center ${montserrat.className}`}>
                  What we offer:
                </h2>
                
                <div className="space-y-6">
                  {/* All-in-One Booking */}
                  <div className="flex items-start gap-4 pb-4 border-b border-gray-200">
                    <div className="flex-shrink-0 w-6 h-6 border-2 border-green-600 bg-green-100 rounded flex items-center justify-center mt-1">
                      <span className="text-green-700 text-sm font-bold">✓</span>
                    </div>
                    <p className="text-black text-lg leading-relaxed">
                      <span className="font-semibold">All-in-One Booking</span> – Find and book clinics, salons, and more in just a few clicks.
                    </p>
                  </div>

                  {/* Trusted Providers */}
                  <div className="flex items-start gap-4 pb-4 border-b border-gray-200">
                    <div className="flex-shrink-0 w-6 h-6 border-2 border-green-600 bg-green-100 rounded flex items-center justify-center mt-1">
                      <span className="text-green-700 text-sm font-bold">✓</span>
                    </div>
                    <p className="text-black text-lg leading-relaxed">
                      <span className="font-semibold">Trusted Providers</span> – We partner with verified professionals to ensure quality services.
                    </p>
                  </div>

                  {/* Real-Time Scheduling */}
                  <div className="flex items-start gap-4 pb-4 border-b border-gray-200">
                    <div className="flex-shrink-0 w-6 h-6 border-2 border-green-600 bg-green-100 rounded flex items-center justify-center mt-1">
                      <span className="text-green-700 text-sm font-bold">✓</span>
                    </div>
                    <p className="text-black text-lg leading-relaxed">
                      <span className="font-semibold">Real-Time Scheduling</span> – Pick an available date and time that suits you best.
                    </p>
                  </div>

                  {/* Secure Transactions */}
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-6 h-6 border-2 border-green-600 bg-green-100 rounded flex items-center justify-center mt-1">
                      <span className="text-green-700 text-sm font-bold">✓</span>
                    </div>
                    <p className="text-black text-lg leading-relaxed">
                      <span className="font-semibold">Secure Transactions</span> – Safe and hassle-free online payments and booking confirmations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Bookly PH Section */}
        <div className="mb-20">
          <h2 className={`text-4xl font-bold mb-12 text-center text-black ${montserrat.className}`}>
            Why Choose Bookly PH?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Convenience */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-orange-400 rounded-full flex items-center justify-center">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-green-500 text-xl">✓</span>
                </div>
              </div>
              <h3 className={`text-xl font-semibold mb-3 text-black ${montserrat.className}`}>
                Convenience
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                No more long calls or waiting in line—book anytime, anywhere!
              </p>
            </div>

            {/* Reliability */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-blue-400 rounded-full flex items-center justify-center">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-blue-500 text-xl">🕐</span>
                </div>
              </div>
              <h3 className={`text-xl font-semibold mb-3 text-black ${montserrat.className}`}>
                Reliability
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Your appointments are confirmed, and reminders keep you updated.
              </p>
            </div>

            {/* Diverse Services */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-cyan-300 rounded-full flex items-center justify-center">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-purple-500 text-xl">👥</span>
                </div>
              </div>
              <h3 className={`text-xl font-semibold mb-3 text-black ${montserrat.className}`}>
                Diverse Services
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                From beauty & wellness to tech & home repairs, we've got it all.
              </p>
            </div>

            {/* Baguio-Focused */}
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-orange-500 rounded-full flex items-center justify-center">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                  <span className="text-orange-600 text-xl">🎯</span>
                </div>
              </div>
              <h3 className={`text-xl font-semibold mb-3 text-black ${montserrat.className}`}>
                Baguio-Focused
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Tailored specifically for residents and businesses in Baguio City.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}