import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  universityName: { type: String },
  courseName: { type: String, required: true },
  experience: [
    {
      title: { type: String },
      company: { type: String },
      years: { type: Number, default: 0 },
      description: { type: String },
    },
  ],
  skills: [
    {
      name: { type: String },
      level: {
        type: String,
        enum: ["beginner", "intermediate", "advanced"],
        default: "beginner",
      },
    },
  ],
  LinkedInID: { type: String },
  GithubID: { type: String },
  projects: [
    {
      title: { type: String },
      description: { type: String },
      link: { type: String },
    },
  ],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
