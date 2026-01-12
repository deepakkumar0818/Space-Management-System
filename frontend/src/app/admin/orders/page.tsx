 "use client";

import { useEffect, useState } from "react";

interface BookingDto {
  _id: string;
  plan: "hourly" | "daily" | "weekly" | "monthly";
  startTime: string;
  amount: number;
  currency: string;
  metadata?: {
    locationLabel?: string;
    slot?: string;
  };
  user?: {
    email: string;
  };
}

// Map old locations to UAE locations
const locationMap: Record<string, string> = {
  "indiranagar": "Dubai - Business Bay",
  "bangalore": "Dubai - Business Bay",
  "mumbai": "Abu Dhabi - Al Maryah Island",
  "chandigarh": "Sharjah - Al Qasimia",
  "mohali": "Sharjah - Al Qasimia",
};

const formatLocation = (locationLabel?: string): string => {
  if (!locationLabel || locationLabel === "-") return "-";
  
  // Check if it's already a UAE location
  if (locationLabel.toLowerCase().includes("dubai") || 
      locationLabel.toLowerCase().includes("abu dhabi") || 
      locationLabel.toLowerCase().includes("sharjah")) {
    return locationLabel;
  }
  
  // Map old locations to UAE
  const lowerLabel = locationLabel.toLowerCase();
  for (const [old, uae] of Object.entries(locationMap)) {
    if (lowerLabel.includes(old)) {
      return uae;
    }
  }
  
  // Default to Dubai if unknown
  return "Dubai - Business Bay";
};

export default function OrdersPaymentsPage() {
  const [bookings, setBookings] = useState<BookingDto[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      const token =
        typeof window !== "undefined"
          ? window.localStorage.getItem("workspace_token")
          : null;
      if (!token) {
        setError("Please login as an admin user to view orders.");
        return;
      }

      try {
        const response = await fetch("http://localhost:4000/api/v1/bookings", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            setError("You do not have permission to view orders. Login as an admin.");
          }
          return;
        }
        const data = (await response.json()) as BookingDto[];
        setBookings(data);
        setError(null);
      } catch {
        setError("Unable to load orders from the server.");
      }
    };

    void fetchBookings();
  }, []);

  return (
    <section className="space-y-6">
      <header className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Commerce
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
            Orders, payments & refunds
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Review bookings, payment status, and refund flows, including failed
            or pending transactions.
          </p>
        </div>
        <div className="flex gap-2 text-xs">
          <button className="rounded-md border border-slate-200 bg-white px-3 py-1.5 font-medium text-slate-700 shadow-sm hover:bg-slate-50">
            Export payments
          </button>
          <button className="rounded-md bg-slate-900 px-3 py-1.5 font-medium text-white shadow-sm hover:bg-slate-800">
            Create manual refund
          </button>
        </div>
      </header>

      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 text-xs text-slate-600">
          <div className="flex gap-2">
            <select className="rounded-md border border-slate-200 px-2 py-1">
              <option>All payment statuses</option>
              <option>Paid</option>
              <option>Unpaid</option>
              <option>Pending</option>
              <option>Failed</option>
              <option>Refunded</option>
            </select>
            <select className="rounded-md border border-slate-200 px-2 py-1">
              <option>All booking statuses</option>
              <option>Confirmed</option>
              <option>Cancelled</option>
              <option>Completed</option>
            </select>
          </div>
          <input
            className="w-48 rounded-md border border-slate-200 px-2 py-1 text-xs focus:border-slate-400 focus:outline-none"
            placeholder="Search by booking ID or email"
          />
        </div>
        <table className="min-w-full text-left text-xs sm:text-sm">
          <thead className="border-b border-slate-100 bg-slate-50 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            <tr>
              <th className="px-4 py-2">Booking</th>
              <th className="px-4 py-2">Customer</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Plan</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Slot</th>
            </tr>
          </thead>
          <tbody>
            {error ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-4 text-center text-[11px] text-red-600"
                >
                  {error}
                </td>
              </tr>
            ) : null}
            {bookings.map((booking) => (
              <tr
                key={booking._id}
                className="border-b border-slate-50 hover:bg-slate-50/50"
              >
                <td className="px-4 py-2 align-middle text-slate-800">
                  {booking._id}
                  <p className="text-[11px] text-slate-500">
                    {new Date(booking.startTime).toLocaleString()}
                  </p>
                </td>
                <td className="px-4 py-2 align-middle text-slate-800">
                  {booking.user?.email ?? "Unknown"}
                </td>
                <td className="px-4 py-2 align-middle text-slate-700">
                  {formatLocation(booking.metadata?.locationLabel)}
                </td>
                <td className="px-4 py-2 align-middle text-slate-700">
                  {booking.plan}
                </td>
                <td className="px-4 py-2 align-middle text-slate-800 font-medium">
                  AED {booking.amount?.toFixed(2) ?? "0.00"}
                </td>
                <td className="px-4 py-2 align-middle text-slate-700">
                  {booking.metadata?.slot ?? "-"}
                </td>
              </tr>
            ))}
            {!error && bookings.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-4 py-4 text-center text-[11px] text-slate-500"
                >
                  No bookings found. Once customers confirm bookings, they will
                  appear here.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </section>
  );
}


