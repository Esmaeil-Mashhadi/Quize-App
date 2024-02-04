import userModel from "@/model/usermodel";
import connectDB from "@/utils/connectionToDB";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        await connectDB()
        const {currentScore} = await userModel.findOne({} , {currentScore: 1 , _id:0})
        const  {category , score, totalQuestions} = currentScore[0]
        const correctAnswers = score /totalQuestions

        const finalData = {
            category ,
            totalQuestions,
            correctAnswers , 
            notAnswered: totalQuestions - correctAnswers,
            yourScore : score
        }
        return NextResponse.json(finalData)
    } catch (error) {
        return NextResponse.json({error : error.message ||"internal server error"} , {status:500})
    }
}