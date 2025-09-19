const express= require("express");
const { getjobs, recommendJobs} = require("../controller/jobs.controller");
const { isUserExists } = require("../middleware/auth.middleware");
const router = express.Router();

router.get("/all",isUserExists, getjobs);
router.get("/recommend", isUserExists, recommendJobs);

module.exports=router;