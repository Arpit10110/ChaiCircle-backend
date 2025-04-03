import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    username:{type:String, required:true},
    dp:{type: String, required: true},
    name:{type:String, required:true},
    password:{type:String, required:true},
    email:{type:String, required:true},
    friends:{type:Array, required:true}
})

export const UserModel = mongoose.model("User", Schema)