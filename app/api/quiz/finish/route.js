import userModel from "@/model/usermodel";
import { checkUserExistence } from "@/utils/collectionCheck/checkUserExistence";
import connectDB from "@/utils/connectionToDB";
import { NextResponse } from "next/server";

export async function PATCH(req){
    try {
        await connectDB()
       const email = await checkUserExistence(req)
       const {category , totalQuestions} = await req.json()

        const {currentScore} = await userModel.findOne({email} , {currentScore: 1 , _id:0}) || {currentScore :null}
   
        
        if(currentScore && Object.keys(currentScore).length){
            
                const prevData = await userModel.updateOne({$and :[{email , "userScore.category" : category}]} , {$inc : {'userScore.$.totalQuestions' :totalQuestions , totalScore : currentScore[0].score} } , {upsert:true})
        
                if(prevData.modifiedCount){
                    const clearOlderData = await userModel.updateOne({$and :[{email , "userScore.category" : category}]}, {$unset :{prevChoice : 1, currentScore :1 , currentQuiz:1}})
                    if(clearOlderData.modifiedCount){
                        return NextResponse.json({message:"your score saved successfully" , status:"success"} , {status:200})
                    }
                }else{
                    return NextResponse.json({error:"internal server error"} , {status:500})
                }
        }
        return NextResponse.json({error:"failed to save score"} , {status:500})
    } catch (error) {
        console.log(error);
        return NextResponse.json({error:error.message || "internal server error"} , {status:500})
    }
}