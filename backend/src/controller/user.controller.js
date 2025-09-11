const jwt =require( "jsonwebtoken");
const userModel =require( "../model/user.model");


async function userProfileCreate(req, res) {
  try {
    const { profilePic, phone, CityPreference, JobPreference, Skills, JobTitle, Experiance, resume } = req.body;

    const user = req.user;

    user.profilePic = profilePic ?? user.profilePic;
    user.phone = phone ?? user.phone;
    user.CityPreference = CityPreference ?? user.CityPreference;
    user.JobPreference = JobPreference ?? user.JobPreference;
    user.Skills = Skills ?? user.Skills;
    user.JobTitle = JobTitle ?? user.JobTitle;
    user.Experiance = Experiance ?? user.Experiance;
    user.resume = resume ?? user.resume;
    await user.save();

    return res.status(200).json({
      msg: "Profile updated successfully",
      user,
    });
  } catch (err) {
    console.error("userProfileCreate error:", err);
    return res.status(500).json({ msg: "Server error", error: err.message });
  }
}



module.exports = { userProfileCreate };