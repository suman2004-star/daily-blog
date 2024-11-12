import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    image:{type:String,required:true},
    // author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
    author:{type:String,required:true}
});


export const Blog = mongoose.model('blog',BlogSchema)