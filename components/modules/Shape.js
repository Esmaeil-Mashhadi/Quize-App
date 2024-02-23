import styles from './Shape.module.css'
import { useEffect, useState } from 'react'

function Shape({userScore}) {
    
    const correctAnswer = userScore?.correctAnswers || 0
    const totalQuestions =userScore?.totalQuestions || 0
  
    const [number , setNumber] = useState(0)
    const [acc , setAcc] = useState(0)
    const accuracy = `${(correctAnswer /totalQuestions )*100}%`
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
    <div style={accStyle} className={styles.conicContainer}>
            <p>{acc}%</p>
    </div>
  )
}

export default Shape