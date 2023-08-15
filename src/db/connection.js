import mongoose from "mongoose";
const connectToDatabase =async (req,res)=>{
  if(mongoose.connections[0].readyState){
    console.log('connected')
   
  }
  await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
 
}



export default connectToDatabase;
