"use client";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="relative min-h-[70vh] flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8 overflow-hidden">
      {/* Soft background accents */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
      >
        <div className="absolute -top-32 -left-24 h-72 w-72 rounded-full bg-rose-100 blur-3xl opacity-70" />
        <div className="absolute -bottom-32 -right-24 h-72 w-72 rounded-full bg-pink-100 blur-3xl opacity-70" />
      </div>

      <div className="relative z-10 max-w-4xl w-full">
        <div className="rounded-3xl bg-white/80 shadow-xl ring-1 ring-rose-100 px-6 py-10 sm:px-10 sm:py-12 backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-500 mb-4 text-center">
            Student Portfolio Platform
          </p>

          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-4">
              Unleash your potential.
              <span className="block text-rose-600">
                Showcase your journey.
              </span>
            </h1>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Create a professional portfolio that highlights your skills,
              projects, and experiences. Share it with recruiters, mentors, and
              peers — all in one place.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/editprofile"
              className="inline-flex items-center justify-center rounded-full bg-rose-600 px-6 sm:px-8 py-3 text-sm sm:text-base font-semibold text-white shadow-md hover:bg-rose-700 hover:shadow-lg transition-all duration-150"
            >
              Create your portfolio
            </Link>

            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 text-sm">
              <Link
                href="/myprofile"
                className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-4 py-2 font-medium text-gray-800 hover:border-rose-200 hover:text-rose-700 transition-colors"
              >
                View my portfolio
              </Link>
              <Link
                href="/explore"
                className="inline-flex items-center justify-center rounded-full border border-gray-200 bg-white px-4 py-2 font-medium text-gray-800 hover:border-rose-200 hover:text-rose-700 transition-colors"
              >
                Explore students
              </Link>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 text-xs sm:text-sm text-gray-500 sm:grid-cols-3">
            <div className="text-center sm:text-left">
              <p className="font-semibold text-gray-800">Showcase projects</p>
              <p>Highlight your best work with links and descriptions.</p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-gray-800">Track your growth</p>
              <p>Add experiences, skills, and achievements over time.</p>
            </div>
            <div className="text-center sm:text-right">
              <p className="font-semibold text-gray-800">Share easily</p>
              <p>Send your profile link to recruiters and peers.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}