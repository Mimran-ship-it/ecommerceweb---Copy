import connectToDatabase from "../../../db/connection";
const bcrypt=require("bcrypt")
import Signup from "../../../Collections/Signup";
import {  NextResponse } from 'next/server';

connectToDatabase()


export async function POST(req){
    try {
      let body=await req.json()
      const p = new Signup({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password,10),
      });

      await p.save();

    return  NextResponse.json({success:true});
    } catch (error) {
    //   console.error("Error saving product:", error);
     return NextResponse.json({ok:false });
    }
  
}
