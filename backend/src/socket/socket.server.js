// socket.server.js
const { Server } = require("socket.io");

function setupSocketServer(httpServer) {
  const io = new Server(httpServer, {
    cors: { origin: process.env.FRONTEND_ORIGIN || "*" }
  });

 io.on("connection", (socket) => {
  console.log("socket connected:", socket.id);

  // Start interview
  socket.on("startInterview", async ({ sessionId }) => {
    const interview = await InterviewModel.findOne({ sessionId });
    if (!interview) return socket.emit("error", "Interview not found");

    // send first question
    socket.emit("question", { index: 0, text: interview.questions[0].question });
  });

  // receive answer
  socket.on("answer", async ({ sessionId, questionIndex, answer }) => {
    const interview = await InterviewModel.findOne({ sessionId });
    if (!interview) return socket.emit("error", "Interview not found");

    interview.questions[questionIndex].answer = answer;
    await interview.save();

    // send next question if exists
    const nextIndex = questionIndex + 1;
    if (nextIndex < interview.questions.length) {
      socket.emit("question", { index: nextIndex, text: interview.questions[nextIndex].question });
    } else {
      socket.emit("finished", "Interview completed");
    }
  });

  socket.on("disconnect", () => {
    console.log("socket disconnected", socket.id);
  });
});
}

module.exports = setupSocketServer;
