"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { usePathname, Link } from "next/navigation";

export default function UserProfileDynamicPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const pathname = usePathname();

  const userid = pathname.split("/").pop();

  useEffect(() => {
    if (!userid) {
      setError("User ID not found in URL.");
      setLoading(false);
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`/api/users?userid=${userid}`);
        setUser(response.data);
      } catch (err) {
        console.error("Error fetching user profile:", err);
        if (err.response && err.response.status === 404) {
          setError("User profile not found.");
        } else {
          setError("An error occurred while fetching the user profile.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userid]);

  if (loading) {
    return (
      <div className="font-poppins text-center p-8 text-gray-700">
        Loading user profile...
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
      <div className="font-poppins text-center p-8 text-gray-700">
        <h1 className="text-3xl font-bold mb-4 text-pink-700">
          User Profile Not Found!
        </h1>
        <p>The requested profile does not exist or could not be loaded.</p>
      </div>
    );
  }

  return (
    <div className="font-poppins p-8 max-w-4xl mx-auto text-gray-700">
      <div className="text-center mb-8">
        <h1 className="text-4xl mt-4 mb-2 font-extrabold text-pink-700 drop-shadow-lg">
          {user.name || "Student Profile"}
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
              <strong className="font-semibold">LinkedIn:</strong>{" "}
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
              <strong className="font-semibold">GitHub:</strong>{" "}
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
      <Link href="">
        <button
          className="mt-6 px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors duration-300 font-semibold shadow-md flex items-center justify-center mx-auto text-lg hover:shadow-lg transform hover:scale-105 active:scale-95 focus:outline-none focus:ring
      "
        >
          Edit Profile
        </button>
      </Link>
    </div>
  );
}
