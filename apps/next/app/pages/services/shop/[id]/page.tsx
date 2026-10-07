"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ServiceDetails {
  id: string;
  name: string;
  logo: string;
  coverImage: string;
  address: string;
  schedule: string;
  priceRange: string;
  rating: number;
  reviews: number;
  category: string;
  description: string;
  services: Array<{
    name: string;
    price: string;
  }>;
}

// Dummy data for development
const getServiceData = (id: string): ServiceDetails => {
  const serviceMap: { [key: string]: ServiceDetails } = {
    "kwentong-barbero": {
      id: "kwentong-barbero",
      name: "Kwentong Barbero",
      logo: "/assets/barber-logo.png",
      coverImage: "https://via.placeholder.com/1000x400?text=Kwentong+Barbero+Team",
      address: "34 Outlook Drive, Baguio City",
      schedule: "Monday - Sunday: 10:00 AM - 8:00 PM",
      priceRange: "₱200 - ₱700",
      rating: 4.9,
      reviews: 119,
      category: "Beauty & Personal Care",
      description: "For several years, Kwentong Barbero has been and still is Baguio City's premier location for men's haircuts and hair styling. Our top quality services and affordable prices make us the most desirable place for men to get their Hair Cut In Baguio City",
      services: [
        { name: "Haircut", price: "₱250.00" },
        { name: "Haircut with Shampoo", price: "₱300.00" },
        { name: "Hair Dye", price: "₱700.00" },
        { name: "Hot Oil Treatment", price: "₱300.00" },
        { name: "Shave", price: "₱200.00" }
      ]
    },
    "serene-escape-spa": {
      id: "serene-escape-spa",
      name: "Serene Escape Spa",
      logo: "/assets/sereneescape.png",
      coverImage: "https://via.placeholder.com/1000x400?text=Serene+Escape+Spa",
      address: "Session Road, Baguio City",
      schedule: "Monday - Sunday: 11:00 AM - 11:00 PM",
      priceRange: "₱1,500 - ₱3,000",
      rating: 4.95,
      reviews: 89,
      category: "Beauty & Personal Care",
      description: "Experience ultimate relaxation and rejuvenation at Serene Escape Spa. Our professional therapists provide top-quality spa services in a tranquil environment designed to refresh your mind, body, and spirit.",
      services: [
        { name: "Full Body Massage", price: "₱2,500.00" },
        { name: "Facial Treatment", price: "₱1,800.00" },
        { name: "Hot Stone Therapy", price: "₱3,000.00" },
        { name: "Aromatherapy", price: "₱2,200.00" },
        { name: "Body Scrub", price: "₱1,500.00" }
      ]
    },
    "primecare-medical-clinic": {
      id: "primecare-medical-clinic",
      name: "PrimeCare Medical Clinic",
      logo: "/assets/primecare.png",
      coverImage: "https://via.placeholder.com/1000x400?text=PrimeCare+Medical+Clinic",
      address: "Upper Session Road, Baguio City",
      schedule: "Monday - Saturday: 8:00 AM - 6:00 PM",
      priceRange: "₱500 - ₱2,000",
      rating: 4.8,
      reviews: 156,
      category: "Health & Wellness",
      description: "PrimeCare Medical Clinic provides comprehensive healthcare services with experienced doctors and modern medical equipment. We are committed to providing quality healthcare to the community.",
      services: [
        { name: "General Consultation", price: "₱800.00" },
        { name: "Complete Blood Count", price: "₱600.00" },
        { name: "X-Ray", price: "₱1,200.00" },
        { name: "ECG", price: "₱900.00" },
        { name: "Health Certificate", price: "₱500.00" }
      ]
    }
  };

  return serviceMap[id] || {
    id: id,
    name: id.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    logo: "https://via.placeholder.com/200x200?text=Service+Logo",
    coverImage: "https://via.placeholder.com/1000x400?text=Service+Cover",
    address: "Session Road, Baguio City",
    schedule: "Monday - Saturday: 9:00 AM - 6:00 PM",
    priceRange: "₱500 - ₱2,000",
    rating: 4.5,
    reviews: 50,
    category: "Services",
    description: "Professional service provider offering quality services to customers in Baguio City. We are committed to providing excellent service and customer satisfaction.",
    services: [
      { name: "Basic Service", price: "₱500.00" },
      { name: "Premium Service", price: "₱1,000.00" },
      { name: "Deluxe Service", price: "₱1,500.00" },
      { name: "Consultation", price: "₱300.00" }
    ]
  };
};

export default function ServiceDetails() {
  const params = useParams();
  const router = useRouter();
  const [service, setService] = useState<ServiceDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      try {
        setIsLoading(true);
        
        // TODO: Replace with actual API call
        // const response = await fetch(`/api/services/${params.id}`);
        // const serviceData = await response.json();
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const serviceData = getServiceData(params.id as string);
        setService(serviceData);
      } catch (err) {
        console.error("Failed to fetch service details:", err);
        setError("Failed to load service details");
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchServiceDetails();
    }
  }, [params.id]);

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

  if (error || !service) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-16">
            <div className="text-6xl mb-4">😞</div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              {error || "Service not found"}
            </h3>
            <button
              onClick={() => router.back()}
              className="text-[#EDAE49] hover:text-[#d99f3f]"
            >
              ← Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Image */}
      <div className="relative h-96 bg-gray-900 overflow-hidden">
        <img
          src={service.coverImage}
          alt={service.name}
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-5xl font-bold text-center">
            {service.name}
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="text-[#EDAE49] hover:text-[#d99f3f] inline-flex items-center gap-2"
          >
            ← Back
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Service Info */}
            <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={service.logo}
                    alt={service.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">{service.name}</h2>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
                      <span className="text-yellow-500">★★★★★</span>
                      <span className="ml-2 font-semibold">{service.rating}/5.0</span>
                      <span className="text-gray-500 ml-1">({service.reviews} Reviews)</span>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <span>📍</span>
                    <span className="ml-2">{service.address}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <span>🕒</span>
                    <span className="ml-2">{service.schedule}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* About Us */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-xl font-semibold mb-4">About Us</h3>
              <p className="text-gray-700 leading-relaxed">
                {service.description}
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Book Appointment */}            <div className="bg-white rounded-lg shadow-sm border p-6">
              <button 
                onClick={() => router.push(`/pages/services/shop/${service.id}/book`)}
                className="w-full bg-[#EDAE49] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#d99f3f] transition mb-4"
              >
                Book an Appointment
              </button>
              <div className="text-center text-gray-600">
                <span>📞</span>
                <span className="ml-2">Click to call</span>
              </div>
            </div>

            {/* Services with Pricing */}
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Services with Pricing</h3>
                <button className="text-gray-400 hover:text-gray-600">
                  ▲
                </button>
              </div>
              <div className="space-y-3">
                {service.services.map((serviceItem, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                    <span className="text-gray-700">{serviceItem.name}</span>
                    <span className="font-semibold">{serviceItem.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
