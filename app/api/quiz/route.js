import quizModel from "@/model/quizModel";
import connectDB from "@/utils/connectionToDB";
import { NextResponse } from "next/server";

export async function POST(req){
    await connectDB()
    try {
        const {category , difficulty, type  , amount , user} = await req.json()
        if(!amount) return NextResponse.json({message:"question amount is not valid"} , {status:400})
        const checkQuizeExistence = await quizModel.findOne({user})
        if(!checkQuizeExistence){
            const quiz = await quizModel.create({category , difficulty , type , amount , user})
            if(!quiz) return NextResponse.json({message:"failed to change setting"})
            return NextResponse.json({message:"setting updated successfully" , status:"success"} , {status:200})
         }else{
            const updateQuize = await quizModel.updateOne({user} , {$set :{category , difficulty , type , amount}})
            if(!updateQuize.modifiedCount) return NextResponse.json({message:"something went wrong"}, {status:500})
            return NextResponse.json({message:"setting has been saved", status:'success'} , {status:200})
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({message:"internal server error" } , {status:500})
    }
}