import express from "express"
import dbConnect from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import cors from "cors"
import "dotenv/config"

const app = express();
const PORT = process.env.PORT || 3000;

// middleware

app.use(express.json());
app.use(cors())

// database connect

dbConnect();

// api endpoint

app.use("/api/user", userRouter);


app.get('/', (req, res) => {
    res.send("API Working")
})


app.listen(PORT, () => {
    console.log(`server is listening on ${PORT}`);
})