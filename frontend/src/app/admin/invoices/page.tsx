export default function InvoicesTaxPage() {
  return (
    <section className="space-y-6">
      <header className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Finance
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
            Invoices & tax reports
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            View auto-generated VAT invoices, download PDFs, and export tax
            summaries for your accounting team.
          </p>
        </div>
        <div className="flex gap-2 text-xs">
          <button className="rounded-md border border-slate-200 bg-white px-3 py-1.5 font-medium text-slate-700 shadow-sm hover:bg-slate-50">
            Export tax summary
          </button>
          <button className="rounded-md bg-slate-900 px-3 py-1.5 font-medium text-white shadow-sm hover:bg-slate-800">
            Generate invoice batch
          </button>
        </div>
      </header>

      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 text-xs text-slate-600">
          <div className="flex gap-2">
            <input
              type="month"
              className="rounded-md border border-slate-200 px-2 py-1"
            />
            <select className="rounded-md border border-slate-200 px-2 py-1">
              <option>All statuses</option>
              <option>Draft</option>
              <option>Issued</option>
              <option>Paid</option>
              <option>Cancelled</option>
            </select>
          </div>
          <input
            className="w-44 rounded-md border border-slate-200 px-2 py-1 text-xs focus:border-slate-400 focus:outline-none"
            placeholder="Search invoice no. or email"
          />
        </div>
        <table className="min-w-full text-left text-xs sm:text-sm">
          <thead className="border-b border-slate-100 bg-slate-50 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            <tr>
              <th className="px-4 py-2">Invoice</th>
              <th className="px-4 py-2">Customer</th>
              <th className="px-4 py-2">Booking</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">VAT</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">PDF</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-50 hover:bg-slate-50/50">
              <td className="px-4 py-2 align-middle text-slate-800">
                INV-2025-001
                <p className="text-[11px] text-slate-500">Issued 02 Jan 2025</p>
              </td>
              <td className="px-4 py-2 align-middle text-slate-800">
                Ahmed Al Mansoori
                <p className="text-[11px] text-slate-500">TRN: 100012345600003</p>
              </td>
              <td className="px-4 py-2 align-middle text-slate-700">
                BK-2025-001 · Meeting room · 2 hrs · Dubai
              </td>
              <td className="px-4 py-2 align-middle text-slate-800">
                AED 100
                <p className="text-[11px] text-slate-500">Inclusive of tax</p>
              </td>
              <td className="px-4 py-2 align-middle text-slate-800">
                AED 5
                <p className="text-[11px] text-slate-500">5% VAT</p>
              </td>
              <td className="px-4 py-2 align-middle">
                <span className="inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                  Paid
                </span>
              </td>
              <td className="px-4 py-2 align-middle text-[11px] text-slate-700">
                <button className="rounded-md border border-slate-200 px-2 py-1 hover:bg-slate-50">
                  Download PDF
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}


