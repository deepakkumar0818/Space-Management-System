export default function PricingRulesPage() {
  return (
    <section className="space-y-6">
      <header className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Monetisation
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
            Pricing rules & promotions
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Configure hourly, daily, weekly, and monthly rates with dynamic
            rules for weekends, holidays, and peak hours.
          </p>
        </div>
        <div className="flex gap-2 text-xs">
          <button className="rounded-md border border-slate-200 bg-white px-3 py-1.5 font-medium text-slate-700 shadow-sm hover:bg-slate-50">
            Manage discount codes
          </button>
          <button className="rounded-md bg-slate-900 px-3 py-1.5 font-medium text-white shadow-sm hover:bg-slate-800">
            Add pricing rule
          </button>
        </div>
      </header>

      <div className="rounded-2xl border border-slate-100 bg-white p-4 text-xs text-slate-700 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-900">Base plans</h2>
        <p className="mt-1 text-[11px] text-slate-500">
          Define default rates per plan. Specific locations/spaces can override.
        </p>
        <div className="mt-3 grid gap-3 md:grid-cols-4">
          <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              Hourly
            </p>
            <p className="mt-2 text-sm font-semibold text-slate-900">
              From AED 50 / hour
            </p>
            <p className="mt-1 text-[11px] text-slate-600">
              Ideal for quick meetings.
            </p>
          </div>
          <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              Daily
            </p>
            <p className="mt-2 text-sm font-semibold text-slate-900">
              From AED 150 / day
            </p>
            <p className="mt-1 text-[11px] text-slate-600">
              Best for freelancers and remote workers.
            </p>
          </div>
          <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              Weekly
            </p>
            <p className="mt-2 text-sm font-semibold text-slate-900">
              From AED 800 / week
            </p>
            <p className="mt-1 text-[11px] text-slate-600">
              Discounted bundles with weekly billing.
            </p>
          </div>
          <div className="rounded-lg border border-slate-100 bg-slate-50 p-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              Monthly
            </p>
            <p className="mt-2 text-sm font-semibold text-slate-900">
              From AED 2,500 / month
            </p>
            <p className="mt-1 text-[11px] text-slate-600">
              For dedicated teams and long-term users.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-4 text-xs text-slate-700 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-900">
          Dynamic rules & blackout periods
        </h2>
        <p className="mt-1 text-[11px] text-slate-500">
          Example configuration. Later, this will be backed by the pricing rule
          engine API.
        </p>
        <ul className="mt-3 grid gap-3 md:grid-cols-2">
          <li className="rounded-lg border border-slate-100 bg-slate-50 p-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              Weekend multiplier
            </p>
            <p className="mt-1 text-xs text-slate-700">
              1.2× pricing on Saturdays and Sundays after 10:00 for all meeting
              rooms.
            </p>
          </li>
          <li className="rounded-lg border border-slate-100 bg-slate-50 p-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              Peak hours
            </p>
            <p className="mt-1 text-xs text-slate-700">
              1.5× pricing 11:00–15:00 for hot desks in CBD locations.
            </p>
          </li>
          <li className="rounded-lg border border-slate-100 bg-slate-50 p-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              Holiday overrides
            </p>
            <p className="mt-1 text-xs text-slate-700">
              Predefined holiday calendar controlling higher or lower rates.
            </p>
          </li>
          <li className="rounded-lg border border-slate-100 bg-slate-50 p-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              Blackout periods
            </p>
            <p className="mt-1 text-xs text-slate-700">
              Close bookings during maintenance or private events at specific
              locations.
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
}


