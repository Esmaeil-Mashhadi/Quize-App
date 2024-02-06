import userModel from "@/model/usermodel";
import { checkUserExistence } from "@/utils/collectionCheck/checkUserExistence";
import connectDB from "@/utils/connectionToDB";
import { NextResponse } from "next/server";


export const AnswersHandler = (incorrect , correct  )=>{

    const randomIndex = Math.floor((Math.random()*4))
        
    let answers = []
    if(incorrect && correct){
        answers = [...incorrect]
        answers.splice(randomIndex , 0 , correct)      
    }


   return {
    answers , correctAnswer : randomIndex
   }
}


export async function POST(req){
    try {
        await connectDB()
        const {questionIndex , userChoice } = await req.json()
        const email= await checkUserExistence(req)
        const {currentQuize} = await userModel.findOne({email} , {currentQuize: 1})
        const { answers , correctAnswer} =  AnswersHandler(currentQuize[questionIndex]?.incorrect_answers , currentQuize[questionIndex]?.correct_answer)
        
        if(userChoice){
            if(userChoice == correctAnswer){
                return NextResponse.json({[userChoice] : 'correct' , answers})
            }else{
                return NextResponse.json({[userChoice]:"wrong" , [correctAnswer] :"correct" , answers})
            }
        }else{
            return NextResponse.json({answers})
        }

    } catch (error) {
        console.log(error);
        return NextResponse.json({message :'internal server error'} , {status:500})
    }
}


