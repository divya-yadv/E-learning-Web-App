import express from 'express';
import User from '../models/userModel.js';
const userRouter = express.Router();

userRouter.post('/signup', async (req, res) => {
  const user = req.body.data;
  try {
    await User.insertOne({ user });
  } catch (error) {
    res.status(404).send({ message: 'Course Not Found' });
  }
});

export default userRouter;
