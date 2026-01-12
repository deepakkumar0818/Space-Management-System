export default function UsersRolesPage() {
  return (
    <section className="space-y-6">
      <header className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Access control
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
            Users, roles & staff logs
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Create users, assign roles, and review audit logs of important
            changes across the admin console.
          </p>
        </div>
        <div className="flex gap-2 text-xs">
          <button className="rounded-md border border-slate-200 bg-white px-3 py-1.5 font-medium text-slate-700 shadow-sm hover:bg-slate-50">
            Invite staff
          </button>
          <button className="rounded-md bg-slate-900 px-3 py-1.5 font-medium text-white shadow-sm hover:bg-slate-800">
            Add user
          </button>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 text-xs text-slate-600">
            <span className="font-medium">Directory</span>
            <input
              className="w-44 rounded-md border border-slate-200 px-2 py-1 text-xs focus:border-slate-400 focus:outline-none"
              placeholder="Search name or email"
            />
          </div>
          <table className="min-w-full text-left text-xs sm:text-sm">
            <thead className="border-b border-slate-100 bg-slate-50 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
              <tr>
                <th className="px-4 py-2">User</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-50 hover:bg-slate-50/50">
                <td className="px-4 py-2 align-middle text-slate-800">
                  Admin User
                  <p className="text-[11px] text-slate-500">
                    admin@workspace-demo.com
                  </p>
                </td>
                <td className="px-4 py-2 align-middle text-slate-700">
                  Global admin
                </td>
                <td className="px-4 py-2 align-middle">
                  <span className="inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                    Active
                  </span>
                </td>
              </tr>
              <tr className="border-b border-slate-50 hover:bg-slate-50/50">
                <td className="px-4 py-2 align-middle text-slate-800">
                  Front desk · Indiranagar
                  <p className="text-[11px] text-slate-500">
                    staff.indira@example.com
                  </p>
                </td>
                <td className="px-4 py-2 align-middle text-slate-700">
                  On-site staff
                </td>
                <td className="px-4 py-2 align-middle">
                  <span className="inline-flex rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700">
                    Active
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <aside className="rounded-2xl border border-slate-100 bg-white p-4 text-xs text-slate-700 shadow-sm">
          <h2 className="text-sm font-semibold text-slate-900">Activity log</h2>
          <p className="mt-1 text-[11px] text-slate-500">
            Example audit items. In a real system this would be backed by a
            staff log API.
          </p>
          <ul className="mt-3 space-y-2">
            <li>
              <p className="text-[11px] font-medium text-slate-800">
                10:12 · Admin User
              </p>
              <p className="text-[11px] text-slate-600">
                Updated pricing rules for BKC – Meeting rooms.
              </p>
            </li>
            <li>
              <p className="text-[11px] font-medium text-slate-800">
                09:47 · Front desk · Indiranagar
              </p>
              <p className="text-[11px] text-slate-600">
                Performed manual check-in for booking BK-2025-001.
              </p>
            </li>
          </ul>
        </aside>
      </div>
    </section>
  );
}


