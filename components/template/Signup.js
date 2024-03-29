'use client'
import styles from './Signup.module.css'
import Link from 'next/link'
import { formValidation } from '@/utils/formValidation'
import { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { RxEyeClosed } from "react-icons/rx";
import { ImEye } from "react-icons/im";



function Signup() {
    const [data , setData] = useState({
        email:"", 
        username:"",
        password: "" , 
        confirm: "" ,
        check:false , 
    })

    const router = useRouter()

    const [showEye , setShowEye] = useState(false)
    const [focused , setFocused] = useState({
        email:false , username : false , password : false , confirm:false
    })

    const changeHandler = (e)=>{
        const {name , value} = e.target
        if(name == 'check'){
            setData({
                ...data , [name] :e.target.checked
            })
        }else{
            setData({
                ...data , [name] : value
            })
        }
  
    }

    const focusHandler =(e)=>{
        setFocused({...focused , [e.target.name] : true})
    }

    const sendHandler = async()=>{
        const res = await fetch('/api/register' , {
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
    const result = formValidation(data)
    const prevent = !!Object.keys(result).length


  return (
    <div className={styles.container}>
           <Toaster />
        <div className={styles.formContainer}>
            <div className={styles.left}>
                 <h3>Sign up form</h3>

                <div className={styles.inputes}>
                        <input style={focused.email && result.emailError ? {background:"pink"} : null} name='email' onChange={changeHandler} required id='email' onFocus={focusHandler} />
                        <label htmlFor='email'>Email</label>
                        {focused.email && result.emailError && 
                         <p className={styles.errorMessage}>{result.emailError}</p>
                     }

                </div>
                <div className={styles.inputes}>
                        <input  style={focused.username && result.usernameError ? {background:"pink"} : null} name='username' onChange={changeHandler} required id='username' onFocus={focusHandler}  />
                        <label htmlFor='username'>Username</label>
                        {focused.username && result.usernameError && 
                                <p className={styles.errorMessage}>{result.usernameError}</p>
                        }
                </div>
                <div className={styles.inputes}>
                        <input type = {showEye ? "text" : "password"} style={focused.password && result.passwordError ? {background:"pink"} : null}  name='password' onChange={changeHandler} required id='password' onFocus={focusHandler}  />
                        <label htmlFor='password'>Password</label>
                        <div onClick={()=>setShowEye(!showEye)} className={styles.eyeContainer}>{showEye ? <ImEye/> :  <RxEyeClosed />}</div>
                        {focused.password && result.passwordError && 
                            <p className={styles.errorMessage}>{result.passwordError}</p>
                        }
                </div>
                <div className={styles.inputes}>
                        <input type='password' style={focused.confirm && result.confirmError ? {background:"pink"} : null} name='confirm' onChange={changeHandler} required id='confirm' onFocus={focusHandler}  />
                        <label htmlFor='confirm'>Confirm</label>
                        {focused.confirm && result.confirmError && 
                            <p className={styles.errorMessage}>{result.confirmError}</p>
                         }
                </div>
                <div className={styles.terms}>
                        <label>accept our terms and coniditions</label>
                        <input name='check' onChange={changeHandler}  type='checkbox' />
                </div>

                <div className={styles.already}>
                    <p>already have an acount ?</p>
                    <Link href="/login">Login</Link>
                </div>

                <button onClick={sendHandler} disabled = {prevent}
                 style={prevent? {opacity : ".5" , cursor:"none" } : null}
                 title={prevent ? 'check all the fields' : null}  className={styles.registerButton}>sign up</button>
            </div>


            <div className={styles.right}>
                <img src='quizeRegister.jpg' />
            </div>
        </div>
    </div>
  )
}

export default Signup