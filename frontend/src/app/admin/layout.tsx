import Link from "next/link";
import type { ReactNode } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}

const adminNav: { href: string; label: string }[] = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/spaces", label: "Space Management" },
  { href: "/admin/reports", label: "Reports & MIS" },
  { href: "/admin/calendar", label: "Calendar & Heatmap" },
  { href: "/admin/pricing", label: "Pricing & Promotions" },
  { href: "/admin/orders", label: "Orders & Payments" },
  { href: "/admin/invoices", label: "Invoices & Tax" },
  { href: "/admin/users", label: "Users & Roles" },
  { href: "/admin/content", label: "Content Management" },
  { href: "/admin/support", label: "Support Actions" },
  { href: "/admin/integrations/zoho", label: "Zoho Accounts" },
  { href: "/admin/refunds", label: "Refund Rules" },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen bg-slate-950/5">
      <div className="flex min-h-screen w-full flex-col">
        {/* Top bar */}
        <header className="flex h-14 items-center justify-between border-b border-slate-200 bg-white/80 px-4 backdrop-blur sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-xs font-semibold text-white">
              WB
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-slate-900">
                Workspace Admin
              </span>
              <span className="text-xs text-slate-500">
                Control locations, pricing, and bookings
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="hidden rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 md:inline-flex">
              Switch to customer app
            </button>
            <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 text-xs">
              <span className="h-6 w-6 rounded-full bg-slate-300" />
              <div className="flex flex-col leading-4">
                <span className="font-medium text-slate-800">Admin User</span>
                <span className="text-[10px] text-slate-500">Global admin</span>
              </div>
            </div>
          </div>
        </header>

        <div className="flex flex-1">
          {/* Sidebar */}
          <aside className="hidden w-68 flex-shrink-0 border-r border-slate-200 bg-slate-950/5 px-3 py-5 text-xs font-medium text-slate-700 md:flex md:flex-col">
            <div className="px-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500">
              Navigation
            </div>
            <nav className="mt-3 space-y-1">
              {adminNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center justify-between rounded-md px-2.5 py-1.5 text-xs text-slate-700 hover:bg-white hover:text-slate-900"
                >
                  <span>{item.label}</span>
                  <span className="text-[10px] text-slate-400">›</span>
                </Link>
              ))}
            </nav>
          </aside>

          {/* Main content */}
          <main className="flex-1 px-4 py-5 sm:px-8 sm:py-6">
            <div className="mx-auto max-w-6xl">{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}

