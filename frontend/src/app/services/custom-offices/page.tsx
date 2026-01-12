"use client";

import Link from "next/link";
import { useState } from "react";

export default function CustomOfficesPage() {
  const [selectedDate, setSelectedDate] = useState("Today");
  const [selectedPeople, setSelectedPeople] = useState("People");
  const [searchLocation, setSearchLocation] = useState("");

  return (
    <main className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-slate-50 to-slate-100 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">
                Custom Offices.
                <span className="ml-2 inline-block h-2 w-2 rounded-full bg-red-600"></span>
              </h1>
              <p className="mt-6 text-base leading-relaxed text-slate-700">
                Design your perfect workspace with our custom office solutions. Whether you need a 
                fully branded office space, specialized facilities, or a completely tailored workspace 
                design, we work with you to create an office that perfectly matches your business needs. 
                From initial design to final setup, we handle everything.
              </p>
              
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
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop"
                alt="Custom office design"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-center text-3xl font-bold text-slate-900 sm:text-4xl">
            Fully customized office solutions designed for your business. From concept to completion, we make it happen.
          </h2>
        </div>
      </section>

      <section className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&h=600&fit=crop"
                alt="Custom office"
                className="rounded-lg shadow-lg"
              />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                Your vision, our expertise.
                <span className="ml-2 inline-block h-2 w-2 rounded-full bg-red-600"></span>
              </h2>
              <p className="mt-6 text-base text-slate-700">
                Work with our design team to create a workspace that perfectly reflects your brand 
                and supports your team&apos;s unique needs.
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
                  <p className="text-base text-slate-700">Custom design and branding</p>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-slate-100">
                      <svg className="h-5 w-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-base text-slate-700">Specialized facilities and equipment</p>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-slate-100">
                      <svg className="h-5 w-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-base text-slate-700">End-to-end project management</p>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded bg-slate-100">
                      <svg className="h-5 w-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-base text-slate-700">Ongoing support and maintenance</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

