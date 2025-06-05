"use client";
import Image from "next/image";
import { useAuth } from "../../auth/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SparklesText } from "../../../components/magicui/sparkles-text";
import { BentoGrid } from "../../../components/magicui/bento-grid";
import { BoxReveal } from "../../../components/magicui/box-reveal";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { BlurFade } from "../../../components/magicui/blur-fade";

const CATEGORIES = [
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

const STATS = [
  {
    value: "20k+",
    description:
      "Trusted by over 20,000 service providers and customers across Baguio.",
  },
  {
    value: "150k+",
    description:
      "More than 150,000 successful bookings made across various services.",
  },
  {
    value: "98k+",
    description: "Over 90,000 positive reviews from satisfied customers.",
  },
];

const ITEMS_PER_PAGE = 6;

export default function HeroSection() {
  const { signedIn } = useAuth();
  const router = useRouter();

  const [categories] = useState(CATEGORIES);
  const [stats] = useState(STATS);
  const [loading] = useState(false);
  const [page, setPage] = useState(0);
  const [clickedIdx, setClickedIdx] = useState<number | null>(null);
  const [pageAnimating, setPageAnimating] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  const totalPages = Math.ceil(categories.length / ITEMS_PER_PAGE);

  useEffect(() => {
    if (signedIn !== undefined) {
      setAuthChecked(true);
      if (!signedIn) {
        router.replace("/sign-in");
      }
    }
  }, [signedIn, router]);

  const handleCategoryClick = (idx: number) => {
    setClickedIdx(idx);
    setTimeout(() => setClickedIdx(null), 150);
  };

  const handlePageChange = (newPage: number) => {
    setPageAnimating(true);
    setTimeout(() => {
      setPage(newPage);
      setPageAnimating(false);
    }, 300);
  };

  const handleCategoryAction = (e: React.MouseEvent, category: string) => {
    e.stopPropagation();
    alert(`Clicked ${category}`);
  };

  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (!signedIn) return null;

  const currentCategories = categories.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  return (
    <>
      <style jsx>{`
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
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(-2deg);
          }
          50% {
            transform: translateY(-10px) rotate(-2deg);
          }
        }
        @keyframes floatReverse {
          0%,
          100% {
            transform: translateY(-5px) rotate(1deg);
          }
          50% {
            transform: translateY(5px) rotate(1deg);
          }
        }
        @keyframes floatSlow {
          0%,
          100% {
            transform: translateY(0px) rotate(2deg);
          }
          50% {
            transform: translateY(-15px) rotate(2deg);
          }
        }
        @keyframes floatTilt {
          0%,
          100% {
            transform: translateY(-3px) rotate(-3deg);
          }
          50% {
            transform: translateY(7px) rotate(-3deg);
          }
        }
        .float-1 {
          animation: float 3s ease-in-out infinite;
        }
        .float-2 {
          animation: floatReverse 4s ease-in-out infinite;
          animation-delay: 0.5s;
        }
        .float-3 {
          animation: floatSlow 5s ease-in-out infinite;
          animation-delay: 1s;
        }
        .float-4 {
          animation: floatTilt 3.5s ease-in-out infinite;
          animation-delay: 1.5s;
        }
        .float-5 {
          animation: float 4.5s ease-in-out infinite;
          animation-delay: 2s;
        }
        .float-6 {
          animation: floatReverse 3.8s ease-in-out infinite;
          animation-delay: 0.8s;
        }
      `}</style>

      {/* HERO SECTION */}
      <main className="min-h-[80vh] flex items-center justify-between bg-white px-4">
        <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
          <div className="w-1/2 min-w-80 flex flex-col justify-center">
            <BlurFade delay={0.25} inView>
              <BoxReveal>
                <SparklesText>
                  <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                    All your essential
                    <br />
                    services, just a<br />
                    tap away.
                  </h1>
                </SparklesText>
              </BoxReveal>
            </BlurFade>

            <BlurFade delay={0.5} inView>
              <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mb-9">
                Seamless scheduling for beauty, wellness, home, and more. Find
                trusted providers and manage your appointments with ease
              </p>
            </BlurFade>

            <BlurFade delay={0.75} inView>
              <BoxReveal>
                <div className="flex items-center gap-3 max-w-2xl">
                  <input
                    type="text"
                    placeholder="What service are you looking for?"
                    className="flex-1 px-5 py-3 rounded-xl border-2 border-gray-400 focus:border-yellow-500 focus:outline-none shadow transition-colors"
                  />
                  <button className="px-7 py-3 rounded-xl font-semibold text-lg bg-yellow-400 text-gray-900 hover:bg-yellow-500 transition-colors shadow-sm">
                    Search
                  </button>
                </div>
              </BoxReveal>
            </BlurFade>
          </div>

          <BlurFade delay={1} inView>
            <div className="w-[600px] h-[600px] flex items-center justify-center">
              <DotLottieReact
                src="https://lottie.host/6c6d90ad-cba3-4e19-bf86-1ed2dc33adcf/spHihscbp6.lottie"
                loop
                autoplay
                className="w-full h-full"
              />
            </div>
          </BlurFade>
        </div>
      </main>

      {/* BUSINESS CATEGORIES */}
      <section className="w-full flex flex-col items-center mt-16 px-4">
        <h2 className="max-w-7xl font-bold text-3xl md:text-6xl mb-8 text-gray-900 w-full">
          Business Categories
        </h2>

        <div className="w-full max-w-7xl">
          {loading ? (
            <div className="text-center py-16 text-lg text-gray-500">
              Loading...
            </div>
          ) : (
            <BentoGrid
              className={`gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full transition-all duration-300 ${
                pageAnimating
                  ? "opacity-0 translate-y-4"
                  : "opacity-100 translate-y-0"
              }`}
            >
              {currentCategories.map((category, idx) => (
                <div
                  key={category}
                  className={`flex flex-col items-center justify-center border-2 border-blue-600 bg-white rounded-2xl p-4 shadow-sm hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer ${
                    clickedIdx === idx ? "scale-95" : ""
                  }`}
                  onClick={() => handleCategoryClick(idx)}
                >
                  <span className="text-lg font-semibold text-blue-600 mb-2">
                    {category}
                  </span>
                  <button
                    className="px-3 py-2 rounded-lg border border-blue-600 font-medium bg-blue-50 hover:bg-blue-100 text-blue-600 transition-colors"
                    onClick={(e) => handleCategoryAction(e, category)}
                  >
                    View Providers
                  </button>
                </div>
              ))}
            </BentoGrid>
          )}

          {/* Pagination */}
          <div className="flex justify-center gap-3 mt-8">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                aria-label={`Go to page ${idx + 1}`}
                onClick={() => handlePageChange(idx)}
                className={`w-4 h-4 rounded-full border-2 border-yellow-400 transition-all ${
                  idx === page ? "bg-yellow-400" : "bg-white"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="w-full bg-[#EDAE49] mt-16 py-12 shadow-lg">
        <div className="max-w-7xl mx-auto px-20">
          <h2 className="text-gray-900 font-black text-5xl mb-10 text-center tracking-wide">
            Bookly PH: Your Go-To Service Platform
          </h2>

          <div className="flex justify-between items-start gap-8">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="flex-1 min-w-56 flex flex-col items-center"
              >
                <h3 className="text-gray-900 font-bold text-3xl mb-4 text-center">
                  {stat.value}
                </h3>
                <p className="text-gray-900 text-lg text-center max-w-64">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section className="w-full py-16 px-4 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="font-bold text-4xl md:text-5xl mb-16 text-gray-900 text-center">
            How Bookly PH works?
          </h2>
          {/* Main content container */}
          <div className="relative flex items-center justify-center min-h-[500px]">
            {/* Step 1 - Top Left */}
            <div className="absolute top-0 left-0 lg:left-8 flex flex-col items-center text-center max-w-xs">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-lg">
                1
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Find a service
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Browse through a wide range of trusted service providers in
                beauty, wellness, home repair, and more.
              </p>
            </div>

            {/* Step 2 - Bottom Left */}
            <div className="absolute bottom-0 left-0 lg:left-8 flex flex-col items-center text-center max-w-xs">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-lg">
                2
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Book an Appointment
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Choose your preferred date, time, and service details with just
                a few clicks.
              </p>
            </div>

            {/* Central Lottie Animation */}
            <div className="flex justify-center mb-8">
              <div className="w-[600px] h-[400px] flex items-center justify-center">
                <DotLottieReact
                  src="https://lottie.host/33902921-2a4d-4770-b978-d3fcf5e293ba/0vKpfOnEAW.lottie"
                  loop
                  autoplay
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Step 3 - Top Right */}
            <div className="absolute top-0 right-0 lg:right-8 flex flex-col items-center text-center max-w-xs">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-lg">
                3
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Get Instant Confirmation
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Receive a booking confirmation and reminders to keep you on
                track.
              </p>
            </div>

            {/* Step 4 - Bottom Right */}
            <div className="absolute bottom-0 right-0 lg:right-8 flex flex-col items-center text-center max-w-xs">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-lg">
                4
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Enjoy Hassle-Free Service
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Sit back, relax, and let the professional take care of
                everything for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/*FEATURES SECTION*/}
      <section className="w-full py-16 px-4 bg-gradient-to-br from-blue-50 to-green-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="font-bold text-4xl md:text-5xl mb-6 text-gray-900">
              Features of Bookly PH
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Effortless booking, trusted professionals, and seamless
              experiences—all in one platform. Whether you need beauty,
              wellness, home services, or expert consultations, BooklyPH makes
              scheduling fast, easy, and stress-free.
            </p>
          </div>

          {/* Features Grid with Central Character */}
          <div className="relative flex items-center justify-center min-h-[600px]">
            {/* Central Character Illustration */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[500px] h-[500px] flex items-center justify-center mt-48">
                <DotLottieReact
                  src="https://lottie.host/c1cd3e16-82cd-4f03-adc4-d1e56b72c0d7/ma35QJPQ8N.lottie"
                  loop
                  autoplay
                  className="w-full h-full"
                />
              </div>
            </div>

            {/* Feature Bubbles positioned around the character */}

            {/* Top Left - Instant Booking */}
            <div className="absolute top-0 left-0 lg:left-16">
              <div className="bg-purple-400 rounded-3xl p-6 max-w-xs transform -rotate-2 shadow-lg hover:shadow-xl transition-all duration-300 float-1 hover:scale-105">
                <h3 className="font-bold text-lg text-white mb-2">
                  Instant Booking
                </h3>
                <p className="text-white text-sm">
                  Schedule services with just a few taps.
                </p>
              </div>
            </div>

            {/* Top Center - Verified Reviews */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
              <div className="bg-orange-400 rounded-3xl p-6 max-w-xs transform rotate-1 shadow-lg hover:shadow-xl transition-all duration-300 float-2 hover:scale-105">
                <h3 className="font-bold text-lg text-white mb-2">
                  Verified Reviews & Ratings
                </h3>
                <p className="text-white text-sm">
                  Book with confidence, based on real user feedback.
                </p>
              </div>
            </div>

            {/* Top Right - Location-Based */}
            <div className="absolute top-0 right-0 lg:right-16">
              <div className="bg-orange-500 rounded-3xl p-6 max-w-xs transform rotate-2 shadow-lg hover:shadow-xl transition-all duration-300 float-3 hover:scale-105">
                <h3 className="font-bold text-lg text-white mb-2">
                  Location-Based Services
                </h3>
                <p className="text-white text-sm">
                  Get the best services near you.
                </p>
              </div>
            </div>

            {/* Left - Smart Search */}
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
              <div className="bg-yellow-400 rounded-3xl p-6 max-w-xs transform -rotate-3 shadow-lg hover:shadow-xl transition-all duration-300 float-4 hover:scale-105">
                <h3 className="font-bold text-lg text-gray-900 mb-2">
                  Smart Search & Filters
                </h3>
                <p className="text-gray-900 text-sm">
                  Find the right provider in seconds.
                </p>
              </div>
            </div>

            {/* Right - Real-Time Notifications */}
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
              <div className="bg-blue-500 rounded-3xl p-6 max-w-xs transform rotate-3 shadow-lg hover:shadow-xl transition-all duration-300 float-5 hover:scale-105">
                <h3 className="font-bold text-lg text-white mb-2">
                  Real-Time Notifications
                </h3>
                <p className="text-white text-sm">
                  Stay updated on bookings, reminders, and special offers.
                </p>
              </div>
            </div>

            {/* Bottom Left - Secure Payments */}
            <div className="absolute bottom-0 left-0 lg:left-16">
              <div className="bg-pink-400 rounded-3xl p-6 max-w-xs transform rotate-1 shadow-lg hover:shadow-xl transition-all duration-300 float-6 hover:scale-105">
                <h3 className="font-bold text-lg text-white mb-2">
                  Secure Payments
                </h3>
                <p className="text-white text-sm">
                  Safe and secure payment processing.
                </p>
              </div>
            </div>

            {/* Bottom Right - Appointment Management */}
            <div className="absolute bottom-0 right-0 lg:right-16">
              <div className="bg-green-500 rounded-3xl p-6 max-w-xs transform -rotate-1 shadow-lg hover:shadow-xl transition-all duration-300 float-1 hover:scale-105">
                <h3 className="font-bold text-lg text-white mb-2">
                  Appointment Management
                </h3>
                <p className="text-white text-sm">
                  Easy scheduling and rescheduling options.
                </p>
              </div>
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-32 left-1/4 text-yellow-400 text-2xl animate-pulse">
            ⭐
          </div>
          <div className="absolute bottom-32 right-1/4 text-blue-400 text-xl animate-pulse">
            ✨
          </div>
          <div className="absolute top-1/2 left-20 text-green-400 text-lg animate-pulse">
            💫
          </div>
          <div className="absolute top-1/3 right-20 text-purple-400 text-lg animate-pulse">
            🌟
          </div>
        </div>
      </section>
    </>
  );
}
