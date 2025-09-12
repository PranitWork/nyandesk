const express = require("express");
const multer = require("multer");

const { uploadAndParseResume } = require("../controller/resume.controller");
const { isUserExists } = require("../middleware/auth.middleware");

const router = express.Router();

const upload = multer({dest:"uploads/"});

router.post("/upload",isUserExists, upload.single("resume"), uploadAndParseResume );

module.exports = router;