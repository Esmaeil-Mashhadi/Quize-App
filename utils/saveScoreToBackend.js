export const saveScore = async(dataStorage , questionIndex , index , score , correctIndex)=>{
    const prevChoice = score ? {[index]:'correct'} : {[index]:"wrong" , [correctIndex]:"correct"}
    const res = await fetch('/api/quiz/saveScore' , {
        method:"POST" , body:JSON.stringify({score , category : dataStorage[questionIndex]?.category ,
           totalQuestions : dataStorage?.length , prevChoice})
      })
      return await res.json()
}