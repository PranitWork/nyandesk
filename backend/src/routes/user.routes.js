const express= require("express");
const upload = require("../middleware/upload.middleware")
const { userProfileCreate } = require("../controller/user.controller");
const { isUserExists } = require("../middleware/auth.middleware");

const router = express.Router();


router.post("/profile",isUserExists, upload.fields([
    {name:"profilePic", maxCount:1},    
    {name:"resume", maxCount:1}
]), userProfileCreate);
router.patch("/profile",isUserExists , upload.fields([
    {name:"profilePic", maxCount:1},
    {name:"resume", maxCount:1}
]),userProfileCreate);


module.exports = router;
