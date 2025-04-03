import { RequestModel } from "../model/RequestModel.js";
import { UserModel } from "../model/UserModel.js";

export const sendfriendreq = async(req, res) =>{
    try {
        const {to} = req.body;
        const username = req.username;

        const existingRequest = await RequestModel.findOne({
            $or: [
                { to, from: username },
                { to: username, from: to }
            ]
        });

        if (existingRequest) {
            return res.json({
                success: false,
                message: "Friend request already sent"
            });
        }

        await RequestModel.create({to, from: username});

        return res.json({
            success: true,
            message: "Friend request sent successfully"
        });

    } catch (error) {
        return res.json({
            success: false,
            error: error
        });
    }
}

export const getrequests = async(req, res) =>{
    try {

        const username = req.username;
        const  data = await RequestModel.find({to: username});
         return res.json({
            success: true,
            data:data
        });
        
    } catch (error) {
        return res.json({
            success: false,
            error: error
        });
    }
}


export const acceptreq = async(req, res) =>{
    try {

        const {to,from,_id} =  req.body;

        const user1 = await UserModel.findOne({username: to});
        const user2 = await UserModel.findOne({username: from});

        await user1.friends.push(from);
        await user2.friends.push(to);
        await user1.save();
        await user2.save();

        await RequestModel.findByIdAndDelete(_id);

        return res.json({
            success: true,
            message: "Friend request accepted successfully"
        });
        
    } catch (error) {
        return res.json({
            success: false,
            error: error
        });
    }
}

export const rejectreq = async(req, res) =>{
    try {

        const {_id} = req.body;

        await RequestModel.findByIdAndDelete(_id);

        return res.json({
            success: true,
            message: "Friend request rejected successfully"
        }); 
        
    } catch (error) {
        return res.json({
            success: false,
            error: error
        });
    }
}