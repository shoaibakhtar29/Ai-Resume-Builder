import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js";
const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) {
        return res.json({ message: "Token not provided" })
    }
    const jwtToken = token.replace("Bearer ", "");
    console.log("token is", jwtToken);
    try {
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET);
        const userData = await userModel.findOne({ email: isVerified.email }).select({ password: 0 });

        console.log(userData);

        req.user = userData;
        req.token = token;
        req.userId = userData._id;
        next();
    } catch (error) {
        return res.json({ message: "Token not provided" })
    }
}

export default authMiddleware;