export const requestUrlHandler = (quizOptions)=>{
    let URL = process.env.BASE_URL
    const {category , difficulty , amount , type} = quizOptions  
    if(amount){
        URL+=`?amount=${amount}`
       }else{
        URL+=`?amount=10`
       }
   const [categoryValue] = Object.values(category)
   if(categoryValue){
    URL += `&category=${categoryValue}`
   }
   const [difficultyValue] = Object.values(difficulty)
   if(difficultyValue){
    URL+=`&difficulty=${difficultyValue}`
   }
   const [typeValue] = Object.values(type)
   if(typeValue){
    URL+=`&type=${typeValue}`
   }
 return URL  
}