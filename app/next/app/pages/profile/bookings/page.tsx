"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Booking {
  id: number;
  service_name: string;
  service_logo: string;
  booking_date: string;
  booking_time: string;
  price: number;
  payment_method: string;
  transaction_id: string;
  status: "Approved" | "Completed" | "Cancelled";
}

export default function MyBookings() {
  const [searchQuery, setSearchQuery] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulating API call with dummy data
    const dummyBookings: Booking[] = [
      {
        id: 1,
        service_name: "Kwentong Barbero",
        service_logo:
          "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
        booking_date: "03/28/25",
        booking_time: "1:00 PM",
        price: 500.0,
        payment_method: "Cash",
        transaction_id: "BPH-KB01234",
        status: "Approved",
      },
    ];

    setBookings(dummyBookings);
    setIsLoading(false);
  }, []);

  const statusStyles = {
    Approved: "bg-green-100 text-green-700",
    Completed: "bg-gray-100 text-gray-600",
    Cancelled: "bg-red-100 text-red-700",
  };

  // Filter bookings based on search query
  const filteredBookings = bookings.filter(
    (booking) =>
      booking.service_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.transaction_id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#EDAE49]"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold">My Bookings</h1>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-4 pr-10 py-2 border rounded-lg w-64 focus:outline-none focus:border-[#EDAE49]"
                />
                <span className="absolute right-3 top-2.5">🔍</span>
              </div>
            </div>

            {bookings.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="text-6xl mb-4">📅</div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">
                  No bookings yet
                </h3>
                <p className="text-gray-500">
                  Your booking history will appear here once you make a booking.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-4 px-4">#</th>
                      <th className="text-left py-4 px-4">Service</th>
                      <th className="text-left py-4 px-4">Price</th>
                      <th className="text-left py-4 px-4">Gateway</th>
                      <th className="text-left py-4 px-4">Transaction ID</th>
                      <th className="text-left py-4 px-4">Status</th>
                      <th className="text-left py-4 px-4">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.map((booking) => (
                      <tr key={booking.id} className="border-b last:border-b-0">
                        <td className="py-4 px-4">{booking.id}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100">
                              <img
                                src={booking.service_logo}
                                alt={booking.service_name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-medium">{booking.service_name}</div>
                              <div className="text-sm text-gray-500">
                                Booking Date: {booking.booking_date}
                                <br />
                                Booking Time: {booking.booking_time}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">₱{booking.price.toFixed(2)}</td>
                        <td className="py-4 px-4">{booking.payment_method}</td>
                        <td className="py-4 px-4">{booking.transaction_id}</td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-3 py-1 rounded-full text-sm ${statusStyles[booking.status]}`}
                          >
                            {booking.status}
                          </span>
                        </td>                        <td className="py-4 px-4">
                          <div className="flex gap-3">
                            <Link
                              href={`/pages/profile/bookings/${booking.id}`}
                              className="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
                              title="View Booking Details"
                            >
                              <span className="mr-2">👁️</span>
                              View
                            </Link>
                            {booking.status !== "Completed" && (
                              <button
                                className="inline-flex items-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
                                title="Cancel Booking"
                              >
                                <span className="mr-2">🗑️</span>
                                Cancel
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}