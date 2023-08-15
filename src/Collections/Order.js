
import mongoose from "mongoose";
import connectToDatabase from "@/db/connection";
const orderSchema = new mongoose.Schema({
  name: { type: String, required:true },
  Lastname: { type: String, required:true },
  StreetAdress: { type: String, required:true },
  Email: { type: String, required:true },
  postalCode: { type: Number , default: 1 },
  phoneNumber: { type: Number , default: 1 },
  productName:{type:Object,required:true},
  price:{type:Number,required:true},
  
  
},{timestamps:true});

await connectToDatabase()
mongoose.models={}
let Order = mongoose.model('Order',orderSchema);
export default Order;