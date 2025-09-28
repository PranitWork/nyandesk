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
async function jobRecommendation(user, { page = 1, limit = 100 } = {}) {
  const cacheKey = `${user._id}-${page}-${limit}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  // Build query using JobPreference + Experience
  const query = [user.JobPreference, user.Experience ? `${user.Experience} years` : ""]
    .filter(Boolean)
    .join(" ");
  const location = user.CityPreference || "";

  const results = [];
  const pagesToFetch = Math.ceil(limit / 50);

  for (let i = 0; i < pagesToFetch; i++) {
    const currentPage = page + i;
    const response = await jobfetch({ query, location, page: currentPage });
    const jobs = response?.results || [];

    if (!jobs.length) break;
    results.push(...jobs);
  }

  // Compute relevance and sort
  const scored = results
    .map((job) => ({ ...job, relevance: computeScore(user, job) }))
    .sort((a, b) => b.relevance - a.relevance);

  const pagedJobs = scored.slice(0, limit);

  if (pagedJobs.length) cache.set(cacheKey, pagedJobs);

  return pagedJobs;
}

module.exports = { jobRecommendation };
