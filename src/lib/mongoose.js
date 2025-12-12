import mongoose from "mongoose";
const connectionToDatabase = async () => {
  try {
    const mongoUrl = process.env.MongoURL;
    if (!mongoUrl) {
      throw new Error("MongoURL environment variable is not defined.");
    }
    await mongoose.connect(mongoUrl);
    console.log("connected to db");
  } catch (err) {
    console.log("Database connection error:", err);
  }
};
export default connectionToDatabase;
