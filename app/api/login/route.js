import userModel from "@/model/usermodel";
import connectDB from "@/utils/connectionToDB";
import { verifyPassword } from "@/utils/passwordHandler";
import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req){
    // just wanted to test my own authorization without using next auth
    await connectDB()
    const {userInfo , password} = await req.json()
    const user = await userModel.findOne({$or : [{email :userInfo} , {username : userInfo}]})

    if(!user) return NextResponse.json({error:"user doesn't exist"})

    const isValid = verifyPassword(password , user.password)
    if(!isValid) return NextResponse.json({error:"username or password is incorrect"})

    const response = NextResponse.json({message:"welcome back" , status:"success"} , {status:200})
    const token = sign({email : user?.email} , process.env.JWTSECRET , {expiresIn:60*60*24*3})
    response.cookies.set({
        name:"Authorization" ,
        value:token,
        httpOnly:false ,
        maxAge:60*60*24*3
    })

    return response
}