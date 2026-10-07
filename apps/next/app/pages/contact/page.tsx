'use client';

import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-montserrat',
});

export default function ContactPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      <div
        className="px-8 py-10 max-w-6xl w-full"
        style={{
          animation: 'blurIn 1s ease',
        }}
      >
        <h1 className={`text-5xl font-bold mb-4 text-left text-black ${montserrat.className}`}>
          Contact <span style={{ color: '#EDAE49' }}>Us</span>
        </h1>
        <h2 className={`text-2xl font-bold mb-4 text-left text-black ${montserrat.className}`}>
          We’re Here to Help!
        </h2>
        <p
          className="text-lg text-left text-black mb-6"
          style={{ fontFamily: 'Gotham, Arial, sans-serif' }}
        >
          Have questions, concerns, or need assistance with your booking? The team at Bookly PH is
          ready to assist you. Whether it's about scheduling an appointment, becoming a service
          provider, or technical support, we're just a message away!
        </p>

        <div className="text-black space-y-3 text-left text-base mb-12">
          <p><strong>📍 Office Address:</strong> 123 Session Road, Baguio City, Philippines</p>
          <p><strong>✉️ Email:</strong> support@booklyph.com</p>
          <p><strong>📞 Telephone:</strong> (074) 123-4567</p>
          <p><strong>📱 Mobile:</strong> +63 912 345 6789</p>
          <p><strong>🕒 Business Hours:</strong></p>
          <ul className="ml-5 list-disc">
            <li>Monday – Saturday: 9:00 AM – 6:00 PM</li>
            <li>Sunday – Closed</li>
          </ul>
        </div>

        {/* connect with us part */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
          {/* social image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img src="/images/social-icons.png" alt="Social Media Icons" className="w-60 md:w-72" />
          </div>

          {/* Social Links */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h2 className="text-2xl font-bold mb-2">Connect with Us Online</h2>
            <p className="mb-4">
              Follow us on social media for updates, special offers, and service recommendations!
            </p>
            <p><strong>Facebook:</strong> facebook.com/BooklyPH</p>
            <p><strong>Instagram:</strong> instagram.com/BooklyPH</p>
            <p><strong>Twitter/X:</strong> x.com/BooklyPH</p>
          </div>
        </div>

        {/* Send us a message part */}
        <div className="w-full">
          {/* Yellow header */}
          <div className="w-full bg-[#EDAE49] py-6 px-8 text-center rounded-t-xl">
            <h2 className="text-2xl font-bold text-black">Send Us a Message</h2>
            <p className="text-black">
              Have a specific inquiry? Fill out the form below, and we’ll get back to you as soon as possible.
            </p>
          </div>

          {/* Form */}
          <div className="w-full max-w-4xl px-8 py-10 mx-auto border border-gray-300 rounded-b-xl">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label htmlFor="name" className="mb-1 text-black font-medium">Name</label>
                  <input
                    id="name"
                    type="text"
                    className="border border-gray-400 rounded-md px-4 py-2"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="email" className="mb-1 text-black font-medium">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    className="border border-gray-400 rounded-md px-4 py-2"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor="subject" className="mb-1 text-black font-medium">Subject</label>
                <input
                  id="subject"
                  type="text"
                  className="border border-gray-400 rounded-md px-4 py-2"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="message" className="mb-1 text-black font-medium">Message</label>
                <textarea
                  id="message"
                  className="border border-gray-400 rounded-md px-4 py-2 h-40 resize-none"
                ></textarea>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-gradient-to-b from-[#EDAE49] to-[#d18c1f] text-black font-semibold px-6 py-2 rounded-md hover:brightness-105 transition"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blurIn {
          0% {
            opacity: 0;
            filter: blur(20px);
          }
          100% {
            opacity: 1;
            filter: blur(0);
          }
        }
      `}</style>
    </main>
  );
}
