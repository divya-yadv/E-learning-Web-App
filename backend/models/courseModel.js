import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    Course_name: { type: String, required: true, unique: true },
    slug: { type: String, require: true, unique: true },
    description: { type: String },
    image: { type: String, required: true },
    keywords: [String],
    course_instructor: { type: String, required: true },
    enroll_students: { type: Number },
    price: { type: Number, required: true },
    ratings: [Number],
    Requirements: [String],
    About: [String],
    Reviews: [String],
    CourseContent: [[String, Number]],
    creationDate: { type: Date },
  },
  {
    timestamps: true,
  }
);

const Course = mongoose.model('Course', courseSchema);

export default Course;
