export const userChoice = (state  , list)=>{
 const result = Object.entries(list).find(([key , value])=>{
         if(value == state[key]){
            return key
         }
    })
    if(result){
        return result[0]
    }else{
        return false
    }
}