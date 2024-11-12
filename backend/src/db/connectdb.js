import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const connectdb = async () => {
    try {
        const connection = await mongoose.connect("mongodb+srv://suman:Suman%401234@cluster0.mkmuj.mongodb.net/blogs?retryWrites=true&w=majority&appName=Cluster0")
        console.log(`\n MongoDB connected !! DB HOST: ${connection}`)
        
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}


export default connectdb