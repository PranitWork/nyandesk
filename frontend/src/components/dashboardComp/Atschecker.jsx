import React, { useState } from "react";
import { FiDownload } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { asyncAtsChecker } from "../../store/actions/userActions";
import { toast } from "react-toastify";

export default function ResumeUploadForm() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const dispatch = useDispatch();

  const handleChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select a resume first");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setLoading(true);
      setResult(null);

      const response = await dispatch(asyncAtsChecker(formData));

      if (response?.success) {
        setResult(response.data);
      } else {
        toast.error(response?.message || "Upload failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full bg-gray-50 flex flex-col items-center px-4 py-6">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center tracking-tighter">
        Check Your Resume Score
      </h2>

      <form
        onSubmit={handleSubmit}
        className="shadow rounded-md bg-white w-full max-w-md p-4"
      >
        <label
          htmlFor="resume"
          className="flex flex-col items-center justify-center w-full h-40 border-2 border-blue-400 border-dashed rounded-lg cursor-pointer hover:bg-blue-50 transition"
        >
          <FiDownload className="text-3xl mb-2" />
          <p className="text-sm font-medium text-gray-700 text-center px-2">
            {file ? file.name : "Click To Select Resume"}
          </p>
          <input
            id="resume"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleChange}
            className="hidden"
          />
        </label>

        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>

      <div className="w-full mt-5 rounded-2xl bg-white p-4 shadow-lg border border-blue-500 tracking-tight">
        <p className="pb-2 font-semibold">Resume Details & Improvements</p>
        <hr className="text-gray-300 pb-4" />

        {loading && <p className="text-blue-500">Analyzing your resume...</p>}

        {!loading && result && (
          <div className="space-y-5">
            {/* Score */}
            <div>
              <h3 className="font-semibold text-lg">ATS Score</h3>
              <p className="text-xl font-bold text-green-600">
                {result.atsScore}%
              </p>
              <p className="text-sm text-gray-500">{result.message}</p>
            </div>

            {/* Suggestions */}
            {result.suggestions?.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg mb-2">Suggestions</h3>
                <ul className="list-disc list-inside">
                  {result.suggestions.map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
