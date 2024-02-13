'use client'
import styles from "./DashSetting.module.css"
import { FaUserGraduate } from "react-icons/fa";
import { MdMarkEmailRead } from "react-icons/md";
import { HiLogout } from "react-icons/hi";

import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import TotalShape from "../modules/TotalShap";

function DashSetting({user}) {

  const [isEdit , setIsEdit] = useState(false)
  const router = useRouter()
  const [data , setData] = useState({
    username: ""
  })

  const changeHandler = (e)=>{
    setData({username : e.target.value})
  }

  const logOutHandler = ()=>{
    Cookies.remove("Authorization")
    router.refresh() 
    router.replace("/")
  }
  const submitChange = async()=>{
    if(data.username){
      const res = await fetch('/api/username' , {
        method:"POST" , body :JSON.stringify({...data , email :user.email}) , headers :{"Content-Type" :"application/json"}
      })
      const result = await res.json()
      if(result.status == "success"){
        toast.success("user name changed successfully")
        setIsEdit(false)
        router.refresh()
      }else{
        toast.error(result.error)
      }
    }else{
      toast.error("username cant be empty")
    } 

  }

  useEffect(()=>{
    window.addEventListener("click" , (e)=>{
      if(!e.target.closest(`.${styles.username}`)){
        setIsEdit(false) 
      } 
    })
  },[])

  return (
    <div className={styles.container}>
        
    <div className={styles.left}>
         <button className={styles.logOut} onClick={logOutHandler}> Log out <HiLogout/></button>

        <div className={styles.profile}>
           <MdMarkEmailRead/> <span> Email </span> : {user.email}
        </div>
        <div className={styles.username}>
          <FaUserGraduate/> <span> Username </span> : {isEdit ? <input onChange={changeHandler} placeholder="enter new user name" />
              : user.username }
          {isEdit ? 
          <button onClick={submitChange}> submit change</button> 
          :<button onClick={()=>setIsEdit(true)}> Chage username</button>
           }
        </div>

    </div>

      <div className={styles.right}>
        <TotalShape userScore={user?.userScore} />
      </div>
      <Toaster />
    </div>
  )
}

export default DashSetting