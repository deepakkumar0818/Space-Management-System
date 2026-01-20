"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

interface WorkspaceLocation {
  id: string;
  name: string;
  area: string;
  city: string;
  hotDeskFrom: string;
  meetingRoomFrom: string;
  availabilitySummary: string;
  hotDeskPrice: number; // numeric for filtering
  meetingRoomPrice: number; // numeric for filtering
  type: "desk" | "meeting_room" | "both";
  capacity: number; // max capacity for meeting rooms
  status: "available" | "limited" | "peak" | "filling_fast";
}

const mockLocations: WorkspaceLocation[] = [
  // Dubai Locations
  {
    id: "dubai-marina",
    name: "Dubai Marina Business Center",
    area: "Dubai Marina",
    city: "Dubai",
    hotDeskFrom: "AED 250 / day",
    meetingRoomFrom: "AED 600 / hour",
    availabilitySummary: "Premium waterfront location · stunning views",
    hotDeskPrice: 250,
    meetingRoomPrice: 600,
    type: "both",
    capacity: 20,
    status: "available",
  },
  {
    id: "dubai-difc",
    name: "DIFC Financial District",
    area: "Dubai International Financial Centre",
    city: "Dubai",
    hotDeskFrom: "AED 350 / day",
    meetingRoomFrom: "AED 800 / hour",
    availabilitySummary: "Prime financial hub · executive suites",
    hotDeskPrice: 350,
    meetingRoomPrice: 800,
    type: "both",
    capacity: 25,
    status: "peak",
  },
  {
    id: "dubai-downtown",
    name: "Downtown Dubai Executive Suites",
    area: "Downtown Dubai",
    city: "Dubai",
    hotDeskFrom: "AED 320 / day",
    meetingRoomFrom: "AED 750 / hour",
    availabilitySummary: "Next to Burj Khalifa · premium business address",
    hotDeskPrice: 320,
    meetingRoomPrice: 750,
    type: "both",
    capacity: 22,
    status: "filling_fast",
  },
  {
    id: "dubai-media-city",
    name: "Dubai Media City Hub",
    area: "Dubai Media City",
    city: "Dubai",
    hotDeskFrom: "AED 240 / day",
    meetingRoomFrom: "AED 580 / hour",
    availabilitySummary: "Creative district · ideal for media professionals",
    hotDeskPrice: 240,
    meetingRoomPrice: 580,
    type: "both",
    capacity: 16,
    status: "available",
  },
  {
    id: "dubai-internet-city",
    name: "Dubai Internet City Tech Park",
    area: "Dubai Internet City",
    city: "Dubai",
    hotDeskFrom: "AED 260 / day",
    meetingRoomFrom: "AED 620 / hour",
    availabilitySummary: "Tech hub · high-speed connectivity",
    hotDeskPrice: 260,
    meetingRoomPrice: 620,
    type: "both",
    capacity: 18,
    status: "available",
  },
  {
    id: "dubai-silicon-oasis",
    name: "Dubai Silicon Oasis Innovation Center",
    area: "Dubai Silicon Oasis",
    city: "Dubai",
    hotDeskFrom: "AED 200 / day",
    meetingRoomFrom: "AED 500 / hour",
    availabilitySummary: "Tech startup friendly · affordable rates",
    hotDeskPrice: 200,
    meetingRoomPrice: 500,
    type: "both",
    capacity: 14,
    status: "available",
  },
  {
    id: "dubai-deira",
    name: "Deira Business District",
    area: "Deira",
    city: "Dubai",
    hotDeskFrom: "AED 180 / day",
    meetingRoomFrom: "AED 450 / hour",
    availabilitySummary: "Traditional business hub · great value",
    hotDeskPrice: 180,
    meetingRoomPrice: 450,
    type: "both",
    capacity: 12,
    status: "available",
  },
  {
    id: "dubai-barsha-heights",
    name: "Barsha Heights Corporate Center",
    area: "Barsha Heights",
    city: "Dubai",
    hotDeskFrom: "AED 230 / day",
    meetingRoomFrom: "AED 560 / hour",
    availabilitySummary: "Near Metro · convenient access",
    hotDeskPrice: 230,
    meetingRoomPrice: 560,
    type: "both",
    capacity: 15,
    status: "available",
  },
  {
    id: "dubai-business-bay",
    name: "Business Bay Tower",
    area: "Business Bay",
    city: "Dubai",
    hotDeskFrom: "AED 280 / day",
    meetingRoomFrom: "AED 650 / hour",
    availabilitySummary: "Modern skyscraper · central location",
    hotDeskPrice: 280,
    meetingRoomPrice: 650,
    type: "both",
    capacity: 18,
    status: "filling_fast",
  },
  {
    id: "dubai-jlt",
    name: "JLT Cluster Workspace",
    area: "Jumeirah Lakes Towers",
    city: "Dubai",
    hotDeskFrom: "AED 220 / day",
    meetingRoomFrom: "AED 550 / hour",
    availabilitySummary: "Lakeside location · great for startups",
    hotDeskPrice: 220,
    meetingRoomPrice: 550,
    type: "both",
    capacity: 15,
    status: "available",
  },
  {
    id: "abu-dhabi-corniche",
    name: "Corniche Executive Center",
    area: "Corniche Road",
    city: "Abu Dhabi",
    hotDeskFrom: "AED 300 / day",
    meetingRoomFrom: "AED 700 / hour",
    availabilitySummary: "Waterfront location · premium facilities",
    hotDeskPrice: 300,
    meetingRoomPrice: 700,
    type: "both",
    capacity: 22,
    status: "available",
  },
  {
    id: "abu-dhabi-al-maryah",
    name: "Al Maryah Island Business Hub",
    area: "Al Maryah Island",
    city: "Abu Dhabi",
    hotDeskFrom: "AED 320 / day",
    meetingRoomFrom: "AED 750 / hour",
    availabilitySummary: "Island location · luxury workspace",
    hotDeskPrice: 320,
    meetingRoomPrice: 750,
    type: "both",
    capacity: 20,
    status: "peak",
  },
  {
    id: "abu-dhabi-yas-island",
    name: "Yas Island Innovation Center",
    area: "Yas Island",
    city: "Abu Dhabi",
    hotDeskFrom: "AED 270 / day",
    meetingRoomFrom: "AED 620 / hour",
    availabilitySummary: "Entertainment district · modern facilities",
    hotDeskPrice: 270,
    meetingRoomPrice: 620,
    type: "both",
    capacity: 16,
    status: "available",
  },
  {
    id: "sharjah-al-qasimia",
    name: "Al Qasimia Business Park",
    area: "Al Qasimia",
    city: "Sharjah",
    hotDeskFrom: "AED 180 / day",
    meetingRoomFrom: "AED 450 / hour",
    availabilitySummary: "Affordable rates · family-friendly",
    hotDeskPrice: 180,
    meetingRoomPrice: 450,
    type: "both",
    capacity: 12,
    status: "available",
  },
  {
    id: "sharjah-al-khan",
    name: "Al Khan Workspace",
    area: "Al Khan",
    city: "Sharjah",
    hotDeskFrom: "AED 200 / day",
    meetingRoomFrom: "AED 500 / hour",
    availabilitySummary: "Coastal location · relaxed atmosphere",
    hotDeskPrice: 200,
    meetingRoomPrice: 500,
    type: "desk",
    capacity: 10,
    status: "available",
  },
];

export default function AppHomePage() {
  const router = useRouter();
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [spaceType, setSpaceType] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [minCapacity, setMinCapacity] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [maxPrice, setMaxPrice] = useState<string>("");

  const cities = useMemo(() => {
    const unique = Array.from(new Set(mockLocations.map((l) => l.city)));
    return unique.sort();
  }, []);

  const locations = useMemo(() => {
    const unique = Array.from(new Set(mockLocations.map((l) => l.name)));
    return unique.sort();
  }, []);

  const filteredLocations = useMemo(() => {
    let filtered = [...mockLocations];

    // Filter by city
    if (selectedCity) {
      filtered = filtered.filter((loc) => loc.city === selectedCity);
    }

    // Filter by location name
    if (selectedLocation) {
      filtered = filtered.filter((loc) => loc.name === selectedLocation);
    }

    // Filter by space type (hot desk vs meeting room)
    if (spaceType === "hotdesk") {
      filtered = filtered.filter((loc) => loc.hotDeskPrice > 0);
    } else if (spaceType === "meetingroom") {
      filtered = filtered.filter((loc) => loc.meetingRoomPrice > 0);
    }

    // Filter by type (desk, meeting_room, both)
    if (typeFilter !== "all") {
      filtered = filtered.filter((loc) => loc.type === typeFilter);
    }

    // Filter by minimum capacity
    if (minCapacity) {
      const min = parseInt(minCapacity, 10);
      filtered = filtered.filter((loc) => loc.capacity >= min);
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((loc) => loc.status === statusFilter);
    }

    // Filter by max price
    if (maxPrice) {
      const max = parseInt(maxPrice, 10);
      filtered = filtered.filter(
        (loc) =>
          (spaceType === "hotdesk" && loc.hotDeskPrice <= max) ||
          (spaceType === "meetingroom" && loc.meetingRoomPrice <= max) ||
          (spaceType === "all" &&
            (loc.hotDeskPrice <= max || loc.meetingRoomPrice <= max))
      );
    }

    return filtered;
  }, [
    selectedCity,
    selectedLocation,
    spaceType,
    typeFilter,
    minCapacity,
    statusFilter,
    maxPrice,
  ]);

  const handleBookClick = (locationId: string) => {
    if (typeof window !== "undefined") {
      const token = window.localStorage.getItem("workspace_token");
      if (!token) {
        router.push("/auth/login?role=customer");
        return;
      }
    }

    router.push(`/app/locations/${encodeURIComponent(locationId)}`);
  };

  return (
    <section className="space-y-6">
      <header className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Browse workspaces
          </p>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">
            Find a desk or meeting room
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Choose a location, select your date and plan, and then sign in to
            confirm your booking.
          </p>
        </div>
        <div className="flex gap-2 text-xs">
          <button
            type="button"
            suppressHydrationWarning
            className="rounded-md border border-slate-200 bg-white px-3 py-1.5 font-medium text-slate-700 shadow-sm hover:bg-slate-50"
          >
            Today
          </button>
          <button
            type="button"
            suppressHydrationWarning
            className="rounded-md border border-slate-200 bg-white px-3 py-1.5 font-medium text-slate-700 shadow-sm hover:bg-slate-50"
          >
            This week
          </button>
        </div>
      </header>

      {/* Filters */}
      <div className="rounded-2xl border-2 border-slate-300 bg-white p-4 shadow-md">
        <h2 className="text-sm font-semibold text-slate-900 mb-4">
          Filter locations
        </h2>
        <div className="grid gap-3 text-xs sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1.5">
              Location
            </label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              suppressHydrationWarning
              className="w-full rounded-md border-2 border-slate-400 bg-white px-3 py-2 text-xs font-medium text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 focus:outline-none"
            >
              <option value="">All locations</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1.5">
              Space
            </label>
            <select
              value={spaceType}
              onChange={(e) => setSpaceType(e.target.value)}
              suppressHydrationWarning
              className="w-full rounded-md border-2 border-slate-400 bg-white px-3 py-2 text-xs font-medium text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 focus:outline-none"
            >
              <option value="all">All spaces</option>
              <option value="hotdesk">Hot desks</option>
              <option value="meetingroom">Meeting rooms</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1.5">
              Type
            </label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              suppressHydrationWarning
              className="w-full rounded-md border-2 border-slate-400 bg-white px-3 py-2 text-xs font-medium text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 focus:outline-none"
            >
              <option value="all">All types</option>
              <option value="desk">Desk only</option>
              <option value="meeting_room">Meeting room only</option>
              <option value="both">Both</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1.5">
              Capacity (min)
            </label>
            <input
              type="number"
              value={minCapacity}
              onChange={(e) => setMinCapacity(e.target.value)}
              placeholder="Any"
              min="1"
              suppressHydrationWarning
              className="w-full rounded-md border-2 border-slate-400 bg-white px-3 py-2 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1.5">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              suppressHydrationWarning
              className="w-full rounded-md border-2 border-slate-400 bg-white px-3 py-2 text-xs font-medium text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 focus:outline-none"
            >
              <option value="all">All statuses</option>
              <option value="available">Available</option>
              <option value="limited">Limited</option>
              <option value="peak">Peak</option>
              <option value="filling_fast">Filling fast</option>
            </select>
          </div>
        </div>
        <div className="grid gap-3 text-xs sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-3">
          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1.5">
              City
            </label>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              suppressHydrationWarning
              className="w-full rounded-md border-2 border-slate-400 bg-white px-3 py-2 text-xs font-medium text-slate-900 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 focus:outline-none"
            >
              <option value="">All cities</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-800 mb-1.5">
              Max price (₹)
            </label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="No limit"
              min="0"
              suppressHydrationWarning
              className="w-full rounded-md border-2 border-slate-400 bg-white px-3 py-2 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 focus:outline-none"
            />
          </div>
        </div>
        {(selectedCity ||
          selectedLocation ||
          spaceType !== "all" ||
          typeFilter !== "all" ||
          minCapacity ||
          statusFilter !== "all" ||
          maxPrice) && (
          <button
            type="button"
            onClick={() => {
              setSelectedCity("");
              setSelectedLocation("");
              setSpaceType("all");
              setTypeFilter("all");
              setMinCapacity("");
              setStatusFilter("all");
              setMaxPrice("");
            }}
            className="mt-4 text-xs font-semibold text-blue-700 underline-offset-2 hover:text-blue-900 hover:underline"
          >
            Clear all filters
          </button>
        )}
        <p className="mt-3 text-xs font-medium text-slate-700">
          Showing <span className="font-semibold text-slate-900">{filteredLocations.length}</span> of{" "}
          <span className="font-semibold text-slate-900">{mockLocations.length}</span> locations
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)]">
        {/* Locations list */}
        <div className="space-y-3">
          {filteredLocations.length === 0 ? (
            <div className="rounded-2xl border border-slate-100 bg-white p-8 text-center text-sm text-slate-600">
              No locations match your filters. Try adjusting your search criteria.
            </div>
          ) : (
            filteredLocations.map((location) => (
            <div
              key={location.id}
              className="flex flex-col justify-between rounded-2xl border border-slate-100 bg-white p-4 text-sm shadow-sm sm:flex-row sm:items-center"
            >
              <div>
                <h2 className="text-sm font-semibold text-slate-900">
                  {location.name}
                </h2>
                <p className="mt-1 text-xs text-slate-500">
                  {location.area} · {location.city}
                </p>
                <p className="mt-2 text-xs text-slate-600">
                  {location.availabilitySummary}
                </p>
                <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-slate-700">
                  <span className="rounded-full bg-emerald-50 px-2 py-0.5">
                    Hot desks from {location.hotDeskFrom}
                  </span>
                  <span className="rounded-full bg-slate-50 px-2 py-0.5">
                    Meeting rooms from {location.meetingRoomFrom}
                  </span>
                  <span className="rounded-full bg-blue-50 px-2 py-0.5">
                    Type: {location.type === "both" ? "Both" : location.type === "desk" ? "Desk" : "Meeting Room"}
                  </span>
                  <span className="rounded-full bg-purple-50 px-2 py-0.5">
                    Capacity: {location.capacity} seats
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 ${
                      location.status === "available"
                        ? "bg-green-100 text-green-700"
                        : location.status === "limited"
                        ? "bg-yellow-100 text-yellow-700"
                        : location.status === "peak"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {location.status === "available"
                      ? "Available"
                      : location.status === "limited"
                      ? "Limited"
                      : location.status === "peak"
                      ? "Peak"
                      : "Filling Fast"}
                  </span>
                </div>
              </div>
              <div className="mt-3 flex flex-col items-start gap-2 text-xs sm:mt-0 sm:items-end">
                <button
                  type="button"
                  onClick={() => handleBookClick(location.id)}
                  suppressHydrationWarning
                  className="rounded-md bg-slate-900 px-3 py-1.5 font-medium text-white hover:bg-slate-800"
                >
                  Select date & plan
                </button>
                <p className="text-[11px] text-slate-500">
                  You&apos;ll be asked to login or sign up to confirm.
                </p>
              </div>
            </div>
            ))
          )}
        </div>

        {/* Sidebar summary */}
        <aside className="rounded-2xl border border-slate-100 bg-white p-4 text-xs text-slate-600 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-900">
            What happens next?
          </h3>
          <ol className="mt-2 space-y-1.5">
            <li>
              <span className="font-medium text-slate-900">1.</span> Pick a
              workspace and click <span className="font-medium">Select date &amp; plan</span>.
            </li>
            <li>
              <span className="font-medium text-slate-900">2.</span> Login or
              create a customer account.
            </li>
            <li>
              <span className="font-medium text-slate-900">3.</span> Choose your
              slot and complete payment.
            </li>
            <li>
              <span className="font-medium text-slate-900">4.</span> Receive
              confirmation with QR / PIN and arrival instructions.
            </li>
          </ol>

          <div className="mt-3 rounded-lg bg-slate-50 p-3">
            <p className="text-[11px] font-medium text-slate-800">
              Already a customer?
            </p>
            <p className="mt-1 text-[11px] text-slate-600">
              <Link
                href="/auth/login?role=customer"
                className="font-semibold text-slate-900 underline-offset-2 hover:underline"
              >
                Login
              </Link>{" "}
              to see your existing bookings and extend time or add meeting
              rooms.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}


