export default function ContentManagementPage() {
  return (
    <section className="space-y-6">
      <header className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Content
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
            Location content & amenities
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Control photos, amenities, and on-page rules so customers have clear
            expectations before they book.
          </p>
        </div>
        <div className="flex gap-2 text-xs">
          <button className="rounded-md border border-slate-200 bg-white px-3 py-1.5 font-medium text-slate-700 shadow-sm hover:bg-slate-50">
            Preview customer page
          </button>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <div className="space-y-4 rounded-2xl border border-slate-100 bg-white p-4 text-xs text-slate-700 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900">
            Location details
          </h2>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="block text-[11px] font-medium text-slate-600">
                Location name
              </label>
              <input
                className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-slate-400 focus:outline-none"
                defaultValue="Indiranagar Workspace"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-slate-600">
                City
              </label>
              <input
                className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-slate-400 focus:outline-none"
                defaultValue="Bangalore"
              />
            </div>
          </div>
          <div>
            <label className="block text-[11px] font-medium text-slate-600">
              Short description
            </label>
            <textarea
              rows={3}
              className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-slate-400 focus:outline-none"
              defaultValue="Bright, open workspace with dedicated meeting rooms, hot desks, and phone booths."
            />
          </div>
          <div>
            <label className="block text-[11px] font-medium text-slate-600">
              Rules & policies
            </label>
            <textarea
              rows={4}
              className="mt-1 w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs focus:border-slate-400 focus:outline-none"
              defaultValue="- Check-in up to 15 minutes before your slot.\n- Free cancellation up to 24 hours before.\n- Quiet zones enforced in library area."
            />
          </div>
        </div>

        <aside className="space-y-4 rounded-2xl border border-slate-100 bg-white p-4 text-xs text-slate-700 shadow-sm">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">Amenities</h2>
            <p className="mt-1 text-[11px] text-slate-500">
              Example chips. Later this would be driven by space/location
              metadata.
            </p>
            <div className="mt-2 flex flex-wrap gap-1.5 text-[11px]">
              <span className="rounded-full bg-slate-100 px-2 py-0.5">
                Wi-Fi
              </span>
              <span className="rounded-full bg-slate-100 px-2 py-0.5">
                Power outlets
              </span>
              <span className="rounded-full bg-slate-100 px-2 py-0.5">
                Meeting rooms
              </span>
              <span className="rounded-full bg-slate-100 px-2 py-0.5">
                Phone booths
              </span>
              <span className="rounded-full bg-slate-100 px-2 py-0.5">
                Coffee / tea
              </span>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-900">Photos</h2>
            <p className="mt-1 text-[11px] text-slate-500">
              Upload workspace photos to showcase seating, meeting rooms, and
              common areas.
            </p>
            <div className="mt-2 flex gap-2">
              <div className="h-16 w-24 rounded-lg bg-slate-100" />
              <div className="h-16 w-24 rounded-lg bg-slate-100" />
              <div className="flex h-16 w-24 items-center justify-center rounded-lg border border-dashed border-slate-200 text-[11px] text-slate-500">
                + Add
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}


