import toast, { Toaster } from 'react-hot-toast'
import styles from './Multiple.module.css'

function Multiple({dataStorage , setUserChoice , userChoice , questionIndex}) {

  const {allAnswers , correctIndex} = dataStorage[questionIndex]
   const answerStyles = {
    '--wrong' :"red",
    '--right' :"green"
   }

   const answerHandler = async(index)=>{
      if(index == correctIndex){
          const score = 10
        const res = await fetch('/api/quiz/saveScore' , {
          method:"POST" , body:JSON.stringify({score , category : dataStorage[questionIndex]?.category ,
             totalQuestions : dataStorage?.length})
        })
         const result = await res.json()
        if(result.status !="success"){
            toast.error("something went wrong")
        }else{
          setUserChoice({[index]: "correct"})
        }
      }else{
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