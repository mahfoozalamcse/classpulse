require("dotenv").config(); // Load .env variables
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const port = process.env.PORT || 0; // 0 means auto-assign an available port



const MONGO_URI = process.env.MONGO_URI; // Ensure this is loaded

// Debugging: Check if MONGO_URI is being read correctly
console.log("MongoDB URI:", MONGO_URI);

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is not defined. Check your .env file.");
  process.exit(1);
}

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));


  app.post("/api/auth/login", (req, res) => {
    res.json({ message: "Login successful" });
  });

// Start Server
const server = app.listen(port, () => {
    console.log(`Server running on port ${server.address().port}`);
  });


