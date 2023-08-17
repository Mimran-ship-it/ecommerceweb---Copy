import connectToDatabase from "../../middleware/connection";
const bcrypt=require("bcrypt")
import Signup from "../../Collections/Signup";

const handler=async (req, res)=> {
  if (req.method === "POST") 
  {
    try {
      console.log(req.body.password)
      let Req=await Signup.findOne({email:req.body.email})
      console.log(Req)
      const ismatch = await bcrypt.compare(req.body.password, Req.password);

      res.status(200).json({success:ismatch});
    } catch (error) {
    //   console.error("Error saving product:", error);
      res.status(500).json({ok:error });
    }
  } else {
    res.status(404).json({  });
  }
}


export default  connectToDatabase(handler)