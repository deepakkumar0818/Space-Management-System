export default function RefundRulesPage() {
  return (
    <section className="space-y-6">
      <header className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Policies
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
            Refund rules & automation
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Define how and when refunds are granted – full, partial, or
            conditional – and prepare for automated flows.
          </p>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-slate-100 bg-white p-4 text-xs text-slate-700 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900">
            Before start time
          </h2>
          <p className="mt-1 text-[11px] text-slate-500">
            Example rules for cancellations before a booking begins.
          </p>
          <ul className="mt-2 space-y-1.5 text-[11px]">
            <li>• &gt; 24 hours before: 100% refund</li>
            <li>• 4–24 hours before: 50% refund</li>
            <li>• &lt; 4 hours before: No refund</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-4 text-xs text-slate-700 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900">
            After start time
          </h2>
          <p className="mt-1 text-[11px] text-slate-500">
            Conditions once the customer has already checked in or the slot has
            started.
          </p>
          <ul className="mt-2 space-y-1.5 text-[11px]">
            <li>• No-show: No refund.</li>
            <li>• Early check-out: Partial refund where policy allows.</li>
            <li>• Service issue: Manual override by support.</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-4 text-xs text-slate-700 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900">
            Automation & cron jobs
          </h2>
          <p className="mt-1 text-[11px] text-slate-500">
            In the backend, cron jobs will evaluate bookings against these rules
            and trigger auto-refunds where applicable.
          </p>
        </div>
      </div>
    </section>
  );
}


