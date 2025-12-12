import connectionToDatabase from "@/lib/mongoose";
import User from "@/models/Users";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectionToDatabase();
    const { searchParams } = new URL(request.url);
    const userid = searchParams.get("userid");

    if (userid) {
      const user = await User.findById(userid);
      if (!user) {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(user, { status: 200 });
    } else {
      const users = await User.find({});
      return NextResponse.json(users, { status: 200 });
    }
  } catch (err) {
    console.log("Error in GET /api/users:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectionToDatabase();
    const {
      name,
      email,
      universityName,
      courseName,
      experience,
      skills,
      LinkedInID,
      GithubID,
      projects,
    } = await request.json();

    // Optional: Check if user already exists by email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 409 }
      );
    }

    const newUser = new User({
      name,
      email,
      universityName,
      courseName,
      experience: experience.filter(
        (e) => e.title || e.company || e.years || e.description
      ),
      skills: skills.filter((s) => s.name && s.level),
      LinkedInID,
      GithubID,
      projects: projects.filter((p) => p.title || p.description || p.link),
    });
    await newUser.save();
    return NextResponse.json(newUser, { status: 201 });
  } catch (err) {
    console.log("Error in POST /api/users:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// PUT: Update user by email
export async function PUT(request) {
  try {
    await connectionToDatabase();
    const {
      name,
      email,
      universityName,
      courseName,
      experience,
      skills,
      LinkedInID,
      GithubID,
      projects,
    } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required for update" },
        { status: 400 }
      );
    }

    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      {
        name,
        universityName,
        courseName,
        experience,
        skills,
        LinkedInID,
        GithubID,
        projects,
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(updatedUser, { status: 200 });
  } catch (err) {
    console.log("Error in PUT /api/users:", err);
    if (err.errors) {
      for (const key in err.errors) {
        console.log(`${key}: ${err.errors[key].message}`);
      }
    }
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
