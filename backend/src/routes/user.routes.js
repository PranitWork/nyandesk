const express= require("express");

const { userProfileCreate } = require("../controller/user.controller");
const { isUserExists } = require("../middleware/auth.middleware");

const router = express.Router();


router.post("/profile",isUserExists, userProfileCreate);
router.patch("/profile",isUserExists ,userProfileCreate);

module.exports = router;
