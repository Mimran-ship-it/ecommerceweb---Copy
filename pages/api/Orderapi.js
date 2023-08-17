import connectToDatabase from "../../middleware/connection";
import Order from "../../Collections/Order";

const handler=async (req, res)=> {
  if (req.method === "POST") 
  {
    try {
      const p = new Order({
        name:req.body.name ,
        Lastname:req.body.LastName,
        StreetAdress:req.body.StreetAdress ,
        Email:req.body.email ,
        postalCode: req.body.PostalCode,
        phoneNumber: req.body.PhoneNumber,
        productName:req.body.productName,
        price:req.body.price
        
      });

      const savedOrder = await p.save();
      const generatedId = savedOrder._id;
let order=await Order.findOne({_id:generatedId})
      res.status(200).json(order);
    } catch (error) {
      console.error("Error saving Order:", error);
      res.status(500).json({ error: true});
    }
  } else {
    res.status(404).json({ ok: 'done' });
  }
}


export default  connectToDatabase(handler)