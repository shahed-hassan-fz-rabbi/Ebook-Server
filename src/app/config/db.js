import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("DATABASE_URL:", process.env.DATABASE_URL);

    await mongoose.connect(process.env.DATABASE_URL);

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed");
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;