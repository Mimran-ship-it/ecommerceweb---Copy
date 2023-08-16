import mongoose from "mongoose";
const signupSchema=new mongoose.Schema({
name:{type:'String', required:true},
email:{type:'String', required:true,unique:true},
password:{type:'String', required:true},

})

    mongoose.models={}
let Signup = mongoose.model('Signup',signupSchema);
export default Signup