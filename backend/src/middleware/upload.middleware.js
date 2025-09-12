const multer = require("multer");

// 3 MB in bytes
const MAX_SIZE = 3 * 1024 * 1024;

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.fieldname === "resume") {
    // Resume → only PDF
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are allowed for resume"), false);
    }
  }

  if (file.fieldname === "profilePic") {
    // Profile picture → allow images only
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed for profilePic"), false);
    }
  }

  cb(null, true);
};

const upload = multer({
  dest:"uploads/",
  storage,
  limits: { fileSize: MAX_SIZE },
  fileFilter,
});

module.exports = upload;