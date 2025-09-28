const { GoogleGenAI, Modality } = require("@google/genai");

// Initialize client
// If you are using Gemini Developer API with API key:
const aiClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// If using Vertex AI, you could set vertexai: true and project, location, etc. (see docs) :contentReference[oaicite:1]{index=1}

/**
 * Generate interview questions from resume data
 */
async function generateQuestions(resumeData) {
  const prompt = `
Candidate Profile:
Skills: ${resumeData.Skills}
Resume Summary: ${resumeData.rawText}

Generate interview questions from beginner to advanced level to crack 20 LPA.
`;

  const response = await aiClient.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      { role: "user", parts: [{ text: prompt }] }
    ]
  });

  // Safely extract text
  const candidate = response.candidates?.[0];
  const text =
    candidate?.content?.parts?.map((p) => p.text).join(" ") ||
    candidate?.text ||
    "";

  if (!text) {
    throw new Error("No text generated from Gemini response");
  }

  return text
    .split("\n")
    .map((q) => q.trim())
    .filter((q) => q.length > 0);
}


/**
 * Generate TTS audio for a question
 */
async function textToSpeech(question) {
  // Use live API (bi-directional) to produce speech in response
  const session = await aiClient.live.connect({
    model: "gemini-2.5-flash",  // model must support live / audio output
    config: {
      responseModalities: [Modality.AUDIO, Modality.TEXT],
      speechConfig: {
        // you can configure voice settings etc.
      }
    },
    callbacks: {
      onopen: () => {},
      onmessage: (msg) => {
        // We'll handle messages below
      },
      onerror: (err) => {
        console.error("Live error:", err);
      },
      onclose: () => {}
    }
  });

  // Send the question as content
  session.sendClientContent({
    turns: [
      { role: "user", parts: [{ text: question }] }
    ]
  });

  return new Promise((resolve, reject) => {
    session.callbacks = {
      onmessage: (msg) => {
        if (msg.speechUpdate && msg.speechUpdate.audio) {
          // audio is an ArrayBuffer / bytes
          session.close();
          resolve(msg.speechUpdate.audio);
        }
      },
      onerror: (err) => {
        reject(err);
      }
    };
  });
}

/**
 * Convert speech (audio) to text
 */
async function speechToText(audioBuffer) {
  // Use aiClient.models (or a speech recognition model) to transcribe audio
  // As of current SDK, there isn’t a direct speech recognition module in the same package
  // You may need a separate STT API (e.g., Google Speech-to-Text) or a Gemini feature if available.
  // Here is a placeholder:

  const response = await aiClient.models.generateContent({
    model: "gemini-2.5-flash",  // use a model that supports audio input if available
    contents: [
      { role: "user", parts: [
          { text: "Transcribe this audio" },
          { inlineData: { mimeType: "audio/mpeg", data: Buffer.from(audioBuffer).toString("base64") } }
        ]
      }
    ]
  });

  return response.candidates[0].text;
}

/**
 * Score a candidate’s answer
 */
async function scoreAnswer(question, answer, resumeData) {
  const prompt = `
Question: ${question}
Answer: ${answer}
Skills Required: ${resumeData.Skills.join(", ")}
Experience: ${resumeData.Experience}

Score the answer from 1–10 and give a short remark.
`;

  const response = await aiClient.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [{ role: "user", parts: [{ text: prompt }] }]
  });

  const text = response.candidates[0].text;
  const match = text.match(/(\d+)\s*(?:\/10)?\s*(?:Score)?\s*.*Remark[:\-]?\s*(.*)/s);
  const score = match ? parseInt(match[1]) : 0;
  const remark = match ? match[2].trim() : "";
  return { score, remark };
}

module.exports = {
  generateQuestions,
  textToSpeech,
  speechToText,
  scoreAnswer
};
