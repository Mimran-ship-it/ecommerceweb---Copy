import connectToDatabase from "../../../db/connection";
import Signup from "../../../Collections/Signup";
import { NextResponse } from "next/server";
connectToDatabase()
// utils/emailService.js
const nodemailer = require('nodemailer');

// Create a transporter using the default SMTP transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mimran.ug22smme@gmail.com', // Your Gmail email address
    pass: 'zxlbpueuuxaqkxlh'   // Your Gmail password or an app-specific password
  }
});

// Function to send an email
async function sendEmail(to, subject, text) {
  const mailOptions = {
    from: 'mimran.ug22smme@gmail.com',
    to,
    subject,
    text
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}



export async function POST(req){
  let body=await req.json()
  
  console.log('jsjs',body.random)
    try {
      
      let Req=await Signup.findOne({email:body.email})
      console.log(Req)
      if(Req){
        let to=body.email
        let Subject='Reset Password'
        const token =body.random;
        let text=`Dear ${Req.name},
        If you've forgotten your Maani-Wear account password, don't worry! We're here to help you regain access to your account. Follow the steps below to reset your password:
        
       Your token is
        ${token}
        
        You'll be taken to a secure page where you can set a new password for your account.
        
        If you didn't initiate this password reset, please ignore this email. Your account will remain secure.
        
        Thank you for using Maani-Wear!
        
        Best regards,
        The Maani-Wear Team
        
       `
        sendEmail(to,Subject,text)
        
       return NextResponse.json({success:'ismatch'});
    }else {return NextResponse.json({success:false})}
    } catch (error) {
    //   console.error("Error saving product:", error);
     return NextResponse.json({ok:error });
    }
  
}

