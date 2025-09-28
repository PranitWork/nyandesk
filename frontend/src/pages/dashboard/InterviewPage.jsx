import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

function InterviewPage() {
  const [isInterviewStarted, setIsInterviewStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [mediaStream, setMediaStream] = useState(null);
  const videoRef = useRef(null);

  const userData = useSelector((state) => state.userReducer.users);
  const resumeData = userData.resumeData || {};

  // Countdown timer
  useEffect(() => {
    let timer;
    if (isInterviewStarted && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isInterviewStarted, timeLeft]);

  // Start interview (mic + cam)
  const startInterview = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setMediaStream(stream);
      setIsInterviewStarted(true);
      if (videoRef.current) videoRef.current.srcObject = stream;
    } catch (err) {
      console.error("Permission denied:", err);
      alert("Please allow camera & microphone access.");
    }
  };

  // Format time
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-6">
        {/* Resume Summary */}
        {!isInterviewStarted && (
          <div>
            <h1 className="text-2xl font-bold mb-4">Resume Summary</h1>

            {/* Raw Text Preview */}
            <div className="bg-gray-100 rounded-lg p-4 mb-4 max-h-48 overflow-y-auto">
              <pre className="whitespace-pre-wrap text-gray-700 text-sm">
                {resumeData.rawText?.slice(0, 2000)}...
              </pre>
            </div>

            {/* Skills as tags */}
            <h2 className="text-lg font-semibold mb-2">Top Skills</h2>
            <div className="flex flex-wrap gap-2 mb-6">
              {resumeData?.skills?.slice(0, 10).map((skill, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>

            <button
              onClick={startInterview}
              className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
            >
              Start Interview
            </button>
          </div>
        )}

        {/* Interview Mode */}
        {isInterviewStarted && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left: Video + Timer */}
            <div className="flex flex-col items-center">
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="rounded-xl shadow-lg w-full h-72 object-cover"
              />
              <p className="mt-4 text-lg font-bold text-red-600">
                Time Left: {formatTime(timeLeft)}
              </p>
            </div>

            {/* Right: Q&A */}
            <div className="flex flex-col justify-between">
              <div className="bg-gray-100 rounded-xl p-4 h-72 overflow-y-auto">
                <p className="text-gray-600 italic">AI Question:</p>
                <p className="font-semibold text-gray-800 mt-1">
                  Tell me about your experience with React.
                </p>

                <p className="text-gray-600 italic mt-4">Your Answer:</p>
                <p className="text-gray-700">
                  (Voice answer will be transcribed here...)
                </p>
              </div>
              <button
                onClick={() => setIsInterviewStarted(false)}
                className="mt-4 px-6 py-3 bg-red-600 text-white rounded-xl shadow hover:bg-red-700 transition"
              >
                End Interview
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default InterviewPage;
