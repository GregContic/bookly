"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface BookingDetails {
  billing: {
    name: string;
    email: string;
    phone: string;
    country: string;
    address: string;
  };
  payment: {
    amount: number;
    method: string;
    transactionId: string;
    status: string;
  };
  booking: {
    status: string;
    business: string;
    serviceSelected: string;
    appointmentDate: string;
    appointmentTime: string;
  };
}

// Dummy data for development
const dummyBookingData: BookingDetails = {
  billing: {
    name: "Juan Dela Cruz",
    email: "name@test.com",
    phone: "+639123456789",
    country: "Philippines",
    address: "#123 Main St., Baguio City"
  },
  payment: {
    amount: 500.00,
    method: "Cash",
    transactionId: "BPH-KB01234",
    status: "Approved"
  },
  booking: {
    status: "Approved",
    business: "Kwentong Barbero",
    serviceSelected: "Haircut with Shampoo\nShave",
    appointmentDate: "March 28, 2025",
    appointmentTime: "1:00 PM"
  }
};

export default function BookingDetails() {
  const router = useRouter();
  const params = useParams();
  const [bookingData, setBookingData] = useState<BookingDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      setIsLoading(true);
      try {
        // This would be the actual API call in production
        /*
        const response = await fetch(`/api/bookings/${params.id}`);
        if (!response.ok) throw new Error('Failed to fetch booking details');
        const data = await response.json();
        setBookingData(data);
        */

        // Using dummy data for now
        await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API delay
        setBookingData(dummyBookingData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load booking details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookingDetails();
  }, [params?.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#EDAE49]"></div>
      </div>
    );
  }

  if (error || !bookingData) {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center text-red-600">
        {error || 'Booking not found'}
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-2xl font-semibold mb-8">My Bookings</h1>

          <div className="grid grid-cols-2 gap-8">
            {/* Billing Address Section */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Billing Address</h2>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-600">Name:</label>
                  <div className="font-medium">{bookingData.billing.name}</div>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Email:</label>
                  <div className="font-medium">{bookingData.billing.email}</div>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Phone:</label>
                  <div className="font-medium">{bookingData.billing.phone}</div>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Country:</label>
                  <div className="font-medium">{bookingData.billing.country}</div>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Address:</label>
                  <div className="font-medium">{bookingData.billing.address}</div>
                </div>
              </div>
            </div>

            {/* Payment Information Section */}
            <div>
              <h2 className="text-lg font-semibold mb-4">Payment Information</h2>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-gray-600">Paid Amount:</label>
                  <div className="font-medium">₱{bookingData.payment.amount.toFixed(2)}</div>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Payment Method:</label>
                  <div className="font-medium">{bookingData.payment.method}</div>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Transaction ID:</label>
                  <div className="font-medium">{bookingData.payment.transactionId}</div>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Payment Status:</label>
                  <div className="font-medium text-green-600">{bookingData.payment.status}</div>
                </div>
                <div>
                  <label className="text-sm text-gray-600">Booking Status:</label>
                  <div className="font-medium text-green-600">{bookingData.booking.status}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Details Section */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Booking Details</h2>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-gray-600">Business:</label>
                <div className="font-medium">{bookingData.booking.business}</div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Service Selected:</label>
                <div className="font-medium" style={{ whiteSpace: 'pre-line' }}>
                  {bookingData.booking.serviceSelected}
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Appointment Date:</label>
                <div className="font-medium">{bookingData.booking.appointmentDate}</div>
              </div>
              <div>
                <label className="text-sm text-gray-600">Appointment Time:</label>
                <div className="font-medium">{bookingData.booking.appointmentTime}</div>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-8 flex justify-end">
            <button
              onClick={() => router.back()}
              className="px-6 py-2 bg-[#EDAE49] text-white rounded-lg hover:bg-[#EDAE49]/90 transition-colors"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
