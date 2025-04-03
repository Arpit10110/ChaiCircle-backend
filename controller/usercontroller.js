import mongoose from "mongoose";
import { UserModel } from "../model/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"


export const signup = async(req,res)=>{
    try {
        const {name,email,password,username} = req.body;
        const finduser = await UserModel.findOne({email: email});
        if(finduser){
            return res.json({
                success:false,
                message:"User already exist"
            })
        }else{
            const findusername = await UserModel.findOne({username: username});
            if(findusername){
                return res.json(
                    {
                        success:false,
                        message:"Username already exist"
                    }
                )
            }
            const haspass = await bcrypt.hash(password,10)
            const dp="https://res.cloudinary.com/dblybkghe/image/upload/v1742805997/defaultprofile_c9wwd3.png";
            await UserModel.create({dp, email,password:haspass, name,username});
            return res.json({
                success:true,
                message:"User created successfully"
            })
        }
    } catch (error) {
        return res.json({
            success:false,
            error:error.message
        })
    }
}


export const login = async(req,res)=>{
    try {
        const {email,password} = req.body;

        const finduser = await UserModel.findOne({email: email});
        if(!finduser){
            return res.json({
                success:false,
                message:"User does not exist"
            })
        }else{
            const ismatch = await bcrypt.compare(password,finduser.password);
            if(!ismatch){
                return res.json({
                    success:false,
                    message:"Wrong Password"
                })
            }else{
                

                const token = jwt.sign({username:finduser.username},process.env.JWT_SECRET,{expiresIn:"10d"})

                res.cookie("token",token,{
                    maxAge:10 * 24 * 60 * 60 * 1000,
                    httpOnly:true,
                    secure:true,
                    sameSite: "None",
                })

                return res.json({
                    success:true,
                    username:finduser.username
                })
            }
        }
    } catch (error) {
        return res.json({
            success:false,
            error:error.message
        })
    }
}

export const logout = async(req,res)=>{
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "None",
        });
        return res.json({
            success: true,
            message: "Logged out successfully"
        });
    } catch (error) {
        return res.json({
            success:false,
            error:error.message
        })
    }
}