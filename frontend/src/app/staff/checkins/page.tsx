export default function StaffCheckinsPage() {
  return (
    <section className="space-y-6">
      <header className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Check-ins
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
            QR & manual check-in
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Scan QR codes from booking confirmations or search for a booking to
            check customers in and out.
          </p>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <div className="space-y-3 rounded-2xl border border-slate-100 bg-white p-4 text-xs text-slate-700 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900">
            Manual lookup
          </h2>
          <input
            className="mt-2 w-full rounded-md border border-slate-200 px-3 py-1.5 text-xs focus:border-slate-400 focus:outline-none"
            placeholder="Search by booking ID, customer email, or phone"
          />
          <div className="mt-3 rounded-lg border border-dashed border-slate-200 p-3 text-[11px] text-slate-500">
            QR scanner UI placeholder – integrate a QR scanning library here to
            read booking codes and mark check-ins automatically.
          </div>
        </div>

        <aside className="rounded-2xl border border-slate-100 bg-white p-4 text-xs text-slate-700 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900">
            Next arrivals
          </h2>
          <ul className="mt-2 space-y-2">
            <li>
              <p className="text-[11px] font-medium text-slate-800">
                10:30 · BK-2025-003
              </p>
              <p className="text-[11px] text-slate-600">
                Hot desk · Zone A · 1 guest
              </p>
            </li>
            <li>
              <p className="text-[11px] font-medium text-slate-800">
                11:00 · BK-2025-004
              </p>
              <p className="text-[11px] text-slate-600">
                Meeting room · Room 2 · 6 guests
              </p>
            </li>
          </ul>
        </aside>
      </div>
    </section>
  );
}


