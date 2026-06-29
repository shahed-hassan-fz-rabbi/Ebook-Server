import dotenv from "dotenv";
import mongoose from "mongoose";

import connectDB from "./app/config/db.js";

import User from "./app/modules/user/user.model.js";

dotenv.config();

const seedUsers = async () => {
  try {
    await connectDB();

    const users = [
      {
        name: "Admin",
        email: "admin@fable.com",
        password: "Admin@123",
        role: "admin",
        isVerified: true,
      },

      {
        name: "Writer One",
        email: "writer@fable.com",
        password: "Writer@123",
        role: "writer",
        isVerified: true,
      },

      {
        name: "Reader One",
        email: "reader@fable.com",
        password: "Reader@123",
        role: "reader",
        isVerified: true,
      },
    ];

    await User.deleteMany({
      email: {
        $in: users.map((u) => u.email),
      },
    });

    for (const user of users) {
      await User.create(user);
    }

    console.log("✅ Users Seeded Successfully");

    process.exit();
  } catch (err) {
    console.log(err);

    process.exit(1);
  }
};

seedUsers();