import userModel from "@/model/usermodel";
import { checkUserExistence } from "@/utils/checkUserExistence";
import connectDB from "@/utils/connectionToDB";
import { NextResponse } from "next/server";

export async function POST(req){
    try {
        await connectDB()
        const email = await checkUserExistence(req)
        const {score , category , totalQuestions , prevChoice} = await req.json()
        const checkCategoryExistence = await userModel.findOne({'currentScore.category' : category})
        if(checkCategoryExistence){

            const savedScore = await userModel.updateOne({$and :[{email , 'currentScore.category' : category}]} ,
             {$set :{'currentScore.$.category' : category , 'currentScore.$.totalQuestions' : totalQuestions } ,
              $push:{prevChoice : prevChoice},
              $inc:{'currentScore.$.score' :score}})

            if(!savedScore.modifiedCount){
                return NextResponse.json({error:"something went wrong"} , {status:500})
            } 
            return NextResponse.json({status :"success"} , {status:200})
        }else{
            const insertNewCategory = await userModel.updateOne(
                { email },
                {
                  $push: {
                      currentScore: { score, category, totalQuestions },
                      prevChoice: prevChoice ,
                  }
                }
              );
            
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


export async function GET(){
    try {
        await connectDB()
        const userPrevChoice = await userModel.findOne({} , {prevChoice : 1 , _id : 0})
        return NextResponse.json(userPrevChoice)
    } catch (error) {
        return NextResponse.json({error : error.message || "internal server error"}, {status:500})
    }
}