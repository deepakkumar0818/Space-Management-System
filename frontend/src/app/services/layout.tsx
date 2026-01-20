"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";

interface AuthPayload {
  sub: string;
  role: string;
  email?: string;
  name?: string;
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

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
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
    
    checkAuth();
    
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "workspace_token" || e.key === "workspace_user") {
        checkAuth();
      }
    };
    
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

  const getActiveService = () => {
    if (pathname?.includes("office-space")) return "office-space";
    if (pathname?.includes("coworking")) return "coworking";
    if (pathname?.includes("virtual-offices")) return "virtual-offices";
    if (pathname?.includes("meeting-rooms")) return "meeting-rooms";
    if (pathname?.includes("membership")) return "membership";
    if (pathname?.includes("business-address")) return "business-address";
    if (pathname?.includes("telephone-answering")) return "telephone-answering";
    if (pathname?.includes("event-space")) return "event-space";
    if (pathname?.includes("private-offices")) return "private-offices";
    if (pathname?.includes("custom-offices")) return "custom-offices";
    return null;
  };

  const activeService = getActiveService();

  return (
    <div className="min-h-screen bg-white">
      {/* Top Dark Header Bar */}
      <div className="bg-slate-800 text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-slate-900 text-[10px] font-bold text-white">
              WB
            </div>
            <span className="font-semibold">Workspace Booking</span>
          </Link>
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
              +971 4 567 8900
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
            <Link 
              href="/services/office-space" 
              className={`flex items-center gap-2 whitespace-nowrap px-2 py-1 font-medium transition-colors ${
                activeService === "office-space"
                  ? "border-b-2 border-orange-500 text-slate-900"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Office Space
            </Link>
            <Link 
              href="/services/coworking" 
              className={`flex items-center gap-2 whitespace-nowrap px-2 py-1 transition-colors ${
                activeService === "coworking"
                  ? "border-b-2 border-orange-500 font-medium text-slate-900"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Coworking
            </Link>
            <Link 
              href="/services/virtual-offices" 
              className={`flex items-center gap-2 whitespace-nowrap px-2 py-1 transition-colors ${
                activeService === "virtual-offices"
                  ? "border-b-2 border-orange-500 font-medium text-slate-900"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Virtual Offices
            </Link>
            <Link 
              href="/services/meeting-rooms" 
              className={`flex items-center gap-2 whitespace-nowrap px-2 py-1 transition-colors ${
                activeService === "meeting-rooms"
                  ? "border-b-2 border-orange-500 font-medium text-slate-900"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Meeting Rooms
            </Link>
            <Link 
              href="/services/membership" 
              className={`flex items-center gap-2 whitespace-nowrap px-2 py-1 transition-colors ${
                activeService === "membership"
                  ? "border-b-2 border-orange-500 font-medium text-slate-900"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
              </svg>
              Membership
            </Link>
            <Link 
              href="/services/business-address" 
              className={`flex items-center gap-2 whitespace-nowrap px-2 py-1 transition-colors ${
                activeService === "business-address"
                  ? "border-b-2 border-orange-500 font-medium text-slate-900"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Business Address
            </Link>
            <Link 
              href="/services/telephone-answering" 
              className={`flex items-center gap-2 whitespace-nowrap px-2 py-1 transition-colors ${
                activeService === "telephone-answering"
                  ? "border-b-2 border-orange-500 font-medium text-slate-900"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Telephone Answering
            </Link>
            <Link 
              href="/services/event-space" 
              className={`flex items-center gap-2 whitespace-nowrap px-2 py-1 transition-colors ${
                activeService === "event-space"
                  ? "border-b-2 border-orange-500 font-medium text-slate-900"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Event Space
            </Link>
            <Link 
              href="/services/private-offices" 
              className={`flex items-center gap-2 whitespace-nowrap px-2 py-1 transition-colors ${
                activeService === "private-offices"
                  ? "border-b-2 border-orange-500 font-medium text-slate-900"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Private Offices
            </Link>
            <Link 
              href="/services/custom-offices" 
              className={`flex items-center gap-2 whitespace-nowrap px-2 py-1 transition-colors ${
                activeService === "custom-offices"
                  ? "border-b-2 border-orange-500 font-medium text-slate-900"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
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

      {/* Page Content */}
      {children}
    </div>
  );
}

