import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const connectdb = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`\n MongoDB connected !! DB HOST: ${connection}`);
        
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}


export default connectdb