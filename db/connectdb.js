import mongoose from "mongoose";


export const connectdb = ()=>{
    mongoose.connect(process.env.Mongodb_url,{dbName:"ChaiCircle"}).then(()=>{
        console.log("DB connected successfully")
    }).catch((e)=>{
        console.log(e);
    })
}
