"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ServiceDetails {
  id: string;
  name: string;
  logo: string;
  address: string;
  schedule: string;
  priceRange: string;
  rating: number;
  reviews: number;
  category: string;
  services: Array<{
    name: string;
    price: string;
  }>;
}

interface SelectedService {
  name: string;
  price: string;
}

interface Barber {
  id: string;
  name: string;
  image: string;
}

interface BookingData {
  selectedServices: SelectedService[];
  selectedBarber: string;
  date: string;
  time: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes: string;
}

function formatLocalDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// Dummy data for development - same as in the service details page
const getServiceData = (id: string): ServiceDetails => {
  const serviceMap: { [key: string]: ServiceDetails } = {
    "kwentong-barbero": {
      id: "kwentong-barbero",
      name: "Kwentong Barbero",
      logo: "/assets/barber-logo.png",
      address: "34 Outlook Drive, Baguio City",
      schedule: "Monday - Sunday: 10:00 AM - 8:00 PM",
      priceRange: "₱200 - ₱700",
      rating: 4.9,
      reviews: 119,
      category: "Beauty & Personal Care",
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
      address: "456 Wellness Ave, Baguio City",
      schedule: "Monday - Sunday: 9:00 AM - 9:00 PM",
      priceRange: "₱500 - ₱2500",
      rating: 4.8,
      reviews: 87,
      category: "Beauty & Personal Care",
      services: [
        { name: "Swedish Massage", price: "₱1200.00" },
        { name: "Hot Stone Therapy", price: "₱1500.00" },
        { name: "Facial Treatment", price: "₱800.00" },
        { name: "Body Scrub", price: "₱1000.00" },
        { name: "Aromatherapy", price: "₱1300.00" }
      ]
    }
  };

  return serviceMap[id] || serviceMap["kwentong-barbero"];
};

// Barber data for the prototype
const barbers: Barber[] = [
  { id: "albert", name: "Albert Flores", image: "/assets/barber1.jpg" },
  { id: "floyd", name: "Floyd Miles", image: "/assets/barber2.jpg" },
  { id: "jerome", name: "Jerome Bell", image: "/assets/barber3.jpg" },
  { id: "cameron", name: "Cameron Williamson", image: "/assets/barber4.jpg" }
];

export default function BookAppointment() {
  const params = useParams();
  const router = useRouter();
  const serviceId = (params ?? {}).id as string;
  
  const [service, setService] = useState<ServiceDetails | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [calendarMonth, setCalendarMonth] = useState(
    () => new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );
  const [submitting, setSubmitting] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [idempotencyKey, setIdempotencyKey] = useState(() => crypto.randomUUID());
  const [bookingData, setBookingData] = useState<BookingData>({
    selectedServices: [],
    selectedBarber: '',
    date: '',
    time: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    notes: ''
  });
  const [dropdownOpen, setDropdownOpen] = useState<{ [key: number]: boolean }>({});
  const [availableServices, setAvailableServices] = useState<{name: string, price: string}[]>([]);

  useEffect(() => {
    if (serviceId) {
      const serviceData = getServiceData(serviceId);
      setService(serviceData);
      setAvailableServices(serviceData.services);
    }
  }, [serviceId]);  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Only close dropdowns if clicking outside dropdown containers and not on header/nav elements
      // Also check for link elements to ensure navigation works
      if (!target.closest('.dropdown-container') && 
          !target.closest('header') && 
          !target.closest('nav') && 
          !target.closest('a') &&
          !target.closest('[role="button"]')) {
        setDropdownOpen({});
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const addService = (serviceToAdd: {name: string, price: string}) => {
    setIdempotencyKey(crypto.randomUUID());
    setBookingError(null);
    setBookingData(prev => ({
      ...prev,
      selectedServices: [...prev.selectedServices, serviceToAdd]
    }));
  };

  const removeService = (index: number) => {
    setIdempotencyKey(crypto.randomUUID());
    setBookingError(null);
    setBookingData(prev => ({
      ...prev,
      selectedServices: prev.selectedServices.filter((_, i) => i !== index)
    }));
  };

  const updateService = (index: number, newService: {name: string, price: string}) => {
    setIdempotencyKey(crypto.randomUUID());
    setBookingError(null);
    setBookingData(prev => ({
      ...prev,
      selectedServices: prev.selectedServices.map((service, i) => 
        i === index ? newService : service
      )
    }));
  };

  const toggleDropdown = (index: number) => {
    setDropdownOpen(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const calculateTotal = () => {
    return bookingData.selectedServices.reduce((total, service) => {
      const price = parseFloat(service.price.replace('₱', '').replace(',', ''));
      return total + price;
    }, 0);
  };

  const handleBarberSelect = (barberId: string) => {
    setIdempotencyKey(crypto.randomUUID());
    setBookingError(null);
    setBookingData(prev => ({
      ...prev,
      selectedBarber: barberId
    }));
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (submitting) {
      return;
    }
    if (!service || !bookingData.date || !bookingData.time || !bookingData.selectedBarber ||
        bookingData.selectedServices.length === 0) {
      setBookingError('Select a service, barber, date, and time before confirming.');
      return;
    }

    const [year, month, day] = bookingData.date.split('-').map(Number);
    const timeParts = bookingData.time.match(/^(\d{1,2}):00 (AM|PM)$/);
    if (!timeParts || !year || !month || !day) {
      setBookingError('The selected date or time is invalid. Please choose another slot.');
      return;
    }
    const hour = Number(timeParts[1]) % 12 + (timeParts[2] === 'PM' ? 12 : 0);
    const startsAt = new Date(year, month - 1, day, hour);
    if (!Number.isFinite(startsAt.getTime()) || startsAt.getTime() <= Date.now()) {
      setBookingError('The selected time has passed. Please choose another slot.');
      setCurrentStep(2);
      return;
    }

    setSubmitting(true);
    setBookingError(null);
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Idempotency-Key': idempotencyKey,
        },
        body: JSON.stringify({
          businessId: service.id,
          serviceId: service.id,
          serviceName: bookingData.selectedServices.map(selected => selected.name).join(', '),
          resourceIds: [bookingData.selectedBarber],
          startsAt: startsAt.toISOString(),
          durationMinutes: 60,
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        if (response.status === 409 && result.code === 'slot_unavailable') {
          setBookingError('That time is no longer available. Please select another time.');
          setIdempotencyKey(crypto.randomUUID());
          setCurrentStep(2);
          return;
        }
        throw new Error(typeof result.error === 'string' ? result.error : 'Booking could not be confirmed.');
      }

      alert(`Booking ${result.bookingId} confirmed.`);
      router.push(`/pages/services/shop/${serviceId}`);
    } catch (error) {
      setBookingError(error instanceof Error ? error.message : 'Booking could not be confirmed.');
    } finally {
      setSubmitting(false);
    }
  };

  const firstDayOfCalendarMonth = new Date(
    calendarMonth.getFullYear(),
    calendarMonth.getMonth(),
    1,
  ).getDay();
  const daysInCalendarMonth = new Date(
    calendarMonth.getFullYear(),
    calendarMonth.getMonth() + 1,
    0,
  ).getDate();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#EDAE49] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const stepLabels = [
    "Select Service",
    "Select Booking Date & Time", 
    "Booking Summary",
    "Payment Method"
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-black mb-6">{service.name}</h1>
          {bookingError && (
            <div role="alert" className="mb-6 rounded-lg border border-red-300 bg-red-50 p-4 text-red-800">
              {bookingError}
            </div>
          )}
          
          {/* Progress Indicator */}
          <div className="flex items-center justify-between mb-8">
            {stepLabels.map((label, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                  currentStep > index + 1 
                    ? 'bg-[#EDAE49] text-white' 
                    : currentStep === index + 1 
                    ? 'bg-[#EDAE49] text-white' 
                    : 'bg-gray-300 text-gray-600'
                }`}>
                  {index + 1 < currentStep ? '✓' : index + 1}
                </div>
                <div className={`text-sm font-medium ${
                  currentStep >= index + 1 ? 'text-black' : 'text-gray-400'
                }`}>
                  {label}
                </div>
                {index < stepLabels.length - 1 && (
                  <div className={`h-1 w-full mt-2 ${
                    currentStep > index + 1 ? 'bg-[#EDAE49]' : 'bg-gray-300'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Select Service */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-black mb-6">Select Service</h2>
              {/* Service Selection Dropdowns */}
            <div className="space-y-4">
              {bookingData.selectedServices.map((selectedService, index) => (
                <div key={index} className="relative dropdown-container">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <div 
                      className="flex-1 px-4 py-3 cursor-pointer flex justify-between items-center"
                      onClick={() => toggleDropdown(index)}
                    >
                      <span className="text-gray-700">{selectedService.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="font-semibold">{selectedService.price}</span>
                        <svg className={`w-5 h-5 transform transition-transform ${dropdownOpen[index] ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                    {bookingData.selectedServices.length > 1 && (
                      <button 
                        onClick={() => removeService(index)}
                        className="px-3 py-3 text-red-500 hover:bg-red-50"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                    {dropdownOpen[index] && (
                    <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 border-t-0 rounded-b-lg shadow-lg z-10">
                      {availableServices.map((serviceOption, optionIndex) => (
                        <div
                          key={optionIndex}
                          className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex justify-between items-center"
                          onClick={() => {
                            updateService(index, serviceOption);
                            toggleDropdown(index);
                          }}
                        >
                          <span>{serviceOption.name}</span>
                          <span className="font-semibold">{serviceOption.price}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Add another service dropdown */}
              <div className="relative dropdown-container">
                <div 
                  className="flex items-center border border-gray-300 rounded-lg px-4 py-3 cursor-pointer text-gray-500"
                  onClick={() => {
                    if (bookingData.selectedServices.length === 0) {
                      addService(availableServices[0]);
                    } else {
                      toggleDropdown(bookingData.selectedServices.length);
                    }
                  }}
                >
                  <span className="flex-1">Add another</span>
                  <svg className={`w-5 h-5 transform transition-transform ${dropdownOpen[bookingData.selectedServices.length] ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                  {dropdownOpen[bookingData.selectedServices.length] && (
                  <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 border-t-0 rounded-b-lg shadow-lg z-10">
                    {availableServices.map((serviceOption, optionIndex) => (
                      <div
                        key={optionIndex}
                        className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex justify-between items-center"
                        onClick={() => {
                          addService(serviceOption);
                          setDropdownOpen(prev => ({...prev, [bookingData.selectedServices.length]: false}));
                        }}
                      >
                        <span>{serviceOption.name}</span>
                        <span className="font-semibold">{serviceOption.price}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Select Barber */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-black mb-6">Select Barber</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {barbers.map((barber) => (
                  <div 
                    key={barber.id}
                    className={`text-center cursor-pointer transition-all ${
                      bookingData.selectedBarber === barber.id ? 'transform scale-105' : ''
                    }`}
                    onClick={() => handleBarberSelect(barber.id)}
                  >
                    <div className={`w-20 h-20 mx-auto mb-2 rounded-full overflow-hidden border-4 ${
                      bookingData.selectedBarber === barber.id ? 'border-[#EDAE49]' : 'border-gray-200'
                    }`}>
                      <img 
                        src={barber.image} 
                        alt={barber.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(barber.name)}&background=random`;
                        }}
                      />
                    </div>
                    <div className={`text-sm font-medium ${
                      bookingData.selectedBarber === barber.id ? 'text-[#EDAE49]' : 'text-gray-700'
                    }`}>
                      {barber.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total and Actions */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-bold">Total:</span>
                <span className="text-xl font-bold">₱{calculateTotal().toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <button
                  onClick={() => router.back()}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={nextStep}
                  disabled={bookingData.selectedServices.length === 0 || !bookingData.selectedBarber}
                  className={`px-8 py-3 rounded-lg font-medium transition-all ${
                    bookingData.selectedServices.length === 0 || !bookingData.selectedBarber
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gray-700 text-white hover:bg-gray-800'
                  }`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}        {/* Step 2: Select Booking Date & Time */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-black mb-6">Select Booking Date</h2>
            
            {/* Calendar */}
            <div className="space-y-4">              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <button 
                  onClick={() => setCalendarMonth(current =>
                    new Date(current.getFullYear(), current.getMonth() - 1, 1)
                  )}
                  className="p-3 hover:bg-gray-100 rounded-lg border border-gray-300 hover:border-gray-400 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h3 className="text-xl font-semibold">
                  {calendarMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </h3>
                <button 
                  onClick={() => setCalendarMonth(current =>
                    new Date(current.getFullYear(), current.getMonth() + 1, 1)
                  )}
                  className="p-3 hover:bg-gray-100 rounded-lg border border-gray-300 hover:border-gray-400 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>              {/* Calendar Grid */}
              <div className="space-y-4">
                {/* Day Headers */}
                <div className="grid grid-cols-7 gap-2">
                  {['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'].map((day) => (
                    <div key={day} className="p-3 text-center font-medium text-gray-700">
                      {day}
                    </div>
                  ))}
                </div>
                
                {/* Calendar Days Grid */}
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: firstDayOfCalendarMonth }, (_, index) => (
                    <div key={`empty-${index}`} className="p-4" />
                  ))}
                  {Array.from({ length: daysInCalendarMonth }, (_, index) => {
                    const day = index + 1;
                    const date = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), day);
                    const dateValue = formatLocalDate(date);
                    const isPast = date < today;
                    return (
                      <button
                        key={dateValue}
                        disabled={isPast}
                        onClick={() => {
                          setIdempotencyKey(crypto.randomUUID());
                          setBookingError(null);
                          setBookingData(prev => ({ ...prev, date: dateValue, time: '' }));
                        }}
                        className={`p-4 text-center border border-gray-200 rounded-lg transition-colors disabled:cursor-not-allowed disabled:text-gray-300 ${
                          bookingData.date === dateValue
                            ? 'bg-[#EDAE49] text-white border-[#EDAE49]'
                            : 'text-gray-700 hover:bg-gray-50 hover:border-gray-300'
                        }`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Available Time Slot */}
              <div className="mt-8">
                <h3 className="text-xl font-bold text-black mb-6">Available Time Slot</h3>
                <div className="grid grid-cols-5 gap-4">
                  {['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM'].map((time) => (
                    <button
                      key={time}
                      onClick={() => {
                        setIdempotencyKey(crypto.randomUUID());
                        setBookingError(null);
                        setBookingData(prev => ({
                          ...prev,
                          time: time
                        }));
                      }}                      className={`p-4 border rounded-xl font-medium transition-all shadow-sm hover:shadow-md ${
                        bookingData.time === time
                          ? 'border-[#EDAE49] bg-[#EDAE49] text-white'
                          : 'border-gray-200 hover:border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={prevStep}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-all"
              >
                Prev.
              </button>
              <button
                onClick={nextStep}
                disabled={!bookingData.date || !bookingData.time}
                className={`px-8 py-3 rounded-lg font-medium transition-all ${
                  !bookingData.date || !bookingData.time
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-700 text-white hover:bg-gray-800'
                }`}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Booking Summary */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-black mb-6">Booking Summary</h2>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-4">Appointment Details</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Services:</span>
                  <div className="text-right">
                    {bookingData.selectedServices.map((service, index) => (
                      <div key={index} className="font-medium">
                        {service.name} - {service.price}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Barber:</span>
                  <span className="font-medium">{barbers.find(b => b.id === bookingData.selectedBarber)?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium">{new Date(bookingData.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Time:</span>
                  <span className="font-medium">{bookingData.time}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium">{service.address}</span>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>₱{calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
            
            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={prevStep}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-all"
              >
                Previous
              </button>
              <button
                onClick={nextStep}
                className="px-8 py-3 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-800 transition-all"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Payment Method */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-black mb-6">Payment Method</h2>
            
            <div className="space-y-4">
              <div className="border border-gray-300 rounded-lg p-4">
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="payment" className="mr-3" defaultChecked />
                  <span className="font-medium">Pay at the shop</span>
                </label>
                <p className="text-gray-600 text-sm mt-2 ml-6">Payment will be collected when you arrive for your appointment</p>
              </div>
              
              <div className="border border-gray-300 rounded-lg p-4">
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="payment" className="mr-3" />
                  <span className="font-medium">Credit/Debit Card</span>
                </label>
                <p className="text-gray-600 text-sm mt-2 ml-6">Pay now with your credit or debit card</p>
              </div>

              <div className="border border-gray-300 rounded-lg p-4">
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="payment" className="mr-3" />
                  <span className="font-medium">GCash</span>
                </label>
                <p className="text-gray-600 text-sm mt-2 ml-6">Pay using your GCash account</p>
              </div>
            </div>
            
            {/* Navigation */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={prevStep}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-all"
              >
                Previous
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="px-8 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all disabled:cursor-wait disabled:opacity-60"
              >
                {submitting ? 'Reserving...' : 'Complete Booking'}
              </button>
            </div>
          </div>
        )}

        {/* Additional steps would go here - for now just show a placeholder */}
        {currentStep > 4 && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-black mb-4">Step {currentStep}: {stepLabels[currentStep - 1]}</h2>
            <p className="text-gray-600 mb-8">This step is in development</p>
            
            <div className="flex justify-between max-w-md mx-auto">
              <button
                onClick={prevStep}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-all"
              >
                Previous
              </button>
              {currentStep < 4 ? (
                <button
                  onClick={nextStep}
                  className="px-8 py-3 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-800 transition-all"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="px-8 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all disabled:cursor-wait disabled:opacity-60"
                >
                  {submitting ? 'Reserving...' : 'Complete Booking'}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}