import mongoose from "mongoose";

const userResumeSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    resumeId: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    firstName: {
        type: String,

    },
    lastName: {
        type: String,

    },
    jobTitle: {
        type: String,

    },
    email: {
        type: String,

    },
    address: {
        type: String,

    },
    phone: {
        type: String,

    },
    linkedin: {
        type: String,

    },
    github: {
        type: String,

    },
    leetcode: {
        type: String,

    },
    summary: {
        type: String,

    },
    themeColor: {
        type: String
    },
    experience: [{}],
    education: [{}],
    skills: {},
    project: [{}],
    course: [{}],
    codingPlatforms: [{}],
    certifications: [{}]
});

const userResumeModel = mongoose.models.userResumeModel || mongoose.model("userResume", userResumeSchema);

export default userResumeModel;