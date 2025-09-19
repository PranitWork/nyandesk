const { jobfetch } = require( "../api/jobapi.services");
const userModel = require("../model/user.model");
const { jobRecommendation } = require("../services/recommendation.service");



async function getjobs(req, res) {
  try {
    const query = req.query.query || "";
    const location = req.query.location || "";
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20; // default 20 per page

    const jobs = await jobfetch({ query, location, page });

    // Adzuna already supports `results_per_page`, so slice if needed
    const paginated = jobs.slice(0, limit);

    res.status(200).json({
      success: true,
      page,
      limit,
      count: paginated.length,
      results: paginated,
    });
  } catch (err) {
    console.error("Error fetching jobs:", err);
    res.status(500).json({ msg: "Server error" });
  }
}

// controller/jobs.controller.js
async function recommendJobs(req, res) {
  try {
    const userId = req.user.id;
    const user = await userModel.findById(userId);

    if (!user) return res.status(404).json({ error: "User not found" });

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;

    const jobs = await jobRecommendation(user, { page, limit });

    return res.json({ success: true, page, limit, count: jobs.length, results: jobs });
  } catch (err) {
    console.error("Error recommending jobs:", err);
    res.status(500).json({ error: "Failed to fetch job recommendations" });
  }
}




module.exports={getjobs, recommendJobs};