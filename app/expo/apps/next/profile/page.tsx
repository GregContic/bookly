"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const [active, setActive] = useState("My Bookings");

  // Example user data
  const user = {
    name: "Juan Dela Cruz",
    email: "name@test.com",
    avatar: "/assets/profile-placeholder.png",
  };

  // Example bookings data
  const bookings = [
    {
      id: 1,
      service: "Kwentong Barbero",
      logo: "/assets/barber-logo.png",
      date: "03/28/25",
      time: "1:00 PM",
      price: "₱610.00",
      gateway: "GCash",
      transaction: "123456789012",
      status: "Approved",
    },
    {
      id: 2,
      service: "Ink Haven Tattoo",
      logo: "/assets/tattoo-logo.png",
      date: "02/09/25",
      time: "9:00 AM",
      price: "₱5,100.00",
      gateway: "Credit Card",
      transaction: "216636789019",
      status: "Completed",
    },
    {
      id: 3,
      service: "Kwentong Barbero",
      logo: "/assets/barber-logo.png",
      date: "01/13/25",
      time: "5:00 PM",
      price: "₱610.00",
      gateway: "GCash",
      transaction: "426288595280",
      status: "Cancelled",
    },
  ];

  // Status color mapping
  const statusColor = {
    Approved: "bg-green-200 text-green-800",
    Completed: "bg-gray-200 text-gray-800",
    Cancelled: "bg-red-200 text-red-800",
  };

  return (
    <main className="min-h-screen flex items-start justify-center bg-white py-12">
      <div className="w-full max-w-7xl flex flex-row">
        {/* Sidebar */}
        <aside className="w-72 bg-[#EDAE49] rounded-l-2xl flex flex-col items-center py-10">
          <Image
            src={user.avatar}
            alt="Profile"
            width={80}
            height={80}
            className="rounded-full object-cover border-4 border-white mb-4"
          />
          <div className="font-bold text-xl mb-1">{user.name}</div>
          <div className="text-sm text-black/70 mb-8">{user.email}</div>
          <nav className="flex flex-col gap-2 w-full px-8">
            {["My Bookings", "Saved", "Account", "Log Out"].map((item) => (
              <button
                key={item}
                className={`text-left py-2 px-4 rounded-lg font-medium transition ${
                  active === item
                    ? "bg-white text-black font-bold"
                    : "bg-transparent text-black hover:bg-white/30"
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
        <section className="flex-1 bg-white rounded-r-2xl p-10 border border-gray-200">
          {active === "My Bookings" && (
            <>
              <div className="text-3xl font-bold mb-6">My Bookings</div>
              <div className="overflow-x-auto">
                <table className="min-w-full border-separate border-spacing-y-3">
                  <thead>
                    <tr className="text-left text-lg">
                      <th className="font-semibold">#</th>
                      <th className="font-semibold">Service</th>
                      <th className="font-semibold">Price</th>
                      <th className="font-semibold">Gateway</th>
                      <th className="font-semibold">Transaction ID</th>
                      <th className="font-semibold">Status</th>
                      <th className="font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((b, i) => (
                      <tr key={b.id} className="align-top">
                        <td className="py-2">{i + 1}</td>
                        <td className="py-2 flex items-center gap-3">
                          <Image
                            src={b.logo}
                            alt={b.service}
                            width={48}
                            height={48}
                            className="rounded-lg border"
                          />
                          <div>
                            <div className="font-semibold">{b.service}</div>
                            <div className="text-xs text-gray-500">
                              Booking Date: {b.date}
                              <br />
                              Booking Time: {b.time}
                            </div>
                          </div>
                        </td>
                        <td className="py-2">{b.price}</td>
                        <td className="py-2">{b.gateway}</td>
                        <td className="py-2">{b.transaction}</td>
                        <td className="py-2">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor[b.status]}`}
                          >
                            {b.status}
                          </span>
                        </td>
                        <td className="py-2 flex gap-2">
                          <button
                            className="bg-blue-100 text-blue-700 rounded-full p-2 hover:bg-blue-200"
                            title="View"
                          >
                            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg>
                          </button>
                          <button
                            className="bg-red-100 text-red-700 rounded-full p-2 hover:bg-red-200"
                            title="Delete"
                          >
                            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 6h18M9 6v12a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V6m-6 0V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/></svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
          {/* Add content for Saved, Account, etc. as needed */}
        </section>
      </div>
    </main>
  );
}