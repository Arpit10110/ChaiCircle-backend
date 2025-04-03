import { PostModel } from "../model/PostModel.js";

export const createpost = async(req,res)=>{
    try {
        const {caption,imageurl} = req.body;
        const username=req.username;
        const data=await PostModel.create({caption,imageurl,username});
        return res.json({
            success:true,
            message:"Post Created Successfully",
            profile:username
        })
    } catch (error) {
        return res.json({
            success:false,
            message:error
        })
    }
}

export const deletepost = async(req,res)=>{
    try {
        const {id} = req.body;
        await PostModel.findByIdAndDelete({_id:id});
        return res.json({
            success:true,
            message:"Post Deleted Successfully",
        })
    } catch (error) {
        return res.json({
            success:false,
            message:error
        })
    }
}

export const addlike = async(req,res)=>{
    try {
        const {postid, userid} = req.body;

        const post = await PostModel.findById(postid);

        if (!post) {
            return res.json({
                success: false,
                message: "Post not found"
            });
        }

        if (post.likes.includes(userid)) {
            return res.json({
                success: false,
                message: "User already liked this post"
            });
        }

        post.likes.push(userid);
        await post.save();

        return res.json({
            success: true,
            message: "Post liked successfully"
        });
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        });
    }
}

export const removelike = async (req, res) => {
    try {
        const { postid, userid } = req.body;

        const post = await PostModel.findById(postid);

        if (!post) {
            return res.json({
                success: false,
                message: "Post not found"
            });
        }

        if (!post.likes.includes(userid)) {
            return res.json({
                success: false,
                message: "User has not liked this post"
            });
        }

        post.likes = post.likes.filter(id => id !== userid);
        await post.save();

        return res.json({
            success: true,
            message: "Like removed successfully"
        });
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        });
    }
}

export const addcomment = async (req, res) => {
    try {
        const { postid, userid, addcomment } = req.body;

        const post = await PostModel.findById(postid);

        if (!post) {
            return res.json({
                success: false,
                message: "Post not found"
            });
        }

        post.comments.push({ username: userid, comments: addcomment });
        await post.save();

        return res.json({
            success: true,
            message: "Comment added successfully"
        });
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        });
    }
};


export const explore = async (req, res) => {
    try {
        const username = req.username ;
        const posts = await PostModel.find({}).sort({ createdAt: -1 });
        if(username == "N/A"){
            return res.json({
                success: false,
                message: "Login to explore posts",
            });
        }else{
            return res.json({
                success: true,
                data: posts,
                adminusername: username
            });
        }
    } catch (error) {
        return res.json({
            success: false,
            message: error.message
        });
    }
} 