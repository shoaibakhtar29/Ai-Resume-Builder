import express from "express"
import { getUserInfo, loginUser, registerUer } from "../controller/userController.js"
import authMiddleware from "../middleware/authMiddleware.js"
import { addResumeData, deleteResume, getResume, getResumeId, getUserResume, updateResumeData } from "../controller/userResumeController.js";
import resumeMiddleware from "../middleware/resumeMiddleware.js";

const userRouter = express.Router();

userRouter.post("/register", registerUer);
userRouter.post("/login", loginUser);
userRouter.get("/user-info", authMiddleware, getUserInfo);
userRouter.get("/resume-info", resumeMiddleware, getUserResume)
userRouter.patch("/update-resume/:_id", updateResumeData)
userRouter.post("/add-resume-data", addResumeData);
userRouter.post("/get-resume-id", getResumeId);
userRouter.get("/view-resume/:resumeId", getResume);
userRouter.delete("/delete-resume/:resumeId", deleteResume);

export default userRouter;