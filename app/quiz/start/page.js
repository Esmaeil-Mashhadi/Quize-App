import StartQuize from '@/components/template/StartQuize'
import quizModel from '@/model/quizModel'
import checkUserPermission from '@/utils/checkUserPermission'
import connectDB from '@/utils/connectionToDB'
import { requestUrlHandler } from '@/utils/requestUrlHandler'
import { cookies } from 'next/headers'
import React from 'react'

async function page() {
  await connectDB()
  const cookie = cookies().get('Authorization')
  const {user} = await checkUserPermission(cookie)
  const quizOptions = await quizModel.findOne({user : user?.email})
  const requestUrl = requestUrlHandler(quizOptions)

  return (
    <StartQuize   requestUrl = {requestUrl}  />
  )
}

export default page