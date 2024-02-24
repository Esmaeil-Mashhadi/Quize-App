export const saveScore = async(dataStorage , questionIndex , index , score , correctIndex)=>{
    const res = await fetch('/api/quiz/saveScore' , {
        method:"POST" , body:JSON.stringify({score , category : dataStorage[questionIndex]?.category ,
           totalQuestions : dataStorage?.length , questionIndex , index , correctIndex})
      })
      return await res.json()
}