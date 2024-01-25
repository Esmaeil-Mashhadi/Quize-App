import ProfilePage from "@/components/template/ProfilePage"
import Signup from "@/components/template/Signup";
import checkUserPermission from "@/utils/checkUserPermission"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import React from 'react';

const page = async() => {
      const cookie = cookies().get("Authorization")
      const {user , status} = await checkUserPermission(cookie)
      if(status !== "authenticated") redirect('/signup')
      return (
            <div>
                  <ProfilePage user ={user} />
            </div>
      );
};

export default page;