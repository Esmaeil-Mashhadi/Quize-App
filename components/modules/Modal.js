import { useEffect, useState } from 'react';
import styles from './Modal.module.css'
import { GiTrophyCup } from "react-icons/gi";
import {  DNA, MutatingDots } from 'react-loader-spinner';
import Shape from './Shape';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';


function Modal({setShowModal}) {

        const router = useRouter()
    const finishHandler = async()=>{
        setShowModal(false)
        const res = await fetch("/api/quiz/finish" , {
                method:"PATCH"
        })
        const result = await res.json()
        if(result.status == 'success'){
                toast.success(result.message)
                  router.push('/quiz')

        }else{
                toast.error("failed to save score")
        }
    }

    const [userScore , setUserScore] = useState(null)

    useEffect(()=>{
        const getUserResult = async ()=>{
                const res = await fetch('/api/quiz/currentScore')
                 const data = await res.json()
                         setUserScore(data)
        }
        getUserResult() 
    },[])
    

    if(!userScore) return <DNA />

  return (
    <div className={styles.container}>
            <div className = {styles.modal}>
                    <div className={styles.leftSide}>
                            <label>Category : {userScore?.category}</label>
                            <label>Total Question : {userScore?.totalQuestions}</label>
                            <label>correct answers : {userScore?.correctAnswers}</label>
                            <label>not answered / wrong answered : {userScore?.notAnswered}</label>
                            <label>your score : {userScore?.yourScore}</label>
                    </div>

                    <div className={styles.rightSide}>
                            <Shape userScore = {userScore}/>
                    </div>
            </div>

             <button onClick={finishHandler}>
                     Finish <GiTrophyCup/>
             </button>
             <Toaster />
    </div>
  )
}

export default Modal