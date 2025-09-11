const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../model/user.model");

async function Register(req, res) {
  const { name, username, email, password } = req.body;

  if (!name || !username || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  try {
    // ✅ Use explicit field mapping
    const existingUser = await userModel.findOne({
      $or: [{ email: email }, { username: username }]
    });

    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      name,
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
    });

    return res.status(201).json({
      msg: "User registered successfully",
      user: newUser,
      token,
    });
  } catch (err) {
    console.error("Register Error:", err);
    return res.status(500).json({ msg: "Server error" });
  }
}


async function Login(req, res){
  try {
    const { email, password } = req.body;

    const existingToken = req.cookies.token;
    if (existingToken) {
      try {
        jwt.verify(existingToken, process.env.JWT_SECRET);
        return res.status(200).json({ msg: "User already logged in" });
      } catch {
        return res.status(400).json({ msg: "Invalid token, please log in again" });
    }
    }

    // 2️⃣ Validate input
    if (!email || !password) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    // 3️⃣ Find user
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ msg: "User does not exist" });
    }

    // 4️⃣ Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    // 5️⃣ Sign token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // 6️⃣ Send cookie & response
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000, // 1h
    });

    const { password: _, ...safeUser } = user.toObject();

    return res.status(200).json({
      msg: "User logged in successfully",
      user: safeUser,
      token,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Server error" });
  }
};

async function LogOut(req,res){
    try{
        cookies.remove("token");
        return res.status(200).json({msg:"User logged out successfully"});
    }catch(err){
        return res.status(500).json({msg:"Server error"});
    }
}

module.exports = {Register,Login,LogOut};