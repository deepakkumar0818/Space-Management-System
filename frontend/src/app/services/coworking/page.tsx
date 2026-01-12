"use client";

import Link from "next/link";
import { useState } from "react";

export default function CoworkingPage() {
  const [selectedDate, setSelectedDate] = useState("Today");
  const [selectedPeople, setSelectedPeople] = useState("People");
  const [searchLocation, setSearchLocation] = useState("");

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 to-slate-100 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">
                Coworking Spaces.
                <span className="ml-2 inline-block h-2 w-2 rounded-full bg-red-600"></span>
              </h1>
              <p className="mt-6 text-base leading-relaxed text-slate-700">
                Work alongside innovators, entrepreneurs, and creators in our vibrant coworking spaces. 
                Whether you&apos;re a freelancer, startup, or remote worker, our flexible coworking 
                memberships give you access to professional workspaces, high-speed WiFi, meeting rooms, 
                and a community of like-minded professionals. Choose from hot desks, dedicated desks, 
                or private coworking areas.
              </p>
              
              {/* Search Form */}
              <div className="mt-8 grid gap-3 sm:grid-cols-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">Date</label>
                  <div className="flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2">
                    <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <input
                      type="text"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="flex-1 border-0 bg-transparent text-sm text-slate-900 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-600">People</label>
                  <div className="flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2">
                    <input
                      type="text"
                      value={selectedPeople}
                      onChange={(e) => setSelectedPeople(e.target.value)}
                      className="flex-1 border-0 bg-transparent text-sm text-slate-900 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-xs font-medium text-slate-600">Location</label>
                  <div className="flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2">
                    <svg className="h-4 w-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search for a location"
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      className="flex-1 border-0 bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
              <Link
                href="/app"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-md bg-red-600 px-6 py-3 text-sm font-semibold text-white hover:bg-red-700 sm:w-auto"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search
              </Link>
            </div>
            
            <div className="mt-8 md:mt-0">
              <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop"
                alt="Modern coworking space"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-center text-3xl font-bold text-slate-900 sm:text-4xl">
            Flexible coworking memberships at 4,000+ locations. Access workspaces by the hour, day, week, or month.
          </h2>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div className="relative">
              <div className="relative z-10 aspect-[4/3] overflow-hidden rounded-lg shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop"
                  alt="Coworking space"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                Work in a community that inspires.
                <span className="ml-2 inline-block h-2 w-2 rounded-full bg-red-600"></span>
              </h2>
              <p className="mt-6 text-base text-slate-700">
                Our coworking spaces are designed to foster collaboration, creativity, and productivity. 
                Join a community of professionals and grow your network while you work.
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
                  <p className="text-base text-slate-700">Hot desks and dedicated desks available</p>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-slate-100">
                      <svg className="h-5 w-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-base text-slate-700">High-speed WiFi and business amenities</p>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-slate-100">
                      <svg className="h-5 w-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-base text-slate-700">Access to meeting rooms and event spaces</p>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-slate-100">
                      <svg className="h-5 w-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-base text-slate-700">Networking events and community support</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

