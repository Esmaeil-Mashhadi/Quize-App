import userModel from "@/model/usermodel";
import { checkUserExistence } from "@/utils/collectionCheck/checkUserExistence";
import connectDB from "@/utils/connectionToDB";
import { saveScore } from "@/utils/saveScoreToBackend";
import { NextResponse } from "next/server";

export async function POST(req){
    try {
        await connectDB()
        const email = await checkUserExistence(req)
        const {score , category , totalQuestions , prevChoice} = await req.json()
        const checkCurrentCategoryExistence = await userModel.findOne({$and:[{email} , {'currentScore.category' : category}]})
        const checkUserCategoryExistence = await userModel.findOne({$and:[{email} , {'userScore.category' : category}]})
        if(checkUserCategoryExistence){
            const updateCategory = await userModel.updateOne({$and:[{email , "userScore.category" :category}]}, {$inc:{
                'userScore.$.score': score , 'userScore.$.totalCorrectAnswers': score ? 1 : 0
            }})

            if(!updateCategory.modifiedCount){
                return NextResponse.json({error:"failed to update socre"} , {status:500})
            }
        }else{
            const pushCategory = await userModel.updateOne({email} , {$push:{userScore:{score , category , totalQuestions , totalCorrectAnswers: score? 1 : 0}}} , {upsert:true})
            if(!pushCategory.modifiedCount){
                return NextResponse.json({error:"failed to save socre"} , {status:500})
            }
        }
        if(checkCurrentCategoryExistence){
            const savedScore = await userModel.updateOne({$and :[{email , 'currentScore.category' : category}]} ,
             {$set :{'currentScore.$.totalQuestions' : totalQuestions } ,
              $push:{prevChoice : prevChoice},
              $inc:{'currentScore.$.score' :score , 'currentScore.$.totalCorrectAnswers': score ? 1 : 0 }})
            if(!savedScore.modifiedCount){
                return NextResponse.json({error:"something went wrong "} , {status:500})
            } 
            return NextResponse.json({status :"success"} , {status:200})
        }else{
            const insertNewCategory = await userModel.updateOne(
                { email },
                {
                  $push: {
                      currentScore: { score, category, totalQuestions , totalCorrectAnswers : score ? 1 : 0},
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