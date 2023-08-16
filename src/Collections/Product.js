import mongoose ,{model} from "mongoose";
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

  mongoose.models={}
let Product = mongoose.model('Product',productSchema);
export default Product;