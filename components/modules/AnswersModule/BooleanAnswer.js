import { saveScore } from '@/utils/saveScoreToBackend';
import styles from './BooleanAnswer.module.css'
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";


function BooleanAnswer({dataStorage , setUserChoice , userChoice , questionIndex}) {

  const { correctIndex , difficulty} = dataStorage[questionIndex]

  const answerStyles = {
    '--wrong' :" rgba(253, 69, 69, 0.637)",
    '--right' :"rgba(47, 245, 47, 0.582)"
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

    {["true" , 'false'].map((item , index)=>{
      return <button disabled ={Object.keys(userChoice).length} style={userChoice[index] == "correct" ? {background:answerStyles['--right']}
      : userChoice[index] =="wrong" ? {background:answerStyles['--wrong']}  : null} key={index} onClick={()=>answerHandler(index)}>
      {item == "true" ? <p> <AiOutlineLike/> True</p>  : <p><AiOutlineDislike/> False </p> }
      </button>
    })}
             <div className={styles.circle}>
                 <div className={styles.subCircle}>
                        <img src='/svgs/question.png' />              
                 </div>
             </div>
    </div>
  )
}

export default BooleanAnswer