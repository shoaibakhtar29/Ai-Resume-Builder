import jwt from "jsonwebtoken"
import userResumeModel from "../models/userResumeModel.js";

const resumeMiddleware = async (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        return res.json({ message: "Token not provided" })
    }
    const jwtToken = token.replace("Bearer ", "");
    console.log("token is", jwtToken);
    try {
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET);
        const userResumeData = await userResumeModel.find({ userEmail: isVerified.email });

        req.userresume = userResumeData;
        req.token = token;
        req.userResumeId = userResumeData.resumeId;
        next();
    } catch (error) {
        return res.json({ message: "Token not provided" })
    }
}

export default resumeMiddleware;