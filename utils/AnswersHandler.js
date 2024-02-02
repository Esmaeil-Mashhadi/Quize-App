export const AnswersHandler = (incorrect , correct , randomIndex)=>{
    let answers = []
    if(incorrect && correct){
        answers = [...incorrect]
        answers.splice(randomIndex , 0 , correct)      
    }

   return {
    answers , correctAnswer : randomIndex
   }
}