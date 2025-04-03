import { UserModel } from "../model/UserModel.js";
import { MessageModel } from "../model/MessageModel.js";

export const getuserdata = async(req,res)=>{
     try {
            const Adminusername =   req.username
            if(Adminusername=="N/A"){
                return res.json({
                    success:false,
                     message:"please Login first"
                })
            }else{
            const userdata = await UserModel.findOne({ username: Adminusername });
                return res.json({
                    success:true,
                    userdata,
                    adminusername:Adminusername
                })
            }
        } catch (error) {
            return res.json({
                success: false,
                error: error.message
            });
        }
}

export const addmessage = async(req,res)=>{
    try {
        const {receiver, content } = req.body;
        const sender = req.username

        if (sender =="N/A" || !receiver || !content) {
            return res.json({
                success: false,
                message: "All fields (sender, receiver, content) are required."
            });
        }

        const newMessage = new MessageModel({
            message: content,
            users: [sender, receiver], 
            sender,
            timestamp: new Date() 
        });

        await newMessage.save();

        return res.json({
            success: true,
            message: "Message added successfully.",
            data: newMessage
        });
    } catch (error) {
        return res.json({
            success: false,
            error: error.message
        });
    }
}

export const getallmessage = async (req, res) => {
    try {
        const {receiver } = req.body;
        const sender = req.username

        if (sender=="N/A" || !receiver) {
            return res.json({
                success: false,
                message: "Both sender and receiver are required."
            });
        }

        const messages = await MessageModel.find({
            users: { $all: [sender, receiver] }
        }).sort({ timestamp: 1 }); 

        return res.json({
            success: true,
            messages
        });
    } catch (error) {
        return res.json({
            success: false,
            error: error.message
        });
    }
};