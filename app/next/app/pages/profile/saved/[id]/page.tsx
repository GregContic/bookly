"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SavedServiceRedirect() {
  const router = useRouter();
  const params = useParams();

  // Function to map saved service IDs to their route IDs
  const getServiceRouteId = (savedId: string) => {
    const serviceIdMap: { [key: string]: string } = {
      "1": "kwentong-barbero",
      "2": "serene-escape-spa",
      // Add more mappings as needed
    };
    return serviceIdMap[savedId] || savedId;
  };

  useEffect(() => {
    const savedId = params?.id as string;
    const serviceRouteId = getServiceRouteId(savedId);
    
    // Redirect to the main service detail page
    router.replace(`/pages/services/shop/${serviceRouteId}`);
  }, [params?.id, router]);

  // Show loading while redirecting
  return (
    <div className="min-h-screen p-8 flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#EDAE49]"></div>
    </div>
  );
}
