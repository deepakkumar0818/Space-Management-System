"use client";

import { useParams, useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";

type PlanType = "hourly" | "daily" | "weekly" | "monthly";

interface Slot {
  time: string; // 24-hour value used internally, e.g. "09:00"
  label: string; // 12-hour display label, e.g. "9:00 AM"
  available: boolean;
}

interface BookingFormState {
  date: string;
  plan: PlanType;
  selectedSlot?: Slot;
  submitting: boolean;
  confirmed: boolean;
}

export default function LocationBookingPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [form, setForm] = useState<BookingFormState>({
    date: "",
    plan: "hourly",
    selectedSlot: undefined,
    submitting: false,
    confirmed: false,
  });
  const [showUnavailableModal, setShowUnavailableModal] = useState(false);
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);

  const slots: Slot[] = useMemo(
    () => [
      { time: "09:00", label: "9:00 AM", available: true },
      { time: "10:00", label: "10:00 AM", available: true },
      { time: "11:00", label: "11:00 AM", available: false },
      { time: "12:00", label: "12:00 PM", available: true },
      { time: "13:00", label: "1:00 PM", available: true },
      { time: "14:00", label: "2:00 PM", available: false },
      { time: "15:00", label: "3:00 PM", available: true },
      { time: "16:00", label: "4:00 PM", available: true },
      { time: "17:00", label: "5:00 PM", available: true },
    ],
    []
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.date || !form.selectedSlot) return;

    const selectedSlot = form.selectedSlot; // Store for type safety
    setForm((prev) => ({ ...prev, submitting: true }));

    // Call backend booking API so admin and customer views see this booking.
    try {
      const token =
        typeof window !== "undefined"
          ? window.localStorage.getItem("workspace_token")
          : null;

      if (!token) {
        router.push("/auth/login?role=customer");
        return;
      }

      const startTimeIso = `${form.date}T${selectedSlot.time}:00.000Z`;
      const endTimeIso = startTimeIso; // demo: treat as single-slot booking

      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          plan: form.plan,
          startTime: startTimeIso,
          endTime: endTimeIso,
          amount: 0,
          currency: "INR",
          metadata: {
            locationLabel,
            slot: selectedSlot.label,
          },
        }),
      });
    } catch {
      // fail silently in demo – UI still shows confirmation
    }

    setBookedTimes((prev) => [...prev, selectedSlot.time]);

    setForm((prev) => ({
      ...prev,
      submitting: false,
      confirmed: true,
    }));
  };

  const locationLabel = decodeURIComponent(params.id);

  return (
    <main className="mx-auto max-w-4xl space-y-6 px-4 py-6 sm:px-0 sm:py-8">
      <button
        type="button"
        onClick={() => router.back()}
        className="text-xs font-medium text-slate-600 underline-offset-2 hover:underline"
      >
        ← Back to locations
      </button>

      <header className="space-y-1">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Booking details
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Select date &amp; time from availability
        </h1>
        <p className="text-xs text-slate-600">
          You&apos;re booking for:{" "}
          <span className="font-medium text-slate-900">{locationLabel}</span>
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="grid gap-4 rounded-2xl border border-slate-100 bg-white p-4 text-sm text-slate-800 shadow-sm md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]"
      >
        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-medium text-slate-600">
                Date
              </label>
              <input
                type="date"
                required
                value={form.date}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    date: event.target.value,
                    confirmed: false,
                  }))
                }
                className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-xs focus:border-slate-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600">
                Plan
              </label>
              <select
                value={form.plan}
                onChange={(event) =>
                  setForm((prev) => ({
                    ...prev,
                    plan: event.target.value as PlanType,
                    confirmed: false,
                  }))
                }
                className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-xs focus:border-slate-400 focus:outline-none"
              >
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600">
              Time slots (live availability - demo)
            </label>
            <p className="mt-1 text-[11px] text-slate-500">
              Green = available, grey = unavailable. Click a slot to continue.
            </p>
            <div className="mt-2 grid grid-cols-3 gap-2 text-xs sm:grid-cols-4">
              {slots.map((slot) => {
                const isSelected =
                  form.selectedSlot && form.selectedSlot.time === slot.time;
                const isAvailable =
                  slot.available && !bookedTimes.includes(slot.time);
                const baseClasses =
                  "flex items-center justify-center rounded-md border px-2 py-1.5";

                if (!isAvailable) {
                  return (
                    <button
                      key={slot.time}
                      type="button"
                      onClick={() => setShowUnavailableModal(true)}
                      className={`${baseClasses} border-slate-200 bg-slate-50 text-slate-400 hover:bg-slate-100`}
                    >
                      {slot.label}
                    </button>
                  );
                }

                return (
                  <button
                    key={slot.time}
                    type="button"
                    onClick={() =>
                      setForm((prev) => ({
                        ...prev,
                        selectedSlot: slot,
                        confirmed: false,
                      }))
                    }
                    className={`${baseClasses} ${
                      isSelected
                        ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                        : "border-emerald-200 bg-emerald-50/40 text-emerald-700 hover:border-emerald-400"
                    }`}
                  >
                    {slot.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <aside className="space-y-3 rounded-xl bg-slate-50 p-3 text-xs text-slate-600">
          <p className="font-medium text-slate-800">Booking summary (demo)</p>
          <ul className="space-y-1.5">
            <li>
              <span className="font-medium text-slate-900">Date:</span>{" "}
              {form.date || "Select a date"}
            </li>
            <li>
              <span className="font-medium text-slate-900">Plan:</span>{" "}
              {form.plan}
            </li>
            <li>
              <span className="font-medium text-slate-900">Time slot:</span>{" "}
              {form.selectedSlot ? form.selectedSlot.label : "Select a slot"}
            </li>
          </ul>
          <p className="mt-2 text-[11px] text-slate-500">
            In a full build, we would show calculated pricing here based on
            your plan, location, and dynamic pricing rules.
          </p>

          <button
            type="submit"
            disabled={form.submitting || !form.date || !form.selectedSlot}
            className="mt-2 inline-flex w-full items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-xs font-medium text-white shadow-sm hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {form.submitting ? "Confirming..." : "Confirm & pay (demo)"}
          </button>

          {form.confirmed ? (
            <div className="mt-3 rounded-lg bg-emerald-50 p-3 text-[11px] text-emerald-800">
              <p className="font-medium">Booking confirmed (demo)</p>
              <p className="mt-1">
                In a production system this is where you&apos;d show the payment
                result and display the QR / PIN access instructions for the
                booking.
              </p>
            </div>
          ) : null}
        </aside>
      </form>

      {showUnavailableModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
          <div className="max-w-sm rounded-2xl bg-white p-5 text-xs text-slate-700 shadow-lg">
            <p className="text-sm font-semibold text-slate-900">
              This time slot is already booked
            </p>
            <p className="mt-2">
              Please choose another available time from the grid. Grey slots
              indicate periods that are no longer bookable.
            </p>
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setShowUnavailableModal(false)}
                className="rounded-md bg-slate-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-800"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}

