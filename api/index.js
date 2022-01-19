const express = require("express");
const app = express();

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const passport = require("passport");
const jwt = require("jsonwebtoken");



const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const commentRoute = require("./routes/comment");
const path = require("path");

dotenv.config();



require("./utils/db");

require("./strategies/JwtStrategy");
require("./strategies/LocalStrategy");
require("./authenticate");

app.use("/images", express.static(path.join(__dirname, "public/images")));

//middleware

app.use(express.json());
app.use(helmet());

app.use(morgan("common"));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use(passport.initialize());


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type,Origin,Accept, Authorization",
  );
  
  res.setHeader("Content-Type", "application/json");

  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
})

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});



app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

app.use("/api/posts", postRoute); 
app.use("/api/comment", commentRoute); 


app.listen(process.env.PORT || 8800, '0.0.0.0',  () => {
  console.log("Backend server is running!");
});
