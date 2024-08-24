import userModel from "../models/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import "dotenv/config"

const jwtSecret = process.env.JWT_SECRET;
// register user

const registerUer = async (req, res) => {
    const { name, email, password } = req.body;
    console.log(req.body);
    try {
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User Already Exist" });
        }

        // checking password

        if (password.length < 8) {
            return res.json({ success: false, message: "Please Enter Strong Password" })
        }

        // hashing password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        });
        const user = await newUser.save();
        const token = jwt.sign({ id: user._id, email: user.email, name: user.name }, jwtSecret)
        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// login user

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User Not Found" })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Wrong Password" })
        }
        const token = jwt.sign({ id: user._id, email: user.email, name: user.name }, jwtSecret)
        res.json({ success: true, token })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// Get user details

const getUserInfo = async (req, res) => {
    try {
        const userData = req.user;
        // const resumeData = req.resume;
        return res.json({ userData })
    } catch (error) {
        console.log(error);
    }
}

export { registerUer, loginUser, getUserInfo }