const { jobfetch } = require( "../services/jobapi.services");


async function getjobs(req,res){
    const {query,location,page} = req.query;
    try{
        const jobs = await jobfetch({query,location,page});
        return res.status(200).json({jobs});
    }catch(err){
        return res.status(500).json({msg:"Server error"});
    }
}

module.exports={getjobs};