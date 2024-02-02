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



function QuizePage({quizOption , requestUrl}) {
    const {category , difficulty , type , amount} = quizOption
    const {result :{data}}  = useSelector(states => states.fetchStore)

    const dispatch = useDispatch()

   const router = useRouter()
    const saveCurrentQuize = async()=>{
      const res = await fetch('/api/quiz/currentQuiz' , {
          method:"POST"  , body :JSON.stringify(data) , headers :{"Content-Type" : "application/json"} ,
           credentials:"include"
      })
      const response = await res.json()
      console.log(response);
      if(response.status !=="success"){
          toast.error('something went wrong try again')
          setTimeout(() => {
              router.push('/quiz')
          }, 2000);
      }
     }

     // quize sending url is random for preventing questions to be changed after reload 
     // we saved our current quize on data base to keep it and generating new question 
     // only happens when user click Start the quize 
    const startHandler = ()=>{
         localStorage.clear()
        dispatch(fetchQuiz(requestUrl))
        saveCurrentQuize()
    }

  return (
    <div className={styles.container}>
        <div className={styles.left}>
            <p>category : <span> {!category ? "any" : Object.keys(category)[0]}</span> </p>
            <p>difficulty : <span>{!difficulty ? "any" : Object.keys(difficulty)[0]}</span></p>
            <p>answers type : <span>{!type ? "any" : Object.keys(type)[0]}</span></p>
            <p>Number of questions : <span>{amount}</span></p>
        </div>
        <div className={styles.right}>
              <Link onClick={startHandler} href="/quiz/start">Start quiz <PiArrowFatLineRightFill/></Link>
              <Link href="/profile">Change setting <MdSettings/></Link>
        </div>
        <Toaster />
    </div>
  )
}

export default QuizePage