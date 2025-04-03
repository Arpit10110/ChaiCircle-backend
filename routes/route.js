import express from "express"
const router = express.Router()
import {signup,login,logout} from "../controller/usercontroller.js"
import { isauth } from "../middleware/isauth.js"
import {finduser,getprofile} from "../controller/findusercontroller.js"
import { checkprofile } from "../middleware/checkprofile.js"
import {getrequests, sendfriendreq,acceptreq,rejectreq} from "../controller/sendfriendreq.js"
import {createpost,deletepost,addlike,removelike, addcomment,explore} from "../controller/postcontroller.js"
import {getuserdata,addmessage, getallmessage} from "../controller/messagecontroler.js"
//testing routes
router.get("/",(req, res) => {
    return(
        res.json({
            success:true,
            messgae:"Welcome to the backend of the chai circle"
        })
    )
})


//auth routes
router.post("/signup",signup)
router.post("/login",login)
router.get("/isauth",isauth);
router.get("/logout",logout);
//finduser
router.post("/finduser",finduser)
//getproile data
router.post("/getprofile",checkprofile,getprofile)
//send freind request
router.post("/sendfriendreq",checkprofile,sendfriendreq)
router.get("/getrequests",checkprofile,getrequests)
router.post("/acceptreq",acceptreq)
router.post("/rejectreq",rejectreq)
//post routes
router.post("/createpost",checkprofile,createpost)
router.post("/deletepost",deletepost)
router.post("/addlike",addlike)
router.post("/removelike",removelike)
router.post("/addcomment",addcomment)
router.get("/explore",checkprofile,explore)
//message routes
router.get("/getuserdata",checkprofile,getuserdata)
router.post("/addmessage",checkprofile,addmessage)
router.post("/getallmessage",checkprofile,getallmessage)

export default router