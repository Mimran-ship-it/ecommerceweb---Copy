import connectToDatabase from "../../middleware/connection";
import Product from "../../Collections/Product";

const handler=async (req, res)=> {
  if (req.method === "POST") 
  {
    try {
      const p = new Product({
        name: 'req.body',
        quantity: 22,
        color: '{ type: String }',
        size: '{ type: String }',
        desc: '{ type: String }',
        image: '{ type: String, required: true }',
        slug:21
      });

      await p.save();

      res.status(200).json({ ok: 'done' });
    } catch (error) {
      console.error("Error saving product:", error);
      res.status(500).json({ error: "Error saving product" });
    }
  } else {
    res.status(404).json({ ok: 'done' });
  }
}


export default  connectToDatabase(handler)
