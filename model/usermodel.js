const { default: mongoose, model, models } = require("mongoose");



const scoreSchema = new mongoose.Schema({
    category: {type:String , required:true},
    score : {type:Number ,  default : 0  , required:true} ,
    totalCorrectAnswers :{type:Number , default:0 , required:true},
    totalQuestions : {type :Number , required:true},
})

const userSchema  = new mongoose.Schema({
    email : {type:String , required:true},
    password: {type:String , required: true},
    username :{type:String , unique: true  , required: true},
    currentQuize :{type:[Object] , default :[]},
    currentScore : {type: [scoreSchema]},
    prevChoice : {type:[Object] , default:[]},
    userScore: {type : [scoreSchema]}

}, {timestamps:true}) 


const userModel = models.user || model('user' , userSchema)

export default userModel