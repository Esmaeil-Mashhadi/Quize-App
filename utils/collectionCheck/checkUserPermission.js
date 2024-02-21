import userModel from "@/model/usermodel"
import connectDB from "../connectionToDB"

const { decode } = require("jsonwebtoken")

const checkUserPermission = async(cookie)=>{
   const {name , value} = cookie || {name:"" , value:""}
   if(!name || !value) return false

   const {email , exp} = decode(value)
   if(!email , !exp) return false

 await connectDB()
 const data = await userModel.findOne({email} , {email : 1 , username : 1 , userScore : 1 , currentQuiz : 1 , _id: 0})
 const user = JSON.parse(JSON.stringify(data))
 if(!user) return false 

 if(Date.now > (exp*1000)){
    return false
 }

 return {user:{email :user?.email  , username: user?.username , userScore: user.userScore , currentQuiz:user.currentQuiz } , status:"authenticated"}
}

export default checkUserPermission