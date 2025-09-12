const express= require("express");
const { getjobs} = require("../controller/jobs.controller");
const { isUserExists } = require("../middleware/auth.middleware");
const router = express.Router();

router.get("/all",isUserExists, getjobs);

module.exports=router;