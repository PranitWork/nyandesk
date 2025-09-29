import JobCard from "./JobCard";
import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { GoLocation } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  asyncGetAllJobs,
  asyncRecommendJobs,
  asyncSearchjob,
} from "../../store/actions/userActions";

import Loader from "./Loader";

const JobsInfo = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(50);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [searchFormData, setSearchFormData] = useState(null);

  const [jobsCache, setJobsCache] = useState({
    all: [],
    recommended: [],
    search: [],
  });

  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  const allJobsRedux =
    useSelector((state) => state.userReducer.jobs?.results) || [];
  const recommendJobsRedux =
    useSelector((state) => state.userReducer.recommendJobs?.results) || [];
  const searchJobsRedux =
    useSelector((state) => state.userReducer.searchJobs?.results) || [];

  // Modal state
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedJob(null);
    setIsModalOpen(false);
  };

  // Unified fetch jobs function
  const fetchJobs = async (tab, page = 1, formData = null) => {
    if (isFetching) return;
    setIsFetching(true);

    try {
      let response;
      if (tab === "all") {
        response = await dispatch(asyncGetAllJobs(page, jobsPerPage));
      } else if (tab === "recommended") {
        response = await dispatch(asyncRecommendJobs(page, jobsPerPage));
      } else if (tab === "search") {
        response = await dispatch(
          asyncSearchjob(formData || searchFormData, page, jobsPerPage)
        );
      }

      if (response.success) {
        setJobsCache((prev) => ({
          ...prev,
          [tab]:
            page === 1
              ? response.data
              : [...(prev[tab] || []), ...response.data],
        }));
        setHasNextPage(response.hasNextPage);
        setCurrentPage(page);
      }
    } finally {
      setIsFetching(false);
    }
  };

  // Initial fetch for all + recommended
  useEffect(() => {
    fetchJobs("all", 1);
    fetchJobs("recommended", 1);
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
    reset();
    setJobsCache((prev) => ({ ...prev, [tab]: [] }));
    fetchJobs(tab, 1);
  };

  const onSearch = async (formData) => {
    setActiveTab("search");
    setSearchFormData(formData);
    setCurrentPage(1);
    setJobsCache((prev) => ({ ...prev, search: [] }));
    await fetchJobs("search", 1, formData);
  };

  // Infinite scroll for all tabs
  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
      if (bottom && hasNextPage && !isFetching) {
        const formData = activeTab === "search" ? searchFormData : null;
        fetchJobs(activeTab, currentPage + 1, formData);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeTab, currentPage, hasNextPage, isFetching, searchFormData]);

  const displayedJobs = jobsCache[activeTab] || [];

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Search Form */}
      <div className="bg-white border my-3 shadow-md rounded-xl p-4 w-full max-w-5xl mx-auto">
        <form
          onSubmit={handleSubmit(onSearch)}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_200px_auto] gap-3"
        >
          <div className="flex items-center border rounded-lg px-3 py-2 shadow-sm">
            <FiSearch className="text-gray-500 mr-2" size={18} />
            <input
              type="text"
              {...register("jobTitle")}
              placeholder="Search Jobs"
              className="w-full outline-none text-sm"
            />
          </div>

          <div className="flex items-center border rounded-lg px-3 py-2 shadow-sm">
            <GoLocation className="text-gray-500 mr-2" size={18} />
            <input
              type="text"
              {...register("location")}
              placeholder="Location"
              className="w-full outline-none text-sm"
            />
          </div>

          <button
            type="submit"
            className="cursor-pointer px-5 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700 transition w-full sm:w-auto"
          >
            Search
          </button>
        </form>

        {/* Tabs */}
        <div className="flex gap-3 mt-4">
          {["all", "recommended"].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`px-4 py-1 cursor-pointer rounded-lg border text-sm shadow-sm transition ${
                activeTab === tab
                  ? "bg-black text-white"
                  : "bg-white text-black"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Jobs List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-2">
        {displayedJobs.length > 0 ? (
          displayedJobs.map((job, index) => (
            <JobCard
              key={`${job.id || job._id}-${index}`}
              data={job}
              onViewMore={openModal}
            />
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 text-sm">
            {activeTab === "recommended" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-2">
                {Array.from({ length: 20 }).map((_, index) => (
                  <Loader key={index} />
                ))}
              </div>
            ) : activeTab === "search" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-2">
                {Array.from({ length: 20 }).map((_, index) => (
                  <Loader key={index} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-2">
                {Array.from({ length: 20 }).map((_, index) => (
                  <Loader key={index} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Loader / End message */}
      <div className="flex justify-center my-6">
        {isFetching && (
          <p className="text-gray-500 text-sm">Loading more jobs...</p>
        )}
        {!hasNextPage && displayedJobs.length > 0 && (
          <p className="text-gray-400 text-xs">No more jobs to load</p>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl w-full max-w-3xl max-h-[85vh] overflow-y-auto relative p-6">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              &times;
            </button>

            {/* Job Title */}
            <h2 className="text-2xl font-semibold mb-2">{selectedJob.title}</h2>

            {/* Company Info */}
            <div className="flex items-center gap-4 mb-4">
              {selectedJob.company?.logo && (
                <img
                  src={selectedJob.company.logo}
                  alt={selectedJob.company.display_name}
                  className="w-12 h-12 rounded-lg object-cover border"
                />
              )}
              <div>
                <p className="font-medium">
                  {selectedJob.company?.display_name || "N/A"}
                </p>
                <p className="text-gray-500 text-sm">
                  {selectedJob.company?.industry || "Industry not specified"}
                </p>
              </div>
            </div>

            {/* Job Meta */}
            <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600">
              <p>
                <strong>Location:</strong>{" "}
                {selectedJob.location?.display_name || "N/A"}
              </p>
              <p>
                <strong>Contract:</strong> {selectedJob.contract_time || "N/A"}
              </p>
              <p>
                <strong>Salary Predicted:</strong>{" "}
                {selectedJob.salary_is_predicted || "0"}
              </p>
              <p>
                <strong>Posted:</strong>{" "}
                {new Date(selectedJob.created).toLocaleDateString()}
              </p>
              {selectedJob.category && (
                <p>
                  <strong>Category:</strong>{" "}
                  {selectedJob.category.label || selectedJob.category.tag}
                </p>
              )}
            </div>

            {/* Skills */}
            {selectedJob.skills && selectedJob.skills.length > 0 && (
              <div className="mb-4">
                <h3 className="font-medium mb-1">Skills Required</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="mb-4">
              <h3 className="font-medium mb-1">Job Description</h3>
              <p className="text-gray-700 text-sm whitespace-pre-line">
                {selectedJob.description || "No description provided."}
              </p>
            </div>

            {/* Responsibilities */}
            {selectedJob.responsibilities && (
              <div className="mb-4">
                <h3 className="font-medium mb-1">Responsibilities</h3>
                <ul className="list-disc list-inside text-gray-700 text-sm">
                  {selectedJob.responsibilities.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Requirements */}
            {selectedJob.requirements && (
              <div className="mb-4">
                <h3 className="font-medium mb-1">Requirements</h3>
                <ul className="list-disc list-inside text-gray-700 text-sm">
                  {selectedJob.requirements.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Benefits */}
            {selectedJob.benefits && (
              <div className="mb-4">
                <h3 className="font-medium mb-1">Benefits</h3>
                <ul className="list-disc list-inside text-gray-700 text-sm">
                  {selectedJob.benefits.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Apply Now Button */}
            <a
              href={selectedJob.redirect_url}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition mb-2"
            >
              Apply Now
            </a>

            {/* Additional Info */}
            {selectedJob.additional_info && (
              <p className="text-gray-500 text-xs mt-2">
                {selectedJob.additional_info}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobsInfo;
