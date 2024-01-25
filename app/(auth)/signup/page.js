import Signup from '@/components/template/Signup'
import checkUserPermission from '@/utils/checkUserPermission'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

async function page () {
  const cookie = cookies().get('Authorization')
  const permission = await  checkUserPermission(cookie) 
 
 if(permission) redirect('/')

  return (
    <div>
      <Signup/>
    </div>
  )
}

export default page