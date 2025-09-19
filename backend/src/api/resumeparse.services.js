const axios = require("axios");

async function parseResume(resumeUrl) {
  const url = "https://api.affinda.com/v2/resumes";

  try {
    const response = await axios.post(
      url,
      { url: resumeUrl },   // send the URL instead of a file
      {
        headers: {
          Authorization: `Bearer ${process.env.AFFINDA_RESUME_PARSER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error parsing resume:",
      error.response?.data || error.message
    );
    throw error;
  }
}

module.exports = { parseResume };
