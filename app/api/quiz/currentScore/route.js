import userModel from "@/model/usermodel";
import connectDB from "@/utils/connectionToDB";
import { NextResponse } from "next/server";

export async function GET(){
    try {

        await connectDB()
        let finalData = {}
        const data = await userModel.findOne({} , {currentScore: 1 , _id:0}) 
           
            if(data?.currentScore.length > 1){
                 const score = data?.currentScore.reduce((acc , curr)=>{
                       return curr.score +=acc
                    },0)

                    const totalQuestions =data?.currentScore[0]?.totalQuestions
                    const correctAnswers = score/10
                finalData = {
                    category : "any",
                    totalQuestions ,
                    correctAnswers,
                    notAnswered : totalQuestions - correctAnswers,
                    yourScore : score
                }
    
            }else{
                
                const  {category , score, totalQuestions} = data?.currentScore[0]

                const correctAnswers = score /10
        
                 finalData = {
                    category ,
                    totalQuestions,
                    correctAnswers , 
                    notAnswered: totalQuestions - correctAnswers,
                    yourScore : score
                }
            }
                return NextResponse.json(finalData)
            

    
    } catch (error) {
        return NextResponse.json({error : error.message ||"internal server error"} , {status:500})
    }
}