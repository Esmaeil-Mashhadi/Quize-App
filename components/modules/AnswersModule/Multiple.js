import toast, { Toaster } from 'react-hot-toast'
import styles from './Multiple.module.css'
import { saveScore } from '@/utils/saveScoreToBackend'

function Multiple({dataStorage , setUserChoice , userChoice , questionIndex}) {

  const {allAnswers , correctIndex , difficulty} = dataStorage[questionIndex]
   const answerStyles = {
    '--wrong' :"red",
    '--right' :"green"
   }

   const myScore = difficulty == 'easy' ? 10 : difficulty == "medium" ? 15 : difficulty == "hard" ? 20 : null

   const answerHandler = async(index)=>{
      if(index == correctIndex){
          setUserChoice({[index] :"correct"})
          const score = myScore
          const result = await saveScore(dataStorage , questionIndex , index , score)
        if(result.status !="success"){
            toast.error("something went wrong")
        }
      }else{
        const result = await saveScore(dataStorage , questionIndex , index , 0 , correctIndex)
        if(result.status !="success"){
          toast.error("something went wrong")
      }
        setUserChoice({[index] : "wrong" , [correctIndex] : "correct"})
      }
   }

  return (
    <div className={styles.container}>

    <div className={styles.buttonContainer}>
       {allAnswers?.map((item , index) => (
        <button disabled={Object.keys(userChoice).length}  style={userChoice[index] == "correct" ? {background:answerStyles['--right']}
              : userChoice[index] =="wrong" ? {background:answerStyles['--wrong']}  : null}
              onClick={()=>answerHandler(index)}>{item}
       </button>
         ))} 
    </div>
    <div className={styles.circle}>
        <div className={styles.subCircle}>
               <img src='/svgs/question.png' />              
        </div>
    </div>
        <Toaster />
  </div>
  )
}

export default Multiple