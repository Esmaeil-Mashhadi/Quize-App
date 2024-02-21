import userModel from "@/model/usermodel";
import connectDB from "@/utils/connectionToDB";
import { NextResponse } from "next/server";

export async function POST(req){
    await connectDB()

    
    const {username , email} = await req.json()
    if(!username){
        return NextResponse.json({error: "username is empty !"})
    }else if(!/^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*$/.test(username)){
       return NextResponse.json({error: "please enter valid username"})
    }else if (Array.from(username).length <3|| Array.from(username).length> 20 ){
         return NextResponse.json({error: "username must be between 3 -20 character"})
    }
    const checkUserExistence = await userModel.findOne({email})
    if(!checkUserExistence) return NextResponse.json({error:"action denied register first"} , {status:400})
    const checkUsername = await userModel.findOne({username})
    if(checkUsername) return NextResponse.json({error:"username already exist" } ,{status:400})
    
    const result = await userModel.updateOne({email} , {$set : {username}})
    if(result.modifiedCount){
        return NextResponse.json({message :'username updated successfully' ,status:"success"} , {status:201})
    }else{
        return NextResponse.json({error:"internal server error"} , {status:500})
    }
}