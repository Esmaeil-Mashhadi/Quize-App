'use client'
import Link from 'next/link'
import styles from './Signup.module.css'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

function Login() {
    const [data , setData] = useState({
        userInfo: "" ,
        password: "" , 
    })

    const router = useRouter()


    const changeHandler = (e)=>{
        const {name , value} = e.target
            setData({
                ...data , [name] : value
            })
    }



    const sendHandler = async()=>{
        const res = await fetch('http://localhost:3000/api/login' , {
            method:"POST" , body : JSON.stringify(data) , headers :{"Content-Type" :"application/json"}
        })
        const response = await res.json() 
        if(response.status == "success"){
            toast.success(response.message)
            setTimeout(()=>{
                router.push('/')
                router.refresh()
            },1000)
        }else{
            toast.error(response.error)
        }
    }

  return (
    <div className={styles.container}>
        <div className={styles.formContainer}>
            <div className={styles.left}>
                 <h3>Sign up form</h3>

                <div className={styles.inputes}>
                        <input  name='userInfo' onChange={changeHandler} required id='email' />
                        <label htmlFor='email'>username or email</label>
                </div>

                <div className={styles.inputes}>
                        <input   name='password' onChange={changeHandler} required id='password'  />
                        <label htmlFor='password'>Password</label>
                </div>

                <div className={styles.already}>
                    <p>don't have an acount ?</p>
                    <Link href="/signup">Sign up</Link>
                </div>

                <button onClick={sendHandler}
                 className={styles.registerButton}>Login</button>
            </div>


            <div className={styles.right}>
                <img src='quizeRegister.jpg' />
            </div>
        </div>
        <Toaster />
    </div>
  )
}

export default Login