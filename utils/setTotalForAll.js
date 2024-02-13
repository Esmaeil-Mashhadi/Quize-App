export const setTotalForAll = (userScore)=>{
 return   userScore.reduce((acc , curr)=>{
        let {score, totalQuestions , totalCorrectAnswers} = curr
        acc.totalScore += score
        acc.totalQuestions += totalQuestions
        acc.totalCorrect += totalCorrectAnswers
        return acc
    }, {totalCorrect: 0 , totalQuestions:0 , totalScore: 0})

}