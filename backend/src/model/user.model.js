const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    default: "",
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  phone: {
    type: String,
    default: "",
  },
  CityPreference: {
    type: String,
    default: "",
  },
  JobPreference: {
    type: String,
    default: "",
  },
  Skills: {
    type: [String],
    default: [],
  },
  JobTitle: {
    type: String,
    default: "",
  },
  Experiance: {
    type: String,
    default: "",
  },
  resume:{
    type: String,
    default: "",
  }
},{
  timestamps: true,
});


const userModel = new mongoose.model("user", userSchema);

module.exports = userModel;