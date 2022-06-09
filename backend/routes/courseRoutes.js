import express from 'express';
import Course from '../models/courseModel.js';
const courseRouter = express.Router();

courseRouter.get('/', async (req, res) => {
  const courses = await Course.find({});
  res.send({ courses });
});
courseRouter.get('/slug/:slug', async (req, res) => {
  try {
    const getcourse = await Course.findOne({ slug: req.params.slug });
    res.send(getcourse);
  } catch (error) {
    res.status(404).send({ message: 'Course Not Found' });
  }
});
courseRouter.get('/id/:id', async (req, res) => {
  try {
    const getcourse = await Course.findById(req.params.id);
    res.send(getcourse);
  } catch (error) {
    res.status(404).send({ message: 'Course Not Found' });
  }
});
export default courseRouter;
