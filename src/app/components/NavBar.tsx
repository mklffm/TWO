"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function NavBar() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    setIsAuth(!!localStorage.getItem("token"));
    window.addEventListener("storage", () => {
      setIsAuth(!!localStorage.getItem("token"));
    });
  }, []);

  return (
    <nav className="bg-white shadow fixed top-0 left-0 right-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center">
              <div className="w-auto h-10 relative">
                <Image 
                  src="/images/mira-logo.png" 
                  alt="Mira Booking Logo" 
                  width={120} 
                  height={40} 
                  className="object-contain" 
                  priority
                />
              </div>
            </Link>
            {isAuth && <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">Dashboard</Link>}
            {isAuth && <Link href="/profile" className="text-gray-700 hover:text-blue-600">Profile</Link>}
          </div>
          <div className="flex items-center space-x-4">
            {!isAuth && <Link href="/login" className="text-gray-700 hover:text-blue-600">Login</Link>}
            {!isAuth && <Link href="/create-account" className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700">Create Account</Link>}
            {isAuth && (
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  setIsAuth(false);
                  window.location.href = "/login";
                }}
                className="text-gray-700 hover:text-blue-600"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 