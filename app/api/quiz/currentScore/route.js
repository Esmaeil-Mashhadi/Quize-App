import userModel from "@/model/usermodel";
import { checkUserExistence } from "@/utils/collectionCheck/checkUserExistence";
import connectDB from "@/utils/connectionToDB";
import { NextResponse } from "next/server";

export async function GET(req){
    try {

        await connectDB()
        let finalData = {}
       const email = await checkUserExistence(req)
        const data = await userModel.findOne({email} , {currentScore: 1  , prevChoice : 1, _id:0})

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
        console.log(error)
        return NextResponse.json({error : error.message ||"internal server error"} , {status:500})
    }
}