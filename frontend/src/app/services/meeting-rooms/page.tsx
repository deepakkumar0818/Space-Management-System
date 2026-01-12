"use client";

import Link from "next/link";
import { useState } from "react";

const UAE_LOCATIONS = [
  { id: "dubai", name: "Dubai - Business Bay", address: "Business Bay, Dubai, UAE" },
  { id: "abu-dhabi", name: "Abu Dhabi - Al Maryah Island", address: "Al Maryah Island, Abu Dhabi, UAE" },
  { id: "sharjah", name: "Sharjah - Al Qasimia", address: "Al Qasimia, Sharjah, UAE" },
];

export default function MeetingRoomsPage() {
  const [selectedDate, setSelectedDate] = useState("Today");
  const [selectedPeople, setSelectedPeople] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    if (selectedPeople && selectedLocation) {
      setShowResults(true);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-slate-50 to-slate-100 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">
                Meeting Rooms.
                <span className="ml-2 inline-block h-2 w-2 rounded-full bg-red-600"></span>
              </h1>
              <p className="mt-6 text-base leading-relaxed text-slate-700">
                Book professional meeting rooms by the hour or day at 4,000+ locations worldwide. 
                Whether you need a small space for client meetings, a boardroom for presentations, 
                or a training room for workshops, we have the perfect space. All rooms include 
                AV equipment, high-speed WiFi, and refreshments.
              </p>
              
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">People</label>
                  <select
                    value={selectedPeople}
                    onChange={(e) => setSelectedPeople(e.target.value)}
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-slate-400 focus:outline-none"
                  >
                    <option value="">Select people</option>
                    <option value="1-2">1-2 people</option>
                    <option value="3-5">3-5 people</option>
                    <option value="6-10">6-10 people</option>
                    <option value="11-20">11-20 people</option>
                    <option value="21-50">21-50 people</option>
                    <option value="50+">50+ people</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">Location</label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-slate-400 focus:outline-none"
                  >
                    <option value="">Select location</option>
                    {UAE_LOCATIONS.map((location) => (
                      <option key={location.id} value={location.id}>
                        {location.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={handleSearch}
                    disabled={!selectedPeople || !selectedLocation}
                    className="w-full flex items-center justify-center gap-2 rounded-md bg-red-600 px-6 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:bg-slate-300 disabled:cursor-not-allowed sm:w-auto"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Search
                  </button>
                </div>
              </div>
            </div>
            
            <div className="mt-8 md:mt-0">
              <img
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop"
                alt="Professional meeting room"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Search Results */}
      {showResults && selectedLocation && (
        <section className="bg-white py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <h2 className="mb-6 text-2xl font-bold text-slate-900">
              Available Meeting Rooms in {UAE_LOCATIONS.find(loc => loc.id === selectedLocation)?.name}
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {UAE_LOCATIONS.filter(loc => loc.id === selectedLocation).map((location) => (
                <div key={location.id} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-slate-900">{location.name}</h3>
                    <p className="mt-1 text-sm text-slate-600">{location.address}</p>
                  </div>
                  <div className="mb-4 space-y-2 text-sm text-slate-700">
                    <div className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span>Capacity: {selectedPeople} people</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Available: {selectedDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <span>AV Equipment, WiFi, Refreshments</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <p className="text-lg font-semibold text-slate-900">From AED 50/hour</p>
                      <p className="text-xs text-slate-500">or AED 150/day</p>
                    </div>
                    <Link
                      href={`/app?location=${location.id}&people=${selectedPeople}&date=${selectedDate}`}
                      className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-center text-3xl font-bold text-slate-900 sm:text-4xl">
            Book meeting rooms by the hour at UAE locations. Perfect for client meetings, presentations, and team collaboration.
          </h2>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop"
                alt="Meeting room"
                className="rounded-lg shadow-lg"
              />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                Professional spaces for every meeting.
                <span className="ml-2 inline-block h-2 w-2 rounded-full bg-red-600"></span>
              </h2>
              <p className="mt-6 text-base text-slate-700">
                From intimate client meetings to large presentations, our meeting rooms are equipped 
                with everything you need for a successful meeting.
              </p>
              
              <ul className="mt-8 space-y-4">
                <li className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-slate-100">
                      <svg className="h-5 w-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-base text-slate-700">AV equipment and video conferencing</p>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-slate-100">
                      <svg className="h-5 w-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-base text-slate-700">High-speed WiFi and presentation screens</p>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-slate-100">
                      <svg className="h-5 w-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-base text-slate-700">Refreshments and catering options</p>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-slate-100">
                      <svg className="h-5 w-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-base text-slate-700">Flexible booking by the hour or day</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

