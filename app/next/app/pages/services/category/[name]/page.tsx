"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "../../../../../components/header";

interface Service {
  name: string;
  logo: string;
  address: string;
  schedule: string;
  priceRange: string;
  rating: number;
  category: string;
}

export default function CategoryServices({
  params,
}: {
  params: { name: string };
}) {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedRating, setSelectedRating] = useState("Show all");
  const [priceRange, setPriceRange] = useState([200, 15500]);
  const [currentPage, setCurrentPage] = useState(1);
  const servicesPerPage = 8;

  // Function to generate service route ID from service name
  const generateServiceId = (serviceName: string) => {
    const serviceNameMap: { [key: string]: string } = {
      "Prime Care Medical Clinic": "primecare-medical-clinic",
      "Eye Clinic Baguio": "eye-clinic-baguio", 
      "Serene Escape Spa": "serene-escape-spa",
      "Glow Haven Salon": "glow-haven-salon",
      "Titan Auto Care": "titan-auto-care",
      "Speed Master Auto": "speed-master-auto",
      "Peak Performance Gym": "peak-performance-gym",
      "Zen Yoga Studio": "zen-yoga-studio",
      "Kwentong Barbero": "kwentong-barbero",
      // Add more mappings as needed
    };
    return serviceNameMap[serviceName] || serviceName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  };
  useEffect(() => {
    const allServices = [
      // Health & Wellness
      {
        name: "Prime Care Medical Clinic",
        logo: "https://cdn.pixabay.com/photo/2017/01/29/21/16/nurse-2017825_1280.png",
        address: "15 Upper Session Road, Baguio City",
        schedule: "Monday - Saturday: 8:00 AM - 6:00 PM",
        priceRange: "₱500 - ₱2,000",
        rating: 4.8,
        category: "Health & Wellness"
      },
      {
        name: "Eye Clinic Baguio",
        logo: "https://cdn.pixabay.com/photo/2013/07/12/18/20/glasses-153298_1280.png",
        address: "Session Road, Baguio City",
        schedule: "Monday - Friday: 9:00 AM - 5:00 PM",
        priceRange: "₱800 - ₱3,500",
        rating: 4.7,
        category: "Health & Wellness"
      },
      // Beauty & Personal Care
      {
        name: "Serene Escape Spa",
        logo: "https://cdn.pixabay.com/photo/2017/08/06/15/13/woman-2593366_1280.png",
        address: "34 Outlook Drive, Baguio City",
        schedule: "Monday - Sunday: 11:00 AM - 11:00 PM",
        priceRange: "₱1,500 - ₱3,000",
        rating: 4.95,
        category: "Beauty & Personal Care"
      },
      {
        name: "Glow Haven Salon",
        logo: "https://cdn.pixabay.com/photo/2017/01/29/21/16/nurse-2017825_1280.png",
        address: "Harrison Road, Baguio City",
        schedule: "Tuesday - Sunday: 10:00 AM - 8:00 PM",
        priceRange: "₱800 - ₱2,500",
        rating: 4.6,
        category: "Beauty & Personal Care"
      },
      // Automotive Services
      {
        name: "Titan Auto Care",
        logo: "https://cdn.pixabay.com/photo/2013/07/12/15/36/motorsports-150157_1280.png",
        address: "Abanao Street, Baguio City",
        schedule: "Monday - Saturday: 7:00 AM - 6:00 PM",
        priceRange: "₱1,000 - ₱8,000",
        rating: 4.5,
        category: "Automotive Services"
      },
      {
        name: "Speed Master Auto",
        logo: "https://cdn.pixabay.com/photo/2013/07/12/15/36/motorsports-150157_1280.png",
        address: "Magsaysay Avenue, Baguio City",
        schedule: "Monday - Sunday: 8:00 AM - 7:00 PM",
        priceRange: "₱800 - ₱6,000",
        rating: 4.4,
        category: "Automotive Services"
      },
      // Fitness & Sports
      {
        name: "Peak Performance Gym",
        logo: "https://cdn.pixabay.com/photo/2017/01/29/21/16/nurse-2017825_1280.png",
        address: "Upper Session Road, Baguio City",
        schedule: "Monday - Sunday: 5:00 AM - 11:00 PM",
        priceRange: "₱1,200 - ₱3,500",
        rating: 4.7,
        category: "Fitness & Sports"
      },
      {
        name: "Zen Yoga Studio",
        logo: "https://cdn.pixabay.com/photo/2017/08/06/15/13/woman-2593366_1280.png",
        address: "Bonifacio Street, Baguio City",
        schedule: "Monday - Friday: 6:00 AM - 9:00 PM",
        priceRange: "₱600 - ₱1,500",
        rating: 4.8,
        category: "Fitness & Sports"
      },
      // Home Services
      {
        name: "HandyPro Services",
        logo: "https://cdn.pixabay.com/photo/2013/07/12/18/20/glasses-153298_1280.png",
        address: "Kayang Street, Baguio City",
        schedule: "Monday - Saturday: 8:00 AM - 6:00 PM",
        priceRange: "₱800 - ₱4,000",
        rating: 4.6,
        category: "Home Services"
      },
      {
        name: "Swift Fix Solutions",
        logo: "https://cdn.pixabay.com/photo/2013/07/12/18/20/glasses-153298_1280.png",
        address: "Governor Pack Road, Baguio City",
        schedule: "Monday - Friday: 9:00 AM - 5:00 PM",
        priceRange: "₱600 - ₱3,500",
        rating: 4.5,
        category: "Home Services"
      },
      // Tech & IT Services
      {
        name: "PC Master Tech",
        logo: "https://cdn.pixabay.com/photo/2013/07/12/15/36/motorsports-150157_1280.png",
        address: "Session Road, Baguio City",
        schedule: "Monday - Saturday: 9:00 AM - 7:00 PM",
        priceRange: "₱500 - ₱5,000",
        rating: 4.5,
        category: "Tech & IT Services"
      },
      {
        name: "Turbo Hub Computing",
        logo: "https://cdn.pixabay.com/photo/2013/07/12/15/36/motorsports-150157_1280.png",
        address: "Magsaysay Avenue, Baguio City",
        schedule: "Tuesday - Sunday: 10:00 AM - 8:00 PM",
        priceRange: "₱400 - ₱4,500",
        rating: 4.3,
        category: "Tech & IT Services"
      }
    ];
    
    // Filter services based on category from URL
    const category = decodeURIComponent(params.name);
    const normalizedCategory = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
    
    // Map URL category names to display names
    const categoryMapping: { [key: string]: string } = {
      "health & wellness": "Health & Wellness",
      "beauty & personal care": "Beauty & Personal Care", 
      "automotive services": "Automotive Services",
      "fitness & sports": "Fitness & Sports",
      "home services": "Home Services",
      "tech & it services": "Tech & IT Services"
    };
    
    const mappedCategory = categoryMapping[category.toLowerCase()] || normalizedCategory;
    setSelectedCategory(mappedCategory);
    
    if (category.toLowerCase() === "all") {
      setServices(allServices);
    } else {
      setServices(allServices.filter(service => 
        service.category.toLowerCase() === mappedCategory.toLowerCase()
      ));
    }
  }, [params.name]);

  const categories = [
    { name: "All", count: 67 },
    { name: "Health & Wellness", count: 12 },
    { name: "Beauty & Personal Care", count: 15 },
    { name: "Automotive services", count: 10 },
    { name: "Fitness & Sports", count: 11 },
    { name: "Home Services", count: 9 },
    { name: "Tech & IT Services", count: 10 },
  ];

  const ratings = [
    "Show all",
    "5 stars",
    "4 stars and higher",
    "3 stars and higher",
    "2 stars and higher",
    "1 star and higher",
  ];

  // Filter services
  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || service.category === selectedCategory;
    const matchesRating = selectedRating === "Show all" || 
      service.rating >= parseInt(selectedRating.split(" ")[0]);
    const matchesPrice = true; // Implement price range filter if needed

    return matchesSearch && matchesCategory && matchesRating && matchesPrice;
  });

  // Pagination
  const totalPages = Math.ceil(filteredServices.length / servicesPerPage);
  const currentServices = filteredServices.slice(
    (currentPage - 1) * servicesPerPage,
    currentPage * servicesPerPage
  );
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-white via-white to-[#EDAE49]/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header with back button */}
        <div className="mb-8">
          <Link 
            href="/pages/services"
            className="text-[#EDAE49] hover:text-[#d99f3f] mb-4 inline-block"
          >
            ← Back to Categories
          </Link>          <h1 className="text-4xl font-bold mb-4">
            {selectedCategory === "All" ? "All Services" : selectedCategory}
          </h1>
          <div className="flex justify-between items-center">
            <div className="text-xl text-[#EDAE49]">
              {filteredServices.length} Services Found
            </div>
            <div className="flex items-center gap-2">
              <span>Sort by:</span>
              <select className="border rounded-lg px-3 py-2">
                <option>Newest</option>
                <option>Rating</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="w-full md:w-1/4 space-y-6">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              />
              <span className="absolute right-3 top-2.5">🔍</span>
            </div>

            {/* Categories */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="font-semibold mb-4">Categories</h2>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label key={category.name} className="flex items-center">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === category.name}
                      onChange={() => setSelectedCategory(category.name)}
                      className="mr-2"
                    />
                    <span>{category.name}</span>
                    <span className="ml-auto text-gray-500">({category.count})</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="font-semibold mb-4">Pricing</h2>
              <div className="px-2">
                <input
                  type="range"
                  min="200"
                  max="15500"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>₱{priceRange[0]}</span>
                  <span>₱{priceRange[1]}</span>
                </div>
              </div>
            </div>

            {/* Ratings */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="font-semibold mb-4">Ratings</h2>
              <div className="space-y-2">
                {ratings.map((rating) => (
                  <label key={rating} className="flex items-center">
                    <input
                      type="radio"
                      name="rating"
                      checked={selectedRating === rating}
                      onChange={() => setSelectedRating(rating)}
                      className="mr-2"
                    />
                    <span>{rating}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedCategory("All");
                setSelectedRating("Show all");
                setPriceRange([200, 15500]);
                setSearchQuery("");
              }}
              className="w-full py-2 bg-[#EDAE49] text-white rounded-lg hover:bg-[#d99f3f] transition"
            >
              Reset All
            </button>
          </div>

          {/* Services Grid */}
          <div className="w-full md:w-3/4">            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {currentServices.map((service) => (
                <Link
                  key={service.name}
                  href={`/pages/services/shop/${generateServiceId(service.name)}`}
                  className="bg-white rounded-lg shadow-sm hover:shadow-md transition p-4 cursor-pointer group"
                >
                  <div className="aspect-square mb-4 bg-gray-50 rounded-lg overflow-hidden">
                    <img
                      src={service.logo}
                      alt={service.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-[#EDAE49] transition">{service.name}</h3>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <span>📍</span>
                    <span className="ml-1">{service.address}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <span>🕒</span>
                    <span className="ml-1">{service.schedule}</span>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="text-[#EDAE49] font-semibold">{service.priceRange}</div>
                    <div className="px-4 py-2 bg-[#EDAE49] text-white rounded-md group-hover:bg-[#d99f3f] transition">
                      Book Now
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8 gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-md border hover:bg-gray-50 disabled:opacity-50"
              >
                ←
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 rounded-md border ${
                    currentPage === i + 1 ? 'bg-[#EDAE49] text-white' : 'hover:bg-gray-50'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-md border hover:bg-gray-50 disabled:opacity-50"
              >
                →
              </button>
            </div>          </div>
        </div>
      </div>
    </div>
    </>
  );
}
