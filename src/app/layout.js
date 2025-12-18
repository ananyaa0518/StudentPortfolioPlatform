import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SkillSync",
  description: "Student portfolio platform to showcase skills, projects & journey",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-gray-800`}
        style={{
          fontFamily: "'Segoe UI', sans-serif",
          backgroundColor: "#faf5ff",
          backgroundImage:
            "radial-gradient(circle at 0% 0%, rgba(244, 114, 182, 0.12), transparent 55%), radial-gradient(circle at 100% 100%, rgba(251, 113, 133, 0.12), transparent 55%)",
        }}
      >
        <header className="sticky top-0 z-50 border-b border-rose-100 bg-white/85 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
            {/* Logo + small tagline */}
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="SkillSync Logo"
                height={72}
                width={160}
                className="h-14 w-auto object-contain sm:h-16"
                priority
              />
              <div className="hidden flex-col text-xs text-gray-500 sm:flex">
                <span className="font-medium text-gray-700">
                  Student portfolio platform
                </span>
                <span>Showcase your skills, projects & journey in one place.</span>
              </div>
            </div>

            <nav className="flex items-center gap-2 sm:gap-4 text-sm sm:text-base">
              <Link
                href="/"
                className="rounded-full px-3 py-1.5 font-medium text-rose-700 transition-colors hover:bg-rose-50"
              >
                Home
              </Link>
              <Link
                href="/explore"
                className="rounded-full px-3 py-1.5 font-medium text-rose-700 transition-colors hover:bg-rose-50"
              >
                Explore
              </Link>
              <Link
                href="/myprofile"
                className="rounded-full px-3 py-1.5 font-medium text-rose-700 transition-colors hover:bg-rose-50"
              >
                My profile
              </Link>

              {/* Primary CTA */}
              <Link
                href="/editprofile"
                className="hidden items-center justify-center rounded-full bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-all duration-150 hover:-translate-y-[1px] hover:bg-rose-700 hover:shadow-md sm:inline-flex"
              >
                Create portfolio
              </Link>
            </nav>
          </div>
        </header>

        <main className="px-4 py-8 sm:px-6 sm:py-12">
          <div className="mx-auto max-w-6xl">{children}</div>
        </main>

        <footer className="mt-6 border-t border-rose-100 bg-white/80">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-gray-500 sm:flex-row sm:text-sm">
            <p>
              &copy; {new Date().getFullYear()} <strong>SkillSync</strong> — All
              rights reserved.
            </p>
            <p className="text-[11px] sm:text-xs">
              Built for students to showcase their skills, projects & journeys.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
