import ProfilePage from "@/components/template/ProfilePage"
import quizModel from "@/model/quizModel";
import checkUserPermission from "@/utils/collectionCheck/checkUserPermission"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import React from 'react';

const page = async() => {
      const cookie = cookies().get("Authorization")
      const {user , status} = await checkUserPermission(cookie)
      if(status !== "authenticated") redirect('/signup')
      const quizOptions = await quizModel.findOne({user : user?.email} , {user :0 , _id :0 , "__v" :0})
      return (
            <div>
                  <ProfilePage quizOptions = {JSON.parse(JSON.stringify(quizOptions))} user ={user} />
            </div>
      );
};

export default page;