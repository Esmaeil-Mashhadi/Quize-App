import { useEffect, useState } from 'react'
import styles from './TotalShape.module.css'
import { BsQuestionSquareFill } from "react-icons/bs";
import { GrScorecard } from "react-icons/gr";
import { FaCalendarCheck } from "react-icons/fa6";
import { BiCategoryAlt } from "react-icons/bi";



function TotalShape({userScore}) {
   
   const {totalCorrect , totalQuestions , totalScore} = userScore.reduce((acc , curr)=>{
        let {score, totalQuestions , totalCorrectAnswers} = curr
        acc.totalScore += score
        acc.totalQuestions += totalQuestions
        acc.totalCorrect += totalCorrectAnswers
        return acc
    }, {totalCorrect: 0 , totalQuestions:0 , totalScore: 0})

  
    const [number , setNumber] = useState(0)
    const [acc , setAcc] = useState(0)
    const accuracy = `${(totalCorrect /totalQuestions )*100}%`
    const degree = parseFloat(accuracy)/100 * 360 

    const accStyle = {
        '--deg' : `${number}deg`
    }


    useEffect(()=>{
      if(acc == 0 && totalQuestions == 0 ){
        setNumber(0)
        setAcc(0)
      }else{
        const fillTheCircle = setInterval(() => {
          setNumber((prev)=>{
              return prev + 1
          })
      }, 3);    
      if (degree <= number ) {
          clearInterval(fillTheCircle)
        }
        return () => {
          clearInterval(fillTheCircle)
        }
      }

    
    },[number]) 

    useEffect(()=>{
      if(acc == 0 && totalQuestions == 0 ){
        setNumber(0)
        setAcc(0)
      }else{
        const fillTheAccuracy = setInterval(() => {
          setAcc((prev)=>{
              return prev + 1
          })
      }, 18);


        if(acc >= parseInt(accuracy)){
          clearInterval(fillTheAccuracy)
        }
    
  
        return () => {
          clearInterval(fillTheAccuracy)
        }
      }

    },[acc])


  return (
    <div className={styles.container}>
   
      <div style={accStyle} className={styles.conicContainer}>
            <p>accurecy : {acc}%</p>
      </div>

      <div className={styles.scoreContainer}>
        <h4><BiCategoryAlt /> Category : All</h4>
        
           <p><BsQuestionSquareFill/> total Questions : {totalQuestions}</p>
           <p> <GrScorecard/> total Score : {totalScore}</p>
           <p> <FaCalendarCheck/> total correct answers : {totalCorrect}</p>
        
      </div>
   </div>

  )
}

export default TotalShape