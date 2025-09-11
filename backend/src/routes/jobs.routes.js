const express= require("express");
const { getjobs} = require("../controller/jobs.controller")
const router = express.Router();

router.get("/", getjobs);

module.exports=router;