const { GoogleGenAI } =require( "@google/genai");
const fs = require("fs");
const path = require("path");
const ai = new GoogleGenAI({});

// ttt

async function ttt(resumeData) {
    const prompt = `Generate 5 interview questions for this resume:\n${JSON.stringify(resumeData)}`;

  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
       contents: [
      {
        type: "text",   // must include type
        text: prompt     // must include text
      }
    ],
  });
  console.log(response.text);
   return response.text.split("\n").filter(Boolean);
}


async function generateQuestionAudio(questionText, sessionId, questionIndex) {
  const outputFile = path.join(__dirname, `../tmp/${sessionId}-${questionIndex}.wav`);

  const response = await ai.audio.speech.create({
    model: "gemini-2.0-small",
    voice: "alloy",
    input: questionText,
  });

  const buffer = Buffer.from(await response.arrayBuffer());
  fs.writeFileSync(outputFile, buffer);

  return outputFile;
}




module.exports = { ttt , generateQuestionAudio};
