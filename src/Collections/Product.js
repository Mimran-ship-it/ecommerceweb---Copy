import mongoose ,{model} from "mongoose";
import connectToDatabase from "@/db/connection";
const productSchema = new mongoose.Schema({
  name: { type: String, required:true },
  quantity: { type: Number , default: 1 },
  slug: { type: Number, required: true },
  color: { type: String },
  size: { type: String },
  price: { type: Number },
  desc: { type: String },
  category: { type: String, required: true },
  image: { type: String, required: true },
},{timestamps:true});
async function func(){
  await connectToDatabase()
  mongoose.models={}
}
func()
let Product = mongoose.model('Product',orderSchema);
export default Product;