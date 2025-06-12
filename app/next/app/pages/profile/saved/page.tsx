'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

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
  const [savedServices, setSavedServices] = useState<SavedService[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSavedServices();
  }, []);

  const fetchSavedServices = async () => {
    try {
      const response = await fetch('/api/saved-services', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (!response.ok) throw new Error('Failed to fetch saved services');
      
      const data = await response.json();
      setSavedServices(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load saved services');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = async (serviceId: number) => {
    try {
      const response = await fetch(`/api/saved-services/${serviceId}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (!response.ok) throw new Error('Failed to remove service');
      
      setSavedServices(prev => prev.filter(service => service.id !== serviceId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove service');
    }
  };

  const handleBook = (serviceId: number) => {
    // Navigate to booking page
    window.location.href = `/services/${serviceId}/book`;
  };

  const filteredServices = savedServices.filter(service =>
    service.service_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) return <div>Loading saved services...</div>;
  if (error) return <div className="text-red-600">Error: {error}</div>;

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
          {filteredServices.map((service) => (
            <tr key={service.id} className="border-b last:border-none">
              <td className="py-4">
                <div className="flex items-center gap-4">
                  <Image
                    src={service.service_logo}
                    alt={service.service_name}
                    width={48}
                    height={48}
                    className="rounded-lg"
                  />
                  <div>
                    <div className="font-medium">{service.service_name}</div>
                    <div className="flex items-center text-sm text-gray-600">
                      {'⭐'.repeat(Math.floor(service.rating))}
                      <span className="ml-1">({service.review_count})</span>
                    </div>
                  </div>
                </div>
              </td>
              <td className="py-4 text-right">
                ₱{service.price_range.min} - ₱{service.price_range.max}
              </td>
              <td className="py-4">
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => handleBook(service.id)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                    title="Book Now"
                  >
                    📅
                  </button>
                  <button
                    onClick={() => handleRemove(service.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full"
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