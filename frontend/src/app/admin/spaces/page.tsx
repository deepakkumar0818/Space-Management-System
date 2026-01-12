interface AdminSpace {
  id: string;
  location: string;
  name: string;
  type: "desk" | "meeting_room" | "private_office" | "open_area";
  capacity: number;
  status: "active" | "inactive";
}

const mockSpaces: AdminSpace[] = [
  {
    id: "1",
    location: "Dubai - Business Bay",
    name: "Meeting Room 1",
    type: "meeting_room",
    capacity: 8,
    status: "active",
  },
  {
    id: "2",
    location: "Abu Dhabi - Al Maryah Island",
    name: "Hot Desk Zone A",
    type: "desk",
    capacity: 24,
    status: "active",
  },
  {
    id: "3",
    location: "Sharjah - Al Qasimia",
    name: "Private Office Suite 1",
    type: "private_office",
    capacity: 4,
    status: "active",
  },
];

export default function SpaceManagementPage() {
  return (
    <section className="space-y-6">
      <header className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Inventory
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
            Space management
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Configure locations, floors, rooms, desks, meeting rooms, and amenities.
          </p>
        </div>
        <div className="flex gap-2 text-xs">
          <button className="rounded-md border border-slate-200 bg-white px-3 py-1.5 font-medium text-slate-700 shadow-sm hover:bg-slate-50">
            Manage amenities
          </button>
          <button className="rounded-md bg-slate-900 px-3 py-1.5 font-medium text-white shadow-sm hover:bg-slate-800">
            Add location / space
          </button>
        </div>
      </header>

      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3 text-xs text-slate-600">
          <span className="font-medium">All spaces</span>
          <div className="flex gap-2">
            <input
              className="w-40 rounded-md border border-slate-200 px-2 py-1 text-xs focus:border-slate-400 focus:outline-none"
              placeholder="Search location or room"
            />
            <select className="rounded-md border border-slate-200 px-2 py-1 text-xs">
              <option>All types</option>
              <option>Desk</option>
              <option>Meeting rooms</option>
              <option>Private office</option>
            </select>
          </div>
        </div>
        <table className="min-w-full text-left text-xs sm:text-sm">
          <thead className="border-b border-slate-100 bg-slate-50 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            <tr>
              <th className="px-4 py-2">Location</th>
              <th className="px-4 py-2">Space</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Capacity</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockSpaces.map((space) => (
              <tr key={space.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                <td className="px-4 py-2 align-middle text-slate-800">
                  {space.location}
                </td>
                <td className="px-4 py-2 align-middle text-slate-800">
                  {space.name}
                </td>
                <td className="px-4 py-2 align-middle text-slate-700">
                  {space.type}
                </td>
                <td className="px-4 py-2 align-middle text-slate-700">
                  {space.capacity}
                </td>
                <td className="px-4 py-2 align-middle">
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ${
                      space.status === "active"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {space.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

