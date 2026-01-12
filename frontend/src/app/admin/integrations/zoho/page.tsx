export default function ZohoIntegrationPage() {
  return (
    <section className="space-y-6">
      <header className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Integrations
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
            Zoho Accounts integration
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Connect Zoho to sync customers, invoices, and payments, so finance
            can rely on a single source of truth.
          </p>
        </div>
        <div className="flex gap-2 text-xs">
          <button className="rounded-md border border-slate-200 bg-white px-3 py-1.5 font-medium text-slate-700 shadow-sm hover:bg-slate-50">
            Test connection
          </button>
          <button className="rounded-md bg-slate-900 px-3 py-1.5 font-medium text-white shadow-sm hover:bg-slate-800">
            Save settings
          </button>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <div className="space-y-4 rounded-2xl border border-slate-100 bg-white p-4 text-xs text-slate-700 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900">
            Zoho credentials
          </h2>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="block text-[11px] font-medium text-slate-600">
                Organisation ID
              </label>
              <input className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-slate-400 focus:outline-none" />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-600">
                Client ID
              </label>
              <input className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-slate-400 focus:outline-none" />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-600">
                Client secret
              </label>
              <input
                type="password"
                className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-slate-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-600">
                Redirect URL
              </label>
              <input
                className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-slate-400 focus:outline-none"
                placeholder="https://your-domain.com/api/integrations/zoho/callback"
              />
            </div>
          </div>
        </div>

        <aside className="space-y-4 rounded-2xl border border-slate-100 bg-white p-4 text-xs text-slate-700 shadow-sm">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Sync options
            </h2>
            <ul className="mt-2 space-y-1.5 text-[11px]">
              <li>• Customers</li>
              <li>• Invoices</li>
              <li>• Payments / transactions</li>
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Status (demo)
            </h2>
            <p className="mt-1 text-[11px] text-slate-500">
              When connected, this will show last sync time and any errors
              returned by the Zoho API.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}


