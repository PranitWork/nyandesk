const axios = require("axios");
const fs = require("fs");
const FormData = require("form-data");

async function parseResume(filePath) {
  const form = new FormData();
  form.append("file", fs.createReadStream(filePath));   // <-- use 'file'

  try {
    const res = await axios.post(
      "https://api.apilayer.com/resume_parser/upload",
      form,
      {
        headers: {
          apikey: process.env.APILAYER_RESUME_PARSER_API_KEY,
          ...form.getHeaders(),
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      }
    );
    return res.data;
  } catch (err) {
    console.error("Status:", err.response?.status);
    console.error("Data:", err.response?.data || err.message);
    throw new Error(err.response?.data?.message || "Failed to parse resume");
  }
}

module.exports = { parseResume };
