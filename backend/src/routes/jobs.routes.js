const express= require("express");
const { getjobs, recommendJobs, searchJobs} = require("../controller/jobs.controller");
const { isUserExists } = require("../middleware/auth.middleware");
const router = express.Router();

router.get("/all",isUserExists, getjobs);
router.get("/recommend", isUserExists, recommendJobs);
router.post("/search", isUserExists, searchJobs);

module.exports=router;