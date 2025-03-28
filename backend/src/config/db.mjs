import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Sucessfully connected to the database ✅');
    
  } catch (error) {
    console.error(`error ${error.message}`);
  }
  
}