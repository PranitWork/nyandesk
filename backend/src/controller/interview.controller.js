const interviewModel = require("../model/Interview.Model");
const {
  generateQuestions,
  textToSpeech,
  speechToText,
  scoreAnswer
} = require("../services/ai.services");
const { v4: uuidv4 } = require("uuid");

/**
 * Start interview: generate and persist questions
 */
async function getInterviewQuestions(req, res) {
  try {
    const user = req.user; // from isUserExists middleware
    if (!user.resumeData) {
      return res.status(400).json({ msg: "No resume data found" });
    }

    // Generate questions with Gemini
    const questions = await generateQuestions(user.resumeData);

    // Create new interview session
    const sessionId = uuidv4();
    const interview = new interviewModel({
      userId: user._id,
      sessionId,
      questions: questions.map(q => ({ question: q }))
    });
    await interview.save();

    return res.json({
      msg: "Interview started",
      sessionId,
      totalQuestions: questions.length,
      questions
    });
  } catch (err) {
    console.error("Error in getInterviewQuestions:", err);
    return res.status(500).json({ msg: "Failed to generate questions" });
  }
}

/**
 * Get question audio (TTS)
 */
async function getQuestionAudio(req, res) {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ msg: "Question is required" });
    }
    const audioBuffer = await textToSpeech(question);

    res.set("Content-Type", "audio/mpeg");
    return res.send(Buffer.from(audioBuffer));
  } catch (err) {
    console.error("Error in getQuestionAudio:", err);
    return res.status(500).json({ msg: "Failed to convert text to audio" });
  }
}

/**
 * Submit candidate answer
 */
async function submitAnswer(req, res) {
  try {
    const { sessionId, question, audioAnswer } = req.body;
    const user = req.user;

    if (!sessionId || !question || !audioAnswer) {
      return res.status(400).json({ msg: "sessionId, question, and audioAnswer are required" });
    }

    // Convert audio → text
    const answerText = await speechToText(Buffer.from(audioAnswer, "base64"));

    // Score with Gemini
    const { score, remark } = await scoreAnswer(question, answerText, user.resumeData);

    // Update interview document
    const interview = await interviewModel.findOne({ sessionId, userId: user._id });
    if (!interview) {
      return res.status(404).json({ msg: "Interview session not found" });
    }

    const qIndex = interview.questions.findIndex(q => q.question === question);
    if (qIndex !== -1) {
      interview.questions[qIndex].answer = answerText;
      interview.questions[qIndex].score = score;
      interview.questions[qIndex].feedback = remark;
    }
    await interview.save();

    return res.json({
      question,
      answer: answerText,
      score,
      remark
    });
  } catch (err) {
    console.error("Error in submitAnswer:", err);
    return res.status(500).json({ msg: "Failed to process answer" });
  }
}

module.exports = {
  getInterviewQuestions,
  getQuestionAudio,
  submitAnswer
};
