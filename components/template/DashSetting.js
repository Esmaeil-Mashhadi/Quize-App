'use client'
import styles from "./DashSetting.module.css"
import { FaUserGraduate } from "react-icons/fa";
import { MdMarkEmailRead } from "react-icons/md";
import { HiLogout } from "react-icons/hi";
import { FaRegEdit } from "react-icons/fa";
import { MdPublishedWithChanges } from "react-icons/md";



import { useEffect, useState } from "react";
import toast from 'react-hot-toast'
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import TotalShape from "../modules/TotalShap";

function DashSetting({user}) {

  const [isEdit , setIsEdit] = useState(false)
  const router = useRouter()
  const [data , setData] = useState({
    username: user?.username
  })


  const changeHandler = (e)=>{
    setData({username : e.target.value})
  }

  const logOutHandler = ()=>{
    Cookies.remove("Authorization")
    router.push("/")
    router.refresh()
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


  const editHandler = (e)=>{
    e.stopPropagation() 
    setIsEdit(true)
  }

  useEffect(()=>{
    window.addEventListener("click" , (e)=>{
      if(!e.target.closest(`.${styles.username}`)){
        setIsEdit(false)
      } 
    })
    router.refresh()
  },[])


  return (
    <div className={styles.container}>
        
    <div className={styles.left}>
    
         <button className={styles.logOut} onClick={logOutHandler}> Log out <HiLogout/></button>

        <div className={styles.profile}>
           <MdMarkEmailRead/> <span> Email </span> : <p>{user.email}</p>
        </div>
          <div className={styles.username}>
            <FaUserGraduate/> <span> username</span> :
            {isEdit ? <input value={data.username} onChange={changeHandler} /> : <p> {user.username}</p>}           
            {!isEdit ?  <p onClick={editHandler} className={styles.editIcon}> <FaRegEdit/></p>
            : <p className={styles.editIcon} onClick={submitChange}> <MdPublishedWithChanges /></p>}
            <p className={styles.changeUsername}>{isEdit? "submit change" : "change username" }</p>
          </div> 
    </div>

      <div className={styles.right}>
        <TotalShape userScore={user?.userScore} />
      </div>
    </div>
  )
}

export default DashSetting