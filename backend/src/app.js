const express = require("express")
const cors = require("cors")
const multer = require("multer")
const cookieParser = require("cookie-parser");

// routes
const authRoutes= require("./routes/auth.routes")
const userRoutes = require("./routes/user.routes")
const jobsRoutes= require("./routes/jobs.routes")
const atsRoutes=  require("./routes/ats.routes")

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({ msg: "File too large. Max size is 3MB." });
    }
    return res.status(400).json({ msg: err.message });
  } else if (err) {
    return res.status(400).json({ msg: err.message });
  }
  next();
});


app.get("/", (req, res) => {
    res.send("Welcome to Nyandesk Backend");
});
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/jobs", jobsRoutes);
app.use("/api/resume", atsRoutes);


module.exports = app;


