import userModel from "@/model/usermodel";
import { checkUserExistence } from "@/utils/collectionCheck/checkUserExistence";
import connectDB from "@/utils/connectionToDB";
import { NextResponse } from "next/server";

 const AnswersHandler = (incorrect , correct  )=>{

    const quantity = incorrect.length == 1 ? 2 : 4
    const randomIndex = Math.floor((Math.random()*quantity))
    let allAnswers = []
    if(incorrect && correct){
        allAnswers = [...incorrect]
        allAnswers.splice(randomIndex , 0 , correct)      
    }


   return {
    allAnswers , correctIndex : randomIndex
   }
}

export async function POST(req){
    try {
        await connectDB()
       const email = await checkUserExistence(req)
         const data = await req.json()
         const dataCopy = JSON.parse(JSON.stringify(data))
         dataCopy.forEach((item , index) => {
            const {allAnswers , correctIndex} = AnswersHandler(item.incorrect_answers , item.correct_answer)
            dataCopy[index].allAnswers = allAnswers
            dataCopy[index].correctIndex = correctIndex
         })
         const {currentScore , userScore} = await userModel.findOne({email} , {currentScore: 1 , userScore:1, _id:0})

         if(!currentScore?.length){

            const setInitialScore = await userModel.updateOne({email} , {$push : {
                currentScore : {category : dataCopy[0].category , score : 0 , totalCorrectAnswers:0 , totalQuestions: dataCopy.length } , 
                ...!userScore.length && {userScore: {category : dataCopy[0].category , score : 0 , totalCorrectAnswers:0 , totalQuestions: dataCopy.length}}}})

            if(!setInitialScore.modifiedCount){
                return NextResponse.json({error:"failed to save initial score"} , {status:500})
            }
         }
        
         const currentQuiz = await userModel.updateOne({email} , {$set : {currentQuiz : dataCopy }}, {upsert:true})
        if(!currentQuiz.modifiedCount) return NextResponse.json({error:"something went wrong"} ,{status:500})
        return NextResponse.json({status:"success"} , {status:200})
    } catch (error) {
        return NextResponse.json({error:error.message} , {status:500})
    }

}


export async function GET(req){
    try {
        await connectDB()
        const email =  await checkUserExistence(req)
        const currentQuiz = await userModel.findOne({email} , {currentQuiz : 1 , _id :0})
        return NextResponse.json(currentQuiz, {status:200})
    } catch (error) {
        console.log(error);
    }
 
}


