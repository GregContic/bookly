"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Account from "./account/page";
import MyBookings from "./bookings/page";
import Saved from "./saved/page";

export default function ProfilePage() {
  const router = useRouter();
  const [active, setActive] = useState("My Bookings");

  const user = {
    name: "Juan Dela Cruz",
    email: "name@test.com",
    avatar: "/assets/profile-placeholder.png",
  };

  return (
    <>
      <main className="min-h-screen flex bg-white">
        {/* Sidebar */}
        <aside className="w-72 bg-[#EDAE49] min-h-screen flex flex-col items-center py-10">
          <Image
            src={user.avatar}
            alt="Profile"
            width={100}
            height={100}
            className="rounded-full"
          />
          <h2 className="font-bold text-xl mt-4">{user.name}</h2>
          <p className="text-sm text-black/70 mb-8">{user.email}</p>
          <nav className="flex flex-col gap-2 w-full px-8">
            {["My Bookings", "Saved", "Account", "Log Out"].map((item) => (
              <button
                key={item}
                className={`text-left py-2 px-4 rounded-lg font-medium transition ${
                  active === item
                    ? "bg-white text-black"
                    : "text-black hover:bg-white/20"
                }`}
                onClick={() => {
                  if (item === "Log Out") {
                    router.push("/");
                  } else {
                    setActive(item);
                  }
                }}
              >
                {item}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <section className="flex-1 p-8">
          {active === "My Bookings" && <MyBookings />}
          {active === "Saved" && <Saved />}
          {active === "Account" && <Account />}
        </section>
      </main>
    </>
  );
}