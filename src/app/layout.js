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
  description: "Connect with developers & explore cool projects",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-gray-800`}
        style={{
          fontFamily: "'Segoe UI', sans-serif",
          backgroundColor: "#ffffff",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='35' viewBox='0 0 40 35'%3E%3Cg fill='%23fff5f8' fill-opacity='0.6'%3E%3Cpath d='M10 0l10 0 5 8.66 -5 8.66 -10 0 -5 -8.66zM30 0l10 0 5 8.66 -5 8.66 -10 0 -5 -8.66zM0 17.32l10 0 5 8.66 -5 8.66 -10 0 -5 -8.66zM20 17.32l10 0 5 8.66 -5 8.66 -10 0 -5 -8.66z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "40px 35px",
        }}
      >
        <header
          style={{
            padding: "1.5rem 2rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(6px)",
            borderBottom: "1px solid #fcd5e5",
            position: "sticky",
            top: 0,
            zIndex: 50,
          }}
        >
          {/* Logo */}
          <Image
            src="/logo.png"
            alt="SkillSync Logo"
            height={90}
            width={180}
            style={{
              height: "90px",
              width: "auto",
              objectFit: "contain",
            }}
            priority
          />

          <nav style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
            <Link href="/" style={{ textDecoration: "none", color: "#be185d" }}>
              Home
            </Link>
            <Link
              href="/explore"
              style={{ textDecoration: "none", color: "#be185d" }}
            >
              Explore
            </Link>
            <Link
              href="/myprofile"
              style={{ textDecoration: "none", color: "#be185d" }}
            >
              My profile
            </Link>
          </nav>
        </header>

        <main
          style={{
            padding: "4rem 1.5rem",
            maxWidth: "1000px",
            margin: "0 auto",
          }}
        >
          {children}
        </main>

        <footer
          style={{
            textAlign: "center",
            padding: "2rem 1rem",
            fontSize: "0.875rem",
            color: "#9a9a9a",
            borderTop: "1px solid #f5c2d7",
            backgroundColor: "#fff0f5",
            borderTopLeftRadius: "1.25rem",
            borderTopRightRadius: "1.25rem",
            marginTop: "3rem",
          }}
        >
          &copy; {new Date().getFullYear()} <strong>SkillSync</strong> — All
          rights reserved.
        </footer>
      </body>
    </html>
  );
}
