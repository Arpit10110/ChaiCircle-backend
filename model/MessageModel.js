import mongoose from "mongoose"

const Schema = new mongoose.Schema({
    message:{
        type:String,required:true
    },
    users:{
        type:Array,required:true
    },
    sender:{
        type:String,required:true
    },
    timestamp:{
        type:Date,default:Date.now
    }
})


export const MessageModel = mongoose.model("Message",Schema)