const jwt =require( "jsonwebtoken");
const userModel =require( "../model/user.model");
const uploadImage = require("../services/storage.services")

async function userProfileCreate(req, res) {
  try {
    const { name,email,username, phone, CityPreference, JobPreference, Skills, JobTitle, Experience } = req.body;

    const user = req.user;

      if (req.files?.profilePic) {
      const picFile = req.files.profilePic[0];
      const profilePicUrl = await uploadImage(picFile.buffer.toString("base64"), picFile.originalname);
      user.profilePic = profilePicUrl;
    }

    // If resume uploaded
    if (req.files?.resume) {
      const resumeFile = req.files.resume[0];
      const resumeUrl = await uploadImage(resumeFile.buffer.toString("base64"), resumeFile.originalname);
      user.resume = resumeUrl;
    }
    user.name = name ?? user.name;
    user.email = email ?? user.email;
    user.username = username ?? user.username;

    user.phone = phone ?? user.phone;
    user.CityPreference = CityPreference ?? user.CityPreference;
    user.JobPreference = JobPreference ?? user.JobPreference;
    user.Skills = Skills ?? user.Skills;
    user.JobTitle = JobTitle ?? user.JobTitle;
    user.Experience = Experience ?? user.Experience;
    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      user,
    });
  } catch (err) {
    console.error("userProfileCreate error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
}



module.exports = { userProfileCreate };