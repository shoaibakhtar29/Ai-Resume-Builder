import mongoose from "mongoose";
import 'dotenv/config'

const dbUrl = process.env.DB_URL;
const dbConnect = async () => {
    try {
        await mongoose.connect(dbUrl);
        console.log("Database connect successfully");
    } catch (error) {
        console.log(error);
    }

}

export default dbConnect;