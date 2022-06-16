import express, { urlencoded } from 'express';
import Image from './models/imageModel.js';
import multer from 'multer';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoute.js';
import courseRouter from './routes/courseRoutes.js';
import userRouter from './routes/userRoutes.js';
import cors from 'cors';
//create express app
dotenv.config();
const app = express();
app.use(cors());
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connected to db');
  })
  .catch((error) => {
    console.log(error.message);
  });

//create api to send data from this path
app.use('/api/seed', seedRouter);
app.use('/api/courses', courseRouter);
app.use('/', userRouter);

const __dirname = path.resolve();
// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '/frontend/build')));

// AFTER defining routes: Anything that doesn't match what's above, send back index.html; (the beginning slash ('/') in the string is important!)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/frontend/build/index.html'));
});
//listen to port
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
let port = process.env.PORT;
if (port == null || port == '') {
  port = 5000;
}

app.listen(port, function () {
  console.log('Server started succesfully');
});
