import connectToDatabase from "../../../db/connection";
const bcrypt=require("bcrypt")
import Signup from '../../../Collections/Signup'
import { NextResponse } from 'next/server';

connectToDatabase()

export async function POST(req){
 
  try {
    let body=await req.json()
    
     const email = body.email;
    const password = body.password;
  
    console.log(password)
    let Req=await Signup.findOne({email:email})
    console.log(Req)
    const ismatch = await bcrypt.compare(password, Req.password);
  
  return  NextResponse.json({success:ismatch});
  } catch (error) {
    console.error("Error saving product:", error);
    return NextResponse.json({ok:error });
  }
  }