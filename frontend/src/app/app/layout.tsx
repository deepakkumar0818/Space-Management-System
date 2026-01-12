"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

interface AppLayoutProps {
  children: ReactNode;
}

interface UserInfo {
  name: string;
  email: string;
  role: string;
}

function decodeJWT(token: string): { sub: string; role: string } | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payload = parts[1];
    const decoded = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
    return decoded as { sub: string; role: string };
  } catch {
    return null;
  }
}

export default function AppLayout({ children }: AppLayoutProps) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkAuth = () => {
      if (typeof window !== "undefined") {
        const token = window.localStorage.getItem("workspace_token");
        if (token) {
          const decoded = decodeJWT(token);
          if (decoded) {
            setIsLoggedIn(true);
            setUserRole(decoded.role || null);
          } else {
            setIsLoggedIn(false);
            setUserRole(null);
          }
        } else {
          setIsLoggedIn(false);
          setUserRole(null);
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

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-800 backdrop-blur sm:px-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-900 text-[11px] font-semibold text-white">
              WB
            </div>
            <span className="font-semibold tracking-tight">
              Workspace – Customer
            </span>
          </Link>
          <div className="flex items-center gap-3 text-xs">
            {isLoggedIn ? (
              <div className="relative" ref={profileMenuRef}>
                <button
                  type="button"
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 rounded-full border-2 border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-800 shadow-md hover:bg-slate-50 hover:border-slate-400 transition-all"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span className="hidden sm:inline">
                    {userName || userEmail?.split("@")[0] || "Profile"}
                  </span>
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
              <>
                <Link
                  href="/auth/login?role=customer"
                  className="rounded-full border-2 border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-800 shadow-md hover:bg-slate-50 hover:border-slate-400 transition-all"
                >
                  Login
                </Link>
                <Link
                  href="/auth/register?role=customer"
                  className="rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white shadow-md hover:bg-slate-800 transition-all"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">
        {children}
      </main>
    </div>
  );
}


