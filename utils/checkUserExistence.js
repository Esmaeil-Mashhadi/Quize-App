import userModel from "@/model/usermodel"
import { decode } from "jsonwebtoken"

export const checkUserExistence = async(req)=>{
    const cookie = req.headers.get('cookie').split('=')[1]
    // const postManCookie= req.headers.get('authorization').split(' ')[1]
    const {email} = decode(cookie)
    const user = await userModel.findOne({email})
    if(!user) return NextResponse.json({error:"user doesn't exist"} , {status:404})
    return email
}