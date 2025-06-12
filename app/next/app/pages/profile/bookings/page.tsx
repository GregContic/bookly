"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

interface Booking {
  id: number;
  service_name: string;
  service_logo: string;
  booking_date: string;
  booking_time: string;
  price: string;
  payment_method: string;
  transaction_id: string;
  status: "Approved" | "Completed" | "Cancelled";
}

export default function MyBookings() {
  const [searchQuery, setSearchQuery] = useState("");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const statusStyles = {
    Approved: "bg-[#ECFDF3] text-[#027A48]",
    Completed: "bg-[#F2F4F7] text-[#475467]",
    Cancelled: "bg-[#FEE4E2] text-[#D92D20]",
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      // Using the Laravel orders endpoint
      const response = await fetch('/api/orders', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include' // Include cookies for auth
      });

      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }

      const result = await response.json();
      setBookings(result.data || []); // Handle Laravel's data wrapper
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load bookings');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (bookingId: number) => {
    if (!confirm('Are you sure you want to delete this booking?')) return;

    try {
      const response = await fetch(`/api/orders/${bookingId}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to delete booking');
      }

      setBookings(prev => prev.filter(booking => booking.id !== bookingId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete booking');
    }
  };

  const handleView = async (bookingId: number) => {
    try {
      const response = await fetch(`/api/orders/${bookingId}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to fetch booking details');
      }

      const data = await response.json();
      // TODO: Implement your view logic here
      console.log('Booking details:', data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch booking details');
    }
  };

  // Filter bookings based on search query
  const filteredBookings = bookings.filter(booking => 
    booking.service_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    booking.transaction_id.includes(searchQuery)
  );

  if (isLoading) return <div className="text-center py-8">Loading bookings...</div>;
  if (error) return <div className="text-center py-8 text-red-600">Error: {error}</div>;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Bookings</h1>
        <div className="relative">
          <input
            type="search"
            placeholder="Search..."
            className="pl-4 pr-10 py-2 border rounded-lg w-64"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2">
            🔍
          </span>
        </div>
      </div>

      {filteredBookings.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No bookings found
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="pb-3 font-medium">#</th>
                <th className="pb-3 font-medium">Service</th>
                <th className="pb-3 font-medium">Price</th>
                <th className="pb-3 font-medium">Payment Method</th>
                <th className="pb-3 font-medium">Transaction ID</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking, index) => (
                <tr key={booking.id} className="border-b last:border-none">
                  <td className="py-4">{index + 1}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={booking.service_logo}
                        alt={booking.service_name}
                        width={48}
                        height={48}
                        className="rounded-lg"
                      />
                      <div>
                        <div className="font-medium">{booking.service_name}</div>
                        <div className="text-xs text-gray-500">
                          Booking Date: {booking.booking_date}
                          <br />
                          Booking Time: {booking.booking_time}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">{booking.price}</td>
                  <td className="py-4">{booking.payment_method}</td>
                  <td className="py-4">{booking.transaction_id}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyles[booking.status]}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex gap-2">
                      <button
                        className="p-1 text-blue-600 hover:bg-blue-50 rounded-full"
                        title="View"
                        onClick={() => handleView(booking.id)}
                      >
                        👁️
                      </button>
                      {booking.status !== "Completed" && (
                        <button
                          className="p-1 text-red-600 hover:bg-red-50 rounded-full"
                          title="Delete"
                          onClick={() => handleDelete(booking.id)}
                        >
                          🗑️
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
  );
}