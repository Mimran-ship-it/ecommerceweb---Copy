import mongoose from "mongoose";

const connectToDatabase = async () => {
  try {
   
    
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('Connected to the database.');
  } catch (error) {
    console.error('Database connection error:', error);
  }
};

export default connectToDatabase;
