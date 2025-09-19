const { jobfetch } = require("../api/jobapi.services");
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 300 }); 


function computeScore(user, job) {
  let score = 0;
  // City
  if (user.CityPreference && job.location?.display_name) {
    const city = user.CityPreference.toLowerCase();
    if (job.location.display_name.toLowerCase().includes(city)) score += 3;
  }

  if (
    user.JobPreference &&
    job.title?.toLowerCase().includes(user.JobPreference.toLowerCase())
  ) {
    score += 3;
  }
  if (
    user.JobTitle &&
    job.title?.toLowerCase().includes(user.JobTitle.toLowerCase())
  ) {
    score += 3;
  }

  if (Array.isArray(user.Skills) && job.description) {
    const desc = job.description.toLowerCase();
    user.Skills.forEach((skill) => {
      if (desc.includes(skill.toLowerCase())) score += 1;
    });
  }

  return score;
}

async function jobRecommendation(user, { page = 1, limit = 10 } = {}) {
  const cacheKey = `${user._id}-${page}-${limit}`;
  const cached = cache.get(cacheKey);
  if (cached) return cached;

  const query = [user.JobPreference, user.Experience]
    .filter(Boolean)
    .join(" ");
  const location = user.CityPreference || "";

  const jobs = await jobfetch({ query, location, page });

  const scored = jobs.map(job => ({
    ...job,
    relevance: computeScore(user, job),
  }));
  scored.sort((a, b) => b.relevance - a.relevance);

  const sliced = scored.slice(0, limit);
  cache.set(cacheKey, sliced);
  return sliced;
}

module.exports = { jobRecommendation };
