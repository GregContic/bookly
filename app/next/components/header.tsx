"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../app/auth/AuthContext";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/pages/services" },
  { name: "About Page", href: "/pages/about" },
  { name: "Contact Page", href: "/pages/contact" },
];

interface Notification {
  id: string;
  message: string;
  timestamp: string;
  type: string;
}

const NotificationPopup = ({ isOpen }: { isOpen: boolean }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {        // TODO: Replace with actual API call
        // Simulating API call for now
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setNotifications([
          {
            id: '1',
            message: 'Your booking request for Kwentong Barbero has been approved',
            timestamp: '2 minutes ago',
            type: 'success'
          }
        ]);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden z-50">
      <div className="p-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold">Notifications</h3>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {loading ? (
          <div className="p-4 text-center text-gray-500">
            Loading notifications...
          </div>
        ) : notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No notifications as of the moment
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className="p-4 border-b border-gray-100 hover:bg-gray-50"
            >              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-500 mr-3">
                  {notification.type === 'success' ? '✓' : '!'}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">{notification.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {notification.timestamp}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default function Header() {
  const router = useRouter();
  const { signedIn, setSignedIn } = useAuth();
  const [open, setOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target as Node)
      ) {
        setNotificationsOpen(false);
      }
    }
    if (open || notificationsOpen)
      document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, notificationsOpen]);

  const handleLogout = () => {
    setOpen(false);
    setSignedIn(false);
    router.push("/");
  };

  return (
    <header className="w-full px-6 py-4 shadow-md bg-white flex items-center justify-between relative">
      {/* Left: Logo */}
      <div style={{ minWidth: 200, display: "flex", alignItems: "center" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center" }}>
          <Image
            src="/assets/logo-header.png"
            alt="Bookly Header Logo"
            width={200}
            height={80}
            style={{ objectFit: "contain" }}
            priority
          />
        </Link>
      </div>

      {/* Center: Nav */}
      <nav
        className="space-x-6 hidden md:flex"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`text-gray-600 font-medium transition-colors ${
              !signedIn ? "pointer-events-none opacity-50" : "hover:text-[#EDAE49]"
            }`}
            tabIndex={signedIn ? 0 : -1}
            aria-disabled={!signedIn}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      {/* Right: Icons */}
      <div
        className="flex items-center space-x-4 text-2xl text-gray-600 relative"
        style={{ minWidth: 80, justifyContent: "flex-end" }}
      >
        {signedIn && (
          <div ref={notificationRef} className="relative">
            <button
              className="hover:text-[#EDAE49] transition-colors"
              aria-label="Notifications"
              onClick={() => setNotificationsOpen((prev) => !prev)}
            >
              🔔
            </button>
            <NotificationPopup isOpen={notificationsOpen} />
          </div>
        )}
        <div ref={dropdownRef} className="relative">
          <button
            className="hover:text-[#EDAE49] transition-colors"
            aria-label={signedIn ? "Profile" : "Sign in"}
            onClick={() => setOpen((o) => !o)}
          >
            👤
          </button>
          {open && (
            <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10">
              {signedIn ? (
                <>
                  <Link
                    href="/pages/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    Log out
                  </button>
                </>
              ) : (
                <Link
                  href="/pages/login"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  onClick={() => setOpen(false)}
                >
                  Sign in
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}