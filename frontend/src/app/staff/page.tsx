export default function StaffOverviewPage() {
  return (
    <section className="space-y-6">
      <header>
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
          Today
        </p>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
          On-site overview
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          See upcoming arrivals, active bookings, and occupancy for the current
          day.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            Arrivals remaining
          </p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">9</p>
          <p className="mt-1 text-xs text-slate-500">
            Customers yet to check in today.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            Checked in
          </p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">18</p>
          <p className="mt-1 text-xs text-slate-500">Bookings currently live.</p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            Occupancy
          </p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">72%</p>
          <p className="mt-1 text-xs text-slate-500">
            Across desks and meeting rooms.
          </p>
        </div>
      </div>
    </section>
  );
}


