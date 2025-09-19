import {
  FaRegClock,
  FaRupeeSign,
  FaMapMarkerAlt,
  FaStar,
} from "react-icons/fa";

function JobCard() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4 border hover:shadow-md transition">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-base font-semibold text-gray-800">
            Fullstack Developer
          </h2>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            MOTM Technologies <FaStar className="text-yellow-400" size={12} />{" "}
            3.7 | 24 Reviews
          </p>
        </div>
        <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center">
          <span className="text-purple-700 font-medium text-sm">M</span>
        </div>
      </div>

      {/* Meta info */}
      <div className="flex flex-wrap gap-3 mt-3 text-xs text-gray-600">
        <div className="flex items-center gap-1">
          <FaRegClock size={12} /> 2-7 Yrs
        </div>
        <div className="flex items-center gap-1">
          <FaRupeeSign size={12} /> 2.5-6 Lacs PA
        </div>
        <div className="flex items-center gap-1">
          <FaMapMarkerAlt size={12} /> Pune
        </div>
      </div>

      {/* Requirements */}
      <div className="mt-3">
        <p className="text-xs text-gray-700">
          <span className="font-semibold">Requirements: Must-Haves:</span> 2.5+
          years of experience in full-stack development.
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-3">
        {[
          "Machine Learning",
          "Python",
          "AI/ML",
          "MongoDB",
          "React.Js",
          "air table",
          "Langchain",
        ].map((tag) => (
          <span
            key={tag}
            className="bg-gray-100 text-gray-700 px-2 py-1 text-xs rounded-full hover:bg-gray-200"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-between items-center mt-4">
        <span className="text-xs text-gray-500">1 Day Ago</span>
        <div className="flex gap-2">
          <button className="bg-blue-600 cursor-pointer text-white text-xs px-3 py-1.5 rounded-lg hover:bg-blue-700">
            Apply Job
          </button>
          <button className="bg-gray-100 cursor-pointer text-gray-700 text-xs px-3 py-1.5 rounded-lg hover:bg-gray-200">
            View More Info
          </button>
        </div>
      </div>
    </div>
  );
}
export default JobCard;
