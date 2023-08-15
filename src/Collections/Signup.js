import mongoose from "mongoose";
import connectToDatabase from "@/db/connection";
const signupSchema=new mongoose.Schema({
name:{type:'String', required:true},
email:{type:'String', required:true,unique:true},
password:{type:'String', required:true},

})
async function func(){
    await connectToDatabase()
    mongoose.models={}
}
func()
let Signup = mongoose.model('Signup',orderSchema);
export default Signup