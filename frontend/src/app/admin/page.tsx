export default function AdminOverviewPage() {
  return (
    <section className="space-y-6">
      <header className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Dashboard
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
            Admin overview
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Monitor occupancy, revenue, and booking activity across all locations.
          </p>
        </div>
        <div className="flex gap-2 text-xs">
          <button className="rounded-md border border-slate-200 bg-white px-3 py-1.5 font-medium text-slate-700 shadow-sm hover:bg-slate-50">
            Download MIS
          </button>
          <button className="rounded-md bg-slate-900 px-3 py-1.5 font-medium text-white shadow-sm hover:bg-slate-800">
            New report
          </button>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
            Today&apos;s occupancy
          </p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">68%</p>
          <p className="mt-1 text-xs text-emerald-600">+5% vs yesterday</p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
            MTD revenue
          </p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">AED 24,000</p>
          <p className="mt-1 text-xs text-slate-500">Across 3 UAE locations</p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
            Active locations
          </p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">3</p>
          <p className="mt-1 text-xs text-slate-500">Dubai, Abu Dhabi, Sharjah</p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
            Open support items
          </p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">3</p>
          <p className="mt-1 text-xs text-amber-600">Requires same-day attention</p>
        </div>
      </div>
    </section>
  );
}

