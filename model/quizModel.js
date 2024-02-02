import mongoose from "mongoose"

const quizeSchema = new mongoose.Schema({
    user : {type:String , ref:'user'},
    category : {type:Object , default :{}},
    difficulty: {type:Object , default :{}},
    type:{type:Object , default :{}},
    amount : {type:String , default:"10"},
})


const quizModel = mongoose.models?.quiz || mongoose.model('quiz', quizeSchema)

export default quizModel