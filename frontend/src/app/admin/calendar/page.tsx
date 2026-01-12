 "use client";

import { useEffect, useMemo, useState } from "react";

const hours = Array.from({ length: 12 }, (_, i) => 8 + i); // 8:00 - 20:00
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

interface CalendarBooking {
  startTime: string;
}

function formatHour12(hour24: number): string {
  if (hour24 === 0) return "12:00 AM";
  if (hour24 < 12) return `${hour24}:00 AM`;
  if (hour24 === 12) return "12:00 PM";
  return `${hour24 - 12}:00 PM`;
}

export default function CalendarHeatmapPage() {
  const [weekStart, setWeekStart] = useState<Date>(() => {
    const today = new Date();
    const day = today.getDay() || 7; // Sunday=0 -> 7
    const monday = new Date(today);
    monday.setDate(today.getDate() - (day - 1));
    monday.setHours(0, 0, 0, 0);
    return monday;
  });

  const [bookings, setBookings] = useState<CalendarBooking[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRange = async () => {
      const token =
        typeof window !== "undefined"
          ? window.localStorage.getItem("workspace_token")
          : null;
      if (!token) {
        setError("Login as an admin to view the heatmap.");
        return;
      }

      const start = new Date(weekStart);
      const end = new Date(weekStart);
      end.setDate(start.getDate() + 7);

      try {
        const response = await fetch(
          `http://localhost:4000/api/v1/bookings/range?start=${start.toISOString()}&end=${end.toISOString()}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            setError("You do not have permission to view the calendar.");
          }
          return;
        }
        const data = (await response.json()) as CalendarBooking[];
        setBookings(data);
        setError(null);
      } catch {
        setError("Unable to load data from server.");
      }
    };

    void fetchRange();
  }, [weekStart]);

  const occupancy = useMemo(() => {
    const grid: Record<string, number> = {};
    bookings.forEach((booking) => {
      const date = new Date(booking.startTime);
      const dayIndex = (date.getDay() + 6) % 7; // convert Sunday=0 to 6
      const hour = date.getHours();
      const key = `${dayIndex}-${hour}`;
      grid[key] = (grid[key] ?? 0) + 1;
    });
    return grid;
  }, [bookings]);

  const formattedWeekLabel = useMemo(() => {
    const end = new Date(weekStart);
    end.setDate(weekStart.getDate() + 6);
    return `${weekStart.toLocaleDateString()} – ${end.toLocaleDateString()}`;
  }, [weekStart]);

  const shiftWeek = (delta: number) => {
    setWeekStart((prev) => {
      const next = new Date(prev);
      next.setDate(prev.getDate() + delta * 7);
      return next;
    });
  };

  return (
    <section className="space-y-6">
      <header className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Utilisation
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
            Calendar & occupancy heatmap
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Visualise bookings across the week and hours of the day using live
            data from the booking engine.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-[11px] text-slate-500">{formattedWeekLabel}</span>
          <button
            className="rounded-md border border-slate-200 bg-white px-3 py-1.5 font-medium text-slate-700 shadow-sm hover:bg-slate-50"
            onClick={() => shiftWeek(-1)}
          >
            Previous
          </button>
          <button
            className="rounded-md border border-slate-200 bg-white px-3 py-1.5 font-medium text-slate-700 shadow-sm hover:bg-slate-50"
            onClick={() => shiftWeek(1)}
          >
            Next
          </button>
        </div>
      </header>

      <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        <h2 className="text-sm font-medium text-slate-900">
          Occupancy heatmap (live bookings)
        </h2>
        {error ? (
          <p className="mt-2 text-[11px] text-red-600">{error}</p>
        ) : null}
        <div className="mt-4 overflow-auto">
          <table className="border-collapse text-xs text-slate-600">
            <thead>
              <tr>
                <th className="p-2 text-left">Hour</th>
                {days.map((day) => (
                  <th key={day} className="px-2 py-1 text-center font-medium">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {hours.map((hour) => (
                <tr key={hour}>
                  <td className="px-2 py-1 font-medium text-slate-700">
                    {formatHour12(hour)}
                  </td>
                  {days.map((day, dayIndex) => {
                    const key = `${dayIndex}-${hour}`;
                    const count = occupancy[key] ?? 0;
                    let intensity = "";
                    if (count === 0) intensity = "bg-slate-50";
                    else if (count === 1) intensity = "bg-blue-100";
                    else if (count === 2) intensity = "bg-blue-200";
                    else intensity = "bg-blue-400";

                    return (
                      <td
                        key={`${day}-${hour}`}
                        className="h-8 w-10 border border-slate-100"
                      >
                        <div
                          className={`flex h-full w-full items-center justify-center rounded ${intensity}`}
                        >
                          {count > 0 ? count : ""}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

