import LeaderBoard from '@/components/template/LeaderBoard'
import userModel from '@/model/usermodel'
import connectDB from '@/utils/connectionToDB'
import React from 'react'

async function LeaderBoardPage() {
  await connectDB()
  const users = await userModel.find({} , {userScore: 1 , username: 1 , _id:0})
  return (
    <div>
      <LeaderBoard users = {users}/>
    </div>
  )
}

export default LeaderBoardPage