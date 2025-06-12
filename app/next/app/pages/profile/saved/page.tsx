"use client";
import Image from "next/image";
import { useState } from "react";

interface SavedService {
  id: number;
  name: string;
  logo: string;
  rating: number;
  reviews: number;
  priceRange: string;
}

export default function Saved() {
  const [searchQuery, setSearchQuery] = useState("");

  const savedServices: SavedService[] = [
    {
      id: 1,
      name: "Kwentong Barbero",
      logo: "/assets/barber-logo.png",
      rating: 4.95,
      reviews: 215,
      priceRange: "₱250 - ₱500"
    }
    // Add more services as needed
  ];

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Saved</h1>
        <div className="relative">
          <input
            type="search"
            placeholder="Search..."
            className="pl-4 pr-10 py-2 border rounded-lg w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button 
            className="absolute right-3 top-1/2 -translate-y-1/2"
            aria-label="Search"
          >
            🔍
          </button>
        </div>
      </div>

      <table className="min-w-full">
        <thead>
          <tr className="text-left border-b">
            <th className="pb-3 font-medium">Service</th>
            <th className="pb-3 font-medium text-right">Price</th>
            <th className="pb-3 font-medium text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {savedServices.map((service) => (
            <tr key={service.id} className="border-b last:border-none">
              <td className="py-4">
                <div className="flex items-center gap-3">
                  <Image
                    src={service.logo}
                    alt={service.name}
                    width={48}
                    height={48}
                    className="rounded-lg"
                  />
                  <div>
                    <div className="font-medium">{service.name}</div>
                    <div className="flex items-center gap-1">
                      <div className="flex text-yellow-400">
                        {"★★★★★"}
                      </div>
                      <span className="text-sm text-gray-500">
                        ({service.reviews})
                      </span>
                    </div>
                  </div>
                </div>
              </td>
              <td className="py-4 text-right">{service.priceRange}</td>
              <td className="py-4">
                <div className="flex gap-2 justify-center">
                  <button
                    className="p-1 text-blue-600 hover:bg-blue-50 rounded-full"
                    title="View"
                  >
                    👁️
                  </button>
                  <button
                    className="p-1 text-red-600 hover:bg-red-50 rounded-full"
                    title="Remove"
                  >
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}