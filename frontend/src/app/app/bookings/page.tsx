"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

export default function MyBookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<BookingDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setError(null);

      if (typeof window === "undefined") {
        setLoading(false);
        return;
      }

      const token = window.localStorage.getItem("workspace_token");
      
      if (!token) {
        setError("Please login to view your bookings");
        setLoading(false);
        setTimeout(() => {
          router.push("/auth/login?role=customer");
        }, 2000);
        return;
      }

      // Verify user is a customer
      const decoded = decodeJWT(token);
      if (!decoded) {
        setError("Invalid session. Please login again.");
        setLoading(false);
        window.localStorage.removeItem("workspace_token");
        window.localStorage.removeItem("workspace_user");
        setTimeout(() => {
          router.push("/auth/login?role=customer");
        }, 2000);
        return;
      }

      if (decoded.role !== "customer") {
        setError("This page is only for customers");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:4000/api/v1/bookings/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        
        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            setError("Session expired. Please login again.");
            window.localStorage.removeItem("workspace_token");
            window.localStorage.removeItem("workspace_user");
            setTimeout(() => {
              router.push("/auth/login?role=customer");
            }, 2000);
            return;
          }
          const errorData = await response.json().catch(() => ({ message: "Failed to fetch bookings" }));
          throw new Error(errorData.message || "Failed to fetch bookings");
        }
        
        const data = (await response.json()) as BookingDto[];
        setBookings(data || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setError(err instanceof Error ? err.message : "Unable to load your bookings. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    void fetchBookings();
  }, [router]);

  if (loading) {
    return (
      <main className="mx-auto max-w-4xl space-y-6 px-4 py-6 sm:px-0 sm:py-8">
        <p className="text-sm text-slate-600">Loading your bookings...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto max-w-4xl space-y-6 px-4 py-6 sm:px-0 sm:py-8">
        <p className="text-sm text-red-600">{error}</p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl space-y-6 px-4 py-6 sm:px-0 sm:py-8">
      <header className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          My bookings
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Upcoming &amp; past bookings
        </h1>
        <p className="text-xs text-slate-600">
          These are bookings created with your customer account.
        </p>
      </header>

      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white text-xs text-slate-700 shadow-sm">
        <table className="min-w-full text-left">
          <thead className="border-b border-slate-100 bg-slate-50 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            <tr>
              <th className="px-4 py-2">When</th>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Plan</th>
              <th className="px-4 py-2">Slot</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr
                key={booking._id}
                className="border-b border-slate-50 hover:bg-slate-50/60"
              >
                <td className="px-4 py-2 align-middle text-slate-800">
                  {new Date(booking.startTime).toLocaleString()}
                </td>
                <td className="px-4 py-2 align-middle">
                  {booking.metadata?.locationLabel ?? "-"}
                </td>
                <td className="px-4 py-2 align-middle">{booking.plan}</td>
                <td className="px-4 py-2 align-middle">
                  {booking.metadata?.slot ?? "-"}
                </td>
              </tr>
            ))}
            {bookings.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-4 py-4 text-center text-[11px] text-slate-500"
                >
                  No bookings yet. Go to the locations page to create your
                  first booking.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </main>
  );
}


