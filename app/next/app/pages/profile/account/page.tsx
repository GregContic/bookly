"use client";
import Image from "next/image";
import { FormEvent, useState, useEffect } from "react";

interface UserProfile {
  username: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar: string;
}

export default function Account() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user profile data (making it backend ready)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('/api/profile');
        if (!response.ok) throw new Error('Failed to fetch profile');
        
        const data = await response.json();
        setProfile(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load profile');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setError(null);

    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      });

      if (!response.ok) throw new Error('Failed to update profile');

      const updatedProfile = await response.json();
      setProfile(updatedProfile);
      alert('Profile updated successfully!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    } finally {
      setIsUpdating(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    try {
      const response = await fetch('/api/profile/avatar', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to upload image');

      const data = await response.json();
      setProfile(prev => prev ? { ...prev, avatar: data.avatarUrl } : null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload image');
    }
  };

  if (isLoading) return <div>Loading profile...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!profile) return <div>No profile data found</div>;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-8">Account</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Profile Picture Section */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <Image
              src={profile.avatar}
              alt="Profile Picture"
              width={120}
              height={120}
              className="rounded-full"
            />
            <label 
              className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg border cursor-pointer"
              title="Change photo"
            >
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
              ✏️
            </label>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* ...existing input fields... */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username:
            </label>
            <input
              type="text"
              value={profile.username}
              onChange={(e) => setProfile(prev => prev ? { ...prev, username: e.target.value } : null)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#EDAE49] focus:border-transparent"
            />
          </div>

          {/* Repeat for other fields... */}
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-600 text-sm">{error}</div>
        )}

        {/* Update Button */}
        <div className="flex justify-end">
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
  );
}