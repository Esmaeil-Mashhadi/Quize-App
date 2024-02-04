import userModel from "@/model/usermodel";
import { checkUserExistence } from "@/utils/checkUserExistence";
import connectDB from "@/utils/connectionToDB";
import { NextResponse } from "next/server";

export async function PATCH(req){
    try {
        await connectDB()
       const email = await checkUserExistence(req)
        const {currentScore} = await userModel.findOne({email} , {currentScore: 1 , _id:0}) || {currentScore :null}

        if(currentScore && Object.keys(currentScore).length){
            const prevData = await userModel.updateOne({email} , {$push : {userScore :currentScore}})
            if(prevData.modifiedCount){
                const clearOlderData = await userModel.updateOne({email} , {$unset :{prevChoice : 1, currentScore :1 , currentQuize:1}})
                if(clearOlderData.modifiedCount){
                    return NextResponse.json({message:"your score saved successfully" , status:"success"} , {status:200})
                }
            }else{
                return NextResponse.json({error:"internal server error"} , {status:500})
            }
        }

        return NextResponse.json({error:"failed to save score"} , {status:500})
    } catch (error) {
        return NextResponse.json({error:error.message || "internal server error"} , {status:500})
    }
}