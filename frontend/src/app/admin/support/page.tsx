export default function SupportActionsPage() {
  return (
    <section className="space-y-6">
      <header className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Support
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
            Manual actions & overrides
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Allow support and on-site teams to cancel, reschedule, extend
            bookings, or override check-in/out when needed.
          </p>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 text-xs text-slate-600">
            <span className="font-medium">Recent bookings</span>
            <input
              className="w-44 rounded-md border border-slate-200 px-2 py-1 text-xs focus:border-slate-400 focus:outline-none"
              placeholder="Search booking ID or email"
            />
          </div>
          <table className="min-w-full text-left text-xs sm:text-sm">
            <thead className="border-b border-slate-100 bg-slate-50 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
              <tr>
                <th className="px-4 py-2">Booking</th>
                <th className="px-4 py-2">Customer</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-50 hover:bg-slate-50/50">
                <td className="px-4 py-2 align-middle text-slate-800">
                  BK-2025-001
                  <p className="text-[11px] text-slate-500">
                    Today · 10:00–12:00 · Meeting room · Dubai
                  </p>
                </td>
                <td className="px-4 py-2 align-middle text-slate-800">
                  Ahmed Al Mansoori
                  <p className="text-[11px] text-slate-500">
                    ahmed@example.com
                  </p>
                </td>
                <td className="px-4 py-2 align-middle">
                  <span className="inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                    Confirmed
                  </span>
                </td>
                <td className="px-4 py-2 align-middle text-[11px]">
                  <div className="flex flex-wrap gap-1">
                    <button className="rounded-md border border-slate-200 px-2 py-1 hover:bg-slate-50">
                      Cancel
                    </button>
                    <button className="rounded-md border border-slate-200 px-2 py-1 hover:bg-slate-50">
                      Reschedule
                    </button>
                    <button className="rounded-md border border-slate-200 px-2 py-1 hover:bg-slate-50">
                      Extend
                    </button>
                    <button className="rounded-md border border-slate-200 px-2 py-1 hover:bg-slate-50">
                      Check-in
                    </button>
                    <button className="rounded-md border border-slate-200 px-2 py-1 hover:bg-slate-50">
                      Check-out
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside className="space-y-4 rounded-2xl border border-slate-100 bg-white p-4 text-xs text-slate-700 shadow-sm">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Guidelines
            </h2>
            <p className="mt-1 text-[11px] text-slate-500">
              Define how support agents should apply manual overrides so
              customers get a consistent experience.
            </p>
            <ul className="mt-2 space-y-1.5 text-[11px]">
              <li>• Cancel with full refund if within grace period.</li>
              <li>• Partial refunds after the booking has started.</li>
              <li>• No refunds after check-out is completed.</li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}


