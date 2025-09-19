import JobCard from "./JobCard";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { GoLocation } from "react-icons/go";
const JobsInfo = () => {
     const [activeTab, setActiveTab] = useState("all");

  const handleSubmit = (e) => {
    e.preventDefault(); 
  };
  return (
    <div className="w-full h-screen">
     <div className="bg-white border my-3 shadow-md rounded-xl p-4 w-full max-w-5xl mx-auto">
  {/* Search + Location Form */}
  <form
    onSubmit={handleSubmit}
    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_200px_auto] gap-3"
  >
    {/* Search Input */}
    <div className="flex items-center border rounded-lg px-3 py-2 shadow-sm">
      <FiSearch className="text-gray-500 mr-2" size={18} />
      <input
        type="text"
        placeholder="Search Jobs"
        className="w-full outline-none text-sm"
      />
    </div>

    {/* Location Input */}
    <div className="flex items-center border rounded-lg px-3 py-2 shadow-sm">
      <GoLocation className="text-gray-500 mr-2" size={18} />
      <input
        type="text"
        placeholder="Location"
        className="w-full outline-none text-sm"
      />
    </div>

    {/* Search Button */}
    <button
      type="submit"
      className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 transition w-full sm:w-auto"
    >
      Search
    </button>
  </form>

  {/* Tabs Section */}
  <div className="flex gap-3 mt-4">
    <button
      type="button"
      onClick={() => setActiveTab("all")}
      className={`px-4 py-1 rounded-lg border text-sm shadow-sm transition ${
        activeTab === "all"
          ? "bg-black text-white"
          : "bg-white text-black"
      }`}
    >
      All
    </button>
    <button
      type="button"
      onClick={() => setActiveTab("recommended")}
      className={`px-4 py-1 rounded-lg border text-sm shadow-sm transition ${
        activeTab === "recommended"
          ? "bg-black text-white"
          : "bg-white text-black"
      }`}
    >
      Recommended
    </button>
  </div>
</div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-2">
  <JobCard />
  <JobCard />
  <JobCard />
  <JobCard />
  <JobCard />
</div>
    </div>
  );
};

export default JobsInfo;
