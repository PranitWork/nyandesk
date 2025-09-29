const { parseResume } = require("../api/resumeparse.services");
const { calculateATSSCore } = require("../services/ats.services");
const uploadImage = require("../services/storage.services");
const userModel = require("../model/user.model");

async function uploadAndParseAndGenerateATS(req, res) {
  try {
    const userId = req.user.id;
    if (!req.file) {
      return res.status(400).json({ message: "No resume uploaded" });
    }

    // 1️⃣ Upload resume to ImageKit
    const resumeUrl = await uploadImage(req.file.buffer, req.file.originalname);

    // 2️⃣ Parse resume using Affinda
    const parsed = await parseResume(resumeUrl);
    const data = parsed.data || {};

    // 3️⃣ Build resumeData object
    const resumeData = {
      rawText: data.rawText || "",
      name: data.name?.raw || "",
      email: data.emails?.[0] || "",
      phone: data.phoneNumbers?.[0] || "",
      address: data.location?.rawInput || "",
      skills: data.skills?.map((s) => s.name) || [],
      education: data.education || [],
      experience: data.workExperience || [],
      certifications: data.certifications || [],
      summary: data.summary || "",
      lastParsedAt: new Date(),
    };

    // 4️⃣ Generate ATS score
    const jobKeywords = req.body.jobKeywords || req.user.JobPreference?.split(" ") || [];
    const atsResult = calculateATSSCore(resumeData, jobKeywords);

    // 5️⃣ Save everything in DB
    const user = await userModel.findByIdAndUpdate(
      userId,
      {
        resumeUrl,
        resumeData,
        atsScore: atsResult.atsScore,
        atsSuggestions: atsResult.suggestions,
      },
      { new: true, runValidators: true }
    );

    // 6️⃣ Send combined response
    res.status(200).json({
      message: "Resume uploaded and ATS score generated successfully",
      resumeUrl: user.resumeUrl,
      resumeData: user.resumeData,
      atsScore: user.atsScore,
      suggestions: user.atsSuggestions,
    });
  } catch (error) {
    console.error("Error uploading/parsing resume + ATS:", error);
    res.status(500).json({
      message: "Error processing resume",
      error: error.message,
    });
  }
}

module.exports = { uploadAndParseAndGenerateATS };