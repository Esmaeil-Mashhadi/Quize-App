import userModel from "@/model/usermodel";
import connectDB from "@/utils/connectionToDB";
import { NextResponse } from "next/server";

export async function GET(){
    try {

        await connectDB()
        let finalData = {}
        const data = await userModel.findOne({} , {currentScore: 1  , prevChoice : 1, _id:0}) 
              
                const  {category , score, totalQuestions} = data?.currentScore[0]
               const correctOnes=  data?.prevChoice.filter(item => Object.keys(item).length == 1 )

                const correctAnswers = correctOnes.length
        
                 finalData = {
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