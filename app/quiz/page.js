import QuizePage from "@/components/template/QuizePage"
import quizModel from "@/model/quizModel"
import checkUserPermission from "@/utils/collectionCheck/checkUserPermission"
import connectDB from "@/utils/connectionToDB"
import { requestUrlHandler } from "@/utils/requestUrlHandler"
import { cookies } from "next/headers"

async function quiz() {
  await connectDB()
  const cookie = cookies().get('Authorization')
  const {user} = await checkUserPermission(cookie)
  const quizOptions = await quizModel.findOne({user : user?.email})
  const requestUrl = requestUrlHandler(quizOptions)


  return (
    <QuizePage  requestUrl = {requestUrl} quizOption = {JSON.parse(JSON.stringify(quizOptions))}/>
  )
}

export default quiz