'use client'
import Link from 'next/link'
import { useSelector } from 'react-redux';
import styles from './QuizePage.module.css'
import { PiArrowFatLineRightFill } from "react-icons/pi";
import { MdSettings } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { fetchQuiz } from '@/utils/reducers';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { DNA } from 'react-loader-spinner';


function QuizePage({quizOption , requestUrl}) {
    const {category , difficulty , type , amount} = quizOption
    const {result :{data , isLoading , Error }}  = useSelector(states => states.fetchStore)

    const dispatch = useDispatch()

   const router = useRouter()

    const saveCurrentQuize = async()=>{
        try {  
                const res = await fetch('/api/quiz/currentQuiz' , {
                    method:"POST"  , body :JSON.stringify(data) , headers :{"Content-Type" : "application/json"} ,
                     credentials:"include"
                })
                const response = await res.json()
                if(response.status != "success" && !data?.length){
                    toast.error('too many request , try again later')
                    setTimeout(() => {
                        router.push('/quiz')
                    }, 2000);
                }else{
                    router.push("/quiz/start")
                }
        } catch (error) {
            toast.error(error.message)
            router.push("/quiz")
        }
     }

    const startHandler = async()=>{
          await saveCurrentQuize()    
    }

    useEffect(()=>{
        dispatch(fetchQuiz(requestUrl))
    },[])
    
  if(isLoading) return <DNA width="100%" />
  return (
    <div className={styles.container}>
        <div className={styles.left}>
            <p>category : <span> {!category ? "any" : Object.keys(category)[0]}</span> </p>
            <p>difficulty : <span>{!difficulty ? "any" : Object.keys(difficulty)[0]}</span></p>
            <p>answers type : <span>{!type ? "any" : Object.keys(type)[0]}</span></p>
            <p>Number of questions : <span>{amount}</span></p>
        </div>
        <div className={styles.right}>
              <Link onClick={startHandler} href="">Start quiz <PiArrowFatLineRightFill/></Link>
              <Link href="/profile">Change setting <MdSettings/></Link>
        </div>
        <Toaster />
    </div>
  )
}

export default QuizePage