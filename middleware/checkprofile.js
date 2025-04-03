import jwt from "jsonwebtoken";
export const checkprofile = async(req,res,next)=>{
    try {
        const {username} = req.body;
        
        const {token} = req.cookies ;
        let isuseradmin;
        if(!token){
            req.username = "N/A"
            isuseradmin = false;
         }else{
             const decoded =  jwt.verify(token,process.env.JWT_SECRET)
             req.username = decoded.username
             if(decoded.username==username){
                 isuseradmin = true;
            }else{
                 isuseradmin = false;
             }
         }
         req.isuseradmin = isuseradmin;
         next();
    } catch (error) {
        return res.json({
            success:false,
            user:false
        })
    }
}