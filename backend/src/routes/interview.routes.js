const express = require( "express");
const aiController = require("../controller/interview.controller.js");
const { isUserExists } = require( "../middleware/auth.middleware.js");

const router = express.Router();

router.get("/questions", isUserExists, aiController.getInterviewQuestions);
router.post("/question-audio", isUserExists, aiController.getQuestionAudio);
router.post("/submit-answer", isUserExists, aiController.submitAnswer);

module.exports=router;
