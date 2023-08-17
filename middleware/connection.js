import mongoose from "mongoose";
const connectToDatabase = handler=>async (req,res)=>{
  if(mongoose.connections[0].readyState){
    console.log('connected')
   return handler(req,res)
  }
  await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  return handler(req,res)
}



export default connectToDatabase;
