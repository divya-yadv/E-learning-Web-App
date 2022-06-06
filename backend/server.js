import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoute.js';
import courseRouter from './routes/courseRoutes.js';
import userRouter from './routes/userRoutes.js';
//create express app
dotenv.config();
const app = express();
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to db');
  })
  .catch((error) => {
    console.log(error.message);
  });
//create api to send data from this path
app.use('/api/seed', seedRouter);
app.use('/api/courses', courseRouter);
app.use('/api/users', userRouter);
//listen to port
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
