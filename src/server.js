import dotenv from "dotenv";

dotenv.config();

import connectDB from "./app/config/db.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    const { default: app } = await import("./app.js");

    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();