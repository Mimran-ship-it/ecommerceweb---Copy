import connectToDatabase from "../../middleware/connection";
const bcrypt=require("bcrypt")
import Signup from "../../Collections/Signup";

const handler=async (req, res)=> {
  if (req.method === "POST") 
  {
    try {
      const p = new Signup({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password,10),
      });

      await p.save();

      res.status(200).json({success:true});
    } catch (error) {
    //   console.error("Error saving product:", error);
      res.status(500).json({ok:false });
    }
  } else {
    res.status(404).json({  });
  }
}


export default  connectToDatabase(handler)