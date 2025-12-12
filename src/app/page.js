"use client";
import Link from "next/link";

export default function HomePage() {
  return (
    <div
      className="min-h-screen flex flex-col justify-center px-6 py-20 relative overflow-hidden"
      style={{
        backgroundColor: "#ffffff",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='35' viewBox='0 0 40 35'%3E%3Cg fill='%23fff5f8' fill-opacity='0.6'%3E%3Cpath d='M10 0l10 0 5 8.66 -5 8.66 -10 0 -5 -8.66zM30 0l10 0 5 8.66 -5 8.66 -10 0 -5 -8.66zM0 17.32l10 0 5 8.66 -5 8.66 -10 0 -5 -8.66zM20 17.32l10 0 5 8.66 -5 8.66 -10 0 -5 -8.66z'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "40px 35px",
        fontFamily: "'Segoe UI', 'cursive', sans-serif",
      }}
    >
      
      <div
        className="absolute top-[-100px] left-[-150px] w-[300px] h-[300px] rounded-full opacity-20 blur-[100px]"
        style={{ backgroundColor: "#ec4899", zIndex: 0 }}
      ></div>

     
      <div
        className="absolute bottom-[-100px] right-[-150px] w-[300px] h-[300px] rounded-full opacity-20 blur-[100px]"
        style={{ backgroundColor: "#f472b6", zIndex: 0 }}
      ></div>

  
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        <h1
          className="text-4xl md:text-5xl font-extrabold mb-4"
          style={{
            color: "#be185d",
            fontFamily: "'Satisfy', cursive",
          }}
        >
          Unleash Your Potential. <br /> Showcase Your Journey.
        </h1>

        <p className="text-md text-gray-700 max-w-xl mx-auto leading-relaxed">
          Showcase your awesome academic and professional journey, <br />
          connect with peers, discover new talents. It's like your personal <br />
          portfolio gallery, for your skills and projects!
        </p>
      </div>
    </div>
  );
}