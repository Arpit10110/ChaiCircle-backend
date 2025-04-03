import { PostModel } from "../model/PostModel.js";
import { UserModel } from "../model/UserModel.js";

export const finduser = async (req, res) => {
    try {
        const { username } = req.body;
        const users = await UserModel.find({ username: { $regex: username, $options: 'i' } });
        return res.json({
            success: true,
            message: "Users found",
            users: users
        });
    } catch (error) {
        return res.json({
            success: false,
            error: error.message
        });
    }
};


export const getprofile = async(req, res) => {
    try {

        const {username} = req.body;
        const isuseradmin= req.isuseradmin;
        const Adminusername =   req.username
        const userdata = await UserModel.findOne({ username: username });

        const post = await PostModel.find({ username: username}).sort({ createdAt: -1 });



        return res.json({
            success:true,
            isuseradmin:isuseradmin,
            userdata,
            post,
            adminusername:Adminusername
        })
        
    } catch (error) {
        return res.json({
            success: false,
            error: error.message
        });
    }
}