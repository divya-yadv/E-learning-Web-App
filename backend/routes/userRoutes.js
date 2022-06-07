import express from 'express';
import User from '../models/userModel.js';
import expressAsyncHandler from 'express-async-handler';
const userRouter = express.Router();

userRouter.post(
  '/signup',
  express.json(),
  expressAsyncHandler(async (req, res) => {
    const newUser = new User({
      name: req.body.name,
      user_name: req.body.email,
      email: req.body.email,
      type: req.body.type,
    });
    const user = await newUser.save();
    res.send('receieved');
  })
);

userRouter.post(
  '/signin',
  express.json(),
  expressAsyncHandler(async (req, res) => {
    const email = req.body.email;
    try {
      const getUser = await User.findOne({ email: email });
      res.send(getUser);
    } catch (error) {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

export default userRouter;
