const { jobfetch } = require("../api/jobapi.services");
const userModel = require("../model/user.model");
const { jobRecommendation } = require("../services/recommendation.service");

// Helper to normalize page number
function parsePage(page) {
  const p = parseInt(page, 10);
  return isNaN(p) || p < 1 ? 1 : p;
}

// GET jobs with pagination
async function getjobs(req, res) {
  try {
    const query = req.query.query || "";
    const location = req.query.location || "";
    const page = parsePage(req.query.page);

    const jobs = await jobfetch({ query, location, page });

    res.status(200).json({
      success: true,
      page,
      count: jobs.length,
      results: jobs,
      hasNextPage: jobs.length === 50, // Adzuna max 50 per page
      nextPage: jobs.length === 50 ? page + 1 : null,
    });
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).json({ msg: "Server error" });
  }
}

// GET recommended jobs with pagination
async function recommendJobs(req, res) {
  try {
    const userId = req.user.id;
    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const page = parsePage(req.query.page);
    const jobs = await jobRecommendation(user, { page });
    console.log(jobs)
    res.status(200).json({
      success: true,
      page,
      count: jobs.length,
      results: jobs,
      hasNextPage: jobs.length === 50,
      nextPage: jobs.length === 50 ? page + 1 : null,
    });
    console.log(jobs)
  } catch (err) {
    console.error("Error recommending jobs:", err);
    res.status(500).json({ error: "Failed to fetch job recommendations" });
  }
}

// POST search jobs with pagination
async function searchJobs(req, res) {
  try {
    const { jobTitle, location, page } = req.body;
    const currentPage = parsePage(page);

    const jobs = await jobfetch({ query: jobTitle, location, page: currentPage });

    res.status(200).json({
      success: true,
      page: currentPage,
      count: jobs.length,
      results: jobs,
      hasNextPage: jobs.length === 50,
      nextPage: jobs.length === 50 ? currentPage + 1 : null,
    });
  } catch (err) {
    console.error("Error searching jobs:", err);
    res.status(500).json({ msg: "Server error" });
  }
}

module.exports = { searchJobs, getjobs, recommendJobs };
