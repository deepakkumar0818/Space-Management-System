import type { ReactNode } from "react";
import Link from "next/link";

interface StaffLayoutProps {
  children: ReactNode;
}

export default function StaffLayout({ children }: StaffLayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-800 backdrop-blur sm:px-6">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-900 text-[11px] font-semibold text-white">
              WB
            </div>
            <span className="font-semibold tracking-tight">
              Workspace – Staff
            </span>
          </Link>
          <nav className="flex gap-3 text-xs">
            <Link
              href="/staff"
              className="rounded-full px-3 py-1.5 hover:bg-slate-100"
            >
              Overview
            </Link>
            <Link
              href="/staff/checkins"
              className="rounded-full px-3 py-1.5 hover:bg-slate-100"
            >
              Check-ins
            </Link>
            <Link
              href="/staff/bookings"
              className="rounded-full px-3 py-1.5 hover:bg-slate-100"
            >
              Bookings
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">
        {children}
      </main>
    </div>
  );
}


