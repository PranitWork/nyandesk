// interview.controller.js
const InterviewModel = require("../model/Interview.Model");
const userModel = require("../model/user.model");
const { ttt } = require("../services/ai.services");
const { v4: uuidv4 } = require("uuid");

exports.createInterview = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // generate questions from user's parsed resumeData
    const questionsTextArray = await ttt(user.resumeData);

    const questions = questionsTextArray.map(q => ({ question: q }));

    // create session
    const sessionId = uuidv4();
    const interview = new InterviewModel({
      userId,
      sessionId,
      questions
    });
    await interview.save();

    res.json({ sessionId, interviewId: interview._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create interview" });
  }
};

exports.getInterview = async (req, res) => {
  const { sessionId } = req.params;
  const interview = await InterviewModel.findOne({ sessionId }).populate("userId");
  if (!interview) return res.status(404).json({ message: "Not found" });
  res.json(interview);
};
