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
  Experience: {
    type: String,
    default: "",
  },
  resume:{
    type: String,
    default: "",
  },
  resumeReports: [
  {
  date: { type: Date, default: Date.now },
    resumescore: Number,
    tips: [String]
  }
],
resumeData: {
  rawText: { type: String, default: "" },        // full text from parser
  skills: { type: [String], default: [] },
  education: [
    {
      degree: String,
      institution: String,
      year: String
    }
  ],
  experience: [
    {
      company: String,
      position: String,
      start: String,
      end: String,
      description: String
    }
  ],
  lastParsedAt: { type: Date }
},
atsScore: { type: Number, default: 0 },
atsSuggestions: { type: [String], default: [] }

},{
  timestamps: true,
});


const userModel = new mongoose.model("user", userSchema);

module.exports = userModel;