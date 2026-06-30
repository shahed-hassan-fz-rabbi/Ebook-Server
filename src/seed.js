import dotenv from "dotenv";
import connectDB from "./app/config/db.js";

import Ebook from "./app/modules/ebook/ebook.model.js";
import User from "./app/modules/user/user.model.js";

dotenv.config();

const seed = async () => {
  try {
    await connectDB();

    const writer = await User.findOne({
      role: "writer",
    });

    if (!writer) {
      console.log("❌ No writer found.");
      return process.exit();
    }

    await Ebook.deleteMany({});

    const ebooks = [
      {
        title: "The Silent Storm",
        description: "A thrilling mystery novel.",
        content: "Full ebook content...",
        coverImage: "https://i.ibb.co/hFZmG5Pz/book7.jpg",
        genre: "Thriller",
        language: "English",
        price: 10,
        author: writer._id,
      },
      {
        title: "Echoes of Tomorrow",
        description: "Sci-Fi Adventure",
        content: "Full ebook content...",
        coverImage: "https://i.ibb.co/Z11k7YmH/book3.jpg",
        genre: "Sci-Fi",
        language: "English",
        price: 12,
        author: writer._id,
      },
      {
        title: "Crimson Petals",
        description: "Romantic Story",
        content: "Full ebook content...",
        coverImage: "https://i.ibb.co/4B8dXyr/book6.jpg",
        genre: "Romance",
        language: "English",
        price: 9,
        author: writer._id,
      },
      {
        title: "Dragon Kingdom",
        description: "Fantasy Story",
        content: "Full ebook content...",
        coverImage: "https://i.ibb.co/jZyMJsLL/book5.jpg",
        genre: "Fantasy",
        language: "English",
        price: 14,
        author: writer._id,
      },
      {
        title: "Haunted House",
        description: "Horror Story",
        content: "Full ebook content...",
        coverImage: "https://i.ibb.co/67CFJXj7/book4.jpg",
        genre: "Horror",
        language: "English",
        price: 8,
        author: writer._id,
      },
    ];

    await Ebook.insertMany(ebooks);

    console.log("✅ Seed Completed");

    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

seed();