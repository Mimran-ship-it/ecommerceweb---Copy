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
await connectToDatabase()
mongoose.models={}
productSchema.index({ name: 1 }, { unique: false }); // Make 'name' index non-unique
productSchema.index({ slug: 1 }, { unique: false }); // Make 'slug' index non-unique
productSchema.index({ quantity: 1 }, { unique: false }); // Make 'slug' index non-unique

let Product = mongoose.model('Product',productSchema);
export default Product;