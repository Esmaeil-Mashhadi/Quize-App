import userModel from "@/model/usermodel";
import { checkUserExistence } from "@/utils/checkUserExistence";
import connectDB from "@/utils/connectionToDB";
import { NextResponse } from "next/server";

export async function POST(req){
    try {
        await connectDB()
        const email = await checkUserExistence(req)
        const {score , category , totalQuestions} = await req.json()

        console.log(score , typeof(score) , category , totalQuestions , typeof(totalQuestions));

        const checkCategoryExistence = await userModel.findOne({'userScore.category' : category})
        if(checkCategoryExistence){
            const savedScore = await userModel.updateOne({$and :[{email , 'userScore.category' : category}]} , {$set :{'userScore.$.category' : category , 'userScore.$.totalQuestions' : totalQuestions},$inc:{'userScore.$.score' :score}})
            if(!savedScore.modifiedCount){
                return NextResponse.json({error:"something went wrong"} , {status:500})
            } 
            return NextResponse.json({status :"success"} , {status:200})
        }else{
            const insertNewCategory = await userModel.updateOne({email} , {$push: {userScore :{score , category , totalQuestions}}})
            if(!insertNewCategory.modifiedCount){
                return NextResponse.json({error:"something went wrong"} , {status:500})
            } 
            return NextResponse.json({status :"success"} , {status:200})
        }
         
    
    } catch (error) {
        console.log(error);
        return NextResponse.json({error: error.message || "internal server error"} , {status:500})
    }
 
}