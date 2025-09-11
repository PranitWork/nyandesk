// jobService.js

async function jobfetch({ query = "", location = "", page = 1 } = {}) {
  const baseUrl = "https://api.adzuna.com/v1/api/jobs/in/search";
  const appId = process.env.ADZUNA_APP_ID;
  const appKey = process.env.ADZUNA_APP_KEY;

  const url = new URL(`${baseUrl}/${page}`);
  url.searchParams.append("app_id", appId);
  url.searchParams.append("app_key", appKey);
  if (query) url.searchParams.append("what", query);
  if (location) url.searchParams.append("where", location);
  url.searchParams.append("results_per_page", "20");
  url.searchParams.append("sort_by", "date");

  try {
    const res = await fetch(url.href);
    if (!res.ok) throw new Error(`API request failed: ${res.status}`);
    const data = await res.json();
    return data.results;
  } catch (err) {
    console.error("Error fetching jobs:", err.message);
    throw err;
  }
}


module.exports = { jobfetch };