import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {type:String,require:true,uniqe:true},
    password: {type:String,require:true}
})

export const user = mongoose.model("user",UserSchema);