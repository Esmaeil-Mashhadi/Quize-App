import userModel from "@/model/usermodel";
import { checkUserExistence } from "@/utils/checkUserExistence";
import connectDB from "@/utils/connectionToDB";
import { NextResponse } from "next/server";

 const AnswersHandler = (incorrect , correct  )=>{

    const randomIndex = Math.floor((Math.random()*4))
        
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

         const currentQuize = await userModel.updateOne({email} , {$set : {currentQuize : dataCopy}}, {upsert:true})
        if(!currentQuize.modifiedCount) return NextResponse.json({error:"something went wrong"} ,{status:500})
        return NextResponse.json({status:"success"} , {status:200})
    } catch (error) {
        return NextResponse.json({error:error.message} , {status:500})
    }

}



export async function GET(req){
    try {
        await connectDB()
        const email =  await checkUserExistence(req)
        const currentQuize = await userModel.findOne({email} , {currentQuize : 1 , _id :0})
        return NextResponse.json(currentQuize, {status:200})
    } catch (error) {
        console.log(error);
    }
 
}