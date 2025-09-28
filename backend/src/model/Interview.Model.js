const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, default: "" },
  score: { type: Number, default: null },
  feedback: { type: String, default: "" }
});

const InterviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  sessionId: { type: String, required: true },
  questions: { type: [QuestionSchema], default: [] },
  startedAt: { type: Date, default: Date.now },
  endedAt: Date
});

const InterviewModel = mongoose.model("Interview", InterviewSchema);

module.exports = InterviewModel;
