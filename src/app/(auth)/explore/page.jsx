"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Explore() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users");
        setUsers(response.data);
      } catch (err) {
        console.error("Error fetching users for Explore page:", err);
        setError("Failed to load users. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="rounded-3xl bg-white/80 px-8 py-6 text-gray-800 shadow-lg ring-1 ring-rose-100">
          Loading portfolios...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="rounded-3xl bg-white/80 px-4 py-8 sm:px-8 sm:py-10 shadow-xl ring-1 ring-rose-100 text-gray-800">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-rose-700 mb-6">
          Explore students
        </h1>

        {error && (
          <p className="mb-4 text-center text-sm text-red-600">{error}</p>
        )}

        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {users.map((user) => (
            <Link key={user._id} href={`/profile/${user._id}`} passHref>
              <div className="group flex h-64 flex-col rounded-2xl bg-rose-50/80 p-4 shadow-md ring-1 ring-rose-100 transition-all duration-150 hover:-translate-y-1 hover:shadow-lg hover:ring-rose-200 cursor-pointer">
                <div className="flex flex-1 items-center justify-center border-b border-rose-100 pb-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-rose-300 to-rose-500 text-3xl font-bold text-white shadow-md">
                    {user.name?.charAt(0).toUpperCase() || "?"}
                  </div>
                </div>

                <div className="flex flex-1 flex-col items-center justify-center pt-4 text-center">
                  <h2 className="text-lg font-semibold text-gray-900">
                    {user.name}
                  </h2>
                  <p className="mt-1 text-xs text-gray-600">
                    {user.universityName}
                    <br />
                    {user.courseName}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
