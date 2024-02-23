import LeaderBoard from '@/components/template/LeaderBoard';
import userModel from '@/model/usermodel';
import connectDB from '@/utils/connectionToDB';
import React from 'react';

async function LeaderBoardPage({ searchParams }) {
  let users;
  const cateList = [];

  await connectDB();

  const getAllUsers = async ()=>{
   const  users = await userModel
    .find({}, { userScore: 1, totalScore: 1, username: 1, _id: 0 })
    .sort({ totalScore: -1 })
    .limit(10);
    return users
  }

  if (!Object.keys(searchParams).length) {
     users = await getAllUsers()
    users.forEach((item) => {
      cateList.push(...item.userScore.map((item) => item.category));
    });
  } else {
    users = await userModel
      .find({ 'userScore.category': searchParams.category })
      .sort({ 'userScore.score': -1 })
      .limit(10);

    const allUsers =await getAllUsers()
    allUsers.forEach((item) => {
      cateList.push(...item.userScore.map((item) => item.category));
    });
  }

  return (
      <LeaderBoard cateList={cateList} searchParams={searchParams} users={JSON.parse(JSON.stringify(users))} />
  );
}

export default LeaderBoardPage;