import mongoose from 'mongoose';

export const courseSchema = new mongoose.Schema(
  {
    Course_name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String },
    thumbnail: { type: String, required: true },
    keywords: [String],
    course_instructor: { type: String, required: true },
    enroll_students: { type: Number },
    price: { type: Number, required: true },
    ratings: [Number],
    Requirements: [String],
    About: [String],
    Reviews: [String],
    CourseContent: [{ title: String, link: String }],
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model('Course', courseSchema);

export default Course;
