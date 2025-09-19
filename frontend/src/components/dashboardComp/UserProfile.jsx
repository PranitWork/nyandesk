import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaCamera, FaTimes } from "react-icons/fa";

function UserProfile() {
  const { register, handleSubmit, setValue } = useForm();
  const [profilePic, setProfilePic] = useState(null);
  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(URL.createObjectURL(file));
      setValue("profilePic", file); 
    }
  };

  const handleSkillKeyDown = (e) => {
    if (e.key === "Enter" && skillInput.trim() !== "") {
      e.preventDefault();
      if (!skills.includes(skillInput.trim())) {
        const newSkills = [...skills, skillInput.trim()];
        setSkills(newSkills);
        setValue("skills", newSkills); 
      }
      setSkillInput("");
    }
  };

  const removeSkill = (skill) => {
    const newSkills = skills.filter((s) => s !== skill);
    setSkills(newSkills);
    setValue("skills", newSkills); 
  };

  const onSubmit = (data) => {
    data.skills = skills; 
    console.log("Form Data:", data);

    // Example: send to backend
    // const formData = new FormData();
    // Object.entries(data).forEach(([key, value]) => {
    //   formData.append(key, value);
    // });
    // axios.post("/api/profile", formData)
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white shadow-xl/20 rounded-2xl overflow-hidden">
        {/* Header Section */}
        <div className="bg-blue-500 h-32 relative flex items-center justify-center">
          <div className="absolute -bottom-12">
            <div className="relative">
              <img
                src={profilePic || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 bg-white border-white object-cover"
              />
              <label
                htmlFor="profilePic"
                className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white p-2 rounded-full cursor-pointer"
              >
                <FaCamera size={16} />
              </label>
              <input
                id="profilePic"
                type="file"
                className="hidden"
                accept="image/*"
                {...register("profilePic")}
                onChange={handleImageUpload}
              />
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="p-8 mt-14">
          <h2 className="text-lg font-semibold mb-6">Profile Details</h2>
          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                {...register("fullName")}
                type="text"
                placeholder="Enter Full Name"
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                {...register("email")}
                type="email"
                placeholder="example@gmail.com"
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            {/* Username */}
            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <input
                {...register("username")}
                type="text"
                placeholder="enter username"
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Phone Number
              </label>
              <input
                {...register("phone")}
                type="text"
                placeholder="xxxxxxxxxx"
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            {/* City Preference */}
            <div>
              <label className="block text-sm font-medium mb-1">
                City Preference
              </label>
              <input
                {...register("cityPreference")}
                type="text"
                placeholder="Enter City Preference"
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            {/* Job Preference */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Job Preference
              </label>
              <input
                {...register("jobPreference")}
                type="text"
                placeholder="Enter Job Preference"
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            {/* Job Title */}
            <div>
              <label className="block text-sm font-medium mb-1">Job Title</label>
              <input
                {...register("jobTitle")}
                type="text"
                placeholder="Job Title"
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-medium mb-1">Experience</label>
              <select
                {...register("experience")}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              >
                <option>Fresher</option>
                <option>Less than 1 Year</option>
                <option>1 Year +</option>
                <option>2 Years +</option>
                <option>3 Years +</option>
                <option>5+ Years</option>
              </select>
            </div>

            {/* Skills */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Skills</label>
              <div className="w-full border rounded-lg px-3 py-2 flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="flex items-center bg-gray-200 px-3 py-1 rounded-full text-sm"
                  >
                    {skill}
                    <button
                      type="button"
                      className="ml-2 text-red-500 hover:text-red-700"
                      onClick={() => removeSkill(skill)}
                    >
                      <FaTimes size={12} />
                    </button>
                  </span>
                ))}
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={handleSkillKeyDown}
                  placeholder="Type a skill and press Enter"
                  className="flex-1 border-none outline-none px-2 py-1"
                />
              </div>
            </div>

            {/* Resume */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Resume</label>
              <input
                {...register("resume")}
                type="file"
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            {/* Save Button */}
            <div className="md:col-span-2 flex justify-center">
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
