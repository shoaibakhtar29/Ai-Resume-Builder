import userResumeModel from "../models/userResumeModel.js";

// get user all resume

const getUserResume = async (req, res) => {
    try {
        const userResumeData = req.userresume;
        return res.json({ userResumeData })
    } catch (error) {
        console.log(error);
    }
}

// get user resume

const getResume = async (req, res) => {
    const id = req.params.resumeId;
    try {
        const resumeData = await userResumeModel.find({ resumeId: id });
        res.json({ success: true, resumeData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}


// add resume

const addResumeData = async (req, res) => {
    const { title, resumeId, userEmail, userName, firstName, lastName, jobTitle, address, phone, email, summary, experience, education, skills, linkedin, github, leetcode, themeColor } = req.body;
    console.log(req.body);
    try {
        const newData = new userResumeModel({
            title: title,
            resumeId: resumeId,
            userEmail: userEmail,
            userName: userName,
            firstName: firstName,
            lastName: lastName,
            jobTitle: jobTitle,
            address: address,
            phone: phone,
            email: email,
            summary: summary,
            experience: experience,
            education: education,
            skills: skills,
            linkedin: linkedin,
            github: github,
            leetcode: leetcode,
            themeColor: themeColor

        });
        const savedData = await newData.save();
        res.json({ success: true, message: savedData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// update resume

const updateResumeData = async (req, res) => {
    const { firstName, lastName, address, jobTitle, phone, email, summary, experience, education, project, skills, linkedin, github, leetcode, course, codingPlatforms, certifications, themeColor } = req.body;
    const _id = req.params._id;
    console.log(_id);
    try {
        const updatedData = await userResumeModel.findByIdAndUpdate(_id, { firstName, lastName, address, jobTitle, phone, email, summary, experience, project, education, skills, linkedin, github, leetcode, course, codingPlatforms, certifications, themeColor });
        res.json({ success: true, message: "Information Updated", updatedData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
        console.log(_id);
    }
}

// delete user resume

const deleteResume = async (req, res) => {
    const resumeId = req.params.resumeId;
    console.log(req.params);

    try {
        const deletedData = await userResumeModel.findByIdAndDelete(resumeId);
        res.json({ success: true, message: "Resume Deleted Successfully", deletedData })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

const getResumeId = async (req, res) => {
    try {
        const id = await userResumeModel.find({ resumeId: req.body.resumeId });
        console.log(id);
        const _id = id[0]._id;
        console.log(_id);
        res.json({ success: true, _id });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

export { getUserResume, addResumeData, updateResumeData, getResumeId, getResume, deleteResume }