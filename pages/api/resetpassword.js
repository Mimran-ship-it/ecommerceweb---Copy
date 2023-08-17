import connectToDatabase from "../../middleware/connection";
import Signup from "../../Collections/Signup";


const handler=async (req, res)=> {
  if (req.method === "POST") 
  {console.log('jsjs',req.body.random)
    try {
      
      let Req=await Signup.findOneAndUpdate({email:req.body.email},{password:req.body.cpassword})
      res.status(200).json({success:true });
    } catch (error) {
    //   console.error("Error saving product:", error);
      res.status(500).json({ok:error });
    }
  } else {
    res.status(404).json({  });
  }
}


export default  connectToDatabase(handler)