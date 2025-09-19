function calculateATSSCore(resumeData, jobKeywords = []) {
  let score = 0;
  const suggestions = [];

  if (resumeData.name && resumeData.email && resumeData.phone) score += 10;
  else suggestions.push("Include name, email, and phone.");

  if (resumeData.summary && resumeData.summary.length > 30) score += 10;
  else suggestions.push("Add a clear professional summary.");

  if (resumeData.skills && resumeData.skills.length) {
    const matchedSkills = resumeData.skills.filter(skill =>
      jobKeywords.map(k => k.toLowerCase()).includes(skill.toLowerCase())
    );
    const skillScore = Math.min((matchedSkills.length / (jobKeywords.length || 1)) * 30, 30);
    score += skillScore;
    if (skillScore < 20) suggestions.push("Add more relevant skills.");
  } else suggestions.push("Add skills relevant to the job.");

  if (resumeData.education?.length) score += 15;
  else suggestions.push("Include your education details.");

  if (resumeData.experience?.length) score += 25;
  else suggestions.push("Include work experience.");

  if (resumeData.certifications?.length) score += 10;

  return { atsScore: Math.round(score), suggestions };
}

module.exports = { calculateATSSCore };