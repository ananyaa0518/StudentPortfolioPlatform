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
    "w-full p-2 border rounded-md mb-2 bg-pink-50 focus:ring-pink-400 focus:border-pink-400";
  const textareaClasses =
    "w-full p-2 border rounded-md bg-pink-50 min-h-[80px] focus:ring-pink-400 focus:border-pink-400";

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
      <div className="max-w-3xl mx-auto p-6 text-gray-800 text-center">
        Loading profile data...
      </div>
    );
  }
  return (
    <div
      className="max-w-3xl mx-auto p-6 rounded-lg shadow-xl text-gray-800"
      style={{
        backgroundColor: "#f3e2eb",
        backgroundImage:
          "url('https://www.transparenttextures.com/patterns/hexellence.png')",
        backgroundRepeat: "repeat",
        backgroundSize: "auto",
        opacity: 0.98,
      }}
    >
      <div className="max-w-2xl mx-auto bg-pink-100 p-8 rounded-lg shadow-lg">
        <h2 className="text-4xl font-extrabold text-center text-pink-700 mb-8 drop-shadow-md">
          Edit Profile
        </h2>
        {message && (
          <div
            className={`p-3 mb-4 rounded-md text-sm ${
              message.startsWith("Error")
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-pink-700 mb-4 drop-shadow-sm border-b-2 border-pink-200 pb-2">
              Basic Information
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

          {/* Skills Section */}
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-pink-700 mb-4 drop-shadow-sm border-b-2 border-pink-200 pb-2">
              Skills
            </h3>
            {skills.map((skill, index) => (
              <div
                key={index}
                className="space-y-3 p-4 border border-pink-200 rounded-md relative bg-pink-50 mb-4"
              >
                {skills.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSkills(index)}
                    className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-xl font-bold"
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
              className="bg-pink-600 text-white px-5 py-2 rounded-md hover:bg-pink-700 transition duration-200 shadow-md"
            >
              Add More Skill
            </button>
          </section>

          {/* Experience Section */}
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-pink-700 mb-4 drop-shadow-sm border-b-2 border-pink-200 pb-2">
              Experience
            </h3>
            {experience.map((exp, index) => (
              <div
                key={index}
                className="space-y-3 p-4 border border-pink-200 rounded-md relative bg-pink-50 mb-4"
              >
                {experience.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeExperience(index)}
                    className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-xl font-bold"
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
              className="bg-pink-600 text-white px-5 py-2 rounded-md hover:bg-pink-700 transition duration-200 shadow-md"
            >
              Add More Experience
            </button>
          </section>

          {/* Projects Section */}
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-pink-700 mb-4 drop-shadow-sm border-b-2 border-pink-200 pb-2">
              Projects
            </h3>
            {projects.map((project, index) => (
              <div
                key={index}
                className="space-y-3 p-4 border border-pink-200 rounded-md relative bg-pink-50 mb-4"
              >
                {projects.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeProjects(index)}
                    className="absolute top-2 right-2 text-red-600 hover:text-red-800 text-xl font-bold"
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
              className="bg-pink-600 text-white px-5 py-2 rounded-md hover:bg-pink-700 transition duration-200 shadow-md"
            >
              Add More Project
            </button>
          </section>

          {/* Save Button */}
          <div className="text-center pt-4">
            <button
              type="submit"
              className="bg-purple-700 text-white px-8 py-3 rounded-full hover:bg-purple-800 font-bold text-lg shadow-lg transition-transform duration-200 hover:scale-105"
            >
              Save Portfolio
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
