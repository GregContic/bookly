'use client';

import Link from 'next/link';
import { useState } from 'react';

interface SavedService {
  id: number;
  service_name: string;
  service_logo: string;
  rating: number;
  review_count: number;
  price_range: {
    min: number;
    max: number;
  };
}

export default function Saved() {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Function to map service names to their route IDs
  const getServiceRouteId = (serviceName: string) => {
    const serviceNameMap: { [key: string]: string } = {
      "Kwentong Barbero": "kwentong-barbero",
      "Serene Escape Spa": "serene-escape-spa",
      // Add more mappings as needed
    };
    return serviceNameMap[serviceName] || serviceName.toLowerCase().replace(/\s+/g, '-');
  };
  
  // Dummy data for saved services
  const savedServices: SavedService[] = [
    {
      id: 1,
      service_name: "Kwentong Barbero",
      service_logo: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
      rating: 4.9,
      review_count: 113,
      price_range: {
        min: 250,
        max: 500
      }
    }
  ];

  const handleRemove = async (serviceId: number) => {
    if (!confirm('Are you sure you want to remove this service from your saved list?')) return;
    // In a real app, this would make an API call
    // For now, we'll just show an alert
    alert('Service removed from saved list');
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className="text-[#EDAE49]">
            {star <= Math.floor(rating) ? "★" : "☆"}
          </span>
        ))}
        <span className="text-gray-500 text-sm ml-1">({rating.toFixed(1)}/5)</span>
      </div>
    );
  };

  const filteredServices = savedServices.filter(service =>
    service.service_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-semibold">Saved</h1>
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

            {savedServices.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="text-6xl mb-4">❤️</div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No saved services yet</h3>
                <p className="text-gray-500">Services you save will appear here.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-4 px-6">Service</th>
                      <th className="text-right py-4 px-6">Price</th>
                      <th className="text-right py-4 px-6">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredServices.map((service) => (
                      <tr key={service.id} className="border-b last:border-b-0">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                              <img
                                src={service.service_logo}
                                alt={service.service_name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-medium">{service.service_name}</div>
                              {renderStars(service.rating)}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-right">
                          <div className="font-medium text-[#EDAE49]">
                            ₱{service.price_range.min.toLocaleString()} - ₱{service.price_range.max.toLocaleString()}
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex gap-2 justify-end">                            <Link
                              href={`/pages/services/shop/${getServiceRouteId(service.service_name)}`}
                              className="p-2 text-blue-600 hover:text-blue-800"
                              title="View Service Details"
                            >
                              👁️
                            </Link>
                            <button
                              onClick={() => handleRemove(service.id)}
                              className="p-2 text-red-600 hover:text-red-800"
                              title="Remove from Saved"
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}