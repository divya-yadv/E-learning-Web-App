import express from 'express';
import Course from '../models/courseModel.js';
const courseRouter = express.Router();

courseRouter.get('/', async (req, res) => {
  const courses = await Course.find({});
  res.send({ courses });
});
courseRouter.get('/:slug', async (req, res) => {
  try {
    const getcourse = await Course.findOne({ slug: req.params.slug });
    console.log(getcourse);
    res.send(getcourse);
  } catch (error) {
    res.status(404).send({ message: 'Course Not Found' });
  }
});
courseRouter.get('/:id', async (req, res) => {
  try {
    const getcourse = await Course.findById(req.params.id);
    console.log(getcourse);
    res.send(getcourse);
  } catch (error) {
    res.status(404).send({ message: 'Course Not Found' });
  }
});
export default courseRouter;
