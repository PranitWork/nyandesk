const { parseResume } = require("../services/resumeparse.services");
const fs = require("fs");
const userModel = require("../model/user.model")

async function uploadAndParseResume(req,res){
    try{
        const userId = req.user.id;
        const filePath = req.file.path;

        const parsed = await parseResume(filePath);
        const update = {
            resume: filePath,
            resumeData:{
                rawText: parsed.text || "",
                skills: parsed.skills || [],
                education: parsed.education || [],
                experience: parsed.experience || [],
                lastParsedAt: new Date(),
            },
        };
        const user = await userModel.findByIdAndUpdate(userId, update, {new:true});
        fs.unlink(filePath,(err)=>{
            if(err) console.error("Error deleting file:", err);
        });
        res.status(200).json({message:"Resume uploaded and parsed successfully", resumeData: user.resumeData});
    }catch(err){
        res.status(500).json({message:"Error uploading or parsing resume", error: err.message});
    }
}

module.exports = {uploadAndParseResume};