const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser");

// routes
const authRoutes= require("./routes/auth.routes")
const userRoutes = require("./routes/user.routes")
const jobsRoutes= require("./routes/jobs.routes")
const atsRoutes=  require("./routes/ats.routes")
const interviewRoutes=  require("./routes/interview.routes")


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173",
  "https://nyandesk.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));



app.get("/", (req, res) => {
    res.send("Welcome to Nyandesk Backend");
});
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/jobs", jobsRoutes);
app.use("/api/resume", atsRoutes);
app.use("/api/interview", interviewRoutes)
module.exports = app;


