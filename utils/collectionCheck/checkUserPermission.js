import userModel from "@/model/usermodel"
import connectDB from "../connectionToDB"

const { decode } = require("jsonwebtoken")

const checkUserPermission = async(cookie)=>{
   const {name , value} = cookie || {name:"" , value:""}
   if(!name || !value) return false

   const {email , exp} = decode(value)
   if(!email , !exp) return false

 await connectDB()
 const user = await userModel.findOne({email})
 if(!user) return false

 if(Date.now > (exp*1000)){
    return false
 }
 
 return {user:{email :user?.email , username: user?.username} , status:"authenticated"}
}

export default checkUserPermission