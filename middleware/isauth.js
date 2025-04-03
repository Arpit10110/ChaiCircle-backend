import jwt from "jsonwebtoken";
export const isauth = async(req,res)=>{
    try {
        
        const {token} = req.cookies;
        if(!token){
            return res.json({
                 success:false,
                 user:false
             })
         }
         const decoded =  jwt.verify(token,process.env.JWT_SECRET)
         const data = {username: decoded.username}
         return res.json({
            success:true,
            user:true,
            data:data
         })
    } catch (error) {
        return res.json({
            success:false,
            user:false
        })
    }
}