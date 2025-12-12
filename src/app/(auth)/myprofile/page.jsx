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
      <div className="font-poppins text-center p-8">
        My profile is loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="font-poppins text-red-600 text-center p-8">
        Error: {error}
      </div>
    );
  }

  if (!user) {
    return (
      <div className="font-poppins text-center p-8">No profile to display.</div>
    );
  }

  return (
    <div className="font-poppins p-8 max-w-4xl mx-auto text-gray-700">
      <div className="text-center mb-8">
        <h1 className="text-4xl mt-4 mb-2 font-extrabold text-pink-700 drop-shadow-lg">
          {user.name || "My Profile"}
        </h1>
        <div className="w-20 h-20 bg-gradient-to-br from-pink-300 to-rose-500 rounded-full text-5xl text-white font-bold mx-auto flex items-center justify-center shadow-md">
          {user.name ? user.name.charAt(0).toUpperCase() : "?"}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <section className="mb-8">
          <h2 className="text-2xl mb-4 border-b-2 border-pink-200 pb-2">
            Basic Information
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
            <h2 className="text-2xl mb-4 border-b-2 border-pink-200 pb-2">
              Experience
            </h2>
            <div>
              {user.experience.map((exp, index) => (
                <div
                  key={index}
                  className="bg-pink-50 p-4 rounded-lg shadow-sm mb-4"
                >
                  <h3 className="text-xl font-semibold mb-1">{exp.title}</h3>
                  <p className="text-gray-600 mb-2">
                    {exp.company} ({exp.years} years)
                  </p>
                  {exp.description && (
                    <p className="text-gray-700">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {user.skills && user.skills.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl mb-4 border-b-2 border-pink-200 pb-2">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-pink-200 px-4 py-2 rounded-full text-sm font-medium"
                >
                  {skill.name} ({skill.level})
                </span>
              ))}
            </div>
          </section>
        )}

        {user.projects && user.projects.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl mb-4 border-b-2 border-pink-200 pb-2">
              Projects
            </h2>
            <div>
              {user.projects.map((project, index) => (
                <div
                  key={index}
                  className="bg-pink-50 p-4 rounded-lg shadow-sm mb-4"
                >
                  <h3 className="text-xl font-semibold mb-1">
                    {project.title}
                  </h3>
                  {project.description && (
                    <p className="text-gray-700 mb-2">{project.description}</p>
                  )}
                  {project.link && (
                    <p>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        View Project
                      </a>
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
      <div className="text-center mt-12">
        {user._id && (
          <Link
            href={`/editprofile?userid=${user._id}`}
            className="inline-block bg-rose-600 text-white py-3 px-8 rounded-full text-lg font-bold transition-transform duration-200 hover:scale-105 shadow-lg"
          >
            Edit Profile
          </Link>
        )}
      </div>
    </div>
  );
}
