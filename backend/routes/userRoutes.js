import express from 'express';
import User from '../models/userModel.js';
import expressAsyncHandler from 'express-async-handler';
const userRouter = express.Router();
import Course from '../models/courseModel.js';

userRouter.post(
  '/api/users/signup',
  express.json(),
  expressAsyncHandler(async (req, res) => {
    const newUser = new User({
      name: req.body.name,
      user_name: req.body.email,
      email: req.body.email,
    });
    const user = await newUser.save();
    res.send('receieved');
  })
);

userRouter.post(
  '/api/users/signin',
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

userRouter.get('/api/users/:email', async (req, res) => {
  try {
    const getuser = await User.findOne({ email: req.params.email });
    res.send(getuser);
  } catch (error) {
    res.status(404).send({ message: 'User Not Found' });
  }
});
userRouter.post(
  '/api/users/updateuser',
  express.json(),
  expressAsyncHandler(async (req, res) => {
    User.findOneAndUpdate(
      { email: req.body.email },
      { $set: { name: req.body.name, user_name: req.body.user_name } },
      { new: true },
      (err, doc) => {
        if (err) {
          console.log('Something wrong when updating data!');
          console.log(doc);
          res.status(500).send(err);
        } else {
          res.status(200).send(User);
        }
      }
    );
  })
);
userRouter.post(
  '/teach/api/users/addcourse',
  express.json(),
  expressAsyncHandler(async (req, res) => {
    console.log(req.body);
    var str = req.body.title;
    str = str.replace(/\s+/g, '-').toLowerCase();
    const newCourse = new Course({
      Course_name: req.body.title,
      slug: str,
      email: req.body.email,
      description: req.body.coursedescrip,
      thumbnail: req.body.thumbnail,
      keywords: req.body.keywords,
      course_instructor: req.body.instructor,
      Requirements: req.body.requirement,
      CourseContent: req.body.sections,
      price: req.body.courseprice,
    });
    const course = await newCourse.save();
    try {
      const getuser = await User.findOne({ email: req.body.email });
      getuser.createdCourses.push(newCourse);
      await getuser.save();
      res.send(getuser);
    } catch (error) {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);
export default userRouter;
