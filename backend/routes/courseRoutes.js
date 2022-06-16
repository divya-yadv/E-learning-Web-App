import express from 'express';
import Course from '../models/courseModel.js';
import expressAsyncHandler from 'express-async-handler';
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
courseRouter.post(
  '/updatecourse',
  express.json(),
  expressAsyncHandler(async (req, res) => {
    const getcourse = await Course.findOne({ _id: req.body.id });
    var str = req.body.title;
    str = str.replace(/\s+/g, '-').toLowerCase();
    try {
      Course.findOneAndUpdate(
        { _id: req.body.id },
        {
          $set: {
            Course_name: req.body.title,
            slug: str,
            description: req.body.coursedescrip,
            thumbnail: req.body.thumbnail,
            keywords: req.body.keywords,
            course_instructor: req.body.instructor,
            price: req.body.courseprice,
            Requirements: req.body.requirements,
            CourseContent: req.body.sections,
          },
        },
        { new: true },
        (err, result) => {
          if (err) {
            res.status(400).send({
              data: "couldn't update course",
            });
          } else {
            console.log(result);
            res.status(200).send({
              data: 'Course Updated',
            });
          }
        }
      );
    } catch (err) {
      res.status(500).send(err);
    }
  })
);
export default courseRouter;
