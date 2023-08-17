import connectToDatabase from "../../middleware/connection";
import Signup from "../../Collections/Signup";
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



const handler=async (req, res)=> {
  if (req.method === "POST") 
  {console.log('jsjs',req.body.random)
    try {
      
      let Req=await Signup.findOne({email:req.body.email})
      console.log(Req)
      if(Req){
        let to=req.body.email
        let Subject='Reset Password'
        const token = req.body.random;
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
        
        res.status(200).json({success:'ismatch'});
    }else {res.status(200).json({success:false})}
    } catch (error) {
    //   console.error("Error saving product:", error);
      res.status(500).json({ok:error });
    }
  } else {
    res.status(404).json({  });
  }
}


export default  connectToDatabase(handler)