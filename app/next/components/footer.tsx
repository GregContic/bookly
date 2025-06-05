"use client";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-[#EDAE49] mt-auto">
      {/* Top border */}
      <div className="w-full border-t-2 border-white" />

      {/* Main footer content */}
      <div className="flex flex-wrap items-start justify-between px-8 lg:px-32 py-8 text-gray-900">
        {/* Logo section */}
        <div className="flex-1 min-w-[180px] mb-4 lg:mb-0">
          <Image
            src="/assets/logo-footer.png"
            alt="Bookly Footer Logo"
            width={60}
            height={60}
            className="object-contain"
          />
        </div>

        {/* Navigation links */}
        <div className="flex-2 min-w-[340px] flex justify-center gap-16 lg:gap-24 mb-4 lg:mb-0">
          <div className="flex flex-col gap-2">
            <a
              href="#"
              className="text-gray-900 hover:text-gray-700 transition-colors no-underline"
            >
              Blogs
            </a>
            <a
              href="#"
              className="text-gray-900 hover:text-gray-700 transition-colors no-underline"
            >
              FAQs
            </a>
            <a
              href="#"
              className="text-gray-900 hover:text-gray-700 transition-colors no-underline"
            >
              About Us
            </a>
          </div>

          <div className="flex flex-col gap-2">
            <a
              href="#"
              className="text-gray-900 hover:text-gray-700 transition-colors no-underline"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-900 hover:text-gray-700 transition-colors no-underline"
            >
              Refund Policy
            </a>
            <a
              href="#"
              className="text-gray-900 hover:text-gray-700 transition-colors no-underline"
            >
              Terms and Conditions
            </a>
          </div>
        </div>

        {/* Social links with icons */}
        <div className="flex-1 min-w-[180px] flex items-center justify-end gap-4">
          <a
            href="#"
            className="text-gray-900 hover:text-gray-700 transition-colors p-2 hover:bg-gray-200 rounded-full"
            aria-label="Facebook"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>

          <a
            href="#"
            className="text-gray-900 hover:text-gray-700 transition-colors p-2 hover:bg-gray-200 rounded-full"
            aria-label="Instagram"
          >
            <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 32 32">
              <path d="M20.445 5h-8.891A6.559 6.559 0 0 0 5 11.554v8.891A6.559 6.559 0 0 0 11.554 27h8.891a6.56 6.56 0 0 0 6.554-6.555v-8.891A6.557 6.557 0 0 0 20.445 5zm4.342 15.445a4.343 4.343 0 0 1-4.342 4.342h-8.891a4.341 4.341 0 0 1-4.341-4.342v-8.891a4.34 4.34 0 0 1 4.341-4.341h8.891a4.342 4.342 0 0 1 4.341 4.341l.001 8.891z" />
              <path d="M16 10.312c-3.138 0-5.688 2.551-5.688 5.688s2.551 5.688 5.688 5.688 5.688-2.551 5.688-5.688-2.55-5.688-5.688-5.688zm0 9.163a3.475 3.475 0 1 1-.001-6.95 3.475 3.475 0 0 1 .001 6.95zM21.7 8.991a1.363 1.363 0 1 1-1.364 1.364c0-.752.51-1.364 1.364-1.364z" />
            </svg>
          </a>

          <a
            href="#"
            className="text-gray-900 hover:text-gray-700 transition-colors p-2 hover:bg-gray-200 rounded-full"
            aria-label="X (Twitter)"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>

          <a
            href="#"
            className="text-gray-900 hover:text-gray-700 transition-colors p-2 hover:bg-gray-200 rounded-full"
            aria-label="Google"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-900 text-base pb-3 pt-1 tracking-wide">
        © 2025 Bookly PH. All rights reserved.
      </div>
    </footer>
  );
}
