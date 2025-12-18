"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

export default function MyProfilePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("/api/users");
        if (response.data && response.data.length > 0) {
          setUser(response.data[0]);
        } else {
          setError("No user profile found. Please create one first.");
        }
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
        setError("Failed to load profile. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-4">
        <div className="rounded-3xl bg-white/80 px-8 py-6 text-gray-800 shadow-lg ring-1 ring-rose-100">
          My profile is loading...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-4">
        <div className="rounded-3xl bg-white/80 px-8 py-6 text-red-600 shadow-lg ring-1 ring-red-100">
          Error: {error}
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center px-4">
        <div className="rounded-3xl bg-white/80 px-8 py-6 text-gray-800 shadow-lg ring-1 ring-rose-100">
          No profile to display.
        </div>
      </div>
    );
  }

  return (
    <div className="font-poppins mx-auto max-w-4xl text-gray-700">
      <div className="mb-8 text-center">
        <h1 className="mt-4 mb-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          {user.name || "My Profile"}
        </h1>
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-rose-300 to-rose-500 text-5xl font-bold text-white shadow-md">
          {user.name ? user.name.charAt(0).toUpperCase() : "?"}
        </div>
      </div>

      <div className="rounded-3xl bg-white/80 p-6 sm:p-8 shadow-xl ring-1 ring-rose-100">
        <section className="mb-8">
          <h2 className="mb-4 border-b border-rose-100 pb-2 text-xl font-semibold text-gray-900">
            Basic information
          </h2>
          <p className="mb-2">
            <strong className="font-semibold">Name:</strong> {user.name}
          </p>
          <p className="mb-2">
            <strong className="font-semibold">Email:</strong> {user.email}
          </p>
          <p className="mb-2">
            <strong className="font-semibold">University:</strong>{" "}
            {user.universityName}
          </p>
          <p className="mb-2">
            <strong className="font-semibold">Course:</strong> {user.courseName}
          </p>
          {user.LinkedInID && (
            <p className="mb-2">
              <strong className="font-semibold">LinkedIn ID:</strong>{" "}
              <a
                href={`https://linkedin.com/in/${user.LinkedInID}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {user.LinkedInID}
              </a>
            </p>
          )}
          {user.GithubID && (
            <p className="mb-2">
              <strong className="font-semibold">Github ID:</strong>{" "}
              <a
                href={`https://github.com/${user.GithubID}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {user.GithubID}
              </a>
            </p>
          )}
        </section>

        {user.experience && user.experience.length > 0 && (
          <section className="mb-8">
            <h2 className="mb-4 border-b border-rose-100 pb-2 text-xl font-semibold text-gray-900">
              Experience
            </h2>
            <div>
              {user.experience.map((exp, index) => (
                <div
                  key={index}
                  className="mb-4 rounded-xl bg-rose-50/60 p-4 text-sm shadow-sm ring-1 ring-rose-100"
                >
                  <h3 className="mb-1 text-base font-semibold text-gray-900">
                    {exp.title}
                  </h3>
                  <p className="mb-2 text-xs text-gray-600">
                    {exp.company} ({exp.years} years)
                  </p>
                  {exp.description && (
                    <p className="text-sm text-gray-700">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {user.skills && user.skills.length > 0 && (
          <section className="mb-8">
            <h2 className="mb-4 border-b border-rose-100 pb-2 text-xl font-semibold text-gray-900">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2 text-sm">
              {user.skills.map((skill, index) => (
                <span
                  key={index}
                  className="rounded-full bg-rose-100 px-4 py-1 font-medium text-gray-800"
                >
                  {skill.name} ({skill.level})
                </span>
              ))}
            </div>
          </section>
        )}

        {user.projects && user.projects.length > 0 && (
          <section className="mb-8">
            <h2 className="mb-4 border-b border-rose-100 pb-2 text-xl font-semibold text-gray-900">
              Projects
            </h2>
            <div>
              {user.projects.map((project, index) => (
                <div
                  key={index}
                  className="mb-4 rounded-xl bg-rose-50/60 p-4 text-sm shadow-sm ring-1 ring-rose-100"
                >
                  <h3 className="mb-1 text-base font-semibold text-gray-900">
                    {project.title}
                  </h3>
                  {project.description && (
                    <p className="mb-2 text-sm text-gray-700">
                      {project.description}
                    </p>
                  )}
                  {project.link && (
                    <p>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-rose-700 hover:text-rose-800 hover:underline"
                      >
                        View project
                      </a>
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
      <div className="mt-10 text-center">
        {user._id && (
          <Link
            href={`/editprofile?userid=${user._id}`}
            className="inline-flex items-center justify-center rounded-full bg-rose-600 px-8 py-3 text-sm font-semibold text-white shadow-md transition-all duration-150 hover:-translate-y-[1px] hover:bg-rose-700 hover:shadow-lg sm:text-base"
          >
            Edit profile
          </Link>
        )}
      </div>
    </div>
  );
}
