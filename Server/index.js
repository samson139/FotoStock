const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const path = require("path");
require("dotenv").config();

const { requireAuth, verifyAuth } = require("./Authentication/Authentication");

// controllers
const { signup } = require("./Controllers/Signup");
const { signin } = require("./Controllers/Signin");
const { filters } = require("./Controllers/Filters");
const getImage = require("./Controllers/GetImage");
const uploadImage = require("./Controllers/UploadImage");
const allImages = require("./Controllers/Allimages");
const AIcall = require("./Controllers/AIcall");

// Express setup
const server = express();
server.use(cookieParser());
server.use(express.json());

// CORS setup
server.use(
  cors({
    origin: "https://foto-stock-3t75.vercel.app",
    credentials: true,
  })
);

// Multer setup
const uploadDir = path.join(__dirname, "public", "data", "uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) =>
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`),
});

const upload = multer({ storage });

// Database connection
(async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://samsonm08:${process.env.DBPASS}@fotostock.jqtrv.mongodb.net/?retryWrites=true&w=majority`
    );
    console.log("MongoDB connected");
  } catch (err) {
    console.error("Database connection error:", err.message);
  }
})();

// public routes
server.post("/signup", signup);
server.post("/signin", signin);
server.get("/verify", verifyAuth);

// protected routes
server.post("/uploadimage", requireAuth, upload.single("image_file"), uploadImage);
server.get("/getimages", requireAuth, allImages);
server.get("/getimage/:id", requireAuth, getImage);
server.get("/getAll", requireAuth, filters);
server.post("/api/chat", requireAuth, AIcall);

// test route
server.get("/test", (req, res) => res.send("Hello from server"));

// start server
server.listen(5025, () => console.log("Server running on port 5025"));
