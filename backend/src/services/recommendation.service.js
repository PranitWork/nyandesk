const { jobfetch } = require("../api/jobapi.services");
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 300 });

// ✅ Compute a relevance score based on multiple factors
function computeScore(user, job) {
  let score = 0;

  // Match City / Location
  if (user.CityPreference && job.location?.display_name) {
    const city = user.CityPreference.toLowerCase();
    if (job.location.display_name.toLowerCase().includes(city)) score += 3;
  }

  // Match Job Preference
  if (user.JobPreference && job.title?.toLowerCase().includes(user.JobPreference.toLowerCase())) {
    score += 3;
  }

  // Match Current Job Title
  if (user.JobTitle && job.title?.toLowerCase().includes(user.JobTitle.toLowerCase())) {
    score += 2;
  }

  // Match Skills in Job Description
  if (Array.isArray(user.Skills) && job.description) {
    const desc = job.description.toLowerCase();
    user.Skills.forEach((skill) => {
      if (desc.includes(skill.toLowerCase())) score += 1;
    });
  }

  // ✅ Match Experience (approx check in job description/title)
  if (user.Experience && job.description) {
    const desc = job.description.toLowerCase();
    const expRegex = new RegExp(`\\b${user.Experience}\\s*year`, "i"); // e.g., "3 years"
    if (expRegex.test(desc)) score += 3;
  }

  return score;
}

// ✅ Main Recommendation Function
async function jobRecommendation(user, { page = 1, limit = 20 } = {}) {
  // 🔹 Only use JobPreference for API query (no years)
  const query = user.JobPreference || "";
  const location = user.CityPreference || "";

  let results = [];
  // 🔹 Fetch at least 2 pages to get enough jobs
  const pagesToFetch = Math.max(2, Math.ceil((page * limit) / 50));

  for (let i = 1; i <= pagesToFetch; i++) {
    const jobs = await jobfetch({ query, location, page: i });
    if (!jobs.length) break;
    results.push(...jobs);
  }

  // 🔹 Score jobs
  const scored = results
    .map((job) => ({ ...job, relevance: computeScore(user, job) }))
    .sort((a, b) => b.relevance - a.relevance);

  // 🔹 If all relevance = 0 (no matches), still return jobs (fallback)
  let finalResults = scored;
  if (scored.every((job) => job.relevance === 0)) {
    console.warn("⚠️ No strong matches found, falling back to raw jobs");
    finalResults = results;
  }

  // 🔹 Proper pagination
  const start = (page - 1) * limit;
  const end = page * limit;

  return finalResults.slice(start, end);
}




module.exports = { jobRecommendation };
