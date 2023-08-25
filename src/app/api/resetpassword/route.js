import connectToDatabase from "../../../db/connection";
import Signup from "../../../Collections/Signup";
import { NextResponse } from 'next/server';
const bcrypt=require("bcrypt")

connectToDatabase()

export async function POST(req){
  const body=await req.json()
console.log('jsjs',body.random)
    try {
      
      let Req=await Signup.findOneAndUpdate({email:body.email},{password:bcrypt.hashSync(body.cpassword,10)})
      console.log(Req)
      return NextResponse.json({success:true });
    } catch (error) {
    //   console.error("Error saving product:", error);
      return NextResponse.json({ok:error });
    }
 
}

