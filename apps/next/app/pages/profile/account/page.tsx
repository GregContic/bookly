"use client";
import { FormEvent, useState } from "react";

interface UserProfile {
  username: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export default function Account() {
  const [profile, setProfile] = useState<UserProfile>({
    username: "Juan",
    name: "Juan Dela Cruz",
    email: "name@test.com",
    phone: "+639123456789",
    address: "#123 Main St., Baguio City, Philippines, 2600"
  });

  const [isUpdating, setIsUpdating] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    alert('Profile updated successfully!');
    setIsUpdating(false);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-2xl font-semibold mb-8">Account</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Icon */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center">
                  <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <button
                  type="button"
                  className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg border hover:bg-gray-50"
                  title="Change photo"
                >
                  ✏️
                </button>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username:
                </label>
                <input
                  type="text"
                  value={profile.username}
                  onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#EDAE49] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name:
                </label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#EDAE49] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email:
                </label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#EDAE49] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone:
                </label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#EDAE49] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address:
                </label>
                <input
                  type="text"
                  value={profile.address}
                  onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#EDAE49] focus:border-transparent"
                />
              </div>
            </div>

            {/* Update Button */}
            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={isUpdating}
                className={`px-6 py-2 bg-[#EDAE49] text-white rounded-lg hover:bg-[#EDAE49]/90 transition-colors
                  ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isUpdating ? 'Updating...' : 'Update Profile'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}