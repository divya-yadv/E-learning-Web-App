import express from 'express';
import Course from '../models/courseModel.js';
import data from '../data.js';
const seedRouter = express.Router();
export default seedRouter.get('/', async (req, res) => {
  const createdCourses = await Course.insertMany(data.courses);
  res.send({ createdCourses });
});
