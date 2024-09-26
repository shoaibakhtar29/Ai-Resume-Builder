import userModel from "../models/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"
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

        // const otp = Math.floor(100000 + Math.random() * 900000).toString();
        // const otpToken = jwt.sign({ email, otp, password, name }, process.env.JWT_SECRET);

        // semd otp to user email

        // const transporter = nodemailer.createTransport({
        //     host: process.env.EMAIL_HOST,
        //     port: process.env.EMAIL_PORT,
        //     auth: {
        //         user: process.env.EMAIL_USER,
        //         pass: process.env.EMAIL_PASS,
        //     },
        // });

        // const mailOption = {
        //     from: process.env.EMAIL_USER,
        //     to: email,
        //     subject: 'Ai Resume Builder Registration OTP',
        //     text: `Your otp for registration at Ai Resume Builder is ${otp}`
        // };

        // transporter.sendMail(mailOption, (error, info) => {
        //     if (error) {
        //         return res.status(500).json({ message: "Error in sending mail", error });
        //     }
        //     res.json({ message: "OTP send successfully", otpToken });
        // })

        // hashing password
        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new userModel({
            name: name,
            email: email,
            password: password
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