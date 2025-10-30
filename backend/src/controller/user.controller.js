const { uploadImage, deleteImage } = require("../services/storage.services");

async function userProfileCreate(req, res) {
  try {
    const {
      name,
      email,
      username,
      phone,
      CityPreference,
      JobPreference,
      Skills,
      JobTitle,
      Experience,
    } = req.body;

    const user = req.user;

    // === Profile Picture Upload ===
    if (req.files?.profilePic?.length > 0) {
      const picFile = req.files.profilePic[0];
      const base64 = `data:${picFile.mimetype};base64,${picFile.buffer.toString("base64")}`;

      // Delete old profile picture from ImageKit
      if (user.profilePicFileId) {
        const deleted = await deleteImage(user.profilePicFileId);
        if (!deleted) {
          return res.status(400).json({
            message: "Failed to delete old profile picture from ImageKit",
          });
        }
      }

      // Upload new picture
      const uploadedPic = await uploadImage(base64, picFile.originalname);
      if (!uploadedPic || !uploadedPic.url) {
        return res.status(400).json({
          message: "Profile picture upload failed",
        });
      }

      user.profilePic = uploadedPic.url;
      user.profilePicFileId = uploadedPic.fileId;
    }

    // === Resume Upload ===
    if (req.files?.resume?.length > 0) {
      const resumeFile = req.files.resume[0];
      const base64 = `data:${resumeFile.mimetype};base64,${resumeFile.buffer.toString("base64")}`;

      // Delete old resume from ImageKit
      if (user.resumeFileId) {
        const deleted = await deleteImage(user.resumeFileId);
        if (!deleted) {
          return res.status(400).json({
            message: "Failed to delete old resume from ImageKit",
          });
        }
      }

      // Upload new resume
      const uploadedResume = await uploadImage(base64, resumeFile.originalname);
      if (!uploadedResume || !uploadedResume.url) {
        return res.status(400).json({
          message: "Resume upload failed",
        });
      }

      user.resume = uploadedResume.url;
      user.resumeFileId = uploadedResume.fileId;
    }

    // === Update Text Fields ===
    Object.assign(user, {
      name: name ?? user.name,
      email: email ?? user.email,
      username: username ?? user.username,
      phone: phone ?? user.phone,
      CityPreference: CityPreference ?? user.CityPreference,
      JobPreference: JobPreference ?? user.JobPreference,
      Skills: Skills ?? user.Skills,
      JobTitle: JobTitle ?? user.JobTitle,
      Experience: Experience ?? user.Experience,
    });

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      user,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server error while updating profile",
      error: err.message,
    });
  }
}

module.exports = { userProfileCreate };
