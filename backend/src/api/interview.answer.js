const { stt } = require("../services/ai.services");

const saveAnswer = async (req, res) => {
  try {
    const { sessionId, questionIndex } = req.body;
    const audioFile = req.file.path;

    const transcript = await stt(audioFile);

    await InterviewModel.updateOne(
      { sessionId, [`questions.${questionIndex}.answer`]: "" },
      { $set: { [`questions.${questionIndex}.answer`]: transcript } }
    );

    res.status(200).json({ message: "Answer saved", transcript });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
