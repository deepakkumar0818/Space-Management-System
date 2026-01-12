interface ReportFilterState {
  fromDate: string;
  toDate: string;
  locationId: string;
  roomType: string;
  paymentStatus: string;
}

const initialFilters: ReportFilterState = {
  fromDate: "",
  toDate: "",
  locationId: "",
  roomType: "",
  paymentStatus: "",
};

export default function ReportsPage() {
  // For now, filters are static UI only; wire to API later.
  const filters: ReportFilterState = initialFilters;

  return (
    <section className="space-y-6">
      <header className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Analytics
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
            Reports & MIS
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Generate occupancy, revenue, and booking reports with exportable CSV / PDF.
          </p>
        </div>
        <div className="flex gap-2 text-xs">
          <button className="rounded-md border border-slate-200 bg-white px-3 py-1.5 font-medium text-slate-700 shadow-sm hover:bg-slate-50">
            Save view
          </button>
          <button className="rounded-md bg-slate-900 px-3 py-1.5 font-medium text-white shadow-sm hover:bg-slate-800">
            Schedule email report
          </button>
        </div>
      </header>

      <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        <h2 className="text-sm font-medium text-slate-900">Filters</h2>
        <div className="mt-3 grid gap-4 text-sm md:grid-cols-4">
          <div>
            <label className="block text-xs font-medium text-slate-500">
              From
            </label>
            <input
              type="date"
              value={filters.fromDate}
              className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-sm"
              readOnly
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500">
              To
            </label>
            <input
              type="date"
              value={filters.toDate}
              className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-sm"
              readOnly
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500">
              Location
            </label>
            <select
              className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-sm"
              defaultValue={filters.locationId}
            >
              <option value="">All Locations</option>
              <option value="dubai">Dubai - Business Bay</option>
              <option value="abu-dhabi">Abu Dhabi - Al Maryah Island</option>
              <option value="sharjah">Sharjah - Al Qasimia</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500">
              Payment status
            </label>
            <select
              className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-sm"
              defaultValue={filters.paymentStatus}
            >
              <option value="">All</option>
              <option value="paid">Paid</option>
              <option value="unpaid">Unpaid</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <button className="rounded-md bg-slate-900 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-slate-800">
            Run report
          </button>
          <button className="rounded-md border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50">
            Export CSV
          </button>
          <button className="rounded-md border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50">
            Export PDF
          </button>
        </div>
      </div>
    </section>
  );
}


