"use client";

import Link from "next/link";
import { useState } from "react";

export default function OfficeSpacePage() {
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
                Office Space.
                <span className="ml-2 inline-block h-2 w-2 rounded-full bg-red-600"></span>
              </h1>
              <p className="mt-6 text-base leading-relaxed text-slate-700">
                Why not rent an office for the day when you or your team need somewhere to focus? 
                Our day offices are private, flexible, and hassle-free, and include everything you 
                need to get straight down to work. Including business-grade WiFi and ergonomic furniture. 
                So whether you just want to try a serviced office for size, or need a short-term base 
                for a project, we&apos;ve got the answer. Of course, if you don&apos;t require an office 
                for the full day, we can help out with hourly office space rental options too.
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
            
            {/* Image */}
            <div className="mt-8 md:mt-0">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                alt="Team collaborating in office"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-center text-3xl font-bold text-slate-900 sm:text-4xl">
            Daily office space rental whenever you need it, by the hour, day, or longer, at 4,000+ locations worldwide. 
            You can even book and access on the same day.
          </h2>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            {/* Image Collage */}
            <div className="relative">
              <div className="relative z-10 aspect-[4/3] overflow-hidden rounded-lg shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop"
                  alt="Modern office workspace"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute left-4 top-4 z-20 aspect-square w-32 overflow-hidden rounded-lg shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=300&h=300&fit=crop"
                  alt="Office kitchen"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 z-0 aspect-square w-28 overflow-hidden rounded-lg shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=300&h=300&fit=crop"
                  alt="Meeting area"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Content */}
            <div>
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                Rent an office for the day without the commitment.
                <span className="ml-2 inline-block h-2 w-2 rounded-full bg-red-600"></span>
              </h2>
              <p className="mt-6 text-base text-slate-700">
                Day offices deliver all the advantages of a professional, supported office space, 
                but without needing to commit financially to a full-time office rental.
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
                  <p className="text-base text-slate-700">
                    Our fully equipped offices project a professional image
                  </p>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-slate-100">
                      <svg className="h-5 w-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-base text-slate-700">
                    Flexible space that helps you collaborate or work near clients
                  </p>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-slate-100">
                      <svg className="h-5 w-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-base text-slate-700">
                    Includes access to meeting rooms and other amenities
                  </p>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-slate-100">
                      <svg className="h-5 w-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-base text-slate-700">
                    Stay just an hour, the whole day or as long as you need
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

