import React from "react";

 function JobDetails({ job }) {
  if (!job) return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      {/* Job Title and Company */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">{job.title}</h1>
        <p className="text-gray-600 mt-1">{job.company.display_name}</p>
        <p className="text-gray-500 text-sm mt-1">{job.location.area.join(", ")}</p>
      </div>

      {/* Salary */}
      <div className="mb-6 flex items-center space-x-2">
        <span className="text-gray-500 font-medium">Salary:</span>
        <span className="text-green-600 font-semibold text-lg">
          ₹{job.salary_min.toLocaleString()} - ₹{job.salary_max.toLocaleString()}
        </span>
      </div>

      {/* Job Type */}
      <div className="mb-6">
        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">
          {job.contract_time.replace("_", " ").toUpperCase()}
        </span>
      </div>

      {/* Job Description */}
      <div className="mb-6 overflow-y-scroll">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Job Description</h2>
        <p className="text-gray-600 whitespace-pre-line">{job.description}</p>
      </div>

      {/* Apply Button */}
      <div className="mt-8">
        <a
          href={job.redirect_url}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
        >
          Apply Now
        </a>
      </div>

      {/* Additional Info */}
      <div className="mt-10 border-t pt-4 text-gray-500 text-sm">
        <p><span className="font-medium">Category:</span> {job.category?.label || "N/A"}</p>
        <p><span className="font-medium">Posted On:</span> {new Date(job.created).toLocaleDateString()}</p>
        <p><span className="font-medium">Relevance Score:</span> {job.relevance}</p>
      </div>
    </div>
  );
}
export default JobDetails