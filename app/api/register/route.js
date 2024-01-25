import userModel from "@/model/usermodel";
import connectDB from "@/utils/connectionToDB";
import { hashPassword } from "@/utils/passwordHandler";
import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req){
    await connectDB()
    const {email , username , password , confirm , check} = await req.json()
    if(!email || !username , !password , !confirm , !check){
        return NextResponse.json({error:"invalid data" }, {status:400})
    }
    const user = await userModel.findOne({$or :[{email} , {username}]})

    if(user) return NextResponse.json({error:"email or username already exist"} , {status:400})
    const hashedPass =  hashPassword(password)
    const result = await userModel.create({email , username  , password : hashedPass})
    const secret = process.env.JWTSECRET
    const token = sign({email , username} , secret , {expiresIn :60*60*24*3})
     const res =  NextResponse.json({message:"your account was made successfully" , status:"success"} , {status:201})
     if(result){
        res.cookies.set({
            name:"Authorization",
            value : token , 
            maxAge:60*60*24*3
        })

         return res
     }
    
}   
 