const express = require("express");
const upload = require("../middleware/upload.middleware"); // your multer middleware
const { uploadAndParseAndGenerateATS } = require("../controller/resume.controller");
const { isUserExists } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/upload", isUserExists ,upload.single("resume"), uploadAndParseAndGenerateATS);


module.exports = router;