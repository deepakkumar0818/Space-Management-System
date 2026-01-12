"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

interface AuthPayload {
  sub: string;
  role: string;
  email?: string;
}

interface UserInfo {
  name: string;
  email: string;
  role: string;
}

function decodeJWT(token: string): AuthPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payload = parts[1];
    const decoded = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
    return decoded as AuthPayload;
  } catch {
    return null;
  }
}

type ServiceType = "office-space" | "coworking" | "virtual-offices" | "meeting-rooms";

interface ServiceContent {
  tagline: string;
  heading: string;
  image: string;
}

const serviceContent: Record<ServiceType, ServiceContent> = {
  "office-space": {
    tagline: "From a single desk to a whole building. The choice is yours.",
    heading: "Office space your way",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop",
  },
  coworking: {
    tagline: "Work alongside innovators, entrepreneurs, and creators.",
    heading: "Coworking spaces that inspire",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&h=1080&fit=crop",
  },
  "virtual-offices": {
    tagline: "Build a professional presence without the overhead.",
    heading: "Virtual offices, real results",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1920&h=1080&fit=crop",
  },
  "meeting-rooms": {
    tagline: "Professional meeting spaces for every occasion.",
    heading: "Meeting rooms on demand",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1920&h=1080&fit=crop",
  },
};

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceType>("office-space");
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const navScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkAuth = () => {
      if (typeof window !== "undefined") {
        const token = window.localStorage.getItem("workspace_token");
        if (token) {
          const decoded = decodeJWT(token);
          if (decoded) {
            setIsLoggedIn(true);
            setUserRole(decoded.role || null);
            setUserEmail(decoded.email || null);
          } else {
            setIsLoggedIn(false);
            setUserRole(null);
            setUserEmail(null);
          }
        } else {
          setIsLoggedIn(false);
          setUserRole(null);
          setUserEmail(null);
        }
        
        // Get user info from localStorage
        const userInfoStr = window.localStorage.getItem("workspace_user");
        if (userInfoStr) {
          try {
            const userInfo: UserInfo = JSON.parse(userInfoStr);
            setUserName(userInfo.name || null);
            setUserEmail(userInfo.email || null);
            setUserRole(userInfo.role || null);
            setIsLoggedIn(true);
          } catch {
            // Ignore parse errors
          }
        } else {
          setUserName(null);
        }
      }
    };
    
    // Check auth on mount
    checkAuth();
    
    // Listen for storage changes (when user logs in/out in another tab or page)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "workspace_token" || e.key === "workspace_user") {
        checkAuth();
      }
    };
    
    // Listen for focus (when user comes back to this tab)
    const handleFocus = () => {
      checkAuth();
    };
    
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("focus", handleFocus);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target as Node)
      ) {
        setShowProfileMenu(false);
      }
    };

    if (showProfileMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfileMenu]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("workspace_token");
      window.localStorage.removeItem("workspace_user");
      setIsLoggedIn(false);
      setUserRole(null);
      setUserEmail(null);
      setUserName(null);
      setShowProfileMenu(false);
      router.push("/");
    }
  };

  const getDashboardLink = () => {
    if (userRole === "admin") return "/admin";
    if (userRole === "staff") return "/staff";
    return "/app";
  };

  const checkScrollButtons = () => {
    if (navScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = navScrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scrollNav = (direction: "left" | "right") => {
    if (navScrollRef.current) {
      const scrollAmount = 200;
      const newScrollLeft =
        direction === "left"
          ? navScrollRef.current.scrollLeft - scrollAmount
          : navScrollRef.current.scrollLeft + scrollAmount;
      
      navScrollRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
      
      setTimeout(checkScrollButtons, 300);
    }
  };


  useEffect(() => {
    checkScrollButtons();
    const handleResize = () => checkScrollButtons();
    const navElement = navScrollRef.current;
    
    window.addEventListener("resize", handleResize);
    if (navElement) {
      navElement.addEventListener("scroll", checkScrollButtons);
    }
    
    return () => {
      window.removeEventListener("resize", handleResize);
      if (navElement) {
        navElement.removeEventListener("scroll", checkScrollButtons);
      }
    };
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* Top Dark Header Bar */}
      <div className="bg-slate-800 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-slate-900 text-[10px] font-bold text-white">
              WB
            </div>
            <span className="font-semibold">Workspace Booking</span>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <div className="flex items-center gap-1 rounded border border-slate-700 bg-slate-700/50 px-2 py-1">
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search for a location"
                className="bg-transparent text-xs text-white placeholder-slate-400 focus:outline-none"
              />
            </div>
            <button className="flex items-center gap-1 rounded bg-red-600 px-3 py-1.5 text-xs font-medium hover:bg-red-700">
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +91 172 456 7890
            </button>
            <button className="rounded bg-red-600 px-3 py-1.5 text-xs font-medium hover:bg-red-700">
              Contact us &gt;
            </button>
            <button className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-600 hover:bg-slate-700">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            {isLoggedIn ? (
              <div className="relative" ref={profileMenuRef}>
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-600 hover:bg-slate-700"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 rounded-lg border border-slate-200 bg-white shadow-lg z-50">
                    <div className="p-3 border-b border-slate-100">
                      <p className="text-xs font-semibold text-slate-900">
                        {userName || userEmail || "User"}
                      </p>
                      <p className="text-[11px] text-slate-500 capitalize">
                        {userRole || "Customer"}
                      </p>
                    </div>
                    <div className="p-1">
                      {userRole === "customer" ? (
                        <>
                          <Link
                            href="/app"
                            onClick={() => setShowProfileMenu(false)}
                            className="block px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded-md transition-colors"
                          >
                            Browse Workspaces
                          </Link>
                          <Link
                            href="/app/bookings"
                            onClick={() => setShowProfileMenu(false)}
                            className="block px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded-md transition-colors"
                          >
                            My Bookings
                          </Link>
                        </>
                      ) : (
                        <Link
                          href={getDashboardLink()}
                          onClick={() => setShowProfileMenu(false)}
                          className="block px-3 py-2 text-xs text-slate-700 hover:bg-slate-50 rounded-md transition-colors"
                        >
                          {userRole === "admin" ? "Admin Dashboard" : "Staff Panel"}
                        </Link>
                      )}
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full text-left px-3 py-2 text-xs text-red-600 hover:bg-red-50 rounded-md transition-colors mt-1"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/auth/login"
                className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-600 hover:bg-slate-700"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
            )}
            <button className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-600 hover:bg-slate-700">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* White Navigation Bar */}
      <div className="border-b border-slate-200 bg-white">
        <div className="relative mx-auto max-w-7xl px-4 py-3 sm:px-6">
          {/* Left Arrow */}
          {canScrollLeft && (
            <button
              onClick={() => scrollNav("left")}
              className="absolute left-0 top-0 z-10 flex h-full items-center bg-white px-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          
          {/* Scrollable Navigation */}
          <div
            ref={navScrollRef}
            className="scrollbar-hide flex items-center gap-4 overflow-x-scroll text-xs px-8"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
            onScroll={checkScrollButtons}
          >
            <Link href="/services/office-space" className="flex items-center gap-2 whitespace-nowrap border-b-2 border-orange-500 px-2 py-1 font-medium text-slate-900">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Office Space
            </Link>
            <Link href="/services/coworking" className="flex items-center gap-2 whitespace-nowrap px-2 py-1 text-slate-600 hover:text-slate-900">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Coworking
            </Link>
            <Link href="/services/virtual-offices" className="flex items-center gap-2 whitespace-nowrap px-2 py-1 text-slate-600 hover:text-slate-900">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Virtual Offices
            </Link>
            <Link href="/services/meeting-rooms" className="flex items-center gap-2 whitespace-nowrap px-2 py-1 text-slate-600 hover:text-slate-900">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Meeting Rooms
            </Link>
            <Link href="/services/membership" className="flex items-center gap-2 whitespace-nowrap px-2 py-1 text-slate-600 hover:text-slate-900">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
              </svg>
              Membership
            </Link>
            <Link href="/services/business-address" className="flex items-center gap-2 whitespace-nowrap px-2 py-1 text-slate-600 hover:text-slate-900">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Business Address
            </Link>
            <Link href="/services/telephone-answering" className="flex items-center gap-2 whitespace-nowrap px-2 py-1 text-slate-600 hover:text-slate-900">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Telephone Answering
            </Link>
            <Link href="/services/event-space" className="flex items-center gap-2 whitespace-nowrap px-2 py-1 text-slate-600 hover:text-slate-900">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Event Space
            </Link>
            <Link href="/services/private-offices" className="flex items-center gap-2 whitespace-nowrap px-2 py-1 text-slate-600 hover:text-slate-900">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Private Offices
            </Link>
            <Link href="/services/custom-offices" className="flex items-center gap-2 whitespace-nowrap px-2 py-1 text-slate-600 hover:text-slate-900">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Custom Offices
            </Link>
          </div>
          
          {/* Right Arrow */}
          {canScrollRight && (
            <button
              onClick={() => scrollNav("right")}
              className="absolute right-0 top-0 z-10 flex h-full items-center bg-white px-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Hero Section with Background Image */}
      <div className="relative h-[600px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={serviceContent[selectedService].image}
            alt={serviceContent[selectedService].heading}
            className="h-full w-full object-cover transition-opacity duration-500"
            key={selectedService}
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        {/* Overlay Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <p className="text-sm font-medium sm:text-base transition-all duration-300">
            {serviceContent[selectedService].tagline}
          </p>
          <h1 className="mt-4 text-4xl font-bold sm:text-5xl md:text-6xl transition-all duration-300">
            {serviceContent[selectedService].heading}
            <span className="ml-2 inline-block h-2 w-2 rounded-full bg-red-500"></span>
          </h1>
        </div>

        {/* Service Selection Tabs */}
        <div className="absolute bottom-32 left-0 right-0 z-20">
          <div className="mx-auto max-w-4xl px-4">
            <div className="flex gap-2 rounded-t-lg bg-white p-2 shadow-lg">
              <button
                type="button"
                onClick={() => setSelectedService("office-space")}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                  selectedService === "office-space"
                    ? "border-b-2 border-orange-500 bg-orange-50 text-slate-900"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Office space
              </button>
              <button
                type="button"
                onClick={() => setSelectedService("coworking")}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                  selectedService === "coworking"
                    ? "border-b-2 border-orange-500 bg-orange-50 text-slate-900"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Coworking
              </button>
              <button
                type="button"
                onClick={() => setSelectedService("virtual-offices")}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                  selectedService === "virtual-offices"
                    ? "border-b-2 border-orange-500 bg-orange-50 text-slate-900"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Virtual Offices
              </button>
              <button
                type="button"
                onClick={() => setSelectedService("meeting-rooms")}
                className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                  selectedService === "meeting-rooms"
                    ? "border-b-2 border-orange-500 bg-orange-50 text-slate-900"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Meeting rooms
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="absolute bottom-8 left-0 right-0 z-20">
          <div className="mx-auto max-w-4xl px-4">
            <div className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-xl">
              <input
                type="text"
                placeholder="Search here"
                className="flex-1 border-0 bg-transparent px-3 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
              />
              <button className="text-sm font-medium text-orange-600 underline hover:text-orange-700">
                Search Nearby
              </button>
              <Link
                href="/app"
                className="flex items-center gap-2 rounded bg-red-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-red-700"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                SEARCH
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Service Cards Grid */}
      <section className="bg-slate-50 py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {/* Our Solutions */}
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="relative mb-4 flex h-14 w-14 items-center justify-center">
                <svg className="h-14 w-14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <circle cx="12" cy="8" r="4" strokeWidth="2" fill="none" />
                  <circle cx="20" cy="18" r="3" strokeWidth="2" fill="none" />
                  <circle cx="4" cy="18" r="3" strokeWidth="2" fill="none" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 12l4 6M12 12l-4 6" />
                </svg>
                <div className="absolute left-1 top-1 h-3 w-3 rounded-full bg-red-600"></div>
              </div>
              <h3 className="text-base font-semibold text-red-600 underline">
                Our Solutions
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Browse our full range of products and services
              </p>
            </div>

            {/* Talk to us */}
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="relative mb-4 flex h-14 w-14 items-center justify-center">
                <svg className="h-14 w-14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <circle cx="12" cy="10" r="6" strokeWidth="2" fill="none" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14h.01M12 14h.01M16 14h.01" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 16v4M8 20h8" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 8a3 3 0 016 0" />
                </svg>
                <div className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-600"></div>
              </div>
              <h3 className="text-base font-semibold text-red-600 underline">
                Talk to us
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Get advice from one of our experts 24/7
              </p>
            </div>

            {/* Book workspace */}
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="relative mb-4 flex h-14 w-14 items-center justify-center">
                <svg className="h-14 w-14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="2" fill="none" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 2v4M8 2v4M3 10h18" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 2v2M16 2v2" />
                  <circle cx="12" cy="16" r="2.5" fill="red" />
                </svg>
                <div className="absolute left-1 top-1">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
              </div>
              <h3 className="text-base font-semibold text-red-600 underline">
                Book workspace
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Book meeting rooms and day offices now
              </p>
            </div>

            {/* Set up a virtual office */}
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="relative mb-4 flex h-14 w-14 items-center justify-center">
                <svg className="h-14 w-14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <circle cx="12" cy="10" r="4" strokeWidth="2" fill="none" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 20v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 6h2a1 1 0 011 1v2a1 1 0 01-1 1h-2M6 6H4a1 1 0 00-1 1v2a1 1 0 001 1h2" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2v4M12 18v4" />
                </svg>
                <div className="absolute bottom-2 left-2 h-2.5 w-2.5 rounded-full bg-red-600"></div>
              </div>
              <h3 className="text-base font-semibold text-red-600 underline">
                Set up a virtual office
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Start building a real presence today
              </p>
            </div>

            {/* Buy a Membership */}
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="relative mb-4 flex h-14 w-14 items-center justify-center">
                <svg className="h-14 w-14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <circle cx="12" cy="10" r="4" strokeWidth="2" fill="none" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 20v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 8h-2M18 12h-2" />
                </svg>
                <div className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-600"></div>
              </div>
              <h3 className="text-base font-semibold text-red-600 underline">
                Buy a Membership
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Access thousands of locations on demand
              </p>
            </div>

            {/* Explore our app */}
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="relative mb-4 flex h-14 w-14 items-center justify-center">
                <svg className="h-14 w-14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <rect x="5" y="2" width="14" height="20" rx="2" strokeWidth="2" fill="none" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 6h6M9 10h6" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 16l2 2 4-4" />
                </svg>
                <div className="absolute right-1 top-3 h-2 w-2 rounded-full bg-red-600"></div>
              </div>
              <h3 className="text-base font-semibold text-red-600 underline">
                Explore our app
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Download our app and get started today
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Work wherever business takes you */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            {/* Images on left */}
            <div className="relative min-h-[500px] pb-8">
              {/* Background Image - Office Interior */}
              <div className="relative z-10 aspect-[4/3] overflow-hidden rounded-lg shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop"
                  alt="Modern office interior"
                  className="h-full w-full object-cover"
                />
              </div>
              {/* Foreground Image - Two Women Collaborating */}
              <div className="absolute -bottom-4 -left-4 z-20 w-[60%] overflow-hidden rounded-lg shadow-2xl border-4 border-white bg-white">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop"
                  alt="Two women collaborating at desk"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Text on right */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                Work wherever business takes you.
                <span className="ml-2 inline-block h-2 w-2 rounded-full bg-red-600"></span>
              </h2>
              <div className="mt-6 space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-slate-100">
                      <svg className="h-5 w-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-base text-slate-700">
                    With over 4000 locations globally we have offices, coworking spaces, and meeting rooms in every major town, city, and transport hub.
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-slate-100">
                      <svg className="h-5 w-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-base text-slate-700">
                    Whether you work alone, you&apos;re growing a start-up, or you&apos;re running the world&apos;s most successful corporation our network makes it possible to work near clients, colleagues, or family.
                  </p>
                </div>
              </div>
              <Link
                href="/app"
                className="mt-6 inline-block text-base font-semibold text-red-600 underline hover:text-red-700"
              >
                Talk To An Expert &gt;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* If your needs change, we're flexible */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            {/* Text on left */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                If your needs change, we&apos;re flexible.
                <span className="ml-2 inline-block h-2 w-2 rounded-full bg-red-600"></span>
              </h2>
              <div className="mt-6 space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-slate-100">
                      <svg className="h-5 w-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-base text-slate-700">
                    Whether you need a single desk or a whole building, want to drop in or stay for much longer, we&apos;ve got all your immediate business requirements covered.
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-slate-100">
                      <svg className="h-5 w-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-base text-slate-700">
                    And whatever the future brings, we&apos;re able to handle that too. So when you need to scale up, cross borders, or make the move to hybrid working we&apos;re here to support you every step of the way.
                  </p>
                </div>
              </div>
              <Link
                href="/app"
                className="mt-6 inline-block text-base font-semibold text-red-600 underline hover:text-red-700"
              >
                Talk To An Expert &gt;
              </Link>
            </div>

            {/* Image on right with overlays */}
            <div className="relative">
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&h=800&fit=crop"
                  alt="Modern open-plan office space"
                  className="h-full w-full object-cover"
                />
              </div>
              {/* Overlay shapes */}
              <div className="absolute -top-4 -right-4 h-32 w-32 rounded-lg bg-pink-200/40"></div>
              <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-lg bg-pink-200/40"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Hybrid working */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            {/* Images on left */}
            <div className="relative">
              <div className="relative z-10 aspect-[4/3] overflow-hidden rounded-lg shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop"
                  alt="Modern workspace with plants and natural light"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute left-4 top-4 z-20 aspect-square w-32 overflow-hidden rounded-lg shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=300&h=300&fit=crop"
                  alt="Team collaboration"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 z-0 aspect-square w-28 overflow-hidden rounded-lg shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=300&h=300&fit=crop"
                  alt="Person on bicycle"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Text on right */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                Hybrid working can work for you.
                <span className="ml-2 inline-block h-2 w-2 rounded-full bg-red-600"></span>
              </h2>
              <div className="mt-6 space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-slate-100">
                      <svg className="h-5 w-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-base text-slate-700">
                    Hybrid working is a better way to work that gives businesses and workers more choice on how and where they work. It&apos;s a healthier, greener, flexible, and more cost-effective way to do business.
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-slate-100">
                      <svg className="h-5 w-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-base text-slate-700">
                    And we have the solutions to help you work this way. So, whether you require meeting rooms for an hour, offices for the day, or want to drop in and cowork, the choice is yours.
                  </p>
                </div>
              </div>
              <Link
                href="/app"
                className="mt-6 inline-block text-base font-semibold text-red-600 underline hover:text-red-700"
              >
                Make The Move To Hybrid &gt;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Stats Section */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-900">4000+</div>
              <div className="mt-2 text-sm text-slate-600">Locations globally</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-900">50+</div>
              <div className="mt-2 text-sm text-slate-600">Countries worldwide</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-900">24/7</div>
              <div className="mt-2 text-sm text-slate-600">Expert support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="grid gap-8 md:grid-cols-4">
            {/* Company Info */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded bg-white text-xs font-bold text-slate-900">
                  WB
                </div>
                <span className="text-sm font-semibold">Workspace Booking</span>
              </div>
              <p className="text-xs text-slate-400">
                Professional workspace solutions for businesses of all sizes. Book desks, meeting rooms, and offices on demand.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="mb-4 text-sm font-semibold">Quick Links</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  <Link href="/app" className="hover:text-white transition-colors">
                    Browse Workspaces
                  </Link>
                </li>
                <li>
                  <Link href="/app/bookings" className="hover:text-white transition-colors">
                    My Bookings
                  </Link>
                </li>
                <li>
                  <Link href="/admin" className="hover:text-white transition-colors">
                    Admin Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/staff" className="hover:text-white transition-colors">
                    Staff Panel
                  </Link>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="mb-4 text-sm font-semibold">Services</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li>
                  <Link href="/app" className="hover:text-white transition-colors">
                    Office Space
                  </Link>
                </li>
                <li>
                  <Link href="/app" className="hover:text-white transition-colors">
                    Coworking
                  </Link>
                </li>
                <li>
                  <Link href="/app" className="hover:text-white transition-colors">
                    Meeting Rooms
                  </Link>
                </li>
                <li>
                  <Link href="/app" className="hover:text-white transition-colors">
                    Virtual Offices
                  </Link>
                </li>
                <li>
                  <Link href="/app" className="hover:text-white transition-colors">
                    Membership Plans
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="mb-4 text-sm font-semibold">Contact</h4>
              <ul className="space-y-2 text-xs text-slate-400">
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +91 172 456 7890
                </li>
                <li className="flex items-center gap-2">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  support@workspace.com
                </li>
                <li className="flex items-start gap-2">
                  <svg className="h-4 w-4 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>
                    India: Chandigarh, Mohali<br />
                    UAE: Dubai, Abu Dhabi, Sharjah
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-8 border-t border-slate-800 pt-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-xs text-slate-400">
                © {new Date().getFullYear()} Workspace Booking System. All rights reserved.
              </div>
              <div className="flex flex-wrap gap-4 text-xs text-slate-400">
                <Link href="#" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link href="#" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
                <Link href="#" className="hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      </main>
  );
}

