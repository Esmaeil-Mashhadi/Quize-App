import { useEffect, useState } from 'react'
import styles from './Shape.module.css'

function Shape({userScore}) {

    const [number , setNumber] = useState(0)
    const [acc , setAcc] = useState(0)
    const accuracy = `${(userScore.correctAnswers / userScore.totalQuestions)*100}%`
    const degree = parseFloat(accuracy)/100 * 360 
    const ratio = Math.ceil(degree/acc)

    
    const accStyle = {
        '--deg' : `${number}deg`
    }

    useEffect(()=>{
        const fillTheCircle = setInterval(() => {
            setNumber((prev)=>{
                return prev + 1
            })
        }, 3);    


        if (degree <= number) {
            clearInterval(fillTheCircle)
          }

      
    
          return () => {
            clearInterval(fillTheCircle)
          }
    
    },[number]) 

    useEffect(()=>{
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
    },[acc])


  return (
    <div style={accStyle} className={styles.conicContainer}>
            <p>{acc}%</p>
    </div>
  )
}

export default Shape