// services/jobService.js
const axios = require("axios");

async function jobfetch({ query = "", location = "", page = 1, limit = 50 } = {}) {
  const baseUrl = "https://api.adzuna.com/v1/api/jobs/in/search";
  const appId = process.env.ADZUNA_APP_ID;
  const appKey = process.env.ADZUNA_APP_KEY;

  const url = `${baseUrl}/${page}`;

  const params = {
    app_id: appId,
    app_key: appKey,
    results_per_page: limit,
    sort_by: "date",
  };

  if (query) params.what = query;
  if (location) params.where = location;

  try {
    const { data } = await axios.get(url, { params });
    return data.results; // array of job postings
  } catch (err) {
    console.error("Error fetching jobs:", err.response?.data || err.message);
    throw new Error("Failed to fetch jobs");
  }
}

module.exports = { jobfetch };
