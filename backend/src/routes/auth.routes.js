
const express= require("express");
const { Register, Login, LogOut, currentUser } = require("../controller/auth.controller");
const { isUserExists } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/register",Register);
router.post("/login",Login);
router.post("/logout",isUserExists,LogOut);
router.get("/current-user", isUserExists, currentUser);

router.get("/me", isUserExists, (req, res) => {
  res.json({ user: req.user }); 
});


module.exports = router;