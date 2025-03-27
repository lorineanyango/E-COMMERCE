import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import cookieParser from 'cookie-parser';
import {connectDB} from './config/db.mjs';
import userRoutes from './routes/userRoutes.mjs';
import categoryRoutes from './routes/categoryRoute.mjs';

dotenv.config();
connectDB();


const app = express();
app.use(cookieParser());
app.use(express.json());// allowa the server to send json data to the client side
const PORT = process.env.PORT || 5000;
app.use(express.urlencoded({extended: true})); //a middleware topass form data
app.use("/api/users", userRoutes);
app.use("/api/categorys", categoryRoutes);

app.get('/', (req, res)=>{
  res.send('hello world');
})

app.listen(PORT,()=>{
  console.log(`Server is running on port ${PORT}.....`);
});