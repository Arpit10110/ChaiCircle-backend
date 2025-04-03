import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    to:{type : String , required : true},
    from:{type:String , required : true}
});

export const RequestModel = mongoose.model("Request", Schema)