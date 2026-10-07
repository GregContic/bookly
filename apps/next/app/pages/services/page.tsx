"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { getWebServicesByCategory, searchWebServices, type WebService } from "../../../lib/services";

export default function Services() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<WebService[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const searchTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Helper function to generate service ID from name
  const generateServiceId = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  };

  // Search functionality
  const handleSearch = async (query: string) => {
    console.log('🔍 Search initiated with query:', query);
    
    if (!query.trim()) {
      console.log('📝 Empty query, clearing search results');
      setShowSearchResults(false);
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    console.log('⏳ Setting search loading state to true');
    
    try {
      // Simulate API delay for better UX
      await new Promise(resolve => setTimeout(resolve, 300));
      
      console.log('🔍 Searching services with query:', query);
      const results = searchWebServices(query);
      console.log('✅ Search results received:', results.length, 'items');
      
      setSearchResults(results);
      setShowSearchResults(true);
      console.log('🎯 Search results state updated, showing results');
    } catch (error) {
      console.error('💥 Search error:', error);
      setSearchResults([]);
      setShowSearchResults(true);
    } finally {
      setIsSearching(false);
      console.log('✅ Search loading state set to false');
    }
  };

  // Real-time search handler with debouncing
  const handleSearchInputChange = (text: string) => {
    console.log('🔍 Search input changed:', text);
    setSearchQuery(text);
    
    // Debounce the search to avoid too many calls
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
    }
    
    if (text.trim()) {
      console.log('⏰ Setting search timeout for query:', text);
      searchTimeout.current = setTimeout(() => {
        handleSearch(text);
      }, 300); // Wait 300ms after user stops typing
    } else {
      console.log('🧹 Empty text, clearing search');
      handleClearSearch();
    }
  };

  const handleClearSearch = () => {
    console.log('🧹 Clearing search');
    setSearchQuery('');
    setSearchResults([]);
    setShowSearchResults(false);
    
    // Clear any pending timeout
    if (searchTimeout.current) {
      clearTimeout(searchTimeout.current);
      searchTimeout.current = null;
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeout.current) {
        clearTimeout(searchTimeout.current);
      }
    };
  }, []);

  // Group services by category for display when not searching
  const servicesByCategory = {
    "Health & Wellness": getWebServicesByCategory("Health & Wellness"),
    "Beauty & Personal Care": getWebServicesByCategory("Beauty & Personal Care"),
    "Automotive Services": getWebServicesByCategory("Automotive Services"),
    "Fitness & Sports": getWebServicesByCategory("Fitness & Sports"),
    "Home Services": getWebServicesByCategory("Home Services"),
    "Tech & IT Services": getWebServicesByCategory("Tech & IT Services"),
  };

  // Helper to render a category section
  function CategorySection({ title, services }: { title: string; services: WebService[] }) {
    return (
      <>
        <div className="flex flex-row items-center justify-between mb-2 mt-10">
          <div className="text-2xl md:text-3xl font-bold text-black">{title}</div>
          <Link 
            href={`/pages/services/category/${encodeURIComponent(title)}`}
            className="text-black text-base underline hover:text-yellow-600 transition"
          >
            View more
          </Link>
        </div>
        <div className="w-full flex flex-row gap-6 overflow-x-auto pb-4">
          {services.slice(0, 5).map((svc) => (
            <Link
              key={svc.id}
              href={`/pages/services/shop/${svc.id}`}
              className="flex flex-col items-center bg-white border border-gray-300 rounded-xl min-w-[220px] max-w-[240px] px-4 py-6 shadow-sm hover:shadow-lg transition cursor-pointer relative group"
              style={{ flex: "0 0 220px" }}
            >
              <img
                src={svc.logo}
                alt={svc.name}
                className="mb-4"
                style={{
                  width: 100,
                  height: 100,
                  objectFit: "contain",
                  borderRadius: 12,
                  background: "#f8f8f8",
                }}
              />
              <div className="text-base font-semibold text-center mt-2">
                {svc.name}
              </div>
              <div className="text-sm text-gray-600 text-center mt-1">
                ⭐ {svc.rating} ({svc.reviews} reviews)
              </div>
              {svc.isPromo && (
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  PROMO
                </div>
              )}
            </Link>
          ))}
        </div>
      </>
    );
  }

  // Search results component
  function SearchResults() {
    if (isSearching) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-500"></div>
            <span className="text-gray-600">Searching...</span>
          </div>
        </div>
      );
    }

    if (searchResults.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">No services found</h3>
          <p className="text-gray-600 text-center mb-6 max-w-md">
            Try searching with different keywords or browse our service categories below.
          </p>
          <button
            onClick={handleClearSearch}
            className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
          >
            Browse All Services
          </button>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold text-gray-800">
            Found {searchResults.length} result{searchResults.length > 1 ? 's' : ''} for "{searchQuery}"
          </h3>
          <button
            onClick={handleClearSearch}
            className="text-gray-600 hover:text-yellow-600 underline"
          >
            Clear search
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {searchResults.map((service) => (
            <Link
              key={service.id}
              href={`/pages/services/shop/${service.id}`}
              className="bg-white border border-gray-300 rounded-xl p-6 shadow-sm hover:shadow-lg transition cursor-pointer group"
            >
              <div className="flex flex-col items-center">
                <img
                  src={service.logo}
                  alt={service.name}
                  className="mb-4"
                  style={{
                    width: 80,
                    height: 80,
                    objectFit: "contain",
                    borderRadius: 12,
                    background: "#f8f8f8",
                  }}
                />
                <h4 className="text-lg font-semibold text-center mb-2 group-hover:text-yellow-600 transition">
                  {service.name}
                </h4>
                <p className="text-sm text-gray-600 text-center mb-2">
                  {service.category}
                </p>
                <div className="flex items-center space-x-1 mb-2">
                  <span className="text-yellow-500">⭐</span>
                  <span className="text-sm font-medium">{service.rating}</span>
                  <span className="text-sm text-gray-500">({service.reviews} reviews)</span>
                </div>
                <p className="text-xs text-gray-600 text-center mb-3 line-clamp-2">
                  {service.description}
                </p>
                {service.price && (
                  <p className="text-sm font-medium text-green-600">
                    {service.price}
                  </p>
                )}
                {service.isPromo && (
                  <div className="mt-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    PROMO
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        background: "linear-gradient(120deg, #fff 60%, #EDAE49 120%)",
        paddingTop: "8vh",
      }}
    >
      <div className="w-full max-w-7xl flex flex-col">
        {/* Header Row */}
        <div className="flex flex-col lg:flex-row items-start lg:items-start justify-between mb-8 gap-4 lg:gap-0">
          {/* Left: Header and Subheader with animation */}
          <div className="flex flex-col max-w-2xl">
            <h1
              className="text-3xl md:text-4xl lg:text-6xl font-extrabold leading-tight mb-2"
              style={{
                animation:
                  "slideUpFadeIn 0.9s cubic-bezier(.23,1.02,.53,.97), blurIn 0.7s 0.2s cubic-bezier(.23,1.02,.53,.97) both",
                animationFillMode: "both",
              }}
            >
              <span className="text-black">Your Trusted Source<br className="hidden md:block" />for </span>
              <span className="text-yellow-500">Quality Services</span>
            </h1>
            <p
              className="text-base md:text-lg lg:text-xl text-gray-700"
              style={{
                animation:
                  "slideRightFadeIn 1.1s 0.2s cubic-bezier(.23,1.02,.53,.97)",
                animationFillMode: "both",
              }}
            >
              Find the right service for your needs—whether it's beauty, wellness, home repairs, or professional consultations. Browse through our categories and book with trusted providers in just a few taps
            </p>
            <style>{`
              @keyframes slideUpFadeIn {
                0% {
                  opacity: 0;
                  transform: translateY(40px) scale(0.98);
                }
                80% {
                  opacity: 1;
                  transform: translateY(-4px) scale(1.01);
                }
                100% {
                  opacity: 1;
                  transform: translateY(0) scale(1);
                }
              }
              @keyframes slideRightFadeIn {
                0% {
                  opacity: 0;
                  transform: translateX(60px) scale(0.98);
                }
                80% {
                  opacity: 1;
                  transform: translateX(-4px) scale(1.01);
                }
                100% {
                  opacity: 1;
                  transform: translateX(0) scale(1);
                }
              }
              @keyframes blurIn {
                0% {
                  opacity: 0;
                  filter: blur(16px);
                }
                80% {
                  opacity: 1;
                  filter: blur(2px);
                }
                100% {
                  opacity: 1;
                  filter: blur(0);
                }
              }
            `}</style>
          </div>
          {/* Right: Search Bar */}
          <div className="flex items-center max-w-sm ml-4 md:ml-8 mt-2 w-full md:w-[350px]">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => handleSearchInputChange(e.target.value)}
                className="w-full px-4 md:px-5 py-2 md:py-3 rounded-full border border-gray-300 focus:border-yellow-400 focus:outline-none text-base md:text-lg shadow transition"
                style={{ minWidth: 200 }}
              />
              {searchQuery && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Quick Search Tags */}
        {!showSearchResults && (
          <div className="mb-8">
            <p className="text-sm text-gray-600 mb-3">Quick search:</p>
            <div className="flex flex-wrap gap-2">
              {['dental', 'spa', 'gym', 'clinic', 'salon', 'repair', 'massage', 'yoga'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleSearchInputChange(tag)}
                  className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm hover:bg-yellow-50 hover:border-yellow-400 transition capitalize"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results or Category Sections */}
        {showSearchResults ? (
          <SearchResults />
        ) : (
          <>
            {Object.entries(servicesByCategory).map(([category, services]) => (
              <CategorySection key={category} title={category} services={services} />
            ))}
          </>
        )}
      </div>
    </main>
  );
}