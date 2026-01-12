export default function StaffBookingsPage() {
  return (
    <section className="space-y-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
          Bookings
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
          Today&apos;s bookings
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          View all bookings for the day with quick access to status and seat
          information.
        </p>
      </header>

      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 text-xs text-slate-600">
          <span className="font-medium">Bookings for today</span>
          <input
            className="w-48 rounded-md border border-slate-200 px-2 py-1 text-xs focus:border-slate-400 focus:outline-none"
            placeholder="Search booking ID or customer"
          />
        </div>
        <table className="min-w-full text-left text-xs sm:text-sm">
          <thead className="border-b border-slate-100 bg-slate-50 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            <tr>
              <th className="px-4 py-2">Time</th>
              <th className="px-4 py-2">Booking</th>
              <th className="px-4 py-2">Customer</th>
              <th className="px-4 py-2">Space</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-50 hover:bg-slate-50/50">
              <td className="px-4 py-2 align-middle text-slate-700">
                10:00–12:00
              </td>
              <td className="px-4 py-2 align-middle text-slate-800">
                BK-2025-001
                <p className="text-[11px] text-slate-500">Hourly · 2 hrs</p>
              </td>
              <td className="px-4 py-2 align-middle text-slate-800">
                Priya Rao
              </td>
              <td className="px-4 py-2 align-middle text-slate-700">
                Meeting Room 2 · Indiranagar
              </td>
              <td className="px-4 py-2 align-middle">
                <span className="inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                  Checked in
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}


