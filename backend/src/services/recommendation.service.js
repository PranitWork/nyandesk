const { jobfetch } = require("../api/jobapi.services");
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 300 });

function computeScore(user, job) {
  let score = 0;

  // City preference
  if (user.CityPreference && job.location?.display_name) {
    const city = user.CityPreference.toLowerCase();
    if (job.location.display_name.toLowerCase().includes(city)) score += 3;
  }

  // Job preference
  if (
    user.JobPreference &&
    job.title?.toLowerCase().includes(user.JobPreference.toLowerCase())
  ) {
    score += 3;
  }

  // Job title
  if (
    user.JobTitle &&
    job.title?.toLowerCase().includes(user.JobTitle.toLowerCase())
  ) {
    score += 3;
  }

  // Skills
  if (Array.isArray(user.Skills) && job.description) {
    const desc = job.description.toLowerCase();
    user.Skills.forEach((skill) => {
      if (desc.includes(skill.toLowerCase())) score += 1;
    });
  }

  return score;
}

async function jobRecommendation(user, { page = 1, limit = 100 } = {}) {
  const cacheKey = `${user._id}-${page}-${limit}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  const query = [user.JobPreference, user.Experience].filter(Boolean).join(" ");
  const location = user.CityPreference || "";

  const results = [];
  const pagesToFetch = Math.ceil(limit / 50); // Adzuna max 50 per page

  for (let i = 0; i < pagesToFetch; i++) {
    const currentPage = page + i;
    const jobs = await jobfetch({ query, location, page: currentPage });

    if (!jobs.length) break; // no more jobs
    results.push(...jobs);
  }

  // Compute relevance and sort
  const scored = results
  .map((job) => ({ ...job, relevance: computeScore(user, job) }))
  .sort((a, b) => b.relevance - a.relevance);

const start = (page - 1) * limit;
const end = start + limit;
const pagedJobs = scored.slice(start, end);

cache.set(cacheKey, pagedJobs);
return pagedJobs;
}

module.exports = { jobRecommendation };
