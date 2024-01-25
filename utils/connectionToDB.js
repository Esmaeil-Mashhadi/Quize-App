import mongoose from "mongoose";

const connectDB = async()=>{
    if(mongoose.connections[0].readyState) return
    mongoose.set('strictQuery' , false)
     await mongoose.connect(process.env.DB_URL)
    console.log('connected to data base');

}


export default connectDB