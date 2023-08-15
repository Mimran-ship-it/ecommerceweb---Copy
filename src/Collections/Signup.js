import mongoose from "mongoose";
import connectToDatabase from "@/db/connection";
const signupSchema=new mongoose.Schema({
name:{type:'String', required:true},
email:{type:'String', required:true,unique:true},
password:{type:'String', required:true},

})
connectToDatabase()
mongoose.models={}
const Signup=mongoose.model('Signup',signupSchema)
export default Signup