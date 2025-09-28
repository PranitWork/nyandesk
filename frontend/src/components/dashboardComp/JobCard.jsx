import { FaRegClock, FaRupeeSign, FaMapMarkerAlt } from "react-icons/fa";
import { MdOutlineWorkHistory } from "react-icons/md";

function JobCard({ data, onViewMore }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-base font-semibold text-gray-800">
            {data.title.slice(0, 35) || "Job Title"}...
          </h2>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            {data.company?.display_name || "Company Name"}{" "}
            <MdOutlineWorkHistory className="text-blue-400 ml-2" size={12} />{" "}
            {data.contract_time || "N/A"}
          </p>
        </div>
      </div>

      {/* Meta info */}
      <div className="flex flex-wrap gap-3 mt-3 text-xs text-gray-600">
        <div className="flex items-center gap-1">
          <FaRegClock size={12} /> {data.experience || "0-0"} Yrs
        </div>
        <div className="flex items-center gap-1">
          <FaRupeeSign size={12} /> {data.salary_is_predicted || "0"}
        </div>
        <div className="flex items-center gap-1">
          <FaMapMarkerAlt size={12} /> {data.location?.display_name || "Remote"}
        </div>
      </div>

      {/* Description */}
      <div className="mt-3">
        <p className="text-xs text-gray-700">
          <span className="font-semibold">Description:</span>{" "}
          {data.description.slice(0, 100) || "Not specified"}...
        </p>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-xs text-gray-500">{data.created ? new Date(data.created).toLocaleDateString() : "N/A"}</span>
        <div className="flex gap-2">
          <a
            href={data.redirect_url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-600 cursor-pointer text-white text-xs px-3 py-1.5 rounded-lg hover:bg-blue-700"
          >
            Apply Job
          </a>
          <button
            onClick={() => onViewMore(data)}
            className="bg-gray-100 cursor-pointer text-gray-700 text-xs px-3 py-1.5 rounded-lg hover:bg-gray-200"
          >
            View More Info
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
