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
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    linkedin: {
        type: String,
        required: true
    },
    github: {
        type: String,
        required: true
    },
    leetcode: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
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