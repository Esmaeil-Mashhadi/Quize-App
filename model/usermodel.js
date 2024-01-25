const { default: mongoose, model, models } = require("mongoose");

const userSchema  = new mongoose.Schema({
    email : {type:String , required:true},
    password: {type:String , required: true},
    username :{type:String , unique: true  , required: true}
}, {timestamps:true}) 


const userModel = models.user || model('user' , userSchema)

export default userModel