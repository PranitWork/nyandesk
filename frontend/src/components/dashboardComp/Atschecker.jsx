import React, { useState } from "react";
import { FiDownload } from "react-icons/fi";

export default function ResumeUploadForm() {
  const [file, setFile] = useState(null);

  const handleChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle upload here
  };

  return (
    <div className="w-full flex flex-col items-center px-4 py-6">
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
          className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded"
        >
          Upload
        </button>
      </form>
      <div className="w-full mt-5 rounded-2xl bg-white p-4 shadow-lg border border-blue-500 tracking-tight">
        <p className="pb-2">Reumse Details & Improvements</p>
        <hr className="text-gray-300 pb-4" />
      </div>
    </div>
  );
}
