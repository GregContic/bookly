"use client";
import { usePathname } from "next/navigation";
import Header from "../../components/header";
import Footer from "../../components/footer";
import Link from "next/link";

export default function LayoutClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = ["/sign-in", "/sign-up"].includes(pathname);

  return (
    <>
      {isAuthPage ? (
        <div className="w-full flex items-start">
          <Link
            href="/"
            className="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors px-8 py-6"
            style={{ position: "absolute", top: 0, left: 0 }}
          >
            BOOKLY PH
          </Link>
          <div className="flex-grow flex flex-col bg-[#FFFFFF]">{children}</div>
        </div>
      ) : (
        <>
          <Header />
          <div className="flex-grow flex flex-col bg-[#FFFFFF]">{children}</div>
          <Footer />
        </>
      )}
    </>
  );
}
