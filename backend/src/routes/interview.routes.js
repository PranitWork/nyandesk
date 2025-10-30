const express= require("express");
const { isUserExists } = require("../middleware/auth.middleware");
const interviewController = require("../controller/interviewer.controller");
const router = express.Router();


router.post("/create", isUserExists, interviewController.createInterview);
router.get("/:sessionId", isUserExists, interviewController.getInterview);



module.exports = router;