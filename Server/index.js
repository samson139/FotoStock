const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require("jsonwebtoken");
//models import
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const isAuthenticated = require("./Authentication/Authentication")

const server = express();
server.use(cookieParser());
server.use(express.json());
//definig cors problem

server.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })

)

//importing controllers
const { signup } = require("./Controllers/Signup");
const { signin } = require("./Controllers/Signin");
const { filters } = require("./Controllers/Filters")
const getImage = require("./Controllers/GetImage")
const uploadImage = require("./Controllers/UploadImage")
const allImages = require("./Controllers/Allimages")
const logout = require("./Controllers/Logout")
const AIcall = require("./Controllers/AIcall");



//multer
const place = path.join(__dirname, 'public', 'data', 'uploads');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, place);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname))
  }
});

const upload = multer(
  {
    storage: storage,
  });

//connecting to the mongodb using the mongoclient
const url = `mongodb+srv://samsonm08:${process.env.DBPASS}@fotostock.jqtrv.mongodb.net/?retryWrites=true&w=majority&appName=fotostock`
const connect = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("connected to database");
  }
  catch (error) {
    console.error(error.message, "error occured");
  }
}
connect(url);

server.post('/signup', signup);
server.post("/signin", signin);
server.post("/uploadimage", upload.single("image_file"), isAuthenticated, uploadImage);
server.get("/getimages", isAuthenticated, allImages);
server.get("/getimage/:id", isAuthenticated, getImage);
server.get("/getAll", isAuthenticated, filters)
server.post('/logout', logout)
server.post("/api/chat", AIcall);

server.get("/test", (req, res) => {
  res.send("Hello from the server");
})

server.listen(5025, () => {
  console.log(`Server is running on port 5025`);
});
