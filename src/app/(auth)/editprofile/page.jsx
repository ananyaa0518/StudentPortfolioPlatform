"use client";
import React, { use, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function EditProfile() {
  const searchParams = useSearchParams();
  const urluserId = searchParams.get("userid"); // <-- use 'userid' lowercase
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [universityName, setUniversityName] = useState("");
  const [courseName, setCourseName] = useState("");
  const [experience, setExperience] = useState([
    { title: "", company: "", years: 0, description: "" },
  ]);
  const [skills, setSkills] = useState([{ name: "", level: "" }]);
  const [LinkedInID, setLinkedInID] = useState("");
  const [GithubID, setGithubID] = useState("");
  const [projects, setProjects] = useState([
    { title: "", description: "", link: "" },
  ]);
  const [message, setMessage] = useState("");
  const [loadingInitialData, setLoadingInitialData] = useState(true);

  const inputAndSelectClasses =
    "w-full rounded-md border border-rose-100 bg-rose-50/60 p-2 text-sm focus:border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-200 mb-2";
  const textareaClasses =
    "w-full rounded-md border border-rose-100 bg-rose-50/60 p-2 text-sm min-h-[80px] focus:border-rose-300 focus:outline-none focus:ring-2 focus:ring-rose-200";

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        let userToLoad = null;
        if (urluserId) {
          // FIX: Use query param, not /:id
          const response = await axios.get(`/api/users?userid=${urluserId}`);
          userToLoad = response.data;
          setMessage("Existing profile is loading ");
        } else {
          const response = await axios.get("/api/users");
          if (response.data && response.data.length > 0) {
            userToLoad = response.data[0];
            setMessage("Loading first user profile");
          } else {
            setMessage("No user profiles found.");
          }
        }

        if (userToLoad) {
          setUserId(userToLoad._id);
          setName(userToLoad.name || "");
          setEmail(userToLoad.email || "");
          setUniversityName(userToLoad.universityName || "");
          setCourseName(userToLoad.courseName || "");
          setExperience(
            userToLoad.experience && userToLoad.experience.length > 0
              ? userToLoad.experience
              : [{ title: "", company: "", years: 0, description: "" }]
          );
          setSkills(
            userToLoad.skills && userToLoad.skills.length > 0
              ? userToLoad.skills
              : [{ name: "", level: "" }]
          );
          setProjects(
            userToLoad.projects && userToLoad.projects.length > 0
              ? userToLoad.projects
              : [{ title: "", description: "", link: "" }]
          );
          setLinkedInID(userToLoad.LinkedInID || "");
          setGithubID(userToLoad.GithubID || "");
        }
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setMessage("An error occurred while fetching the user profile.");
      } finally {
        setLoadingInitialData(false);
      }
    };

    fetchUserProfile();
  }, [urluserId]);

  const handleExperienceChange = (index, event) => {
    const newExperience = [...experience];
    newExperience[index][event.target.name] = event.target.value;
    setExperience(newExperience);
  };
  const addExperience = () => {
    setExperience([
      ...experience,
      { title: "", company: "", years: 0, description: "" },
    ]);
  };
  const removeExperience = (index) => {
    const newExperience = experience.filter((_, i) => i !== index);
    setExperience(newExperience);
  };

  const handleSkillChange = (index, event) => {
    const newSkills = [...skills];
    newSkills[index][event.target.name] = event.target.value;
    setSkills(newSkills);
  };
  const addSkills = () => {
    setSkills([...skills, { name: "", level: "" }]);
  };
  const removeSkills = (index) => {
    const newSkills = skills.filter((_, i) => i !== index);
    setSkills(newSkills);
  };

  const handleProjectsChange = (index, event) => {
    const newProjects = [...projects];
    newProjects[index][event.target.name] = event.target.value;
    setProjects(newProjects);
  };
  const addProjects = () => {
    setProjects([...projects, { title: "", description: "", link: "" }]);
  };
  const removeProjects = (index) => {
    const newProjects = projects.filter((_, i) => i !== index);
    setProjects(newProjects);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!email) {
      setMessage("Email is required to update your profile.");
      return;
    }
    const userData = {
      name,
      email,
      universityName,
      courseName,
      experience,
      skills,
      LinkedInID,
      GithubID,
      projects,
    };

    try {
      if (userId) {
        // Update existing user by email
        await axios.put(`/api/users`, userData);
        setMessage("Profile updated successfully!");
      } else {
        // Create new user
        await axios.post(`/api/users`, userData);
        setMessage("Profile created successfully!");
      }
    } catch (err) {
      console.error("Error saving profile:", err);
      setMessage(
        err.response?.data?.error ||
          "An error occurred while saving the profile."
      );
    } finally {
      setLoadingInitialData(false);
    }
  };
  if (loadingInitialData) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="rounded-3xl bg-white/80 px-8 py-6 text-gray-800 shadow-lg ring-1 ring-rose-100">
          Loading profile data...
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl rounded-3xl bg-white/80 p-6 text-gray-800 shadow-xl ring-1 ring-rose-100 sm:p-10">
        <h2 className="mb-6 text-center text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
          Edit your portfolio
        </h2>
        {message && (
          <div
            className={`mb-4 rounded-2xl px-4 py-3 text-sm ${
              message.toLowerCase().includes("error")
                ? "bg-red-50 text-red-700 ring-1 ring-red-100"
                : "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic information */}
          <section className="rounded-2xl bg-white/80 p-5 shadow-sm ring-1 ring-rose-50">
            <h3 className="mb-4 border-b border-rose-100 pb-2 text-lg font-semibold text-gray-900">
              Basic information
            </h3>
            <div>
              <label className="block font-semibold mb-1 text-gray-700">
                Username
              </label>
              <input
                type="text"
                required
                value={name} // Added value for controlled component
                onChange={(e) => setName(e.target.value)}
                className={inputAndSelectClasses}
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-gray-700">
                Email
              </label>
              <input
                type="email"
                required
                value={email} // Added value for controlled component
                onChange={(e) => setEmail(e.target.value)}
                className={inputAndSelectClasses}
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-gray-700">
                University Name
              </label>
              <input
                type="text"
                required
                value={universityName} // Added value for controlled component
                onChange={(e) => setUniversityName(e.target.value)}
                className={inputAndSelectClasses}
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-gray-700">
                Course
              </label>
              <input
                type="text"
                required
                value={courseName} // Added value for controlled component
                onChange={(e) => setCourseName(e.target.value)}
                className={inputAndSelectClasses}
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-gray-700">
                LinkedIn ID (Optional)
              </label>
              <input
                type="text"
                value={LinkedInID} // Added value for controlled component
                onChange={(e) => setLinkedInID(e.target.value)}
                className={inputAndSelectClasses}
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-gray-700">
                Github ID (Optional)
              </label>
              <input
                type="text"
                value={GithubID} // Added value for controlled component
                onChange={(e) => setGithubID(e.target.value)}
                className={inputAndSelectClasses}
              />
            </div>
          </section>

          {/* Skills */}
          <section className="rounded-2xl bg-white/80 p-5 shadow-sm ring-1 ring-rose-50">
            <h3 className="mb-4 border-b border-rose-100 pb-2 text-lg font-semibold text-gray-900">
              Skills
            </h3>
            {skills.map((skill, index) => (
              <div
                key={index}
                className="relative mb-4 space-y-3 rounded-xl border border-rose-100 bg-rose-50/60 p-4"
              >
                {skills.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSkills(index)}
                    className="absolute right-2 top-2 text-lg font-bold text-red-500 hover:text-red-700"
                    aria-label={`Remove skill ${index + 1}`}
                  >
                    &times;
                  </button>
                )}
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Skill Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="e.g., Next.js"
                    value={skill.name}
                    onChange={(e) => handleSkillChange(index, e)}
                    className={inputAndSelectClasses}
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Skill Level
                  </label>
                  <select
                    name="level"
                    value={skill.level}
                    onChange={(e) => handleSkillChange(index, e)}
                    className={inputAndSelectClasses}
                  >
                    <option value="">Select level</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addSkills}
              className="inline-flex items-center justify-center rounded-full bg-rose-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-rose-700"
            >
              Add another skill
            </button>
          </section>

          {/* Experience */}
          <section className="rounded-2xl bg-white/80 p-5 shadow-sm ring-1 ring-rose-50">
            <h3 className="mb-4 border-b border-rose-100 pb-2 text-lg font-semibold text-gray-900">
              Experience
            </h3>
            {experience.map((exp, index) => (
              <div
                key={index}
                className="relative mb-4 space-y-3 rounded-xl border border-rose-100 bg-rose-50/60 p-4"
              >
                {experience.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeExperience(index)}
                    className="absolute right-2 top-2 text-lg font-bold text-red-500 hover:text-red-700"
                    aria-label={`Remove experience ${index + 1}`}
                  >
                    &times;
                  </button>
                )}
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="e.g., Frontend Intern"
                    value={exp.title}
                    onChange={(e) => handleExperienceChange(index, e)}
                    className={inputAndSelectClasses}
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    placeholder="e.g., Google"
                    value={exp.company}
                    onChange={(e) => handleExperienceChange(index, e)}
                    className={inputAndSelectClasses}
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-gray-700">
                    Years (e.g., 2)
                  </label>
                  <input
                    type="number"
                    name="years"
                    placeholder="Years"
                    value={exp.years}
                    onChange={(e) => handleExperienceChange(index, e)}
                    className={inputAndSelectClasses}
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    placeholder="Briefly describe your responsibilities..."
                    value={exp.description}
                    onChange={(e) => handleExperienceChange(index, e)}
                    className={textareaClasses}
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addExperience}
              className="inline-flex items-center justify-center rounded-full bg-rose-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-rose-700"
            >
              Add another experience
            </button>
          </section>

          {/* Projects */}
          <section className="rounded-2xl bg-white/80 p-5 shadow-sm ring-1 ring-rose-50">
            <h3 className="mb-4 border-b border-rose-100 pb-2 text-lg font-semibold text-gray-900">
              Projects
            </h3>
            {projects.map((project, index) => (
              <div
                key={index}
                className="relative mb-4 space-y-3 rounded-xl border border-rose-100 bg-rose-50/60 p-4"
              >
                {projects.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeProjects(index)}
                    className="absolute right-2 top-2 text-lg font-bold text-red-500 hover:text-red-700"
                    aria-label={`Remove project ${index + 1}`}
                  >
                    &times;
                  </button>
                )}
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Project Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="e.g., E-commerce Website"
                    value={project.title}
                    onChange={(e) => handleProjectsChange(index, e)}
                    className={inputAndSelectClasses}
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    placeholder="Briefly describe your project..."
                    value={project.description}
                    onChange={(e) => handleProjectsChange(index, e)}
                    className={textareaClasses}
                  />
                </div>
                <div>
                  <label className="block font-semibold text-gray-700 mb-1">
                    Project Link
                  </label>
                  <input
                    type="text"
                    name="link"
                    placeholder="e.g., https://github.com/yourproject"
                    value={project.link}
                    onChange={(e) => handleProjectsChange(index, e)}
                    className={inputAndSelectClasses}
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addProjects}
              className="inline-flex items-center justify-center rounded-full bg-rose-600 px-5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-rose-700"
            >
              Add another project
            </button>
          </section>

          {/* Save button */}
          <div className="pt-4 text-center">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-rose-600 px-8 py-3 text-sm font-semibold text-white shadow-md transition-all duration-150 hover:-translate-y-[1px] hover:bg-rose-700 hover:shadow-lg sm:text-base"
            >
              Save portfolio
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
